(function () {
  "use strict";

  const STORAGE_KEY = "prompt-generator-state-v1";

  const templates = [
    {
      id: "photo_doodle",
      name: "사진 손글씨 꾸미기",
      description: "가족사진, 여행사진, 생일사진 위에 흰색 손글씨와 낙서를 추가하는 프롬프트",
      fields: [
        {
          id: "photoContext",
          label: "사진 유형",
          type: "select",
          defaultValue: "가족 해변사진",
          options: ["가족 해변사진", "가족 생일파티 사진", "가족 여행사진", "음식이 있는 가족사진", "단독 인물사진"],
        },
        {
          id: "event",
          label: "상황/이벤트",
          type: "text",
          defaultValue: "세부여행",
          placeholder: "예: 세부여행, 생일파티, 가족모임",
        },
        {
          id: "doodleStyle",
          label: "낙서 스타일",
          type: "select",
          defaultValue: "따뜻한 가족 여행 photo doodle editing style",
          options: [
            "흰색 손글씨 펜",
            "한국 감성 birthday party photo doodle editing style",
            "따뜻한 가족 여행 photo doodle editing style",
            "minimal handwritten memory note style",
            "cozy Korean family photo annotation style",
          ],
        },
        {
          id: "decorationLevel",
          label: "장식 강도",
          type: "select",
          defaultValue: "은은하게",
          options: ["아주 적게", "은은하게", "보통", "풍성하게"],
        },
      ],
      defaultMoodIds: ["warm_family_memory", "korean_instagram"],
      defaultRuleIds: ["preserve_photo", "korean_text_accuracy", "avoid_face_overlay", "crop_black_bars"],
    },
    {
      id: "watercolor_poster",
      name: "수채화 포스터",
      description: "인물 정체성을 유지한 감성 watercolor editorial sketch poster 프롬프트",
      fields: [
        {
          id: "sceneMood",
          label: "장면 분위기",
          type: "select",
          defaultValue: "조용한 바다",
          options: ["조용한 바다", "햇빛 드는 카페", "비 오는 거리", "노을 산책", "여행 순간", "cozy apartment", "조용한 골목"],
        },
        {
          id: "backgroundDetail",
          label: "배경 디테일",
          type: "text",
          defaultValue: "원본 사진 속 바다와 난간",
        },
        {
          id: "quote",
          label: "문구",
          type: "text",
          defaultValue: "그냥 이렇게, 너답게.",
        },
        {
          id: "signature",
          label: "서명",
          type: "text",
          defaultValue: "@fran_co_657",
        },
        {
          id: "ratio",
          label: "비율",
          type: "select",
          defaultValue: "4:5",
          options: ["4:5", "1:1", "9:16", "16:9"],
        },
      ],
      defaultMoodIds: ["quiet_emotional_poster"],
      defaultRuleIds: ["preserve_identity", "korean_text_accuracy"],
    },
    {
      id: "keyring",
      name: "키링 제품사진",
      description: "인물 기반 SD/chibi PVC 키링 product mockup 프롬프트",
      fields: [
        {
          id: "strapText",
          label: "스트랩 문구",
          type: "text",
          defaultValue: "SEOJUN",
        },
        {
          id: "strapColor",
          label: "스트랩 색상",
          type: "select",
          defaultValue: "charcoal",
          options: ["charcoal", "orange", "pastel blue", "pink", "cream", "navy"],
        },
        {
          id: "outfitCues",
          label: "옷 단서",
          type: "text",
          defaultValue: "gray sweatshirt",
        },
        {
          id: "background",
          label: "배경",
          type: "select",
          defaultValue: "softly blurred modern shopping mall interior",
          options: [
            "softly blurred modern shopping mall interior",
            "clean product studio background",
            "warm cafe table product photo",
            "minimal lifestyle desk scene",
          ],
        },
      ],
      defaultMoodIds: ["premium_product"],
      defaultRuleIds: ["preserve_identity"],
    },
    {
      id: "mini_aegyo",
      name: "분신/애교 사용법",
      description: "같은 인물이 여러 미니 버전으로 등장하는 한국 감성 greeting-card 프롬프트",
      fields: [
        {
          id: "title",
          label: "메인 제목",
          type: "text",
          defaultValue: "어버이날 맞이, 애교 사용법",
        },
        {
          id: "theme",
          label: "테마",
          type: "select",
          defaultValue: "Parents' Day / Family Love",
          options: ["Parents' Day / Family Love", "Aegyo Level Max", "Love Recharge", "Daughter's Aegyo Manual"],
        },
        {
          id: "miniCount",
          label: "미니 인물 수",
          type: "select",
          defaultValue: "6-8",
          options: ["5-6", "6-8", "8-10"],
        },
        {
          id: "actions",
          label: "미니 액션 목록",
          type: "textarea",
          defaultValue:
            "finger heart\ncheek-heart pose\ngentle cheek kiss\nhugging tightly\nholding hands\nbringing carnations\nbright smile\nplayful wink",
        },
        {
          id: "captions",
          label: "작은 캡션",
          type: "textarea",
          defaultValue: "손하트 기능\n볼하트 기능\n꼬옥 안아드리기\n꽃 전달 기능\n웃음 제조기\n윙크 애교",
        },
      ],
      defaultMoodIds: ["korean_instagram", "warm_family_memory"],
      defaultRuleIds: ["preserve_identity", "avoid_face_overlay", "korean_text_accuracy"],
    },
    {
      id: "travel_poster",
      name: "여행 포스터",
      description: "도시/국가 기반 premium editorial travel poster collage 프롬프트",
      fields: [
        {
          id: "country",
          label: "국가",
          type: "text",
          defaultValue: "Japan",
        },
        {
          id: "city",
          label: "도시",
          type: "text",
          defaultValue: "Osaka",
        },
        {
          id: "headline",
          label: "헤드라인",
          type: "text",
          defaultValue: "LOST IN OSAKA",
        },
        {
          id: "subtext",
          label: "서브텍스트",
          type: "text",
          defaultValue: "JAPAN TRAVEL EDITION",
        },
        {
          id: "travelerStyle",
          label: "여행자 스타일",
          type: "text",
          defaultValue: "modern global travel fashion",
        },
      ],
      defaultMoodIds: ["editorial_travel"],
      defaultRuleIds: [],
    },
    {
      id: "cardboard_toddler",
      name: "3x3 박스 꼬맹이",
      description: "실제 인물을 tiny toddler 버전으로 바꿔 cardboard box grid에 배치하는 프롬프트",
      fields: [
        {
          id: "gridTheme",
          label: "그리드 테마",
          type: "select",
          defaultValue: "tiny toddler box collage",
          options: ["tiny toddler box collage", "miniature kid world", "cozy cardboard room", "warm parenting photo grid"],
        },
        {
          id: "wallMemos",
          label: "박스 벽 메모",
          type: "textarea",
          defaultValue: "안녕 곰돌아 ♡\n오늘 어디 갈까?\n같이 놀자 :)\n꼬옥 안아줄게\n잘했어 최고야!",
        },
        {
          id: "interactions",
          label: "상호작용",
          type: "textarea",
          defaultValue: "옆칸 캐릭터에게 물건 건네기\n박스 경계 너머 손 뻗기\n같은 곰인형 같이 바라보기",
        },
      ],
      defaultMoodIds: ["cozy_brown"],
      defaultRuleIds: ["preserve_identity"],
    },
    {
      id: "miniature",
      name: "3D 미니어처 카드뉴스",
      description: "주제를 표현한 감성 3D 미니어처 인스타 카드뉴스 (파스텔톤, 손글씨 메모)",
      fields: [
        {
          id: "theme",
          label: "주제",
          type: "text",
          defaultValue: "제주도 한 달 살기",
          placeholder: "예: 제주도 한 달 살기, 첫 캠핑, 홈카페",
        },
        {
          id: "title",
          label: "메인 문구",
          type: "text",
          defaultValue: "제주에서 보낸 한 달",
        },
        {
          id: "subtitle",
          label: "부제 문구",
          type: "text",
          defaultValue: "느리게 걷는 하루의 기록",
        },
        {
          id: "memos",
          label: "손글씨 메모 (줄당 1개)",
          type: "textarea",
          defaultValue: "오늘도 바다 보러 가기\n귤 한 박스 도착\n돌담길 산책\n노을 맛집 발견",
        },
        {
          id: "ratio",
          label: "비율",
          type: "select",
          defaultValue: "4:5",
          options: ["4:5", "1:1", "9:16", "2:3"],
        },
      ],
      defaultMoodIds: ["korean_instagram", "minimal_clean"],
      defaultRuleIds: ["korean_text_accuracy"],
    },
    {
      id: "travel_typography",
      name: "트래블로그 타이포 포스터",
      description: "거대 도시명 타이포 위를 미니 chibi가 여행하는 premium travel-log 포스터",
      fields: [
        {
          id: "city",
          label: "도시 (대형 타이포)",
          type: "text",
          defaultValue: "PARIS",
        },
        {
          id: "country",
          label: "국가",
          type: "text",
          defaultValue: "FRANCE",
        },
        {
          id: "travelDate",
          label: "여행 날짜",
          type: "text",
          defaultValue: "2025.04.27 ~ 2025.05.02",
        },
        {
          id: "landmarks",
          label: "랜드마크 (줄당 1개, 타이포 안 콜라주)",
          type: "textarea",
          defaultValue: "Eiffel Tower\nLouvre Museum\nArc de Triomphe\nParis cafe streets\nSeine River\ncity night lights",
        },
        {
          id: "miniCount",
          label: "미니 캐릭터 수",
          type: "select",
          defaultValue: "6",
          options: ["4", "5", "6", "8"],
        },
        {
          id: "ratio",
          label: "비율",
          type: "select",
          defaultValue: "4:5",
          options: ["4:5", "2:3", "9:16"],
        },
      ],
      defaultMoodIds: ["editorial_travel"],
      defaultRuleIds: ["preserve_identity"],
    },
    {
      id: "yacht_selfie",
      name: "요트 셀피 화보",
      description: "인물 정체성을 유지한 럭셔리 요트 셀피 포트레이트 (헤어·선글라스 조건이 결과를 좌우)",
      photoGuide: {
        shot: "상반신 셀피 앵글, 얼굴 정면",
        must: ["얼굴이 또렷한 정면/약간 위 각도 사진", "밝은 야외광"],
        nice: ["선글라스 착용 사진", "여름 의상"],
      },
      fields: [
        {
          id: "topStyle",
          label: "상의 스타일",
          type: "select",
          defaultValue: "fitted black ribbed deep scoop-neck top with thin straps",
          options: [
            "fitted black ribbed deep scoop-neck top with thin straps",
            "white linen shirt",
            "beige knit summer top",
            "navy halter top",
          ],
        },
      ],
      photoConditionIds: ["refHair", "hairColor", "sunglasses", "signature"],
      defaultMoodIds: ["editorial_travel"],
      defaultRuleIds: ["preserve_identity"],
    },
    {
      id: "beach_resort",
      name: "해변 리조트 화보",
      description: "전신 다이내믹 비치 리조트 패션 화보. 헤어는 레퍼런스 사진을 따른다",
      photoGuide: {
        shot: "전신이 보이는 사진 권장",
        must: ["얼굴 정면이 선명", "밝은 자연광"],
        nice: ["전신 포즈 사진", "바다·야외 배경"],
      },
      fields: [
        {
          id: "swimwear",
          label: "수영복",
          type: "select",
          defaultValue: "brown and cream striped string bikini set",
          options: [
            "brown and cream striped string bikini set",
            "black triangle bikini set",
            "white one-piece swimsuit",
            "pastel high-waist bikini set",
          ],
        },
        {
          id: "motion",
          label: "동작",
          type: "select",
          defaultValue: "running and skipping playfully along the shoreline",
          options: [
            "running and skipping playfully along the shoreline",
            "walking casually along the wet sand",
            "standing confidently facing the camera",
          ],
        },
      ],
      photoConditionIds: ["refHair", "hairColor", "signature"],
      defaultMoodIds: ["editorial_travel"],
      defaultRuleIds: ["preserve_identity"],
    },
    {
      id: "santorini_alley",
      name: "산토리니 골목 여행",
      description: "지중해 흰 골목 + 부겐빌레아 배경의 여행 포트레이트 (시나리오 선택)",
      photoGuide: {
        shot: "상반신~전신",
        must: ["얼굴 정면/약측면이 선명", "자연광"],
        nice: ["원피스 등 밝은 의상 사진"],
      },
      fields: [
        {
          id: "scenario",
          label: "시나리오",
          type: "select",
          defaultValue: "walking slowly down the alley, full-body shot, slight low angle, dynamic diagonal framing",
          options: [
            "walking slowly down the alley, full-body shot, slight low angle, dynamic diagonal framing",
            "checking a smartphone map, head slightly down, focused gaze, natural diagonal folds on the dress shoulder",
            "leaning close to pink bougainvillea to smell the blossoms, one hand resting on the rough stucco wall",
          ],
        },
        {
          id: "dressColor",
          label: "원피스 색",
          type: "text",
          defaultValue: "white",
        },
      ],
      photoConditionIds: ["refHair", "hairColor", "outfitFromRef"],
      defaultMoodIds: ["editorial_travel"],
      defaultRuleIds: ["preserve_identity"],
    },
    {
      id: "hydrangea_overhead",
      name: "수국 버드아이 화보",
      description: "수국 클러스터 사이로 보이는 위에서 내려다본(버드아이) 럭셔리 화보. 헤어는 업두로 고정",
      photoGuide: {
        shot: "얼굴 클로즈업 (위에서 내려다본 각도면 더 좋음)",
        must: ["얼굴이 또렷한 사진", "가능하면 고개를 든 각도"],
        nice: ["밝은 의상색 사진"],
      },
      fields: [
        {
          id: "faceVisible",
          label: "얼굴 노출 비율",
          type: "select",
          defaultValue: "50-60%",
          options: ["50-60%", "40%", "70%"],
        },
      ],
      photoConditionIds: ["hairColor", "outfitFromRef", "signature"],
      defaultMoodIds: ["quiet_emotional_poster"],
      defaultRuleIds: ["preserve_identity"],
    },
    {
      id: "goddess_plaza",
      name: "여신 리조트 플라자",
      description: "지중해 리조트 플라자 배경의 K-아이돌 무드 럭셔리 포트레이트",
      photoGuide: {
        shot: "상반신~전신",
        must: ["얼굴 정면이 선명", "밝은 광"],
        nice: ["여름 리조트 의상 사진"],
      },
      fields: [
        {
          id: "dressStyle",
          label: "드레스 스타일",
          type: "select",
          defaultValue: "short black tight mini dress with draped cowl neckline and high thigh slit",
          options: [
            "short black tight mini dress with draped cowl neckline and high thigh slit",
            "white flowing summer dress",
            "beige knit mini dress",
          ],
        },
      ],
      photoConditionIds: ["refHair", "hairColor"],
      defaultMoodIds: ["editorial_travel"],
      defaultRuleIds: ["preserve_identity"],
    },
  ];

  const moodPresets = [
    {
      id: "warm_family_memory",
      label: "따뜻한 가족 기록",
      description: "가족사진, 여행사진, 기념일 사진에 적합",
      promptBlock:
        "cozy, warm, lovely, intimate family memory, natural photo decoration, soft white handwritten doodles, emotional but not excessive.",
    },
    {
      id: "korean_instagram",
      label: "한국 인스타 감성",
      description: "밝고 귀여운 한국식 감성 편집",
      promptBlock:
        "Korean Instagram aesthetic, warm daylight, soft beige tone, clean layout, subtle hand-drawn white hearts and sparkles.",
    },
    {
      id: "quiet_emotional_poster",
      label: "조용한 감정 포스터",
      description: "수채화, 감성 포스터, 인물 일러스트에 적합",
      promptBlock:
        "Quiet emotional poster aesthetic, warm neutral palette, generous negative space, soft ambient light, subtle paper texture, intimate human mood.",
    },
    {
      id: "premium_product",
      label: "프리미엄 제품사진",
      description: "키링, 굿즈, 상품 목업에 적합",
      promptBlock:
        "Ultra-realistic product photography, shallow depth of field, cinematic bokeh, soft studio lighting, glossy highlights, sharp focus on the subject.",
    },
    {
      id: "cozy_brown",
      label: "포근한 브라운톤",
      description: "박스, 키즈 화보, 감성 스튜디오 톤",
      promptBlock:
        "Warm brown and beige tone, cozy studio mood, soft amber light, gentle shadows, emotional and comfortable atmosphere.",
    },
    {
      id: "bright_birthday",
      label: "밝은 생일파티",
      description: "생일, 파티, 축하 사진에 적합",
      promptBlock:
        "Bright and lovely birthday party mood, warm indoor lighting, cute white handwritten decorations, tiny hearts, sparkles, and celebration feeling.",
    },
    {
      id: "editorial_travel",
      label: "프리미엄 여행 매거진",
      description: "도시 여행 포스터와 콜라주에 적합",
      promptBlock:
        "Modern, artistic, premium, energetic, travel-magazine aesthetic with layered paper textures and print-worthy composition.",
    },
    {
      id: "minimal_clean",
      label: "미니멀 클린",
      description: "과한 장식 없이 깔끔한 결과",
      promptBlock:
        "Minimal and clean composition, controlled visual density, clear hierarchy, no clutter, refined quiet spacing.",
    },
  ];

  const ruleBlocks = [
    {
      id: "preserve_identity",
      label: "인물 정체성 보존",
      description: "얼굴형, 눈매, 헤어스타일, 나이, 시선 유지",
      promptBlock:
        "업로드한 사진의 실제 인물 정체성을 반드시 유지한다. 얼굴형, 눈매와 눈 간격, 코와 입술 형태, 턱선, 얼굴 비율, 헤어스타일, 머리결 흐름, 나이, 민족적 특징, 자연스러운 비대칭, 원본 특유의 표정과 시선 느낌을 보존한다. 다른 예쁜 사람으로 바꾸지 말고, 원래 사람의 분위기를 확장한 버전처럼 표현한다.",
    },
    {
      id: "preserve_photo",
      label: "원본 사진 보존",
      description: "사진 편집 시 얼굴/포즈/배경/조명 유지",
      promptBlock:
        "원본 사진의 인물 얼굴, 표정, 포즈, 신체 비율, 배경, 조명, 주요 사물은 그대로 유지한다. 인물의 얼굴과 몸은 절대 바꾸지 않는다. 사진 편집 작업에서는 새 인물이나 랜덤 사물을 추가하지 않는다.",
    },
    {
      id: "korean_text_accuracy",
      label: "한글 정확도 우선",
      description: "한글은 가능하면 후처리 합성 권장",
      promptBlock:
        "한글 문구가 정확해야 하는 경우, 이미지 생성 모델이 직접 글자를 만들면 깨질 수 있다. 가능하면 텍스트 없는 이미지를 먼저 생성하고, 한글 문구는 후처리로 정확히 합성한다. 모델에게 직접 쓰게 할 경우에는 문구를 짧게 유지하고 랜덤 문자와 깨진 한글을 금지한다.",
    },
    {
      id: "avoid_face_overlay",
      label: "얼굴 위 장식 금지",
      description: "글씨/하트/화살표가 얼굴을 지나가지 않게 함",
      promptBlock:
        "글씨, 하트, 별, 점선, 화살표, 말풍선, 낙서가 얼굴, 머리카락, 눈, 입, 손 위로 지나가지 않게 한다. 인물 라벨은 얼굴 위가 아니라 주변의 빈 공간에 배치한다. 화살표는 얼굴을 통과하지 말고 어깨, 옷, 머리 위 빈 공간 근처까지만 짧게 연결한다. 얼굴 주변은 깨끗하게 유지한다.",
    },
    {
      id: "crop_black_bars",
      label: "검은 여백 제거",
      description: "캡처 여백 대신 실제 사진 영역만 사용",
      promptBlock:
        "원본 사진에 검은 여백, 캡처 여백, 불필요한 상하 여백이 있으면 실제 사진 영역만 자연스럽게 크롭해서 사용한다. 메시지와 낙서는 사진에서 멀리 떨어진 여백에 두지 말고, 실제 사진 안의 하늘, 바다, 모래, 벽, 테이블 같은 빈 배경 공간에 가깝게 배치한다.",
    },
    {
      id: "subtle_decoration",
      label: "장식 은은하게",
      description: "과한 스티커 느낌 방지",
      promptBlock:
        "장식은 인물 위를 덮지 말고 배경 여백에만 작고 은은하게 넣는다. 전체적으로 사진과 메시지가 따로 노는 느낌이 아니라, 실제 사진 위에 손으로 가볍게 꾸민 듯 자연스럽게 붙어 보여야 한다. 과한 스티커 느낌과 컬러풀한 그래픽 장식을 피한다.",
    },
  ];

  // 재사용 사진 조건 카탈로그 — 템플릿이 photoConditionIds로 참조한다.
  const photoConditions = [
    {
      id: "refHair",
      label: "내 사진 헤어",
      type: "select",
      defaultValue: "긴 생머리",
      options: ["긴 생머리", "긴 웨이브", "단발/숏컷", "묶은 머리/업두"],
    },
    {
      id: "hairColor",
      label: "헤어 색",
      type: "select",
      defaultValue: "원본 그대로",
      options: ["원본 그대로", "흑발", "갈색", "밝은 갈색"],
    },
    {
      id: "sunglasses",
      label: "선글라스",
      type: "select",
      defaultValue: "없음(맨얼굴)",
      options: ["없음(맨얼굴)", "반사 선글라스 착용", "살짝 내린 선글라스"],
    },
    {
      id: "outfitFromRef",
      label: "의상 색 반영",
      type: "checkbox",
      defaultValue: false,
      hint: "내 사진 옷 색을 의상 디자인에 반영",
    },
    {
      id: "signature",
      label: "서명 워터마크",
      type: "text",
      defaultValue: "",
      placeholder: "예: Arif N Studio (비우면 미삽입)",
    },
  ];

  const negativePrompt =
    "Negative prompt:\n얼굴 변경, 정체성 손실, 인물 왜곡, 신체 왜곡, 손가락 오류, extra fingers, distorted hands, plastic skin, 3D render, sharp CGI, generic anime face, AI 미소녀 스타일, 과한 보정, 과한 채도, 복잡한 배경, 랜덤 문자, 깨진 한글, 부자연스러운 타이포그래피, 얼굴을 가리는 글씨, 과도한 장식, graphic sticker doodles, watermark, unrelated text";

  const messagePresets = [
    {
      id: "cebu_family",
      label: "세부 가족사진",
      messages: [
        item("세부여행중...", "title", "top_sky", false, "subtle"),
        item("행복한 우리가족 쭌쭌이네 ♡", "family_caption", "top_sky", false, "subtle"),
        item("서로 사랑하자", "emotion_note", "left_background", false, "none"),
        item("서로 이해하자", "emotion_note", "right_background", false, "none"),
        item("든든한 아빠", "person_label", "left_background", true, "none"),
        item("귀염둥이 막내♡", "person_label", "near_subject_empty_space", true, "none"),
        item("행복한 쭌쭌맘", "person_label", "near_subject_empty_space", true, "none"),
        item("장난꾸러기 우리 큰아들♡", "person_label", "right_background", true, "none"),
      ],
    },
    {
      id: "birthday_family",
      label: "생일파티",
      messages: [
        item("생일 축하해!", "title", "top_sky", false, "normal"),
        item("오늘의 주인공은 바로 너야 ♡", "family_caption", "top_sky", false, "subtle"),
        item("사랑하는 우리 공주님", "emotion_note", "left_background", false, "subtle"),
        item("반짝반짝 너의 하루가 빛나길 바래", "emotion_note", "right_background", false, "subtle"),
        item("사랑이 가득한 우리 가족", "family_caption", "bottom_sand_or_table", false, "subtle"),
      ],
    },
    {
      id: "quiet_notes",
      label: "감성 메모",
      messages: [
        item("그냥 이렇게, 너답게.", "emotion_note", "bottom_sand_or_table", false, "none"),
        item("오늘의 공기까지 기억하고 싶어.", "emotion_note", "left_background", false, "none"),
      ],
    },
  ];

  function item(text, role, placement, arrow, decorationStrength) {
    return {
      id: cryptoId(),
      text,
      role,
      placement,
      arrow,
      decorationStrength,
    };
  }

  function cryptoId() {
    if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
      return window.crypto.randomUUID();
    }
    return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function photoConditionFields(template) {
    return (template.photoConditionIds || [])
      .map((id) => photoConditions.find((condition) => condition.id === id))
      .filter(Boolean);
  }

  function allFields(template) {
    return [...template.fields, ...photoConditionFields(template)];
  }

  function defaultValues(template) {
    return Object.fromEntries(
      allFields(template).map((field) => [field.id, "defaultValue" in field ? field.defaultValue : ""])
    );
  }

  function defaultState(templateId) {
    const template = getTemplate(templateId);
    return {
      selectedTemplateId: template.id,
      values: defaultValues(template),
      selectedMoodIds: [...template.defaultMoodIds],
      selectedRuleIds: [...template.defaultRuleIds],
      messages: messagePresets[0].messages.map(cloneMessage),
      outputMode: template.id === "watercolor_poster" ? "postprocess_text" : "direct_text",
      includeNegative: true,
    };
  }

  function cloneMessage(message) {
    return { ...message, id: cryptoId() };
  }

  function getTemplate(id) {
    return templates.find((template) => template.id === id) || templates[0];
  }

  function loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return defaultState("photo_doodle");
      const parsed = JSON.parse(stored);
      if (!parsed || !getTemplate(parsed.selectedTemplateId)) return defaultState("photo_doodle");
      return {
        ...defaultState(parsed.selectedTemplateId),
        ...parsed,
      };
    } catch {
      return defaultState("photo_doodle");
    }
  }

  // Node 테스트 환경: 순수 함수만 export하고 DOM/localStorage 부트스트랩은 건너뛴다.
  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      templates,
      photoConditions,
      moodPresets,
      ruleBlocks,
      negativePrompt,
      getTemplate,
      defaultValues,
      photoConditionFields,
      renderTemplateBody,
      renderPrompt,
      conditionNegatives,
      hairClause,
      hairTypePhrase,
      hairColorPhrase,
      sunglassesClause,
      signatureClause,
      outfitFromRefClause,
      compactSections,
      linesToBullets,
    };
    return;
  }

  let state = loadState();

  const els = {
    templateList: document.getElementById("templateList"),
    templateCount: document.getElementById("templateCount"),
    moodList: document.getElementById("moodList"),
    ruleList: document.getElementById("ruleList"),
    variableForm: document.getElementById("variableForm"),
    photoGuide: document.getElementById("photoGuide"),
    photoConditionSection: document.getElementById("photoConditionSection"),
    photoConditionForm: document.getElementById("photoConditionForm"),
    messageEditorSection: document.getElementById("messageEditorSection"),
    messagePresetRow: document.getElementById("messagePresetRow"),
    messageList: document.getElementById("messageList"),
    addMessageButton: document.getElementById("addMessageButton"),
    promptPreview: document.getElementById("promptPreview"),
    charCount: document.getElementById("charCount"),
    activeTemplateName: document.getElementById("activeTemplateName"),
    activeTemplateDescription: document.getElementById("activeTemplateDescription"),
    includeNegative: document.getElementById("includeNegative"),
    modeDirect: document.getElementById("modeDirect"),
    modePost: document.getElementById("modePost"),
    outputModeHelp: document.getElementById("outputModeHelp"),
    copyButton: document.getElementById("copyButton"),
    copyTopButton: document.getElementById("copyTopButton"),
    resetButton: document.getElementById("resetButton"),
    statusLine: document.getElementById("statusLine"),
  };

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function setState(nextState) {
    state = nextState;
    persist();
    render();
  }

  function render() {
    const template = getTemplate(state.selectedTemplateId);
    els.activeTemplateName.textContent = template.name;
    els.activeTemplateDescription.textContent = template.description;
    els.templateCount.textContent = `${templates.length}개`;
    renderTemplates();
    renderMoods();
    renderRules();
    renderPhotoGuide(template);
    renderFields(template);
    renderPhotoConditions(template);
    renderMessages();
    renderOutputMode();
    els.includeNegative.checked = state.includeNegative;
    const prompt = renderPrompt(state);
    els.promptPreview.value = prompt;
    els.charCount.textContent = prompt.length.toLocaleString("ko-KR");
  }

  function renderTemplates() {
    els.templateList.innerHTML = "";
    templates.forEach((template) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `template-card${template.id === state.selectedTemplateId ? " active" : ""}`;
      button.dataset.templateId = template.id;
      button.innerHTML = `<strong>${escapeHtml(template.name)}</strong><span>${escapeHtml(template.description)}</span>`;
      els.templateList.appendChild(button);
    });
  }

  function renderMoods() {
    els.moodList.innerHTML = "";
    moodPresets.forEach((mood) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `chip${state.selectedMoodIds.includes(mood.id) ? " active" : ""}`;
      button.dataset.moodId = mood.id;
      button.title = mood.description;
      button.textContent = mood.label;
      els.moodList.appendChild(button);
    });
  }

  function renderRules() {
    els.ruleList.innerHTML = "";
    ruleBlocks.forEach((rule) => {
      const label = document.createElement("label");
      label.className = "rule-item";
      label.innerHTML = `
        <input type="checkbox" data-rule-id="${escapeHtml(rule.id)}" ${state.selectedRuleIds.includes(rule.id) ? "checked" : ""} />
        <span><strong>${escapeHtml(rule.label)}</strong><span>${escapeHtml(rule.description)}</span></span>
      `;
      els.ruleList.appendChild(label);
    });
  }

  function renderFieldGroup(container, fields) {
    container.innerHTML = "";
    fields.forEach((field) => {
      const wrapper = document.createElement("div");
      const value = state.values[field.id];
      if (field.type === "checkbox") {
        wrapper.className = "field full";
        wrapper.innerHTML = `
          <label class="toggle-field">
            <input type="checkbox" data-field-id="${escapeHtml(field.id)}" ${value ? "checked" : ""} />
            <span>${escapeHtml(field.hint || field.label)}</span>
          </label>
        `;
        container.appendChild(wrapper);
        return;
      }
      wrapper.className = `field${field.type === "textarea" ? " full" : ""}`;
      const textValue = value == null ? "" : String(value);
      let inputHtml = "";
      if (field.type === "select") {
        inputHtml = `
          <select data-field-id="${escapeHtml(field.id)}">
            ${field.options.map((option) => `<option value="${escapeHtml(option)}" ${option === textValue ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}
          </select>
        `;
      } else if (field.type === "textarea") {
        inputHtml = `<textarea data-field-id="${escapeHtml(field.id)}" placeholder="${escapeHtml(field.placeholder || "")}">${escapeHtml(textValue)}</textarea>`;
      } else {
        inputHtml = `<input data-field-id="${escapeHtml(field.id)}" type="text" value="${escapeHtml(textValue)}" placeholder="${escapeHtml(field.placeholder || "")}" />`;
      }
      wrapper.innerHTML = `<label>${escapeHtml(field.label)}</label>${inputHtml}`;
      container.appendChild(wrapper);
    });
  }

  function renderFields(template) {
    renderFieldGroup(els.variableForm, template.fields);
  }

  function renderPhotoConditions(template) {
    const fields = photoConditionFields(template);
    const show = fields.length > 0;
    els.photoConditionSection.classList.toggle("hidden", !show);
    if (!show) {
      els.photoConditionForm.innerHTML = "";
      return;
    }
    renderFieldGroup(els.photoConditionForm, fields);
  }

  function renderPhotoGuide(template) {
    const guide = template.photoGuide;
    if (!guide) {
      els.photoGuide.classList.add("hidden");
      els.photoGuide.innerHTML = "";
      return;
    }
    const badges = (items, cls) =>
      (items || []).map((text) => `<span class="pg-badge ${cls}">${escapeHtml(text)}</span>`).join("");
    els.photoGuide.classList.remove("hidden");
    els.photoGuide.innerHTML = `
      <div class="pg-head">📸 어떤 사진을 넣을까요</div>
      ${guide.shot ? `<div class="pg-shot">${escapeHtml(guide.shot)}</div>` : ""}
      ${guide.must && guide.must.length ? `<div class="pg-row"><span class="pg-key">필수</span><div class="pg-badges">${badges(guide.must, "must")}</div></div>` : ""}
      ${guide.nice && guide.nice.length ? `<div class="pg-row"><span class="pg-key">권장</span><div class="pg-badges">${badges(guide.nice, "nice")}</div></div>` : ""}
      <div class="pg-tip">사진의 헤어·선글라스가 다르면 아래 <strong>내 사진 조건</strong>에서 맞추면 프롬프트가 자동으로 바뀝니다.</div>
    `;
  }

  function renderMessages() {
    const show = state.selectedTemplateId === "photo_doodle";
    els.messageEditorSection.classList.toggle("hidden", !show);
    if (!show) return;

    els.messagePresetRow.innerHTML = "";
    messagePresets.forEach((preset) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "preset-button";
      button.dataset.messagePresetId = preset.id;
      button.textContent = preset.label;
      els.messagePresetRow.appendChild(button);
    });

    els.messageList.innerHTML = "";
    if (state.messages.length === 0) {
      const empty = document.createElement("div");
      empty.className = "notice";
      empty.textContent = "문구가 없습니다. 문구 추가 버튼을 눌러 입력하세요.";
      els.messageList.appendChild(empty);
      return;
    }

    state.messages.forEach((message, index) => {
      const row = document.createElement("div");
      row.className = "message-item";
      row.dataset.messageId = message.id;
      row.innerHTML = `
        <div class="message-grid">
          <label>
            <span class="sr-only">문구</span>
            <input data-message-field="text" value="${escapeHtml(message.text)}" placeholder="문구" />
          </label>
          <label>
            <span class="sr-only">역할</span>
            <select data-message-field="role">
              ${option("title", "제목", message.role)}
              ${option("family_caption", "가족 전체 문구", message.role)}
              ${option("person_label", "인물 라벨", message.role)}
              ${option("emotion_note", "감정 메모", message.role)}
              ${option("object_label", "사물 설명", message.role)}
            </select>
          </label>
          <label>
            <span class="sr-only">추천 위치</span>
            <select data-message-field="placement">
              ${option("top_sky", "상단/하늘", message.placement)}
              ${option("left_background", "좌측 배경", message.placement)}
              ${option("right_background", "우측 배경", message.placement)}
              ${option("bottom_sand_or_table", "하단/모래/테이블", message.placement)}
              ${option("near_subject_empty_space", "인물 주변 빈 공간", message.placement)}
              ${option("auto", "자동", message.placement)}
            </select>
          </label>
        </div>
        <div class="message-options">
          <label class="toggle-row">
            <input type="checkbox" data-message-field="arrow" ${message.arrow ? "checked" : ""} />
            <span>화살표</span>
          </label>
          <label>
            <span class="sr-only">장식 강도</span>
            <select data-message-field="decorationStrength">
              ${option("none", "장식 없음", message.decorationStrength)}
              ${option("subtle", "은은하게", message.decorationStrength)}
              ${option("normal", "보통", message.decorationStrength)}
            </select>
          </label>
          <div class="message-actions">
            <button type="button" class="secondary-button compact" data-message-action="up" ${index === 0 ? "disabled" : ""}>위</button>
            <button type="button" class="secondary-button compact" data-message-action="down" ${index === state.messages.length - 1 ? "disabled" : ""}>아래</button>
            <button type="button" class="danger-button compact" data-message-action="remove">삭제</button>
          </div>
        </div>
      `;
      els.messageList.appendChild(row);
    });
  }

  function option(value, label, selected) {
    return `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(label)}</option>`;
  }

  function renderOutputMode() {
    els.modeDirect.classList.toggle("active", state.outputMode === "direct_text");
    els.modePost.classList.toggle("active", state.outputMode === "postprocess_text");
    els.outputModeHelp.textContent =
      state.outputMode === "postprocess_text"
        ? "한글 정확도를 우선한다. 모델에는 빈 공간/장식만 요청하고, 문구는 후처리 합성을 권장한다."
        : "모델이 문구를 직접 쓰도록 요청한다. 짧은 문구와 랜덤 문자 금지 규칙을 함께 넣는다.";
  }

  function renderPrompt(currentState) {
    const template = getTemplate(currentState.selectedTemplateId);
    const body = renderTemplateBody(template, currentState);
    const mood = renderMoodBlocks(currentState.selectedMoodIds);
    const rules = renderRuleBlocks(currentState.selectedRuleIds);
    const outputMode = renderOutputModeBlock(currentState.outputMode);
    const condNeg = conditionNegatives(template, currentState.values);
    const negative = currentState.includeNegative
      ? condNeg.length
        ? `${negativePrompt}, ${condNeg.join(", ")}`
        : negativePrompt
      : "";
    return compactSections([
      body,
      mood ? `선택한 분위기:\n${mood}` : "",
      rules ? `배치 및 보존 규칙:\n${rules}` : "",
      outputMode,
      negative,
    ]);
  }

  function renderTemplateBody(template, currentState) {
    const v = currentState.values;
    switch (template.id) {
      case "photo_doodle":
        return compactSections([
          `업로드한 ${v.photoContext}을 기반으로, 원본 사진의 인물 얼굴, 표정, 포즈, 배경, 조명, 주요 사물은 그대로 유지한 채 따뜻하고 귀여운 손글씨 메시지와 낙서 장식을 추가해줘.`,
          `스타일은 ${v.doodleStyle}.\n흰색 손글씨 펜으로 사진 위에 직접 꾸민 듯한 느낌.\n인물 주변에 작은 하트, 별, 점선, 왕관, 짧은 화살표, 말풍선, 작은 스마일 낙서를 자연스럽게 배치한다.\n장식 강도는 ${v.decorationLevel} 유지한다.`,
          `넣을 문구:\n${renderMessageList(currentState.messages)}`,
          "전체 분위기:\ncozy, warm, lovely, handwritten Korean doodle, emotional, cute, intimate, natural photo decoration.",
        ]);
      case "watercolor_poster":
        return compactSections([
          "업로드한 사진을 기반으로, 실제 인물의 정체성과 분위기를 유지하면서 감정이 살아있는 watercolor editorial sketch poster 스타일의 일러스트를 제작한다.",
          "중요한 목표는 단순히 예쁜 그림이 아니라, 한 장의 조용한 감정 포스터처럼 느껴지는 이미지다. 이미지는 따뜻하고, 조용하며, 사람 냄새가 나고, 저장하고 싶어지는 감정을 가져야 한다.",
          `장면 연출:\n단순 portrait가 아니라, 감정이 있는 삶의 한 장면처럼 구성한다. 원본 사진의 분위기를 기반으로 ${v.sceneMood} 느낌의 lifestyle scene으로 자연스럽게 확장한다. 원본 사진 속 요소 1-2개를 배경에 은은한 감정 디테일로 포함한다: ${v.backgroundDetail}.`,
          "핵심 스타일:\nMinimal watercolor editorial illustration. fashion sketchbook × cozy lifestyle editorial × emotional poster aesthetic. 부드러운 illustrated realism 기반. 사진과 그림 사이 어딘가의 감성. 너무 디지털 페인팅처럼 보이지 말고, 너무 완벽하게 렌더링하지 않는다.",
          "배경과 텍스처:\n밝고 미니멀한 watercolor paper background, watercolor paper grain, soft watercolor bleeding, imperfect pigment diffusion, faded brush texture, delicate ink outlines, hand-drawn irregularities, subtle sketch marks.",
          "색감:\nwarm beige, cream, soft brown, light sepia, warm gray, muted black. 저채도 warm neutral palette.",
          `타이포그래피:\n문구: "${v.quote}"\n서명: "${v.signature}"\n비율: ${v.ratio}`,
        ]);
      case "keyring":
        return compactSections([
          "Use case: product-mockup\nAsset type: ultra-realistic collectible keychain product photography\nInput image: reference for the character identity, expression, hair, outfit cues, and pose.",
          "Primary request:\nCreate an ultra-realistic product photo of a premium SD-style super-deformed chibi miniature keychain figure based on the reference character. This is a PVC vinyl / 3D printed toy, not a real person.",
          `Subject:\nOversized head, small body, simplified chibi limbs, sculpted hair, simplified facial features, visible molding seam lines, painted clothing folds, mixed glossy and matte factory finish. Preserve the reference character's recognizable face identity, expression, hair color/style, outfit colors, and pose in adorable toy form. Outfit cues: ${v.outfitCues}.`,
          `Keychain details:\nShiny gold keychain hardware. Color-coordinated ${v.strapColor} strap. Small cute motifs. Exact raised molded strap text: "${v.strapText}". The strap text must read exactly "${v.strapText}" with letters in this exact order. Use clear raised molded letters, not flat printed text.`,
          `Scene/backdrop:\nA real human hand gently pinches the keychain at the top. ${v.background} with cinematic bokeh.`,
          'Constraints:\nNo extra unrelated text. No watermark. Clearly a toy keychain. Avoid lifelike human body proportions, distorted hands, extra fingers, misspelled text, flat illustration, low-quality toy finish.',
        ]);
      case "mini_aegyo":
        return compactSections([
          "Create an image based on the uploaded adult woman. The same woman appears multiple times as mini versions in one scene. All versions must have the exact same face, identity, hairstyle, and outfit.",
          `Core Concept:\nTheme: ${v.theme}\nA warm, emotional Korean Instagram-style greeting-card image.`,
          `Composition:\nOne main adult woman, large and centered, dominant presence. Surrounding ${v.miniCount} mini versions, each 15-25% size. Clear size contrast with a miniature storytelling effect. Perspective: slightly top-down angle.`,
          `Mini woman actions:\n${linesToBullets(v.actions)}\nAll actions must feel natural, affectionate, realistic within the scene, and not random.`,
          `Text:\nMain title in Korean: "${v.title}"\nSmall handwritten captions near each mini version:\n${linesToBullets(v.captions)}\nSoft white handwritten text, cute, slightly imperfect. Do not cover faces.`,
          "Scene rules:\nUse the original photo's background and mood. Do not change the environment. Mini versions must interact naturally with the space, table, arm, shoulder, chair, and nearby objects.",
        ]);
      case "travel_poster":
        return compactSections([
          `Create a stylized premium editorial travel poster / graphic collage about ${v.country}, set in ${v.city}.`,
          `Main subject:\nA stylish international tourist visiting ${v.city}, ${v.country}, clearly presented as a traveler rather than a local resident. The tourist wears ${v.travelerStyle} and carries visible travel items such as a camera, backpack, sunglasses, folded map, and suitcase.`,
          `Scene:\nPlace the tourist in a dynamic composition surrounded by iconic elements of ${v.city} and ${v.country}: recognizable architecture, streets, landmarks, transportation, local signage, food, markets, landscapes, and cultural textures.`,
          "Style:\nBlend realistic character detail with a graphic collage background using layered paper textures, torn poster edges, sticker-like elements, halftone dots, editorial typography, bold geometric shapes, and vibrant print-poster design.",
          `Text:\nLarge readable headline: "${v.headline}"\nOptional subtext: "${v.subtext}"`,
        ]);
      case "cardboard_toddler":
        return compactSections([
          "Input:\nUploaded portrait photo of one real person.",
          `Final goal:\nTransform the real person into a tiny toddler version inside a 3x3 cardboard box room grid. The boxes form one connected tiny world with ${v.gridTheme}, warm cardboard photography aesthetic, cozy brown tones, and emotional child portrait mood.`,
          "Box rules:\nThe full composition must be a clear 3x3 square grid structure. Each cell is an independent cardboard box room. The cardboard material and boundaries must be clearly visible. Each cell should feel like a tiny room. Keep a unified world across all boxes. Warm brown and beige tone. Minimal background clutter.",
          "Character rules:\nPreserve the uploaded person's facial features, eyes, nose, mouth, and hair. Convert only into a tiny toddler version. Natural childlike proportions: slightly larger head, short chubby arms and legs, small hands and feet. Cute but not AI anime girl style. No toy-like plastic skin.",
          `Interaction rules:\nUse 2-3 subtle connected interactions only:\n${linesToBullets(v.interactions)}\nDo not make every cell interact, or the image will become too cluttered.`,
          `Handwritten memo rules:\nSmall handwritten pen doodle style. Not large typography. Small emotional memo on cardboard walls. White or cream pen feeling.\nExample wall memos:\n${linesToBullets(v.wallMemos)}`,
          "Camera and lighting:\nSoft warm studio lighting, warm amber tone, shallow depth of field, soft shadows, cinematic cozy photography, eye-level miniature camera angle, slight macro photography feeling.",
        ]);
      case "miniature":
        return compactSections([
          `${v.theme}을(를) 표현한 감성적인 3D 미니어처 인스타그램 카드뉴스 이미지를 만들어줘.`,
          `세로형 ${v.ratio} 비율. 중앙에는 귀여운 3D 미니 캐릭터가 있고, 주변에는 ${v.theme}와(과) 관련된 작은 소품들이 아기자기하게 배치되어 있다.`,
          "전체 분위기:\n따뜻하고 포근한 파스텔톤, 부드러운 조명, 미니어처 장난감 같은 질감, 감성적인 일상 기록 느낌.",
          `텍스트:\n상단에는 큰 한국어 손글씨 제목: "${v.title}"\n그 아래 짧은 부제: "${v.subtitle}"`,
          `손글씨 메모:\n이미지 곳곳에 손글씨 메모와 작은 화살표를 자연스럽게 넣어줘. 메모 문구:\n${linesToBullets(v.memos)}`,
        ]);
      case "travel_typography":
        return compactSections([
          `Input:\nReference image: uploaded person photo.\nCity / Destination: ${v.city}\nCountry: ${v.country}\nTravel date: ${v.travelDate}`,
          "Top priority — Identity preservation:\nPreserve the exact identity of the uploaded person. Maintain the same facial structure, eyes, nose, mouth, skin texture, hairstyle, and overall likeness. Do not transform the person into someone else. Avoid excessive AI beautification. The result should feel like the real person became a miniature realistic chibi character inside a travel poster.",
          "Core concept:\nCreate a premium emotional travel-log poster where miniature realistic chibi versions of the uploaded person explore giant destination typography. It should feel like premium travel branding / a high-end travel magazine cover, not a simple cartoon illustration.",
          `Typography:\nUse the destination name as massive bold centered typography: "${v.city}". The letters must be extremely large and thick. Inside the letters, mask realistic photo collage textures of ${v.city} landmarks and city scenes:\n${linesToBullets(v.landmarks)}\nThe typography itself acts as a photo mask; the city photos inside the letters must look sharp, realistic, and premium.`,
          `Mini characters:\nCreate exactly ${v.miniCount} realistic chibi / SD miniature versions of the same uploaded person (Pixar-inspired realistic chibi hybrid, collectible figure feeling). The face must clearly reflect the real uploaded person. Each character shows a different travel moment and pose (front / side / back / slight top-down, sitting on a letter, walking across a letter, pulling a suitcase, holding a camera, drinking coffee, leaning on the typography). Place them naturally on and around the giant letters with soft realistic shadows so the letters feel like a physical 3D space.`,
          `Bottom design:\nLarge handwritten-style text: "TRAVEL LOG"\nBelow it: "${v.travelDate}"\nAdd tasteful travel graphic elements: passport stamps, map route lines, compass mark, boarding pass fragments.`,
          `Style & ratio:\nPremium travel poster, cinematic travel branding, vibrant clean background, ultra clean composition, layered depth, soft realistic shadows, Instagram travel aesthetic. Vertical poster ratio ${v.ratio}.`,
          `Text accuracy:\nMain typography must read exactly "${v.city}". Bottom text must read exactly "TRAVEL LOG" and "${v.travelDate}". Avoid misspelled text, random extra words, watermark, distorted faces, and loss of identity.`,
        ]);
      case "yacht_selfie":
        return compactSections([
          "Create a photorealistic luxury lifestyle portrait in a strict vertical 9:16 aspect ratio, using the uploaded photo as the primary reference for the subject's facial identity. Preserve the same recognizable face: facial structure, face shape, jawline, cheekbones, nose, lips, smile character, and brow. The expression may become a confident, relaxed, cool yacht-selfie look, but she must stay immediately recognizable. Skin may be subtly refined to a healthy 24-year-old adult tone while keeping realistic texture. Do not replace the face or over-beautify.",
          hairClause(v.refHair, v.hairColor),
          sunglassesClause(v.sunglasses),
          `Outfit & pose:\nA ${v.topStyle}, with a delicate necklace and small round pendant. Candid selfie moment from a slight high angle, one arm implied extended holding the camera, body slightly leaning, confident gaze into the lens.`,
          "Environment:\nBright sunny ocean daylight, soft natural highlights on skin and hair, vibrant blue-turquoise sea stretching to the horizon, clear blue sky with light clouds, a wooden yacht railing on the left. Luxury yacht vacation, breezy summer, cinematic but realistic. Shot on a 35mm prime lens at f/2.8, sharp focus on the face and upper body, realistic skin texture with subtle pores, analog film grain, no digital beauty filter.",
          signatureClause(v.signature),
        ]);
      case "beach_resort":
        return compactSections([
          "A full-length fashion portrait of the woman from the uploaded photo on an energetic, playful outdoor beach resort shoot. Use the reference primarily for facial identity, likeness, and hairstyle. Make the subject and background feel captured together: match lighting direction, color temperature, exposure, depth of field, grain, and color grading, with realistic contact shadows and soft natural edge blending — one real photograph, not a composite.",
          "Identity priority:\nPreserve the exact facial identity and recognizable likeness as the highest priority. Expression may become a joyful, candid, radiant laugh with the face fully visible and unobstructed. Keep a natural, anatomically realistic head-to-body proportion; the face must not look pasted onto a different body.",
          hairClause(v.refHair, v.hairColor),
          `Pose:\n${v.motion}, with dynamic mid-motion energy, the torso twisting slightly toward the lens for an elongated statuesque silhouette and a sculpted waistline.`,
          `Fashion:\nA trendy, form-fitting ${v.swimwear}, creating a confident, glamorous resort-wear aesthetic with effortless daytime charm.`,
          "Setting:\nBright sunlit beach, dark wet-sand shoreline scattered with tiny seashells, white foam waves, a vast turquoise ocean to the horizon, soft shallow depth of field. Straight-on eye-level, medium-full distance. Aspect ratio 2:3. Ultra-realistic fashion photography, high facial fidelity, realistic skin and hair detail, natural beach color grading.",
          signatureClause(v.signature),
        ]);
      case "santorini_alley":
        return compactSections([
          "A photorealistic portrait of an elegant young Asian woman based on the uploaded photo, preserving the recognizable facial identity. Dewy skin with natural coral makeup, a soft gentle smile, making natural eye contact.",
          hairClause(v.refHair, v.hairColor),
          compactLine([
            `Wardrobe:\nA ${v.dressColor} halter-neck tiered mini dress with lace trim, a minimal gold necklace, and a black leather shoulder bag.`,
            outfitFromRefClause(v.outfitFromRef),
          ]),
          `Scenario:\n${v.scenario}.`,
          "Setting:\nA picturesque Mediterranean (Santorini-style) alleyway — rough white stucco walls, vivid cobalt-blue wooden window frames, blooming pink bougainvillea, a cobblestone path. Midday clear sun with strong direct sunlight and soft bounce light. 50mm prime lens, shallow depth of field f/1.8, soft background blur with a distant pedestrian. Vivid color contrast, ultra-detailed skin and fabric texture, 8k, highly realistic, cinematic lighting.",
        ]);
      case "hydrangea_overhead":
        return compactSections([
          "Use the uploaded portrait photo as the primary identity reference; identity preservation is the highest priority and the person must remain immediately recognizable. Preserve exactly the facial structure and proportions, eye shape, nose, lips, face contour, jawline, forehead, and cheekbones. Natural enhancement only: healthy clear skin, natural texture, soft Korean-style makeup, natural peach-pink lips.",
          `Composition:\n3:4 vertical portrait. An extra-large hydrangea cluster fills about 40-45% of the frame in a natural blend of pastel blue, lavender, lilac, blush pink, pale pink, ivory, and cream — at least three to five distinct natural colors, never a single-color look. Only about ${v.faceVisible} of the face is visible, with one cheek and part of the lower face hidden behind the flowers. She gazes upward toward the camera with a shy, elegant, slightly enchanting smile.`,
          "True bird's-eye view:\nCamera positioned directly above the subject, near-vertical overhead viewpoint. The subject lifts her face upward toward the camera with natural facial foreshortening. NOT a high-angle portrait and NOT eye-level photography.",
          `Hairstyle:\nA sophisticated Korean-inspired luxury bridal updo with soft refined texture, keeping ${hairColorPhrase(v.hairColor)}.`,
          compactLine([
            "Wardrobe:\nA luxurious flowing one-piece dress, premium couture-inspired, in soft harmony with the pastel hydrangea environment.",
            outfitFromRefClause(v.outfitFromRef),
          ]),
          "Lighting & film:\nSoft sunlight from above and around the camera, elegant volumetric light rays through the petals, delicate luminous bloom, golden-hour glow, dreamy haze, fine film grain, airy romantic atmosphere. Background: clean high-key pastel (ivory, champagne, pearl cream) kept lighter than the dress. 80mm portrait lens, shallow depth of field, luxury fashion editorial quality.",
          signatureClause(v.signature),
        ]);
      case "goddess_plaza":
        return compactSections([
          "Photorealistic vertical 3:4 lifestyle portrait of an adult Korean woman in her mid-20s, inspired by the uploaded reference and preserving the recognizable facial identity: fair glowing skin, round expressive eyes, glossy pink lips, subtle blush, refined K-idol aura.",
          hairClause(v.refHair, v.hairColor),
          "Pose:\nStanding in a sunny resort plaza, facing forward with the body angled to the right, one hand touching the hair and the other arm relaxed. A heavily fashion-edited hourglass figure with natural gravity and realistic clothing physics.",
          `Wardrobe:\nA ${v.dressStyle}, with a silver pendant and a black chain purse.`,
          "Background:\nPalm trees, yellow Mediterranean buildings with balconies, benches, bicycles, distant pedestrians, blue sky, and checkered pavement. Bright daylight with a front-left sun, defined shadows and realistic highlights. Sharp 35mm photo, shallow depth of field, detailed fabric texture, a calm confident summer mood, 8k. No text, no anime, no plastic skin.",
        ]);
      default:
        return "";
    }
  }

  function renderMessageList(messages) {
    if (!messages.length) return "- 문구 없음";
    return messages
      .filter((message) => message.text.trim())
      .map((message) => {
        const arrow = message.arrow ? "화살표 연결 필요" : "화살표 없음";
        return `- "${message.text}" (${labelForRole(message.role)}, ${labelForPlacement(message.placement)}, ${arrow}, 장식: ${labelForDecoration(message.decorationStrength)})`;
      })
      .join("\n");
  }

  function renderMoodBlocks(ids) {
    return ids
      .map((id) => moodPresets.find((mood) => mood.id === id))
      .filter(Boolean)
      .map((mood) => `- ${mood.label}: ${mood.promptBlock}`)
      .join("\n");
  }

  function renderRuleBlocks(ids) {
    return ids
      .map((id) => ruleBlocks.find((rule) => rule.id === id))
      .filter(Boolean)
      .map((rule) => `- ${rule.label}: ${rule.promptBlock}`)
      .join("\n");
  }

  function renderOutputModeBlock(mode) {
    if (mode === "postprocess_text") {
      return '텍스트 처리:\n한글 문구는 이미지 생성 모델이 직접 쓰지 말고, 텍스트를 넣을 수 있는 빈 공간만 남긴다. 최종 문구는 후처리로 정확히 합성한다. 필요한 경우 "Do not generate readable text, letters, captions, or signatures inside the image" 규칙을 사용한다.';
    }
    return "텍스트 처리:\n한글 문구는 정확히 읽을 수 있게 작성한다. 랜덤 문자, 깨진 한글, 부자연스러운 타이포그래피를 만들지 않는다.";
  }

  function compactSections(sections) {
    return sections
      .map((section) => String(section || "").trim())
      .filter(Boolean)
      .join("\n\n");
  }

  function compactLine(parts) {
    return parts
      .map((part) => String(part || "").trim())
      .filter(Boolean)
      .join(" ");
  }

  function linesToBullets(text) {
    return String(text || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => `- ${line}`)
      .join("\n");
  }

  // ── 사진 조건 → 프롬프트 문구 변환 ──
  function hairColorPhrase(hairColor) {
    switch (hairColor) {
      case "흑발":
        return "jet-black hair color";
      case "갈색":
        return "brown hair color";
      case "밝은 갈색":
        return "light-brown hair color";
      default:
        return "the original hair color from the reference photo";
    }
  }

  function hairTypePhrase(refHair) {
    switch (refHair) {
      case "긴 웨이브":
        return "long wavy hair";
      case "단발/숏컷":
        return "short hair (bob or pixie cut) matching the reference fringe";
      case "묶은 머리/업두":
        return "neatly tied-up hair / updo";
      default:
        return "long straight hair";
    }
  }

  function hairClause(refHair, hairColor) {
    return `Hairstyle: preserve the subject's hairstyle as ${hairTypePhrase(refHair)}, keeping ${hairColorPhrase(hairColor)}. Keep it consistent with the reference identity and do not transform it into a different hairstyle.`;
  }

  function sunglassesClause(sunglasses) {
    switch (sunglasses) {
      case "반사 선글라스 착용":
        return "Eyewear: she wears tasteful reflective mirrored sunglasses with subtle lens reflections; the recognizable facial structure, face shape, and hairstyle must remain clear.";
      case "살짝 내린 선글라스":
        return "Eyewear: she wears reflective sunglasses slightly lowered down the nose so the eyes and identity stay clearly visible.";
      default:
        return "Eyewear: no sunglasses. The face and eyes are clearly visible and completely unobstructed.";
    }
  }

  function signatureClause(signature) {
    const text = String(signature || "").trim();
    if (!text) return "";
    return `Signature: add a small, subtle, elegant cursive handwritten signature overlay reading "${text}" in a bottom corner. Keep it small, refined, clearly readable, and not dominant.`;
  }

  function outfitFromRefClause(flag) {
    return flag
      ? "Use the clothing colors from the reference photo as the primary palette for the outfit design."
      : "";
  }

  function conditionNegatives(template, values) {
    const ids = template.photoConditionIds || [];
    const negatives = [];
    if (ids.includes("refHair")) {
      if (values.refHair === "단발/숏컷") {
        negatives.push("long hair", "long dark hair", "ponytail", "wavy long hair");
      } else if (values.refHair === "묶은 머리/업두") {
        negatives.push("loose hanging hair", "messy untied hair");
      } else {
        negatives.push("short hair", "bob cut", "pixie cut");
      }
    }
    if (ids.includes("sunglasses")) {
      if (values.sunglasses === "없음(맨얼굴)") {
        negatives.push("sunglasses", "sunglasses covering face");
      } else {
        negatives.push("sunglasses hiding the entire face", "sunglasses erasing identity");
      }
    }
    return negatives;
  }

  function labelForRole(role) {
    return {
      title: "제목",
      family_caption: "가족 전체 문구",
      person_label: "인물 라벨",
      emotion_note: "감정 메모",
      object_label: "사물 설명",
    }[role] || role;
  }

  function labelForPlacement(placement) {
    return {
      top_sky: "상단/하늘",
      left_background: "좌측 배경",
      right_background: "우측 배경",
      bottom_sand_or_table: "하단/모래/테이블",
      near_subject_empty_space: "인물 주변 빈 공간",
      auto: "자동",
    }[placement] || placement;
  }

  function labelForDecoration(value) {
    return {
      none: "없음",
      subtle: "은은하게",
      normal: "보통",
    }[value] || value;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  els.templateList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-template-id]");
    if (!button) return;
    const nextTemplate = getTemplate(button.dataset.templateId);
    setState(defaultState(nextTemplate.id));
    setStatus(`${nextTemplate.name} 템플릿을 불러왔습니다.`);
  });

  els.moodList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-mood-id]");
    if (!button) return;
    const id = button.dataset.moodId;
    const selectedMoodIds = toggleValue(state.selectedMoodIds, id);
    setState({ ...state, selectedMoodIds });
  });

  els.ruleList.addEventListener("change", (event) => {
    const input = event.target.closest("[data-rule-id]");
    if (!input) return;
    const id = input.dataset.ruleId;
    const selectedRuleIds = input.checked
      ? Array.from(new Set([...state.selectedRuleIds, id]))
      : state.selectedRuleIds.filter((ruleId) => ruleId !== id);
    setState({ ...state, selectedRuleIds });
  });

  els.variableForm.addEventListener("input", updateField);
  els.variableForm.addEventListener("change", updateField);
  els.photoConditionForm.addEventListener("input", updateField);
  els.photoConditionForm.addEventListener("change", updateField);

  function updateField(event) {
    const input = event.target.closest("[data-field-id]");
    if (!input) return;
    const value = input.type === "checkbox" ? input.checked : input.value;
    setState({
      ...state,
      values: {
        ...state.values,
        [input.dataset.fieldId]: value,
      },
    });
  }

  els.messagePresetRow.addEventListener("click", (event) => {
    const button = event.target.closest("[data-message-preset-id]");
    if (!button) return;
    const preset = messagePresets.find((entry) => entry.id === button.dataset.messagePresetId);
    if (!preset) return;
    setState({ ...state, messages: preset.messages.map(cloneMessage) });
    setStatus(`${preset.label} 문구 프리셋을 적용했습니다.`);
  });

  els.addMessageButton.addEventListener("click", () => {
    setState({
      ...state,
      messages: [...state.messages, item("새 문구", "emotion_note", "auto", false, "subtle")],
    });
  });

  els.messageList.addEventListener("input", updateMessageField);
  els.messageList.addEventListener("change", updateMessageField);
  els.messageList.addEventListener("click", handleMessageAction);

  function updateMessageField(event) {
    const input = event.target.closest("[data-message-field]");
    const row = event.target.closest("[data-message-id]");
    if (!input || !row) return;
    const field = input.dataset.messageField;
    const messages = state.messages.map((message) => {
      if (message.id !== row.dataset.messageId) return message;
      return {
        ...message,
        [field]: input.type === "checkbox" ? input.checked : input.value,
      };
    });
    setState({ ...state, messages });
  }

  function handleMessageAction(event) {
    const button = event.target.closest("[data-message-action]");
    const row = event.target.closest("[data-message-id]");
    if (!button || !row) return;
    const index = state.messages.findIndex((message) => message.id === row.dataset.messageId);
    if (index < 0) return;
    const messages = [...state.messages];
    const action = button.dataset.messageAction;
    if (action === "remove") {
      messages.splice(index, 1);
    } else if (action === "up" && index > 0) {
      [messages[index - 1], messages[index]] = [messages[index], messages[index - 1]];
    } else if (action === "down" && index < messages.length - 1) {
      [messages[index + 1], messages[index]] = [messages[index], messages[index + 1]];
    }
    setState({ ...state, messages });
  }

  document.querySelectorAll("[data-output-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      setState({ ...state, outputMode: button.dataset.outputMode });
    });
  });

  els.includeNegative.addEventListener("change", () => {
    setState({ ...state, includeNegative: els.includeNegative.checked });
  });

  els.resetButton.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    state = defaultState("photo_doodle");
    render();
    setStatus("초기화했습니다.");
  });

  els.copyButton.addEventListener("click", copyPrompt);
  els.copyTopButton.addEventListener("click", copyPrompt);

  async function copyPrompt() {
    const text = els.promptPreview.value;
    try {
      await navigator.clipboard.writeText(text);
      setStatus("프롬프트를 clipboard에 복사했습니다.");
    } catch {
      els.promptPreview.focus();
      els.promptPreview.select();
      try {
        const copied = document.execCommand("copy");
        setStatus(copied ? "프롬프트를 clipboard에 복사했습니다." : "자동 복사에 실패했습니다. 선택된 텍스트를 Ctrl+C로 복사하세요.");
      } catch {
        setStatus("자동 복사에 실패했습니다. 선택된 텍스트를 Ctrl+C로 복사하세요.");
      }
    }
  }

  function setStatus(message) {
    els.statusLine.textContent = message;
    window.clearTimeout(setStatus.timer);
    setStatus.timer = window.setTimeout(() => {
      els.statusLine.textContent = "";
    }, 3000);
  }

  function toggleValue(values, value) {
    return values.includes(value) ? values.filter((entry) => entry !== value) : [...values, value];
  }

  render();
})();
