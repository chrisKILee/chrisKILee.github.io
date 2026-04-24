# 작업 인계 문서
> 생성: 2026-04-22
> 브랜치: master
> 마지막 커밋: 82dac3f — fix: 예시 앱 이름/그룹 chris-fun → rnd-ex-app / rnd-ex-app-group 변경

## 새 세션 시작 방법
```
HANDOFF.md 읽고 "page.chrisnolja.dev 사이트 작업" 이어서 작업해줘.
```

---

## 완료된 작업

### 사이트 구조 개편 (2026-04-19 이전)
- [x] gemini_html 제거 → `/[slug]/`, `/c/[slug]/`, `/s/[slug]/` 구조로 전환
- [x] GitHub Actions `Inject PIN hashes` 스텝 제거
- [x] 관리자 모드 PIN 제거 — 버튼 클릭 즉시 토글
- [x] 350개 HTML에 page-header.js 추가
- [x] 파일 단위 tier — `fileCfg.tier || folder.tier || 'public'`
- [x] applyAdminOverrides에 tier/shareToken 추가 — 새로고침 유실 버그 수정
- [x] TDD 인프라: Vitest + jsdom, SPEC.md, 19개 테스트 Green (89912e5)

### 2026-04-22 세션 작업
- [x] **파일별 Tier 경로 시스템 완성** (c848445)
  - `computeFilePath(fileCfg, folder)` 순수 함수 추출 → `assets/js/site-logic.js`
  - vitest TDD 6개 테스트 추가 (총 25개 Green)
  - `index.html` `renderFileCard`가 `folder.path` 대신 `computeFilePath` 사용하도록 수정
  - `scripts/sync-tiers.js` 신규 생성: git pull → git mv → git push 자동화
- [x] **site.json 경로 정합성 수정** (c848445)
  - company tier 폴더 6개 `path` 필드 오류 수정 (`/rnd/` → `/c/rnd/` 등)
  - `V6GMN8N` MySetting: `tier: public` → `private`
  - `404.html` 리다이렉트 맵 업데이트 (52 파일 + 5 폴더)
