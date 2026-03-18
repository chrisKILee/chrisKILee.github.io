# 시스템 아키텍처 및 보안 스펙 (v4.0)

> 최종 업데이트: 2026-03-18
> 이전 버전: v3.0 (contents/ + hash dir 구조) → v4.0 (flat 구조 + private 섹션)

---

## 변경 배경

v3.0의 `contents/{HASH}/{filename}.html` 구조는 URL 비공개를 위해 설계되었으나,
`https://page.chrisnolja.dev/gemini_html/` 자체가 접근 가능한 상태여서 hash dir의
보안 의미가 퇴색됨. 대신 **단순하고 명확한 flat 구조**로 전환하고,
진짜 비공개가 필요한 콘텐츠는 `private/` 섹션으로 분리.

---

## 1. URL 구조 (v4.0)

### 1-1. 일반 콘텐츠 (Public)

```
[신규 URL]
https://page.chrisnolja.dev/gemini_html/{filename}.html

[구 URL - 리다이렉트 유지 필수]
https://page.chrisnolja.dev/gemini_html/contents/{FILE_HASH}/{filename}.html
→ 301 redirect → /gemini_html/{filename}.html
```

**규칙:**
- 파일명 중복 방지 책임은 `site.json` 관리자에게 있음
- 파일명은 영문 소문자 + 숫자 + 하이픈/언더스코어 권장 (예: `data_agent_platforms_2026.html`)

### 1-2. Private 콘텐츠

```
[디렉토리 인덱스 - PIN 필요]
https://page.chrisnolja.dev/gemini_html/private/
→ PIN 입력 폼 표시 → 일치 시 목록 표시

[직접 공유 URL - PIN 불필요]
https://page.chrisnolja.dev/gemini_html/private/{filename}.html
→ PIN 없이 바로 접근 가능 (URL 자체가 접근 토큰 역할)
```

**규칙:**
- `/private/` 디렉토리 목록은 PIN으로 보호 (JS 기반, security by obscurity)
- `/private/{filename}.html` 직접 URL은 PIN 불필요 (공유된 URL = 접근 허가)
- GitHub Pages 특성상 진짜 서버 인증 없음 — URL 공유에 주의

### 1-3. 카테고리 SPA (유지)

```
[목록 접근]
https://page.chrisnolja.dev/gemini_html/{CATEGORY_HASH}/#secretHash

[포털]
https://page.chrisnolja.dev/gemini_html/GDEDSE/#gdedse-adm-2026
```

---

## 2. 디렉토리 구조 (v4.0)

```
gemini_html/
├── site.json              ← 전체 시스템 마스터 설정
├── index.html             ← 루트 리다이렉트 (GDEDSE로 이동)
│
├── GDEDSE/                ← 메인 포털 (어드민 포함)
│   └── index.html
│
├── {filename}.html        ← 일반 콘텐츠 (flat, 해시 없음)
├── data_agent_platforms_2026.html
├── kafka_architecture.html
├── ...
│
├── private/               ← Private 콘텐츠 섹션
│   ├── index.html         ← PIN 입력 폼 + 목록 (PIN 일치 시만 표시)
│   └── {filename}.html    ← 직접 URL로 PIN 없이 접근 가능
│
├── contents/              ← [레거시 유지] 구 URL 리다이렉트용
│   └── {FILE_HASH}/
│       └── {filename}.html → redirect to /gemini_html/{filename}.html
│
├── {CATEGORY_HASH}/       ← 카테고리 SPA shell (기존 유지)
│   └── index.html
│
├── add-file.sh            ← 새 콘텐츠 추가 자동화
└── patch-spa-shells.js    ← 카테고리 SPA shell 일괄 패치
```

---

## 3. 리다이렉트 전략

GitHub Pages는 서버 사이드 redirect 불가. JS 기반 redirect 사용.

### 방법: 구 콘텐츠 파일에 redirect snippet 삽입

기존 `contents/{HASH}/{filename}.html` 파일 상단에 삽입:
```html
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0; url=/gemini_html/{filename}.html">
  <script>window.location.replace('/gemini_html/{filename}.html');</script>
</head>
</html>
```

- 일괄 처리: `migrate-to-flat.js` 스크립트로 자동화
- 기존 파일 본문은 `/gemini_html/{filename}.html`로 이동

---

## 4. site.json 변경 (v4.0)

### 버전

```json
{ "version": "4.0" }
```

### 파일 경로 참조 방식 변경

