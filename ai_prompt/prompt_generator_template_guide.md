# 템플릿 추가 가이드 (SPEC) — ai_prompt Prompt Generator

> **목적**: `/ai_prompt/` 이미지 프롬프트 생성기에 새 템플릿을 추가하는 표준 절차.
> 새 템플릿 요청이 오면 **이 문서를 먼저 읽고** 동일한 패턴으로 작업한다.
> 정본은 `app.js`. PRD/SPEC은 따라서 갱신한다.

---

## 0. 핵심 구조 (app.js 한 파일)

`ai_prompt/app.js`는 IIFE 단일 파일. 데이터와 렌더가 분리돼 있다.

| 영역 | 위치 | 역할 |
|------|------|------|
| `templates[]` | 상단 | 템플릿 정의(id·name·description·fields·defaultMoodIds·defaultRuleIds) |
| `moodPresets[]` | 중간 | 분위기 칩 카탈로그 (재사용) |
| `ruleBlocks[]` | 중간 | 공통 규칙 체크박스 카탈로그 (재사용) |
| `renderTemplateBody()` | switch | **템플릿별 프롬프트 조립** — 여기에 `case` 추가 |
| 공통 로직 | 하단 | 실시간 변경·복사·localStorage — **수정 불필요** |

**실시간 변경/복사는 공통 로직이라 새 템플릿은 자동 적용된다.** 건드릴 곳은 딱 2군데: `templates[]` + `renderTemplateBody()`의 switch.

---

## 1. 작업 절차 (순서 고정)

### STEP 1 — 원본 프롬프트 확보
- 소스(보통 Obsidian `Personal/메모/Prompt.md`)에서 원본 프롬프트 텍스트를 읽는다.
- 변하는 부분(주제·도시·문구·메모 등)을 식별 → **변수 후보**로 표시.

### STEP 2 — fields 설계
각 변수를 `field`로. 타입 3종:

| type | 용도 | 렌더 |
|------|------|------|
| `text` | 한 줄 입력 | `<input>` |
| `select` | 고정 선택지(`options: [...]` 필수) | `<select>` |
| `textarea` | 여러 줄(목록) | `<textarea>` → case에서 **`linesToBullets(v.xxx)`** 로 변환 |
| `checkbox` | on/off 불리언 | 토글. case에서 `flag ? "..." : ""` 로 분기. `defaultValue: false` |

```js
{ id: "theme", label: "주제", type: "text", defaultValue: "...", placeholder: "예: ..." }
{ id: "ratio", label: "비율", type: "select", defaultValue: "4:5", options: ["4:5","1:1","9:16","2:3"] }
{ id: "memos", label: "손글씨 메모 (줄당 1개)", type: "textarea", defaultValue: "줄1\n줄2" }
```

### STEP 3 — templates[] 에 객체 추가
`templates` 배열 끝(`];` 직전)에 추가:

```js
{
  id: "snake_case_id",          // 고유, switch case와 일치
  name: "사람이 읽는 이름",
  description: "한 줄 설명(카드에 표시)",
  fields: [ /* STEP 2 */ ],
  defaultMoodIds: ["..."],       // moodPresets에서 선택 (아래 카탈로그)
  defaultRuleIds: ["..."],       // ruleBlocks에서 선택 (아래 카탈로그)
}
```

### STEP 4 — renderTemplateBody() switch 에 case 추가
`default:` 바로 위에 추가. `v = currentState.values`. **`compactSections([...])`** 로 문단을 합친다(빈 문단 자동 제거, `\n\n` 조인).

```js
case "snake_case_id":
  return compactSections([
    `${v.theme} 기반 한 문장.`,                       // text 변수
    `비율 ${v.ratio}. ...`,                           // select 변수
    "고정 스타일 설명 문단.",
    `목록:\n${linesToBullets(v.memos)}`,              // textarea → bullets
  ]);
```

