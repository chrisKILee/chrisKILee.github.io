# 작업 인계 문서
> 생성: 2026-08-26 13:39
> 브랜치: master
> 마지막 커밋: b59e964 — feat: 대마도 카테고리 페이지 Vercel 디자인 시스템으로 재작성
> (working tree clean, push 완료)

## 새 세션 시작 방법

```
HANDOFF.md 읽고 "chris_note — Cloudflare 이관 1단계(Pages 프로젝트 생성 + private repo 연동)" 이어서 작업해줘.
— 스펙은 ~/git/chris_note/.claude/docs/ 의 PRD/TRD/ADR 세 문서에 있다. 착수 전 PRD §9 열린 질문 2건(‘/c/* 사내문서 유무’, ‘Access 무료 50석 좌석 소모 여부’) 확인이 필요하다.
```

---

## 완료된 작업

### 이번 세션(2026-08-26) — 대마도 문서 이관 + 보안 이슈 규명 + Cloudflare 이관 스펙

- [x] **대마도 문서 2종 사이트 추가** (커밋 `0f9931b`)
  - Claude 아티팩트 `대마도 1박2일 지도`(b6fc65f9…) → `tsushima_1n2d_map.html` (해시 `C4YYRLH`)
  - `~/Downloads/busan-tsushima-2026.html` → `busan_tsushima_2026.html` (해시 `QQ8WCF5`)
  - 아티팩트 이관 시 **claude.ai frame-runtime 래퍼 제거**가 핵심(저장 파일 1행에 런타임 전체가 들어 있음)
  - 두 페이지 모두 라이트/다크 토글 + 한국어 타이포 규칙 적용
- [x] **부산 일정표 하드코딩 색상 12종 토큰화 → 다크 팔레트 추가**
- [x] **원본 렌더링 결함 3건 수정**
  - 다크에서 `h2 .num` 배지가 흰 원 + 흰 글자로 소멸 (`--ink`를 배지 배경으로 재사용한 탓 → `--num-bg/--num-fg` 분리)
  - `.note b,.warn b{display:block}`이 문장 중간 강조까지 줄바꿈 → `> b:first-child`로 스코프 축소
  - 카테고리 템플릿의 **검색창이 리스너 없이 방치**돼 아무 동작도 안 함 → 필터 연결 + 빈 결과 상태 추가
- [x] **⛴️ 대마도 여행 카테고리 신설 + public 이관** (커밋 `e301e60`)
  - `PVXJPHQ` / dirId `dir_private` / **tier public** / `/tsushima/` — 후쿠오카(`XDTGJDN`)와 동일 구성
  - `s/travel/` → `tsushima/` 로 `git mv`. 상대경로 리소스 참조 0건 확인 후 이동
- [x] **카테고리 페이지 Vercel 디자인 시스템 적용** (커밋 `b59e964`)
  - ink+gray 무채색 + **4쌍 메시 그라디언트를 히어로에서만**, Inter/JetBrains Mono, display 음수 트래킹, weight 상한 600, 겹쳐 쌓은 그림자 + inset hairline
  - `page-header.js`(공통 네비) 다크 오버라이드 포함 — 이 페이지 한정
  - 1280·390 두 폭 × 라이트/다크 실렌더 검증, 콘솔 에러 0, 가로 오버플로 0
- [x] **🔴 보안 이슈 2건 규명 및 보고** (아래 "알려진 문제" 참조)
- [x] **chris_note 스펙 문서 3종 작성** — `~/git/chris_note/.claude/docs/` PRD(157줄)·TRD(322줄)·ADR(313줄)
- [x] 작업일지(`Personal/page.chrisnolja.dev/작업일지/2026-08-26.md`) + 활동 로그 1행 기록

---

## 진행 중인 작업

없음 (working tree clean, push 완료). 다음 세션은 chris_note 신규 착수.

---

## 남은 작업 (우선순위 순)

1. **[긴급·확인 필요]** **`/c/*` 160개에 실제 사내 문서가 있는지 검토.**
   있으면 ADR-007(회사 콘텐츠 제외)이 재검토 대상이 되고, 저장소 private 전환이 최우선 과제로 올라간다.
   → 이건 Claude가 판단할 수 없는 영역. **사용자 직접 확인 필요.**
2. **[긴급]** `site.json`의 평문 `adminKey`(15자) 폐기·교체 — 공개 저장소에 노출된 시크릿.
   (관리자 모드는 클라이언트 표시 전환이라 피해는 제한적이나 SRD-0상 교체 대상)
