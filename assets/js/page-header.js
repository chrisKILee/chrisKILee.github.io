(function () {
  const NAV_ITEMS = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'About', href: '/about' },
    { label: 'AI Tech Feed', href: '/aifeed/' },
  ];

  const currentPath = location.pathname;

  function isActive(href) {
    if (href === '/') return currentPath === '/';
    return currentPath.startsWith(href);
  }

  // CSS는 head에서 즉시 적용 (body null 여부 무관)
  const style = document.createElement('style');
  style.textContent = `
    #page-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999;
      transform: translateZ(0); /* 독립 compositing layer 강제 */
      height: 48px;
      background: #ffffff;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      gap: 12px;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 0.875rem;
    }
    #page-header .ph-brand {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      color: #111;
      font-weight: 700;
      font-size: 0.9rem;
      flex-shrink: 0;
    }
    #page-header .ph-brand svg { display: block; }
    #page-header .ph-nav {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    #page-header .ph-nav a {
      text-decoration: none;
      color: #6b7280;
      padding: 4px 10px;
      border-radius: 6px;
      transition: all 0.15s;
      font-weight: 500;
    }
    #page-header .ph-nav a:hover { color: #111; background: #f3f4f6; }
    #page-header .ph-nav a.active { color: #059669; background: #ecfdf5; }
    #page-header .ph-sep { color: #e5e7eb; user-select: none; padding: 0 2px; }
    body { padding-top: 48px !important; }
  `;
  document.head.appendChild(style);

  const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="26" height="26">
    <rect x="8"  y="8"  width="16" height="16" rx="2" fill="#F97316"/>
    <rect x="26" y="8"  width="16" height="16" rx="2" fill="#F97316"/>
    <rect x="8"  y="26" width="16" height="16" rx="2" fill="#FED7AA"/>
    <rect x="26" y="26" width="16" height="16" rx="2" fill="#FED7AA"/>
    <rect x="8"  y="44" width="16" height="16" rx="2" fill="#FED7AA"/>
  </svg>`;

  const navItems = NAV_ITEMS.map((item, i) => {
    const active = isActive(item.href) ? ' class="active"' : '';
    const sep = i > 0 ? '<span class="ph-sep">/</span>' : '';
    return `${sep}<a href="${item.href}"${active}>${item.label}</a>`;
  }).join('');

  function insertHeader() {
    if (document.getElementById('page-header')) return;

    const header = document.createElement('nav');
    header.id = 'page-header';
    header.innerHTML = `
      <a class="ph-brand" href="/">${ICON_SVG} Chris Articles</a>
      <div class="ph-nav">${navItems}</div>
    `;
    document.body.insertBefore(header, document.body.firstChild);

    // .topbar / .site-header → fixed 변환: 높이 측정 먼저, 그 후 fixed 전환 + padding 보정
    let extraPad = 0;
    ['topbar', 'site-header'].forEach(cls => {
      document.querySelectorAll('.' + cls).forEach(el => {
        // fixed 전환 전 자연 흐름에서 높이 측정
        const h = el.getBoundingClientRect().height || el.offsetHeight || 56;
        // 배경 투명 여부 확인 후 불투명 배경 강제 (콘텐츠 비침 방지)
        const bg = window.getComputedStyle(el).backgroundColor;
        const isTransparent = !bg || bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent';
        if (isTransparent) {
          const bodyBg = window.getComputedStyle(document.body).backgroundColor;
          el.style.setProperty('background-color', (bodyBg && bodyBg !== 'rgba(0, 0, 0, 0)') ? bodyBg : '#ffffff', 'important');
        }
        el.style.setProperty('position', 'fixed', 'important');
        el.style.setProperty('top', '48px', 'important');
        el.style.setProperty('left', '0', 'important');
        el.style.setProperty('right', '0', 'important');
        el.style.setProperty('z-index', '9998', 'important');
        el.style.setProperty('backdrop-filter', 'none', 'important');
        el.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
        extraPad += h;
      });
    });
    if (extraPad > 0) {
      document.body.style.setProperty('padding-top', (48 + extraPad) + 'px', 'important');
    }

    // .toc-wrap (sticky 사이드 패널) — top/height 보정
    document.querySelectorAll('.toc-wrap').forEach(el => {
      el.style.setProperty('top', '48px', 'important');
      el.style.setProperty('height', 'calc(100vh - 48px)', 'important');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertHeader);
  } else {
    insertHeader();
  }
})();
