/**
 * page-footer.js
 * 각 개별 페이지 하단에 공통 툴바를 추가합니다.
 *
 * 사용법:
 *   <script data-page-hash="FILEHASH" src="/gemini_html/page-footer.js"></script>
 *
 * 기능:
 *   - ← 아카이브로 돌아가기
 *   - ⭐ 즐겨찾기 토글 (gdedse_favs_v1 localStorage 연동)
 *   - 🔗 링크 복사
 */

(function () {
  const FAVS_KEY = 'gdedse_favs_v1';
  const ARCHIVE_URL = '/gemini_html/GDEDSE/';

  // 현재 스크립트 태그에서 페이지 해시 읽기
  const scripts = document.querySelectorAll('script[data-page-hash]');
  const pageHash = scripts[scripts.length - 1]?.dataset?.pageHash || '';

  function getFavs() {
    try {
      return new Set(JSON.parse(localStorage.getItem(FAVS_KEY) || '[]'));
    } catch {
      return new Set();
    }
  }

  function saveFavs(set) {
    localStorage.setItem(FAVS_KEY, JSON.stringify([...set]));
  }

  function isFav() {
    return pageHash ? getFavs().has(pageHash) : false;
  }

  function toggleFav() {
    if (!pageHash) return;
    const favs = getFavs();
    if (favs.has(pageHash)) {
      favs.delete(pageHash);
    } else {
      favs.add(pageHash);
    }
    saveFavs(favs);
    renderState();
  }

  function copyLink() {
    navigator.clipboard.writeText(location.href).then(() => {
      const btn = document.getElementById('pf-copy-btn');
      if (!btn) return;
      const orig = btn.innerHTML;
      btn.innerHTML = '<span class="pf-icon">✓</span><span class="pf-label">복사됨</span>';
      setTimeout(() => { btn.innerHTML = orig; }, 1500);
    });
  }

  function renderState() {
    const starBtn = document.getElementById('pf-star-btn');
    if (!starBtn) return;
    const active = isFav();
    starBtn.classList.toggle('pf-active', active);
    starBtn.innerHTML = active
      ? '<span class="pf-icon">★</span><span class="pf-label">즐겨찾기됨</span>'
      : '<span class="pf-icon">☆</span><span class="pf-label">즐겨찾기</span>';
    starBtn.title = active ? '즐겨찾기 해제' : '즐겨찾기 추가';
  }

  function inject() {
    // 중복 삽입 방지
    if (document.getElementById('page-footer-bar')) return;

    const style = document.createElement('style');
    style.textContent = `
      #page-footer-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 48px;
        background: rgba(14, 14, 11, 0.96);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-top: 1px solid rgba(255,255,255,0.08);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        z-index: 9999;
        font-family: 'Inter', system-ui, sans-serif;
        font-size: 13px;
      }
      #page-footer-bar .pf-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 0 14px;
        height: 32px;
        border-radius: 6px;
        border: 1px solid rgba(255,255,255,0.12);
        background: transparent;
        color: rgba(255,255,255,0.65);
        cursor: pointer;
        text-decoration: none;
        transition: background 0.15s, color 0.15s, border-color 0.15s;
        white-space: nowrap;
        min-width: 44px;
        justify-content: center;
      }
      #page-footer-bar .pf-btn:hover {
        background: rgba(255,255,255,0.1);
        color: rgba(255,255,255,0.9);
        border-color: rgba(255,255,255,0.2);
      }
      #page-footer-bar .pf-btn.pf-active {
        color: #f59e0b;
        border-color: rgba(245,158,11,0.4);
        background: rgba(245,158,11,0.08);
      }
      #page-footer-bar .pf-btn.pf-active:hover {
        background: rgba(245,158,11,0.15);
        border-color: rgba(245,158,11,0.6);
      }
      #page-footer-bar .pf-divider {
        width: 1px;
        height: 20px;
        background: rgba(255,255,255,0.1);
        flex-shrink: 0;
        margin: 0 4px;
      }
      #page-footer-bar .pf-icon { font-size: 14px; line-height: 1; }
      #page-footer-bar .pf-label { font-size: 12px; letter-spacing: 0.01em; }
      @media (max-width: 400px) {
        #page-footer-bar .pf-label { display: none; }
        #page-footer-bar .pf-btn { padding: 0 10px; }
      }
      /* 페이지 하단 여백 — 툴바에 가려지지 않도록 */
      body { padding-bottom: 56px !important; }
    `;
    document.head.appendChild(style);

    const bar = document.createElement('div');
    bar.id = 'page-footer-bar';
    bar.setAttribute('role', 'toolbar');
    bar.setAttribute('aria-label', '페이지 툴바');

    // ← 아카이브
    const backBtn = document.createElement('a');
    backBtn.className = 'pf-btn';
    backBtn.href = ARCHIVE_URL;
    backBtn.title = '아카이브로 돌아가기';
    backBtn.innerHTML = '<span class="pf-icon">←</span><span class="pf-label">아카이브</span>';

    const div1 = document.createElement('div');
    div1.className = 'pf-divider';

    // ⭐ 즐겨찾기
    const starBtn = document.createElement('button');
    starBtn.className = 'pf-btn';
    starBtn.id = 'pf-star-btn';
    starBtn.type = 'button';
    starBtn.addEventListener('click', toggleFav);

    const div2 = document.createElement('div');
    div2.className = 'pf-divider';

    // 🔗 링크 복사
    const copyBtn = document.createElement('button');
    copyBtn.className = 'pf-btn';
    copyBtn.id = 'pf-copy-btn';
    copyBtn.type = 'button';
    copyBtn.title = '링크 복사';
    copyBtn.innerHTML = '<span class="pf-icon">🔗</span><span class="pf-label">링크 복사</span>';
    copyBtn.addEventListener('click', copyLink);

    bar.appendChild(backBtn);
    bar.appendChild(div1);
    if (pageHash) bar.appendChild(starBtn);
    if (pageHash) bar.appendChild(div2);
    bar.appendChild(copyBtn);

    document.body.appendChild(bar);
    renderState();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
