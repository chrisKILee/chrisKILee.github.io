# Prompt Generator SPA SPEC

## 1. 구현 개요

정적 SPA로 구현한다. 백엔드 없이 브라우저에서 템플릿 데이터와 사용자 입력값을 조합해 최종 프롬프트 문자열을 생성한다.

권장 스택:
- React
- TypeScript
- Vite
- Tailwind CSS
- localStorage
- Clipboard API

대안:
- Vue 3 + Vite
- Svelte + Vite
- 단일 `index.html` + vanilla TypeScript

초기 구현은 React + TypeScript를 기준으로 설계한다.

## 2. 정보 구조

앱은 다음 데이터를 다룬다.

- Template: 작업 유형별 프롬프트 템플릿
- Variable: 템플릿에 필요한 입력 필드
- MoodPreset: 분위기 선택 블록
- RuleBlock: 공통 규칙 블록
- NegativeBlock: 네거티브 프롬프트 블록
- MessageItem: 사진 위에 넣을 문구 항목
- GeneratorState: 현재 선택/입력 상태
- RenderedPrompt: 최종 출력 문자열

## 3. 화면 구조

### Desktop Layout

```text
+-------------------------------------------------------------+
| Header: Prompt Generator                    Copy / Reset     |
+----------------------+----------------------+---------------+
| Template & Presets   | Variables            | Prompt Preview|
|                      |                      |               |
| - Template list      | - Dynamic form       | Final prompt  |
| - Mood presets       | - Message editor     | Copy button   |
| - Common rules       | - Photo doodle rules | Char count    |
| - Negative options   |                      |               |
+----------------------+----------------------+---------------+
```

### Mobile Layout

```text
Tabs:
1. 템플릿
2. 입력
3. 결과
```

## 4. 라우팅

MVP는 라우팅이 없어도 된다.

선택 사항:
- `/` 단일 화면
- URL query로 템플릿 공유
  - `/?template=photo_doodle`

초기 구현에서는 단일 화면으로 충분하다.

## 5. 데이터 모델

### 5.1 Template

```ts
type TemplateId =
  | "photo_doodle"
  | "watercolor_poster"
  | "keyring"
  | "mini_aegyo"
  | "travel_poster"
  | "cardboard_toddler"
  | "miniature"
  | "travel_typography"
  // 인물 화보(정체성 보존) — 사진 조건/가이드 신구조 적용
  | "yacht_selfie"
  | "beach_resort"
  | "santorini_alley"
  | "hydrangea_overhead"
  | "goddess_plaza";

type Template = {
  id: TemplateId;
  name: string;
  description: string;
  category: "photo-edit" | "illustration" | "product" | "poster";
  variables: VariableDefinition[];     // app.js의 fields
  photoConditionIds?: string[];         // 참조하는 공통 사진 조건 (PhotoCondition.id)
  photoGuide?: PhotoGuide;              // 입력 사진 가이드 카드
  defaultMoodIds: string[];
  recommendedRuleIds: string[];
  defaultNegativeIds: string[];
  render: (state: GeneratorState) => string;
};

// 입력 사진 가이드: 어떤 사진을 넣어야 하는지 안내 (UI 카드)
type PhotoGuide = {
  shot: string;        // 권장 샷 (예: "상반신 셀피 앵글, 얼굴 정면")
  must: string[];      // 필수 조건 뱃지
  nice: string[];      // 권장 조건 뱃지
};

// 공통 사진 조건: 입력 사진의 특성을 고르면 프롬프트 본문/네거티브가 바뀐다.
type PhotoCondition = VariableDefinition; // select | checkbox | text. app.js의 photoConditions[]

```

### 5.2 VariableDefinition

```ts
type VariableType =
  | "text"
  | "textarea"
  | "select"
  | "multiSelect"
  | "checkbox"
  | "messageList";

type VariableDefinition = {
  id: string;
  label: string;
  type: VariableType;
  required?: boolean;
  placeholder?: string;
  defaultValue?: unknown;
  options?: SelectOption[];
  helperText?: string;
};

type SelectOption = {
  label: string;
  value: string;
  description?: string;
};
```

