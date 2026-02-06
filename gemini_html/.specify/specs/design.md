# overview
- 이 스펙은 UI/UX pro max skill을 사용하여 **프리미엄 디자인**을 적용할때 사용됩니다. 
- 모든 해시 디렉토리는 **현대적이고 세련된 디자인**을 가져야 합니다.

# design concept
- 각 디렉토리 별로 **고유한 프리미엄 테마**를 적용합니다
- **Glassmorphism, 그라디언트, 부드러운 애니메이션** 등 현대적 UI 요소 사용
- title에는 주제에 적절한 **SVG 아이콘** 사용 (이모지 금지)
- 모든 인터랙티브 요소에 **호버 효과** 및 **트랜지션** 적용

## 공통 디자인 요구사항
- **레이아웃**: 카드 그리드 (반응형)
- **카드 스타일**: Glassmorphism 또는 그라디언트 배경
- **호버 효과**: transform, shadow, glow 효과
- **애니메이션**: fade-in, slide-up 등 부드러운 진입 애니메이션
- **타이포그래피**: Google Fonts (Inter, Poppins 등 모던 폰트)
- **아이콘**: Heroicons 또는 Lucide Icons (SVG)

## 참고 (해시 디렉토리의 index.html을 수정해야함)
- 02_work → BF7K2M9/index.html (Dark Premium Theme)
- 01_rnd → AED13WE/index.html (Professional Blue Theme)
- 03_travel → C8PQ4X1/index.html (Vibrant Pastel Green Theme)
- 04_AI_Study → QT38XYX/index.html (Clean Pastel Blue Theme)
- 05_Private → RU4TYZ1/index.html (Soft Pastel Pink Theme)
- 06_VNTG_AI_STUDY → VNTG7S2/index.html (Corporate Green Glassmorphism Theme)

## index (메인 포털)
- product type : landing page, portal gate 
- style : **premium**, minimalism, professional
- industry : document
- stack : html-tailwind (SPA)
- color theme : zen
- **특별 요구사항**: 
  - 그라디언트 배경
  - Glassmorphic 네비게이션
  - 부드러운 카드 호버 효과

## 01_rnd (R&D - 연구개발)
- product type : premium card gallery
- style : **modern**, professional, **tech-forward**
- industry : IT, technology, innovation
- stack : html-tailwind (SPA)
- color theme : **professional blue** (Blue 500-700 range)
- **특별 요구사항**:
  - 깔끔한 블루 그라디언트 배경
  - 카드: 흰색 배경 + 블루 액센트 + 호버 시 그림자 증가
  - 타이포그래피: Inter Bold for titles
  - 아이콘: Heroicons (microscope, beaker, chip 등)

## 02_work (업무 - 프로페셔널)
- product type : premium card gallery
- style : **dark premium**, professional, **corporate**
- industry : IT, management, business
- stack : html-tailwind (SPA)
- color theme : **dark professional** (Slate 900-700)
- **특별 요구사항**:
  - 다크 그라디언트 배경 (Slate 900 → Slate 800)
  - 카드: Glassmorphism (반투명 + backdrop-blur)
  - 블루 액센트 (Blue 400-500)
  - 호버 시 glow 효과
  - 타이포그래피: Inter SemiBold
  - 아이콘: Heroicons (briefcase, chart, document)

## 03_travel (여행 - 생동감)
- product type : vibrant card gallery
- style : **playful**, casual, **colorful**, cute
- industry : travel, lifestyle
- stack : html-tailwind (SPA)
- color theme : **vibrant pastel green** (Emerald 200-400)
- **특별 요구사항**:
  - 밝은 그라디언트 배경 (Green 100 → Emerald 200)
  - 카드: 흰색 + 그린 액센트 + 호버 시 lift-up
  - 둥근 모서리 (rounded-2xl)
  - 활기찬 애니메이션
  - 타이포그래피: Poppins (playful)
  - 아이콘: Heroicons (map, camera, plane)

## 04_AI_study (AI 학습 - 깔끔함)
- product type : clean card gallery
- style : **modern**, minimalism, **zen**, academic
- industry : AI, education, research
- stack : html-tailwind (SPA)
- color theme : **clean pastel blue** (Blue 100-300)
- **특별 요구사항**:
  - 밝은 블루 그라디언트 배경 (Blue 50 → Blue 100)
  - 카드: 흰색 + 미묘한 그림자 + 블루 테두리
  - 최소한의 장식, 깔끔한 레이아웃
  - 타이포그래피: Inter (clean, readable)
  - 아이콘: Heroicons (academic-cap, sparkles, cpu)

## 05_private (개인 - 부드러움)
- product type : soft card gallery
- style : **gentle**, minimalism, **soft**, zen
- industry : personal, private
- stack : html-tailwind (SPA)
- color theme : **soft pastel pink** (Pink 100-300)
- **특별 요구사항**:
  - 부드러운 핑크 그라디언트 배경 (Pink 50 → Pink 100)
  - 카드: 흰색 + 핑크 액센트 + 부드러운 그림자
  - 둥근 모서리, 부드러운 전환
  - 타이포그래피: Inter Light
  - 아이콘: Heroicons (lock, heart, star)

## 06_VNTG_AI_STUDY (VNTG - 기업용 프리미엄)
- product type : corporate premium card gallery
- style : **glassmorphism**, modern, **corporate premium**
- industry : company, enterprise, AI, DX
- stack : html-tailwind (SPA)
- color theme : **corporate green glassmorphism** (Emerald 600-900)
- **특별 요구사항**:
  - 다크 그린 그라디언트 배경 (Emerald 900 → Emerald 700)
  - 카드: **강한 Glassmorphism** (투명 + backdrop-blur-xl + 밝은 테두리)
  - 밝은 텍스트 (Emerald 50-100)
  - 호버 시 glow + lift 효과
  - 타이포그래피: Inter Bold
  - 아이콘: Heroicons (lightning-bolt, cube, rocket)

## 새로운 디렉토리
- 새로운 디렉토리가 생기면 디렉토리 이름과 연관된 **프리미엄 테마**를 적용합니다
- ui-ux-pro-max 스킬로 디자인 시스템을 생성하여 적용합니다