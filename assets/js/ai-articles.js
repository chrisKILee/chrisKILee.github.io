// AI Tech Feed - 데이터 파일
// 아이템 삭제: 해당 객체를 배열에서 제거 후 git commit

const AI_ARTICLES = [
  // ── Claude 새소식 ──────────────────────────────────────────────────
  {
    id: "claude-001",
    category: "claude",
    title: "Claude 3.7 Sonnet 출시 — 하이브리드 추론으로 코딩·수학 혁신",
    date: "2025-02-24",
    summary: "확장 사고(Extended Thinking) 모드로 복잡한 문제를 단계별로 추론, SWE-bench 62.3% 달성",
    originalUrl: "https://www.anthropic.com/news/claude-3-7-sonnet",
    detail: {
      overview: "Anthropic이 출시한 Claude 3.7 Sonnet은 '하이브리드 추론' 방식을 도입하여 즉답 모드와 깊은 사고 모드를 상황에 따라 전환한다. 소프트웨어 엔지니어링 벤치마크(SWE-bench Verified)에서 62.3%를 기록하며 당시 최고 성능을 달성했다.",
      keyPoints: [
        { label: "핵심 기능", value: "Extended Thinking — 내부 추론 과정을 토큰으로 소비하며 복잡 문제 해결" },
        { label: "SWE-bench", value: "62.3% (이전 Claude 3.5 Sonnet 대비 +13%p)" },
        { label: "강점 영역", value: "코딩, 수학, 멀티스텝 추론" },
        { label: "API 제공", value: "thinking 파라미터로 사고 예산(token budget) 조절 가능" },
        { label: "비용", value: "입력 $3 / 출력 $15 per MTok (사고 토큰 별도)" }
      ],
      comparison: [
        { model: "Claude 3.7 Sonnet", sweBench: "62.3%", coding: "최상", reasoning: "하이브리드" },
        { model: "Claude 3.5 Sonnet", sweBench: "49.0%", coding: "상", reasoning: "표준" },
        { model: "GPT-4o", sweBench: "38.0%", coding: "상", reasoning: "표준" }
      ],
      timeline: [
        { date: "2025-02-24", event: "Claude 3.7 Sonnet 공개 발표" },
        { date: "2025-02-25", event: "API 및 Claude.ai 서비스 적용" },
        { date: "2025-03-01", event: "Claude Code에 기본 모델로 탑재" }
      ]
    }
  },
  {
    id: "claude-002",
    category: "claude",
    title: "Claude Code GA — 터미널에서 동작하는 AI 코딩 에이전트",
    date: "2025-02-25",
    summary: "전체 코드베이스를 이해하고 자율적으로 코드 작성·수정·테스트를 수행하는 CLI 에이전트 정식 출시",
    originalUrl: "https://www.anthropic.com/news/claude-code",
    detail: {
      overview: "Claude Code는 터미널에서 실행되는 AI 코딩 에이전트로, 코드베이스 전체를 맥락으로 이해하고 파일 생성·편집·테스트 실행·Git 조작 등을 자율적으로 수행한다. 단순 코드 제안이 아닌 실제 작업 완료(agentic execution)를 목표로 한다.",
      keyPoints: [
        { label: "핵심 차별점", value: "전체 레포지토리를 컨텍스트로 활용, 파일 간 의존성 자동 파악" },
        { label: "지원 기능", value: "파일 읽기/쓰기, Shell 명령 실행, Git 조작, 웹 검색" },
        { label: "MCP 지원", value: "외부 도구·DB·API를 에이전트에 연결 가능" },
        { label: "설치", value: "npm install -g @anthropic-ai/claude-code" },
        { label: "과금", value: "API 토큰 소비 기반 (Anthropic API 키 필요)" }
      ],
      comparison: [
        { tool: "Claude Code", mode: "CLI 에이전트", context: "전체 레포", autonomy: "높음" },
        { tool: "GitHub Copilot", mode: "IDE 플러그인", context: "현재 파일", autonomy: "낮음" },
        { tool: "Cursor", mode: "AI IDE", context: "프로젝트", autonomy: "중간" },
        { tool: "Devin", mode: "풀 에이전트", context: "전체", autonomy: "최고" }
      ],
      timeline: [
        { date: "2025-02-25", event: "Claude Code 베타 → GA 전환" },
        { date: "2025-03-10", event: "MCP 서버 마켓플레이스 연동" },
        { date: "2025-04-01", event: "VS Code Extension 출시" }
      ]
    }
  },
  {
    id: "claude-003",
    category: "claude",
    title: "Claude for Work — 팀 협업·프로젝트 기능 대폭 강화",
    date: "2025-05-15",
    summary: "Projects 기능으로 팀 단위 AI 지식 베이스 구성, 공유 컨텍스트와 커스텀 지침 지원",
    originalUrl: "https://www.anthropic.com/news/claude-for-work",
    detail: {
      overview: "Anthropic은 기업 고객을 위한 'Claude for Work' 기능 세트를 강화했다. Projects 기능을 통해 팀이 공유하는 문서·지침·대화 기록을 하나의 컨텍스트로 묶어 일관된 AI 어시스턴트 경험을 제공한다.",
      keyPoints: [
        { label: "Projects", value: "팀 공유 컨텍스트 — 문서, 지침, 이전 대화를 하나의 프로젝트로 관리" },
        { label: "커스텀 지침", value: "시스템 프롬프트 수준의 팀 행동 규칙 설정 가능" },
        { label: "권한 관리", value: "멤버별 열람/편집 권한 차등 부여" },
        { label: "SSO 지원", value: "Okta, Azure AD 등 기업 SSO 통합" },
        { label: "감사 로그", value: "팀 사용 현황 모니터링 및 규정 준수 지원" }
      ],
      comparison: [
        { feature: "공유 컨텍스트", claude: "O (Projects)", chatgpt: "O (Team GPT)", gemini: "O (Workspace)" },
        { feature: "커스텀 지침", claude: "O", chatgpt: "O", gemini: "제한적" },
        { feature: "API 통합", claude: "O", chatgpt: "O", gemini: "O" },
        { feature: "온프레미스", claude: "준비중", chatgpt: "Azure", gemini: "GCP" }
      ],
      timeline: [
        { date: "2025-04-01", event: "Projects 기능 베타 출시" },
        { date: "2025-05-15", event: "Team·Enterprise 플랜 전체 적용" },
        { date: "2025-06-01", event: "SSO 연동 정식 지원" }
      ]
    }
  },

  // ── Gemini 새소식 ──────────────────────────────────────────────────
  {
    id: "gemini-001",
    category: "gemini",
    title: "Gemini 2.0 Flash — 실시간 멀티모달 AI의 새 기준",
    date: "2025-02-05",
    summary: "텍스트·이미지·음성·영상을 실시간으로 처리, Gemini 1.5 Pro 수준 성능에 5배 빠른 속도",
    originalUrl: "https://blog.google/technology/google-deepmind/gemini-model-updates-february-2025/",
    detail: {
      overview: "Google DeepMind의 Gemini 2.0 Flash는 속도와 성능의 균형을 최적화한 모델로, 실시간 대화·이미지 분석·코드 생성에서 탁월한 효율을 보인다. Live API를 통해 영상 스트리밍 실시간 분석도 가능하다.",
      keyPoints: [
        { label: "속도", value: "Gemini 1.5 Pro 대비 2배 빠른 출력 속도" },
        { label: "멀티모달", value: "텍스트·이미지·오디오·비디오 동시 입력 처리" },
        { label: "컨텍스트", value: "1M 토큰 (약 750만 단어) 지원" },
        { label: "가격", value: "입력 $0.075 / 출력 $0.30 per MTok (최저가 수준)" },
        { label: "Live API", value: "실시간 영상 스트림 분석 및 대화 가능" }
      ],
      comparison: [
        { model: "Gemini 2.0 Flash", speed: "초고속", context: "1M", price: "최저" },
        { model: "Gemini 1.5 Pro", speed: "고속", context: "1M", price: "중간" },
        { model: "GPT-4o Mini", speed: "초고속", context: "128K", price: "저가" },
        { model: "Claude 3.5 Haiku", speed: "초고속", context: "200K", price: "저가" }
      ],
      timeline: [
        { date: "2024-12-11", event: "Gemini 2.0 Flash 실험적 공개" },
        { date: "2025-02-05", event: "Gemini 2.0 Flash GA 및 API 일반 제공" },
        { date: "2025-03-01", event: "Google AI Studio 무료 제공 시작" }
      ]
    }
  },
  {
    id: "gemini-002",
    category: "gemini",
    title: "Gemini 2.5 Pro — 추론 특화 세계 최고 수준 AI",
    date: "2025-03-25",
    summary: "복잡한 수학·과학·코딩 추론에서 GPT-4o·Claude 3.7을 상회, Chatbot Arena 1위 달성",
    originalUrl: "https://blog.google/technology/google-deepmind/gemini-2-5-pro-latest/",
    detail: {
      overview: "Gemini 2.5 Pro는 Google의 최고 성능 추론 모델로, 내부 사고 과정을 거쳐 복잡한 문제를 해결하는 'Thinking' 기능을 탑재했다. Chatbot Arena 리더보드에서 역대 최고점을 기록하며 GPT-4o와 Claude를 앞섰다.",
      keyPoints: [
        { label: "Thinking", value: "내부 추론 단계를 거쳐 정확도 대폭 향상" },
        { label: "AIME 2025", value: "수학 올림피아드 문제 92.0% 해결" },
        { label: "코딩", value: "LiveCodeBench 70.4% (당시 최고)" },
        { label: "컨텍스트", value: "1M 토큰 (업계 최대급)" },
        { label: "Chatbot Arena", value: "ELO 1400+ 기록, 1위 달성" }
      ],
      comparison: [
        { benchmark: "AIME 2025", gemini25Pro: "92.0%", claude37: "80.0%", gpt4o: "9.3%" },
        { benchmark: "MATH-500", gemini25Pro: "97.0%", claude37: "96.2%", gpt4o: "94.8%" },
        { benchmark: "LiveCodeBench", gemini25Pro: "70.4%", claude37: "62.3%", gpt4o: "53.7%" }
      ],
      timeline: [
        { date: "2025-03-25", event: "Gemini 2.5 Pro 실험적 버전 공개" },
        { date: "2025-04-10", event: "Google AI Studio에서 무료 접근 가능" },
        { date: "2025-05-01", event: "Vertex AI API 상용화" }
      ]
    }
  },
  {
    id: "gemini-003",
    category: "gemini",
    title: "NotebookLM Plus — 기업용 AI 리서치 어시스턴트",
    date: "2025-01-15",
    summary: "문서를 업로드하면 AI가 요약·질의응답·팟캐스트 생성, 기업용 고급 플랜 출시",
    originalUrl: "https://blog.google/technology/ai/notebooklm-plus/",
    detail: {
      overview: "Google NotebookLM은 업로드한 문서를 기반으로 AI가 요약·분석·Q&A를 수행하는 개인 리서치 도구다. NotebookLM Plus(유료 플랜)는 더 많은 소스, 팀 공유, 고급 오디오 기능을 제공한다.",
      keyPoints: [
        { label: "소스 지원", value: "PDF, Google Docs/Slides, YouTube 영상, 웹페이지, 음성 파일" },
        { label: "오디오 오버뷰", value: "문서 내용을 2인 팟캐스트 형식으로 자동 생성" },
        { label: "Plus 플랜", value: "소스 300개, 공유 노트북, 고급 분석, $19.99/월" },
        { label: "사용 사례", value: "리서치 요약, 회의록 분석, 학습 자료 정리" },
        { label: "개인정보", value: "업로드 문서는 모델 학습에 사용되지 않음" }
      ],
      comparison: [
        { feature: "문서 소스 수", free: "50개", plus: "300개" },
        { feature: "노트북 공유", free: "X", plus: "O" },
        { feature: "오디오 생성", free: "O", plus: "고급 O" },
        { feature: "월 비용", free: "무료", plus: "$19.99" }
      ],
      timeline: [
        { date: "2024-09-01", event: "NotebookLM 오디오 오버뷰 기능 출시" },
        { date: "2025-01-15", event: "NotebookLM Plus 유료 플랜 출시" },
        { date: "2025-03-01", event: "기업(Enterprise) 플랜 추가" }
      ]
    }
  },

  // ── Codex 새소식 ──────────────────────────────────────────────────
  {
    id: "codex-001",
    category: "codex",
    title: "OpenAI Codex CLI — 터미널 기반 경량 코딩 에이전트",
    date: "2025-04-16",
    summary: "오픈소스 CLI 에이전트, 로컬 코드베이스에서 자율 코딩·테스트·디버깅 수행",
    originalUrl: "https://openai.com/index/introducing-codex/",
    detail: {
      overview: "OpenAI Codex CLI는 터미널에서 실행되는 경량 코딩 에이전트로 오픈소스로 공개됐다. 로컬 파일 시스템에 접근하여 코드 작성, 테스트 실행, 디버깅을 자율적으로 수행하며 Claude Code와 유사한 포지셔닝을 가진다.",
      keyPoints: [
        { label: "오픈소스", value: "GitHub 공개, Apache 2.0 라이선스" },
        { label: "지원 모델", value: "o4-mini (기본), o3, GPT-4.1 선택 가능" },
        { label: "샌드박스", value: "Docker 기반 격리 실행으로 안전성 보장" },
        { label: "설치", value: "npm install -g @openai/codex" },
        { label: "승인 모드", value: "Full-auto / Semi-auto / Manual 세 가지 자율성 수준" }
      ],
      comparison: [
        { tool: "Codex CLI", vendor: "OpenAI", license: "오픈소스", model: "o4-mini" },
        { tool: "Claude Code", vendor: "Anthropic", license: "상용", model: "Claude 3.7+" },
        { tool: "Gemini CLI", vendor: "Google", license: "오픈소스", model: "Gemini 2.5" },
        { tool: "Aider", vendor: "커뮤니티", license: "오픈소스", model: "다중 지원" }
      ],
      timeline: [
        { date: "2025-04-16", event: "Codex CLI 오픈소스 공개 및 발표" },
        { date: "2025-04-20", event: "GitHub Stars 10K 돌파" },
        { date: "2025-05-01", event: "ChatGPT Plus·Pro 사용자 무료 제공" }
      ]
    }
  },
  {
    id: "codex-002",
    category: "codex",
    title: "GPT-4.1 — 코딩 특화 장문 컨텍스트 모델",
    date: "2025-04-14",
    summary: "1M 토큰 컨텍스트 지원, SWE-bench 54.6% 달성, GPT-4o 대비 저렴한 코딩 전문 모델",
    originalUrl: "https://openai.com/index/gpt-4-1/",
    detail: {
      overview: "GPT-4.1은 OpenAI가 개발자를 위해 특화한 코딩·지시 수행 모델로, 1M 토큰 컨텍스트로 대규모 코드베이스를 한 번에 처리할 수 있다. GPT-4o 대비 가격도 낮아 실용적 선택지가 됐다.",
      keyPoints: [
        { label: "컨텍스트", value: "1M 입력 / 32K 출력 토큰" },
        { label: "SWE-bench", value: "54.6% (GPT-4o 38% 대비 크게 향상)" },
        { label: "가격", value: "입력 $2.00 / 출력 $8.00 per MTok" },
        { label: "코딩 강점", value: "지시 정확도 향상, 불필요한 변경 최소화" },
        { label: "Mini 버전", value: "GPT-4.1 mini — 입력 $0.40 / 출력 $1.60" }
      ],
      comparison: [
        { model: "GPT-4.1", context: "1M", sweBench: "54.6%", inputPrice: "$2.00" },
        { model: "GPT-4o", context: "128K", sweBench: "38.0%", inputPrice: "$2.50" },
        { model: "GPT-4.1 mini", context: "1M", sweBench: "45.0%", inputPrice: "$0.40" },
        { model: "Claude 3.7", context: "200K", sweBench: "62.3%", inputPrice: "$3.00" }
      ],
      timeline: [
        { date: "2025-04-14", event: "GPT-4.1 / 4.1 mini / 4.1 nano API 출시" },
        { date: "2025-04-20", event: "ChatGPT 앱 적용 시작" },
        { date: "2025-05-01", event: "Azure OpenAI Service 제공 시작" }
      ]
    }
  },
  {
    id: "codex-003",
    category: "codex",
    title: "o3·o4-mini — 최고 수준 수학·과학 추론 모델",
    date: "2025-04-16",
    summary: "ARC-AGI-1 75.7% 달성, 비용·성능 균형의 o4-mini와 최고 성능 o3 동시 출시",
    originalUrl: "https://openai.com/index/introducing-o3-and-o4-mini/",
    detail: {
      overview: "OpenAI의 o3와 o4-mini는 내부 사고 과정을 거쳐 복잡한 추론을 수행하는 'Reasoning' 시리즈다. o3는 AGI 수준 벤치마크를 경신했으며, o4-mini는 수학·코딩에서 o3에 근접한 성능을 훨씬 낮은 비용에 제공한다.",
      keyPoints: [
        { label: "ARC-AGI-1", value: "o3 고성능 모드 75.7% (인간 수준 접근)" },
        { label: "AIME 2025", value: "o3 96.7%, o4-mini 97.9% (o4-mini가 o3 상회)" },
        { label: "비용 비교", value: "o4-mini 입력 $1.1 / o3 입력 $10 (10배 차이)" },
        { label: "Vision", value: "o4-mini 이미지 분석 지원 (o3 기본 지원)" },
        { label: "도구 사용", value: "웹 검색, 코드 실행, 이미지 분석 통합" }
      ],
      comparison: [
        { model: "o3", aime: "96.7%", arcAgi: "75.7%", inputPrice: "$10.00", best4: "복잡 추론" },
        { model: "o4-mini", aime: "97.9%", arcAgi: "67.0%", inputPrice: "$1.10", best4: "수학/코딩" },
        { model: "o1", aime: "74.4%", arcAgi: "32.0%", inputPrice: "$15.00", best4: "이전 세대" },
        { model: "Gemini 2.5 Pro", aime: "92.0%", arcAgi: "—", inputPrice: "$3.50", best4: "멀티모달" }
      ],
      timeline: [
        { date: "2025-04-16", event: "o3·o4-mini API 동시 공개" },
        { date: "2025-04-17", event: "ChatGPT Plus·Pro 사용자 접근 허용" },
        { date: "2025-05-05", event: "o3 가격 80% 인하 (초기 대비)" }
      ]
    }
  },

  // ── AI 활용 사례 ──────────────────────────────────────────────────
  {
    id: "usecase-001",
    category: "usecase",
    title: "Cursor — 개발자 1,000만 명이 선택한 AI 네이티브 코드 에디터",
    date: "2025-03-01",
    summary: "VS Code 기반 AI 에디터로 전체 코드베이스 이해 후 자동완성·리팩토링·버그 수정 수행",
    originalUrl: "https://cursor.com",
    detail: {
      overview: "Cursor는 VS Code를 포크하여 AI 기능을 깊게 통합한 코드 에디터다. Tab 자동완성, Cmd+K 인라인 편집, Composer 에이전트 모드 등 다양한 AI 인터페이스를 제공하며, 2025년 초 월간 사용자 1,000만 명을 돌파했다.",
      keyPoints: [
        { label: "Tab 자동완성", value: "다음 코드 블록 예측, 멀티라인 자동완성" },
        { label: "Composer", value: "여러 파일에 걸친 대규모 변경을 에이전트가 수행" },
        { label: "지원 모델", value: "Claude 3.7 Sonnet, GPT-4o, Gemini 2.5 Pro 선택" },
        { label: ".cursorrules", value: "프로젝트별 AI 행동 규칙 커스터마이징" },
        { label: "가격", value: "Free (2,000 완성) / Pro $20/월 / Business $40/월" }
      ],
      comparison: [
        { tool: "Cursor", base: "VS Code 포크", aiDepth: "최고", price: "$20/월", users: "1,000만+" },
        { tool: "GitHub Copilot", base: "IDE 플러그인", aiDepth: "높음", price: "$10/월", users: "1,500만+" },
        { tool: "Windsurf", base: "VS Code 포크", aiDepth: "높음", price: "$15/월", users: "성장중" },
        { tool: "Claude Code", base: "CLI", aiDepth: "높음", price: "API 종량", users: "성장중" }
      ],
      timeline: [
        { date: "2023-03-01", event: "Cursor 최초 공개 (0.1버전)" },
        { date: "2024-08-01", event: "시리즈 A $60M 투자 유치" },
        { date: "2025-03-01", event: "MAU 1,000만 돌파, ARR $100M 달성" }
      ]
    }
  },
  {
    id: "usecase-002",
    category: "usecase",
    title: "Perplexity AI — AI 검색의 대중화, 월간 1억 질의 돌파",
    date: "2025-02-01",
    summary: "실시간 웹 검색 + AI 요약으로 출처 인용 가능한 답변 제공, 기존 검색 엔진의 강력한 대안으로 부상",
    originalUrl: "https://perplexity.ai",
    detail: {
      overview: "Perplexity AI는 실시간 웹 검색 결과를 AI가 종합하여 출처가 명확한 답변을 제공하는 서비스다. 전통적인 검색 엔진과 달리 링크 목록이 아닌 직접적인 답변을 제시하며, Deep Research 기능으로 복잡한 조사를 자동화한다.",
      keyPoints: [
        { label: "실시간 검색", value: "최신 웹 정보를 기반으로 답변 생성, 환각(hallucination) 최소화" },
        { label: "출처 인용", value: "모든 답변에 참조 URL 표시, 신뢰성 검증 가능" },
        { label: "Deep Research", value: "복잡한 주제를 다각도로 조사하는 에이전트 기능" },
        { label: "Pro 검색", value: "GPT-4o, Claude 3.7, Gemini 2.5 모델 선택 가능" },
        { label: "가격", value: "무료 (기본) / Pro $20/월" }
      ],
      comparison: [
        { feature: "실시간 정보", perplexity: "O", chatgpt: "Plus O / Free X", google: "O" },
        { feature: "출처 인용", perplexity: "항상", chatgpt: "제한적", google: "링크 형태" },
        { feature: "Deep Research", perplexity: "O", chatgpt: "O (Plus)", google: "실험적" },
        { feature: "API", perplexity: "O", chatgpt: "O", google: "O" }
      ],
      timeline: [
        { date: "2022-12-01", event: "Perplexity AI 서비스 시작" },
        { date: "2024-04-01", event: "시리즈 B $62.7M 투자, 기업 가치 $1B" },
        { date: "2025-02-01", event: "월간 질의 1억 건 돌파, Deep Research 출시" }
      ]
    }
  },
  {
    id: "usecase-003",
    category: "usecase",
    title: "GitHub Copilot Workspace — 이슈에서 PR까지 AI가 전 과정 자동화",
    date: "2025-04-01",
    summary: "GitHub 이슈 분석 → 구현 계획 → 코드 작성 → PR 생성을 AI가 end-to-end로 수행",
    originalUrl: "https://github.blog/2025-04-01-copilot-workspace/",
    detail: {
      overview: "GitHub Copilot Workspace는 GitHub 이슈를 입력받아 코드 변경, 테스트, PR 생성까지 전 과정을 AI 에이전트가 수행하는 기능이다. 개발자는 AI가 제안한 계획을 검토·수정하고 승인만 하면 된다.",
      keyPoints: [
        { label: "작동 방식", value: "이슈 분석 → 구현 계획 제안 → 코드 작성 → PR 자동 생성" },
        { label: "사람 개입", value: "계획 검토 및 최종 승인 단계에서 개발자 확인" },
        { label: "통합 환경", value: "GitHub 내에서 완결, 외부 IDE 불필요" },
        { label: "지원 언어", value: "Python, JavaScript, TypeScript, Go, Java 등 주요 언어" },
        { label: "제한", value: "복잡한 아키텍처 변경보다 단순 버그 수정·기능 추가에 적합" }
      ],
      comparison: [
        { stage: "이슈 분석", copilotWS: "자동", claudeCode: "사용자 입력", devin: "자동" },
        { stage: "구현 계획", copilotWS: "자동 제안", claudeCode: "대화형", devin: "자동" },
        { stage: "코드 작성", copilotWS: "자동", claudeCode: "자동", devin: "자동" },
        { stage: "PR 생성", copilotWS: "자동", claudeCode: "수동", devin: "자동" }
      ],
      timeline: [
        { date: "2024-04-29", event: "GitHub Copilot Workspace 기술 프리뷰" },
        { date: "2025-01-01", event: "베타 확대, 일반 사용자 접근" },
        { date: "2025-04-01", event: "GA 및 GitHub 무료 플랜 포함" }
      ]
    }
  },
  {
    id: "usecase-004",
    category: "usecase",
    title: "Physical AI — Microsoft·NVIDIA가 제조업의 산업 프론티어를 여는 법",
    date: "2026-03-13",
    summary: "Microsoft·NVIDIA 협력으로 제조 현장에 Physical AI 도입, 시뮬레이션 기반 개발부터 실세계 실행까지 전 주기 지원",
    originalUrl: "https://www.technologyreview.com/2026/03/13/1134184/why-physical-ai-is-becoming-manufacturings-next-advantage/",
    detail: {
      overview: "Physical AI란 실세계에서 인식·추론·행동할 수 있는 지능 시스템으로, 단순 자동화를 넘어 인간 역량을 확장하는 새로운 패러다임이다. Microsoft와 NVIDIA는 가속 컴퓨팅, 시뮬레이션 라이브러리, 로보틱스 프레임워크, 엔터프라이즈 클라우드를 결합해 제조업체가 Physical AI를 파일럿 수준에서 프로덕션 수준으로 확장할 수 있도록 지원한다. 인간이 의도를 설정하고 AI가 실행·학습·개선하는 '인간 주도·AI 운영' 구조가 핵심이며, 신뢰(거버넌스·보안·가시성)가 확산의 전제 조건으로 강조된다.",
      keyPoints: [
        { label: "핵심 개념", value: "Physical AI — 로봇·자율 시스템이 동적 환경에서 인식·추론·행동하는 지능 계층" },
        { label: "협력 구조", value: "NVIDIA(가속 컴퓨팅·오픈 모델·로보틱스 프레임워크) + Microsoft(엔터프라이즈 클라우드·거버넌스)" },
        { label: "주요 활용", value: "생산 라인 실시간 최적화, 유지보수·품질 의사결정 조율, 공급망 변동 대응, 엔지니어링 가속화" },
        { label: "신뢰 요건", value: "보안·관찰 가능성·정책 준수를 플랫폼 설계 단계부터 내장 필수" },
        { label: "공개 행사", value: "NVIDIA GTC 2026에서 Microsoft·NVIDIA 공동 Physical AI 시연 예정" },
        { label: "주의사항", value: "Microsoft·NVIDIA 후원 콘텐츠로, MIT Technology Review 편집국 독립 기사 아님" }
      ],
      comparison: [
        { 구분: "기존 자동화", 특징: "반복 작업 최적화", 한계: "적응성 부족, 확장 어려움" },
        { 구분: "초기 AI 도입", 특징: "협소한 최적화·비용 절감", 한계: "기술 격차·거버넌스 우려" },
        { 구분: "Physical AI (산업 프론티어)", 특징: "인간 주도·AI 운영, 시뮬레이션 기반 검증 후 실행", 한계: "신뢰 체계 구축 필요" }
      ],
      timeline: [
        { date: "2026-03-13", event: "MIT Technology Review, Physical AI 제조 혁신 특집 기고 게재" },
        { date: "2026-03-17", event: "NVIDIA GTC 2026 — Microsoft·NVIDIA Physical AI 공동 시연" }
      ]
    }
  },
  {
    id: "usecase-005",
    category: "usecase",
    title: "NVIDIA NeMo Retriever 에이전틱 검색 파이프라인 — ViDoRe v3 1위 달성",
    date: "2026-03-13",
    summary: "ReACT 기반 에이전틱 루프로 ViDoRe v3 NDCG@10 69.22(1위)·BRIGHT 2위 동시 달성, 밀집 검색 대비 범용성 입증",
    originalUrl: "https://huggingface.co/blog/nvidia/nemo-retriever-agentic-retrieval",
    detail: {
      overview: "NVIDIA NeMo Retriever 팀이 ReACT 기반 에이전틱 검색 파이프라인을 개발해 ViDoRe v3 리더보드 1위(NDCG@10 69.22)와 추론 집약적 BRIGHT 리더보드 2위를 동시에 달성했다. 기존 밀집 검색의 한계를 극복하기 위해 LLM이 think·retrieve·final_results 도구를 활용해 검색·평가·개선을 반복하는 에이전틱 루프를 구현했으며, MCP 서버 대신 스레드 안전 싱글톤 리트리버를 채택해 배포 안정성과 GPU 활용률을 크게 개선했다. Claude Opus 4.5와 nemotron-colembed-vl-8b-v2 임베딩 조합이 최고 성능을 기록했고, 향후 소형 오픈 가중치 모델로의 증류를 통해 비용 절감을 목표로 한다.",
      keyPoints: [
        { label: "에이전틱 루프 3단계", value: "① think — 검색 전략 수립 → ② retrieve(query, top_k) — 반복 검색·재표현·복합 쿼리 분해 → ③ final_results — 최종 문서 순위 출력. 실패 시 RRF(Reciprocal Rank Fusion) 자동 폴백" },
        { label: "왜 에이전틱이 필요한가", value: "LLM은 추론 가능하지만 수백만 문서를 한번에 처리 불가. 반대로 리트리버는 대규모 검색에 강하지만 추론 능력 부재. 에이전틱 루프가 이 간극을 연결" },
        { label: "싱글톤 리트리버 전환", value: "MCP 서버 방식(별도 프로세스·네트워크 왕복)을 스레드 안전 싱글톤으로 교체 — 모델·코퍼스 임베딩을 1회만 로드, reentrant lock으로 동시 접근 보호, 네트워크 오버헤드 제거" },
        { label: "모델 조합별 성능 (ViDoRe v3)", value: "Opus 4.5 + colembed-vl-8b → 69.22, 136초/쿼리, 평균 9.2회 검색 호출 | gpt-oss-120b + colembed-vl-8b → 66.38, 78초/쿼리, 2.4회 호출 | 밀집 검색 베이스라인 → 64.36, 0.67초" },
        { label: "범용성 vs 특화 비교", value: "INF-X-Retriever는 BRIGHT 1위(63.40)지만 ViDoRe v3 적용 시 62.31로 밀집 검색(64.36)에도 미달. NeMo Agentic은 두 벤치마크 모두 상위권 — 데이터셋별 튜닝 없이 전략을 자체 적응" },
        { label: "비용·적합 시나리오", value: "Opus 4.5 조합: 쿼리당 136초, 입력 토큰 ~760k → 고부가가치 복잡 검색에 적합. gpt-oss-120b 조합: 78초, 저비용 → 범용 RAG 파이프라인. 단순 키워드 검색엔 밀집 검색이 경제적" },
        { label: "향후 로드맵", value: "Opus 수준 에이전틱 추론 패턴을 소형 오픈 가중치 모델에 파인튜닝·증류 → 고정확도를 저비용으로 제공하는 프로덕션 RAG 목표" }
      ],
      comparison: [
        { 파이프라인: "NeMo Agentic (Opus 4.5 + colembed-vl-8b)", "ViDoRe v3": "69.22 (1위)", "BRIGHT": "50.90 (2위)", "초/쿼리": "136초", "검색호출": "9.2회" },
        { 파이프라인: "NeMo Agentic (gpt-oss-120b + colembed-vl-8b)", "ViDoRe v3": "66.38", "BRIGHT": "41.27", "초/쿼리": "78초", "검색호출": "2.4회" },
        { 파이프라인: "INF-X-Retriever (특화)", "ViDoRe v3": "62.31", "BRIGHT": "63.40 (1위)", "초/쿼리": "미공개", "검색호출": "미공개" },
        { 파이프라인: "밀집 검색 베이스라인 (colembed-vl-8b)", "ViDoRe v3": "64.36", "BRIGHT": "38.28", "초/쿼리": "0.67초", "검색호출": "1회" }
      ],
      timeline: []
    }
  },
  {
    id: "claude-004",
    category: "claude",
    title: "펜타곤 CTO 'Claude는 방산 공급망 오염' — 미 국방부 AI 표적 결정 논란",
    date: "2026-03-13",
    summary: "펜타곤 CTO가 Claude를 방산 공급망 오염 우려로 배제, ChatGPT·Grok는 군사 표적 우선순위 결정에 도입 추진",
    originalUrl: "https://www.technologyreview.com/2026/03/13/1134278/the-download-defense-official-ai-chatbots-targeting-pentagon-claude-pollute-military-supply-chain/",
    detail: {
      overview: "미 국방부가 기밀 환경에 배치된 생성 AI 시스템을 활용해 표적 목록을 분석하고 타격 우선순위를 추천하는 방안을 검토 중이다. 펜타곤 CTO는 Claude가 '정책 선호(policy preference)가 내재된 모델'이라며 방산 공급망 오염 우려를 이유로 도입을 거부했고, 반면 OpenAI의 ChatGPT와 xAI의 Grok는 군사 의사결정 시스템에 채택이 추진되고 있다. Anthropic는 OpenAI의 국방부 협력 타결에 강하게 반발하고 있으며, AI의 군사적 활용을 둘러싼 윤리 논쟁이 본격화되고 있다.",
      keyPoints: [
        { label: "군사 AI 활용", value: "펜타곤 기밀 생성 AI로 표적 목록 분석·우선순위 추천, 최종 판단은 인간이 책임" },
        { label: "Claude 배제 이유", value: "펜타곤 CTO, '정책 선호 내재 모델로 방산 공급망 오염' 주장 — 안보·정책 관점 비판" },
        { label: "경쟁 구도", value: "ChatGPT(OpenAI)·Grok(xAI) 군사 도입 추진 vs Claude(Anthropic) 배제" },
        { label: "Anthropic 반응", value: "OpenAI의 국방부 협력 '타협'에 반발, 윤리 기반 AI 정책 강조" },
        { label: "추가 동향", value: "Meta 최신 AI 출시 연기(Google·OpenAI·Anthropic 대비 성능 미달), 우크라이나 전장 데이터 AI 학습 제공 추진" }
      ],
      comparison: [
        { "AI 모델": "ChatGPT (OpenAI)", "군사 도입": "도입 추진", "비고": "국방부 협력 타결" },
        { "AI 모델": "Grok (xAI)", "군사 도입": "도입 추진", "비고": "고위험 의사결정 시스템 검토 중" },
        { "AI 모델": "Claude (Anthropic)", "군사 도입": "배제", "비고": "정책 선호 내재 우려, 방산 공급망 오염 주장" }
      ],
      timeline: []
    }
  },
  {
    id: "claude-005",
    category: "claude",
    title: "Claude Code 2.1.75 — Opus 4.6 1M 컨텍스트 무료 제공·세션 색상·메모리 타임스탬프",
    date: "2026-03-14",
    summary: "Max·Team·Enterprise 플랜에서 Opus 4.6 100만 토큰 컨텍스트 기본 제공, /color·/rename 세션 관리 강화, 메모리 파일 타임스탬프 추가",
    originalUrl: "https://error-storage.tistory.com/95",
    detail: {
      overview: "2026년 3월 14일 배포된 Claude Code 2.1.75의 핵심은 Max·Team·Enterprise 플랜에서 Opus 4.6 1M 컨텍스트 윈도우가 추가 사용량 없이 기본 제공된다는 것이다. 이전에는 200K 토큰 초과 시 별도 사용량이 소모되거나 컴팩션이 강제 실행됐지만, 이제 수십만 줄의 코드베이스·긴 문서를 한 번에 올려 분석할 수 있다. /color·/rename으로 멀티 세션을 직관적으로 구분하고, 메모리 파일에 타임스탬프가 추가돼 Claude가 최신 기억을 우선 활용한다. Bash 파이프+! 명령 오류, 토큰 과산정으로 인한 조기 컴팩션 등 체감 버그도 다수 수정됐다.",
      keyPoints: [
        { label: "1M 컨텍스트 사용법", value: "업그레이드 없이 자동 적용 (Max·Team·Enterprise). 대규모 코드베이스 전체 붙여넣기, 수백 페이지 PDF 한 번에 분석 가능. /context 명령으로 현재 토큰 사용량 확인. 컴팩션 빈도 15% 감소 실측" },
        { label: "/color — 세션 색상 지정", value: "터미널에서 /color 입력 → 색상명 또는 hex 코드 입력 (예: /color blue, /color #ff6b6b). 여러 탭에서 Claude Code를 동시에 열 때 세션별로 색상을 다르게 지정해 혼동 방지" },
        { label: "/rename — 세션 이름 표시", value: "/rename '작업명' 입력 → 프롬프트 바에 이름이 항상 표시됨. /resume로 이전 세션을 재개·포크할 때 이름이 유지되지 않던 버그도 함께 수정" },
        { label: "메모리 타임스탬프 활용", value: "~/.claude/memory/ 하위 .md 파일에 마지막 수정 시각이 자동 기록 → Claude가 '오래된 기억'과 '최신 기억'을 구분해 최신 정보를 우선 참고. autoMemoryDirectory 설정으로 저장 위치 변경 가능 (2.1.74 추가)" },
        { label: "훅 출처 표시", value: "훅이 권한을 요청할 때 '설정(settings) / 플러그인(plugin) / 스킬(skill)' 중 어디서 왔는지 표시 → 의도치 않은 훅 실행 여부를 즉시 판단 가능. --verbose 또는 transcript 모드에서 훅 완료 메시지 상세 확인" },
        { label: "주요 버그 수정 & Breaking Change", value: "수정: Bash jq 'select(.x != .y)' 등 파이프+! 조합 오류 / thinking·tool_use 블록 토큰 과산정으로 인한 조기 컴팩션 / /voice 첫 활성화 실패 / /status Config 탭 후 Esc 미작동. Breaking: Windows 관리 설정 경로 C:\\ProgramData\\ClaudeCode → C:\\Program Files\\ClaudeCode\\managed-settings.json" }
      ],
      comparison: [
        { 기능: "1M 컨텍스트", "2.1.74 이전": "200K 초과 시 추가 사용량 소모, 강제 컴팩션", "2.1.75": "Max·Team·Enterprise 기본 제공, 별도 비용 없음" },
        { 기능: "세션 구분", "2.1.74 이전": "탭·창으로만 구분, 시각적 단서 없음", "2.1.75": "/color 색상 + /rename 이름이 프롬프트 바에 상시 표시" },
        { 기능: "메모리 관리", "2.1.74 이전": "타임스탬프 없어 최신·구버전 기억 구분 불가", "2.1.75": "수정 시각 자동 기록, Claude가 최신 기억 우선 참조" },
        { 기능: "Bash ! 명령", "2.1.74 이전": "파이프와 함께 ! 사용 시 명령 깨짐 (jq 등)", "2.1.75": "정상 동작 (파이프+! 조합 수정)" }
      ],
      timeline: [
        { date: "2026-03-13", event: "Anthropic 1M 컨텍스트 GA 발표 — Opus 4.6·Sonnet 4.6 표준 가격 적용, 미디어 한도 100→600개 확대, MRCR v2 78.3% 달성" },
        { date: "2026-03-14", event: "Claude Code 2.1.75 배포 — 1M 컨텍스트 기본 통합, /color·/rename·메모리 타임스탬프 추가, 다수 버그 수정" },
        { date: "2026-03-14", event: "Claude Code 2.1.76 연속 배포 — MCP Elicitation, /effort 명령, PostCompact 훅, worktree.sparsePaths 설정 추가" }
      ]
    }
  },
  {
    id: "usecase-006",
    category: "usecase",
    title: "Make.md — 옵시디언을 노션처럼 쓰게 해주는 입문 필수 플러그인",
    date: "2026-03-15",
    summary: "슬래시 명령·Spaces·Contexts 3가지 기능으로 마크다운 장벽 없이 옵시디언을 노션 스타일로 180° 전환",
    originalUrl: "https://www.make.md/",
    detail: {
      overview: "옵시디언은 강력하지만 처음 켜면 텅 빈 화면과 마크다운 문법이 장벽이 된다. Make.md(일명 잔디 플러그인)는 슬래시 명령·Spaces·Contexts 세 가지 핵심 기능으로 옵시디언을 노션 스타일의 워크스페이스로 바꿔주는 올인원 플러그인이다. 마크다운을 외우지 않아도 콘텐츠 작성에만 집중할 수 있어 초보자의 입덕 필수템으로 꼽힌다.",
      keyPoints: [
        { label: "설치 방법", value: "옵시디언 → Settings → Community Plugins → Browse에서 'Make.md' 검색 → Install → Enable. 재시작 불필요, 즉시 적용" },
        { label: "슬래시(/) 명령 사용법", value: "노트 편집 중 / 입력 → 팝업 메뉴에서 Heading1·2·3 / Callout / Checklist / Table / Image 등 선택. 마크다운 기호(#, *, >, |) 암기 불필요" },
        { label: "Navigator & Spaces 사용법", value: "왼쪽 사이드바 Navigator에서 드래그&드롭으로 Space 생성 → 폴더·태그 기반으로 그룹화. Blink 검색(단축키)으로 노트 즉시 이동. 3패널 Overview로 폴더·파일·미리보기 동시 확인" },
        { label: "Contexts (DB) 사용법", value: "폴더나 태그에 Context 정의 → 속성(날짜·상태·태그 등) 설정 → Table·Calendar·Kanban·Gallery 뷰로 전환. 필터·정렬·그룹화 지원. 태그 Context 연결로 서로 다른 Space 데이터 관계 연결 가능" },
        { label: "개인화 (Spaces 에디터)", value: "Space 홈 페이지를 블록 에디터로 커스터마이징 — 리스트·버튼·이미지·임베드 블록 드래그&드롭 배치. 스티커·컬러·커버 이미지로 노트별 개성 부여. 템플릿으로 반복 구조 자동화" },
        { label: "핵심 차별점", value: "로컬 저장(옵시디언 기반) + 노션 UX = 프라이버시 보장하면서 노션 수준 DB 활용 가능. 수식(Formula)·관계(Relation)·객체(Object) 속성으로 고급 데이터 구조 구현" },
        { label: "주의사항", value: "커뮤니티 플러그인이므로 옵시디언 업데이트 후 일시적 호환성 문제 가능. Dataview·Templater 등 기존 플러그인과 기능 중복 시 정리 권장" }
      ],
      comparison: [
        { 구분: "기본 옵시디언", 서식입력: "마크다운 직접 입력", 파일관리: "폴더 트리 (윈도우 탐색기식)", 데이터뷰: "Dataview 플러그인 별도 설치", 저장: "로컬" },
        { 구분: "Make.md 적용", 서식입력: "/ 슬래시 팝업 선택", 파일관리: "Spaces + Navigator (드래그&드롭)", 데이터뷰: "Contexts DB 내장 (Table·Calendar·Kanban)", 저장: "로컬" },
        { 구분: "노션", 서식입력: "/ 슬래시 팝업 선택", 파일관리: "페이지 계층 + DB", 데이터뷰: "DB 뷰 내장", 저장: "클라우드 (유료 플랜 필요)" }
      ],
      timeline: []
    }
  },
  {
    id: "claude-006",
    category: "claude",
    title: "Claude Code 커스터마이징 4계층 완전 정리 — CLAUDE.md·Skills·Agents·Output Styles",
    date: "2026-03-15",
    summary: "매 세션 규칙 주입(CLAUDE.md), 응답 방식 교체(Output Style), 호출형 플레이북(Skills), 독립 컨텍스트 전문 AI(Sub-agents) 4계층 구조 정리",
    originalUrl: "https://code.claude.com/docs/en/memory#choose-where-to-put-claude-md-files",
    detail: {
      overview: "Claude Code는 커스터마이징을 위한 4가지 독립 레이어를 제공한다. CLAUDE.md는 매 세션 컨텍스트에 자동 주입되는 규칙·지식 파일이고, Output Styles는 시스템 프롬프트 자체를 교체해 Claude의 응답 방식을 완전히 바꾼다. Skills는 description만 평소에 노출하고 실제 내용은 호출 시에만 로드되는 플레이북이며, Sub-agents는 메인 대화와 완전히 분리된 독립 context window에서 실행되는 전문 AI다. 각 계층의 로드 시점과 실행 위치가 다르므로 용도에 맞게 조합해 사용하는 것이 핵심이다.",
      keyPoints: [
        { label: "CLAUDE.md — 항상 살아있는 규칙", value: "매 세션 자동 로드. ~/ (전체), ./ (프로젝트), .claude/rules/ (파일 타입별 조건부). 200줄 초과 시 adherence 저하 — rules/로 분산 권장. Auto memory는 Claude가 스스로 기억 저장" },
        { label: "Output Styles — 시스템 프롬프트 교체", value: "시스템 프롬프트 레벨에서 작동 (CLAUDE.md보다 깊은 레이어). Default·Explanatory·Learning 내장 + 커스텀 .claude/output-styles/*.md 생성 가능. keep-coding-instructions: true로 코딩 지시 유지" },
        { label: "Skills — 호출 시 로드 플레이북", value: "/skill-name 직접 호출 또는 description 기반 자동 실행. 평소엔 description만 컨텍스트에 노출, 실제 내용은 호출 시만 로드. disable-model-invocation: true로 사용자 전용 제한 가능" },
        { label: "Sub-agents — 독립 컨텍스트 AI", value: "완전히 별도의 context window에서 실행 → 메인 컨텍스트 오염 없음. tools/model/memory/isolation 개별 설정. 하위 agent가 또 다른 agent를 스폰하는 무한 중첩은 불가" },
        { label: "저장 위치 우선순위 공통 규칙", value: "CLI 플래그 > 프로젝트(.claude/) > 사용자(~/.claude/) > 플러그인. 동일 이름이면 우선순위 높은 쪽이 override. Skills는 enterprise > personal > project 순" },
        { label: "계층별 적합 용도", value: "코딩 컨벤션·프로젝트 구조 → CLAUDE.md | Claude 역할 자체 전환 → Output Style | /commit·/deploy 반복 워크플로우 → Skills | 탐색·리뷰 등 독립 실행 → Sub-agents" }
      ],
      comparison: [
        { 구분: "CLAUDE.md", 로드시점: "매 세션 항상", 실행위치: "메인 컨텍스트", 용도: "규칙·지식 주입", 컨텍스트영향: "항상 소비" },
        { 구분: "Output Style", 로드시점: "매 세션 항상", 실행위치: "시스템 프롬프트", 용도: "응답 방식 전환", 컨텍스트영향: "시스템 프롬프트 교체" },
        { 구분: "Skills", 로드시점: "호출 시만", 실행위치: "메인 컨텍스트", 용도: "재사용 플레이북", 컨텍스트영향: "호출 시만 소비" },
        { 구분: "Sub-agents", 로드시점: "위임 시만", 실행위치: "독립 컨텍스트", 용도: "전문 위임 작업", 컨텍스트영향: "메인에 영향 없음" }
      ],
      timeline: []
    }
  },
  {
    id: "claude-007",
    category: "claude",
    title: "Claude 3월 사용량 2배 프로모션 — 오프피크 시간대 Free·Pro·Max·Team 자동 적용",
    date: "2026-03-13",
    summary: "3월 13~28일 한시 운영. 평일 피크 시간(오전 8시~오후 2시 ET) 외 시간대 사용량 한도 2배, 주간 한도 미포함, 별도 설정 불필요",
    originalUrl: "https://support.claude.com/en/articles/14063676-claude-march-2026-usage-promotion",
    detail: {
      overview: "Anthropic이 2026년 3월 13일부터 28일까지 한시적 사용량 2배 프로모션을 진행한다. 평일 오전 8시~오후 2시(ET) 피크 시간 외 오프피크 시간대에 사용량 한도가 자동으로 2배로 늘어나며, 보너스 사용량은 주간 한도에 포함되지 않는다. Free·Pro·Max·Team 플랜에 계정 설정 변경 없이 자동 적용되고, Enterprise는 제외된다. 프로모션 종료 이후에는 표준 사용량으로 조용히 복귀되며 요금제 변경은 없다.",
      keyPoints: [
        { label: "프로모션 기간", value: "2026년 3월 13일 ~ 3월 28일 (PT 기준 11:59 PM 종료)" },
        { label: "혜택", value: "오프피크 시간대 사용량 한도 2배 — 보너스분은 주간 한도에 미포함" },
        { label: "피크 시간 (혜택 제외)", value: "평일 오전 8~오후 2시 ET / 오전 5~11시 PT / 오후 12~6시 GMT" },
        { label: "적용 요금제", value: "Free · Pro · Max · Team (Enterprise 제외) — 계정 설정 변경 없이 자동 적용" },
        { label: "지원 플랫폼", value: "Claude 웹·데스크탑·모바일, Cowork, Claude Code, Claude for Excel, Claude for PowerPoint" },
        { label: "주의사항", value: "타 혜택과 중복 불가, 양도 불가. 종료 후 요금제 변화 없이 표준 사용량 자동 복귀" }
      ],
      comparison: [],
      timeline: [
        { date: "2026-03-13", event: "프로모션 시작 — 오프피크 시간대 사용량 2배 자동 적용" },
        { date: "2026-03-28", event: "프로모션 종료 (PT 11:59 PM) — 표준 사용량으로 복귀" }
      ]
    }
  },
  {
    id: "codex-004",
    category: "codex",
    title: "Codex Security가 SAST를 포함하지 않는 이유 — AI 추론 기반 보안 스캐너의 등장",
    date: "2026-03-07",
    summary: "120만 커밋 스캔, 고위험 취약점 10,561개 발견 — 패턴 매칭 대신 LLM 추론으로 SAST의 구조적 한계를 극복",
    originalUrl: "https://openai.com/index/why-codex-security-doesnt-include-sast/",
    detail: {
      overview: "OpenAI는 Codex Security를 연구 미리보기로 출시하며, 기존 SAST(정적 분석 도구)가 갖는 구조적 한계를 정면으로 비판했다. 규칙 기반 정적 분석은 알려진 취약점 패턴만 탐지하지만, 코드 논리 자체를 추론하지 못한다는 치명적 약점이 있다. Codex Security는 저장소 전체를 분석해 위협 모델을 먼저 생성하고, 그 맥락 위에서 취약점을 탐색·샌드박스 검증·수정안 제안까지 수행한다. 120만 개 커밋을 대상으로 한 실험에서 심각(critical) 792개, 높음(high-severity) 10,561개의 취약점을 발견했으며, 오탐률을 50% 이상 줄였다.",
      keyPoints: [
        { label: "핵심 접근 방식", value: "패턴 매칭(SAST) 대신 LLM 추론으로 코드 로직·인증 흐름·미들웨어 마운트 여부 등을 맥락 기반으로 분석" },
        { label: "실험 수치", value: "120만 개 커밋 스캔 → critical 792개 + high-severity 10,561개 취약점 발견, 오탐률 50% 이상 감소" },
        { label: "3단계 작동 방식", value: "① 보안 컨텍스트 분석 및 위협 모델 생성 → ② 샌드박스 환경에서 취약점 검증 → ③ 실행 가능한 수정안 + PoC 제안" },
        { label: "SAST와의 차이", value: "SAST는 알려진 시그니처만 탐지, Codex Security는 코드가 '실제로 해야 할 일'에 비해 잘못된 동작을 하는지 추론 가능" },
        { label: "가용성 및 가격", value: "ChatGPT Pro·Enterprise·Business·Edu 대상 연구 미리보기, 출시 후 1개월 무료 제공" },
        { label: "분석 대상 프로젝트", value: "GnuPG, GnuTLS, GOGS, Thorium, libssh, PHP, Chromium 등 주요 오픈소스 프로젝트에서 취약점 발견" }
      ],
      comparison: [
        { 구분: "기존 SAST", 탐지방식: "규칙/시그니처 패턴 매칭", 맥락이해: "없음", 오탐률: "높음", 신규취약점: "탐지 불가" },
        { 구분: "Codex Security", 탐지방식: "LLM 추론 + 위협 모델 기반", 맥락이해: "저장소 전체 구조 파악", 오탐률: "50% 이상 감소", 신규취약점: "논리 오류도 탐지 가능" },
        { 구분: "Claude Code Security", 탐지방식: "LLM 추론 (Anthropic)", 맥락이해: "알고리즘 수준 추론 가능", 오탐률: "낮음", 신규취약점: "예: LZW 알고리즘 힙 오버플로우 발견" }
      ],
      timeline: [
        { date: "2026-03-07", event: "Codex Security 연구 미리보기 공식 출시 발표" },
        { date: "2026-03-11", event: "Anthropic·OpenAI의 AI 보안 스캐너가 SAST 구조적 맹점을 드러냈다는 업계 분석 보도" },
        { date: "2026-03-13", event: "AI 코딩 에이전트 보안 반복 실수 문제 관련 추가 보도" }
      ]
    }
  },
  {
    id: "codex-005",
    category: "codex",
    title: "GPT-5.4 mini·nano 출시 — 서브에이전트 시대 겨냥한 최강 소형 모델",
    date: "2026-03-17",
    summary: "400K 컨텍스트, 2배 빠른 속도, SWE-bench Pro 54.4% — OpenAI 역대 최고 성능 소형 모델 출시",
    originalUrl: "https://openai.com/index/introducing-gpt-5-4-mini-and-nano/",
    detail: {
      overview: "OpenAI가 2026년 3월 17일 GPT-5.4 mini와 GPT-5.4 nano를 공개했다. GPT-5.4 mini는 GPT-5 mini 대비 2배 이상 빠르며 코딩·추론·멀티모달·도구 사용 전 영역에서 성능이 대폭 향상됐다. GPT-5.4 nano는 분류·데이터 추출·경량 서브에이전트 작업에 최적화된 가장 빠르고 저렴한 모델이다. 두 모델 모두 400,000 토큰 컨텍스트 윈도우를 지원하며 서브에이전트 시대를 겨냥해 설계됐다.",
      keyPoints: [
        { label: "핵심 기능", value: "텍스트·이미지 입력, 도구 호출, 웹 검색, 파일 검색, 컴퓨터 사용, 스킬 지원 (mini). nano는 분류·데이터 추출·랭킹·경량 서브에이전트 특화" },
        { label: "성능 수치", value: "SWE-bench Pro 54.4% (GPT-5 mini 45.7%), OSWorld 컴퓨터 사용 72.1% (GPT-5 mini 42.0%), 도구 호출 tau2-bench 93.4%" },
        { label: "컨텍스트 / 속도", value: "400,000 토큰 컨텍스트 윈도우 공통 지원, GPT-5.4 mini는 GPT-5 mini 대비 2배 이상 빠름" },
        { label: "가격 (API)", value: "mini: 입력 $0.75/1M · 출력 $4.50/1M. nano: 입력 $0.20/1M · 출력 $1.25/1M" },
        { label: "가용 채널", value: "mini: ChatGPT 무료·Go 플랜, Codex, API. nano: API 전용 (ChatGPT 미지원)" },
        { label: "제한 / 주의", value: "mini 롱 컨텍스트(MRCR v2 64K-128K) 47.7%로 full GPT-5.4(86.0%) 대비 큰 격차. nano는 멀티스텝 복잡 추론에 부적합" }
      ],
      comparison: [
        { "모델": "GPT-5.4 mini", "SWE-bench Pro": "54.4%", "OSWorld": "72.1%", "입력 가격/1M": "$0.75", "속도": "GPT-5 mini 대비 2배+" },
        { "모델": "GPT-5.4 nano", "SWE-bench Pro": "—", "OSWorld": "—", "입력 가격/1M": "$0.20", "속도": "최고속 (최저 지연)" },
        { "모델": "GPT-5 mini (이전)", "SWE-bench Pro": "45.7%", "OSWorld": "42.0%", "입력 가격/1M": "$0.25(참고)", "속도": "기준" },
        { "모델": "GPT-5.4 (full)", "SWE-bench Pro": "57.7%", "OSWorld": "—", "입력 가격/1M": "더 높음", "속도": "느림" }
      ],
      timeline: [
        { date: "2026-03-17", event: "GPT-5.4 mini 및 GPT-5.4 nano 공식 출시 발표" },
        { date: "2026-03-17", event: "ChatGPT 무료·Go 플랜에 GPT-5.4 mini 즉시 제공 시작" },
        { date: "2026-03-17", event: "OpenAI API 및 Azure AI Foundry를 통해 GPT-5.4 mini·nano 제공 개시" }
      ]
    }
  }
];
