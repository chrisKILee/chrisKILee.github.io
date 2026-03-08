# HANDOFF — 세션 인계 문서

> 마지막 업데이트: 2026-03-08
> 브랜치: master
> 마지막 커밋: de0dfb3 - feat: 인프라취약점 AI Agent 가이드 대폭 개선

## 새 세션 시작 방법
```
HANDOFF.md 읽고 "program-guide 스킬로 가이드 작업" 이어서 작업해줘.
```

---

## 완료된 작업 (이번 세션)

- [x] **VNTG Security Hub 사용 가이드** 생성 (커밋: cda941b)
  - 파일: `contents/VSHU8B2/vntg_security_hub_guide.html`
  - 이미지: `image/vntg_security_hub/` (7종 — 사용자가 직접 제공)
  - site.json 등록: `AEJUB79` (🛡️플랫폼정보보호) 카테고리
  - 디자인: 라이트 테마, 네이비 컬러 (패턴 A)
  - 로그인 없음, exe 파일로 배포, 3가지 기능(AI Q&A / 악성메일 분석 / 문서 뷰어)

- [x] **인프라취약점 점검 AI Agent 가이드** 생성 (커밋: b033e37)
  - 파일: `contents/IAI4K7B/infra_ai_agent.html`
  - 이미지: `contents/IAI4K7B/images/infra_ai_agent/report_sample.png` (Confluence 자동 다운로드)
  - site.json 등록: `30BD927` (🤖 AI-Worker) 카테고리

- [x] **인프라취약점 AI Agent 가이드 개선** (커밋: de0dfb3)
  - 사용 방법에 **CSS 터미널 UI** 추가 — 전체 실행 흐름(설정 수집→항목 점검→요약)을 cmd 창 스타일로 시각화
  - **점검결과 보고서 섹션** 신설 (nav에도 항목 추가)
    - 요약 카드: Total 13 / PASS 5 / FAIL 5 / N/A 3
    - PASS/FAIL/N/A 탭 필터
    - 13개 항목 전체 목록 (Confluence 원본 그대로)
    - FAIL 항목 클릭 시 AI 분석 펼침 (위험·영향·조치방법·설정 예시 코드)

- [x] **`/program-guide` 스킬 업데이트**
  - 파일: `~/.claude/skills/program-guide/SKILL.md`
  - `~/.secrets` 소싱 안내 추가
  - curl 대신 Python urllib 사용 권장 주의사항 추가

---

## 핵심 기술 결정사항

### Confluence API 접근
- 크리덴셜: `~/.secrets` (source 필요)
- `curl -u` 방식 → 특수문자 토큰에서 **401 발생**
- 반드시 **Python urllib + base64** 방식 사용:

```python
import urllib.request, base64, json
auth = base64.b64encode('EMAIL:TOKEN'.encode()).decode()
req = urllib.request.Request(URL, headers={'Authorization': f'Basic {auth}', 'Accept': 'application/json'})
with urllib.request.urlopen(req) as r:
    data = json.load(r)
```

### 가이드 HTML 파일 구조
- 위치: `gemini_html/contents/{7자리ID}/{파일명}.html`
- 이미지: `gemini_html/contents/{7자리ID}/images/{sitesName}/` (상대 경로)
- site.json 등록: `files` 객체에 `{ID: {filename, displayName, categoryHash, visible, order}}`

### 주요 categoryHash
| 폴더명 | categoryHash |
|--------|-------------|
| 🤖 AI-Worker | `30BD927` |
| 🛡️플랫폼정보보호 | `AEJUB79` |
| 🤖 AI Study | `QT38XYX` |
| 🚀 VNTG AI Study | `VNTG7S2` |

---

## 알려진 문제 / 주의사항

- `VNTG Security Hub` 가이드의 exe 파일명(`VNTG_Security_Hub_Setup.exe`)은 가정으로 작성 — 실제 파일명 확인 후 수정 필요할 수 있음
- `인프라 AI Agent` 스크린샷은 보고서 샘플 1장뿐 — 추가 화면 생기면 `contents/IAI4K7B/images/infra_ai_agent/`에 추가

---

## 환경 정보

- 작업 디렉토리: `/home/chris/git/chrisKILee.github.io/gemini_html`
- 크리덴셜: `~/.secrets` (CONFLUENCE_EMAIL, CONFLUENCE_API_TOKEN, CONFLUENCE_BASE_URL, GOOGLE_API_KEY)
- 배포: `git push origin master` → GitHub Pages 자동 반영

## 관련 파일
- program-guide 스킬: `~/.claude/skills/program-guide/SKILL.md`
- site.json: `gemini_html/site.json`
