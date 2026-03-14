# 시스템 아키텍처 및 보안 스펙 (v2.0)

> 최종 업데이트: 2026-03-14

## 1. 보안 및 접근 제어 (Security & Stealth)

### 파일 구조 은폐 및 완벽한 고립
- **기본 404 처리 (Strict stealth)**: 유효한 해시 없이 `index.html` 접속 또는 잘못된 비밀키 입력 시 "Page Not Found" 빈 화면만 출력하여 내부 목록을 철저히 은폐합니다.
- **디렉토리별 개별 보안 해시**: 섹션별로 독립적인 비밀 해시를 부여하여, 특정 디렉토리의 비밀키가 노출되어도 다른 디렉토리는 안전하도록 설계합니다.

## 2. 데이터 관리 (Zero-Sync Architecture)

### site.json 기반 단일 진실 원천
- **위치**: `gemini_html/site.json`
- **구조**: `folders` (카테고리 메타) + `files` (파일 메타) 두 섹션
- **런타임 동적 로딩**: 포털(`GDEDSE`)과 각 카테고리 SPA가 실행될 때 `../site.json`을 fetch하여 필요한 데이터만 필터링
- **자동 적용**: `site.json` 수정 후 새로고침만으로 포털·SPA 목록에 즉시 반영 (중복 관리 제로)

### 파일 등록 구조
```json
"FILE_HASH": {
  "filename": "파일명.html",
  "displayName": "표시 이름",
  "categoryHash": "카테고리해시",
  "visible": true,
  "order": 1
}
```

## 3. URL 구조 및 라우팅

### 카테고리 SPA URL 패턴
```
https://page.chrisnolja.dev/gemini_html/{CATEGORY_HASH}/#secretHash
```
- `#secretHash` 가 일치해야 목록이 표시됨 (일치하지 않으면 stealth 404)

### 콘텐츠 직접 URL 패턴
```
https://page.chrisnolja.dev/gemini_html/contents/{FILE_HASH}/{filename}.html
```

### 카드 클릭 내비게이션 (v2.0 변경)
- **이전 (v1.x)**: `window.location.hash = file.hash` → SPA 내부 hash 라우팅 + DOM injection 또는 iframe
- **현재 (v2.0)**: `location.href = '../contents/${file.hash}/${file.filename}'` → 콘텐츠 URL로 직접 이동

카테고리 SPA 목록(#secretHash)에서 카드를 클릭하면 `contents/{HASH}/{filename}.html`로 직접 이동합니다.
브라우저 뒤로가기로 카테고리 목록으로 돌아올 수 있습니다.

## 4. 카테고리 SPA 구조

### index.html 기본 구조
```
{CATEGORY_HASH}/index.html
├── fileListView  — 목록 뷰 (secretHash 일치 시 표시)
└── fileContentView — 미사용 (v2.0에서 직접 이동 방식으로 전환)
```

### 핵심 JS 로직
```javascript
async function init() {
    // site.json fetch → filesData 필터링 → renderGrid() + checkHash()
}
function renderGrid() {
    // 카드 onclick: location.href='../contents/${file.hash}/${file.filename}'
}
function checkHash() {
    // hash === SECRET_LIST_HASH → 목록 표시
    // 그 외 → stealth 404
}
```

### 스크립트 일괄 재생성
`patch-spa-shells.js` 실행 시 모든 카테고리 SPA의 JS 블록을 위 패턴으로 재생성합니다.

## 5. 콘텐츠 파일 구조

```
gemini_html/contents/
└── {FILE_HASH}/
    ├── {filename}.html    ← 메인 콘텐츠
    └── images/
        └── {sitesName}/   ← program-guide 이미지
```

- 콘텐츠 HTML은 독립 완전한 SPA (nav, style, script 포함)
- 상위 카테고리 SPA와 CSS/JS 격리됨

## 6. 주요 스크립트

| 스크립트 | 역할 |
|---------|------|
| `patch-spa-shells.js` | 모든 카테고리 index.html JS 블록 일괄 재생성 |
| `add-file.sh` | 새 콘텐츠 디렉토리 및 파일 생성, site.json 자동 등록 |

## 7. 배포

- **호스팅**: GitHub Pages (master 브랜치 자동 배포)
- **도메인**: `page.chrisnolja.dev` (CNAME → chrisKILee.github.io)
- **빌드**: Jekyll (정적 파일 pass-through, gemini_html/ 폴더 그대로 서빙)
- **CDN 캐시**: Varnish + max-age=600 (10분). 배포 후 최대 10분 지연 가능
