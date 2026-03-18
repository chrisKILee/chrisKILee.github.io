#!/bin/bash
# 로컬 테스트용 — PIN 임시 주입 후 서버 시작
# 테스트 종료 후 local-test-end.sh 실행

read -s -p "테스트용 PIN (6자리): " PIN
echo

if [[ ! "$PIN" =~ ^[0-9]{6}$ ]]; then
  echo "❌ 6자리 숫자를 입력하세요"
  exit 1
fi

HASH=$(echo -n "$PIN" | sha256sum | cut -d' ' -f1)

sed -i "s/__ADMIN_PIN_HASH__/$HASH/g" GDEDSE/index.html
sed -i "s/__PRIVATE_PIN_HASH__/$HASH/g" private/index.html

echo "✅ PIN 주입 완료. 테스트 서버 시작..."
echo "   http://localhost:8080/gemini_html/GDEDSE/#gdedse-adm-2026"
echo "   http://localhost:8080/gemini_html/private/"
echo ""
echo "   종료: Ctrl+C 후 ./local-test-end.sh 실행"
python3 -m http.server 8080 --directory ..
