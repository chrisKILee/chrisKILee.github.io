# Cloudflare Access 설정 가이드

## 1. GCP Console — OAuth 2.0 클라이언트 생성

1. https://console.cloud.google.com 접속
2. APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID
3. 애플리케이션 유형: **Web application**
4. 이름: `page.chrisnolja.dev`
5. 승인된 리디렉션 URI:
   ```
   https://[your-team].cloudflareaccess.com/cdn-cgi/access/callback
   ```
   (Cloudflare Zero Trust → Settings → Authentication 에서 팀 도메인 확인)
6. Client ID / Client Secret 복사 → Cloudflare에서 사용

---

## 2. Cloudflare Zero Trust — Google IdP 설정

1. Cloudflare Dashboard → Zero Trust
2. Settings → Authentication → Add new
3. **Google** 선택
4. Client ID / Secret 입력 → Save

---

## 3. Cloudflare Access Applications 생성

### 3-1. Company Zone (`/c/*`)

1. Access → Applications → Add an application → **Self-hosted**
2. App name: `company-zone`
3. App domain: `page.chrisnolja.dev`
4. Path: `c/*`
5. Session duration: 24 hours
6. **Policy 추가**:
   - Rule name: `vntg-seah-company`
   - Action: Allow
   - Include: Email domain → `vntgcorp.com`, `seah.co.kr`

### 3-2. Private Zone (`/s/*`)

1. Add application → Self-hosted
2. App name: `private-zone`
3. App domain: `page.chrisnolja.dev`
4. Path: `s/*`
5. Session duration: 24 hours
6. **Policy 추가**:
   - Rule name: `admin-only`
   - Action: Allow
   - Include: Emails → `bitjjangi@gmail.com`, `chris@vntgcorp.com`

### 3-3. Share Bypass (`/share/*`)

1. Add application → Self-hosted
2. App name: `share-bypass`
3. App domain: `page.chrisnolja.dev`
4. Path: `share/*`
5. **Policy 추가**:
   - Rule name: `public-bypass`
   - Action: **Bypass** (인증 없이 통과)
   - Include: Everyone

---

## 4. 동작 검증

```
✅ page.chrisnolja.dev/          → 인증 없이 접근 가능
✅ page.chrisnolja.dev/ai-study/ → 인증 없이 접근 가능
🔐 page.chrisnolja.dev/c/work/   → Google 로그인 요구 (vntgcorp/seah 도메인만)
🔐 page.chrisnolja.dev/s/private/ → Google 로그인 요구 (2개 이메일만)
✅ page.chrisnolja.dev/share/xxx  → 인증 없이 접근 가능 (bypass)
```

---

## 5. 주의사항

- Cloudflare Access는 GitHub Pages 앞에서 동작 — GitHub repo가 public이어도 URL 직접 접근 차단됨
- `share/` 경로는 bypass이므로 토큰 유출 시 누구나 접근 가능. 토큰 삭제 = 파일 삭제로 차단.
- 세션 만료(24h) 후 재로그인 필요
