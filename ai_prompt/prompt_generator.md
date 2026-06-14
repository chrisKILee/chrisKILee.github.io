# Prompt Generator

이 문서는 이미지 생성 프롬프트를 매번 새로 쓰지 않고, 상황별 블록을 조합해서 만드는 용도다.

기본 원칙:
- 먼저 `작업 유형`을 고른다.
- 그 다음 `변수`를 채운다.
- 마지막으로 `공통 보존 규칙`, `텍스트 규칙`, `네거티브 프롬프트`를 붙인다.
- 한글 문구 정확도가 중요한 작업은 이미지 생성 모델에게 글자를 직접 쓰게 하기보다, 텍스트 없는 이미지 생성 후 로컬/편집툴에서 합성하는 방식을 우선한다.

---

## 1. 빠른 선택표

| 상황 | 사용할 템플릿 | 핵심 변수 |
|---|---|---|
| 가족사진에 손글씨 메시지/하트/화살표 넣기 | `A. 사진 손글씨 꾸미기` | `EVENT`, `MESSAGES`, `PHOTO_CONTEXT` |
| 인물을 감성 수채화 포스터로 만들기 | `B. 수채화 editorial poster` | `SCENE_MOOD`, `BACKGROUND_DETAIL`, `QUOTE`, `SIGNATURE` |
| 인물 기반 SD/chibi 키링 만들기 | `C. 키링 product mockup` | `STRAP_TEXT`, `OUTFIT_CUES`, `STRAP_COLOR` |
| 한 인물이 여러 미니 분신으로 등장 | `D. 분신/애교 사용법` | `TITLE`, `MINI_ACTIONS`, `CAPTIONS` |
| 여행 포스터/그래픽 콜라주 | `E. 여행 poster collage` | `COUNTRY`, `CITY`, `HEADLINE` |
| 3x3 박스칸 속 tiny toddler | `F. 3x3 cardboard box toddler` | `GRID_THEME`, `WALL_MEMOS`, `INTERACTIONS` |

---

## 2. 공통 블록

### 2.1 인물 정체성 보존

```text
업로드한 사진의 실제 인물 정체성을 반드시 유지한다.
얼굴형, 눈매와 눈 간격, 코와 입술 형태, 턱선, 얼굴 비율, 헤어스타일, 머리결 흐름, 나이, 민족적 특징, 자연스러운 비대칭, 원본 특유의 표정과 시선 느낌을 보존한다.
다른 예쁜 사람으로 바꾸지 말고, 원래 사람의 분위기를 확장한 버전처럼 표현한다.
얼굴 변경, generic AI beauty, plastic skin, 과한 anime face, 과한 보정, 정체성 손실을 피한다.
```

### 2.2 원본 사진 보존

```text
원본 사진의 인물 얼굴, 표정, 포즈, 신체 비율, 배경, 조명, 주요 사물은 그대로 유지한다.
인물의 얼굴과 몸은 절대 바꾸지 않는다.
사진 편집 작업에서는 새 인물이나 랜덤 사물을 추가하지 않는다.
```

### 2.3 한글 텍스트 정확도

```text
한글 문구가 정확해야 하는 경우, 이미지 생성 모델이 직접 글자를 만들면 깨질 수 있다.
가능하면 텍스트 없는 이미지를 먼저 생성하고, 한글 문구는 후처리로 정확히 합성한다.
모델에게 직접 쓰게 할 경우에는 문구를 짧게 유지하고, "문구를 정확히 읽을 수 있게"와 "랜덤 문자 금지"를 명확히 넣는다.
```

### 2.4 얼굴 위 장식 금지

