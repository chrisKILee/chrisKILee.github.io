# Gemini SPA Project Constitution

## Core Principles

### 1. Language & Documentation
모든 설명, 작업 내용, 커밋 로그, 문서는 반드시 **한글**로 작성합니다.

### 2. Spec-First Development (선 스펙, 후 구현)
모든 기능 구현 또는 수정 전에 반드시 해당 기능에 대한 **스펙(Specification)**을 먼저 작성하거나 수정해야 합니다. 
- **스펙 위치**: 모든 스펙 문서는 `.specify/specs/` 디렉토리에 위치해야 합니다.
- **절차**: 스펙 작성 -> 사용자 승인 -> 실제 코드 구현 순서를 엄격히 준수합니다.

### 3. Single Page Application (SPA) Security
사용자가 파일 구조를 유추하거나 임의로 탐색할 수 없도록 철저히 격리합니다.
- `index.html` 직접 접근 시 목록 노출 금지 (404 은폐 처리).
- 각 디렉토리별 독립적인 **비밀 마스터 해시**를 통한 접근 제어.
- 서브 페이지 내에서 상위(Portal, Home)로 이동하는 백 버튼이나 링크 노출 금지.

### 4. Zero-Sync Data Management
중복된 설정 파일을 제거하고 런타임에 정적 JSON을 직접 로드하는 방식을 지향합니다.
- `files_config.js` 등 JS 기반 설정을 배제하고 `.json` 데이터를 직접 fetch하여 사용합니다.
- 사용자는 오직 `files.json`만 관리하며, 수정 즉시 브라우저에 반영되어야 합니다.

## Development Workflow

### 로컬 테스트
- 브라우저 보안(CORS) 정책 준수를 위해 반드시 **로컬 서버**(예: `python3 -m http.server`) 환경에서 테스트해야 합니다.

### 위기 관리 및 보안
- 링크를 받은 제3자가 다른 페이지를 유추할 수 없도록 URL 구조를 설계하며, 잘못된 접근 시 파일 존재 유무 자체를 숨깁니다.

**Version**: 1.0.0 | **Ratified**: 2026-02-23 | **Last Amended**: 2026-02-23
