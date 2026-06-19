# TRD — ai_prompt Prompt Generator

기술 요구사항. PRD(`prompt_generator_prd.md`)의 "무엇을"에 대한 "어떻게".

## 1. 스택 / 제약
- 순수 정적: HTML + CSS + 브라우저 classic script(`app.js`). 빌드/번들 없음. 의존성 0.
- 배포: GitHub Pages (`https://page.chrisnolja.dev/ai_prompt/`).
- 호환: 최신 Chromium/Safari/Firefox. `navigator.clipboard` + `execCommand` 폴백.
- 테스트: Node 내장 `node:test` (외부 의존성 없음). `ai_prompt/package.json` 은 `type: commonjs`.

## 2. 파일 구조
```
ai_prompt/
├── index.html      # 3패널 레이아웃 + 컨테이너(#photoGuide, #photoConditionForm 등)
├── app.js          # 데이터 + 렌더 + 이벤트 (+ Node export early-return)
├── styles.css      # 토큰 기반 스타일
├── package.json    # type:commonjs, test 스크립트
├── tests/*.test.js # 순수 함수 단위 테스트
└── *.md            # PRD/SPEC/TRD/ADR/IMPL_PLAN/TASK/guide
```

## 3. 핵심 모듈 (app.js)
- **데이터**: `templates[]`, `photoConditions[]`, `moodPresets[]`, `ruleBlocks[]`, `negativePrompt`, `messagePresets[]`.
- **순수 로직(테스트 대상)**: `getTemplate`, `defaultValues`, `photoConditionFields`, `renderTemplateBody`, `renderPrompt`, `conditionNegatives`, `hair*/sunglasses*/signature*/outfitFromRef*`, `compactSections`, `compactLine`, `linesToBullets`.
- **DOM 레이어**: `els`, `render()`, `renderTemplates/Moods/Rules/FieldGroup/Fields/PhotoConditions/PhotoGuide/Messages/OutputMode`, 이벤트 바인딩, `copyPrompt`, `loadState/persist`.
- 경계: `module.exports`가 있으면(Node) 순수 함수만 내보내고 DOM 부트스트랩 전 `return`.

## 4. 상태 모델
- `GeneratorState`: selectedTemplateId, values(필드+사진조건 병합), selectedMoodIds, selectedRuleIds, messages, outputMode, includeNegative.
- 영속: `localStorage["prompt-generator-state-v1"]`. 로드 시 템플릿 유효성 검사 후 기본값과 병합.

## 5. 프롬프트 조립 순서 (`renderPrompt`)
1. `renderTemplateBody` (템플릿별 case, 사진 조건 헬퍼 호출)
2. 선택 분위기 블록
3. 배치/보존 규칙 블록
4. outputMode 텍스트 처리 지침
5. 네거티브 = 공통 `negativePrompt` + `conditionNegatives(template, values)`(includeNegative일 때)

## 6. 비기능 요구
- 입력→프리뷰 갱신은 동기 렌더(체감 즉시). 큰 의존성/네트워크 없음.
- 신규 필드의 `v.xxx` 참조는 반드시 fields 또는 photoConditionIds에 정의(undefined 금지) — 교차검증으로 강제.
- 접근성: 토글/셀렉트 label 연결, `sr-only` 유지.

## 7. 테스트 전략 (TDD)
- Red: 새 기능/조건 매핑을 먼저 실패 테스트로 작성(`tests/*.test.js`).
- Green: 최소 구현으로 통과.
- 회귀: 기존 템플릿 본문 생성 테스트 유지.
- 실행: `npm test` (= `node --test tests/*.test.js`). DOM 없이 순수 함수 검증, state는 직접 구성.
