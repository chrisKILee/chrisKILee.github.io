#!/usr/bin/env node
/**
 * test-page-header.js — page-header.js 전수 검사 TDD 스크립트
 *
 * 검사 항목:
 *   T1. page-header.js <script> 태그 존재 여부
 *   T2. body에 padding-top override 충돌 여부 (헤더 공간은 있으나 메뉴 숨김)
 *   T3. page-footer.js 존재 시 page-header.js도 존재해야 함 (쌍 검사)
 *
 * 실행: node scripts/test-page-header.js [--fix]
 *   --fix : T1 실패 파일에 page-header.js 자동 삽입
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HEADER_SCRIPT = '<script src="/assets/js/page-header.js"></script>';
const HEADER_PATTERN = /page-header\.js/;
const FOOTER_PATTERN = /page-footer\.js/;
// body { padding-top: 0 } 또는 body { padding-top: 0 !important } 가 있으면 헤더 가림
// 단, * { padding: 0 } 같은 전역 리셋은 page-header.js가 !important로 덮으므로 제외
const PADDING_OVERRIDE = /body\s*\{[^}]*padding-top\s*:\s*0\s*!important/;

const FIX_MODE = process.argv.includes('--fix');

// 검사 제외 디렉토리/파일 (Jekyll 레거시, 빌드 산출물, 템플릿 조각)
const EXCLUDE_DIRS = new Set(['_includes', '_layouts', '_site', '_posts', 'node_modules', 'OBIGO_SPEC', 'scripts', 'blog', 'about']);
const EXCLUDE_FILES = new Set(['404.html', 'index.html', 'index_backup.html']);

// ── 헬퍼 ──────────────────────────────────────────
function walkHtml(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue;
      walkHtml(path.join(dir, entry.name), results);
    } else if (entry.name.endsWith('.html')) {
      if (EXCLUDE_FILES.has(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (fs.statSync(full).size === 0) continue; // 빈 파일 제외
      results.push(full);
    }
  }
  return results;
}

function relPath(p) {
  return path.relative(ROOT, p);
}

// ── 검사 ──────────────────────────────────────────
const files = walkHtml(ROOT);

let passT1 = 0, failT1 = [];
let passT2 = 0, failT2 = [];
let passT3 = 0, failT3 = [];
let fixed  = 0;

for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8');

  const hasHeader = HEADER_PATTERN.test(raw);
  const hasFooter = FOOTER_PATTERN.test(raw);
  const hasPaddingOverride = PADDING_OVERRIDE.test(raw);

  // T1: page-header.js 존재
  if (hasHeader) {
    passT1++;
  } else {
    failT1.push(relPath(file));

    if (FIX_MODE) {
      // </body> 바로 앞에 삽입
      const fixed_content = raw.replace(
        /(\s*<\/body>)/,
        `\n  ${HEADER_SCRIPT}$1`
      );
      if (fixed_content !== raw) {
        fs.writeFileSync(file, fixed_content, 'utf8');
        fixed++;
      }
    }
  }

  // T2: padding-top:0 충돌 (헤더 있어도 없어도 경고)
  if (hasPaddingOverride) {
    failT2.push(relPath(file));
  } else {
    passT2++;
  }

  // T3: footer 있으면 header도 있어야 함
  if (hasFooter) {
    if (hasHeader) {
      passT3++;
    } else {
      failT3.push(relPath(file));
    }
  }
}

// ── 리포트 ──────────────────────────────────────
const total = files.length;
const SEP = '─'.repeat(60);

console.log('\n' + SEP);
console.log('  page-header.js 전수 검사 리포트');
console.log(SEP);
console.log(`  총 HTML 파일: ${total}개\n`);

// T1
const t1Status = failT1.length === 0 ? '✅ PASS' : (FIX_MODE ? '🔧 FIXED' : '❌ FAIL');
console.log(`T1 page-header.js 삽입 여부  ${t1Status}`);
console.log(`   통과: ${passT1}  실패: ${failT1.length}${FIX_MODE && fixed > 0 ? `  (${fixed}개 자동 수정됨)` : ''}`);
if (!FIX_MODE && failT1.length > 0) {
  const preview = failT1.slice(0, 20);
  preview.forEach(f => console.log(`   ✗ ${f}`));
  if (failT1.length > 20) console.log(`   ... 외 ${failT1.length - 20}개`);
}

// T2
const t2Status = failT2.length === 0 ? '✅ PASS' : '⚠️  WARN';
console.log(`\nT2 padding-top:0 충돌 경고    ${t2Status}`);
console.log(`   정상: ${passT2}  충돌 의심: ${failT2.length}`);
if (failT2.length > 0) {
  failT2.slice(0, 10).forEach(f => console.log(`   ⚠ ${f}`));
  if (failT2.length > 10) console.log(`   ... 외 ${failT2.length - 10}개`);
}

// T3
const t3Status = failT3.length === 0 ? '✅ PASS' : '❌ FAIL';
console.log(`\nT3 footer↔header 쌍 일치      ${t3Status}`);
console.log(`   일치: ${passT3}  불일치: ${failT3.length}`);
if (failT3.length > 0) {
  failT3.slice(0, 10).forEach(f => console.log(`   ✗ ${f}`));
  if (failT3.length > 10) console.log(`   ... 외 ${failT3.length - 10}개`);
}

console.log('\n' + SEP);

const allPass = failT1.length === 0 && failT3.length === 0;
if (allPass) {
  console.log('  🎉 모든 검사 통과!\n');
} else {
  if (!FIX_MODE) {
    console.log('  💡 자동 수정: node scripts/test-page-header.js --fix\n');
  } else {
    console.log('  ✅ 자동 수정 완료. 다시 실행해서 검증하세요.\n');
  }
}

process.exit(allPass ? 0 : 1);