```text
글씨, 하트, 별, 점선, 화살표, 말풍선, 낙서가 얼굴, 머리카락, 눈, 입, 손 위로 지나가지 않게 한다.
인물 라벨은 얼굴 위가 아니라 주변의 빈 공간에 배치한다.
화살표는 얼굴을 통과하지 말고 어깨, 옷, 머리 위 빈 공간 근처까지만 짧게 연결한다.
장식은 인물 위를 덮지 말고 배경 여백에 작고 은은하게 배치한다.
얼굴 주변은 깨끗하게 유지한다.
```

### 2.5 검은 여백/캡처 여백 처리

```text
원본 사진에 검은 여백, 캡처 여백, 불필요한 상하 여백이 있으면 실제 사진 영역만 자연스럽게 크롭해서 사용한다.
메시지와 낙서는 사진에서 멀리 떨어진 여백에 두지 말고, 실제 사진 안의 하늘, 바다, 모래, 벽, 테이블 같은 빈 배경 공간에 가깝게 배치한다.
사진과 메시지가 따로 노는 느낌이 아니라, 실제 사진 위에 손으로 가볍게 꾸민 듯 자연스럽게 붙어 보여야 한다.
```

### 2.6 공통 네거티브

```text
Negative prompt:
얼굴 변경, 정체성 손실, 인물 왜곡, 신체 왜곡, 손가락 오류, extra fingers, distorted hands, plastic skin, 3D render, sharp CGI, hyper realistic rendering when illustration is requested, generic anime face, AI 미소녀 스타일, 과한 보정, 과한 채도, 복잡한 배경, 랜덤 문자, 깨진 한글, 부자연스러운 타이포그래피, 얼굴을 가리는 글씨, 과도한 장식, graphic sticker doodles, watermark, unrelated text
```

---

## 3. 템플릿 A: 사진 손글씨 꾸미기

### 변수

```yaml
PHOTO_CONTEXT: 가족 해변사진 / 생일파티 사진 / 여행사진 / 음식 있는 사진
EVENT: 세부여행 / 생일파티 / 가족모임 / 기념일
DOODLE_STYLE: 흰색 손글씨 펜 / 한국 감성 birthday doodle / 따뜻한 가족사진 낙서
MESSAGES:
  - 세부여행중...
  - 행복한 우리가족 쭌쭌이네 ♡
  - 서로 사랑하자
  - 서로 이해하자
  - 든든한 아빠
  - 귀염둥이 막내♡
  - 행복한 쭌쭌맘
  - 장난꾸러기 우리 큰아들♡
```

### 생성 프롬프트

```text
업로드한 {PHOTO_CONTEXT}을 기반으로, 원본 사진의 인물 얼굴, 표정, 포즈, 배경, 조명, 주요 사물은 그대로 유지한 채 따뜻하고 귀여운 손글씨 메시지와 낙서 장식을 추가해줘.

스타일은 {DOODLE_STYLE}.
흰색 손글씨 펜으로 사진 위에 직접 꾸민 듯한 느낌.
인물 주변에 작은 하트, 별, 점선, 왕관, 짧은 화살표, 말풍선, 작은 스마일 낙서를 자연스럽게 배치한다.
너무 과하지 않게, 가족사진의 따뜻한 분위기를 살린다.

배치 규칙:
원본 사진에 검은 여백이나 불필요한 캡처 여백이 있으면 실제 사진 영역만 자연스럽게 크롭해서 사용한다.
메시지와 낙서는 사진에서 멀리 떨어진 여백이 아니라 실제 사진 안의 하늘, 바다, 모래, 벽, 테이블 같은 빈 배경 공간에 가깝게 배치한다.
얼굴, 머리카락, 눈, 입, 손 위로 하트, 점선, 화살표, 글씨가 지나가지 않게 한다.
인물 라벨은 얼굴 위가 아니라 주변 빈 공간에 배치하고, 화살표는 얼굴을 통과하지 않게 어깨, 옷, 머리 위 빈 공간 근처까지만 짧게 연결한다.
장식은 인물 위를 덮지 말고 배경 여백에만 작고 은은하게 넣는다.
사진과 메시지가 따로 노는 느낌이 아니라, 실제 사진 위에 손으로 가볍게 꾸민 듯 자연스럽게 붙어 보여야 한다.

넣을 문구:
{MESSAGES}

전체 분위기:
cozy, warm, lovely, handwritten Korean doodle, emotional, cute, intimate, natural photo decoration.

중요:
얼굴과 몸은 절대 바꾸지 않는다.
원본 인물의 정체성, 표정, 포즈를 유지한다.
메시지는 얼굴을 가리지 않게 빈 공간에 배치한다.
음식이나 케이크가 있으면 맛있고 선명하게 유지한다.
```

