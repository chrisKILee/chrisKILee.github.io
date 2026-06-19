# TASK — ai_prompt

진행 태스크 체크리스트. 완료 항목은 유지(이력), 새 작업은 아래에 append.

## 2026-06-20 — 인물 화보 5종 + 사진 조건/가이드

### 인프라 (app.js)
- [x] `checkbox` 필드 타입 (renderFieldGroup/updateField/defaultValues false 보존)
- [x] `photoConditions[]` 카탈로그 + `photoConditionFields()`/`allFields()`
- [x] 조건 헬퍼 `hairClause`·`sunglassesClause`·`signatureClause`·`outfitFromRefClause`·`conditionNegatives`
- [x] `renderPrompt` 네거티브에 조건 네거티브 결합
- [x] `renderPhotoGuide()`·`renderPhotoConditions()` + render/els 연결
- [x] Node export early-return + `cryptoId` window 가드

### UI
- [x] index.html: `#photoGuide` / `#photoConditionSection` / `#photoConditionForm`
- [x] styles.css: `.photo-guide`·`.pg-*`·`.toggle-field`

### 템플릿 5종
- [x] yacht_selfie / beach_resort / santorini_alley / hydrangea_overhead / goddess_plaza (templates[] + switch case)

### 테스트 / 문서 / 검증
- [x] tests/prompt.test.js (13 케이스, Green)
- [x] PRD/SPEC/TRD/ADR/IMPL_PLAN 갱신·생성
- [x] template_guide 갱신 (checkbox·photoConditionIds·photoGuide·조건 헬퍼)
- [x] node --check + 교차검증(undefined 0) + npm test + 로컬 서버 200
- [ ] 커밋·푸시

## 다음 후보
- [ ] 사진 조건에 "표정", "전신/상반신" 등 축 추가 검토
- [ ] 화보 외 기존 템플릿에도 photoGuide 점진 적용
