# 작업 인계 문서
> 생성: 2026-03-22 13:15
> 브랜치: master
> 마지막 커밋: dc77508 — feat: claude_skills_guide에 누락 커스텀 스킬 4개 추가

## 새 세션 시작 방법

```
HANDOFF.md 읽고 "gemini_html 사이트 페이지 추가" 이어서 작업해줘.
```

---

## 오늘(2026-03-22) 완료된 작업 — 3개 세션 병렬 작업

### 세션 A — AI Study 페이지 연속 추가 (08:53~09:02)
- [x] Browser Use CLI 2.0 가이드 페이지 (커밋: fbc79d2)
  - 파일: `gemini_html/browser_use_cli.html` — 해시: UMHZ62B, order 26
  - CDP 기반 브라우저 자동화 도구 정리
- [x] shadcn Skills AI 어시스턴트 활용법 (커밋: 84013e2)
  - 파일: `gemini_html/shadcn_skills_guide.html` — order 27
- [x] Superpowers vs MoAI-ADK 비교 분석 (커밋: 2084a2f)
  - 파일: `gemini_html/superpowers_vs_moai_adk.html` — 해시: 835ZV8D, order 28
  - Neobrutalism 템플릿, 7단계 Superpowers vs PLAN/RUN/SYNC MoAI 파이프라인 비교
- [x] GPT-5.4 프론트엔드 설계 가이드 (커밋: 8e8cd2f)
  - 파일: `gemini_html/gpt54_frontend_design.html` — 해시: FZWJ9JE, order 29

### 세션 B — AIVE 요청 양식 개발 (10:08~10:46)
- [x] AIVE 요청 양식 가이드 페이지 생성 (커밋: 64b8eba)
  - 파일: `gemini_html/aive_request_guide.html`
- [x] Google Form 연동 — 6대 핵심 체크리스트 (커밋: 43545f0)
- [x] 폼 필드 Pretendard 폰트 적용 (커밋: cecb59c)
- [x] 04번 항목 ZIP 파일 첨부 기능 추가 (커밋: e14945c)

### 세션 C — 정책/스킬/가이드 (11:26~13:02)
- [x] aiworker_policy_v1.2 Action Items 뱃지 수정 (커밋: 06f15b2)
- [x] 이광일 SECUCENTER AIVE-CONTEST 가이드 페이지 추가 (커밋: 80fff3b)
- [x] claude_skills_guide 누락 커스텀 스킬 4개 추가 (커밋: dc77508)
  - 파일: `gemini_html/claude_skills_guide.html` — 101줄 추가

### 이전 세션 완료 작업
- [x] Gemini CLI × MCP 아키텍처 심층 분석 페이지 (커밋: bebbb12)
  - 파일: `gemini_html/gemini_cli_mcp_deep_dive.html` — 해시: SZ5XP56, order 25

---

## 진행 중인 작업

없음 — 모든 세션 작업 완료 및 push 완료.

---

## 남은 작업 (우선순위 순)

1. **[나중에]** 추가 페이지 작성 (사용자 요청 시)
2. **[나중에]** GitHub Dependabot 취약점 36개 검토 (critical 5, high 23, moderate 6, low 2) — 정적 사이트라 직접적 위협은 낮음

---

## 현재 작업 중인 파일

없음 — working tree에 HANDOFF.md만 수정됨.

---

## 핵심 기술 결정사항

### gemini_html 사이트 구조
- `gemini_html/site.json` — 모든 페이지/카테고리 등록부. 새 페이지 추가 시 반드시 업데이트
- 파일 해시: 7자리 고유 ID (`ABCDEFGHJKLMNPQRSTUVWXYZ23456789` 조합)
- 카테고리 해시로 `categoryHash` 연결
- `order` 값: 해당 카테고리 내 최대 order + 1 (현재 QT38XYX 최대: 29)

### 페이지 추가 워크플로우 (`/add-new-page` 스킬)
1. 카테고리 선택 (QT38XYX = 🤖 AI Study 등)
2. 템플릿 선택 (20종, 번호는 갤러리 원본 #1~#20 기준 — 재번호 금지)
3. 해시 자동 생성 → HTML 생성 → site.json 업데이트
4. `/commit-push`로 배포

### 오늘 사용한 템플릿
- `neobrutalism` (#15): 황금/인디고 고대비, Inter 900, 오프셋 섀도우
  - `--color-primary: #FDC800`, `--color-secondary: #432DD7`

### SKILL.md 수정 사항 (이번 세션)
- `add-new-page` 스킬의 템플릿 추천 시 갤러리 원본 번호(#1~#20)로 표시하도록 수정
  - 위치: `/home/chris/.claude/skills/add-new-page/SKILL.md`
  - 이유: 필터링된 추천 목록에서 1,2,3... 재번호로 표시하면 사용자가 잘못된 번호 선택

---

## 알려진 문제 / 주의사항

- **master 브랜치 직접 push**: 이 레포는 GitHub Pages 배포용이므로 master에 직접 커밋/푸시가 정상 패턴
- **병렬 세션 주의**: 같은 레포를 여러 세션에서 동시 작업 시 site.json order 충돌 가능 → 커밋 전 반드시 최신 max order 재확인
- **WebFetch 원문 요약 제한**: 외부 URL 크롤링 시 WebFetch가 전체 원문 대신 요약본을 반환함
- **Dependabot 보안 경고**: push 시마다 경고 메시지 출력되나 무시 가능 (정적 사이트)

---

## 환경 / 배포 상태

- **배포**: GitHub Pages 자동 배포 (master push → 자동 반영, ~1~2분 소요)
- **라이브 URL**: https://page.chrisnolja.dev/gemini_html/
- **DB 마이그레이션**: 해당 없음 (정적 사이트)
- **테스트**: 해당 없음

---

## 관련 문서

- 스킬 가이드: `~/.claude/skills/add-new-page/` — 페이지 추가 전체 워크플로우
- 템플릿 목록: `~/.claude/skills/add-new-page/templates/` — 20종 HTML 템플릿
- 사이트 등록부: `gemini_html/site.json`