- **모든 `v.xxx` 는 STEP 2 fields에 반드시 정의돼 있어야 함** (undefined 방지). STEP 6에서 자동 검증.
- 문단은 `"제목:\n내용"` 형태로 가독성 있게. 영어/한국어는 원본 톤 유지.

### STEP 5 — PRD/SPEC 문서 동기화
- `prompt_generator_prd.md` → "## 6. 템플릿 목록"에 `### X. 이름` + 목적/핵심 입력 추가
- `prompt_generator_spec.md` →
  - `type TemplateId` 유니온에 `| "snake_case_id"` 추가
  - "## 6. 템플릿별 변수 정의"에 `### 6.x snake_case_id` 변수 블록 추가

### STEP 6 — 검증 (필수, 3종)
```bash
# 1) 문법
node --check ai_prompt/app.js

# 2) v.참조 ↔ fields 교차검증 (undefined 변수 0건 확인)
node -e '
const src=require("fs").readFileSync("ai_prompt/app.js","utf8");
const fieldsOf=id=>{const m=src.match(new RegExp("id: \""+id+"\"[\\s\\S]*?fields: \\[([\\s\\S]*?)\\],\\s*\\n\\s*defaultMoodIds"));return m?[...m[1].matchAll(/id: "([a-zA-Z]+)"/g)].map(x=>x[1]):null;};
const refsOf=id=>{const m=src.match(new RegExp("case \""+id+"\":([\\s\\S]*?)(?:case \"|default:)"));return m?[...new Set([...m[1].matchAll(/v\.([a-zA-Z]+)/g)].map(x=>x[1]))]:null;};
for(const t of ["NEW_ID_1","NEW_ID_2"]){const f=fieldsOf(t),r=refsOf(t);const miss=r.filter(x=>!f.includes(x));console.log(t, miss.length?"❌ "+miss:"✅ OK");}
'

# 3) 실제 환경 (브라우저)
python3 -m http.server 9998 >/dev/null 2>&1 &   # → http://localhost:9998/ai_prompt/
#   템플릿 선택 → 변수 입력 시 우측 프롬프트 실시간 변경 → 복사 버튼 동작 확인
```

### STEP 7 — 커밋·푸시
```
feat(ai_prompt): {템플릿명} 템플릿 추가
```

---

## 2. 재사용 카탈로그 (새로 만들지 말고 골라 쓴다)

### moodPresets (defaultMoodIds 후보)
`warm_family_memory` 따뜻한 가족 기록 · `korean_instagram` 한국 인스타 감성 ·
`quiet_emotional_poster` 조용한 감정 포스터 · `premium_product` 프리미엄 제품사진 ·
`cozy_brown` 포근한 브라운톤 · `bright_birthday` 밝은 생일파티 ·
`editorial_travel` 프리미엄 여행 매거진 · `minimal_clean` 미니멀 클린

### ruleBlocks (defaultRuleIds 후보)
`preserve_identity` 인물 정체성 보존 · `preserve_photo` 원본 사진 보존 ·
`korean_text_accuracy` 한글 정확도 우선 · `avoid_face_overlay` 얼굴 위 장식 금지 ·
`crop_black_bars` 검은 여백 제거 · `subtle_decoration` 장식 은은하게

**선택 가이드**:
- 인물 사진 기반(분신·키링·여행chibi·박스) → `preserve_identity`
- 사진 위 편집(낙서·문구) → `preserve_photo` + `avoid_face_overlay` + `crop_black_bars`
- 한글 문구가 중요 → `korean_text_accuracy` (+ 필요시 `defaultState`에서 outputMode `postprocess_text`)

새 mood/rule이 정말 필요하면 `moodPresets[]` / `ruleBlocks[]`에 항목 추가 후 id로 참조.

---

## 3. 함정 / 주의

