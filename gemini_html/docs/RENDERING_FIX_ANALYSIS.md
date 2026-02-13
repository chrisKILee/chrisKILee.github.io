# Gemini HTML - 렌더링 문제 분석 및 수정 계획

## 1. 프로젝트 아키텍처

```
index.html (진입점)
  └── GDEDSE/index.html (메인 대시보드, Medium 스타일)
         ├── files_config.js (각 폴더별 설정 로드)
         └── gdedse_main.js (카드 렌더링, 검색, 링크 복사)

Hash 폴더 SPA 뷰어 (AED13WE, BF7K2M9, C8PQ4X1, QT38XYX, RU4TYZ1, VNTG7S2)
  └── index.html (각 폴더별 독립 SPA)
       ├── GitHub API → 파일 목록 fetch
       ├── 카드 클릭 → URL hash 변경 → loadContent()
       └── fetch → DOMParser → 본문 주입 (CSS, Script 포함)

콘텐츠 폴더 (01_rnd, 02_work, 03_travel, 04_AI_Study, 05_Private, 06_VNTG_AI_STUDY)
  └── *.html (실제 콘텐츠 파일들)
       ├── Tailwind CDN 사용 파일 다수
       ├── Lucide Icons 사용 파일 존재
       └── 각 파일은 독립 HTML 문서로 작성됨
```

### 매핑 관계
| 콘텐츠 폴더 | Hash 폴더 | 용도 |
|---|---|---|
| 01_rnd | AED13WE | R&D 문서 |
| 02_work | BF7K2M9 | 업무 문서 |
| 03_travel | C8PQ4X1 | 여행 기록 |
| 04_AI_Study | QT38XYX | AI 학습 |
| 05_Private | RU4TYZ1 | 개인 문서 |
| 06_VNTG_AI_STUDY | VNTG7S2 | VNTG AI 스터디 |

## 2. 현재 문제점

### 2.1 핵심 문제: loadContent() 방식의 근본적 한계

각 Hash 폴더의 `index.html`에서 `loadContent()` 함수는 다음과 같이 동작합니다:

```
1. fetch()로 HTML 파일 원본 텍스트 가져옴
2. DOMParser로 파싱
3. <style> 태그 추출 → body/html 셀렉터만 .imported-content로 치환 → document.head에 추가
4. <link rel="stylesheet"> 추출 → document.head에 추가
5. body.innerHTML 추출 → contentFrame에 주입
6. <script> 태그 순차 재생성 → document.body에 추가
```

### 2.2 구체적 렌더링 실패 원인

#### 원인 1: Tailwind CDN 동적 주입 시 무효화 (Critical)
- `roadmap.html`, `andthen-v1.html` 등 다수 파일이 `<script src="https://cdn.tailwindcss.com">` 사용
- Tailwind CDN은 **초기 페이지 로드 시 HTML을 스캔**하여 유틸리티 클래스 CSS를 생성
- `loadContent()`로 동적 주입하면 Tailwind가 이미 초기화된 후라 **모든 유틸리티 클래스 무효화**
- `bg-gray-50`, `text-3xl`, `rounded-2xl`, `flex`, `gap-2` 등 전부 스타일 없음

#### 원인 2: CSS 스코핑 부족 (Major)
```javascript
// 현재 코드 (AED13WE/index.html:459)
style.textContent.replace(/(^|[\s,}])(body|html)([\s,{])/gi, `$1.${SCOPE_CLASS}$3`);
```
- `body`, `html` 셀렉터만 치환 → 부모 페이지의 body 스타일(배경색, 폰트, 패딩)이 콘텐츠에 간섭
- `*` 셀렉터, `:root` 등은 스코핑되지 않음
- 부모와 자식 CSS 변수(--primary 등) 충돌 가능

#### 원인 3: 외부 라이브러리 실행 타이밍 (Major)
- `lucide.createIcons()`: lucide CDN 스크립트 로드 완료 전에 호출될 수 있음
- 인라인 스크립트는 `document.body.appendChild()` 즉시 실행되므로 의존 라이브러리 로드 타이밍 불일치

