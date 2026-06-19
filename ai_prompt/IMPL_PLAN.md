# IMPL_PLAN — 인물 화보 + 사진 조건/가이드

> 승인된 플랜(2026-06-20). 단계별 구현 계획. 완료 상태는 TASK.md 참조.

## 목표
인물 화보 프롬프트 5종 추가 + 입력 사진에 맞춰 프롬프트가 바뀌는 "사진 가이드 카드 + 내 사진 조건" 구조 도입.

## 단계
1. **인프라 (app.js)**
   - 신규 필드 타입 `checkbox`(boolean) — `renderFieldGroup` 분기, `updateField` checked, `defaultValues` false 보존.
   - 공통 `photoConditions[]` 카탈로그 + `photoConditionFields()`/`allFields()`.
   - 조건 헬퍼: `hairTypePhrase`·`hairColorPhrase`·`hairClause`·`sunglassesClause`·`signatureClause`·`outfitFromRefClause`·`conditionNegatives`.
   - `renderPrompt` 네거티브에 `conditionNegatives` 결합.
   - `renderPhotoGuide()`·`renderPhotoConditions()` + `render()` 호출 + `els` 3개.
   - Node export early-return + `cryptoId` window 가드.
2. **UI (index.html / styles.css)**
   - `#photoGuide` 카드 + `#photoConditionSection`/`#photoConditionForm`.
   - `.photo-guide`/`.pg-*`/`.toggle-field` 스타일.
3. **템플릿 5종**: `yacht_selfie`·`beach_resort`·`santorini_alley`·`hydrangea_overhead`·`goddess_plaza` — `templates[]` 객체 + switch case. photoGuide·photoConditionIds 연결.
4. **테스트 (tests/prompt.test.js)**: 조건→문구/네거티브, renderPrompt 토글, checkbox 기본값, 회귀.
5. **문서**: PRD/SPEC/TRD/ADR/이 문서/TASK + template_guide 갱신.
6. **검증**: `node --check` → 교차검증(undefined 0건) → `npm test`(Green) → 로컬 서버 페이지 200/컨테이너.
7. **커밋·푸시**.

## 환경 경계 (주의)
- 루트 `type:module` → `ai_prompt/package.json type:commonjs` 로 격리해야 require/test 동작.
- 사진 조건의 `v.xxx`는 photoConditionIds로 해석되는 필드여야 함(교차검증 필수).
