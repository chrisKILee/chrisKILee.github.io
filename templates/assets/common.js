/* =======================================================
   Common shell — must be included as a <script> on every template.
   Auto-wires:
   - Top utility bar (theme toggle, font size, search)
   - Cmd/Ctrl + K search palette (indexes h1..h4 and [data-search])
   - Lightbox (click any .cc-zoomable or img inside <figure>)
   - Copy buttons on .cc-code and elements with [data-copy]
   - Checklist toggling with localStorage
   ======================================================= */
(function () {
  "use strict";

  /* ---------- Theme ---------- */
  const THEME_KEY = "cc-theme";
  const FONT_KEY = "cc-fontsize";

  const html = document.documentElement;
  const initialTheme = (function () {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    // Per spec: default light. Comment out next 2 lines to follow system.
    return "light";
  })();
  html.setAttribute("data-theme", initialTheme);

  function setTheme(t) {
    html.setAttribute("data-theme", t);
    localStorage.setItem(THEME_KEY, t);
    const btn = document.getElementById("cc-theme-btn");
    if (btn) {
      btn.setAttribute("aria-pressed", t === "dark");
      btn.querySelector(".cc-theme-icon").innerHTML = t === "dark" ? sunSvg() : moonSvg();
      btn.title = t === "dark" ? "라이트 모드로" : "다크 모드로";
    }
  }

  function sunSvg() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 3v1.5M12 19.5V21M3 12h1.5M19.5 12H21M5.6 5.6l1.1 1.1M17.3 17.3l1.1 1.1M5.6 18.4l1.1-1.1M17.3 6.7l1.1-1.1"/></svg>';
  }
  function moonSvg() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>';
  }
  function searchSvg() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4-4"/></svg>';
  }

  /* ---------- Font size ---------- */
  const FONT_SIZES = [15, 16, 17, 18, 20, 22];
  let fontIdx = (function () {
    const saved = parseInt(localStorage.getItem(FONT_KEY), 10);
    if (!isNaN(saved) && saved >= 0 && saved < FONT_SIZES.length) return saved;
    return 2;
  })();

  function applyFont() {
    document.documentElement.style.setProperty("--reading-size", FONT_SIZES[fontIdx] + "px");
    localStorage.setItem(FONT_KEY, String(fontIdx));
    const lbl = document.getElementById("cc-font-label");
    if (lbl) lbl.textContent = "Aa·" + FONT_SIZES[fontIdx];
  }

  /* ---------- Build top bar ---------- */
  function buildTopbar() {
    if (document.querySelector(".cc-topbar")) return; // user provided custom
    const bar = document.createElement("div");
    bar.className = "cc-topbar";
    bar.innerHTML = `
      <button class="cc-iconbtn" id="cc-search-btn" title="검색 (⌘K)" aria-label="검색">${searchSvg()}</button>
      <span class="cc-divider"></span>
      <span class="cc-fontctrl" role="group" aria-label="폰트 크기">
        <button class="cc-iconbtn" id="cc-font-down" title="작게">A−</button>
        <span id="cc-font-label">Aa·17</span>
        <button class="cc-iconbtn" id="cc-font-up" title="크게">A+</button>
      </span>
      <span class="cc-divider"></span>
      <button class="cc-iconbtn" id="cc-theme-btn" aria-pressed="false" title="다크 모드 토글" aria-label="테마 토글">
        <span class="cc-theme-icon">${moonSvg()}</span>
      </button>
    `;
    document.body.appendChild(bar);

    document.getElementById("cc-theme-btn").addEventListener("click", () => {
      const cur = html.getAttribute("data-theme");
      setTheme(cur === "dark" ? "light" : "dark");
    });
    document.getElementById("cc-font-up").addEventListener("click", () => {
      fontIdx = Math.min(FONT_SIZES.length - 1, fontIdx + 1); applyFont();
    });
    document.getElementById("cc-font-down").addEventListener("click", () => {
      fontIdx = Math.max(0, fontIdx - 1); applyFont();
    });
    document.getElementById("cc-search-btn").addEventListener("click", openSearch);
  }

  /* ---------- Search palette ---------- */
  let searchIndex = [];
  function buildSearchIndex() {
    searchIndex = [];
    const main = document.querySelector("[data-search-root]") || document.body;
    main.querySelectorAll("h1,h2,h3,h4,[data-search-item]").forEach(el => {
      const text = (el.getAttribute("data-search-text") || el.innerText || "").trim();
      if (!text || text.length < 2) return;
      let id = el.id;
      if (!id) {
        id = "cc-anchor-" + Math.random().toString(36).slice(2, 8);
        el.id = id;
      }
      const kind = el.tagName.toLowerCase().startsWith("h")
        ? el.tagName.toLowerCase()
        : (el.getAttribute("data-search-kind") || "item");
      searchIndex.push({ id, text, kind });
    });
  }

  function buildSearch() {
    if (document.querySelector(".cc-search-overlay")) return;
    const overlay = document.createElement("div");
    overlay.className = "cc-search-overlay";
    overlay.innerHTML = `
      <div class="cc-search" role="dialog" aria-label="검색">
        <input type="text" id="cc-search-input" placeholder="이 문서에서 검색…" autocomplete="off" />
        <div class="cc-search-results" id="cc-search-results"></div>
        <div class="cc-search-hint">
          <span><kbd>↑</kbd> <kbd>↓</kbd> 이동 · <kbd>↵</kbd> 이동 · <kbd>Esc</kbd> 닫기</span>
          <span>${searchIndex.length} indexed</span>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const input = overlay.querySelector("#cc-search-input");
    const list = overlay.querySelector("#cc-search-results");
    let active = 0;
    let results = [];

    function render(q) {
      const query = q.trim().toLowerCase();
      results = !query ? searchIndex.slice(0, 30) : searchIndex.filter(r => r.text.toLowerCase().includes(query)).slice(0, 30);
      active = 0;
      if (!results.length) {
        list.innerHTML = '<div class="cc-search-empty">결과 없음</div>';
        return;
      }
      list.innerHTML = results.map((r, i) => {
        const safe = r.text.replace(/</g, "&lt;");
        const highlighted = query ? safe.replace(new RegExp("(" + escapeRe(query) + ")", "ig"), "<mark>$1</mark>") : safe;
        return `<button class="cc-search-result${i === 0 ? ' active' : ''}" data-i="${i}">
          <span class="cc-sr-kind">${r.kind}</span>${highlighted}
        </button>`;
      }).join("");
      list.querySelectorAll(".cc-search-result").forEach(btn => {
        btn.addEventListener("mouseenter", () => {
          active = parseInt(btn.dataset.i, 10);
          updateActive();
        });
        btn.addEventListener("click", () => go(parseInt(btn.dataset.i, 10)));
      });
    }
    function updateActive() {
      list.querySelectorAll(".cc-search-result").forEach((b, i) => b.classList.toggle("active", i === active));
      const el = list.querySelector(".cc-search-result.active");
      if (el) el.scrollIntoView({ block: "nearest" });
    }
    function go(i) {
      const r = results[i];
      if (!r) return;
      closeSearch();
      const target = document.getElementById(r.id);
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
        target.classList.add("cc-flash");
        setTimeout(() => target.classList.remove("cc-flash"), 1200);
      }
    }

    input.addEventListener("input", e => render(e.target.value));
    input.addEventListener("keydown", e => {
      if (e.key === "ArrowDown") { e.preventDefault(); active = Math.min(results.length - 1, active + 1); updateActive(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); active = Math.max(0, active - 1); updateActive(); }
      else if (e.key === "Enter") { e.preventDefault(); go(active); }
      else if (e.key === "Escape") { closeSearch(); }
    });
    overlay.addEventListener("click", e => { if (e.target === overlay) closeSearch(); });

    overlay._render = render;
    overlay._input = input;
  }

  function openSearch() {
    buildSearchIndex();
    buildSearch();
    const overlay = document.querySelector(".cc-search-overlay");
    overlay.classList.add("open");
    overlay._render("");
    setTimeout(() => overlay._input.focus(), 30);
  }
  function closeSearch() {
    const overlay = document.querySelector(".cc-search-overlay");
    if (overlay) overlay.classList.remove("open");
  }
  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  /* ---------- Lightbox ---------- */
  function buildLightbox() {
    if (document.querySelector(".cc-lightbox")) return;
    const lb = document.createElement("div");
    lb.className = "cc-lightbox";
    lb.innerHTML = `
      <button class="cc-lightbox-close" title="닫기 (Esc)" aria-label="닫기">✕</button>
      <figure><div class="cc-lb-content"></div><figcaption></figcaption></figure>
    `;
    document.body.appendChild(lb);
    lb.addEventListener("click", e => {
      if (e.target === lb || e.target.classList.contains("cc-lightbox-close") || e.target.tagName === "FIGURE") closeLightbox();
    });
  }
  function openLightbox(el) {
    buildLightbox();
    const lb = document.querySelector(".cc-lightbox");
    const content = lb.querySelector(".cc-lb-content");
    const cap = lb.querySelector("figcaption");
    content.innerHTML = "";
    if (el.tagName === "IMG") {
      const im = new Image();
      im.src = el.currentSrc || el.src;
      im.alt = el.alt || "";
      content.appendChild(im);
    } else {
      // clone the placeholder/svg block scaled up
      const clone = el.cloneNode(true);
      clone.classList.add("cc-lb-svg");
      clone.style.aspectRatio = clone.style.aspectRatio || "16/9";
      clone.style.width = "min(80vw, 1200px)";
      clone.style.height = "auto";
      clone.style.maxHeight = "80vh";
      clone.querySelectorAll(".cc-copy").forEach(b => b.remove());
      content.appendChild(clone);
    }
    cap.textContent = el.getAttribute("data-caption") || el.alt || el.querySelector(".cc-ph-label")?.textContent || "";
    lb.classList.add("open");
  }
  function closeLightbox() {
    const lb = document.querySelector(".cc-lightbox");
    if (lb) lb.classList.remove("open");
  }

  /* ---------- Copy buttons ---------- */
  function attachCopyButtons() {
    document.querySelectorAll(".cc-code").forEach(block => {
      if (block.querySelector(".cc-copy")) return;
      const btn = document.createElement("button");
      btn.className = "cc-copy";
      btn.textContent = "Copy";
      btn.addEventListener("click", e => {
        e.stopPropagation();
        const txt = block.querySelector("pre")?.innerText || block.innerText;
        navigator.clipboard.writeText(txt).then(() => {
          btn.textContent = "Copied"; btn.classList.add("copied");
          toast("코드 복사됨");
          setTimeout(() => { btn.textContent = "Copy"; btn.classList.remove("copied"); }, 1400);
        });
      });
      block.appendChild(btn);
    });
    document.querySelectorAll("[data-copy]").forEach(el => {
      if (el.dataset.copyWired) return;
      el.dataset.copyWired = "1";
      el.addEventListener("click", e => {
        e.preventDefault();
        const v = el.getAttribute("data-copy") || el.href || el.textContent;
        navigator.clipboard.writeText(v).then(() => toast("복사됨: " + (v.length > 40 ? v.slice(0, 40) + "…" : v)));
      });
    });
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    let t = document.querySelector(".cc-toast");
    if (!t) {
      t = document.createElement("div");
      t.className = "cc-toast";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 1600);
  }

  /* ---------- Checklist persistence ---------- */
  function wireChecklists() {
    document.querySelectorAll(".cc-checklist").forEach((list, listIdx) => {
      const key = "cc-checklist:" + (list.id || location.pathname + ":" + listIdx);
      let state = {};
      try { state = JSON.parse(localStorage.getItem(key) || "{}"); } catch (_) {}
      list.querySelectorAll("li").forEach((li, i) => {
        const id = li.dataset.id || String(i);
        if (state[id]) li.classList.add("checked");
        li.addEventListener("click", () => {
          li.classList.toggle("checked");
          state[id] = li.classList.contains("checked");
          localStorage.setItem(key, JSON.stringify(state));
        });
      });
    });
  }

  /* ---------- Auto-zoomable figures ---------- */
  function wireZoomable() {
    document.querySelectorAll("figure img, .cc-zoomable, .cc-gallery .cc-placeholder").forEach(el => {
      if (el.dataset.zoomWired) return;
      el.dataset.zoomWired = "1";
      el.classList.add("cc-zoomable");
      el.addEventListener("click", () => openLightbox(el));
    });
  }

  /* ---------- Global key handlers ---------- */
  function wireKeys() {
    document.addEventListener("keydown", e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearch();
      } else if (e.key === "Escape") {
        closeSearch();
        closeLightbox();
      }
    });
  }

  /* ---------- Anchor flash ---------- */
  const styleFlash = document.createElement("style");
  styleFlash.textContent = `.cc-flash { animation: cc-flash 1.2s ease; }
  @keyframes cc-flash { 0%, 100% { background-color: transparent; } 30% { background-color: color-mix(in oklab, var(--accent) 25%, transparent); } }`;
  document.head.appendChild(styleFlash);

  /* ---------- Init ---------- */
  function init() {
    setTheme(initialTheme);
    applyFont();
    buildTopbar();
    buildSearchIndex();
    buildSearch();
    buildLightbox();
    attachCopyButtons();
    wireChecklists();
    wireZoomable();
    wireKeys();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  // expose for templates
  window.CC = { openLightbox, closeLightbox, toast, openSearch, setTheme };
})();
