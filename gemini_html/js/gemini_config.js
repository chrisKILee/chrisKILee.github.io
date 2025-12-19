// Global Configuration for Gemini API
// This file is loaded by individual pages to access the shared API key.
// Usage: const apiKey = GEMINI_CONFIG.API_KEY;

const GEMINI_CONFIG = {
    get API_KEY() {
        // 1. Try to get key from local storage
        let key = localStorage.getItem('GEMINI_API_KEY');

        // 2. If not found, ask user
        if (!key) {
            key = prompt("🔑 Google Gemini API Key를 입력해주세요.\n(입력된 키는 브라우저 로컬 스토리지에 안전하게 저장됩니다.)");
            if (key) {
                // 3. Save to local storage
                localStorage.setItem('GEMINI_API_KEY', key.trim());
            } else {
                console.warn("API Key input cancelled.");
                return "";
            }
        }
        return key;
    },

    // Helper to clear key if needed (can be called from console)
    resetKey: function () {
        localStorage.removeItem('GEMINI_API_KEY');
        alert("API Key가 삭제되었습니다. 페이지를 새로고침하면 다시 입력할 수 있습니다.");
        location.reload();
    }
};
