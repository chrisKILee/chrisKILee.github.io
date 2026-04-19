# 작업 인계 문서
> 생성: 2026-04-19 22:25
> 브랜치: master
> 마지막 커밋: 89912e5 — feat: TDD 인프라 구축 및 tier 시스템 명세화

## 새 세션 시작 방법
```
HANDOFF.md 읽고 "page.chrisnolja.dev tier 시스템 후속 작업" 이어서 작업해줘.
```

---

## 완료된 작업

### 사이트 구조 개편 (2026-04-19)
- [x] gemini_html 제거 → `/[slug]/`, `/c/[slug]/`, `/s/[slug]/` 구조로 전환 (f6866a2)
- [x] GitHub Actions `Inject PIN hashes` 스텝 제거 (8f4aff6)
- [x] 카테고리 index.html 경로 수정 (`../site.json` → `/site.json`) (9543f5f)
- [x] 관리자 모드 PIN 제거 — 버튼 클릭 즉시 토글 (b7c80b8)
- [x] 350개 HTML에 page-header.js 추가 (c44d600)
- [x] 카드 tier 배지 (🌍/🏢/🔒) 항상 표시 (1cfc81d)
- [x] 어드민 모드: 파일 단위 tier 버튼, share 버튼 (2d361ac)
- [x] index.html 헤더 제거, Archive → Chris Articles (4725acf)
- [x] render()에 renderFavorites() 추가 (81f4ed1)
- [x] 파일 단위 tier — `fileCfg.tier || folder.tier || 'public'` (7f640b7)
- [x] applyAdminOverrides에 tier/shareToken 추가 — 새로고침 유실 버그 수정 (c1779d7)
- [x] TDD 인프라: Vitest + jsdom, SPEC.md, 19개 테스트 Green (89912e5)

---

## 진행 중인 작업

| 작업 | 진행률 | 다음 단계 |
|------|--------|-----------|
| tier 시스템 검증 | 90% | 브라우저에서 새로고침 후 설정 유지 확인 |
| share 링크 E2E | 80% | GitHub 저장 버튼 → 파일 배포 확인 |
| Cloudflare Access | 30% | 유료 플랜 필요, 추후 진행 |

---

## 남은 작업 (우선순위 순)

1. **[확인 필요]** 브라우저에서 tier 변경 → 새로고침 → 설정 유지 확인 (applyAdminOverrides 수정 후)
2. **[확인 필요]** share 링크 생성 → GitHub 저장 버튼 → `/share/[token].html` 실제 배포 확인
3. **[나중에]** Cloudflare Access 설정 (유료 플랜 확인 후)
   - GCP OAuth 2.0 Client 생성 → Cloudflare Zero Trust Google IdP 연결
   - Application 3개: `/c/*` (company), `/s/*` (private), `/share/*` (bypass)
4. **[나중에]** Back Navigation UX — article → category 스크롤 위치 복원 (sessionStorage)
5. **[나중에]** Floating category nav — 메인 포털 우측 고정 (IntersectionObserver)
6. **[나중에]** `aiworker_policy_v1.4.html` 1205번 줄 `수정` 배지 삭제

---

## 현재 핵심 파일

| 파일 | 상태 | 비고 |
|------|------|------|
| `index.html` | ✅ 최신 | 메인 포털, 84KB |
| `site.json` | ✅ 최신 | schema v4.1, 루트 위치 |
| `assets/js/site-logic.js` | ✅ 신규 | 순수 함수 ES 모듈 (테스트용) |
| `test/site-logic.test.js` | ✅ 신규 | 19개 테스트 Green |
| `SPEC.md` | ✅ 신규 | tier 시스템 행동 명세 |
| `CLOUDFLARE_ACCESS_SETUP.md` | ✅ | Cloudflare 설정 가이드 |

---

## 핵심 기술 결정사항

### Tier 시스템
- **파일 단위 tier**: `fileCfg.tier || folder?.tier || 'public'`
- folder tier와 독립적으로 파일마다 override 가능
- folder tier와 같으면 `delete f.tier` (오버라이드 불필요)
- `applyAdminOverrides`: 허용 키에 `tier`, `shareToken` 포함 필수

### 관리자 모드
- PIN 완전 제거 — Cloudflare Access가 실제 인증 담당
- `toggleAdminMode()`: 버튼 클릭 → isAdmin 토글 → render() + renderFavorites()

### Share 링크
- `toggleShareLink(fileHash)`: token 생성 → `_pendingShareCreates[token] = linkUrl`
- "GitHub 저장" 클릭 시 `submitGithubPush()`가 pending 큐 처리 → PUT `/share/[token].html`
- 삭제: `_pendingShareDeletes.push(token)` → 저장 시 DELETE API 호출

### TDD
- `npm test` → Vitest run (19개 테스트)
- `npm run test:watch` → 파일 변경 감지 모드
- 핵심 로직은 `assets/js/site-logic.js`에 ES 모듈로 관리

### URL 구조
```
/              — 메인 포털 (index.html)
/[slug]/       — Public 카테고리 (19개)
/c/[slug]/     — Company 카테고리 (6개)
/s/[slug]/     — Private 카테고리 (4개)
/share/[token] — 공유 링크 (bypass)
/aifeed/       — AI Tech Feed
```

---

## 알려진 문제 / 주의사항

- `site.json` version 현재 `4.0` — localStorage 캐시의 version과 일치해야 오버라이드 적용
- Cloudflare Access Free 플랜 불가 — 현재는 GitHub Pages 직접 노출 상태
- `aiworker_policy_v1.4.html` 1205번 줄: `수정` 배지 스팬 잔존 (미완료)

---

## 환경 / 배포 상태

- 정적 GitHub Pages + Jekyll (빌드 도구 없음)
- 배포 URL: `https://page.chrisnolja.dev`
- 현재 master 브랜치 최신, CI 통과
- 테스트: `cd /home/chris/git/chrisKILee.github.io && npm test`
