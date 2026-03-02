#!/bin/bash
# ================================================
# 새 폴더 생성기 v2.0
# ================================================
# 사용법:
#   ./add-hash-folder.sh "표시 이름" [이모지] [dir_id]
#
# 예시:
#   ./add-hash-folder.sh "Security Study"
#   ./add-hash-folder.sh "Security Study" "🔐" "dir_ai"
#
# dir_id 목록은 gemini_html/site.json 의 directories[].id 참고
# ================================================

set -e
GEMINI_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_JSON="$GEMINI_DIR/site.json"
TEMPLATE="$GEMINI_DIR/VNTG7S2/index.html"

# ── 인수 확인 ────────────────────────────────────
if [ $# -lt 1 ]; then
    echo ""
    echo "사용법: $0 \"표시 이름\" [이모지] [dir_id]"
    echo ""
    echo "예시:"
    echo "  $0 \"Security Study\""
    echo "  $0 \"Security Study\" \"🔐\" \"dir_ai\""
    echo ""
    echo "사용 가능한 dir_id:"
    node -e "
      const s = require('$SITE_JSON');
      s.directories.forEach(d => console.log('  ' + d.id + '  —  ' + d.name));
    " 2>/dev/null || echo "  (site.json 없음)"
    echo ""
    exit 1
fi

DISPLAY_NAME="$1"
EMOJI="${2:-📁}"
DIR_ID="${3:-}"

# ── 해시 자동 생성 ────────────────────────────────
# 기존 폴더와 충돌하지 않는 7자리 대문자+숫자 해시 생성
HASH=$(node -e "
  const fs = require('fs');
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // 혼동 문자 제외 (O,0,I,1)
  const existing = fs.readdirSync('$GEMINI_DIR').filter(f =>
    fs.statSync('$GEMINI_DIR/' + f).isDirectory()
  );
  let hash;
  do {
    hash = Array.from({length: 7}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  } while (existing.includes(hash));
  console.log(hash);
")

# 시크릿 해시 생성 (폴더 목록 접근용 URL)
SECRET_HASH=$(node -e "
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const rand = Array.from({length: 8}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  console.log('f-' + rand);
")

echo ""
echo "🆕 새 폴더 생성 중..."
echo "   표시명:  $EMOJI $DISPLAY_NAME"
echo "   해시:    $HASH  (폴더 URL, 변경 불가)"
echo "   시크릿:  $SECRET_HASH  (목록 공유 URL)"
if [ -n "$DIR_ID" ]; then
    echo "   디렉토리: $DIR_ID"
else
    echo "   디렉토리: 미분류 (어드민에서 배정 가능)"
fi
echo ""

# ── 1. 폴더 생성 ─────────────────────────────────
mkdir -p "$GEMINI_DIR/$HASH"
echo "   ✓ 폴더 생성: $HASH/"

# ── 2. files.json 생성 ───────────────────────────
cat > "$GEMINI_DIR/$HASH/files.json" << FILESJSON
{
  "_folderName": "$EMOJI $DISPLAY_NAME",
  "_order": []
}
FILESJSON
echo "   ✓ files.json 생성 (비어있음, 파일 추가 후 업데이트)"

# ── 3. index.html 생성 (VNTG7S2 템플릿 기반) ─────
if [ ! -f "$TEMPLATE" ]; then
    echo "   ❌ 템플릿 없음: $TEMPLATE"
    exit 1
fi
cp "$TEMPLATE" "$GEMINI_DIR/$HASH/index.html"

# 타이틀 교체
node -e "
  const fs = require('fs');
  let html = fs.readFileSync('$GEMINI_DIR/$HASH/index.html', 'utf8');
  html = html.replace(/<title>.*?<\/title>/, '<title>$EMOJI $DISPLAY_NAME</title>');
  html = html.replace(/const SECRET_LIST_HASH = '.*?';/, \"const SECRET_LIST_HASH = '$SECRET_HASH';\");
  fs.writeFileSync('$GEMINI_DIR/$HASH/index.html', html, 'utf8');
"
echo "   ✓ index.html 생성 (SPA 쉘 템플릿)"

# ── 4. site.json 업데이트 ────────────────────────
node -e "
  const fs = require('fs');
  const site = JSON.parse(fs.readFileSync('$SITE_JSON', 'utf8'));

  // 기존 폴더 중 최대 order 값 계산
  const maxOrder = Object.values(site.folders).reduce((m, f) => Math.max(m, f.order || 0), 0);

  site.folders['$HASH'] = {
    dirId: '$DIR_ID' || null,
    displayName: '$EMOJI $DISPLAY_NAME',
    secretHash: '$SECRET_HASH',
    visible: true,
    order: maxOrder + 1
  };

  // dirId가 빈 문자열이면 null로
  if (!site.folders['$HASH'].dirId) site.folders['$HASH'].dirId = null;

  fs.writeFileSync('$SITE_JSON', JSON.stringify(site, null, 2), 'utf8');
"
echo "   ✓ site.json 업데이트"

# ── 완료 메시지 ──────────────────────────────────
echo ""
echo "✅ 완료!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  폴더 URL (고정, 절대 변경 안됨)"
echo "  로컬:  http://localhost:8000/$HASH/#$SECRET_HASH"
echo "  배포:  https://page.chrisnolja.dev/gemini_html/$HASH/#$SECRET_HASH"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📌 다음 단계:"
echo "   1. $GEMINI_DIR/$HASH/ 에 HTML 파일 추가"
echo "   2. $GEMINI_DIR/$HASH/files.json 에 파일 목록 등록"
echo "   3. 어드민 모드에서 디렉토리 배정 (또는 site.json 직접 수정)"
echo "   4. git add $HASH/ site.json && git commit && git push"
echo ""
