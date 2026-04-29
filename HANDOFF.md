# 작업 인계 문서
> 생성: 2026-04-29  
> 브랜치: master  
> 마지막 커밋: ba9599e — feat: Claude Context Handoff 4계층 전략 페이지 추가

## 새 세션 시작 방법
```
HANDOFF.md 읽고 "page.chrisnolja.dev 사이트 작업 + vntg_html PRD 작업" 이어서 작업해줘.
```

---

## 완료된 작업

### 2026-04-28 이전 세션
- [x] gemini_html 제거 → `/[slug]/`, `/c/[slug]/`, `/s/[slug]/` 구조 전환
- [x] TDD 인프라: Vitest + jsdom, 25개 테스트 Green
- [x] 파일별 Tier 경로 시스템 완성
- [x] AI News 카테고리 신설
- [x] GN#355 Weekly 다이제스트 페이지
- [x] 에이전트 하네스 엔지니어링 페이지 `ADY2FU9` (원본 이미지 4개 포함)

### 2026-04-29 세션
- [x] **vntg_html PRD v0.1 화면 정의 섹션 추가** (섹션 16)
  - S01~S09 화면 정의 (카드뷰, 카테고리 목록뷰, 검색, Admin)
  - 모바일 리스트형 카드 반응형 정의
- [x] **PRD 전체 일관성 수정** (6개 항목)
  - GCP → K8s 기반으로 전면 교체
  - 섹션 9.3 콘텐츠 권한 관리로 복원
  - Admin NavBar `admin.vntgcorp.com` → `/admin` 통합
- [x] **PRD 핵심 결정사항 전체 반영**
  - 서브도메인: `town.vntgcorp.com` 단일 도메인 확정
  - K8s Ingress path 라우팅: `/api/*` → NestJS, `/*` → React SPA
  - PostgreSQL: K8s 클러스터 기본 제공 재사용 (별도 프로비저닝 없음)
  - 카테고리: DB 없음, `categories.json` 파일 관리
  - 콘텐츠: React SPA 컴포넌트 (본문 DB 저장 없음, 메타데이터만)
  - 그룹 계층 제거 → 플랫 멀티 그룹 (`user.groups ∩ content.allowedGroups`)
  - JWT 8시간 만료, Refresh Token 없음, 만료 시 GCP 재로그인
  - Admin 접근: NestJS `RolesGuard` (Role=ADMIN)
  - Admin 부트스트랩: `prisma db seed`
  - 콘텐츠 등록: GitOps (로컬 작성 → Git Push → CI/CD → `contents.json` sync)
  - 멀티 테넌트: 단일 조직(VNTG) 확정, 공유 링크 향후 검토

---

## 남은 작업 (우선순위 순)

### page.chrisnolja.dev
1. **[미완료]** `gemini_html/aiworker_policy_v1.4.html` 1205번 줄 — `수정` 배지 스팬 잔존, 삭제 필요
2. **[권장]** `scripts/sync-tiers.js` 실제 실행 테스트
3. **[확인 필요]** share 링크 생성 → GitHub 저장 → `/share/[token].html` 배포 확인
4. **[나중에]** Cloudflare Access 설정 (유료 플랜 확인 후)
5. **[나중에]** GitHub Dependabot 보안 경고 44개 (5 critical, 26 high) 검토

### vntg_html PRD
6. **[다음]** PRD v0.1 → v0.2 보완
   - 검색 API 엔드포인트 추가 (`GET /api/search?q=`)
   - K8s Deployment/Service/Ingress YAML 명세
   - 환경변수 목록 정리 (`ENCRYPTION_KEY`, `DATABASE_URL`, `GOOGLE_CLIENT_ID/SECRET`)
7. **[다음]** Phase 1 세부 구현 계획 수립 → `/plan` 스킬로 태스크 분해
8. **[나중에]** 공유 링크 기능 검토 (share token → ContentGroup)

---

## 현재 핵심 파일

| 파일 | 상태 | 비고 |
|------|------|------|
| `index.html` | ✅ 최신 | 메인 포털 |
| `site.json` | ✅ 최신 | 폴더 31개, 파일 289개+ |
| `assets/js/site-logic.js` | ✅ 최신 | 순수 함수 ES 모듈 |
| `test/site-logic.test.js` | ✅ 최신 | 25개 테스트 Green |
| `gemini_html/aiworker_policy_v1.4.html` | ⚠️ 잔존 버그 | 1205번 줄 `수정` 배지 스팬 삭제 필요 |

---

## 핵심 기술 결정사항

### page.chrisnolja.dev
- `getEffectiveTier(file, folder)` = `file.tier || folder.tier || 'public'`
- 물리적 경로: `public → /slug/`, `company → /c/slug/`, `private → /s/slug/`

### vntg_html (town.vntgcorp.com)
- **도메인**: `town.vntgcorp.com` 단일 도메인
  - `/api/*` → NestJS API Pod (K8s Ingress path 라우팅)
  - `/admin/*` → React SPA (같은 빌드, NestJS RolesGuard로 보호)
  - `/*` → React SPA 콘텐츠
- **인프라**: K8s 기존 클러스터 + Ingress (기존 LB 재사용, 별도 LB 비용 없음)
- **DB**: K8s 클러스터 기본 제공 PostgreSQL
- **카테고리**: `categories.json` 파일 관리 (DB 없음, Admin UI 없음)
- **콘텐츠 본문**: React SPA 컴포넌트 (DB에 메타데이터만 저장)
- **그룹 모델**: 플랫 멀티 그룹 — `user.groups ∩ content.allowedGroups ≠ ∅`
- **JWT**: 8시간 만료, Refresh Token 없음, 만료 시 GCP 재로그인
- **Admin 보호**: NestJS `RolesGuard` (Role=ADMIN), 프론트엔드 role 체크 후 `/` 리다이렉트
- **Admin 부트스트랩**: `prisma db seed` (배포 시 1회 — 시스템 그룹 5개 + ADMIN 계정)
- **콘텐츠 등록**: GitOps — 로컬 SPA 컴포넌트 작성 → `contents.json` 추가 → Git Push → CI/CD → DB sync
  - `defaultGroups`: 최초 등록 시에만 적용, 이후 Admin S07에서 변경한 권한 유지

### vntg_html PRD 현황
- PRD 위치: Obsidian `vntg_html/기획/PRD-v0.1.md`
- 총 16개 섹션, 미결 사항 6개 중 5개 해결

---

## 알려진 문제 / 주의사항

- `aiworker_policy_v1.4.html` 1205번 줄: `수정` 배지 스팬 잔존
- `site.json` version `4.0` — localStorage 캐시 version과 일치해야 오버라이드 적용
- Cloudflare Access Free 플랜 불가 — 현재 GitHub Pages 직접 노출 상태

---

## 환경 / 배포 상태

- 정적 GitHub Pages — 실행 서버 없음
- 배포 URL: `https://page.chrisnolja.dev`
- 모든 변경사항 push 완료 (master 브랜치 최신: ba9599e)
- 테스트: `cd /home/chris/git/chrisKILee.github.io && npm test`

---

## 관련 문서

- 사이트 메뉴 구조: `site.json` (루트)
- 공통 스크립트: `assets/js/site-logic.js`, `assets/js/page-header.js`, `assets/js/page-footer.js`
- Tier 파일 이동 자동화: `scripts/sync-tiers.js`
- 페이지 추가 스킬: `/add-new-page`
- **vntg_html PRD**: Obsidian `vntg_html/기획/PRD-v0.1.md`
