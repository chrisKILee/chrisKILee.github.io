# 작업 인계 문서
> 생성: 2026-05-19
> 브랜치: master
> 마지막 커밋: 108c922 — fix: favicon 전수 수정 — 153개 파일에 favicon.svg 태그 추가

## 새 세션 시작 방법
```
HANDOFF.md 읽고 "page.chrisnolja.dev 사이트 작업" 이어서 작업해줘.
```

---

## 완료된 작업

### 이번 세션 (2026-05-19)
- [x] **favicon 전수 수정** — 153개 HTML 파일에 `favicon.svg` 태그 일괄 삽입
  - 문제: `cto_synergy.html` 등 favicon 태그 없는 파일이 구버전 `favicon.ico` 폴백 사용
  - 방법: Python 스크립트로 `</head>` 앞에 일괄 삽입
  - `_layouts/default.html` 구버전 `assets/images/logo.png` → `favicon.svg` 교체
  - 제외: `_site/`, `_includes/`, `_layouts/`, `OBIGO_SPEC/` 등 (Jekyll 파셜/구버전)

### 이전 세션 (2026-05-12 ~ 05-13)
- [x] **Claude Skills Guide 전면 리빌드** — 치트시트 정리, 아코디언 구조로 재빌드
- [x] **add-skill-to-doc SKILL.md 업데이트** — 새 카드 구조 반영
- [x] **AI 코딩 시대의 신뢰와 검증 페이지** `38YY3QY` — T1_Daily_News_Digest, `/ai-news/`
- [x] **Agent View 멀티 세션 관리 가이드** `BRWVE22` — T2_Howto_Guide, `/claude-tip/`

### 이전 세션 (2026-05-11)
- [x] **terroir_beta_release.html 연구 노트 카드 링크 연결** — 5개 `<a>`, 1개 `disabled`
- [x] **Karpathy AI 개발 방법론 페이지** `Y2JWRZ6`
- [x] **route_to_terroir.html** 라이트 테마 기본값 변경
- [x] **Terroir Beta 세부 페이지 16개**, **Hunk AI Diff 뷰어** `WDE3DS9`, **ADR-023** `WTHTCW9`

---

## 남은 작업 (우선순위 순)

1. **[미완료]** `gemini_html/aiworker_policy_v1.4.html` 1205번 줄 — `수정` 배지 스팬 잔존, 삭제 필요
2. **[신규]** **Beta Release Letter 페이지 생성** — `terroir_beta_release.html` 6번 카드 현재 "준비 중", 페이지 만들면 `disabled` → `<a>` 태그로 교체
3. **[권장]** 여행지 지도 이미지 업데이트 — 모알보알·오키나와·미야코지마 핀 추가 (사용자에게 새 이미지 요청 필요)
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
| `site.json` | ✅ 최신 | 폴더 32개+, 파일 292개+ |
| `favicon.svg` | ✅ 최신 | P자 오렌지 로고, 사이트 전체 표준 favicon |
| `_layouts/default.html` | ✅ 최신 | favicon.svg로 교체 완료 |
| `claude/claude_skills_guide.html` | ✅ 최신 | 카드 전면 리빌드, 아코디언 동작 |
| `claude-tip/agent_view_guide.html` | ✅ 최신 | `BRWVE22`, T2_Howto_Guide |
| `ai-news/ai_coding_trust_verification.html` | ✅ 최신 | `38YY3QY`, T1_Daily_News_Digest |
| `c/terroir/terroir_beta_release.html` | ✅ 최신 | 5개 링크 연결 완료, Beta Release Letter "준비 중" |
| `c/terroir/beta/index.html` | ✅ 최신 | `MB7MB67`, story-driven 목차 |
| `c/adr/rnd_infra_adr.html` | ✅ 최신 | Global ADR 17개 |
| `s/travel/map.png` | ⚠️ 구버전 | 모알보알·오키나와·미야코지마 핀 없음 |
| `gemini_html/aiworker_policy_v1.4.html` | ⚠️ 수정 필요 | 1205번 줄 `수정` 배지 스팬 잔존 |

---

## 핵심 기술 결정사항

### favicon 표준 (신규)
- 사이트 전체 표준: `/favicon.svg` (P자, #F97316 오렌지 + #FED7AA 연오렌지)
- 구버전 파일: `/favicon.ico`, `/img/favicon.ico`, `/assets/images/favicon.ico` — 사용 중단
- 신규 페이지 생성 시 `<link rel="icon" type="image/svg+xml" href="/favicon.svg">` 필수 포함
- Jekyll 레이아웃: `_layouts/default.html`에서 이미 적용, Liquid 템플릿 파일은 별도 태그 불필요

### Claude Skills Guide 카드 구조
- 새 카드: `skill-meta`(smeta-label/val) + `wf-toggle` button(aria-expanded) + `wf-panel`(hidden) + `wf-steps` ol
- 아코디언 JS: `nextElementSibling`으로 wf-panel 찾아 `panel.hidden = expanded` 토글
- 외부 팩 판별: SKILL.md `description` 필드가 영어이면 외부 팩으로 간주, 제외

### add-skill-to-doc 스킬 업데이트
- HTML 파일 경로: `SK1LL2G/` 구버전 → `claude/claude_skills_guide.html`
- `origin-badge` 미포함 (현재 디자인에서 제거됨)
- 제외 목록: Power Pack 30개 + 외부 팩 18개 + 가이드라인 7개

### Agent View 페이지 조사 방법
- 공식 블로그 WebFetch로 심층 조사
- 최소 버전 v2.1.139, Research Preview 상태 (2026-05-11 발표)

### terroir_beta_release.html toc-card 링크 처리
- toc-card를 `<a>` 태그로 감쌀 때 `text-decoration: none; color: inherit` 필수
- 파일 없는 카드: `disabled` 클래스 + pointer-events:none + opacity:0.55

### Tier 시스템
- `public → /slug/`, `company → /c/slug/`, `private → /s/slug/`

---

## 알려진 문제 / 주의사항

- `gemini_html/aiworker_policy_v1.4.html` 1205번 줄: `수정` 배지 스팬 잔존 (미삭제)
- `site.json` version `4.0` — localStorage 캐시 version과 일치해야 오버라이드 적용
- 여행지 지도(`s/travel/map.png`)에 모알보알·오키나와·미야코지마 핀 없음
- LazyWeb MCP 토큰(`lw_xxx`)은 공개 저장소 커밋 금지
- Cloudflare Access Free 플랜 불가 — 현재 GitHub Pages 직접 노출 상태
- `terroir_beta_release.html` Beta Release Letter 카드 — 파일 생성 후 `disabled` → `<a>` 태그로 교체 필요
- T2_Howto_Guide 템플릿 사용 시 `/templates/assets/common.css`·`common.js` 경로 확인 필수

---

## 환경 / 배포 상태

- 정적 GitHub Pages — 실행 서버 없음
- 배포 URL: `https://page.chrisnolja.dev`
- 모든 커밋 push 완료 (master 최신: 108c922)
- 테스트: `cd /home/chris/git/chrisKILee.github.io && npm test`

---

## 관련 문서

- 사이트 메뉴 구조: `site.json` (루트)
- 공통 스크립트: `assets/js/site-logic.js`, `assets/js/page-header.js`, `assets/js/page-footer.js`
- 템플릿 공통 CSS/JS: `templates/assets/common.css`, `templates/assets/common.js`
- 페이지 추가 스킬: `/add-new-page` (32종 템플릿)
- ADR 작성 스킬: `/write-adr`
- vntg_html PRD: Obsidian `vntg_html/기획/PRD-v0.1.md`