### 5.3 MoodPreset

```ts
type MoodPreset = {
  id: string;
  label: string;
  description: string;
  promptBlock: string;
  tags: string[];
};
```

초기 프리셋:

```ts
const moodPresets: MoodPreset[] = [
  {
    id: "warm_family_memory",
    label: "따뜻한 가족 기록",
    description: "가족사진, 여행사진, 기념일 사진에 적합",
    tags: ["family", "warm", "photo"],
    promptBlock:
      "cozy, warm, lovely, intimate family memory, natural photo decoration, soft white handwritten doodles, emotional but not excessive."
  },
  {
    id: "korean_instagram",
    label: "한국 인스타 감성",
    description: "밝고 귀여운 한국식 감성 편집",
    tags: ["korean", "cute", "social"],
    promptBlock:
      "Korean Instagram aesthetic, warm daylight, soft beige tone, clean layout, subtle hand-drawn white hearts and sparkles."
  },
  {
    id: "quiet_emotional_poster",
    label: "조용한 감정 포스터",
    description: "수채화, 감성 포스터, 인물 일러스트에 적합",
    tags: ["poster", "watercolor", "quiet"],
    promptBlock:
      "Quiet emotional poster aesthetic, warm neutral palette, generous negative space, soft ambient light, subtle paper texture, intimate human mood."
  },
  {
    id: "premium_product",
    label: "프리미엄 제품사진",
    description: "키링, 굿즈, 상품 목업에 적합",
    tags: ["product", "mockup"],
    promptBlock:
      "Ultra-realistic product photography, shallow depth of field, cinematic bokeh, soft studio lighting, glossy highlights, sharp focus on the subject."
  },
  {
    id: "cozy_brown",
    label: "포근한 브라운톤",
    description: "박스, 키즈 화보, 감성 스튜디오 톤",
    tags: ["cozy", "brown", "kid"],
    promptBlock:
      "Warm brown and beige tone, cozy studio mood, soft amber light, gentle shadows, emotional and comfortable atmosphere."
  },
  {
    id: "bright_birthday",
    label: "밝은 생일파티",
    description: "생일, 파티, 축하 사진에 적합",
    tags: ["birthday", "party", "cute"],
    promptBlock:
      "Bright and lovely birthday party mood, warm indoor lighting, cute white handwritten decorations, tiny hearts, sparkles, and celebration feeling."
  }
];
```

### 5.4 RuleBlock

```ts
type RuleBlock = {
  id: string;
  label: string;
  description: string;
  promptBlock: string;
  recommendedFor: TemplateId[];
};
```

필수 규칙 블록:

```ts
const ruleBlocks: RuleBlock[] = [
  {
    id: "preserve_identity",
    label: "인물 정체성 보존",
    description: "얼굴형, 눈매, 헤어스타일, 나이, 시선 유지",
    recommendedFor: ["photo_doodle", "watercolor_poster", "keyring", "mini_aegyo", "cardboard_toddler"],
    promptBlock:
      "업로드한 사진의 실제 인물 정체성을 반드시 유지한다. 얼굴형, 눈매와 눈 간격, 코와 입술 형태, 턱선, 얼굴 비율, 헤어스타일, 머리결 흐름, 나이, 민족적 특징, 자연스러운 비대칭, 원본 특유의 표정과 시선 느낌을 보존한다."
  },
  {
    id: "preserve_photo",
    label: "원본 사진 보존",
    description: "사진 편집 시 얼굴/포즈/배경/조명 유지",
    recommendedFor: ["photo_doodle"],
    promptBlock:
      "원본 사진의 인물 얼굴, 표정, 포즈, 신체 비율, 배경, 조명, 주요 사물은 그대로 유지한다. 인물의 얼굴과 몸은 절대 바꾸지 않는다."
  },
  {
    id: "korean_text_accuracy",
    label: "한글 정확도 우선",
    description: "한글은 가능하면 후처리 합성 권장",
    recommendedFor: ["photo_doodle", "watercolor_poster", "mini_aegyo"],
    promptBlock:
      "한글 문구가 정확해야 하는 경우, 이미지 생성 모델이 직접 글자를 만들면 깨질 수 있다. 가능하면 텍스트 없는 이미지를 먼저 생성하고, 한글 문구는 후처리로 정확히 합성한다."
  },
  {
    id: "avoid_face_overlay",
    label: "얼굴 위 장식 금지",
    description: "글씨/하트/화살표가 얼굴을 지나가지 않게 함",
    recommendedFor: ["photo_doodle", "mini_aegyo"],
    promptBlock:
      "글씨, 하트, 별, 점선, 화살표, 말풍선, 낙서가 얼굴, 머리카락, 눈, 입, 손 위로 지나가지 않게 한다. 인물 라벨은 얼굴 위가 아니라 주변의 빈 공간에 배치한다. 화살표는 얼굴을 통과하지 말고 어깨, 옷, 머리 위 빈 공간 근처까지만 짧게 연결한다."
  },
  {
    id: "crop_black_bars",
    label: "검은 여백 제거",
    description: "캡처 여백 대신 실제 사진 영역만 사용",
    recommendedFor: ["photo_doodle"],
    promptBlock:
      "원본 사진에 검은 여백, 캡처 여백, 불필요한 상하 여백이 있으면 실제 사진 영역만 자연스럽게 크롭해서 사용한다. 메시지와 낙서는 실제 사진 안의 하늘, 바다, 모래, 벽, 테이블 같은 빈 배경 공간에 가깝게 배치한다."
  }
];
```