- [x] **AI News 카테고리 신설 + AI 크롤러 저항 기사** (63e92bb)
  - `KWK4RFF` 폴더 생성 (dir_news, public, `/ai-news/`)
  - `ai-news/ai_resistance_movement.html` — editorial 템플릿 (#20), `UPJ97JY`
- [x] **robots.txt 파헤치기 가이드** (84fbcb4)
  - `ai-study/robots_txt_guide.html` — syntax 템플릿 (#4), 심층 조사(-d)
  - RFC 9309 기반 완전 분석, AI 봇 위반 현황, 차단 예시 코드
  - `8DCYJ45` site.json 등록 (AI Study, order 45)

---

## 진행 중인 작업

| 작업 | 진행률 | 다음 단계 |
|------|--------|-----------|
| BYOR 가이드 레이아웃 수정 | 99% | 브라우저 최종 확인 (443ed42 + 82dac3f로 여러 fix) |

---

## 남은 작업 (우선순위 순)

1. **[미완료]** `gemini_html/aiworker_policy_v1.4.html` 1205번 줄 — `③ 평가위원회` 항목 `수정` 배지 스팬 잔존, 삭제 필요
2. **[권장]** `scripts/sync-tiers.js` 실제 실행 테스트 — tier 변경 후 git mv 정상 동작 확인
3. **[확인 필요]** share 링크 생성 → GitHub 저장 버튼 → `/share/[token].html` 실제 배포 확인
4. **[나중에]** Cloudflare Access 설정 (유료 플랜 확인 후) — `/c/*` company, `/s/*` private
5. **[나중에]** Back Navigation UX — article → category 스크롤 위치 복원 (sessionStorage)
6. **[나중에]** GitHub Dependabot 보안 경고 44개 (5 critical, 26 high) 검토

---

## 현재 핵심 파일

| 파일 | 상태 | 비고 |
|------|------|------|
| `index.html` | ✅ 최신 | 메인 포털, `computeFilePath` 사용 |
| `site.json` | ✅ 최신 | 폴더 31개, 파일 285개, 루트 위치 |
| `assets/js/site-logic.js` | ✅ 최신 | 순수 함수 ES 모듈 (computeFilePath 포함) |
| `test/site-logic.test.js` | ✅ 최신 | 25개 테스트 Green |
| `scripts/sync-tiers.js` | ✅ 신규 | 로컬 실행 전용, tier 변경 후 파일 물리 이동 |
| `404.html` | ✅ 최신 | gemini_html → tier별 신 경로 리다이렉트 맵 |

---

## 핵심 기술 결정사항

### Tier 시스템 (파일별)
- **Tier는 파일 단위**: `getEffectiveTier(file, folder)` = `file.tier || folder.tier || 'public'`
- **폴더 tier는 기본값**일 뿐, 같은 폴더 안에 public/company/private 파일이 공존 가능
- **물리적 경로**: `public → /slug/`, `company → /c/slug/`, `private → /s/slug/`
- Cloudflare Access가 `/c/`, `/s/` 경로를 물리적으로 보호

### computeFilePath 핵심 로직
```javascript
export function computeFilePath(fileCfg, folder) {
  const tier = fileCfg?.tier || folder?.tier || 'public';
  const slug = folder?.slug || '';
  const prefix = tier === 'private' ? '/s/' : tier === 'company' ? '/c/' : '/';
  return `${prefix}${slug}/${fileCfg.filename}`;
}
```

### sync-tiers.js 설계 원칙
- Admin UI는 브라우저 → GitHub API (site.json만 push, git mv 불가)
- 파일 물리 이동은 로컬 `sync-tiers.js` 수동 실행으로 처리
- **함정**: `path.join(ROOT, '/abs/path')` → ROOT 무시됨. 반드시 `.slice(1)` 처리 필요
- site.json 충돌 시 remote(admin push) 버전 채택(`git checkout --theirs`)

### 관리자 모드
- PIN 완전 제거 — Cloudflare Access가 실제 인증 담당
- Share 링크: token 생성 → `_pendingShareCreates` → "GitHub 저장" 클릭 시 PUT `/share/[token].html`

### URL 구조
```
/              — 메인 포털 (index.html)
/[slug]/       — Public 카테고리
/c/[slug]/     — Company 카테고리 (Cloudflare Access 보호)
/s/[slug]/     — Private 카테고리 (Cloudflare Access 보호)
/share/[token] — 공유 링크 (bypass)
/ai-news/      — AI News (신규, 2026-04-22)
```

---

## 알려진 문제 / 주의사항

- `aiworker_policy_v1.4.html` 1205번 줄: `③ 평가위원회` 항목 `수정` 배지 스팬 잔존 (미삭제)
- `site.json` version `4.0` — localStorage 캐시의 version과 일치해야 오버라이드 적용
- Cloudflare Access Free 플랜 불가 — 현재는 GitHub Pages 직접 노출 상태
- `sync-tiers.js`: `folder.slug` 필드 없는 폴더는 건너뜀 (warn 출력)
- robots.txt에서 ClaudeBot만 차단해도 `Claude-User`, `Claude-SearchBot` 별도 선언 필요 (3분류)
- `Crawl-delay` — Googlebot은 무시함. Google Search Console에서 별도 설정 필요

---

## 환경 / 배포 상태

- 정적 GitHub Pages — 실행 서버 없음
- 배포 URL: `https://page.chrisnolja.dev`
- 모든 변경사항 push 완료 (master 브랜치 최신: 82dac3f)
- 테스트: `cd /home/chris/git/chrisKILee.github.io && npm test`
- Cloudflare Access: `/c/` → vntgcorp.com·seah.co.kr / `/s/` → 특정 계정만

---

## 관련 문서

- 사이트 메뉴 구조: `site.json` (루트)
- 공통 스크립트: `assets/js/site-logic.js`, `assets/js/page-header.js`, `assets/js/page-footer.js`
- Tier 파일 이동 자동화: `scripts/sync-tiers.js`
- 단위 테스트: `test/site-logic.test.js` (vitest)
- 페이지 추가 스킬: `/add-new-page` (25종 템플릿)
- Cloudflare 설정 가이드: `CLOUDFLARE_ACCESS_SETUP.md`
