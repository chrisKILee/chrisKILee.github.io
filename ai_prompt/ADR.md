# ADR — ai_prompt Prompt Generator

아키텍처 결정 기록. 새 결정은 아래에 append 한다.

---

## ADR-001. 단일 IIFE + 데이터/렌더 분리 (app.js)
- **결정**: 빌드 도구 없이 브라우저 classic script 단일 파일(`app.js`)로 구현. `templates[]`·`moodPresets[]`·`ruleBlocks[]` 데이터와 `renderTemplateBody()` switch / 공통 렌더 로직을 분리.
- **이유**: GitHub Pages 정적 호스팅, 의존성 0. 템플릿 추가 시 건드릴 곳이 2군데(`templates[]` + switch case)로 한정.
- **결과**: 실시간 변경·복사·localStorage는 공통 로직이라 새 템플릿이 자동 적용됨.

## ADR-002. 사진 조건(photoConditions) + 가이드(photoGuide) 도입
- **결정**: 인물 화보 프롬프트가 입력 사진(헤어·선글라스·의상)에 의존하는 문제를, **공통 사진 조건 카탈로그**(`photoConditions[]`)를 템플릿이 `photoConditionIds`로 참조하고, 조건값→문구 변환 **순수 헬퍼**(`hairClause`·`sunglassesClause`·`signatureClause`·`outfitFromRefClause`·`conditionNegatives`)로 본문·네거티브를 조립하는 구조로 해결.
- **대안**: 템플릿마다 조건 필드를 개별 정의 → 중복↑. 기각.
- **이유**: 헤어/선글라스 등은 여러 화보에서 반복되는 축. 카탈로그 재사용 + 조건→네거티브 자동 결합이 일관적이고 확장 쉬움.
- **결과**: `defaultValues()`가 `fields + photoConditionFields()`를 병합. UI는 "📸 내 사진 조건" 섹션 + 가이드 카드로 분리 렌더.

## ADR-003. 신규 필드 타입 `checkbox`(boolean)
- **결정**: 기존 text/select/textarea에 `checkbox`(boolean) 추가. `defaultValues()`는 `"defaultValue" in field`로 `false`를 보존, `updateField()`는 `input.checked`를 저장.
- **이유**: "의상색 반영" 같은 on/off 조건을 토글로 표현.

## ADR-004. CommonJS 패키지 경계 (테스트 가능성)
- **결정**: 저장소 루트가 `"type": "module"`(ESM)이라, `ai_prompt/package.json`에 `"type": "commonjs"`를 두어 이 폴더만 CJS로 격리. `app.js`는 끝에서 `module.exports`로 순수 함수를 내보내고 **DOM/localStorage 부트스트랩 직전 early-return**한다.
- **대안**: 별도 `prompt-core` 모듈로 추출 → 큰 리팩토링·중복 위험. 기각.
- **이유**: 브라우저는 classic script로 그대로 로드(`module` 미정의 → export 분기 skip), Node `node --test`는 동일 파일을 require해 **순수 로직을 DOM 없이 단위 테스트**. cryptoId는 `typeof window` 가드로 모듈 로드 안전화.
- **결과**: `tests/*.test.js`(node:test)로 TDD. 향후 ai_prompt는 add+TDD 프로세스(PRD→TRD→ADR→IMPL_PLAN→TASK→Red→구현→Green).