### 후처리 추천

```text
한글 문구 정확도가 중요하면:
1. 모델에는 "텍스트 없는 흰색 낙서 공간과 장식만" 요청한다.
2. 한글 문구는 Photoshop, Canva, Procreate, 또는 로컬 스크립트로 정확히 합성한다.
```

---

## 4. 템플릿 B: 수채화 editorial poster

### 변수

```yaml
SCENE_MOOD: 조용한 바다 / 햇빛 드는 카페 / 비 오는 거리 / 노을 산책 / 여행 순간 / cozy apartment
BACKGROUND_DETAIL: 원본 사진 속 바다와 난간 / 창가 빛 / 식물 / 골목 / 꽃
QUOTE: 그냥 이렇게, 너답게.
SIGNATURE: "@fran_co_657"
RATIO: "4:5"
```

### 생성 프롬프트

```text
업로드한 사진을 기반으로, 실제 인물의 정체성과 분위기를 유지하면서 감정이 살아있는 watercolor editorial sketch poster 스타일의 일러스트를 제작한다.
중요한 목표는 단순히 예쁜 그림이 아니라, 한 장의 조용한 감정 포스터처럼 느껴지는 이미지다.
이미지는 따뜻하고, 조용하며, 사람 냄새가 나고, 저장하고 싶어지는 감정을 가져야 한다.

인물 정체성 유지:
실제 얼굴형, 눈매와 눈 간격, 코와 입술 형태, 자연스러운 비대칭, 턱선과 얼굴 비율, 헤어스타일과 머리결 흐름, 나이, 민족적 특징, 자연스러운 신체 비율, 원본 특유의 분위기와 시선 느낌을 유지한다.
다른 예쁜 사람을 만들지 말고, 원래 사람의 감성을 확장한 버전처럼 표현한다.
과한 anime face, generic AI beauty, plastic skin 금지.
피부와 분위기는 은은하게 미화 가능하며, 감정적인 cinematic beauty는 허용한다.

핵심 스타일:
Minimal watercolor editorial illustration.
fashion sketchbook × cozy lifestyle editorial × emotional poster aesthetic.
부드러운 illustrated realism 기반.
사진과 그림 사이 어딘가의 감성.
너무 디지털 페인팅처럼 보이지 말고, 너무 완벽하게 렌더링하지 않는다.
손으로 그린 듯한 여백, 우연성, 번짐, 불완전함, 감정적인 선 느낌을 유지한다.

장면 연출:
단순 portrait가 아니라, 감정이 있는 삶의 한 장면처럼 구성한다.
원본 사진의 분위기를 기반으로 {SCENE_MOOD} 느낌의 lifestyle scene으로 자연스럽게 확장한다.
원본 사진 속 요소 1~2개를 배경에 은은한 감정 디테일로 포함한다: {BACKGROUND_DETAIL}.
배경은 복잡하지 않게 유지한다.

배경과 텍스처:
밝고 미니멀한 watercolor paper background.
watercolor paper grain, soft watercolor bleeding, imperfect pigment diffusion, faded brush texture, delicate ink outlines, hand-drawn irregularities, subtle sketch marks.
너무 깨끗한 디지털 느낌 금지.

장식 디테일:
작은 하트, tiny sparkles, botanical doodles, 얇은 감성 선, 작은 스케치 메모 느낌을 아주 은은하게만 추가한다.
graphic sticker처럼 보이지 않게 한다.

조명:
soft warm ambient lighting.
햇빛, 노을빛, 창가 빛, 잔잔한 그림자, 부드러운 피부 하이라이트.
조용하고 따뜻한 cinematic atmosphere.

색감:
warm beige, cream, soft brown, light sepia, warm gray, muted black.
저채도 warm neutral palette.

타이포그래피:
이미지 분위기에 맞는 짧고 자연스러운 손글씨 문구를 넣는다.
문구: "{QUOTE}"
문구는 누군가 조용히 건네는 말처럼 느껴져야 한다.
스케치북 한쪽에 조용히 적힌 메모처럼 자연스럽게 배치한다.

서명:
우측 하단에 아주 작고 자연스럽게 "{SIGNATURE}" 텍스트를 넣는다.
작고 은은하게, watermark처럼 자연스럽게, warm gray 또는 muted brown 톤으로 배경에 녹아들게 한다.

비율: {RATIO}
```

