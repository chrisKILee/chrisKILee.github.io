# 작업 인계 문서
> 생성: 2026-04-28
> 브랜치: master
> 마지막 커밋: 8affe54 — fix: 한글화 SVG 제거 — 원본 이미지만 유지

## 새 세션 시작 방법
```
HANDOFF.md 읽고 "page.chrisnolja.dev 사이트 작업" 이어서 작업해줘.
```

---

## 완료된 작업

### 사이트 구조 개편 (2026-04-19 이전)
- [x] gemini_html 제거 → `/[slug]/`, `/c/[slug]/`, `/s/[slug]/` 구조로 전환
- [x] 관리자 모드 PIN 제거 — 버튼 클릭 즉시 토글
- [x] TDD 인프라: Vitest + jsdom, SPEC.md, 25개 테스트 Green

### 2026-04-22 세션 작업
- [x] **파일별 Tier 경로 시스템 완성** (c848445)
- [x] **site.json 경로 정합성 수정** (c848445)
- [x] **AI News 카테고리 신설** + `ai-news/ai_resistance_movement.html` (63e92bb)
- [x] **robots.txt 파헤치기 가이드** `8DCYJ45` (84fbcb4)

### 2026-04-28 세션 작업
- [x] **GN#355 Weekly 다이제스트 페이지** (aa78427)
  - AI News 카테고리, T3_Weekly_Report 템플릿
- [x] **PRD v0.1 작성** — vntg_html 사용자 관리 시스템
  - Obsidian `vntg_html/기획/PRD-v0.1.md`
  - 그룹 체계: public / any / vntg / rnd / platform-service
  - 스택: React+Vite · NestJS · Prisma · PostgreSQL · GCP
- [x] **에이전트 하네스 엔지니어링 페이지** `ADY2FU9` order 48 (0f497ff → 8affe54)
  - Addy Osmani 블로그, AI Study, impeccable #22
  - 원본 이미지 4개 다운로드 (`ai-study/agent_harness/`)
  - 한글화 SVG 시도 → 퀄리티 미달로 원본만 유지

---

## 남은 작업 (우선순위 순)

1. **[미완료]** `gemini_html/aiworker_policy_v1.4.html` 1205번 줄 — `③ 평가위원회` 항목 `수정` 배지 스팬 잔존, 삭제 필요
2. **[신규]** vntg_html PRD Phase 1 구현 — GCP + NestJS + Prisma 셋업
3. **[권장]** `scripts/sync-tiers.js` 실제 실행 테스트
4. **[확인 필요]** share 링크 생성 → GitHub 저장 → `/share/[token].html` 배포 확인
5. **[나중에]** Cloudflare Access 설정 (유료 플랜 확인 후)
6. **[나중에]** GitHub Dependabot 보안 경고 44개 (5 critical, 26 high) 검토

---

## 현재 핵심 파일

| 파일 | 상태 | 비고 |
|------|------|------|
| `index.html` | ✅ 최신 | 메인 포털, `computeFilePath` 사용 |
| `site.json` | ✅ 최신 | 폴더 31개, 파일 289개 |
| `assets/js/site-logic.js` | ✅ 최신 | 순수 함수 ES 모듈 |
| `test/site-logic.test.js` | ✅ 최신 | 25개 테스트 Green |
| `ai-study/agent_harness_engineering.html` | ✅ 신규 | `ADY2FU9`, 원본 이미지 4개 포함 |

---

## 핵심 기술 결정사항

### Tier 시스템 (파일별)
- `getEffectiveTier(file, folder)` = `file.tier || folder.tier || 'public'`
- 물리적 경로: `public → /slug/`, `company → /c/slug/`, `private → /s/slug/`

### vntg_html PRD 핵심 결정
- **그룹 체계**: `public`(비로그인 콘텐츠 설정값), `any`(로그인 전체 자동), `vntg`(@vntgcorp.com 자동), `rnd`/`platform-service`(수동)
- **`public`은 사용자에 할당하는 그룹이 아님** — 콘텐츠에 설정하는 접근 레벨
- **스택**: React+Vite (SPA+Admin) / NestJS / PostgreSQL+Prisma / GCP
- PRD 위치: Obsidian `vntg_html/기획/PRD-v0.1.md`

### add-new-page 이미지 처리
- 외부 블로그 이미지는 `curl`로 `{카테고리}/assets/` 또는 `{카테고리}/{슬러그}/`에 다운로드
- 한글화 SVG는 다이어그램이 단순할 때만 시도 — 복잡한 일러스트 SVG 재현은 퀄리티 미달

---

## 알려진 문제 / 주의사항

- `aiworker_policy_v1.4.html` 1205번 줄: `수정` 배지 스팬 잔존
- `site.json` version `4.0` — localStorage 캐시 version과 일치해야 오버라이드 적용
- Cloudflare Access Free 플랜 불가 — 현재 GitHub Pages 직접 노출 상태

---

## 환경 / 배포 상태

- 정적 GitHub Pages — 실행 서버 없음
- 배포 URL: `https://page.chrisnolja.dev`
- 모든 변경사항 push 완료 (master 브랜치 최신: 8affe54)
- 테스트: `cd /home/chris/git/chrisKILee.github.io && npm test`

---

## 관련 문서

- 사이트 메뉴 구조: `site.json` (루트)
- 공통 스크립트: `assets/js/site-logic.js`, `assets/js/page-header.js`, `assets/js/page-footer.js`
- Tier 파일 이동 자동화: `scripts/sync-tiers.js`
- 페이지 추가 스킬: `/add-new-page` (32종 템플릿)
- vntg_html PRD: Obsidian `vntg_html/기획/PRD-v0.1.md`
