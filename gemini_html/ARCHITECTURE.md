# GDEDSE 아키텍처 문서 (v3.0)

> 최종 업데이트: 2026-03-03
> 버전: contents/ 아키텍처 (현행)

---

## 목차

1. [시스템 개요](#1-시스템-개요)
2. [디렉토리 구조](#2-디렉토리-구조)
3. [site.json 스펙](#3-sitejson-스펙)
4. [URL 구조 및 라우팅](#4-url-구조-및-라우팅)
5. [컴포넌트별 역할](#5-컴포넌트별-역할)
6. [콘텐츠 추가 프로세스](#6-콘텐츠-추가-프로세스)
7. [카테고리 폴더 추가 프로세스](#7-카테고리-폴더-추가-프로세스)
8. [site.json 구조 변경 가이드](#8-sitejson-구조-변경-가이드)
9. [보안 모델](#9-보안-모델)
10. [어드민 모드](#10-어드민-모드)
11. [레거시 vs 현행 비교](#11-레거시-vs-현행-비교)

---

## 1. 시스템 개요

정적 GitHub Pages 기반의 **프라이빗 콘텐츠 포털**입니다.

**핵심 설계 원칙:**
- 모든 메타데이터는 `site.json` 한 곳에서 관리 (단일 진실 소스)
- 물리 경로를 URL에 노출하지 않음 (7자 해시로 대체)
- 서버 없이 GitHub Pages에서 동작 (순수 정적 파일)
- iframe 미사용 → DOMParser + innerHTML 인라인 렌더링

---

## 2. 디렉토리 구조

```
gemini_html/
├── site.json              ← 전체 시스템 마스터 설정 (유일한 진실 소스)
├── index.html             ← 루트 리다이렉트 (GDEDSE로 이동)
│
├── GDEDSE/                ← 메인 포털 (어드민 포함)
│   └── index.html
│
├── contents/              ← 모든 콘텐츠 파일 저장소
│   ├── <FILE_HASH>/       ← 파일별 고유 폴더 (7자 해시)
│   │   └── filename.html
│   ├── Z2HASKJ/
│   │   └── A2UI.html
│   └── ... (80개 폴더)
│
├── QT38XYX/               ← 카테고리 SPA shell (🤖 AI Study)
│   └── index.html
├── VNTG7S2/               ← 카테고리 SPA shell (🚀 VNTG AI Study)
│   └── index.html
├── RDH10WS/               ← 카테고리 SPA shell (🔥 Hot News)
│   └── index.html
├── AED13WE/               ← 카테고리 SPA shell (🔬 R&D Projects)
│   └── index.html
├── BF7K2M9/               ← 카테고리 SPA shell (💼 Work, hidden)
│   └── index.html
├── C8PQ4X1/               ← 카테고리 SPA shell (✈️ Travel, hidden)
│   └── index.html
├── RU4TYZ1/               ← 카테고리 SPA shell (🔒 Private, hidden)
│   └── index.html
│
├── add-file.sh            ← 새 콘텐츠 추가 자동화 스크립트
├── patch-spa-shells.js    ← 카테고리 SPA shell 일괄 패치 스크립트
└── migrate-to-contents.js ← (일회성) 구 아키텍처 마이그레이션 스크립트
```

**규칙:**
- 카테고리 폴더(`QT38XYX/` 등)에는 `index.html`만 존재
- 모든 콘텐츠 HTML은 반드시 `contents/<HASH>/` 에 저장

---

## 3. site.json 스펙

```json
{
  "version": "3.0",
  "adminKey": "gdedse-adm-2026",

  "directories": [
    {
      "id": "dir_ai",        // 고유 ID (내부 참조용)
      "name": "🤖 AI Study", // 포털에 표시되는 섹션 제목
      "visible": true,
      "collapsed": false,
      "order": 1
    }
  ],

  "folders": {
    "VNTG7S2": {             // 7자 해시 = 물리 폴더명 + URL
      "dirId": "dir_ai",     // 어느 directory에 속하는지 (null이면 미분류)
      "displayName": "🚀 VNTG AI Study",
      "secretHash": "l-life-auth-77",  // 파일 목록 접근용 비밀 해시
      "visible": true,
      "order": 2
    }
  },

  "files": {
    "Z2HASKJ": {              // 7자 파일 해시 (영구, 절대 변경 금지)
      "filename": "A2UI.html",          // 실제 파일명
      "displayName": "A2UI 에 대하여",  // 포털/SPA 표시명
      "categoryHash": "QT38XYX",        // 속한 카테고리 폴더 해시
      "visible": true,
      "order": 6
    }
  }
}
```

### 해시 규칙
- 문자셋: `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` (O, 0, I, 1 제외 - 혼동 방지)
- 길이: 7자
- 충돌 방지: `folders` 키와 `files` 키 전체에서 유일해야 함

---

## 4. URL 구조 및 라우팅

### 카테고리 SPA (파일 목록)
```
https://page.chrisnolja.dev/gemini_html/VNTG7S2/#l-life-auth-77
                                          ↑폴더해시  ↑secretHash (목록 접근 비밀키)
```

### 개별 콘텐츠 파일 (SPA에서 인라인 렌더링)
```
https://page.chrisnolja.dev/gemini_html/VNTG7S2/#Z2HASKJ
                                                   ↑파일해시
→ SPA가 ../contents/Z2HASKJ/A2UI.html 를 fetch하여 인라인 렌더링
```

### 콘텐츠 파일 직접 URL (영구 고정)
```
https://page.chrisnolja.dev/gemini_html/contents/Z2HASKJ/A2UI.html
```

### 어드민 포털
```
https://page.chrisnolja.dev/gemini_html/GDEDSE/#gdedse-adm-2026
```

---

## 5. 컴포넌트별 역할

### GDEDSE/index.html — 메인 포털
- `site.json`을 fetch하여 전체 카테고리/파일 구조를 렌더링
- 어드민 모드(`#gdedse-adm-2026`)에서 관리 기능 제공:
  - 파일/카테고리 visibility 토글
  - 드래그&드롭으로 파일 카테고리 이동
  - 변경사항 localStorage 캐시 (`gdedse_site_config_v3`)
  - "저장" 버튼으로 site.json 다운로드 후 수동 반영

### `<CATEGORY_HASH>/index.html` — 카테고리 SPA Shell
- `../site.json`을 fetch
- 자신의 `CATEGORY_HASH`에 해당하는 파일만 필터링
- URL hash = 파일 해시 → `../contents/<HASH>/<filename>` fetch → 인라인 렌더링
- URL hash = `SECRET_LIST_HASH` → 파일 목록 표시
- 그 외 → stealth 404

#### SPA Shell 고정 변수 (폴더마다 다름)
```javascript
const SECRET_LIST_HASH = 'l-life-auth-77';  // 목록 비밀키
const CATEGORY_HASH = 'VNTG7S2';            // 이 SPA의 카테고리
```

### contents/<FILE_HASH>/<filename>.html — 콘텐츠 파일
- 독립적인 완전한 HTML 문서
- SPA가 fetch 후 DOMParser로 파싱 → style, link, body, script 순서로 주입
- 직접 URL로도 접근 가능

---

## 6. 콘텐츠 추가 프로세스

### 방법 A: add-file.sh 스크립트 (권장)

```bash
cd /path/to/gemini_html

# 기본 (미분류)
./add-file.sh "report.html"

# 표시명 + 카테고리 지정
./add-file.sh "report.html" "내 리포트" "VNTG7S2"

# 카테고리 목록 확인
./add-file.sh   # 인수 없이 실행
```

스크립트가 자동으로:
1. 유일한 7자 해시 생성
2. `contents/<HASH>/` 폴더 생성
3. 기본 HTML 템플릿 생성 (또는 기존 파일 사용)
4. `site.json.files`에 등록

이후 단계:
```bash
# 1. 생성된 파일 편집
vim contents/<HASH>/report.html

# 2. 커밋
git add contents/<HASH>/ site.json
git commit -m "feat: <파일명> 추가"
git push
```

### 방법 B: 기존 HTML 파일 직접 추가

```bash
# 1. 해시 생성 (충돌 없는 7자)
node -e "
  const fs = require('fs');
  const site = JSON.parse(fs.readFileSync('site.json'));
  const used = new Set([...Object.keys(site.folders), ...Object.keys(site.files)]);
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let h; do { h = Array.from({length:7}, () => chars[Math.floor(Math.random()*chars.length)]).join(''); } while(used.has(h));
  console.log(h);
"

# 2. 폴더 생성 및 파일 복사
mkdir contents/<HASH>
cp my_file.html contents/<HASH>/my_file.html

# 3. site.json.files 에 항목 추가 (수동 편집)
```

`site.json` 추가 항목:
```json
"<HASH>": {
  "filename": "my_file.html",
  "displayName": "내 파일 제목",
  "categoryHash": "VNTG7S2",   // 카테고리 (없으면 null)
  "visible": true,
  "order": 10
}
```

---

## 7. 카테고리 폴더 추가 프로세스

새 카테고리(SPA shell)를 추가하는 단계:

```bash
# 1. 해시 생성
HASH="NEW7HSH"   # 기존과 충돌하지 않는 7자

# 2. 물리 폴더 생성 + SPA shell 복사
mkdir $HASH
cp VNTG7S2/index.html $HASH/index.html

# 3. $HASH/index.html 에서 두 상수 수정
#    SECRET_LIST_HASH = '새로운-비밀키'
#    CATEGORY_HASH = 'NEW7HSH'

# 4. site.json.folders 에 추가
#    "NEW7HSH": {
#      "dirId": "dir_ai",       ← 또는 새 directory id
#      "displayName": "📂 새 카테고리",
#      "secretHash": "새로운-비밀키",
#      "visible": true,
#      "order": 3
#    }

# 5. 원한다면 새 directory 그룹 추가 (site.json.directories)
#    { "id": "dir_new", "name": "🆕 새 섹션", "visible": true, "order": 4 }

# 6. 커밋
git add $HASH/ site.json
git commit -m "feat: <카테고리명> 카테고리 추가"
git push
```

**patch-spa-shells.js 활용:** SPA shell 코드를 일괄 최신화해야 할 때:
```bash
node patch-spa-shells.js
```

---

## 8. site.json 구조 변경 가이드

### ✅ 자유롭게 변경 가능

| 변경 | 방법 |
|------|------|
| 섹션(directory) 추가/삭제 | `directories[]` 편집 |
| 섹션 이름/순서 변경 | `directories[].name`, `.order` 수정 |
| 카테고리를 다른 섹션으로 이동 | `folders[hash].dirId` 변경 |
| 카테고리 표시명/순서 변경 | `folders[hash].displayName`, `.order` 수정 |
| 파일을 다른 카테고리로 이동 | `files[hash].categoryHash` 변경 |
| 파일/카테고리 숨김 | `.visible = false` |
| 파일 표시명 변경 | `files[hash].displayName` 수정 |
| 파일 순서 변경 | `files[hash].order` 수정 |

### ❌ 절대 변경 금지

| 항목 | 이유 |
|------|------|
| `files[hash]`의 **해시 키** | 콘텐츠 파일 URL이 이 해시로 고정됨 |
| `folders[hash]`의 **해시 키** | SPA shell 물리 폴더명 = 이 해시 |
| `files[hash].filename` | `contents/<hash>/filename` 파일명과 일치해야 함 |

---

## 9. 보안 모델

**Security by Obscurity** 방식 (완전한 인증 시스템 아님)

```
공개 URL:  /gemini_html/VNTG7S2/         → stealth 404
접근 URL:  /gemini_html/VNTG7S2/#l-life-auth-77  → 파일 목록 표시
파일 URL:  /gemini_html/VNTG7S2/#Z2HASKJ         → 파일 내용 표시
```

**보안 특징:**
- 해시 없이 SPA 접근 → 빈 404 화면 (구조 노출 없음)
- 카테고리별 독립 secretHash → 한 카테고리가 노출되어도 다른 카테고리는 안전
- 파일 해시 7자 → 무차별 대입 어려움 (32^7 = 약 340억 조합)
- `visible: false` 파일은 목록에 미노출 (어드민 모드만 표시)

**한계:**
- 진짜 인증 없음 (URL 공유 시 누구나 접근)
- GitHub Pages 특성상 소스 코드 공개 (private repo 필수)
- 브라우저 개발자 도구로 네트워크 요청 감시 가능

---

## 10. 어드민 모드

```
접근: GDEDSE/#gdedse-adm-2026
```

**기능:**
- 숨김 파일/카테고리 포함 전체 표시
- 파일 단위 visibility 토글
- 카테고리 단위 visibility 토글
- 드래그&드롭으로 파일 카테고리 이동
- 변경사항 → localStorage 캐시 (`gdedse_site_config_v3`)

**site.json 반영 방법 (현재):**
어드민에서 변경 후 → "Export site.json" 버튼 클릭 → 다운로드 → 수동으로 파일 교체 후 git push

---

## 11. 레거시 vs 현행 비교

| 항목 | 구버전 (v1/v2) | 현행 (v3.0) |
|------|---------------|------------|
| 콘텐츠 저장 위치 | `QT38XYX/*.html` | `contents/<HASH>/*.html` |
| 메타데이터 | 폴더별 `files.json` | 중앙 `site.json.files` |
| SPA 데이터 소스 | `./files.json` fetch | `../site.json` fetch |
| 파일 URL hash | `#filename` (파일명) | `#FILEHASH` (7자 해시) |
| 파일 렌더링 | `<iframe>` | DOMParser 인라인 주입 |
| 설정 관리 | 폴더별 분산 | site.json 중앙 집중 |
| 새 파일 추가 | `files.json` 수동 편집 | `add-file.sh` 자동화 |

---

## 구버전 문서 (무효화)

아래 파일들은 구버전 정보를 담고 있어 현재 아키텍처와 다릅니다:
- `HASH_FOLDER_README.md` — v1 구조 기술 (files.json, GitHub API, iframe)
- `.specify/specs/architecture_spec.md` — v2 구조 기술 (files.json)

이 파일들(`ARCHITECTURE.md`)이 현행 기준 문서입니다.