- **textarea는 반드시 `linesToBullets(v.xxx)`** 로 변환해 본문에 넣는다(줄바꿈 그대로 두지 말 것).
- **`renderMessages()`/messagePresets는 `photo_doodle` 전용** (`state.selectedTemplateId === "photo_doodle"`). 다른 템플릿엔 "사진 위 문구" 에디터가 안 뜬다 — 의도된 동작.
- `defaultState()`의 `outputMode` 기본값은 `direct_text`, 단 `watercolor_poster`만 `postprocess_text`. 한글 정확도가 핵심인 새 템플릿은 여기에 조건 추가 검토.
- `id`는 `templates[]`와 `case`가 **철자까지 동일**해야 한다(불일치 시 `default` → 빈 본문).
- 기존 유사 템플릿과 **이름이 겹치지 않게** 구분(예: `travel_poster` 콜라주 vs `travel_typography` 타이포). description에 차이를 명시.
- 복사는 `navigator.clipboard.writeText` → 실패 시 `execCommand("copy")` 폴백. HTTPS/localhost에서 동작.

---

## 4. 레퍼런스 구현 (2026-06-15 추가분)

- `miniature` (3D 미니어처 카드뉴스): text×3 + textarea(memos) + select(ratio). mood `korean_instagram`+`minimal_clean`, rule `korean_text_accuracy`.
- `travel_typography` (트래블로그 타이포 포스터): text×3 + textarea(landmarks) + select×2. mood `editorial_travel`, rule `preserve_identity`. 거대 도시명 typography photo-mask + chibi N종.

두 구현 모두 위 STEP 1~7을 그대로 따랐다. 새 템플릿도 이 흐름을 복제하면 된다.

---

## 5. 사진 조건 / 가이드 (인물 화보 패턴, 2026-06-20 추가)

입력 사진(헤어·선글라스·의상)에 따라 본문/네거티브가 달라지는 인물 화보 템플릿용 신구조.

### photoGuide (선택)
템플릿에 `photoGuide: { shot, must:[], nice:[] }` 를 넣으면 입력 패널 상단에 "어떤 사진을 넣을까요" 가이드 카드가 뜬다.

### photoConditionIds (선택)
공통 `photoConditions[]` 카탈로그에서 필요한 조건 id를 골라 `photoConditionIds: ["refHair", ...]` 로 참조. UI는 "📸 내 사진 조건" 섹션에 자동 렌더되고, `defaultValues()`가 fields와 병합한다.

| 조건 id | type | 헬퍼 |
|--------|------|------|
| `refHair` | select | `hairClause(v.refHair, v.hairColor)` + `conditionNegatives` |
| `hairColor` | select | `hairColorPhrase(v.hairColor)` |
| `sunglasses` | select | `sunglassesClause(v.sunglasses)` + `conditionNegatives` |
| `outfitFromRef` | checkbox | `outfitFromRefClause(v.outfitFromRef)` |
| `signature` | text | `signatureClause(v.signature)` (빈 값이면 미삽입) |

### case 작성 패턴
```js
case "my_portrait":
  return compactSections([
    "정체성 보존 도입 문단.",
    hairClause(v.refHair, v.hairColor),
    sunglassesClause(v.sunglasses),
    `Outfit & pose: ... ${v.someField}.`,
    "환경·카메라 문단.",
    signatureClause(v.signature),   // 빈 문자열이면 compactSections가 자동 제거
  ]);
```
- `conditionNegatives`는 `renderPrompt`가 공통 네거티브 뒤에 자동 결합 — case에서 신경 쓸 필요 없다.
- 두 조각을 한 문단에 합칠 땐 `compactLine([a, optionalB])`.

### 환경 경계 (중요)
- 저장소 루트가 `type:module`이라 **`ai_prompt/package.json` 의 `type:commonjs`** 가 있어야 `app.js`를 Node에서 require/test할 수 있다.
- `app.js`는 DOM 부트스트랩 전 `module.exports` early-return을 한다. 새 순수 함수를 테스트하려면 export 목록에 추가.

## 6. 검증 (TDD)
```bash
node --check ai_prompt/app.js
cd ai_prompt && npm test        # node --test tests/*.test.js
```
새 조건/매핑은 `tests/prompt.test.js`에 **먼저 실패 테스트(Red)** 로 추가하고 구현한다.