### 텍스트 정확도 우선 버전

```text
모델에는 문구와 서명을 직접 쓰지 말고, 빈 여백만 남기게 한다.
최종 한글 문구와 서명은 후처리로 정확히 합성한다.
```

---

## 5. 템플릿 C: 키링 product mockup

### 변수

```yaml
STRAP_TEXT: SEOJUN / YUMI / MINJUN
STRAP_COLOR: charcoal / orange / pastel blue / pink
OUTFIT_CUES: gray sweatshirt / black top and jeans / school look
BACKGROUND: softly blurred modern shopping mall interior
```

### 생성 프롬프트

```text
Use case: product-mockup
Asset type: ultra-realistic collectible keychain product photography
Input image: reference for the character identity, expression, hair, outfit cues, and pose.

Primary request:
Create an ultra-realistic product photo of a premium SD-style super-deformed chibi miniature keychain figure based on the reference character.
This is a PVC vinyl / 3D printed toy, not a real person.

Subject:
Oversized head, small body, simplified chibi limbs, sculpted hair, simplified facial features, visible molding seam lines, painted clothing folds, mixed glossy and matte factory finish.
Preserve the reference character's recognizable face identity, expression, hair color/style, outfit colors, and pose in adorable toy form.
Outfit cues: {OUTFIT_CUES}.

Keychain details:
Shiny gold keychain hardware.
Color-coordinated {STRAP_COLOR} strap.
Small cute motifs.
Exact raised molded strap text: "{STRAP_TEXT}".
The strap text must read exactly "{STRAP_TEXT}" with letters in this exact order.
Use clear raised molded letters, not flat printed text.

Scene/backdrop:
A real human hand gently pinches the keychain at the top.
{BACKGROUND} with cinematic bokeh.

Style/medium:
Ultra-realistic product photography, soft studio lighting, shallow depth of field, sharp focus on the toy and hand, glossy highlights on plastic and metal.

Constraints:
Text must read exactly "{STRAP_TEXT}".
No extra unrelated text.
No watermark.
Clearly a toy keychain.
Avoid lifelike human body proportions, distorted hands, extra fingers, misspelled text, flat illustration, low-quality toy finish.
```

### 키링 검수 체크

```text
완성 후 확인:
- 스트랩 텍스트가 정확한가?
- reference 인물의 머리/표정/옷 색감이 남아 있는가?
- 실제 사람처럼 보이지 않고 장난감 키링으로 보이는가?
- 손가락/금속 고리/스트랩이 이상하지 않은가?
```

---

## 6. 템플릿 D: 분신/애교 사용법

### 변수

