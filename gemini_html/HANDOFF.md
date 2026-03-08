# 작업 인계 문서
> 생성: 2026-03-08
> 브랜치: master
> 마지막 커밋: b800949 - fix: 라이트박스 긴 이미지 스크롤 지원

## 새 세션 시작 방법
```
HANDOFF.md 읽고 "ai-dbms-guide 가이드 작업" 이어서 작업해줘.
```

---

## 완료된 작업

- [x] `ai-dbms-guide.html` 파일 구조 정규화 (루트 → `contents/FED48GQ/`) (커밋: d484144)
- [x] `site.json`에 `FED48GQ` 등록 — 카테고리 `30BD927` (AI-Worker), order 7 (커밋: 81a42a1)
- [x] Confluence 페이지(2316435500)에서 이미지 5개 다운로드 → `contents/FED48GQ/images/ai-dbms-guide/` (커밋: eb40f62)
- [x] HTML에 "화면 안내" 스크린샷 섹션 + 라이트박스 추가 (커밋: eb40f62)
- [x] 라이트박스 세로 긴 이미지 스크롤 지원으로 개선 (커밋: b800949)
- [x] `/program-guide` 스킬(`~/.claude/skills/program-guide/SKILL.md`)에 세로 긴 이미지 라이트박스 패턴 추가

---

## 남은 작업

현재 명시적으로 남은 작업 없음.

---

## 현재 작업 중인 파일

- `gemini_html/contents/FED48GQ/ai-dbms-guide.html` — 완료 상태. 스크린샷 섹션 + 라이트박스 포함
- `gemini_html/site.json` — `FED48GQ` 포함 최신 상태 (version 3.1)
- `~/.claude/skills/program-guide/SKILL.md` — 라이트박스 세로 스크롤 패턴 추가됨

---

## 핵심 기술 결정사항

- **파일 구조 규칙**: 모든 콘텐츠 HTML은 `contents/[7자리해시]/filename.html` 구조. 루트에 직접 두지 않음
- **site.json 등록 필수**: `files` 객체에 `categoryHash`, `displayName`, `order` 포함
- **Confluence 이미지 다운로드**: `~/.secrets` 소싱 → `CONFLUENCE_EMAIL`, `CONFLUENCE_API_TOKEN` 사용. curl -u 특수문자 이슈로 **반드시 Python urllib + base64** 방식 사용
- **라이트박스 세로 스크롤**: `align-items: flex-start` + `overflow-y: auto` + 이미지 `width: 80vw / max-width: 1100px` + 닫기버튼 `position: fixed`

---

## 알려진 문제 / 주의사항

- `site.json`에서 `FED48GQ` 항목이 외부 편집으로 삭제된 적 있음 — 수동 편집 시 주의
- 이미지 6개 다운로드했으나 `072321`과 `072256`이 동일 화면이라 HTML에는 5개만 포함 (`072321`은 폴더에만 존재)

---

## 환경 / DB 상태

- 별도 서버 없음 (정적 사이트)
- Confluence 인증: `~/.secrets` → `CONFLUENCE_EMAIL`, `CONFLUENCE_API_TOKEN`, `CONFLUENCE_BASE_URL`
- 배포: `git push origin master` 즉시 반영 (GitHub Pages)

---

## 관련 파일

- 콘텐츠: `gemini_html/contents/FED48GQ/ai-dbms-guide.html`
- 이미지: `gemini_html/contents/FED48GQ/images/ai-dbms-guide/*.png`
- 사이트 설정: `gemini_html/site.json`
- 가이드 스킬: `~/.claude/skills/program-guide/SKILL.md`
- AI-Worker 카테고리 인덱스: `gemini_html/30BD927/index.html`