```json
// v3.0 (구)
"Z2HASKJ": {
  "filename": "A2UI.html",
  "categoryHash": "QT38XYX"
}
// → 물리 경로: contents/Z2HASKJ/A2UI.html
// → URL: /gemini_html/contents/Z2HASKJ/A2UI.html

// v4.0 (신)
"Z2HASKJ": {
  "filename": "A2UI.html",
  "displayName": "A2UI 에 대하여",
  "memo": "Claude 비교 분석",     ← 신규 (선택)
  "categoryHash": "QT38XYX",
  "visible": true,
  "order": 6
}
// → 물리 경로: A2UI.html (gemini_html/ 루트)
// → URL: /gemini_html/A2UI.html
```

- `files[hash]` 의 해시 키는 **변경 금지** (site.json 내 식별자로 여전히 필요)
- 물리 파일 경로만 `contents/{hash}/filename` → `filename` (루트 flat)으로 변경
- 카테고리 SPA의 파일 링크: `'../contents/${file.hash}/${file.filename}'` → `'../${file.filename}'`

### memo 필드 스펙

| 속성 | 내용 |
|------|------|
| 필드명 | `memo` |
| 타입 | `string` (optional) |
| 기본값 | `undefined` (없으면 확장자 대문자 표시) |
| 표시 위치 | 파일 카드의 `file-type-badge` 영역 (기존 "HTML" 뱃지 자리) |
| 표시 규칙 | `memo` 있으면 memo 텍스트 표시, 없으면 확장자 대문자 (기존 동작 유지) |
| 최대 길이 | 20자 권장 (카드 오버플로 방지) |

### Private 파일 등록

`private/` 파일은 `site.json`에 등록하지 않고 `private/index.html` 내부에서 독립 관리.
(site.json과 결합하면 어드민 화면에 노출되어 보안 의미 희석)

---

## 4-1. GDEDSE 어드민 변경 (v4.0)

### 카드 링크 URL 변경

```javascript
// v3.0 (구)
const linkUrl = `../contents/${fileHash}/${filename}`;

// v4.0 (신)
const linkUrl = `../${filename}`;
```

### memo 표시 로직

```javascript
// file-type-badge 영역
const badge = fileCfg.memo
  ? esc(fileCfg.memo)                         // memo 있으면 memo 텍스트
  : filename.split('.').pop().toUpperCase();   // 없으면 확장자 (기존)

// 렌더링
`<div class="file-type-badge">${badge}</div>`
```

### 어드민 캐시 오버라이드에 memo 추가

```javascript
// applyAdminOverrides 내 files 오버레이
['visible', 'order', 'categoryHash', 'memo'].forEach(k => {
  if (cFile[k] !== undefined) siteConfig.files[hash][k] = cFile[k];
});
```

### 카드 UI에 memo 편집 버튼 추가 (어드민 전용)

어드민 모드에서 카드 액션 버튼에 "메모 편집" 버튼 추가:
```javascript
<button class="action-btn" onclick="event.stopPropagation(); editMemo('${fileHash}')" title="메모 편집">
  <i class="fas fa-tag"></i>
</button>
```

`editMemo(fileHash)` 함수: prompt()로 메모 입력 → `siteConfig.files[hash].memo` 업데이트 → `persistConfig()` → `render()`

---

## 5. Private 섹션 상세 스펙

### 5-1. `/private/index.html` 동작

```
1. 페이지 로드 → PIN 입력 폼만 표시 (파일 목록 숨김)
2. PIN 입력 → localStorage에 PIN hash 저장 (세션 유지)
3. PIN 일치 → 파일 목록 표시
4. PIN 불일치 → 오류 메시지 (파일 존재 여부 노출 없음)
```

### 5-2. `/private/{filename}.html` 동작

```
1. 직접 URL 접근 → 바로 콘텐츠 표시 (PIN 체크 없음)
2. 파일 상단에 "비공개 문서" 워터마크/표시 (선택)
```

### 5-3. PIN 관리

- **형식**: 숫자 6자리 (`000000` ~ `999999`)
- PIN의 SHA-256 해시값은 **GitHub Actions Secret**으로 관리 (소스코드에 미노출)
- 소스코드에는 placeholder만 존재: `__PRIVATE_PIN_HASH__`
- GitHub Actions 빌드 시 `sed`로 placeholder → 실제 해시로 치환 후 배포
- PIN 변경 시: GitHub Secrets 값 업데이트 → 재배포