```yaml
TITLE: 어버이날 맞이, 애교 사용법 / 딸 애교 사용법 / 애교 만렙 사용법 / 사랑 충전 애교 사용법
THEME: Parents' Day / Family Love / Aegyo Level Max / Love Recharge
MINI_COUNT: 6-8
MINI_SCALE: 15-25%
MINI_ACTIONS:
  - finger heart
  - cheek-heart pose
  - gentle cheek kiss
  - hugging tightly
  - holding hands
  - bringing carnations
  - bright smile
  - playful wink
CAPTIONS:
  - 손하트 기능
  - 볼하트 기능
  - 꼬옥 안아드리기
  - 꽃 전달 기능
  - 웃음 제조기
  - 윙크 애교
```

### 생성 프롬프트

```text
Create an image based on the uploaded adult woman.
The same woman appears multiple times as mini versions in one scene.
All versions must have the exact same face, identity, hairstyle, and outfit.

Core Concept:
Theme: {THEME}
A warm, emotional Korean Instagram-style greeting-card image.

Composition:
One main adult woman, large and centered, dominant presence.
Surrounding {MINI_COUNT} mini versions, each {MINI_SCALE} size.
Clear size contrast with a miniature storytelling effect.
Perspective: slightly top-down angle.
Style: Korean Instagram style, soft warm lighting, cozy emotional tone.

Mini woman actions:
{MINI_ACTIONS}
All actions must feel natural, affectionate, realistic within the scene, and not random.

Scene rules:
Use the original photo's background and mood.
Do not change the environment.
Mini versions must interact naturally with the space, table, arm, shoulder, chair, and nearby objects.

Text:
Main title in Korean:
"{TITLE}"
Large handwritten Korean text, magazine-cover style placement at top or center, bold and dominant, soft white hand-drawn style.

Small handwritten captions near each mini version:
{CAPTIONS}
Soft white handwritten text, cute, slightly imperfect.
Do not cover faces.

Decorations:
Subtle hand-drawn hearts, sparkles, and soft curved lines.
Keep minimal, warm, and clean.

Important:
Same adult woman identity across all versions.
Maintain exact outfit and hairstyle.
Adult woman proportions only.
No childlike body, no child appearance, no clutter, no over-decoration, no random poses.
```

---

## 7. 템플릿 E: 여행 poster collage

### 변수

```yaml
COUNTRY: Japan / Korea / Vietnam / France
CITY: Osaka / Seoul / Da Nang / Paris
HEADLINE: LOST IN OSAKA
SUBTEXT: JAPAN TRAVEL EDITION
TRAVELER_STYLE: modern global travel fashion
```

### 생성 프롬프트

```text
Create a stylized premium editorial travel poster / graphic collage about {COUNTRY}, set in {CITY}.

Main subject:
A stylish international tourist visiting {CITY}, {COUNTRY}, clearly presented as a traveler rather than a local resident.
The tourist wears {TRAVELER_STYLE} and carries visible travel items such as a camera, backpack, sunglasses, folded map, and suitcase.

Scene:
Place the tourist in a dynamic composition surrounded by iconic elements of {CITY} and {COUNTRY}:
recognizable architecture, streets, landmarks, transportation, local signage, food, markets, landscapes, and cultural textures.

Style:
Blend realistic character detail with a graphic collage background using layered paper textures, torn poster edges, sticker-like elements, halftone dots, editorial typography, bold geometric shapes, and vibrant print-poster design.

Text:
Large readable headline:
"{HEADLINE}"

Optional subtext:
"{SUBTEXT}"

Mood:
Modern, artistic, premium, energetic, travel-magazine aesthetic.
Balanced layout, print-worthy composition, strong sense of {CITY} and {COUNTRY}, with the tourist clearly foreign to the setting.
```

---

## 8. 템플릿 F: 3x3 cardboard box toddler

### 변수

