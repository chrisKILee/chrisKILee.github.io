# 작업 인계 문서
> 갱신: 2026-06-14
> 브랜치: master
> 마지막 커밋: 44fe33c — fix(about): 한국어 탭 Build×Run 도식 카드 미표시 수정 (HANDOFF 문서: 5989607)
> (오늘 다수 커밋 — about·Dependabot·Dev Guide·블로그·AI Tech Feed 등 다중 세션 혼재)

## 새 세션 시작 방법
```
HANDOFF.md 읽고 "page.chrisnolja.dev 사이트 작업 이어서" — about/Dev Guide/블로그/AI Tech Feed 후속.
```

---

## 완료된 작업

### 이번 세션 (2026-06-14) — about 재작성·Dependabot 0건

- [x] **/about Medium 스타일 전면 재작성** — 커밋 `9f20a7b`, 톤개정 `f13aa30`, 도식수정 `44fe33c`
  - 기존 Mediumish 데모 제거 → 본인 소개. 영/한 탭(영문 기본), 인라인 SVG 히어로(기술↔사람 브릿지)·Build×Run 도식·커리어 타임라인·People 책임맵·링크블록(CV·LinkedIn·GitHub·IG)
  - **자료 정본**: `../chris_kms/private/iam/` (career-profile·linkedin-about·engineering-manager-role·education-certs) + cv.chrisnolja.dev
  - **톤 피드백 반영**: "내가 다 이끄는 것처럼 보여 겸손하지 못함" → lead/driving/총괄 → support/help/거든다/함께/꿈꾼다. 사실(212명 96%·W3C 5명세·70명)은 유지, 표현만 겸손화
  - 폰트 Merriweather/Georgia serif → **Pretendard**(jsDelivr `@import`), 본문 19→17px, max-width 740→680
  - **함정1**: nano-banana 히어로 이미지 → `GOOGLE_API_KEY`는 Sheets/Drive용이라 generativelanguage **403 API_KEY_SERVICE_BLOCKED** → SVG로 대체
  - **함정2(KO 탭 도식 안 보임)**: 카드 그라데이션이 영어 SVG `<defs>`에만 정의 → 탭 전환 시 영어 패널 `display:none` → `url(#id)` 참조 실패 → rect 투명. **해결**: KO SVG에 자체 `amBuildKo`/`amRunKo` defs. 교훈=토글 영역 인라인 SVG는 defs self-contained
- [x] **Dependabot 보안 경고 44 → 0 전량 해소** — 커밋 `e053bed`·`21318c4`·`259a360`·`53ee55c`
  - **핵심 통찰**: 44건 중 34건이 빌드 산출물 `_site/chris/js/package-lock.json`. `.gitignore`(46줄)에 있는데도 과거 커밋되어 198파일 추적 중 → `git rm -r --cached _site`로 untrack(GitHub Pages 원격 재빌드라 라이브 무영향, 리스크 0) → critical 2 + high 32 소멸
  - 정적 사이트라 npm/gem이 방문자 브라우저에서 실행 안 됨 = 실제 위협 0. 전부 빌드/개발 도구
  - `chris/js/package.json`(옛 CV 배포 헬퍼) 제거, `npm audit fix`로 picomatch 2.3.1→2.3.2
  - **Gemfile.lock 5건**: `gem install --user-install bundler`(시스템 권한 회피) + **`github-pages` gem 핀** → kramdown 1.17→2.4·jekyll 3.8.3→3.10·addressable 2.5.2→2.9. `bundle config set --local path vendor/bundle` 격리
  - 로컬 `jekyll build`는 `PAGES_REPO_NWO=chrisKILee/chrisKILee.github.io` 필요(jekyll-github-metadata)

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
8. **[완료]** ~~GitHub Dependabot 보안 경고 44개 검토~~ → **0건 해소 완료** (2026-06-14)
9. **[선택]** `GEMINI_API_KEY`를 `~/.secrets`에 추가하면 nano-banana 래스터 이미지 생성 가능 (현재 `GOOGLE_API_KEY`는 generativelanguage 차단)

---

## 현재 핵심 파일

| 파일 | 상태 | 비고 |
|------|------|------|
| `index.html` | ✅ 최신 | 메인 포털 |
| `about.md` | ✅ 최신 | Medium 스타일 본인 소개, EN/KO 탭, Pretendard, 인라인 SVG (2026-06-14) |
| `Gemfile` / `Gemfile.lock` | ✅ 최신 | `github-pages` gem 핀(232), 패치 버전. `vendor/bundle` 격리(gitignore) |
| `site.json` | ✅ 최신 | version 4.1, 폴더 32개+, 파일 294개+ |
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