#### 원인 4: DOMContentLoaded 미발생 (Minor)
- 임포트된 HTML의 스크립트 중 `DOMContentLoaded`를 리스닝하는 경우, 부모 페이지에서는 이미 발생한 이벤트이므로 콜백 실행 안 됨

## 3. 해결 방안: iframe 기반 콘텐츠 렌더링

### 3.1 접근 방식
`DOMParser + innerHTML 주입` 방식을 **`<iframe>` 기반**으로 전환합니다.

### 3.2 장점
| 항목 | DOMParser 주입 (현재) | iframe (수정) |
|---|---|---|
| Tailwind CDN | 동작 안 함 | 정상 동작 |
| CSS 격리 | 수동 스코핑 필요 | 완전 격리 |
| JS 실행 | 타이밍 문제 | 정상 실행 |
| DOMContentLoaded | 미발생 | 정상 발생 |
| 구현 복잡도 | 높음 (500+ 라인) | 낮음 |

### 3.3 수정 대상 파일 (6개)
1. `AED13WE/index.html` (01_rnd 뷰어)
2. `BF7K2M9/index.html` (02_work 뷰어)
3. `C8PQ4X1/index.html` (03_travel 뷰어)
4. `QT38XYX/index.html` (04_AI_Study 뷰어)
5. `RU4TYZ1/index.html` (05_Private 뷰어)
6. `VNTG7S2/index.html` (06_VNTG_AI_STUDY 뷰어)

### 3.4 수정 내용

#### loadContent() 함수 교체

**Before (DOMParser 주입):**
```javascript
async function loadContent(filename) {
    // ~100줄의 복잡한 파싱/주입 로직
    const response = await fetch(CONTENT_BASE_PATH + filename);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    // style 추출, script 재생성 등...
}
```

**After (iframe):**
```javascript
function loadContent(filename) {
    const frame = document.getElementById('contentFrame');
    frame.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.src = CONTENT_BASE_PATH + filename;
    iframe.style.cssText = 'width:100%; border:none; min-height:100vh;';

    // iframe 높이 자동 조절
    iframe.onload = function() {
        try {
            const body = iframe.contentDocument.body;
            const html = iframe.contentDocument.documentElement;
            const height = Math.max(
                body.scrollHeight, body.offsetHeight,
                html.clientHeight, html.scrollHeight, html.offsetHeight
            );
            iframe.style.height = height + 'px';
        } catch(e) {
            iframe.style.height = '100vh';
        }
    };

    frame.appendChild(iframe);
}
```

#### 추가 변경: 스타일 cleanup 로직 제거
- `document.querySelectorAll('.imported-style').forEach(el => el.remove())` 관련 코드 불필요
- `document.querySelectorAll('.imported-script').forEach(...)` 관련 코드 불필요

### 3.5 유지되는 기능
- 파일 목록 표시 (GitHub API 기반)
- 검색 기능
- URL hash 기반 라우팅 (`#filename` → 콘텐츠 표시)
- 뒤로가기 (hashchange 이벤트)

## 4. 리스크 및 고려사항

### 4.1 Same-Origin 정책
- 콘텐츠 파일과 뷰어가 같은 도메인(`chrisKILee.github.io`)에 있으므로 문제 없음
- iframe 높이 자동 조절도 same-origin이라 가능

### 4.2 성능
- iframe은 별도 문서 컨텍스트를 생성하므로 약간의 오버헤드
- 하지만 단일 문서만 로드하므로 체감 차이 미미

### 4.3 모바일 호환성
- iframe 스크롤이 모바일에서 부자연스러울 수 있음
- `min-height: 100vh` + 동적 높이 조절로 대응

## 5. 실행 계획

1. 6개 Hash 폴더의 `index.html`에서 `loadContent()` 함수를 iframe 방식으로 교체
2. 불필요해진 스타일/스크립트 cleanup 코드 제거
3. iframe 높이 자동 조절 로직 추가
4. 테스트: 각 폴더에서 최소 1개 파일 렌더링 확인
