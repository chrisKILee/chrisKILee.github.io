# 작업 인계 문서
> 생성: 2026-04-16
> 브랜치: master
> 마지막 커밋: 23d4330 — feat: 수집 테이블에 스토리지 메트릭 항목 추가 및 To-Be 미지원 callout 추가

## 새 세션 시작 방법
```
HANDOFF.md 읽고 gemini_html 사이트 후속 작업 이어서 해줘.
```

---

## 완료된 작업

- [x] `lgtm-cost-analysis.html` 추가 — RDDP-563 통합 모니터링 비용 추산 리포트 (cf84d9e)
  - ⛰️Terroir 카테고리 (`J2N5A7E`), site.json 키 `G7CSDGY`, order 7
  - 소스: `C:/Users/CHRIS LEE/Downloads/rddp-563-lgtm-cost-analysis.html` 그대로 이식
  - 추가 항목: 파비콘 태그 + `page-footer.js` 툴바 삽입
- [x] push 완료 — origin/master 최신 상태

---

## 진행 중인 작업

없음 (이번 세션 작업 전부 완료)

---

## 남은 작업 (우선순위 순)

1. **[미완료]** `aiworker_policy_v1.4.html` 1205번 줄 `수정` 배지 스팬 삭제
   - 섹션 ③ 평가위원회 항목에 `<span class="badge">수정</span>` 잔존
2. **[확인 필요]** `route_to_terroir.html` 브라우저 최종 확인 (라이트/다크 토글 + no-flicker)
3. **[나중에]** site.json 페이지 수 증가에 따른 memory 업데이트 (현재 207개 이상 등록)

---

## 현재 작업 중인 파일

- `gemini_html/lgtm-cost-analysis.html` — 완성. 추가 수정 없음
- `gemini_html/aiworker_policy_v1.4.html` — 1205번 줄 `수정` 배지만 미삭제
- `gemini_html/route_to_terroir.html` — SPA 완성. 브라우저 최종 확인 미완료

---

## 핵심 기술 결정사항

### lgtm-cost-analysis.html
- **소스 그대로 이식**: 사용자가 "테마는 그대로" 명시 → Playfair Display + Inter + JetBrains Mono 조합 유지
- **추가 항목만 삽입**: 파비콘 `<link rel="icon" ...>` + `page-footer.js` 툴바 스크립트
- **mermaid.js 포함**: 원본에 mermaid 다이어그램이 있어 CDN 스크립트 그대로 유지

### route_to_terroir.html 디자인 시스템
- **폰트**: Cormorant Garamond (display) + DM Sans (body) + JetBrains Mono (meta)
- **컬러**: 딥 다크 `#080609` 베이스, 골드 `#C9A84C` 악센트
- **라이트 테마**: `html[data-theme="light"]` CSS 변수 오버라이드 방식 (크림 `#F8F4EE`)
- **No-flicker**: `<head>` 인라인 스크립트 → `document.documentElement`에 즉시 적용
- **테마 유지**: `localStorage('rtt-theme')`

---

## 알려진 문제 / 주의사항

- `aiworker_policy_v1.4.html` 1205번 줄: `③ 평가위원회` 항목에 `수정` 배지 스팬 잔존
- `route_to_terroir.html` stats `.stat:last-child { border-right: none; }` — flex 레이아웃 마지막 stat 오른쪽 border 처리 확인 필요

---

## 환경 / 배포 상태

- 정적 GitHub Pages (실행 서버 없음)
- 배포 URL: `https://page.chrisnolja.dev/gemini_html/`
- master 브랜치 push 완료 (최신)

---

## 관련 문서

- 사이트 구조: `gemini_html/site.json`
- 공통 하단 툴바: `gemini_html/page-footer.js`
- AI-WORKER 정책: `gemini_html/aiworker_policy_v1.4.html`
- 테루아 SPA: `gemini_html/route_to_terroir.html`