### 5.5 MessageItem

사진 위 기록 기능을 위해 문구는 단순 문자열이 아니라 구조화한다.

```ts
type MessageRole =
  | "title"
  | "family_caption"
  | "person_label"
  | "emotion_note"
  | "object_label";

type PlacementZone =
  | "top_sky"
  | "left_background"
  | "right_background"
  | "bottom_sand_or_table"
  | "near_subject_empty_space"
  | "auto";

type DecorationStrength = "none" | "subtle" | "normal";

type MessageItem = {
  id: string;
  text: string;
  role: MessageRole;
  placement: PlacementZone;
  arrow: boolean;
  decorationStrength: DecorationStrength;
};
```

기본 메시지 예시:

```ts
const defaultCebuMessages: MessageItem[] = [
  {
    id: "m1",
    text: "세부여행중...",
    role: "title",
    placement: "top_sky",
    arrow: false,
    decorationStrength: "subtle"
  },
  {
    id: "m2",
    text: "행복한 우리가족 쭌쭌이네 ♡",
    role: "family_caption",
    placement: "top_sky",
    arrow: false,
    decorationStrength: "subtle"
  },
  {
    id: "m3",
    text: "든든한 아빠",
    role: "person_label",
    placement: "left_background",
    arrow: true,
    decorationStrength: "none"
  }
];
```

### 5.6 GeneratorState

```ts
type GeneratorState = {
  selectedTemplateId: TemplateId;
  variables: Record<string, unknown>;
  selectedMoodIds: string[];
  selectedRuleIds: string[];
  selectedNegativeIds: string[];
  messages: MessageItem[];
  outputMode: "direct_text" | "postprocess_text";
};
```

## 6. 템플릿별 변수 정의

### 6.1 photo_doodle

```ts
const photoDoodleVariables: VariableDefinition[] = [
  {
    id: "photoContext",
    label: "사진 유형",
    type: "select",
    required: true,
    defaultValue: "가족 해변사진",
    options: [
      { label: "가족 해변사진", value: "가족 해변사진" },
      { label: "생일파티 사진", value: "가족 생일파티 사진" },
      { label: "여행사진", value: "가족 여행사진" },
      { label: "음식 있는 사진", value: "음식이 있는 가족사진" }
    ]
  },
  {
    id: "event",
    label: "상황/이벤트",
    type: "text",
    defaultValue: "세부여행"
  },
  {
    id: "doodleStyle",
    label: "낙서 스타일",
    type: "select",
    defaultValue: "흰색 손글씨 펜",
    options: [
      { label: "흰색 손글씨 펜", value: "흰색 손글씨 펜" },
      { label: "한국 감성 birthday doodle", value: "한국 감성 birthday party photo doodle editing style" },
      { label: "따뜻한 여행 기록 낙서", value: "따뜻한 가족 여행 photo doodle editing style" },
      { label: "미니멀 감성 메모", value: "minimal handwritten memory note style" }
    ]
  },
  {
    id: "messages",
    label: "넣을 문구",
    type: "messageList",
    required: true
  }
];
```

