# SPEC: 파일 단위 Tier 시스템 & 어드민 오버라이드

> 작성: 2026-04-19  
> 이슈: 파일 tier 변경 시 같은 카테고리 전체가 바뀌는 것처럼 보이는 버그  
> 원인: applyAdminOverrides가 tier/shareToken을 허용 키로 포함하지 않아 새로고침 시 설정 유실

---

## 1. getEffectiveTier(fileCfg, folder)

| 조건 | 기대 결과 |
|------|-----------|
| `fileCfg.tier = 'company'` | `'company'` |
| `fileCfg.tier = undefined`, `folder.tier = 'private'` | `'private'` |
| `fileCfg.tier = undefined`, `folder = undefined` | `'public'` |
| `fileCfg.tier = null`, `folder.tier = 'company'` | `'company'` |

---

## 2. changeFileTier(siteConfig, fileHash, newTier)

| 조건 | 기대 결과 |
|------|-----------|
| 존재하지 않는 fileHash | siteConfig 변경 없음 |
| newTier === folderTier | `f.tier` 삭제 (오버라이드 불필요) |
| newTier !== folderTier | `f.tier = newTier` 설정 |
| 파일 A 변경 시 | 파일 B, C는 변경되지 않음 |
| folder가 없는 파일 | folderTier = 'public' 기준으로 비교 |

---

## 3. applyAdminOverrides(siteConfig, cached)

| 조건 | 기대 결과 |
|------|-----------|
| version 일치 | 오버라이드 적용 |
| version 불일치 | 오버라이드 미적용, siteConfig 그대로 |
| `cached.files[hash].tier = 'private'` | `siteConfig.files[hash].tier = 'private'` |
| `cached.files[hash].tier = undefined` | `siteConfig.files[hash].tier` 삭제 |
| `cached.files[hash].shareToken = 'abc123'` | `siteConfig.files[hash].shareToken = 'abc123'` |
| `cached.folders[hash].tier = 'company'` | `siteConfig.folders[hash].tier = 'company'` |
| cached에 없는 file hash | siteConfig 해당 파일 변경 없음 |

---

## 4. generateToken(len)

| 조건 | 기대 결과 |
|------|-----------|
| `generateToken(8)` | 길이 8인 문자열 |
| `generateToken(16)` | 길이 16인 문자열 |
| 결과 | 소문자 + 숫자만 포함 (`/^[a-z0-9]+$/`) |
| 같은 len으로 두 번 호출 | 결과가 (거의 항상) 다름 |

---

## 구현 대상 파일

- `assets/js/site-logic.js` — 순수 함수 모듈 (테스트 가능)
- `index.html` — site-logic.js import 후 내부 인라인 함수 교체
- `test/site-logic.test.js` — Vitest 테스트
