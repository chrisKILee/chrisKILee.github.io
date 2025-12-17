# Google Gemini API 키 보안 설정 가이드 (도메인 제한)

HTML/JS 기반의 정적 웹사이트(GitHub Pages 등)에서 API 키를 사용할 때, 키가 노출되는 것은 피할 수 없습니다.
따라서 **"키가 노출되어도 내 사이트 외에서는 사용하지 못하게"** 막는 것이 핵심입니다.

## 1. Google Cloud Console 접속
1. [Google Cloud Console](https://console.cloud.google.com/)에 접속합니다.
2. 상단 프로젝트 선택 드롭다운에서 Gemeni API를 사용 중인 프로젝트를 선택합니다.

## 2. API 자격 증명(Credentials) 이동
1. 좌측 메뉴에서 **[API 및 서비스]** > **[자격 증명 (Credentials)]**을 클릭합니다.
2. **API 키 (API Keys)** 목록에서 사용 중인 키(예: `AIzaSy...`)를 클릭하여 수정 화면으로 들어갑니다.

## 3. 웹사이트 제한 설정 (Application Restrictions)
이 설정이 핵심입니다. 지정된 도메인에서 온 요청(Referer)만 허용합니다.

1. **애플리케이션 제한사항 (Application restrictions)** 항목에서 **[웹사이트 (Websites)]**를 선택합니다.
2. **웹사이트 제한사항 (Website restrictions)** 섹션이 나타나면 **[항목 추가 (ADD ITEM)]**를 클릭합니다.
3. 다음 두 가지 패턴을 추가하세요:
    
    - **로컬 테스트용**:
      ```
      http://localhost/*
      http://127.0.0.1/*
      ```
      *(주의: 로컬 개발 서버 포트가 고정적이라면 `http://localhost:5500/*` 처럼 포트까지 지정하는 것이 더 안전합니다)*

    - **배포용 (GitHub Pages)**:
      ```
      https://chrisKILee.github.io/*
      ```
      *(자신의 실제 도메인 주소로 변경하세요)*

4. **[완료 (DONE)]** 및 **[저장 (SAVE)]**을 클릭합니다.

## 4. API 제한 설정 (API Restrictions) - 옵션
키가 탈취되었을 때 다른 고비용 API(예: Google Maps 등)를 쓰지 못하게 Gemini API만 허용합니다.

1. 같은 수정 화면 하단의 **API 제한사항 (API restrictions)** 항목에서 **[키 제한 (Restrict key)]**을 선택합니다.
2. 드롭다운 메뉴에서 **Generative Language API** (또는 Gemini 관련 API)만 체크합니다.
3. **[저장 (SAVE)]**을 클릭합니다.

## 5. 확인
설정 후 약 5분 정도 소요될 수 있습니다.
- 이제 `gemini_config.js`에 키가 그대로 있어도, 해커가 이 키를 훔쳐서 자신의 서버나 포스트맨(Postman)에서 요청을 보내면 `403 Forbidden` 에러가 발생합니다.
- 오직 등록한 `localhost`와 `github.io`에서만 정상 동작합니다.
