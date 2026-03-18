#!/bin/bash
# ================================================
# add-file.sh — gemini_html/ 루트에 새 파일 추가 (v4.0)
# ================================================
# 사용법:
#   ./add-file.sh "파일명.html" [표시명] [카테고리해시]
#
# 예시:
#   ./add-file.sh "my_report.html"
#   ./add-file.sh "my_report.html" "내 보고서" "VNTG7S2"
#
# 카테고리해시 생략 시 → 미분류(uncategorized)로 등록
# ================================================

set -e
GEMINI_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_JSON="$GEMINI_DIR/site.json"

# ── 인수 확인 ────────────────────────────────────
if [ $# -lt 1 ]; then
    echo ""
    echo "사용법: $0 \"파일명.html\" [표시명] [카테고리해시]"
    echo ""
    echo "예시:"
    echo "  $0 \"my_report.html\""
    echo "  $0 \"my_report.html\" \"내 보고서\" \"VNTG7S2\""
    echo ""
    echo "사용 가능한 카테고리:"
    node -e "
      const s = require('$SITE_JSON');
      Object.entries(s.folders).forEach(([h, f]) => {
        if (f.visible !== false) console.log('  ' + h + '  —  ' + f.displayName);
      });
    " 2>/dev/null || echo "  (site.json 없음)"
    echo ""
    exit 1
fi

FILENAME="$1"
DISPLAY_NAME="${2:-}"
CATEGORY_HASH="${3:-}"

# HTML 확장자 확인
if [[ "${FILENAME,,}" != *.html ]]; then
    FILENAME="${FILENAME}.html"
fi

# 표시명 기본값: 파일명에서 확장자 제거
if [ -z "$DISPLAY_NAME" ]; then
    DISPLAY_NAME="${FILENAME%.html}"
fi

# ── 파일명 중복 확인 ─────────────────────────────
TARGET_FILE="$GEMINI_DIR/$FILENAME"
if [ -f "$TARGET_FILE" ]; then
    echo ""
    echo "❌ 오류: '$FILENAME' 이 이미 루트에 존재합니다."
    echo "   다른 파일명을 사용하세요."
    echo ""
    exit 1
fi

# ── 파일 해시 자동 생성 ──────────────────────────
FILE_HASH=$(node -e "
  const fs = require('fs');
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const site = JSON.parse(fs.readFileSync('$SITE_JSON', 'utf8'));
  const used = new Set([
    ...Object.keys(site.folders),
    ...Object.keys(site.files || {})
  ]);
  let hash;
  do {
    hash = Array.from({length: 7}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  } while (used.has(hash));
  console.log(hash);
")

echo ""
echo "📄 새 파일 추가 중..."
echo "   파일명:  $FILENAME"
echo "   표시명:  $DISPLAY_NAME"
echo "   해시:    $FILE_HASH  (site.json 식별자)"
if [ -n "$CATEGORY_HASH" ]; then
    echo "   카테고리: $CATEGORY_HASH"
else
    echo "   카테고리: 미분류 (어드민에서 배정 가능)"
fi
echo ""

# ── 1. gemini_html/ 루트에 HTML 파일 생성 ─────────
cat > "$TARGET_FILE" << HTMLEOF
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${DISPLAY_NAME}</title>
</head>
<body>
  <h1>${DISPLAY_NAME}</h1>
  <p>내용을 작성하세요.</p>
</body>
</html>
HTMLEOF
echo "   ✓ $FILENAME 생성 (기본 템플릿)"

# ── 2. site.json 업데이트 ─────────────────────────
node -e "
  const fs = require('fs');
  const site = JSON.parse(fs.readFileSync('$SITE_JSON', 'utf8'));
  if (!site.files) site.files = {};

  const maxOrder = Object.values(site.files)
    .filter(f => f.categoryHash === '$CATEGORY_HASH')
    .reduce((m, f) => Math.max(m, f.order || 0), 0);

  site.files['$FILE_HASH'] = {
    filename: '$FILENAME',
    displayName: '$DISPLAY_NAME',
    categoryHash: '$CATEGORY_HASH' || null,
    visible: true,
    order: maxOrder + 1
  };
  if (!site.files['$FILE_HASH'].categoryHash) site.files['$FILE_HASH'].categoryHash = null;

  fs.writeFileSync('$SITE_JSON', JSON.stringify(site, null, 2), 'utf8');
"
echo "   ✓ site.json 업데이트"

# ── 완료 메시지 ──────────────────────────────────
echo ""
echo "✅ 완료!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  파일 URL"
echo "  로컬:  http://localhost:8080/gemini_html/$FILENAME"
echo "  배포:  https://page.chrisnolja.dev/gemini_html/$FILENAME"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📌 다음 단계:"
echo "   1. $TARGET_FILE 편집"
echo "   2. 어드민 모드에서 카테고리 배정 (또는 site.json 직접 수정)"
echo "   3. git add $FILENAME site.json && git commit && git push"
echo ""
