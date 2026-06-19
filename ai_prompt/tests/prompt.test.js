"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const core = require("../app.js");

// DOM/localStorage 없이 순수 함수만 검증하기 위해 state를 직접 구성한다.
function buildState(id, overrides = {}) {
  const t = core.getTemplate(id);
  return {
    selectedTemplateId: id,
    values: { ...core.defaultValues(t), ...(overrides.values || {}) },
    selectedMoodIds: [...t.defaultMoodIds],
    selectedRuleIds: [...t.defaultRuleIds],
    messages: [],
    outputMode: "direct_text",
    includeNegative: overrides.includeNegative !== undefined ? overrides.includeNegative : true,
  };
}

const NEW_TEMPLATES = ["yacht_selfie", "beach_resort", "santorini_alley", "hydrangea_overhead", "goddess_plaza"];

test("신규 5종 템플릿이 등록되어 있다", () => {
  for (const id of NEW_TEMPLATES) {
    const t = core.getTemplate(id);
    assert.equal(t.id, id, `${id} 템플릿 존재`);
    assert.ok(t.photoGuide, `${id} photoGuide 존재`);
    assert.ok(Array.isArray(t.photoConditionIds) && t.photoConditionIds.length > 0, `${id} photoConditionIds 존재`);
  }
});

test("신규 템플릿 본문(renderTemplateBody)이 비어있지 않다", () => {
  for (const id of NEW_TEMPLATES) {
    const t = core.getTemplate(id);
    const body = core.renderTemplateBody(t, buildState(id));
    assert.ok(body.length > 100, `${id} 본문 생성`);
  }
});

test("hairClause: 헤어 길이/색이 문장에 반영된다", () => {
  assert.match(core.hairClause("단발/숏컷", "원본 그대로"), /short hair/);
  assert.match(core.hairClause("긴 생머리", "원본 그대로"), /long straight hair/);
  assert.match(core.hairClause("긴 웨이브", "흑발"), /long wavy hair/);
  assert.match(core.hairClause("긴 생머리", "흑발"), /jet-black/);
  assert.match(core.hairClause("긴 생머리", "원본 그대로"), /original hair color/);
});

test("sunglassesClause: 선글라스 유무가 문장에 반영된다", () => {
  assert.match(core.sunglassesClause("반사 선글라스 착용"), /reflective/);
  assert.match(core.sunglassesClause("살짝 내린 선글라스"), /lowered/);
  assert.match(core.sunglassesClause("없음(맨얼굴)"), /no sunglasses/);
});

test("signatureClause: 값이 있을 때만 서명 문장이 생긴다", () => {
  assert.equal(core.signatureClause(""), "");
  assert.equal(core.signatureClause("   "), "");
  const s = core.signatureClause("Arif N Studio");
  assert.match(s, /Signature:/);
  assert.match(s, /Arif N Studio/);
});

test("outfitFromRefClause: 체크 시에만 의상색 반영 문장", () => {
  assert.match(core.outfitFromRefClause(true), /reference photo/);
  assert.equal(core.outfitFromRefClause(false), "");
});

test("conditionNegatives: 숏컷이면 long hair, 긴머리면 short hair 금지", () => {
  const t = core.getTemplate("yacht_selfie");
  const negShort = core.conditionNegatives(t, { refHair: "단발/숏컷", sunglasses: "없음(맨얼굴)" });
  assert.ok(negShort.includes("long hair"));
  const negLong = core.conditionNegatives(t, { refHair: "긴 생머리", sunglasses: "없음(맨얼굴)" });
  assert.ok(negLong.includes("short hair"));
});

test("conditionNegatives: 맨얼굴이면 sunglasses 금지, 착용이면 얼굴 가림 금지", () => {
  const t = core.getTemplate("yacht_selfie");
  const noGlasses = core.conditionNegatives(t, { refHair: "긴 생머리", sunglasses: "없음(맨얼굴)" });
  assert.ok(noGlasses.includes("sunglasses"));
  const withGlasses = core.conditionNegatives(t, { refHair: "긴 생머리", sunglasses: "반사 선글라스 착용" });
  assert.ok(withGlasses.some((n) => /sunglasses hiding/.test(n)));
});

test("renderPrompt: 요트셀피 헤어 조건 변경이 프롬프트를 바꾼다", () => {
  const longHair = core.renderPrompt(buildState("yacht_selfie", { values: { refHair: "긴 생머리" } }));
  assert.match(longHair, /long straight hair/);
  const shortHair = core.renderPrompt(buildState("yacht_selfie", { values: { refHair: "단발/숏컷" } }));
  assert.match(shortHair, /short hair/);
  assert.notEqual(longHair, shortHair);
});

test("renderPrompt: 선글라스 조건이 본문과 네거티브를 토글한다", () => {
  const bare = core.renderPrompt(buildState("yacht_selfie", { values: { sunglasses: "없음(맨얼굴)" } }));
  assert.match(bare, /no sunglasses/);
  const shades = core.renderPrompt(buildState("yacht_selfie", { values: { sunglasses: "반사 선글라스 착용" } }));
  assert.match(shades, /reflective/);
});

test("renderPrompt: 서명은 입력했을 때만 들어간다", () => {
  const noSig = core.renderPrompt(buildState("yacht_selfie", { values: { signature: "" } }));
  assert.ok(!/Signature:/.test(noSig));
  const withSig = core.renderPrompt(buildState("yacht_selfie", { values: { signature: "Arif N Studio" } }));
  assert.match(withSig, /Arif N Studio/);
});

test("defaultValues: checkbox 기본값 false가 보존된다", () => {
  const t = core.getTemplate("santorini_alley");
  const values = core.defaultValues(t);
  assert.equal(values.outfitFromRef, false);
});

test("회귀: 기존 템플릿(photo_doodle, watercolor_poster)도 본문 생성된다", () => {
  for (const id of ["photo_doodle", "watercolor_poster", "miniature", "travel_typography"]) {
    const t = core.getTemplate(id);
    const body = core.renderTemplateBody(t, buildState(id));
    assert.ok(body.length > 50, `${id} 본문 생성`);
  }
});