```yaml
GRID_THEME: tiny toddler box collage / miniature kid world / cozy cardboard room
BOX_COUNT: 3x3
WALL_MEMOS:
  - 안녕 곰돌아 ♡
  - 오늘 어디 갈까?
  - 같이 놀자 :)
  - 꼬옥 안아줄게
  - 너 진짜 귀엽다
  - 우리 비밀 얘기 할까?
  - 잘했어 최고야!
INTERACTIONS:
  - 옆칸 캐릭터에게 물건 건네기
  - 박스 경계 너머 손 뻗기
  - 같은 곰인형 같이 바라보기
  - 서로 이야기하는 듯한 시선
```

### 생성 프롬프트

```text
Input:
Uploaded portrait photo of one real person.

Final goal:
Transform the real person into a tiny toddler version inside a {BOX_COUNT} cardboard box room grid.
Each box contains the same person as a miniature kid with a different expression and pose.
The boxes form one connected tiny world with warm cardboard photography aesthetic, cozy brown tones, and emotional child portrait mood.

Box rules:
The full composition must be a clear {BOX_COUNT} square grid structure.
Each cell is an independent cardboard box room.
The cardboard material and boundaries must be clearly visible.
Each cell should feel like a tiny room.
Keep a unified world across all boxes.
Warm brown and beige tone.
Minimal background clutter.

Character rules:
Preserve the uploaded person's facial features, eyes, nose, mouth, and hair.
Convert only into a tiny toddler version.
Natural childlike proportions: slightly larger head, short chubby arms and legs, small hands and feet.
Cute but not AI anime girl style.
No toy-like plastic skin.
Natural emotional child photo feeling.

Interaction rules:
Use 2-3 subtle connected interactions only:
{INTERACTIONS}
Do not make every cell interact, or the image will become too cluttered.

Handwritten memo rules:
Small handwritten pen doodle style.
Not large typography.
Small emotional memo on cardboard walls.
White or cream pen feeling.
Example wall memos:
{WALL_MEMOS}

Camera and lighting:
Soft warm studio lighting, warm amber tone, shallow depth of field, soft shadows, cinematic cozy photography, eye-level miniature camera angle, slight macro photography feeling.

Critical rules:
Keep the same person in every cell.
Do not change the face between cells.
Do not use adult proportions or long limbs.
Avoid Disney style, neon colors, cluttered background, broken box structure, excessive text, uncanny or horror feeling.
```

---

## 9. 조합용 미니 블록

### 따뜻한 한국 감성

```text
Korean Instagram aesthetic, warm daylight, soft beige tone, cozy emotional mood, clean layout, subtle hand-drawn white hearts and sparkles.
```

### 프리미엄 제품사진

```text
Ultra-realistic product photography, shallow depth of field, cinematic bokeh, soft studio lighting, glossy highlights, sharp focus on the subject.
```

### 조용한 감성 포스터

```text
Quiet emotional poster aesthetic, warm neutral palette, generous negative space, soft ambient light, subtle paper texture, intimate human mood.
```

### 낙서 장식

```text
Small white handwritten doodles: tiny hearts, sparkles, short arrows, dotted lines, speech bubbles, small smile marks. Keep subtle and do not cover faces.
```

### 텍스트 직접 생성 금지

```text
Do not generate readable text, letters, captions, or signatures inside the image.
Leave clean empty space for text to be added later in post-processing.
```

---

## 10. 최종 프롬프트 만드는 순서

1. 작업 유형을 고른다.
2. 해당 템플릿의 변수를 채운다.
3. 인물 사진이면 `2.1 인물 정체성 보존`을 붙인다.
4. 사진 편집이면 `2.2 원본 사진 보존`을 붙인다.
5. 글씨/낙서가 있으면 `2.3 한글 텍스트 정확도`, `2.4 얼굴 위 장식 금지`를 붙인다.
6. 캡처 여백이 있으면 `2.5 검은 여백/캡처 여백 처리`를 붙인다.
7. 마지막에 `2.6 공통 네거티브`를 붙인다.

---

## 11. 예시: 세부 가족사진 손글씨 꾸미기

