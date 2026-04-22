/**
 * site-logic.js — 순수 함수 모듈 (테스트 가능)
 * index.html에서 <script type="module" src="/assets/js/site-logic.js"> 로 로드
 */

export function getEffectiveTier(fileCfg, folder) {
  return fileCfg?.tier || folder?.tier || 'public';
}

export function changeFileTier(siteConfig, fileHash, newTier) {
  const f = siteConfig.files && siteConfig.files[fileHash];
  if (!f) return;
  const folder = siteConfig.folders && siteConfig.folders[f.categoryHash];
  const folderTier = folder?.tier || 'public';
  if (newTier === folderTier) {
    delete f.tier;
  } else {
    f.tier = newTier;
  }
}

export function applyAdminOverrides(siteConfig, cached) {
  if (cached.version !== siteConfig.version) return;

  (siteConfig.directories || []).forEach(dir => {
    const c = (cached.directories || []).find(d => d.id === dir.id);
    if (c) {
      ['visible', 'collapsed', 'order'].forEach(k => {
        if (c[k] !== undefined) dir[k] = c[k];
      });
    }
  });
  (cached.directories || []).forEach(cDir => {
    if (!siteConfig.directories.find(d => d.id === cDir.id)) {
      siteConfig.directories.push(cDir);
    }
  });

  Object.entries(cached.folders || {}).forEach(([hash, cCfg]) => {
    if (siteConfig.folders[hash]) {
      ['visible', 'collapsed', 'order', 'dirId', 'tier'].forEach(k => {
        if (cCfg[k] !== undefined) siteConfig.folders[hash][k] = cCfg[k];
      });
    } else {
      siteConfig.folders[hash] = cCfg;
    }
  });

  Object.entries(cached.files || {}).forEach(([hash, cFile]) => {
    if (!siteConfig.files[hash]) return;
    ['visible', 'order', 'categoryHash', 'memo', 'isFavorite', 'tier', 'shareToken'].forEach(k => {
      if (cFile[k] !== undefined) {
        siteConfig.files[hash][k] = cFile[k];
      } else if (k === 'tier' || k === 'shareToken') {
        delete siteConfig.files[hash][k];
      }
    });
  });
}

export function computeFilePath(fileCfg, folder) {
  const tier = fileCfg?.tier || folder?.tier || 'public';
  const slug = folder?.slug || '';
  const prefix = tier === 'private' ? '/s/' : tier === 'company' ? '/c/' : '/';
  return `${prefix}${slug}/${fileCfg.filename}`;
}

export function generateToken(len = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
