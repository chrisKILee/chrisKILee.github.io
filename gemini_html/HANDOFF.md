# 작업 인계 문서
> 생성: 2026-04-03
> 브랜치: master
> 마지막 커밋: fe39cec — fix: 테마 깜빡임(flicker) 제거 - no-flicker mode 적용

## 새 세션 시작 방법
```
HANDOFF.md 읽고 "route_to_terroir SPA 후속 작업" 이어서 작업해줘.
```

---

## 완료된 작업

- [x] `route_to_terroir.html` 다크 럭셔리 와인 테마 전면 리디자인 (c3f3ada)
- [x] SPA 재구성 — 사이드 nav 도트, 섹션 reveal 애니메이션, 스크롤 진행 바, glassmorphism (c3f3ada)
- [x] 가독성 개선 — text-3/4 밝기 상향, stats 중앙 정렬, Terroir 아웃라인 텍스트 → 골드 채움 (2a025d7)
- [x] 라이트 테마 추가 + topbar 토글 버튼 (달/해 아이콘) (b912f41)
- [x] No-flicker mode — `<head>` 인라인 스크립트, `html[data-theme]` 선택자로 변경 (fe39cec)
- [x] 테이블 선 명도 개선 (rule 14%→18%, rule-2 7%→10%)
- [x] `aiworker_policy_v1.4.html` 문구 수정 (dc315c6)
  - 왜 Claude인가: 떼루아 방법론/템플릿 최적화 문장 추가
  - 왜 Antigravity인가: Cursor Team Plan 비용 구조 명확화, 무료 논리 재작성

---

## 진행 중인 작업

| 작업 | 진행률 | 다음 단계 |
|------|--------|-----------|
| route_to_terroir SPA | 95% | 브라우저 최종 확인 후 종결 |

---

## 남은 작업 (우선순위 순)

1. **[확인 필요]** `route_to_terroir.html` 브라우저에서 라이트/다크 토글 + no-flicker 동작 최종 확인
2. **[나중에]** aiworker_policy_v1.4.html — `수정` 배지 삭제 미완료 (1205번째 줄, 섹션③ 평가위원회 항목)

---

## 현재 작업 중인 파일

- `gemini_html/route_to_terroir.html` — SPA 완성. 라이트/다크 토글, no-flicker 포함. 추가 수정 없음
- `gemini_html/aiworker_policy_v1.4.html` — 완성. 1205번 줄 `수정` 배지만 미삭제 상태

---

## 핵심 기술 결정사항

### route_to_terroir.html 디자인 시스템
- **폰트**: Cormorant Garamond (display) + DM Sans (body) + JetBrains Mono (meta)
- **컬러**: 딥 다크 `#080609` 베이스, 골드 `#C9A84C` 악센트
- **트랙 컬러**: NC `#2DD98A` / Vin `#A87EF0` / Elv `#D9AF48`
- **라이트 테마**: `html[data-theme="light"]` CSS 변수 오버라이드 방식 (크림 `#F8F4EE`)
- **No-flicker**: `<head>` 인라인 스크립트 → `document.documentElement`에 즉시 적용
- **테마 유지**: `localStorage('rtt-theme')`

### SPA 구현
- **사이드 nav**: 우측 고정 도트 10개, hover 시 라벨 표시, IntersectionObserver 활성 추적
- **Reveal**: `.reveal` → `.v` 클래스 전환 (`opacity 0→1`, `translateY 24px→0`)
- **진행 바**: `#scroll-prog` width % → `window.scrollY / scrollable * 100`
- **Topbar**: 스크롤 60px 이상 시 `backdrop-filter: blur(20px)` glassmorphism 전환

---

## 알려진 문제 / 주의사항

- `aiworker_policy_v1.4.html` 1205번 줄: `③ 평가위원회` 항목에 `수정` 배지 스팬 잔존
- `route_to_terroir.html` stats `.stat:last-child { border-right: none; }` — flex 레이아웃에서 마지막 stat의 오른쪽 border 처리 확인 필요

---

## 환경 / 배포 상태

- 정적 GitHub Pages (실행 서버 없음)
- 배포 URL: `https://page.chrisnolja.dev/gemini_html/route_to_terroir.html`
- 모든 변경 push 완료 (master 브랜치 최신)

---

## 관련 문서

- 사이트 구조: `gemini_html/site.json`
- 공통 하단 툴바: `gemini_html/page-footer.js`
- AI-WORKER 정책: `gemini_html/aiworker_policy_v1.4.html`
