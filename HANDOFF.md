# 작업 인계 문서
> 생성: 2026-05-05
> 브랜치: master
> 마지막 커밋: 2fd207f — feat: 모알보알(Cebu) 여행지 추가

## 새 세션 시작 방법
```
HANDOFF.md 읽고 "page.chrisnolja.dev 사이트 작업" 이어서 작업해줘.
```

---

## 완료된 작업

### 이번 세션 (2026-04-30 ~ 2026-05-05)
- [x] **Claude Opus 4.7 최적화 가이드** `ZYWT2QJ` — ❋ Claude 카테고리, T2_Howto_Guide 디자인 자체 포함 (f68c174, af1d1e7)
  - Opus 4.6 컨텍스트 윈도우 200k→1M 오기 수정 (두 모델 모두 1M, 토크나이저 차이만)
- [x] **2026 여행지 조사 페이지** `KF34N9P` — `/s/travel/travel_research_2026.html` (3cb23fc)
  - impeccable #22 템플릿, private tier, 총 13개 여행지
  - 보홀 칼라페 + 안다 각각 별도 목적지로 수록
  - 보홀 3곳(팡글라오·안다·칼라페) 비교 callout 추가
  - 지도 이미지 라이트박스 (클릭→오버레이, ESC/배경 닫기, 순수 CSS+JS)
  - 모알보알(Cebu) 추가 — 정어리 떼 연중 무료 입수, 시야 20~50m

### 이전 세션 (2026-04-28)
- [x] GN#355 Weekly 다이제스트 페이지 (aa78427)
- [x] 에이전트 하네스 엔지니어링 페이지 `ADY2FU9` (8affe54)

---

## 남은 작업 (우선순위 순)

1. **[권장]** 여행지 지도 이미지 업데이트 — 모알보알 핀 추가 (현재 지도엔 없음)
2. **[권장]** 세부 추가 여부 결정 (사용자가 고려 중 — 현재 모알보알만 수록)
3. **[미완료]** `gemini_html/aiworker_policy_v1.4.html` 1205번 줄 — `③ 평가위원회` `수정` 배지 스팬 잔존 삭제
4. **[신규]** vntg_html PRD Phase 1 구현 — GCP + NestJS + Prisma 셋업
5. **[확인 필요]** share 링크 생성 → GitHub 저장 → `/share/[token].html` 배포 확인
6. **[나중에]** Cloudflare Access 설정 (유료 플랜 확인 후)
7. **[나중에]** GitHub Dependabot 보안 경고 44개 (5 critical, 26 high) 검토

---

## 현재 핵심 파일

| 파일 | 상태 | 비고 |
|------|------|------|
| `s/travel/travel_research_2026.html` | ✅ 최신 | Hash `KF34N9P`, 13개 여행지, 라이트박스 포함 |
| `s/travel/map.png` | ✅ 최신 | 여행지 지도 이미지 (모알보알 핀 없음) |
| `claude/claude_opus47_optimize.html` | ✅ 최신 | Hash `ZYWT2QJ`, T2_Howto_Guide 자체 포함 CSS |
| `index.html` | ✅ 최신 | 메인 포털 |
| `site.json` | ✅ 최신 | 폴더 31개+, 파일 290개+ |
| `assets/js/site-logic.js` | ✅ 최신 | 순수 함수 ES 모듈 |

---

## 핵심 기술 결정사항

### 여행지 조사 페이지 보홀 처리
- 보홀 칼라페(이슬라 하야하이 리조트)와 안다를 **별도 목적지**로 각각 수록
- 칼라페: 북서쪽, TAG→1시간 15분, 모래해변 없음, 리조트 격리형
- 안다: 남동쪽, TAG→2~3시간, 화이트비치, 거북이·동굴 밸런스형
- 사용자 제공 "팡글라오·안다·칼라페 비교" 참고자료 수렴 — callout으로 삽입

### Tier 시스템 (파일별)
- `getEffectiveTier(file, folder)` = `file.tier || folder.tier || 'public'`
- 물리적 경로: `public → /slug/`, `company → /c/slug/`, `private → /s/slug/`

### vntg_html PRD 핵심 결정 (이전 세션)
- **그룹 체계**: `public`(비로그인 콘텐츠 설정값), `any`(로그인 전체 자동), `vntg`(@vntgcorp.com), `rnd`/`platform-service`(수동)
- **스택**: React+Vite / NestJS / PostgreSQL+Prisma / GCP
- PRD 위치: Obsidian `vntg_html/기획/PRD-v0.1.md`

---

## 알려진 문제 / 주의사항

- `aiworker_policy_v1.4.html` 1205번 줄: `수정` 배지 스팬 잔존 (저우선순위)
- `site.json` version `4.0` — localStorage 캐시 version과 일치해야 오버라이드 적용
- 여행지 지도(`map.png`)에 모알보알 핀이 없음 — 지도 업데이트 필요 시 사용자에게 새 이미지 요청
- Cloudflare Access Free 플랜 불가 — 현재 GitHub Pages 직접 노출 상태

---

## 환경 / 배포 상태

- 정적 GitHub Pages — 실행 서버 없음
- 배포 URL: `https://page.chrisnolja.dev`
- 모든 변경사항 push 완료 (master 브랜치 최신: 2fd207f)
- 테스트: `cd /home/chris/chrisKILee.github.io && npm test`

---

## 관련 문서

- 사이트 메뉴 구조: `site.json` (루트)
- 공통 스크립트: `assets/js/site-logic.js`, `assets/js/page-header.js`, `assets/js/page-footer.js`
- 페이지 추가 스킬: `/add-new-page` (40종 템플릿)
- vntg_html PRD: Obsidian `vntg_html/기획/PRD-v0.1.md`
- 작업일지: Obsidian `Personal/page.chrisnolja.dev/작업일지/2026-05-05.md`
