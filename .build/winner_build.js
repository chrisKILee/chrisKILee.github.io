#!/usr/bin/env node
// Build winner directory from existing candidate guide pages

const fs = require('fs');
const path = require('path');

const REPO = '/home/chris/git/chrisKILee.github.io';
const SRC = path.join(REPO, 'gemini_html');
const OUT = path.join(REPO, 'winner');
const CANDIDATES_DIR = path.join(OUT, 'candidates');
const REDIRECT_DIR = path.join(REPO, 'aive-contest-2026');

// Ensure output dirs
fs.mkdirSync(CANDIDATES_DIR, { recursive: true });
fs.mkdirSync(REDIRECT_DIR, { recursive: true });

// 1. Read site.json and gather QWW59US candidates (exclude 이광일)
const site = JSON.parse(fs.readFileSync(path.join(SRC, 'site.json'), 'utf8'));
const allCands = Object.entries(site.files || {})
  .filter(([, f]) => f.categoryHash === 'QWW59US' && f.visible !== false)
  .map(([hash, f]) => ({
    hash,
    filename: f.filename,
    displayName: f.displayName,
    score: f.score,
    memo: f.memo,
    createdAt: f.createdAt,
    order: f.order || 999,
  }))
  .filter(c => !c.filename.startsWith('이광일') && !c.filename.includes('criteria'))
  .sort((a, b) => {
    const sa = a.score ?? -1, sb = b.score ?? -1;
    if (sb !== sa) return sb - sa;
    return a.order - b.order;
  });

console.log(`Found ${allCands.length} candidates (이광일 excluded)`);

// 2. Helper: pick representative image per candidate
//    Strategy: first screenshot-like image (skip icon/logo)
function pickRepImage(html, name) {
  // Known good per awardee
  const overrides = {
    '박영민': '/gemini_html/assets/3.1_MES_아키텍처_소개_p1.png',
    '정주현': '/gemini_html/images/backup_monitoring_dashboard/image-20260311-015133.png',
    '정혜나': '/gemini_html/assets/screen1_정혜나.png',
    '김주희': '/gemini_html/assets/1-1._메인.png',
    '조은서': '/gemini_html/assets/00_main.jpg',
    '안종성': '/gemini_html/assets/AI 기반 로그 분석 시스템_01.png',
  };
  for (const k of Object.keys(overrides)) {
    if (name.startsWith(k)) return { src: overrides[k], alt: name };
  }

  // Fallback: scan for first <img src="..."> that's not tailwind/CDN
  const re = /<img[^>]*src=["']([^"']+)["'][^>]*>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const src = m[1];
    if (src.startsWith('https://') || src.startsWith('data:')) continue;
    if (src.includes('favicon')) continue;
    // Resolve to absolute /gemini_html/ path
    let resolved = src;
    if (!src.startsWith('/')) resolved = '/gemini_html/' + src;
    return { src: resolved, alt: name };
  }
  return null;
}

