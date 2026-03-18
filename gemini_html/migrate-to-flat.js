#!/usr/bin/env node
// ================================================
// migrate-to-flat.js
// contents/{HASH}/{filename}.html → gemini_html/{filename}.html 으로 이동
// 구 파일은 redirect snippet으로 교체 (기존 URL 유지)
// ================================================
const fs = require('fs');
const path = require('path');

const GEMINI_DIR = path.resolve(__dirname);
const CONTENTS_DIR = path.join(GEMINI_DIR, 'contents');

const redirectSnippet = (targetFilename) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=/gemini_html/${targetFilename}">
  <script>window.location.replace('/gemini_html/${targetFilename}');</script>
</head>
<body></body>
</html>`;

if (!fs.existsSync(CONTENTS_DIR)) {
  console.error('❌ contents/ 디렉토리를 찾을 수 없습니다.');
  process.exit(1);
}

const hashDirs = fs.readdirSync(CONTENTS_DIR).filter(name => {
  return fs.statSync(path.join(CONTENTS_DIR, name)).isDirectory();
});

let copied = 0;
let redirected = 0;
let skipped = 0;
const conflicts = [];

for (const hashDir of hashDirs) {
  const dirPath = path.join(CONTENTS_DIR, hashDir);
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));

  for (const filename of files) {
    const srcPath = path.join(dirPath, filename);
    const destPath = path.join(GEMINI_DIR, filename);

    // 충돌 감지: 루트에 이미 동일 파일명 존재
    if (fs.existsSync(destPath)) {
      const existingContent = fs.readFileSync(destPath, 'utf8');
      // redirect snippet이면 덮어쓸 수 있음 (이미 마이그레이션된 파일)
      if (!existingContent.includes('migrate-to-flat')) {
        conflicts.push({ hashDir, filename, destPath });
        console.log(`  ⚠ 충돌: ${filename} 이미 루트에 존재 — 스킵 (수동 확인 필요)`);
        skipped++;
        continue;
      }
    }

    // 1. 루트로 복사
    fs.copyFileSync(srcPath, destPath);
    console.log(`  ✓ 복사: contents/${hashDir}/${filename} → ${filename}`);
    copied++;

    // 2. 원본을 redirect snippet으로 교체
    fs.writeFileSync(srcPath, redirectSnippet(filename), 'utf8');
    console.log(`  ↪ redirect: contents/${hashDir}/${filename} → /gemini_html/${filename}`);
    redirected++;
  }
}

console.log(`\n✅ 완료: ${copied}개 복사, ${redirected}개 redirect, ${skipped}개 스킵`);

if (conflicts.length > 0) {
  console.log('\n⚠ 충돌 목록 (수동 확인 필요):');
  conflicts.forEach(c => console.log(`   - contents/${c.hashDir}/${c.filename}`));
}