### 6.2 watercolor_poster

```ts
const watercolorVariables: VariableDefinition[] = [
  {
    id: "sceneMood",
    label: "장면 분위기",
    type: "select",
    defaultValue: "조용한 바다",
    options: [
      { label: "조용한 바다", value: "조용한 바다" },
      { label: "햇빛 드는 카페", value: "햇빛 드는 카페" },
      { label: "비 오는 거리", value: "비 오는 거리" },
      { label: "노을 산책", value: "노을 산책" },
      { label: "여행 순간", value: "여행 순간" },
      { label: "cozy apartment", value: "cozy apartment" }
    ]
  },
  {
    id: "backgroundDetail",
    label: "배경 디테일",
    type: "text",
    defaultValue: "원본 사진 속 바다와 난간"
  },
  {
    id: "quote",
    label: "문구",
    type: "text",
    defaultValue: "그냥 이렇게, 너답게."
  },
  {
    id: "signature",
    label: "서명",
    type: "text",
    defaultValue: "@fran_co_657"
  },
  {
    id: "ratio",
    label: "비율",
    type: "select",
    defaultValue: "4:5",
    options: [
      { label: "4:5", value: "4:5" },
      { label: "1:1", value: "1:1" },
      { label: "9:16", value: "9:16" },
      { label: "16:9", value: "16:9" }
    ]
  }
];
```

### 6.3 keyring

```ts
const keyringVariables: VariableDefinition[] = [
  {
    id: "strapText",
    label: "스트랩 문구",
    type: "text",
    required: true,
    defaultValue: "SEOJUN"
  },
  {
    id: "strapColor",
    label: "스트랩 색상",
    type: "select",
    defaultValue: "charcoal",
    options: [
      { label: "Charcoal", value: "charcoal" },
      { label: "Orange", value: "orange" },
      { label: "Pastel Blue", value: "pastel blue" },
      { label: "Pink", value: "pink" }
    ]
  },
  {
    id: "outfitCues",
    label: "옷 단서",
    type: "text",
    defaultValue: "gray sweatshirt"
  }
];
```

### 6.4 miniature

```ts
const miniatureVariables: VariableDefinition[] = [
  { id: "theme", label: "주제", type: "text", defaultValue: "제주도 한 달 살기" },
  { id: "title", label: "메인 문구", type: "text", defaultValue: "제주에서 보낸 한 달" },
  { id: "subtitle", label: "부제 문구", type: "text", defaultValue: "느리게 걷는 하루의 기록" },
  { id: "memos", label: "손글씨 메모 (줄당 1개)", type: "textarea",
    defaultValue: "오늘도 바다 보러 가기\n귤 한 박스 도착\n돌담길 산책\n노을 맛집 발견" },
  { id: "ratio", label: "비율", type: "select", defaultValue: "4:5",
    options: ["4:5", "1:1", "9:16", "2:3"] }
];
// defaultMoodIds: ["korean_instagram", "minimal_clean"]
// recommendedRuleIds: ["korean_text_accuracy"]
```

### 6.5 travel_typography

```ts
const travelTypographyVariables: VariableDefinition[] = [
  { id: "city", label: "도시 (대형 타이포)", type: "text", defaultValue: "PARIS" },
  { id: "country", label: "국가", type: "text", defaultValue: "FRANCE" },
  { id: "travelDate", label: "여행 날짜", type: "text", defaultValue: "2025.04.27 ~ 2025.05.02" },
  { id: "landmarks", label: "랜드마크 (줄당 1개)", type: "textarea",
    defaultValue: "Eiffel Tower\nLouvre Museum\nArc de Triomphe\nParis cafe streets\nSeine River\ncity night lights" },
  { id: "miniCount", label: "미니 캐릭터 수", type: "select", defaultValue: "6", options: ["4", "5", "6", "8"] },
  { id: "ratio", label: "비율", type: "select", defaultValue: "4:5", options: ["4:5", "2:3", "9:16"] }
];
// defaultMoodIds: ["editorial_travel"]
// recommendedRuleIds: ["preserve_identity"]
// 핵심: 도시명을 거대 typography photo-mask로, chibi 6종이 letters 위/주변 탐험. 하단 "TRAVEL LOG" + 날짜
```

