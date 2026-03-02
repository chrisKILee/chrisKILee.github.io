#!/bin/bash
# ================================================
# sync-files.sh — files.json 자동 동기화
# ================================================
# HTML 파일을 스캔해 <title>을 추출하고
# files.json의 _order, 파일 목록을 자동 갱신합니다.
#
# 사용법:
#   ./sync-files.sh              # 모든 해시 폴더 동기화
#   ./sync-files.sh HASH         # 특정 폴더만
#   ./sync-files.sh --setup      # git pre-commit hook 설치
# ================================================

GEMINI_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$GEMINI_DIR/.." && pwd)"

# ── pre-commit hook 설치 ──────────────────────────
if [ "$1" = "--setup" ]; then
    HOOK_PATH="$REPO_ROOT/.git/hooks/pre-commit"
    cat > "$HOOK_PATH" << 'HOOKEOF'
#!/bin/bash
# auto-sync files.json before commit
GEMINI_DIR="$(git rev-parse --show-toplevel)/gemini_html"
if [ -f "$GEMINI_DIR/sync-files.sh" ]; then
    echo "🔄 files.json 자동 동기화 중..."
    bash "$GEMINI_DIR/sync-files.sh" --quiet
    # 변경된 files.json을 staging에 추가
    git diff --name-only | grep "files\.json" | xargs -r git add
    echo "✅ 동기화 완료"
fi
HOOKEOF
    chmod +x "$HOOK_PATH"
    echo "✅ git pre-commit hook 설치 완료"
    echo "   이제 git commit 할 때마다 files.json이 자동 갱신됩니다."
    exit 0
fi

QUIET="${1:-}"
TARGET_HASH=""
if [[ "$1" =~ ^[A-Z0-9]{7}$ ]]; then
    TARGET_HASH="$1"
    QUIET=""
fi

# ── 단일 폴더 동기화 (node.js) ───────────────────
sync_folder() {
    local HASH="$1"
    local FOLDER="$GEMINI_DIR/$HASH"

    [ -d "$FOLDER" ] || return

    node -e "
const fs = require('fs');
const path = require('path');

const folder = '$FOLDER';
const filesJsonPath = path.join(folder, 'files.json');

// 기존 files.json 읽기
let existing = {};
try { existing = JSON.parse(fs.readFileSync(filesJsonPath, 'utf8')); } catch(e) {}

// HTML 파일 스캔 (index.html 제외, 대소문자 모두)
const htmlFiles = fs.readdirSync(folder)
    .filter(f => f.toLowerCase().endsWith('.html') && f.toLowerCase() !== 'index.html')
    .sort();

if (htmlFiles.length === 0 && !(existing._order && existing._order.length)) {
    // 빈 폴더는 건너뜀
    process.exit(0);
}

// 각 파일의 표시명 결정
const entries = {};
const newFiles = [];
htmlFiles.forEach(filename => {
    if (existing[filename]) {
        // 기존 표시명 유지 (사용자가 커스터마이징했을 수 있음)
        entries[filename] = existing[filename];
    } else {
        // <title> 태그에서 추출
        try {
            const html = fs.readFileSync(path.join(folder, filename), 'utf8');
            const m = html.match(/<title[^>]*>(.*?)<\/title>/is);
            entries[filename] = m ? m[1].trim() : filename.replace(/\.html$/, '');
        } catch(e) {
            entries[filename] = filename.replace(/\.html$/, '');
        }
        newFiles.push(filename);
    }
});

// _order: 기존 순서 유지 + 삭제된 파일 제거 + 새 파일 뒤에 추가
const existingOrder = (existing._order || []).filter(f => htmlFiles.includes(f));
const order = [...existingOrder, ...newFiles];

// 삭제된 파일 감지
const removed = (existing._order || []).filter(f => !htmlFiles.includes(f));

const result = { _folderName: existing._folderName || '$HASH', _order: order, ...entries };
fs.writeFileSync(filesJsonPath, JSON.stringify(result, null, 2), 'utf8');

// 결과 출력
const summary = [];
if (newFiles.length)  summary.push('+' + newFiles.length + '개 추가');
if (removed.length)   summary.push('-' + removed.length + '개 삭제');
if (!summary.length)  summary.push('변경 없음');

console.log('  ' + '$HASH' + '  ' + summary.join(', ') + '  (' + order.length + '개 파일)');
newFiles.forEach(f  => console.log('    \u001b[32m+\u001b[0m ' + f + '  →  ' + entries[f]));
removed.forEach(f   => console.log('    \u001b[31m-\u001b[0m ' + f));
" 2>/dev/null
}

# ── 실행 ─────────────────────────────────────────
if [ -n "$TARGET_HASH" ]; then
    # 특정 폴더만
    echo ""
    echo "🔄 $TARGET_HASH/files.json 동기화..."
    sync_folder "$TARGET_HASH"
    echo ""
else
    # 모든 해시 폴더 (7자리 대문자+숫자 패턴)
    [ "$1" != "--quiet" ] && echo ""
    [ "$1" != "--quiet" ] && echo "🔄 전체 폴더 files.json 동기화..."
    [ "$1" != "--quiet" ] && echo ""

    for dir in "$GEMINI_DIR"/*/; do
        HASH=$(basename "$dir")
        if [[ "$HASH" =~ ^[A-Z0-9]{7}$ ]]; then
            sync_folder "$HASH"
        fi
    done

    [ "$1" != "--quiet" ] && echo ""
    [ "$1" != "--quiet" ] && echo "✅ 완료"
    [ "$1" != "--quiet" ] && echo ""
    [ "$1" != "--quiet" ] && echo "💡 git commit 시 자동 실행하려면:"
    [ "$1" != "--quiet" ] && echo "   ./sync-files.sh --setup"
fi
