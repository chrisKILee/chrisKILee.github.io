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
  }
];