### 6.6 인물 화보 템플릿 (사진 조건/가이드)

정체성 보존 인물 화보 5종. 모두 `defaultRuleIds: ["preserve_identity"]`, `photoGuide` 보유, `photoConditionIds`로 공통 사진 조건을 참조한다.

| id | 고유 변수(fields) | photoConditionIds | 비율 |
|----|------------------|-------------------|------|
| `yacht_selfie` | topStyle | refHair, hairColor, sunglasses, signature | 9:16 |
| `beach_resort` | swimwear, motion | refHair, hairColor, signature | 2:3 |
| `santorini_alley` | scenario, dressColor | refHair, hairColor, outfitFromRef | 3:2 |
| `hydrangea_overhead` | faceVisible | hairColor, outfitFromRef, signature | 3:4 |
| `goddess_plaza` | dressStyle | refHair, hairColor | 3:4 |

#### 공통 사진 조건 카탈로그 (`photoConditions[]`)

| id | type | 옵션/기본값 | 프롬프트 영향 |
|----|------|------------|---------------|
| `refHair` | select | 긴 생머리(기본)/긴 웨이브/단발·숏컷/묶은 머리·업두 | `hairClause` 본문 + 반대 헤어 네거티브 |
| `hairColor` | select | 원본 그대로(기본)/흑발/갈색/밝은 갈색 | `hairColorPhrase` 색 문구 |
| `sunglasses` | select | 없음·맨얼굴(기본)/반사 선글라스/살짝 내린 선글라스 | `sunglassesClause` 본문 + 네거티브 토글 |
| `outfitFromRef` | checkbox | false | true일 때 "의상색을 레퍼런스에서" 문장 |
| `signature` | text | "" | 비어있지 않을 때만 서명 오버레이 문장 |

#### 조건 → 프롬프트 매핑 (순수 함수)

- `hairClause(refHair, hairColor)` → 헤어 유지 문장. `hairTypePhrase` + `hairColorPhrase` 조합.
- `sunglassesClause(sunglasses)` → 착용/맨얼굴 문장.
- `signatureClause(signature)` → trim 후 비면 `""`, 아니면 서명 오버레이.
- `outfitFromRefClause(flag)` → flag면 의상색 반영 문장, 아니면 `""`.
- `conditionNegatives(template, values)` → 활성 조건 기반 네거티브 조각 배열. 단발·숏컷→`long hair…`, 긴머리→`short hair…`; 맨얼굴→`sunglasses…`, 착용→`sunglasses hiding…`. `renderPrompt`가 공통 네거티브 뒤에 `, ` 로 합친다.

## 7. Prompt Rendering

각 템플릿은 `GeneratorState`를 받아 하나의 문자열을 반환한다.

### 7.1 렌더링 순서

```text
1. 템플릿 본문
2. 사용자 변수 값
3. 메시지 리스트
4. 분위기 프리셋 블록
5. 선택된 공통 규칙
6. outputMode 관련 텍스트 처리 지침
7. 네거티브 프롬프트
```

### 7.2 MessageList 렌더링

```ts
function renderMessages(messages: MessageItem[]): string {
  return messages
    .filter((m) => m.text.trim().length > 0)
    .map((m) => {
      const arrowText = m.arrow ? "화살표 연결 필요" : "화살표 없음";
      return `- "${m.text}" (${m.role}, ${m.placement}, ${arrowText}, 장식: ${m.decorationStrength})`;
    })
    .join("\\n");
}
```

최종 프롬프트에는 아래처럼 들어간다.

