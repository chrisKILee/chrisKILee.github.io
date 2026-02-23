import requests
import sys

# 테스트할 베이스 URL (로컬 서버 주소)
BASE_URL = "http://localhost:8000"

# [해시 디렉토리 접근성 테스트]
# (경로, 기대 상태 코드, 설명)
HASH_DIRS = [
    ("/GDEDSE/index.html", 200, "Portal Main"),
    ("/AED13WE/index.html", 200, "R&D Section"),
    ("/BF7K2M9/index.html", 200, "Work Section"),
    ("/C8PQ4X1/index.html", 200, "Travel Section"),
    ("/QT38XYX/index.html", 200, "AI Study Section"),
    ("/RU4TYZ1/index.html", 200, "Private Section"),
    ("/VNTG7S2/index.html", 200, "Life Section"),
    ("/RDH10WS/index.html", 200, "News Section"),
]

# [레거시 디렉토리 차단 테스트]
LEGACY_DIRS = [
    ("/01_rnd/index.html", 404, "Legacy R&D"),
    ("/02_work/index.html", 404, "Legacy Work"),
    ("/03_travel/index.html", 404, "Legacy Travel"),
    ("/04_AI_Study/index.html", 404, "Legacy AI Study"),
    ("/05_Private/index.html", 404, "Legacy Private"),
    ("/06_VNTG_AI_STUDY/index.html", 404, "Legacy Life"),
    ("/07_RD_HOT_NEWS/index.html", 404, "Legacy News"),
]

# [데이터 정합성 테스트]
DATA_FILES = [
    ("/GDEDSE/gdedse_main.js", 200, "Portal Logic"),
    ("/AED13WE/files.json", 200, "R&D Data"),
    ("/RDH10WS/files.json", 200, "News Data"),
]

def run_test(test_list, name, check_content=False):
    print(f"\n--- Running {name} ---")
    passed = 0
    failed = 0
    for path, expected, desc in test_list:
        url = BASE_URL + path
        try:
            resp = requests.get(url, timeout=3)
            status_ok = resp.status_code == expected
            content_ok = True
            
            # Stealth 2.0 검증: 목록으로 돌아가는 링크가 없어야 함
            if check_content and status_ok:
                if 'href="index.html"' in resp.text:
                    print(f"[FAIL] {desc}: Found 'index.html' link (Violation of Stealth 2.0)")
                    content_ok = False
                if 'nav-back' in resp.text:
                    print(f"[FAIL] {desc}: Found 'nav-back' class (Violation of Stealth 2.0)")
                    content_ok = False
                if 'iframe' in resp.text and 'Shadow DOM' not in resp.text:
                     # Simple check for iframe rule compliance
                     if '<iframe' in resp.text:
                        print(f"[WARN] {desc}: Found <iframe> tag. (Ensure it's not used for core content)")

            if status_ok and content_ok:
                print(f"[PASS] {desc}: {path} -> {resp.status_code}")
                passed += 1
            elif not status_ok:
                print(f"[FAIL] {desc}: {path} -> Expected {expected}, got {resp.status_code}")
                failed += 1
            else:
                failed += 1
        except Exception as e:
            print(f"[ERROR] {desc}: {path} -> {str(e)}")
            failed += 1
    return passed, failed

if __name__ == "__main__":
    print(f"Starting Stealth Architecture Verification (API way)")
    print(f"Target: {BASE_URL}")
    
    # 서버 실행 여부 체크
    try:
        requests.get(BASE_URL, timeout=1)
    except:
        print(f"Error: Local server is not running at {BASE_URL}")
        print("Please run 'python3 -m http.server 8000' first.")
        sys.exit(1)

    p1, f1 = run_test(HASH_DIRS, "Hash Directory Accessibility", check_content=True)
    p2, f2 = run_test(LEGACY_DIRS, "Legacy Directory Stealth Check")
    p3, f3 = run_test(DATA_FILES, "Data Integrity Check")

    print("\n" + "="*40)
    print(f"TOTAL: {p1+p2+p3} Passed, {f1+f2+f3} Failed")
    print("="*40)
    
    if f1+f2+f3 > 0:
        sys.exit(1)
    else:
        sys.exit(0)
