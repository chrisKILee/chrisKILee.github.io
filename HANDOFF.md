# 작업 인계 문서
> 갱신: 2026-06-14
> 브랜치: master
> 마지막 커밋: d5bd0c5 — docs: HANDOFF 갱신 (코드 마지막: b33bd71 detail.html 캐시버스팅)
> (오늘 다수 커밋 — Dev Guide·블로그·about·dependabot·AI Tech Feed 등 다중 세션 혼재)

## 새 세션 시작 방법
```
HANDOFF.md 읽고 "page.chrisnolja.dev 사이트 작업 이어서" — Dev Guide/블로그/AI Tech Feed 후속.
```

---

## 완료된 작업

### 이번 세션 (2026-06-14) — AI Tech Feed·캐시버스팅

- [x] **AI Tech Feed 4건 추가** (`/add-new-rssblog`, GeekNews 토픽) — `assets/js/ai-articles.js`. 커밋 `bdb3865`
  - `usecase-007` GLM-5.2(Zhipu 1M 컨텍스트 오픈소스) / `usecase-008` AI 번역 한계
  - `claude-011` 미 정부 Fable 5·Mythos 5 외국인 접근 차단 / `claude-012` WSJ Amazon CEO 촉발 단속
  - **함정**: WebFetch 요약이 모델명 "Fable 5·Mythos 5"를 환각한 줄 의심 → WebSearch 교차검증(TechCrunch·WSJ·Reuters)으로 **실제 명칭(6/9 출시) 확인 후 채택**. 짧은 트윗 원문은 관련 보도 2~3개 조합해 보강
- [x] **aifeed 캐시버스팅 적용** — 커밋 `9a5692d`(목록), `b33bd71`(상세)
  - 증상: 카드 push 후 `/aifeed/`에 새 항목 미노출 → 클릭 시 상세에서 "claude-011 찾을 수 없습니다"
  - 원인: `ai-articles.js` 로드하는 2곳이 **캐시버스팅 쿼리 없이** 로드 → 브라우저가 옛 JS 캐시. 데이터·배포는 처음부터 정상(curl 확인)
  - 해결: `aifeed/index.html` + `ai-news/detail.html` 둘 다 `?v=20260614` 부착. `grep -rn ai-articles.js`로 참조처 2곳뿐임 전수 확인

### 이번 세션 (2026-06-14) — Dev Guide·템플릿·블로그