### 로컬 Jekyll 빌드 환경 (2026-06-14 구축)
- ruby 3.2.3 시스템 설치됨(`ruby-full`), bundler는 **사용자 영역**: `gem install --user-install bundler` (PATH: `$(ruby -e 'print Gem.user_dir')/bin`)
- `bundle config set --local path vendor/bundle` → gem을 프로젝트 `vendor/bundle`에 격리(시스템 권한 회피, gitignore됨)
- 빌드: `PAGES_REPO_NWO=chrisKILee/chrisKILee.github.io JEKYLL_ENV=production bundle exec jekyll build --destination /tmp/_site_test`
- `Gemfile`은 `github-pages` gem을 핀 → 라이브(github.io)와 동일 버전으로 로컬 빌드. jekyll-archives만 별도(화이트리스트 밖, 라이브 무시)

### Dependabot 정리 원칙 (2026-06-14)
- 정적 GitHub Pages = npm/gem이 방문자 브라우저에서 실행 안 됨 → lockfile 경고는 실제 위협 0(빌드/개발 도구)
- `_site`는 빌드 산출물 → 절대 커밋 금지(gitignore 46줄). 과거 커밋분은 `git rm -r --cached _site`로 정리 완료
- 유지보수 시 `bundle update`/`npm update`는 vendor/bundle 격리 환경에서

### about 페이지 구조 (2026-06-14)
- `about.md`(Jekyll `layout: page`) 내 인라인 `<style>`+`<script>`로 EN/KO 탭 토글. 스코프 클래스 `.am`
- 톤 원칙: People-first·협업·지원·꿈(겸손). 사실관계는 KMS `private/iam/` 정본 기준
- **토글 영역 인라인 SVG는 그라데이션/필터 defs를 self-contained로** (다른 패널 `display:none` 시 `url(#id)` 참조 깨짐)

### AI Tech Feed 캐시버스팅 (2026-06-14)
- 실제 피드 URL은 `/aifeed/` (스킬 문서가 말하는 `index.html`/`ai-news/detail.html` 직접 경로 아님)
- 카드 목록=`aifeed/index.html`, 상세=`ai-news/detail.html`, 데이터=`assets/js/ai-articles.js`
- **두 파일 모두 `<script src="/assets/js/ai-articles.js?v=YYYYMMDD">`** — ai-articles.js 갱신 시 **두 곳의 `?v=` 날짜를 함께 올려야** 즉시 반영. 한쪽만 고치면 목록은 떠도 상세가 깨짐
- 렌더링은 date 내림차순 + 페이지네이션 → 데이터만 맞으면 최신 항목이 1페이지 상단 노출

---

## 알려진 문제 / 주의사항

- `gemini_html/aiworker_policy_v1.4.html` 1205번 줄: `수정` 배지 스팬 잔존
- `site.json` version `4.1` — localStorage 캐시 version과 일치해야 오버라이드 적용 (site.json 변경 시 version bump 필수)
- nano-banana 이미지 생성 불가 — `~/.secrets`의 `GOOGLE_API_KEY`는 Sheets/Drive 전용(generativelanguage 403). 별도 `GEMINI_API_KEY` 필요
- 토글(탭/아코디언) 영역의 인라인 SVG는 그라데이션·필터 defs를 같은 SVG 안에 둘 것 — 다른 패널 `display:none` 시 `url(#id)` 참조가 깨져 도형이 투명해짐
- 여행지 지도(`s/travel/map.png`)에 모알보알·오키나와·미야코지마 핀 없음
- LazyWeb MCP 토큰(`lw_xxx`)은 공개 저장소 커밋 금지
- `terroir_beta_release.html` Beta Release Letter 카드 — 파일 생성 후 disabled → `<a>` 교체 필요
- 새 파일 수동 생성 시 `<link rel="icon" type="image/svg+xml" href="/favicon.svg">` 태그 필수
- AI Tech Feed(`ai-articles.js`) 갱신 시 `aifeed/index.html` + `ai-news/detail.html`의 `?v=` 날짜 동시 갱신 필수 (안 하면 브라우저 캐시로 상세 404)

---

## 환경 / 배포 상태

- 정적 GitHub Pages — 실행 서버 없음
- 배포 URL: `https://page.chrisnolja.dev`
- 최신 push 완료 (코드 HEAD 44fe33c, HANDOFF 5989607)
- 테스트: `cd /home/chris/git/chrisKILee.github.io && npm test` (vitest 25/25 통과)
- 로컬 Jekyll 빌드 가능 (ruby 3.2.3 + 사용자 bundler, `github-pages` gem 핀 — 위 "로컬 Jekyll 빌드 환경" 참조)
- Dependabot 보안 경고 **0건** (44→0, 2026-06-14)
- ⚠️ cv.chrisnolja.dev는 별도 호스팅(옛 계정 chrisKlee/chrisklee.github.io), 본 저장소와 무관

---

## 관련 문서

- 사이트 메뉴 구조: `site.json` (루트)
- 공통 스크립트: `assets/js/site-logic.js`, `assets/js/page-header.js`, `assets/js/page-footer.js`
- 페이지 추가 스킬: `/add-new-page` (32종 템플릿)
- ADR 작성 스킬: `/write-adr`