// 3. Transform a single candidate page
function transformPage(srcName) {
  const srcPath = path.join(SRC, srcName);
  let html = fs.readFileSync(srcPath, 'utf8');

  const displayName = srcName.replace('-guide.html', '');

  // Pick representative image BEFORE any mutation
  const repImg = pickRepImage(html, displayName);
  if (repImg) {
    const fixes = {
      '/gemini_html/assets/screenshot.jpg': '/gemini_html/assets/assets/screenshot.jpg',
      '/gemini_html/assets/screenshot.png': '/gemini_html/assets/정선우-screenshot.png',
      '/gemini_html/assets/screen1.png': '/gemini_html/assets/screen1_정혜나.png',
      '/gemini_html/assets/screen2.png': '/gemini_html/contents/3JDHPAR/screen2.png',
      '/gemini_html/assets/에이전트1.png': '/gemini_html/assets/최윤희/에이전트1.png',
      '/gemini_html/assets/에이전트2.png': '/gemini_html/assets/최윤희/에이전트2.png',
      '/gemini_html/assets/자동화 화면1.png': '/gemini_html/assets/최윤희/자동화 화면1.png',
      '/gemini_html/assets/발송화면.png': '/gemini_html/assets/최윤희/발송화면.png',
    };
    if (fixes[repImg.src]) repImg.src = fixes[repImg.src];
  }

  // A. Rewrite relative asset paths to absolute /gemini_html/ paths
  // A1. HTML attributes: src="assets/..." / href="assets/..."
  html = html.replace(/(src|href)=["']assets\//g, '$1="/gemini_html/assets/');
  // A2. JS string literals inside initGallery(): {src:"assets/..."} / {src:'assets/...'}
  //     Also data-src and inline style url(assets/...)
  html = html.replace(/(\bsrc\s*:\s*)(["'])assets\//g, '$1$2/gemini_html/assets/');
  html = html.replace(/(\bdata-src\s*=\s*)(["'])assets\//g, '$1$2/gemini_html/assets/');
  html = html.replace(/url\(\s*(['"]?)assets\//g, 'url($1/gemini_html/assets/');
  // A3. Map known misplaced/renamed assets to actual disk paths
  const assetFixes = {
    // 이기완 screenshot lives at /gemini_html/assets/assets/screenshot.jpg
    '/gemini_html/assets/screenshot.jpg': '/gemini_html/assets/assets/screenshot.jpg',
    // 정선우 screenshot renamed with prefix
    '/gemini_html/assets/screenshot.png': '/gemini_html/assets/정선우-screenshot.png',
    // 정혜나 screen1 renamed (screen2 lives elsewhere, screen3 missing)
    '/gemini_html/assets/screen1.png': '/gemini_html/assets/screen1_정혜나.png',
    '/gemini_html/assets/screen2.png': '/gemini_html/contents/3JDHPAR/screen2.png',
    // 최윤희 images moved into subdirectory
    '/gemini_html/assets/에이전트1.png': '/gemini_html/assets/최윤희/에이전트1.png',
    '/gemini_html/assets/에이전트2.png': '/gemini_html/assets/최윤희/에이전트2.png',
    '/gemini_html/assets/자동화 화면1.png': '/gemini_html/assets/최윤희/자동화 화면1.png',
    '/gemini_html/assets/발송화면.png': '/gemini_html/assets/최윤희/발송화면.png',
  };
  function applyAssetFixes(s) {
    if (!s) return s;
    for (const [from, to] of Object.entries(assetFixes)) {
      s = s.split(from).join(to);
    }
    return s;
  }
  html = applyAssetFixes(html);

  // A4. Remove references to assets that don't exist anywhere (정혜나 screen3)
  //     Strip the entire <img ...> tag and corresponding initGallery entries
  const deadAssets = ['/gemini_html/assets/screen3.png'];
  for (const dead of deadAssets) {
    // Remove <img> tags whose src is the dead asset
    const imgTagRe = new RegExp('<img[^>]*src=["\']' + dead.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '["\'][^>]*>', 'g');
    html = html.replace(imgTagRe, '');
    // Remove gallery object entries: {src:"...dead..."[, alt:"..."]},
    const galRe = new RegExp('\\{[^}]*src\\s*:\\s*["\']' + dead.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '["\'][^}]*\\}\\s*,?', 'g');
    html = html.replace(galRe, '');
    // Clean trailing commas in arrays
    html = html.replace(/,(\s*\])/g, '$1');
  }

  // Rewrite favicon href path
  // (already absolute in most cases, but ensure)
  html = html.replace(/href=["']\/gemini_html\/favicon\.svg["']/g, 'href="/gemini_html/favicon.svg"');

  // B. Remove score chip from sticky header
  //    Match: <span class="mono" style="...">NN점</span> appearing in header area
  //    Remove any span containing just a number + "점"
  html = html.replace(
    /<span class="mono" style="[^"]*">\s*\d+점\s*<\/span>/g,
    ''
  );

  // C. Remove score spans inside eval-cards (patterns like 33<span ...>/35</span>)
  //    Match: <span class="mono" style="...NNpx;...">NN<span style="...">/NN</span></span>
  //    But NOT the big 종합점수 (52px) — we'll handle that block separately below
  //    Heuristic: score spans with font-size:20px (eval-card)
  html = html.replace(
    /<span class="mono" style="font-size:20px[^"]*">\s*\d+\s*<span style="[^"]*">\s*\/\s*\d+\s*<\/span>\s*<\/span>/g,
    ''
  );

  // D. Replace 점수 패널 block with representative image (or remove if no image)
  //    Primary anchor: <!-- 점수 패널 --> comment.
  //    Fallback anchor: the <div ...> that directly contains <p ...>종합 점수</p>
  const panelComment = '<!-- 점수 패널 -->';
  let panelStart = html.indexOf(panelComment);
  let divStart;
  if (panelStart !== -1) {
    divStart = html.indexOf('<div', panelStart);
  } else {
    // Fallback: locate "종합 점수" label, walk backwards to the nearest opening <div ...>
    const labelRe = /<p[^>]*class="eval-label"[^>]*>\s*종합\s*점수\s*<\/p>/;
    const labelMatch = labelRe.exec(html);
    if (labelMatch) {
      const labelPos = labelMatch.index;
      // Find most recent <div ...> before labelPos at the same nesting depth.
      // Simple heuristic: walk backwards and find "<div" whose matching close contains labelPos.
      // Scan all <div ...> positions up to labelPos, keep track of depth.
      let scan = 0;
      const opens = [];
      const openRe = /<div\b/g;
      const closeRe = /<\/div>/g;
      while (scan < labelPos) {
        const nextOpen = html.indexOf('<div', scan);
        const nextClose = html.indexOf('</div>', scan);
        if (nextOpen === -1 || nextOpen >= labelPos) break;
        if (nextClose !== -1 && nextClose < nextOpen) {
          opens.pop();
          scan = nextClose + 6;
        } else {
          opens.push(nextOpen);
          scan = nextOpen + 4;
        }
      }
      // Handle closes between scan and labelPos — but we just need the current open stack
      // Close any that happen between scan and labelPos
      let s = scan;
      while (s < labelPos) {
        const nextClose = html.indexOf('</div>', s);
        const nextOpen = html.indexOf('<div', s);
        if (nextClose === -1 || nextClose >= labelPos) break;
        if (nextOpen !== -1 && nextOpen < nextClose) {
          opens.push(nextOpen);
          s = nextOpen + 4;
        } else {
          opens.pop();
          s = nextClose + 6;
        }
      }
      if (opens.length > 0) {
        panelStart = opens[opens.length - 1];
        divStart = panelStart;
      }
    }
  }
  if (panelStart !== undefined && panelStart !== -1 && divStart !== undefined && divStart !== -1) {
    {
      // Balance div tags
      let depth = 0;
      let i = divStart;
      const len = html.length;
      let divEnd = -1;
      while (i < len) {
        if (html.substr(i, 4) === '<div') {
          depth++;
          i += 4;
          continue;
        }
        if (html.substr(i, 6) === '</div>') {
          depth--;
          i += 6;
          if (depth === 0) { divEnd = i; break; }
          continue;
        }
        i++;
      }
      if (divEnd !== -1) {
        let replacement = '';
        if (repImg) {
          replacement = `<div style="min-width:280px; max-width:420px; flex:0 0 auto;">
          <div style="border-radius:16px; overflow:hidden; border:1px solid #e8d5c0; box-shadow:0 18px 40px -18px rgba(0,0,0,0.25);">
            <img src="${repImg.src}" alt="${repImg.alt} 대표 이미지" loading="lazy" style="width:100%; height:auto; display:block;" />
          </div>
          <p style="margin-top:10px; font-size:11px; color:#a8a29e; letter-spacing:0.06em; text-align:center; font-weight:600; text-transform:uppercase;">Representative Screen</p>
        </div>`;
        } else {
          // No image — show a 최종후보 emblem card
          replacement = `<div style="min-width:260px; max-width:320px; flex:0 0 auto;">
          <div style="background:linear-gradient(135deg, #fdf0e8 0%, #fffaf6 100%); border:1px solid #e8d5c0; border-radius:16px; padding:36px 24px; text-align:center; box-shadow:0 18px 40px -18px rgba(0,0,0,0.15);">
            <div style="font-size:46px; line-height:1; margin-bottom:14px;">🏅</div>
            <div style="font-family:'Cormorant Garamond',serif; font-size:22px; color:#c8622a; font-weight:600; letter-spacing:-0.01em; line-height:1.2; margin-bottom:8px;">최종후보</div>
            <div style="font-size:11px; color:#b5895a; letter-spacing:0.2em; text-transform:uppercase; font-weight:700;">AI-WORKER · 2026</div>
          </div>
        </div>`;
        }
        html = html.substring(0, panelStart) + replacement + html.substring(divEnd);
      }
    }
  }

  // E. Remove "종합 점수" text if any lingering (defensive)
  html = html.replace(/<p class="eval-label"[^>]*>\s*종합\s*점수\s*<\/p>/g, '');

  // E2. Remove category-score labels left inside any residual score cards
  //     Pattern: <div>③ 효율성 /35</div> etc. — only if inside remaining panel fragments
  html = html.replace(/<div[^>]*font-size:10px[^>]*>\s*[③④⑤⑥]\s*[^<]*?\/[0-9]+\s*<\/div>/g, '');

  // E3. Sanitize inline score phrases in text content
  //     Remove parenthesized mentions of 점 anywhere: "(+3점 가점)", "(기본 28점+실배포 가점 +3)"
  html = html.replace(/\s*\([^)]*?\d+\s*점[^)]*?\)/g, '');
  //     Remove "만점 대비 -8점", standalone score diffs like "+3점 가점"
  html = html.replace(/\s*만점\s*대비\s*[+-]?\s*\d+\s*점[으로]*/g, '');
  html = html.replace(/\s*[+-]\s*\d+\s*점\s*(?:가점|감점)?/g, '');
  //     Remove "30~35점 구간 적용"
  html = html.replace(/\s*\d+\s*~\s*\d+\s*점\s*구간(?:\s*적용)?/g, '');
  //     Remove trailing orphan commas/spaces inside span bullets
  html = html.replace(/,\s*(?=<\/span>)/g, '');
  html = html.replace(/\.\s*\./g, '.');

  // F. Convert eval-card paragraphs (the ③④⑤⑥ cards) into bullet emoji lists
  //    Pattern: within eval-card div, find the first <p ...>text</p> after the header row, split into bullets.
  html = html.replace(
    /(<div class="eval-card">[\s\S]*?<span class="eval-label">[^<]+<\/span>\s*)((?:<span[\s\S]*?<\/span>)?\s*<\/div>\s*)([\s\S]*?)(<\/div>)/g,
    (full, head, midClose, body, tail) => {
      // body is the content after the header row inside the eval-card
      // Find <p>...</p> and convert
      const pMatch = body.match(/<p([^>]*)>([\s\S]*?)<\/p>/);
      if (!pMatch) return full;
      const attrs = pMatch[1];
      const text = pMatch[2].trim();
      // Split into sentences by period/em-dash
      const sentences = text
        .split(/(?<=[\.。!?])\s+|(?<=\.\s+)|(?<=[\.。!?])(?=<)/)
        .map(s => s.trim())
        .filter(Boolean);
      const emojis = ['🎯', '💡', '📊', '🚀', '⚙️', '✨'];
      const lis = sentences.map((s, i) => {
        const emoji = emojis[i % emojis.length];
        return `<li style="display:flex; gap:10px; align-items:flex-start; font-size:14px; color:#44403c; line-height:1.7; padding:4px 0;"><span style="flex-shrink:0;">${emoji}</span><span>${s}</span></li>`;
      }).join('');
      const bulletList = `<ul style="list-style:none; padding:0; margin:0;">${lis}</ul>`;
      const replacedBody = body.replace(pMatch[0], bulletList);
      return head + midClose + replacedBody + tail;
    }
  );

  // G. Header alignment fix — the score chip removal may leave an empty flex gap; harmless.

  // H. Title tag: change "AIVE-CONTEST 2025" to "AI-WORKER 최종후보"
  html = html.replace(
    /<title>([^<]+)— AIVE-CONTEST 2025<\/title>/,
    '<title>$1— 최종후보</title>'
  );
  html = html.replace(/AIVE-CONTEST 2025/g, 'AI-WORKER 최종후보');
  html = html.replace(/🏆 AIVE-CONTEST/g, '🏅 최종후보');
  html = html.replace(/AIVE-CONTEST/g, 'AI-WORKER CONTEST');

  return html;
}

// 4. Process each candidate
const processed = [];
for (const c of allCands) {
  try {
    const html = transformPage(c.filename);
    const outName = c.filename.replace('-guide.html', '.html');
    fs.writeFileSync(path.join(CANDIDATES_DIR, outName), html, 'utf8');
    processed.push({ ...c, outName });
    console.log(`  ✓ ${c.filename} → candidates/${outName}`);
  } catch (e) {
    console.error(`  ✗ ${c.filename}: ${e.message}`);
  }
}

console.log(`\nProcessed ${processed.length} candidates`);

// 5. Build landing page at /winner/index.html
const landingHtml = buildLandingPage(processed);
fs.writeFileSync(path.join(OUT, 'index.html'), landingHtml, 'utf8');
console.log('✓ Landing page → /winner/index.html');

// 6. Build redirect page at /aive-contest-2026/index.html
const redirectHtml = buildRedirectPage();
fs.writeFileSync(path.join(REDIRECT_DIR, 'index.html'), redirectHtml, 'utf8');
console.log('✓ Redirect page → /aive-contest-2026/index.html');

// -------------------- Builders --------------------

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function buildLandingPage(cands) {
  // Group by category (dev / non-dev) — here we show as single grid with 최종후보 badge
  // Candidate card: displayName, project, link to /winner/candidates/{name}.html
  const cards = cands.map(c => {
    const memo = c.memo || '';
    // Split "이름-프로젝트" display
    const dashIdx = c.displayName.indexOf('-');
    const person = dashIdx > 0 ? c.displayName.slice(0, dashIdx) : c.displayName;
    const project = dashIdx > 0 ? c.displayName.slice(dashIdx + 1) : '';
    const isFinalist = true; // all shown here are 최종후보
    return `
      <a href="candidates/${escapeHtml(c.outName)}" class="card">
        <div class="card-badges">
          ${isFinalist ? '<span class="badge finalist">🏅 최종후보</span>' : ''}
          ${memo ? `<span class="badge cat">${escapeHtml(memo)}</span>` : ''}
        </div>
        <div class="card-person">${escapeHtml(person)}</div>
        <div class="card-project">${escapeHtml(project)}</div>
        <div class="card-arrow">→</div>
      </a>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI-WORKER CONTEST — 최종후보 25</title>
  <link rel="icon" type="image/svg+xml" href="/gemini_html/favicon.svg">
  <meta name="robots" content="noindex, nofollow">
  <link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&family=Cormorant+Garamond:wght@500;600&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #f5f3ee; color: #1c1917; line-height: 1.65;
      -webkit-font-smoothing: antialiased;
    }
    .mono { font-family: 'DM Mono', ui-monospace, monospace; }
    .display { font-family: 'Cormorant Garamond', serif; letter-spacing: -0.01em; }
    header.top {
      position: sticky; top: 0; z-index: 50;
      background: rgba(245,243,238,0.94);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid #d6d0c4;
    }
    .top-inner {
      max-width: 1180px; margin: 0 auto; padding: 0 28px; height: 60px;
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
    }
    .brand {
      display: flex; align-items: center; gap: 10px;
      font-size: 11px; font-weight: 800; color: #c8622a;
      letter-spacing: 0.07em;
    }
    .top-meta {
      font-family: 'DM Mono', monospace; font-size: 11px;
      color: #a8a29e; letter-spacing: 0.08em;
    }

    main { max-width: 1180px; margin: 0 auto; padding: 48px 28px 96px; }

    /* Hero */
    .hero { text-align: center; margin-bottom: 56px; }
    .hero .eyebrow {
      font-family: 'DM Mono', monospace; font-size: 11px;
      letter-spacing: 0.25em; text-transform: uppercase;
      color: #c8622a; margin-bottom: 18px;
    }
    .hero h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2.4rem, 5vw, 4rem);
      font-weight: 500; line-height: 1.08; color: #1c1917;
      margin-bottom: 14px;
    }
    .hero .sub {
      font-size: 15px; color: #78716c; line-height: 1.7;
      max-width: 52ch; margin: 0 auto;
    }

    /* Criteria section (first, prominent) */
    .criteria {
      background: #fffaf6;
      border: 1px solid #e8d5c0; border-radius: 18px;
      padding: 36px 40px; margin-bottom: 60px;
    }
    .criteria-head {
      display: flex; align-items: baseline; justify-content: space-between;
      flex-wrap: wrap; gap: 12px; margin-bottom: 24px;
    }
    .criteria-head h2 {
      font-size: 22px; font-weight: 700; color: #1c1917;
    }
    .criteria-head .tag {
      font-family: 'DM Mono', monospace; font-size: 10px;
      letter-spacing: 0.2em; color: #b5895a; text-transform: uppercase;
    }
    .criteria-grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
    }
    .crit-card {
      background: #fff; border: 1px solid #e8d5c0; border-radius: 12px;
      padding: 20px 18px; position: relative;
    }
    .crit-idx {
      font-family: 'DM Mono', monospace; font-size: 10px;
      color: #c8622a; letter-spacing: 0.2em; margin-bottom: 8px;
    }
    .crit-name { font-size: 15px; font-weight: 700; color: #1c1917; margin-bottom: 8px; }
    .crit-desc { font-size: 13px; color: #78716c; line-height: 1.6; }

    .criteria-note {
      margin-top: 20px; padding-top: 18px; border-top: 1px dashed #d6d0c4;
      font-size: 13px; color: #78716c; line-height: 1.7;
    }
    .criteria-note strong { color: #c8622a; font-weight: 600; }

    /* Grid */
    .section-label {
      font-family: 'DM Mono', monospace; font-size: 11px;
      letter-spacing: 0.2em; text-transform: uppercase;
      color: #b5895a; margin-bottom: 16px;
    }
    .grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }
    .card {
      display: block; position: relative;
      background: #fff; border: 1px solid #d6d0c4;
      border-radius: 14px; padding: 22px 22px 58px;
      color: inherit; text-decoration: none;
      transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
    }
    .card:hover {
      transform: translateY(-3px);
      box-shadow: 0 20px 40px -16px rgba(0,0,0,0.18);
      border-color: #c8622a;
    }
    .card-badges {
      display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px;
      min-height: 22px;
    }
    .badge {
      display: inline-flex; align-items: center;
      font-family: 'DM Mono', monospace;
      font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
      padding: 4px 10px; border-radius: 999px; text-transform: uppercase;
    }
    .badge.finalist {
      background: #fdf0e8; color: #c8622a; border: 1px solid #e8b896;
      text-transform: none;
      letter-spacing: 0.04em;
    }
    .badge.cat {
      background: #f5f3ee; color: #78716c; border: 1px solid #d6d0c4;
      text-transform: none;
    }
    .card-person {
      font-family: 'Cormorant Garamond', serif;
      font-size: 28px; font-weight: 500;
      color: #1c1917; margin-bottom: 4px; line-height: 1;
    }
    .card-project {
      font-size: 14px; color: #44403c; line-height: 1.5;
      display: -webkit-box; -webkit-line-clamp: 2;
      -webkit-box-orient: vertical; overflow: hidden;
    }
    .card-arrow {
      position: absolute; bottom: 20px; right: 22px;
      font-size: 18px; color: #c8622a;
      opacity: 0.4; transition: opacity 0.18s, transform 0.18s;
    }
    .card:hover .card-arrow { opacity: 1; transform: translateX(3px); }

    footer {
      max-width: 1180px; margin: 80px auto 0;
      padding: 28px 28px 60px;
      border-top: 1px solid #d6d0c4;
      font-family: 'DM Mono', monospace;
      font-size: 11px; letter-spacing: 0.15em;
      color: #a8a29e; text-transform: uppercase;
      text-align: center;
    }

    @media (max-width: 768px) {
      .criteria-grid { grid-template-columns: repeat(2, 1fr); }
      .criteria { padding: 28px 22px; }
      .hero h1 { font-size: 2.2rem; }
    }
    @media (max-width: 480px) {
      .criteria-grid { grid-template-columns: 1fr; }
    }
    @media (prefers-reduced-motion: reduce) {
      .card { transition: none; }
      .card:hover { transform: none; }
    }
  </style>
</head>
<body>
  <header class="top">
    <div class="top-inner">
      <span class="brand">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M6 3h12v9a6 6 0 01-12 0V3z" fill="#c8622a" fill-opacity="0.18" stroke="#c8622a" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M9 18.5v2M15 18.5v2M7 20.5h10" stroke="#c8622a" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        AI-WORKER CONTEST · 2026
      </span>
      <span class="top-meta">${cands.length} FINALISTS</span>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="eyebrow">Final Candidates</div>
      <h1 class="display">최종후보 ${cands.length}명</h1>
      <p class="sub">각자의 자리에서, 자기 업무의 수작업 하나를 없앤 사람들.<br/>2026 AI-WORKER CONTEST 최종 심사에 오른 과제입니다.</p>
    </section>

    <!-- 평가 기준 (맨 처음) -->
    <section class="criteria">
      <div class="criteria-head">
        <h2>평가 기준</h2>
        <span class="tag">Criteria · Level 3 AI-WORKER</span>
      </div>
      <div class="criteria-grid">
        <div class="crit-card">
          <div class="crit-idx">/01</div>
          <div class="crit-name">업무 효율성</div>
          <div class="crit-desc">내 일을 얼마나 실질적으로 줄였는가. 수치·사례로 검증 가능한지.</div>
        </div>
        <div class="crit-card">
          <div class="crit-idx">/02</div>
          <div class="crit-name">아이디어 적절성</div>
          <div class="crit-desc">문제를 정확히 짚었는가. 해결 방식이 논리적이고 실용적인지.</div>
        </div>
        <div class="crit-card">
          <div class="crit-idx">/03</div>
          <div class="crit-name">확산 가능성</div>
          <div class="crit-desc">다른 팀·다른 업무에서도 따라할 수 있는 구조인지.</div>
        </div>
        <div class="crit-card">
          <div class="crit-idx">/04</div>
          <div class="crit-name">조직 목표 연결</div>
          <div class="crit-desc">VNTG 비전·KPI와 얼마나 맞닿아 있는지.</div>
        </div>
      </div>
      <div class="criteria-note">
        심사는 <strong>기술적 수준보다 업무 효율성을 우선</strong>으로 봅니다. 목표는 "전 직원이 AI를 자신 있게 활용할 수 있는 수준".
      </div>
    </section>

    <!-- 최종후보 그리드 -->
    <div class="section-label">Final Candidates · ${cands.length}</div>
    <div class="grid">
      ${cards}
    </div>
  </main>

  <footer>VNTG · AI-WORKER CONTEST · 2026</footer>
</body>
</html>`;
}

function buildRedirectPage() {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>AI-WORKER CONTEST — 최종후보</title>
  <meta http-equiv="refresh" content="0; url=/winner/">
  <link rel="canonical" href="/winner/">
  <link rel="icon" type="image/svg+xml" href="/gemini_html/favicon.svg">
  <meta name="robots" content="noindex, nofollow">
  <style>
    body { font-family: -apple-system, sans-serif; background: #f5f3ee; color: #78716c; margin: 0; padding: 80px 20px; text-align: center; }
    a { color: #c8622a; text-decoration: none; font-weight: 600; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <p>이동 중… <a href="/winner/">여기를 클릭하세요</a></p>
  <script>location.replace('/winner/');</script>
</body>
</html>`;
}
