# 작업 인계 문서
> 생성: 2026-05-22
> 브랜치: master
> 마지막 커밋: d4a033d — feat: Ice-Breaking 섹션0 추가 + 섹션6 비전 Padlet 링크 추가

## 새 세션 시작 방법
```
HANDOFF.md 읽고 "page.chrisnolja.dev 사이트 작업" 이어서 작업해줘.
```

---

## 완료된 작업

### 이번 세션 (2026-05-22)

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

---

## 알려진 문제 / 주의사항

- `gemini_html/aiworker_policy_v1.4.html` 1205번 줄: `수정` 배지 스팬 잔존
- `site.json` version `4.0` — localStorage 캐시 version과 일치해야 오버라이드 적용
- 여행지 지도(`s/travel/map.png`)에 모알보알·오키나와·미야코지마 핀 없음
- LazyWeb MCP 토큰(`lw_xxx`)은 공개 저장소 커밋 금지
- `terroir_beta_release.html` Beta Release Letter 카드 — 파일 생성 후 disabled → `<a>` 교체 필요
- 새 파일 수동 생성 시 `<link rel="icon" type="image/svg+xml" href="/favicon.svg">` 태그 필수

---

## 환경 / 배포 상태

- 정적 GitHub Pages — 실행 서버 없음
- 배포 URL: `https://page.chrisnolja.dev`
- 최신 push 완료 (d4a033d)
- 테스트: `cd /home/chris/git/chrisKILee.github.io && npm test`

---

## 관련 문서

- 사이트 메뉴 구조: `site.json` (루트)
- 공통 스크립트: `assets/js/site-logic.js`, `assets/js/page-header.js`, `assets/js/page-footer.js`
- 페이지 추가 스킬: `/add-new-page` (32종 템플릿)
- ADR 작성 스킬: `/write-adr`