3. **[보통]** Cloudflare Access 무료 50석에서 **"지정 사용자" 로그인이 좌석을 소모하는지** 확인.
   소모한다면 TRD P1 기능(지정 사용자 공유)의 확장성 한계가 생긴다.
4. **[보통]** `~/git/chris_note` **git init 또는 원격 연결** — 현재 스펙 문서 3종이 버전관리 밖에 있다.
   (의도적으로 init하지 않았음 — 클론 계획이 있으면 방해되므로)
5. **[보통]** chris_note 마이그레이션 1단계 착수: Pages 프로젝트 생성 + private repo 연동 + 빈 SPA 배포.
   TRD §11에 7단계 계획과 각 단계 검증 기준이 있다.
6. **[나중에]** 공유 링크 UI를 footer에 넣는 건(원 요구) chris_note 이관 후에 자연히 해소된다.
   현행 사이트에서 먼저 하려면 리다이렉트 결함부터 고쳐야 무의미하지 않다.

---

## 현재 작업 중인 파일

### chrisKILee.github.io (이번 세션 결과물, 모두 커밋·push 완료)
- `tsushima/index.html` — 카테고리 인덱스. Vercel 디자인 시스템 참조 구현체. **다른 카테고리에 이 디자인을 확산할 때 원본으로 삼을 것**
- `tsushima/tsushima_1n2d_map.html` — 아티팩트 이관본. SVG 지도 + 3개 동선 + 도심 확대 지도
- `tsushima/busan_tsushima_2026.html` — 2026-11-21~23 실제 여행 일정표. **여행 전까지 living document**
- `site.json` — `PVXJPHQ` 폴더 + 두 파일 등록(memo 태그 포함)

### chris_note (신규, git 미초기화)
- `~/git/chris_note/.claude/docs/PRD.md` — 문제 정의·범위·성공 지표·알려진 위험·열린 질문 6건
- `~/git/chris_note/.claude/docs/TRD.md` — 아키텍처·D1 스키마·API·토큰 설계·동기화·보안·테스트 케이스
- `~/git/chris_note/.claude/docs/ADR.md` — 결정 8건 + 기각된 대안 6건

> `.claude/docs/` 에 둔 이유: `read_project_docs.sh` 훅이 루트·`.claude/docs`·`specs`를 탐색하므로
> 다음 세션에서 그 디렉터리로 들어가면 세 문서가 자동으로 컨텍스트에 올라온다.

---

## 핵심 기술 결정사항

- **인증(Access) / 인가(D1) 분리** (ADR-002) — Access는 **경로 단위** 정책 엔진이라 "문서 A는 철수에게"를 표현할 수 없다. 그래서 Access는 구글 로그인으로 **신원만** 제공하고, 문서별 권한 판단은 Functions+D1이 한다. 두 곳에 권한이 나뉘면 곧 관리 불가능해지므로 **병행하지 않는 것**이 핵심.
  ⚠️ 대신 `CF-Access-JWT-Assertion`을 **반드시 JWKS로 검증**해야 한다. 파싱만 하고 신뢰하면 Access를 우회한 직접 요청으로 위조된다.
- **공유는 Function이 R2에서 읽어 직접 서빙** (ADR-003) — 리다이렉트는 인가를 넘겨주지 않는다. 공개 사본(Notion Publish 방식)도 검토했으나 원본/사본이 갈라져 갱신 누락이 생기므로 기각. "리다이렉트를 반환하지 않는다"를 회귀 테스트로 못박음.
- **토큰 128비트 + SHA-256 해시 저장** (ADR-005) — 현행 41비트(36진수 8자)는 capability URL로 부족. 평문은 발급 응답에서 1회만 반환하고 DB에는 해시만.
- **저작 워크플로는 git 유지** (ADR-004) — 본문을 R2에 두되 `git push` → GitHub Actions가 R2/D1 동기화. 업로드 UI를 만들면 Claude Code 기반 저작 생산성이 떨어진다. private 문서 HTML은 **Pages 배포 산출물에 포함하지 않는다**(배포 URL 추측 노출 방지).
- **Cloudflare 단일 벤더** (ADR-001) — R2만 egress $0 + 상시 무료(S3는 12개월 한정, GCS는 리전 제약). 이미 Access가 구축돼 있어 인증 재사용 가능. Vercel Hobby는 비상업 용도 한정이라 회사 문서를 다루면 약관이 애매해짐.
- **범위는 private 33개만** (ADR-007) — company 160개 제외는 *"괜찮다"가 아니라 "이번엔 다루지 않는다"* 로 기록.
- **디자인 시스템**: Vercel 계열 ink+mesh (ADR-008). 여섯 번째 accent를 도입하지 않는 것이 이 시스템의 전제.

