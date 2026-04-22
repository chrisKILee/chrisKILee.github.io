#!/usr/bin/env node
/**
 * sync-tiers.js
 *
 * admin UI에서 tier 변경 후 실행:
 *   1. git pull --rebase (충돌 시 site.json은 remote 채택, 나머지는 수동 해결 요청)
 *   2. site.json 읽기
 *   3. 파일별 effective tier → 올바른 경로 계산
 *   4. 잘못된 위치의 파일 git mv
 *   5. git commit & push
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { computeFilePath } from '../assets/js/site-logic.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function run(cmd, opts = {}) {
  return execSync(cmd, {
    cwd: ROOT,
    encoding: 'utf-8',
    stdio: 'pipe',
    env: { ...process.env, GIT_EDITOR: 'true', GIT_SEQUENCE_EDITOR: 'true' },
    ...opts,
  });
}

function log(msg) { console.log(msg); }
function step(msg) { console.log(`\n▶ ${msg}`); }
function ok(msg)   { console.log(`  ✅ ${msg}`); }
function warn(msg) { console.log(`  ⚠️  ${msg}`); }
function fail(msg) { console.error(`  ❌ ${msg}`); }

// ─── 1. git pull ──────────────────────────────────────────────────────────────

function gitPull() {
  step('git pull --rebase --autostash');
  try {
    const out = run('git pull --rebase --autostash');
    log(out.trim());
  } catch (e) {
    // rebase 중 충돌 발생
    const status = run('git status --short');
    const conflicted = status.split('\n')
      .filter(l => l.startsWith('UU') || l.startsWith('AA') || l.startsWith('DD'));

    const hasSiteJson  = conflicted.some(l => l.includes('site.json'));
    const otherConflicts = conflicted.filter(l => !l.includes('site.json'));

    if (otherConflicts.length > 0) {
      fail('다음 파일에서 충돌 발생 — 수동 해결 후 다시 실행하세요:');
      otherConflicts.forEach(l => fail(`  ${l.trim()}`));
      process.exit(1);
    }

    if (hasSiteJson) {
      warn('site.json 충돌 → remote(admin push) 버전 채택');
      run('git checkout --theirs site.json');
      run('git add site.json');
      run('git rebase --continue');
      ok('rebase 완료');
    }
  }
}

// ─── 2. 파일 이동 계산 ────────────────────────────────────────────────────────

function findCurrentPath(fileCfg, folder) {
  const slug = folder?.slug || '';
  const filename = fileCfg.filename;
  const candidates = [
    `/${slug}/${filename}`,
    `/c/${slug}/${filename}`,
    `/s/${slug}/${filename}`,
  ];
  return candidates.find(p => existsSync(join(ROOT, p))) ?? null;
}

function getFileMoves(siteConfig) {
  const moves = [];
  for (const [hash, fileCfg] of Object.entries(siteConfig.files || {})) {
    const folder = siteConfig.folders?.[fileCfg.categoryHash];
    if (!folder?.slug) continue;

    const correctPath = computeFilePath(fileCfg, folder);
    const currentPath = findCurrentPath(fileCfg, folder);

    if (!currentPath) {
      warn(`파일 없음 (site.json에만 존재): ${fileCfg.filename}`);
      continue;
    }
    if (currentPath === correctPath) continue;

    moves.push({ hash, filename: fileCfg.filename, from: currentPath, to: correctPath });
  }
  return moves;
}

// ─── 3. git mv ────────────────────────────────────────────────────────────────

function movFiles(moves) {
  for (const m of moves) {
    const toAbs = join(ROOT, m.to);
    const toDir = dirname(toAbs);

    if (!existsSync(toDir)) {
      mkdirSync(toDir, { recursive: true });
    }

    // 경로에서 앞의 / 제거 (git mv는 repo root 기준 상대경로)
    const fromRel = m.from.replace(/^\//, '');
    const toRel   = m.to.replace(/^\//, '');
    run(`git mv "${fromRel}" "${toRel}"`);
    ok(`${m.from} → ${m.to}`);
  }
}

// ─── main ─────────────────────────────────────────────────────────────────────

async function main() {
  gitPull();

  step('site.json 읽기');
  const siteConfig = JSON.parse(readFileSync(join(ROOT, 'site.json'), 'utf-8'));
  ok(`파일 ${Object.keys(siteConfig.files || {}).length}개, 폴더 ${Object.keys(siteConfig.folders || {}).length}개`);

  step('이동 필요한 파일 계산');
  const moves = getFileMoves(siteConfig);

  if (moves.length === 0) {
    ok('모든 파일이 올바른 위치에 있습니다.');
    process.exit(0);
  }

  log(`  ${moves.length}개 파일 이동 필요:`);
  moves.forEach(m => log(`    ${m.from}  →  ${m.to}`));

  step(`파일 이동 (git mv) — ${moves.length}개`);
  movFiles(moves);

  step('git commit & push');
  const summary = moves.map(m => `  ${m.from} → ${m.to}`).join('\n');
  run('git add -A');
  run(`git commit -m "chore: tier 기반 파일 경로 동기화 (${moves.length}개)\n\n${summary}\n\nCo-Authored-By: Claude <noreply@anthropic.com>"`);
  const pushOut = run('git push');
  log(pushOut.trim());

  log('\n✅ 동기화 완료!');
}

main().catch(e => {
  fail(e.message);
  process.exit(1);
});