```text
넣을 문구:
- "세부여행중..." (title, top_sky, 화살표 없음, 장식: subtle)
- "든든한 아빠" (person_label, left_background, 화살표 연결 필요, 장식: none)
```

## 8. UI 상세

### 8.1 TemplateSelector

역할:
- 템플릿 목록 표시
- 선택된 템플릿 강조
- 템플릿 설명 표시

상태 변경:
- 템플릿 변경 시 해당 템플릿의 기본 변수, 추천 분위기, 추천 규칙을 state에 로드한다.
- 사용자가 입력한 기존 값은 템플릿이 바뀌면 초기화한다.

### 8.2 VariableForm

역할:
- `VariableDefinition[]`을 기반으로 폼 자동 렌더링

지원 필드:
- input text
- textarea
- select
- multi-select
- checkbox
- message list editor

검증:
- required 값이 비어 있으면 경고 표시
- `keyring.strapText`는 대문자 유지 옵션 제공

### 8.3 MessageListEditor

역할:
- 사진 위에 넣을 문구를 구조적으로 관리

기능:
- 문구 추가
- 문구 삭제
- 문구 순서 이동
- 역할 선택
- 추천 위치 선택
- 화살표 여부 선택
- 장식 강도 선택

UI 필드:
- 문구
- 역할 select
- 위치 select
- 화살표 toggle
- 장식 강도 segmented control

기본 프리셋:
- 세부여행 가족사진
- 생일파티 가족사진
- 감성 포스터 메모

### 8.4 PhotoDoodleRulesPanel

사진 손글씨 꾸미기 템플릿에서 강조 표시한다.

옵션:
- 실제 사진 영역만 크롭
- 검은 여백 사용 금지
- 얼굴 위 글씨 금지
- 머리 위 점선 금지
- 눈/입/손 위 장식 금지
- 화살표 얼굴 통과 금지
- 배경 빈 공간에 문구 배치
- 장식 과하지 않게

이 옵션들은 내부적으로 `RuleBlock` 선택 상태로 반영된다.

### 8.5 PromptPreview

역할:
- 최종 프롬프트 실시간 표시
- 문자 수 표시
- 복사 버튼 제공

기능:
- line wrap
- read-only textarea 또는 pre
- `Copy` 버튼
- `복사됨` toast 또는 inline 상태

### 8.6 CopyButton

```ts
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
```

Fallback:
- 실패 시 textarea 내용을 자동 선택하고 `Ctrl+C` 안내

## 9. 상태 저장

localStorage key:

```ts
const STORAGE_KEY = "prompt-generator-state-v1";
```

저장 대상:
- selectedTemplateId
- variables
- selectedMoodIds
- selectedRuleIds
- selectedNegativeIds
- messages
- outputMode

저장 타이밍:
- state 변경 후 debounce 300ms

초기화:
- `Reset` 클릭 시 localStorage 삭제 후 기본 상태 복원

## 10. 폴더 구조

```text
src/
  main.tsx
  App.tsx
  data/
    templates.ts
    moodPresets.ts
    ruleBlocks.ts
    negativeBlocks.ts
    messagePresets.ts
  components/
    TemplateSelector.tsx
    MoodPresetSelector.tsx
    VariableForm.tsx
    MessageListEditor.tsx
    PhotoDoodleRulesPanel.tsx
    CommonRulesPanel.tsx
    NegativePromptPanel.tsx
    PromptPreview.tsx
    CopyButton.tsx
  lib/
    renderPrompt.ts
    storage.ts
    validation.ts
  types/
    prompt.ts
```

## 11. 렌더 함수 예시

### 11.1 photo_doodle renderer