---

## 알려진 문제 / 주의사항

### 🔴 Cloudflare Access가 실질적으로 무력하다 (미해결)

**repo가 public**이라 `raw.githubusercontent.com`으로 private/company 원문이 전부 읽힌다.

```
2026-08-26 실측
  raw.githubusercontent.com/…/s/travel/busan_tsushima_2026.html → 200 (41,897 bytes 전문)
  raw.githubusercontent.com/…/c/ai-worker/…                     → 200
  page.chrisnolja.dev/s/travel/…                                → 302 Access (정상)
  chriskilee.github.io/s/…                                      → 301 커스텀 도메인 (우회 구멍 없음)
```

영향 **private 33 + company 160 = 193개**. Access는 *웹사이트 URL*만 막고 *파일 내용*은 못 막는다.
`CLOUDFLARE_ACCESS_SETUP.md:80`의 서술은 맞지만 "URL만"이라는 단서가 빠져 있었다.

### 🔴 공유 링크가 처음부터 동작한 적 없다 (미해결)

`/share/{token}.html`이 **리다이렉트 스텁**(`location.replace('/s/…')`)이다.
`/share/*`가 Access **Bypass**여도 브라우저가 곧바로 `/s/*`로 재요청하며 다시 막힌다.
기존 토큰 1개(`yk7g8ec4`)가 하필 public 문서(`/fukuoka/fukuoka_2026.html`)에 붙어 있어 결함이 은폐돼 있었다.
→ chris_note 이관으로 구조적으로 해소 예정(ADR-003).

### 주의사항

- **`memo` 필드는 포털에서 `cat-badge`(짧은 태그)로 렌더**된다(`index.html:1384`). 설명문을 넣으면 포털 카드가 깨지므로 **짧은 태그로만** 쓸 것.
- **`body{display:flex;flex-direction:column}`을 쓰면 `.wrap{margin:0 auto}`가 cross축 auto margin으로 해석돼 shrink-to-fit 된다.** `tsushima/index.html`에서 본문이 285px로 찌그러졌던 원인. `width:100%`를 함께 줘야 한다.
- **좁은 뷰포트에서 chrome-devtools 스크린샷이 반복 타임아웃**(`Page.captureScreenshot timed out`)했다. 탭을 새로 열면 해소 — 렌더러 surface 문제로 추정되며 페이지 결함이 아니다(geometry·console로 교차 검증함).
- `tsushima/busan_tsushima_2026.html`은 **2026-11-21~23 실제 여행** 일정표다. 여행 전까지 사실관계가 바뀔 수 있는 living document.
- 두 문서가 public이 되었으므로 **여행 날짜·숙소·가족 구성이 공개 경로에 노출**된다(사용자가 공유 목적으로 결정한 사항).

---

## 환경 / DB 상태

- 실행 중인 서버: 없음 (검증용 `python3 -m http.server 8899`는 세션 중 종료함)
- DB 마이그레이션: 불필요 (현행 사이트는 정적)
- 테스트 상태: 해당 없음 — 실렌더 검증(1280·390 × 라이트/다크)과 HTML 태그 밸런스 스크립트로 확인
- chris_note: 아직 코드 없음. 스펙 문서만 존재하며 git 미초기화

---

## 관련 문서

- **스펙(신규)**: `~/git/chris_note/.claude/docs/{PRD,TRD,ADR}.md`
- Cloudflare Access 설정: `CLOUDFLARE_ACCESS_SETUP.md` (경로별 정책 3종 — `/c/*` Allow, `/s/*` Allow, `/share/*` Bypass)
- 사이트 메뉴 정의: `site.json`
- 스킬: `~/.claude/skills/add-new-page/SKILL.md`
- 디자인 참조 구현: `tsushima/index.html` · agora `apps/fe-user-client/src/pages/CategoryIndexPage.tsx`
- 작업일지: `Personal/page.chrisnolja.dev/작업일지/2026-08-26.md`