```text
업로드한 가족 해변사진을 기반으로, 원본 사진의 인물 얼굴, 표정, 포즈, 해변 배경, 조명은 그대로 유지한 채 따뜻하고 귀여운 손글씨 메시지와 낙서 장식을 추가해줘.

스타일은 한국 감성의 여행 가족사진 photo doodle editing style.
흰색 손글씨 펜으로 사진 위에 직접 꾸민 듯한 느낌.
작은 하트, 별, 점선, 짧은 화살표, 작은 스마일 낙서를 자연스럽게 배치해줘.

원본 사진에 검은 여백이나 불필요한 캡처 여백이 있으면 실제 사진 영역만 자연스럽게 크롭해서 사용한다.
메시지와 낙서는 사진에서 멀리 떨어진 여백이 아니라 실제 사진 안의 하늘, 바다, 모래 같은 빈 배경 공간에 가깝게 배치한다.
얼굴, 머리카락, 눈, 입, 손 위로 하트, 점선, 화살표, 글씨가 지나가지 않게 한다.
인물 라벨은 얼굴 위가 아니라 주변 빈 공간에 배치하고, 화살표는 얼굴을 통과하지 않게 어깨, 옷, 머리 위 빈 공간 근처까지만 짧게 연결한다.
장식은 인물 위를 덮지 말고 배경 여백에만 작고 은은하게 넣는다.

넣을 문구:
"세부여행중..."
"행복한 우리가족 쭌쭌이네 ♡"
"서로 사랑하자"
"서로 이해하자"
"든든한 아빠"
"귀염둥이 막내♡"
"행복한 쭌쭌맘"
"장난꾸러기 우리 큰아들♡"

전체 분위기:
cozy, warm, lovely, handwritten Korean doodle, family travel memory, emotional, cute, intimate, natural photo decoration.

Negative prompt:
얼굴 변경, 인물 왜곡, 손가락 오류, 과한 스티커 느낌, 컬러풀한 그래픽 스티커, 깨진 한글, 랜덤 문자, 얼굴을 가리는 글씨, 과도한 장식, AI 합성 티 나는 느낌, 플라스틱 피부, 3D 렌더링
```

---

## 12. 예시: 수채화 포스터 텍스트 후처리용

```text
업로드한 사진을 기반으로, 실제 인물의 정체성과 분위기를 유지하면서 watercolor editorial sketch poster 스타일의 일러스트를 제작한다.
조용한 바다와 창가 빛이 느껴지는 따뜻한 감성 포스터.
원본의 얼굴형, 눈매, 코, 입술, 헤어스타일, 나이, 시선 느낌을 유지한다.
다른 사람으로 바꾸지 말고 원래 사람의 감성을 확장한 버전처럼 표현한다.

Minimal watercolor editorial illustration.
fashion sketchbook × cozy lifestyle editorial × emotional poster aesthetic.
watercolor paper grain, soft watercolor bleeding, imperfect pigment diffusion, delicate ink outlines, hand-drawn irregularities.
warm beige, cream, soft brown, light sepia, warm gray, muted black.

원본 사진 속 바다, 난간, 식물 중 1-2개를 은은한 배경 디테일로 포함한다.
복잡한 배경은 피하고, 넉넉한 여백을 남긴다.

텍스트는 생성하지 않는다.
서명도 생성하지 않는다.
한글 문구와 서명은 후처리로 추가할 수 있도록 깨끗한 빈 여백을 남긴다.

비율: 4:5

Negative prompt:
generic anime face, AI 미소녀 스타일, 얼굴 변경, 정체성 손실, plastic skin, 3D render, hyper realistic rendering, over detailed painting, 복잡한 배경, 광고 화보 느낌, sharp CGI, 손가락 오류, 신체 왜곡, 랜덤 문자, 깨진 한글, 부자연스러운 타이포그래피, graphic sticker doodles, 과한 채도
```
