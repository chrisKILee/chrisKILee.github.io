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

  const style = document.createElement('style');
  style.textContent = `
    #page-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999;
      height: 48px;
      background: rgba(255,255,255,0.92);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      padding: 0 24px;
      gap: 8px;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 0.875rem;
    }
    #page-header a {
      text-decoration: none;
      color: #6b7280;
      padding: 4px 10px;
      border-radius: 6px;
      transition: all 0.15s;
      font-weight: 500;
    }
    #page-header a:hover { color: #111; background: #f3f4f6; }
    #page-header a.active { color: #059669; background: #ecfdf5; }
    #page-header .ph-sep { color: #e5e7eb; user-select: none; }
    body { padding-top: 48px !important; }
  `;
  document.head.appendChild(style);

  const header = document.createElement('nav');
  header.id = 'page-header';

  const items = NAV_ITEMS.map((item, i) => {
    const active = isActive(item.href) ? ' class="active"' : '';
    const sep = i > 0 ? '<span class="ph-sep">/</span>' : '';
    return `${sep}<a href="${item.href}"${active}>${item.label}</a>`;
  }).join('');

  header.innerHTML = items;
  document.body.insertBefore(header, document.body.firstChild);
})();