```ts
function renderPhotoDoodlePrompt(state: GeneratorState): string {
  const v = state.variables;
  const messages = renderMessages(state.messages);
  const moods = renderMoodBlocks(state.selectedMoodIds);
  const rules = renderRuleBlocks(state.selectedRuleIds);
  const negatives = renderNegativeBlocks(state.selectedNegativeIds);

  return [
    `업로드한 ${v.photoContext}을 기반으로, 원본 사진의 인물 얼굴, 표정, 포즈, 배경, 조명, 주요 사물은 그대로 유지한 채 따뜻하고 귀여운 손글씨 메시지와 낙서 장식을 추가해줘.`,
    ``,
    `스타일은 ${v.doodleStyle}.`,
    `흰색 손글씨 펜으로 사진 위에 직접 꾸민 듯한 느낌.`,
    ``,
    `넣을 문구:`,
    messages,
    ``,
    `선택한 분위기:`,
    moods,
    ``,
    `배치 및 보존 규칙:`,
    rules,
    ``,
    state.outputMode === "postprocess_text"
      ? `한글 문구는 이미지 생성 모델이 직접 쓰지 말고, 텍스트를 넣을 수 있는 빈 공간만 남긴다. 최종 문구는 후처리로 정확히 합성한다.`
      : `한글 문구는 정확히 읽을 수 있게 작성한다. 랜덤 문자나 깨진 한글을 만들지 않는다.`,
    ``,
    negatives
  ].join("\\n");
}
```

## 12. 검증 규칙

### 공통

- 필수 변수 누락 시 Preview 상단에 경고
- 메시지가 0개면 photo_doodle에서 경고
- 스트랩 텍스트가 비어 있으면 keyring에서 경고

### 키링

- `STRAP_TEXT`는 2-12자 권장
- 한글보다 영문 대문자 권장 안내
- 정확한 텍스트 검수 체크 표시

### 사진 손글씨

- 인물 라벨이 있는데 `avoid_face_overlay`가 꺼져 있으면 경고
- 검은 여백 처리 옵션이 꺼져 있으면 안내
- 문구가 너무 길면 줄바꿈 권장

## 13. 접근성

- 모든 입력에 label 연결
- 버튼은 키보드로 접근 가능
- 복사 성공 메시지는 aria-live 영역에 표시
- 색상만으로 선택 상태를 표시하지 않는다

## 14. 디자인 가이드

성격:
- 조용하고 실용적인 작업 도구
- 마케팅 랜딩페이지가 아니라 바로 사용할 수 있는 generator 화면

UI 톤:
- 밝은 neutral 배경
- 좌측 선택, 중앙 입력, 우측 결과의 작업형 레이아웃
- 카드 남발 금지
- 텍스트는 촘촘하지만 읽기 쉽게
- 버튼은 명확한 액션 중심

추천 컬러:
- background: #f7f7f4
- surface: #ffffff
- text: #1f2933
- muted: #6b7280
- accent: #2563eb
- border: #d8d8d0

## 15. MVP 작업 순서

1. Vite + React + TypeScript 생성
2. 타입 정의 작성
3. 템플릿/프리셋 데이터 작성
4. 기본 상태와 localStorage 저장 구현
5. TemplateSelector 구현
6. VariableForm 구현
7. MessageListEditor 구현
8. Prompt renderer 구현
9. PromptPreview + CopyButton 구현
10. PhotoDoodleRulesPanel 구현
11. 기본 스타일 적용
12. 샘플 케이스 3개 검수

## 16. 샘플 검수 케이스

### 케이스 1: 세부 가족사진

입력:
- template: photo_doodle
- photoContext: 가족 해변사진
- event: 세부여행
- messages: 세부여행중..., 행복한 우리가족 쭌쭌이네 ♡, 든든한 아빠
- rules: crop_black_bars, avoid_face_overlay, preserve_photo

기대:
- 검은 여백 처리 문장 포함
- 얼굴 위 장식 금지 문장 포함
- 문구 목록이 구조적으로 출력
- 복사 성공

### 케이스 2: 수채화 포스터

입력:
- template: watercolor_poster
- sceneMood: 조용한 바다
- quote: 그냥 이렇게, 너답게.
- outputMode: postprocess_text

기대:
- 인물 정체성 보존 문장 포함
- watercolor editorial style 포함
- 텍스트 직접 생성 금지 문장 포함

### 케이스 3: 키링

입력:
- template: keyring
- strapText: SEOJUN
- strapColor: charcoal
- outfitCues: gray sweatshirt

기대:
- exact raised molded strap text: "SEOJUN" 포함
- toy, not real person 포함
- distorted hands, misspelled text 금지 포함
