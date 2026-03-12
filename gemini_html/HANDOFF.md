# 작업 인계 문서
> 생성: 2026-03-11
> 브랜치: master
> 마지막 커밋: 9f1c323 — feat: ai_security_automation 페이지 AIS3CUR 디렉토리로 이동

## 새 세션 시작 방법
```
HANDOFF.md 읽고 "gemini_html 사이트 페이지 관리" 이어서 작업해줘.
```

---

## 완료된 작업

- [x] **정보보호 AX 전략 대시보드 페이지 생성** (커밋: 084ff60)
  - `contents/W8GDQTF/infosec_ax_dashboard.html` 생성
  - Chart.js 기반 인터랙티브 대시보드 (로그분석, 계정관리, SOAR, ROI 계산기)
  - site.json에 `W8GDQTF` 키로 `AEJUB79`(플랫폼정보보호) 카테고리 등록

- [x] **URL 경로 버그 수정** (커밋: 1464c51)
  - 원인: site.json 키(`W8GDQTF`)와 파일 위치(`7YE3D6S`)가 불일치
  - 수정: 파일을 `contents/W8GDQTF/`로 이동

- [x] **ai_security_automation.html 디렉토리 정리** (커밋: 9f1c323)
  - `7YE3D6S` → `AIS3CUR` 이동 (키-디렉토리 일치 원칙 적용)

- [x] **`/add-new-page` 스킬 생성**
  - 경로: `~/.claude/skills/add-new-page/SKILL.md`
  - 새 HTML 페이지를 gemini_html 사이트에 추가하는 워크플로우 자동화

---

## 핵심 기술 결정사항

### 사이트 URL 구조 원칙 (중요!)
```
site.json 키 = contents/ 하위 디렉토리명 = URL 경로
```
- 예: site.json 키 `W8GDQTF` → 파일 위치 `contents/W8GDQTF/filename.html`
- **키와 디렉토리가 반드시 일치해야 함** (불일치 시 404 발생)
- `targetDir` 지정 시에도 site.json 파일 키는 별도 생성 필요

### 사이트 구조
- 프로젝트 루트: `/home/chris/git/chrisKILee.github.io/gemini_html/`
- 페이지 파일: `contents/{HASH}/{filename}.html`
- 메타 등록: `site.json` → `files` 섹션
- 폴더 목록: `site.json` → `folders` 섹션

### 주요 카테고리 (categoryHash)
| Hash | 이름 |
|------|------|
| `30BD927` | 🤖 AI-Worker |
| `AEJUB79` | 🛡️ 플랫폼정보보호 |
| `7S8LZFY` | ❋ Claude |
| `KPYMQ8C` | 🌉 MCP |
| `QT38XYX` | 🤖 AI Study |

### 기존 핵심 규칙 (이전 세션에서 확립)
- **파일 구조 규칙**: 모든 콘텐츠 HTML은 `contents/[7자리해시]/filename.html` 구조
- **site.json 등록 필수**: `files` 객체에 `categoryHash`, `displayName`, `order` 포함
- **Confluence 이미지 다운로드**: `~/.secrets` 소싱 → `CONFLUENCE_EMAIL`, `CONFLUENCE_API_TOKEN` 사용. curl -u 특수문자 이슈로 **반드시 Python urllib + base64** 방식 사용
- **라이트박스 세로 스크롤**: `align-items: flex-start` + `overflow-y: auto` + 이미지 `width: 80vw / max-width: 1100px` + 닫기버튼 `position: fixed`

---

## 알려진 문제 / 주의사항

- **GitHub 보안 취약점 경고**: 푸시 시 "36 vulnerabilities" 경고가 뜨지만 사이트 운영에는 무관 (Dependabot 알림)
- **site.json 편집 시**: 반드시 `Read` 도구로 최신 내용 확인 후 `Edit` — 동시 수정 시 충돌 발생 가능
- **site.json에서 항목이 외부 편집으로 삭제된 적 있음** — 수동 편집 시 주의

---

## 관련 스킬

| 스킬 | 용도 |
|------|------|
| `/add-new-page` | gemini_html에 새 HTML 페이지 추가 |
| `/commit-push` | 커밋 & 푸시 (PR 없이) |
| `/page-index-add` | AI Tech Feed에 아이템 추가 |
| `/program-guide` | Confluence 링크 → 가이드 HTML 자동 생성 |

---

## 환경 상태

- Git 상태: clean (working tree 없음)
- 배포: GitHub Pages 자동 배포 (`master` 푸시 시 즉시 반영)
- 배포 도메인: `https://page.chrisnolja.dev/gemini_html/`
- Confluence 인증: `~/.secrets` → `CONFLUENCE_EMAIL`, `CONFLUENCE_API_TOKEN`, `CONFLUENCE_BASE_URL`
