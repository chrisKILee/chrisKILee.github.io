# 작업 인계 문서
> 생성: 2026-03-28
> 브랜치: master
> 마지막 커밋: 159980e — feat: AI 5종 비교 페이지 추가

## 새 세션 시작 방법
```
HANDOFF.md 읽고 "gemini_html 사이트 작업" 이어서 해줘.
```

---

## 완료된 작업

- [x] **Taste Skill 페이지 추가** (커밋: 918dbb7)
  - `gemini_html/taste_skill.html` — skeumorphism #17 템플릿, ❋ Claude 카테고리

- [x] **템플릿 품질 개선** (로컬 파일, 별도 커밋 없음)
  - `/home/chris/.claude/skills/add-new-page/templates/*.html` 22개 중 9개 수정
  - Spring easing, clamp() 반응형 폰트 적용

- [x] **add-new-page 스킬 개선** (로컬 파일)
  - `SKILL.md` 분리: 템플릿 목록 → `TEMPLATES.md`, 이미지 처리 → `TREAT_IMAGE.md`
  - 파일명/메뉴명 제안 시 후보 3~4개 제시 + 번호 선택 방식 추가
  - 핵심 원칙 5번에 영문 이미지 → 원본+한글화 SVG 나란히 배치 명시

- [x] **Claude Code Workflow 치트시트 페이지 추가** (커밋: 6467fed → 1647c10)
  - `gemini_html/claude_code_cheatsheet.html` — syntax #4 템플릿, ❋ Claude 카테고리 (해시: 46CN3L7)
  - Brij Kishore Pandey 2026 Edition 치트시트 기반
  - 원본 이미지(영문) + 한글화 SVG 나란히 배치, 12개 섹션 전체 한글화

- [x] **AI 5종 비교 페이지 추가** (커밋: 159980e)
  - `gemini_html/ai_comparison.html` — protocol #3 템플릿, 🤖 AI Study 카테고리 (해시: SU36CZU)
  - ChatGPT/Gemini/Claude/Grok/Perplexity 비교 인포그래픽 기반
  - 원본 이미지(영문) + 한글화 SVG, 비교표 5종 (최적 용도/사용 사례/강점/Pro Tips)

---

## 남은 작업 (우선순위 순)

1. **[나중에]** `📚 Design study` [9VXP99K] — 카테고리만 있고 페이지 없음
2. **[나중에]** `֎🇦🇮 Design by AI` [R77XGMQ] — 카테고리만 있고 페이지 없음
3. **[나중에]** `gemini_html/claude_guide.html` — modified 상태, 아직 커밋 안 됨
4. **[나중에]** `gemini_html/tmux_guide.html` — untracked, 아직 커밋 안 됨

---

## 현재 작업 중인 파일

- `gemini_html/claude_guide.html` — modified (내용 불명, 커밋 전 확인 필요)
- `gemini_html/tmux_guide.html` — untracked (tmux 개발 환경 가이드, 커밋 대기 중)

---

## 핵심 기술 결정사항

| 결정 | 이유 |
|------|------|
| `prefers-reduced-motion` 미적용 | 사용자 의도: "적절한 애니메이션이 필요하다" — 접근성보다 경험 우선 |
| 폰트 다양성 유지 | 각 페이지가 독립적 아이덴티티 — 단일화하면 오히려 개성 손실 |
| 그라디언트 텍스트 수정 안 함 | 6개 파일 모두 강조 요소에만 선택적 적용 중 |
| clamp 32px 이상만 | 본문/카드는 고정 px 유지, 제목급만 반응형 적용 |
| 이미지 첨부 시 원본+한글SVG 나란히 | image-pair 2열 그리드, base64 임베딩 + SVG 한글화 재현 |
| 스킬 파일 분리 | SKILL.md 비대화 방지: TEMPLATES.md / TREAT_IMAGE.md 별도 파일로 on-demand 로드 |

---

## 알려진 사항 / 주의

- **템플릿 수정은 로컬에만 반영** (`~/.claude/skills/add-new-page/templates/`). git 레포 대상 아님.
- **GitHub Dependabot 취약점 37개 알림** — push 때마다 표시됨, 사용자가 인지 중.
- **Instagram CDN URL** — `&amp;` 를 `&`로 변환해야 직접 접근 가능. 만료일 확인 필요(`oe=` 파라미터).
- **Chrome Snippets** — 브라우저 콘솔 재사용 함수는 F12 → Sources → Snippets에 저장 가능.

---

## 현재 사이트 카테고리 목록

| 해시 | 이름 | 비고 |
|------|------|------|
| QT38XYX | 🤖 AI Study | |
| 30BD927 | 🤖 AI-Worker | |
| VNTG7S2 | 🚀 VNTG AI Study | |
| RDH10WS | 🔥 R&D Hot News | |
| AED13WE | 🔬 R&D Projects | |
| BF7K2M9 | 💼 Work | |
| C8PQ4X1 | ✈️ Travel | |
| RU4TYZ1 | 🔒 Private | |
| KPYMQ8C | 🌉MCP | |
| NVZPZK4 | 🏢지역센터관련 | |
| RHF2LJN | 🛜플랫폼인프라 | |
| WU8Y4PL | 🧪플랫폼개발 | |
| 7S8LZFY | ❋ Claude | |
| QGNUMQY | 🏯교토 여행 | |
| AEJUB79 | 🛡️플랫폼정보보호 | |
| V5SPGM4 | 📚 Work Study | |
| LR4ME7B | 🚀 AIVE Journey | |
| QWW59US | 🏆 AIVE-CONTEST | |
| 9VXP99K | 📚 Design study | 신규, 페이지 없음 |
| R77XGMQ | ֎🇦🇮 Design by AI | 신규, 페이지 없음 |
| AH3JM8T | ✴️CLAUDE Change Logs | 신규 |
| SJ8EKBM | 🌱 CEPAGE | 신규 |

---

## 관련 파일

- 스킬 파일: `/home/chris/.claude/skills/add-new-page/SKILL.md`
- 템플릿 목록: `/home/chris/.claude/skills/add-new-page/TEMPLATES.md`
- 이미지 처리: `/home/chris/.claude/skills/add-new-page/TREAT_IMAGE.md`
- 템플릿 갤러리: `/home/chris/.claude/skills/add-new-page/templates/` (22종)
- site.json: `/home/chris/git/chrisKILee.github.io/gemini_html/site.json`
- 배포 URL: `https://page.chrisnolja.dev/gemini_html/`
