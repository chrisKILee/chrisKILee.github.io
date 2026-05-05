# 작업 인계 문서
> 생성: 2026-05-06
> 브랜치: master
> 마지막 커밋: 794d843 — feat: DeepSeek V4 비교 대상을 3-way로 확장

## 새 세션 시작 방법
```
HANDOFF.md 읽고 "page.chrisnolja.dev 사이트 작업" 이어서 작업해줘.
```

---

## 완료된 작업

### 2026-05-04 ~ 05-06 세션
- [x] **travel_research_2026 오키나와·미야코지마 추가** (7a62cac)
  - Section 01·02 비교표에 2개 여행지 행 추가
  - Section 07 신규: 일본 상세 (케라마 시야 30~40m, 이라부지마 만타레이)
  - Section 08 신규: 17개 전체 편의점·ATM·환전·쇼핑 비교표 + 지역별 환전 팁
  - 여행지 15→17개, 국가 5→6개 숫자 업데이트
- [x] **LazyWeb 심층 분석 페이지** `CWWWDA2` order 50 (649dee7, de77b83)
  - heroui 템플릿, AI Study 카테고리
  - SVG 아키텍처 다이어그램 2개, 경쟁사 비교표
  - MCP 설치 curl 명령어, Claude Code·Cursor·Windsurf 설정 코드 3종
  - 실제 쿼리 예시 4종

### 2026-04-30 ~ 2026-05-05 세션 (원격 병행)
- [x] **Claude Opus 4.7 최적화 가이드** `ZYWT2QJ` — ❋ Claude 카테고리, T2_Howto_Guide (af1d1e7)
  - Opus 4.6 컨텍스트 윈도우 200k→1M 오기 수정
- [x] **2026 여행지 조사 페이지** `KF34N9P` — `/s/travel/travel_research_2026.html` (3cb23fc)
  - 모알보알(Cebu) 추가, 보홀 3곳 비교 callout, 라이트박스

### 이전 세션 완료
- [x] GN#355 Weekly 다이제스트 페이지
- [x] 에이전트 하네스 엔지니어링 페이지 `ADY2FU9`
- [x] AI News 카테고리 + `ai_resistance_movement.html`
- [x] robots.txt 파헤치기 가이드 `8DCYJ45`
- [x] PRD v0.1 작성 (vntg_html 사용자 관리 시스템)

---

## 남은 작업 (우선순위 순)

1. **[미완료]** `gemini_html/aiworker_policy_v1.4.html` 1205번 줄 — `③ 평가위원회` 항목 `수정` 배지 스팬 잔존, 삭제 필요
2. **[권장]** 여행지 지도 이미지 업데이트 — 모알보알 핀 추가 (현재 지도엔 없음)
3. **[신규]** vntg_html PRD Phase 1 구현 — GCP + NestJS + Prisma 셋업
4. **[권장]** `scripts/sync-tiers.js` 실제 실행 테스트
5. **[확인 필요]** share 링크 생성 → GitHub 저장 → `/share/[token].html` 배포 확인
6. **[나중에]** Cloudflare Access 설정 (유료 플랜 확인 후)
7. **[나중에]** GitHub Dependabot 보안 경고 44개 (5 critical, 26 high) 검토

---

## 현재 핵심 파일

| 파일 | 상태 | 비고 |
|------|------|------|
| `index.html` | ✅ 최신 | 메인 포털, `computeFilePath` 사용 |
| `site.json` | ✅ 최신 | 폴더 31개, 파일 290개+ |
| `assets/js/site-logic.js` | ✅ 최신 | 순수 함수 ES 모듈 |
| `test/site-logic.test.js` | ✅ 최신 | 25개 테스트 Green |
| `s/travel/travel_research_2026.html` | ✅ 최신 | 17개 여행지, 9개 섹션 |
| `s/travel/map.png` | ⚠️ 구버전 | 모알보알·오키나와·미야코지마 핀 없음 |
| `ai-study/lazyweb_analysis.html` | ✅ 신규 | `CWWWDA2`, heroui, 7섹션 |
| `claude/claude_opus47_optimize.html` | ✅ 최신 | `ZYWT2QJ`, T2_Howto_Guide |

---

## 핵심 기술 결정사항

### Tier 시스템 (파일별)
- `getEffectiveTier(file, folder)` = `file.tier || folder.tier || 'public'`
- 물리적 경로: `public → /slug/`, `company → /c/slug/`, `private → /s/slug/`

### add-new-page 이미지 처리
- 외부 블로그 이미지는 `curl`로 `{카테고리}/assets/` 또는 `{카테고리}/{슬러그}/`에 다운로드
- 한글화 SVG는 다이어그램이 단순할 때만 시도 — 복잡한 일러스트 SVG 재현은 퀄리티 미달

### vntg_html PRD 핵심 결정
- **그룹 체계**: `public`(비로그인 콘텐츠 설정값), `any`(로그인 전체 자동), `vntg`(@vntgcorp.com), `rnd`/`platform-service`(수동)
- **`public`은 사용자에 할당하는 그룹이 아님** — 콘텐츠 접근 레벨
- **스택**: React+Vite / NestJS / PostgreSQL+Prisma / GCP
- PRD 위치: Obsidian `vntg_html/기획/PRD-v0.1.md`

---

## 알려진 문제 / 주의사항

- `aiworker_policy_v1.4.html` 1205번 줄: `수정` 배지 스팬 잔존 (미삭제)
- `site.json` version `4.0` — localStorage 캐시 version과 일치해야 오버라이드 적용
- 여행지 지도(`map.png`)에 모알보알·오키나와·미야코지마 핀 없음 — 지도 업데이트 시 사용자에게 새 이미지 요청
- Cloudflare Access Free 플랜 불가 — 현재 GitHub Pages 직접 노출 상태
- LazyWeb MCP 토큰(`lw_xxx`)은 공개 저장소 커밋 금지

---

## 환경 / 배포 상태

- 정적 GitHub Pages — 실행 서버 없음
- 배포 URL: `https://page.chrisnolja.dev`
- 모든 변경사항 push 완료 (master 브랜치 최신: 794d843)
- 테스트: `cd /home/chris/git/chrisKILee.github.io && npm test`

---

## 관련 문서

- 사이트 메뉴 구조: `site.json` (루트)
- 공통 스크립트: `assets/js/site-logic.js`, `assets/js/page-header.js`, `assets/js/page-footer.js`
- Tier 파일 이동 자동화: `scripts/sync-tiers.js`
- 페이지 추가 스킬: `/add-new-page` (32종 템플릿)
- vntg_html PRD: Obsidian `vntg_html/기획/PRD-v0.1.md`
