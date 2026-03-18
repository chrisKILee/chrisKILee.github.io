#!/usr/bin/env node
// ================================================
// patch-spa-shells.js
// 모든 카테고리 SPA 쉘을 contents/ 아키텍처에 맞게 업데이트
// ================================================
const fs = require('fs');
const path = require('path');

const GEMINI_DIR = path.resolve(__dirname);
const site = JSON.parse(fs.readFileSync(path.join(GEMINI_DIR, 'site.json'), 'utf8'));

// 새 JS 블록 생성 함수 (folder 별로 CATEGORY_HASH, SECRET_LIST_HASH 다름)
function newJsBlock(folderHash, secretHash) {
  return `    <script>
        const SECRET_LIST_HASH = '${secretHash}';
        const CATEGORY_HASH = '${folderHash}';
        let filesData = []; // [{hash, filename, displayName}]

        async function init() {
            try {
                const resp = await fetch(\`../site.json?v=\${Date.now()}\`);
                const site = await resp.json();
                filesData = Object.entries(site.files || {})
                    .filter(([, f]) => f.categoryHash === CATEGORY_HASH && f.visible !== false)
                    .sort((a, b) => (a[1].order || 999) - (b[1].order || 999))
                    .map(([hash, f]) => ({ hash, filename: f.filename, displayName: f.displayName }));
                renderGrid(); checkHash();
            } catch (e) { showStealth404(); }
        }

        function renderGrid() {
            const container = document.getElementById('filesContainer');
            container.innerHTML = filesData.map(file => \`
                <div class="file-card" onclick="location.href='../\${file.filename}'">
                    <div class="file-icon"><i class="fas fa-leaf"></i></div>
                    <div class="file-name">\${file.displayName}</div>
                </div>\`).join('');
        }

        function checkHash() {
            const hash = decodeURIComponent(window.location.hash.substring(1));
            if (!hash) return showStealth404();
            if (hash === SECRET_LIST_HASH) toggleView('list');
            else {
                const file = filesData.find(f => f.hash === hash);
                if (file) { toggleView('content'); loadContent(file); } else showStealth404();
            }
        }

        function toggleView(view) {
            document.getElementById('fileListView').style.display = view === 'list' ? 'block' : 'none';
            document.getElementById('fileContentView').style.display = view === 'content' ? 'block' : 'none';
        }

        function loadContent(file) {
            const iframe = document.getElementById('contentFrame');
            iframe.src = \`../\${file.filename}?v=\${Date.now()}\`;
        }

        function showStealth404() { document.body.innerHTML = \`<div style="display:flex; align-items:center; justify-content:center; height:100vh; color:#94a3b8; background:#f8fafc;"><h1>404 Not Found</h1></div>\`; }
        window.addEventListener('hashchange', checkHash); window.addEventListener('DOMContentLoaded', init);
    </script>
    <!-- Version: 2026-03-18 flat architecture v4.0 -->`;
}

// 구 JS 블록 패턴 - 버전 주석 있는 경우 / 없는 경우 모두 처리
const PATTERNS = [
  // 패턴1: </script> + <!-- Version: --> 주석
  /<script>[\s\S]*?<\/script>\s*\n\s*<!-- Version:.*?-->/,
  // 패턴2: </script>\n</body> 형식 (버전 주석 없음)
  /(<script>[\s\S]*?<\/script>)(\s*\n<\/body>)/,
];

let updated = 0;
let skipped = 0;

for (const [folderHash, folderCfg] of Object.entries(site.folders)) {
  const indexPath = path.join(GEMINI_DIR, folderHash, 'index.html');
  if (!fs.existsSync(indexPath)) { skipped++; continue; }

  let html = fs.readFileSync(indexPath, 'utf8');
  const secretHash = folderCfg.secretHash || '';
  const newJs = newJsBlock(folderHash, secretHash);

  if (PATTERNS[0].test(html)) {
    html = html.replace(PATTERNS[0], newJs);
    fs.writeFileSync(indexPath, html, 'utf8');
    console.log('  ✓ ' + folderHash + '/index.html 업데이트 (패턴1)');
    updated++;
  } else if (PATTERNS[1].test(html)) {
    html = html.replace(PATTERNS[1], (_, scriptBlock, tail) => newJs + tail);
    fs.writeFileSync(indexPath, html, 'utf8');
    console.log('  ✓ ' + folderHash + '/index.html 업데이트 (패턴2)');
    updated++;
  } else {
    console.log('  ⚠ ' + folderHash + '/index.html - 패턴 미일치, 수동 확인 필요');
    skipped++;
  }
}

console.log('\n✅ 완료: ' + updated + '개 업데이트, ' + skipped + '개 스킵');