- [x] **Taste Skill / designlang 도구 소개** — `taste_skill.html`(heroui), `designlang.html`(#34 precision), Design study 카테고리
  - 교훈: 입력 수치는 **GitHub API 실측 검증**. "Star 4.2k"=42k 오기→42,393 정정
- [x] **add-new-page 템플릿 8종 생성** (`~/.claude/skills/add-new-page/templates/`)
  - **함정**: TEMPLATES.md엔 #1~#40 정의됐으나 #33~#40 파일 부재였음. precision·notion·linear·stripe·spotify·apple·ibm·airbnb 생성
  - ⚠️ `~/.claude` repo라 사이트와 별개 — **아직 push 안 함**(sync 필요). 갤러리 index.html은 #26까지만 등록
- [x] **기존 tip 포스트 5종 보강** — git/jekyll/docker/short_cut/bash (`_posts/`), 설치+기본+advanced
- [x] **Dev Guide 카테고리 `KHBBP3P` `/dev-guide/`** + 독립 HTML 3종 — claude_cli·codex_cli·fullstack_architecture (SVG 다이어그램). 커밋 `2f01b59`
- [x] **블로그 포스트 3종** — `_posts/2026-06-1{4,3,2}-*.md`, featured, 각각 Dev Guide HTML로 링크. SVG 썸네일 3종(`img/`). 커밋 `443e611`
- [x] **이슈 해결**: 신규 페이지 "안 보임" → ① site.json version bump(4.0→4.1) 캐시 무효화 ② 사용자 의도는 `/blog/`(Jekyll _posts)였음 → 블로그 포스트로 추가
- [x] **블로그 스타일**: alertbar div 제거, `.article-post` 본문 1.2→1rem + table 윤곽선(`screen.css`)

### 이전 세션 (2026-06-06 ~ 06-07)

- [x] **Understand Anything 페이지 추가** `MXEVBVL` — `/ai-study/understand_anything.html`, heroui(골드)
  - GitHub 화제 오픈소스(Lum1104/Understand-Anything) 소개. 8섹션 + SCAN/MAP/TEACH SVG + 카드뉴스 7장 갤러리
  - **교훈**: 입력 "Star 52,519개"를 GitHub API로 검증 → 실측 **52,909개** 정정. Explore 조사 환각(웹사이트·버전) 의심분은 `api.github.com`으로 재확인 후 사실만 채택
  - 슬래시 명령어 8종은 세션 로드된 `understand-anything:*` 플러그인 스킬과 대조해 확정 (추측 금지)
  - 커밋 `712f02e`
- [x] **cv.chrisnolja.dev 인증서 오류 진단** — 코드 변경 없는 트러블슈팅 (06-07)
  - 증상: Chrome "잘못된 인증 정보" + HSTS 차단. 콘텐츠는 정상, **TLS 인증서만 `CN=*.github.io`**
  - **근본 원인 = Cloudflare 구름색 차이**: page=🟠Proxied(CF 인증서로 가려짐) vs cv=⚪DNS only(GitHub 직결, cv용 인증서 미발급 `cert.state=None`)
  - cv → CNAME → `chrisklee.github.io`(**옛 계정 chrisKlee**, 현 계정 chrisKILee 아님 → 내 토큰 pull만 가능)
  - **해결책(사용자 조치 대기)**: 옵션A=cv 구름 🟠Proxied로(전제 SSL모드 Full) / 옵션B=옛 저장소 Pages custom domain remove→재입력해 인증서 재발급
  - 판별법: IP대역(185.199=GH / 104·172=CF) + 인증서 CN + server 헤더 3종

### 이전 세션 (2026-05-22)

- [x] **cto_synergy.html 인원 수정** — R&D 직속 2명, 플랫폼개발팀 6명, R&D실 합계 8명
- [x] **kpi_2026.html 신규 생성** `5SA5HVS` — `/c/work/`, company tier
  - Google Sheets `_기술지원실 V3` (kpi-agent MCP로 접근, 일반 API 403)
  - CT2(5%)/CT4(15%)/CT5(30%)/CT6(20%)/CT7(10%) + 정량 20%
  - 인프라팀(파란 O) / 정보보호팀(빨간 O) 카드 구조
  - 초기 다크 → 라이트 테마(Pretendard, white bg)로 재디자인
- [x] **platform_vision_2026.html 신규 생성** `47U6WR7` — `/c/work/`, 마주보기 세션 발표 자료
  - **주의**: Obsidian 마주보기 파일은 발언 스크립트 수준 — KPI CT코드 매핑 오류 있었음
  - 실제 KPI 시트 데이터로 전면 정정 완료
  - 섹션0 Ice-Breaking (Padlet 온도체크) / 섹션1~5 방향&비전 / 섹션6 포스트잇 활동
  - 섹션4 "지금 집중하는 것들": 통합모니터링(Grafana Alloy)/GLPI ITAM/ISP전환/SECaaS

### 이전 세션 (2026-05-21)
- [x] **favicon 근본 해결** — `/favicon.ico` SVG 기반 멀티사이즈 ICO 재생성
- [x] **사이트 전체 HTML favicon 태그 일괄 삽입** — curriculum 33개 포함 총 71개 파일

### 이전 세션 (2026-05-12 ~ 05-13)
- [x] **Claude Skills Guide 전면 리빌드**, **add-skill-to-doc SKILL.md 업데이트**
- [x] **AI 코딩 시대의 신뢰와 검증** `38YY3QY`, **Agent View 멀티 세션 관리** `BRWVE22`

### 이전 세션 (2026-05-11)
- [x] **terroir_beta_release.html 링크 연결**, **Karpathy AI 개발 방법론** `Y2JWRZ6`
- [x] **route_to_terroir.html 라이트 테마**, **Terroir Beta 세부 페이지 16개** 등

---

## 남은 작업 (우선순위 순)

0. **[신규]** **`~/.claude` skills sync** — add-new-page 신규 템플릿 8종(#33~#40) 아직 push 안 됨. `/sync-claude`로 동기화
1. **[결정]** **Dev Guide 독립 HTML vs 블로그 포스트 중복** — 같은 콘텐츠가 `/dev-guide/*.html`(site.json)와 `_posts/2026-06-1*.md`(블로그) 두 곳. 현재 블로그→Dev Guide 링크로 병행. 일원화할지 결정
2. **[선택]** `templates/index.html`(--preview 갤러리) #1~#40 번호 정합 정리 — 현재 montage(#26)까지만 등록, T1~T6·#33~#40 누락
0. **[대기]** **cv.chrisnolja.dev 인증서** — Cloudflare에서 cv 레코드 🟠Proxied로 전환(SSL모드 Full 확인). 또는 옛 계정 chrisKlee 저장소 Pages 도메인 재발급. (06-07 진단 완료, 사용자 조치 대기)
1. **[미완료]** `gemini_html/aiworker_policy_v1.4.html` 1205번 줄 — `수정` 배지 스팬 잔존, 삭제 필요
2. **[신규]** **Beta Release Letter 페이지 생성** — `terroir_beta_release.html` 6번 카드 `disabled` → `<a>` 교체
3. **[권장]** 여행지 지도 이미지 업데이트 — 모알보알·오키나와·미야코지마 핀 추가
4. **[신규]** vntg_html PRD Phase 1 구현 — GCP + NestJS + Prisma 셋업
5. **[권장]** `scripts/sync-tiers.js` 실제 실행 테스트
6. **[확인 필요]** share 링크 생성 → GitHub 저장 → `/share/[token].html` 배포 확인
7. **[나중에]** Cloudflare Access 설정 (유료 플랜 확인 후)
8. **[나중에]** GitHub Dependabot 보안 경고 44개 (5 critical, 26 high) 검토

---

## 현재 핵심 파일

| 파일 | 상태 | 비고 |
|------|------|------|
| `index.html` | ✅ 최신 | 메인 포털 |
| `site.json` | ✅ 최신 | 폴더 32개+, 파일 294개+ |
| `favicon.svg` / `favicon.ico` | ✅ 최신 | SVG 기반 멀티사이즈 ICO (2026-05-21) |
| `_layouts/default.html` | ✅ 최신 | favicon.svg 적용 |
| `c/work/kpi_2026.html` | ✅ 최신 | `5SA5HVS`, 라이트 테마, CT2~CT7 + 정량 |
| `c/work/platform_vision_2026.html` | ✅ 최신 | `47U6WR7`, 마주보기 발표용, 섹션0~6 |
| `c/work/cto_synergy.html` | ✅ 최신 | R&D 직속 2명, 플랫폼개발팀 6명 |
| `c/terroir/terroir_beta_release.html` | ✅ 최신 | Beta Release Letter "준비 중" (disabled) |
| `c/terroir/beta/index.html` | ✅ 최신 | `MB7MB67` |
| `curriculum/` | ✅ 최신 | Grafana Alloy 커리큘럼 33개 |
| `s/travel/map.png` | ⚠️ 구버전 | 모알보알·오키나와·미야코지마 핀 없음 |
| `gemini_html/aiworker_policy_v1.4.html` | ⚠️ 수정 필요 | 1205번 줄 `수정` 배지 스팬 잔존 |

---

## 핵심 기술 결정사항

### KPI 데이터 접근
- Google Sheets API / 서비스 계정 → 403 → **kpi-agent MCP (`mcp__kpi-agent__read_raw`) 사용**
- 시트명: `_기술지원실 V3`, gid: `1052340754`
- Spreadsheet ID: `1FpD7SHoGLemFQjbOMcktiiSa3V93wqh0Ezm9D_k-s3A`

### platform_vision_2026 제작 교훈
- Obsidian 마주보기 파일 = 발언 스크립트 (추상적, KPI와 직접 연결 안 됨)
- 발표 자료 콘텐츠는 반드시 KPI 시트 원본 데이터 기준으로 작성할 것
- CT 코드는 시트의 실제 전략지표와 1:1 매핑 후 사용

### favicon 표준 (완성)
- 사이트 전체: `/favicon.svg` (P자, #F97316 오렌지)
- `/favicon.ico` → cairosvg + struct 바이너리로 16/32/48px ICO 생성
- 신규 페이지: `<link rel="icon" type="image/svg+xml" href="/favicon.svg">` 필수

### Tier 시스템
- `public → /slug/`, `company → /c/slug/`, `private → /s/slug/`

### AI Tech Feed 캐시버스팅 (2026-06-14)
- 실제 피드 URL은 `/aifeed/` (스킬 문서가 말하는 `index.html`/`ai-news/detail.html` 직접 경로 아님)
- 카드 목록=`aifeed/index.html`, 상세=`ai-news/detail.html`, 데이터=`assets/js/ai-articles.js`
- **두 파일 모두 `<script src="/assets/js/ai-articles.js?v=YYYYMMDD">`** — ai-articles.js 갱신 시 **두 곳의 `?v=` 날짜를 함께 올려야** 즉시 반영. 한쪽만 고치면 목록은 떠도 상세가 깨짐
- 렌더링은 date 내림차순 + 페이지네이션 → 데이터만 맞으면 최신 항목이 1페이지 상단 노출

---

## 알려진 문제 / 주의사항

- `gemini_html/aiworker_policy_v1.4.html` 1205번 줄: `수정` 배지 스팬 잔존
- `site.json` version `4.0` — localStorage 캐시 version과 일치해야 오버라이드 적용
- 여행지 지도(`s/travel/map.png`)에 모알보알·오키나와·미야코지마 핀 없음
- LazyWeb MCP 토큰(`lw_xxx`)은 공개 저장소 커밋 금지
- `terroir_beta_release.html` Beta Release Letter 카드 — 파일 생성 후 disabled → `<a>` 교체 필요
- 새 파일 수동 생성 시 `<link rel="icon" type="image/svg+xml" href="/favicon.svg">` 태그 필수
- AI Tech Feed(`ai-articles.js`) 갱신 시 `aifeed/index.html` + `ai-news/detail.html`의 `?v=` 날짜 동시 갱신 필수 (안 하면 브라우저 캐시로 상세 404)

---

## 환경 / 배포 상태

- 정적 GitHub Pages — 실행 서버 없음
- 배포 URL: `https://page.chrisnolja.dev`
- 최신 push 완료 (HEAD 139bd2e, 이번 세션 712f02e)
- 테스트: `cd /home/chris/git/chrisKILee.github.io && npm test`
- ⚠️ cv.chrisnolja.dev는 별도 호스팅(옛 계정 chrisKlee/chrisklee.github.io), 본 저장소와 무관

---

## 관련 문서

- 사이트 메뉴 구조: `site.json` (루트)
- 공통 스크립트: `assets/js/site-logic.js`, `assets/js/page-header.js`, `assets/js/page-footer.js`
- 페이지 추가 스킬: `/add-new-page` (32종 템플릿)
- ADR 작성 스킬: `/write-adr`