```javascript
// private/index.html 소스코드 (placeholder)
const PIN_HASH = '__PRIVATE_PIN_HASH__';  // GitHub Actions가 치환

// 배포된 HTML (실제 해시 주입됨, 소스에는 없음)
const PIN_HASH = 'a3f9c2d1...실제sha256...';
```

### 5-4. 보안 수준

| 시나리오 | 결과 |
|---------|------|
| `/private/` 직접 접근 | PIN 입력 폼 표시 (목록 숨김) |
| 틀린 PIN 입력 | 오류 메시지, 목록 비노출 |
| 맞는 6자리 PIN 입력 | 파일 목록 표시 (localStorage 세션 유지) |
| `/private/filename.html` 직접 URL | 바로 접근 (PIN 불필요) |
| 브라우저 소스 보기 | PIN hash만 노출 (원문 역산 어려움, private repo로 추가 방어) |

---

## 5-5. 어드민 PIN 보호 (GDEDSE)

어드민 액션 버튼(visibility 토글, 카테고리 이동, memo 편집 등)을 실행하기 전에
**6자리 PIN 검증** 단계를 추가.

### 동작 플로우

```
1. 어드민 모드 진입 (#gdedse-adm-2026) → PIN 입력 모달 표시
2. 6자리 PIN 입력 → SHA-256 hash 비교
3. 일치 → adminPinVerified = true → 이후 액션 버튼 활성화
4. 불일치 → 오류 메시지 (어드민 모드 유지, 버튼 비활성)
5. sessionStorage에 인증 상태 저장 (탭 닫으면 초기화)
```

### 구현 방식

```javascript
// GDEDSE/index.html 소스코드 (placeholder)
const ADMIN_PIN_HASH = '__ADMIN_PIN_HASH__';  // GitHub Actions가 치환

let adminPinVerified = false;

async function verifyAdminPin(pin) {
  const hash = await sha256(pin);
  adminPinVerified = (hash === ADMIN_PIN_HASH);
  sessionStorage.setItem('gdedse_pin_ok', adminPinVerified ? '1' : '');
  return adminPinVerified;
}

// 모든 admin 액션 함수 진입 시 guard
function requirePin(callback) {
  if (adminPinVerified) { callback(); return; }
  showPinModal(callback); // PIN 모달 → 인증 후 callback 실행
}
```

### PIN 세팅 (GitHub Actions Secret)

- GitHub repo → Settings → Secrets → Actions에 두 가지 Secret 등록:
  - `ADMIN_PIN_HASH` : 어드민 PIN의 SHA-256 값
  - `PRIVATE_PIN_HASH` : private 섹션 PIN의 SHA-256 값
- 동일 PIN 사용 시 두 Secret에 같은 값 설정 가능
- PIN 변경 시 GitHub Secret 값 업데이트 후 재배포 (소스 수정 불필요)
- SHA-256 계산: `echo -n "123456" | sha256sum`

### GitHub Actions workflow 연동

```yaml
# .github/workflows/deploy.yml (핵심 스텝)
- name: Inject PIN hashes
  run: |
    sed -i 's/__ADMIN_PIN_HASH__/${{ secrets.ADMIN_PIN_HASH }}/g' \
      _site/gemini_html/GDEDSE/index.html
    sed -i 's/__PRIVATE_PIN_HASH__/${{ secrets.PRIVATE_PIN_HASH }}/g' \
      _site/gemini_html/private/index.html
```

---

## 6. 마이그레이션 계획

### Phase 1: Flat 구조 전환
1. `migrate-to-flat.js` 작성 — contents/ 하위 파일을 루트로 복사 + 구 파일에 redirect 삽입
2. `site.json` 경로 참조 업데이트 (SPA shell 파일 링크 패치)
3. 카테고리 SPA shell 링크 패치 (`patch-spa-shells.js` 수정)
4. **로컬 테스트** 후 git push

### Phase 2: Private 섹션 구축
1. `private/index.html` 생성 (PIN 폼 + 목록)
2. 기존 private 콘텐츠 이동
3. **로컬 테스트** 후 git push

---

## 7. 배포

- **호스팅**: GitHub Pages (master 브랜치 자동 배포)
- **도메인**: `page.chrisnolja.dev` (CNAME → chrisKILee.github.io)
- **CDN 캐시**: Varnish + max-age=600 (10분). 배포 후 최대 10분 지연 가능
- **로컬 테스트**: `python3 -m http.server 8080` (CORS 정책 준수)
