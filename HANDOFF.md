# 작업 인계 문서
> 생성: 2026-03-19
> 브랜치: master
> 마지막 커밋: 3eecefa — fix: 스킬 치트시트 code-block 정렬 수정

## 새 세션 시작 방법
```
HANDOFF.md 읽고 "chrisKILee.github.io gemini_html 사이트 작업" 이어서 해줘.
```

---

## 완료된 작업 (이번 세션)

- [x] `awesome_claude_skills.html` 생성 — Claude Skills 생태계 가이드 (hash: 5SMC5JN, RDH10WS hot-news, protocol 템플릿)
- [x] `favicon.svg` 투톤 버전으로 교체 — Primary #F97316 / Secondary #FED7AA, rx="2"
- [x] `index.html` 파비콘 PNG→SVG 교체, nav에 C-로고 SVG 삽입
- [x] `GDEDSE/index.html` (Archive) 파비콘 추가 + P-로고 삽입
- [x] `claude_skills_guide.html` 누락 커스텀 스킬 5개 추가 (deploy-macmini, display-new, logo-icon-favicon, web-design-guidelines, vercel-composition-patterns)
- [x] `agentation.html` 생성 — AI 에이전트 시각적 피드백 도구 (hash: UGP2XL9, QT38XYX AI Study, travel-guide 템플릿)
- [x] `claude_skills_guide.html` 치트시트 code-block 정렬 수정 — `white-space: pre` + span 내부 개행 정리 (BeautifulSoup prettify 부작용 수정)

---

## 진행 중인 작업

| 작업 | 진행률 | 다음 단계 |
|------|--------|-----------|
| aiworker_policy_v2.html | 95% | Unstaged 상태. git add + commit 필요 |

---

## 남은 작업 (우선순위 순)

1. **[바로]** `gemini_html/aiworker_policy_v2.html` unstaged 파일 커밋
2. **[보통]** `/add-skill-to-doc` 실행 후 새로 추가된 커스텀 스킬 반영 (세션에서 추가됐을 수 있음)
3. **[나중에]** GitHub Dependabot 취약점 36개 경고 — push마다 경고 뜸 (5 critical, 23 high, 6 moderate, 2 low). 정적 사이트라 실제 영향 낮지만 확인 권장

---

## 현재 작업 중인 파일

- `gemini_html/aiworker_policy_v2.html` — Unstaged(modified). 내용은 이미 완성됨. 커밋만 하면 됨
- `gemini_html/.claude/` — Untracked 디렉토리. `.gitignore`에 추가하거나 무시해도 됨

---

## 핵심 기술 결정사항

### 사이트 구조
- **v4.0 flat 구조**: 모든 페이지는 `gemini_html/*.html` 루트에 위치 (contents/ 서브폴더 없음)
- **site.json**: 7자리 해시 키로 페이지 메타 등록. 해시는 URL이 아닌 식별자로만 사용

### 파비콘/로고 스펙
- **파비콘(P자)**: `gemini_html/favicon.svg` — Row1(좌+중) `#F97316` Primary, Row2(좌+중)+Row3(좌) `#FED7AA` Secondary, rx="2"
- **사이트 로고(C자)**: `index.html` nav 인라인 SVG — Row1+3 `#4F46E5` dark indigo, Row2-left `#818CF8` light indigo

### BeautifulSoup prettify 주의사항
- `/add-skill-to-doc` 스킬이 BS4 prettify() 사용 → `<span>` 내부 개행+들여쓰기 추가
- `white-space` 없는 code-block에 영향줌 → `.code-block { white-space: pre }` 이미 적용 완료
- 향후 `/add-skill-to-doc` 실행 시 code-block 재확인 필요

---

## 알려진 문제 / 주의사항

- **site.json 편집 전 반드시 Read**: 파일이 크고 자주 변경되므로 최신본 확인 필수
- **해시 충돌 방지**: 새 페이지 추가 시 항상 스크립트로 미사용 해시 생성
  ```bash
  node -e "
  const fs = require('fs');
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const site = JSON.parse(fs.readFileSync('gemini_html/site.json', 'utf8'));
  const used = new Set([...Object.keys(site.folders), ...Object.keys(site.files || {})]);
  let hash;
  do { hash = Array.from({length:7}, () => chars[Math.floor(Math.random()*chars.length)]).join(''); } while (used.has(hash));
  console.log(hash);
  "
  ```
- **`gemini_html/.claude/`** untracked 디렉토리 — `.gitignore`에 `gemini_html/.claude/` 추가 권장

---

## 주요 카테고리 해시 (site.json)

| 해시 | 폴더명 |
|------|--------|
| `RDH10WS` | 🔥 hot-news |
| `QT38XYX` | 🤖 AI Study |
| `7S8LZFY` | ❋ Claude |
| `KPYMQ8C` | 🌉 MCP |
| `30BD927` | 🤖 AI-Worker |
| `AEJUB79` | 🛡️ 플랫폼정보보호 |
| `RHF2LJN` | 🛜 플랫폼인프라 |
| `WU8Y4PL` | 🧪 플랫폼개발 |
| `AED13WE` | 🔬 R&D Projects |

---

## 환경 / 배포 상태

- **로컬 서버**: `http://localhost:8080/gemini_html/` (별도 실행 필요)
- **배포 URL**: `https://page.chrisnolja.dev/`
- **CI/CD**: GitHub Pages 자동 배포 (push → 즉시 반영)
- **테스트**: 없음 (정적 사이트)

---

## 관련 스킬

- `/add-new-page` — `~/.claude/skills/add-new-page/` — 새 페이지 추가 전체 플로우
- `/commit-push` — `~/.claude/skills/commit-push/` — 커밋+푸시 (PR 없이)
- `/add-skill-to-doc` — 커스텀 스킬 → claude_skills_guide.html 자동 동기화
- `/page-index-add` — AI Tech Feed 피드 아이템 추가
