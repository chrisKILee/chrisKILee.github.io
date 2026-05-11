# 작업 인계 문서
> 생성: 2026-05-11
> 브랜치: master
> 마지막 커밋: 1f2f41e — fix: terroir_beta_release.html 연구 노트 6개 카드 링크 연결

## 새 세션 시작 방법
```
HANDOFF.md 읽고 "page.chrisnolja.dev 사이트 작업" 이어서 작업해줘.
```

---

## 완료된 작업

### 이번 세션 (2026-05-11)
- [x] **terroir_beta_release.html 연구 노트 카드 링크 연결** — 6개 toc-card `<div>` → `<a href>` 래핑
  - 무작정 해보기 → `backstage_uat_review.html`
  - 무작정 해보기2 BYOR → `byor_complete_guide.html`
  - GCP 과금 분석 → `lgtm-cost-analysis.html`
  - 과금 체계 BrainStorming → `terroir_pricing.html`
  - Beta Release Critical Path → `terroir_beta_critical_path.html`
  - Beta Release Letter → 파일 미존재, `disabled` 클래스 + "준비 중" 배지로 처리

### 이전 세션 (2026-05-09 ~ 05-10)
- [x] **Terroir Beta Getting Started 목차 페이지** `MB7MB67` — story-driven 4컷 만화 + 여정 타임라인 (c/terroir/beta/index.html)
- [x] **Terroir Beta 세부 페이지 16개** — Confluence REST API body.view 추출, 이미지 61장 다운로드
- [x] **Hunk AI Diff 뷰어 페이지** `WDE3DS9` — AI Study 카테고리, heroui 템플릿 (`ai-study/hunk.html`)
- [x] **ADR-023 cross-VPC ArgoCD 인증** `WTHTCW9` — `c/adr/adr_023_argocd_hub_spoke_cross_vpc_authn.html`
- [x] **ai_tool_support_faq.html** 부서 전용 계정 신청 섹션 수정 (468d2a6)
- [x] **route_to_terroir.html** 라이트 테마 기본값 변경 (8c5c684)
- [x] **Karpathy AI 개발 방법론 페이지** `Y2JWRZ6` 추가 (27cf210)

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
| `site.json` | ✅ 최신 | 폴더 31개+, 파일 290개+ |
| `c/terroir/terroir_beta_release.html` | ✅ 최신 | 연구 노트 목차, 5개 링크 연결 완료, Beta Release Letter "준비 중" |
| `c/terroir/beta/index.html` | ✅ 최신 | `MB7MB67`, story-driven 목차 |
| `c/terroir/beta/gs_*.html` (11개) | ✅ 최신 | Getting Started 세부 페이지 |
| `c/terroir/beta/db_*.html` (4개) | ✅ 최신 | Database 세부 페이지 |
| `c/terroir/beta/trouble_shooting.html` | ✅ 최신 | Trouble Shooting |
| `c/terroir/beta/assets/img/` | ✅ 최신 | 61개 이미지 |
| `ai-study/hunk.html` | ✅ 최신 | `WDE3DS9`, heroui |
| `c/adr/adr_023_argocd_hub_spoke_cross_vpc_authn.html` | ✅ 최신 | `WTHTCW9`, ADR-023 |
| `c/adr/rnd_infra_adr.html` | ✅ 최신 | Global ADR 17개, Accepted 17개 |
| `c/ai-worker/ai_tool_support_faq.html` | ✅ 최신 | 부서 전용 계정 신청, 미확정 스탬프 |
| `s/travel/travel_research_2026.html` | ✅ 최신 | 17개 여행지, 9개 섹션 |
| `s/travel/map.png` | ⚠️ 구버전 | 모알보알·오키나와·미야코지마 핀 없음 |
| `gemini_html/aiworker_policy_v1.4.html` | ⚠️ 수정 필요 | 1205번 줄 `수정` 배지 스팬 잔존 |

---

## 핵심 기술 결정사항

### terroir_beta_release.html toc-card 링크 처리
- toc-card를 `<a>` 태그로 감쌀 때 `text-decoration: none; color: inherit` 필수 (카드 스타일 유지)
- 파일 없는 카드는 `disabled` 클래스 + pointer-events:none + opacity:0.55 처리

### Confluence 콘텐츠 추출
- 외부 Confluence URL은 SPA(JS-rendered) → WebFetch로 HTML 못 가져옴
- 해결: Confluence REST API `?expand=body.view` + Basic auth (`source ~/.secrets`)
- 이미지 다운로드: Python `urllib.request` with Basic auth 헤더

### Terroir IDP / SDD 관계
- Terroir IDP는 개발 플랫폼 자체 — SDD를 강제하지 않음
- SDD(Spec-Driven Development)는 권장 방법론, 별도 설치 필요
- "Backstage" 표현 사용 금지 → "Terroir IDP"로 통일

### write-adr 스킬 경로 주의
- 스킬 SKILL.md의 `gemini_html/site.json` 경로는 구버전
- 실제: 루트 `site.json`, rnd_infra_adr.html은 `c/adr/rnd_infra_adr.html`

### add-new-page push
- `/add-new-page` 스킬은 git push까지 자동 실행 (확인 불필요)

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

---

## 환경 / 배포 상태

- 정적 GitHub Pages — 실행 서버 없음
- 배포 URL: `https://page.chrisnolja.dev`
- 로컬 커밋 완료, **push 미완료** (1f2f41e 포함 push 필요)
- 테스트: `cd /home/chris/git/chrisKILee.github.io && npm test`

---

## 관련 문서

- 사이트 메뉴 구조: `site.json` (루트)
- 공통 스크립트: `assets/js/site-logic.js`, `assets/js/page-header.js`, `assets/js/page-footer.js`
- Tier 파일 이동 자동화: `scripts/sync-tiers.js`
- 페이지 추가 스킬: `/add-new-page` (32종 템플릿)
- ADR 작성 스킬: `/write-adr`
- vntg_html PRD: Obsidian `vntg_html/기획/PRD-v0.1.md`
