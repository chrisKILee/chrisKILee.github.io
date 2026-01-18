# VNTG AI Study Project Constitution

이 문서는 프로젝트의 최상위 원칙(Supreme Law)을 정의합니다. AI 어시스턴트는 모든 작업 시 이 헌법을 준수해야 하며, 모든 기술적 결정은 아래 원칙에 기반합니다.

## 1. 핵심 철학 (Core Philosophy)
- **Spec-Driven Development (SDD)**: 사양(Spec)이 진실의 유일한 원천(SSOT)입니다. 코드를 수정하기 전에 반드시 사양 문서를 먼저 업데이트합니다.
- **Antigravity Approach**: 복잡성을 최소화하고 AI의 생산성을 극대화하기 위해 '스펙 기반(Spec-Based)' 반복 개발을 수행합니다.
- **Visual Excellence**: 사용자에게 'WOW' 경험을 줄 수 있는 프리미엄 디자인(Zen Style, 고대비, 마이크로 애니메이션)을 기본으로 합니다.

## 2. 기술 표준 (Technical Standards)
- **Architecture**: 모든 페이지는 **SPA(Single Page Application)** 구조로 동작해야 합니다.
- **UI/UX**: 
    - **Vanilla CSS** 및 **Tailwind CSS** 사용.
    - **iframe 사용 금지**. 콘텐츠는 동적 주입 방식을 사용합니다.
    - **No-Back Button**: 브라우저 백버튼을 통한 페이지 유추를 방지합니다.
- **Language**: 모든 설명, 작업 내용, 문서는 **한글**로 작업합니다. (커밋 로그 포함)
- **Deployment**: 실행 환경은 **GitHub Pages**입니다.

## 3. 품질 게이트 (Quality Gates)
- **TDD (Test-Driven Development)**: 개발 의도에 맞는 테스트 케이스를 수립하고, 모든 버튼과 인터랙션의 정상 동작을 검증합니다.
- **Security & Privacy**: 링크를 받은 외부인이 다른 페이지를 유추할 수 없도록 경로 노출을 차단합니다.
- **Performance**: Chart.js 등을 활용하여 기술적 내용을 시각화하되, 부드러운 로딩 성능을 유지합니다.

## 4. 운영 규칙 (Operational Rules)
- **Iteration**: 
    1. `spec.md` 정의 (또는 수정)
    2. AI가 구현 계획 수립
    3. 코드 구현 및 테스트
    4. `walkthrough.md`를 통한 결과 보고
- **Persistence**: 개발 완료 시 반드시 `git commit/push`를 수행합니다.

---
*본 헌법은 프로젝트의 방향성을 고정하며, 변경 시 반드시 설계자(인간)의 승인이 필요합니다.*
