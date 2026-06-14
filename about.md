---
layout: page
title: About
description: "Chris Lee (이광일) — an engineering leader who hopes to help technology and people grow together. Working across Platform Service & R&D at VNTG, supporting an AI-Native shift."
comments: false
---

<style>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@1.3.9/dist/web/static/pretendard.min.css');
/* ===== About · Medium-style (scoped) ===== */
.am{--ink:#1f2328;--slate:#475569;--mut:#6b7280;--line:#e8e8e8;--soft:#f8fafc;--brand:#f97316;--brand-d:#ea580c;--navy:#1e293b;
  --sans:'Pretendard',-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;
  max-width:680px;margin:0 auto;color:var(--ink);font-family:var(--sans);font-weight:400;line-height:1.78;font-size:17px;letter-spacing:-.005em;}
.am *{box-sizing:border-box;}
.am-eyebrow{font-family:var(--sans);font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--brand);margin:0 0 12px;}
.am-name{font-family:var(--sans);font-weight:800;font-size:clamp(30px,6vw,46px);line-height:1.12;letter-spacing:-.03em;margin:0 0 6px;color:var(--ink);}
.am-name small{display:block;font-size:.4em;font-weight:600;color:var(--mut);letter-spacing:0;margin-top:8px;}
.am-tag{font-family:var(--sans);font-size:clamp(16px,2.2vw,19px);font-weight:400;color:var(--slate);line-height:1.55;margin:16px 0 0;max-width:580px;}
.am-meta{font-family:var(--sans);font-size:13.5px;color:var(--mut);margin:20px 0 0;display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;}
.am-meta span{display:inline-flex;align-items:center;gap:7px;}
.am-meta i{color:var(--brand);}

/* hero illustration */
.am-hero{margin:34px 0 6px;border-radius:16px;overflow:hidden;border:1px solid var(--line);background:linear-gradient(135deg,#fbfcff,#f4f6fb);}
.am-hero svg{display:block;width:100%;height:auto;}

/* language tabs */
.am-tabs{position:sticky;top:64px;z-index:20;display:inline-flex;gap:4px;background:#fff;border:1px solid var(--line);border-radius:999px;padding:5px;margin:36px 0 8px;box-shadow:0 4px 20px rgba(0,0,0,.05);}
.am-tabs button{font-family:var(--sans);font-size:13px;font-weight:700;letter-spacing:.02em;border:0;background:transparent;color:var(--mut);padding:7px 18px;border-radius:999px;cursor:pointer;transition:.18s;}
.am-tabs button.on{background:var(--ink);color:#fff;}

.am hr.am-rule{border:0;border-top:1px solid var(--line);margin:42px 0;}
.am-pane{display:none;}
.am-pane.on{display:block;animation:amfade .35s ease;}
@keyframes amfade{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}

.am h2.am-h{font-family:var(--sans);font-weight:800;font-size:clamp(21px,3.2vw,27px);letter-spacing:-.02em;line-height:1.22;margin:48px 0 8px;color:var(--ink);}
.am .am-kicker{font-family:var(--sans);font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--brand);margin:0 0 4px;}
.am p{margin:0 0 22px;}
.am p.am-lead{font-size:19px;line-height:1.6;color:var(--navy);font-weight:400;}
.am strong{font-weight:700;}
.am a{color:var(--brand-d);text-decoration:none;border-bottom:1px solid rgba(234,88,12,.3);transition:.15s;}
.am a:hover{border-bottom-color:var(--brand-d);}

/* pull quote */
.am-quote{font-family:var(--sans);font-style:italic;font-size:20px;line-height:1.5;color:var(--ink);border-left:4px solid var(--brand);padding:6px 0 6px 24px;margin:32px 0;font-weight:400;}

/* stats strip */
.am-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:32px 0;}
.am-stat{background:var(--soft);border:1px solid var(--line);border-radius:14px;padding:18px 12px;text-align:center;}
.am-stat b{display:block;font-family:var(--sans);font-size:clamp(22px,4.2vw,30px);font-weight:800;color:var(--brand);letter-spacing:-.02em;line-height:1;}
.am-stat span{display:block;font-family:var(--sans);font-size:11.5px;font-weight:600;color:var(--mut);margin-top:7px;line-height:1.35;letter-spacing:.01em;}

/* build/run diagram */
.am-fig{margin:30px 0;}
.am-fig svg{display:block;width:100%;height:auto;border-radius:14px;border:1px solid var(--line);background:#fff;}
.am-cap{font-family:var(--sans);font-size:13px;color:var(--mut);text-align:center;margin:12px 0 0;font-style:normal;}

/* timeline */
.am-tl{list-style:none;padding:0;margin:28px 0;position:relative;}
.am-tl:before{content:"";position:absolute;left:9px;top:6px;bottom:6px;width:2px;background:linear-gradient(var(--brand),#e2e8f0);}
.am-tl li{position:relative;padding:0 0 24px 36px;}
.am-tl li:before{content:"";position:absolute;left:3px;top:6px;width:14px;height:14px;border-radius:50%;background:#fff;border:3px solid var(--brand);}
.am-tl .yr{font-family:var(--sans);font-size:12px;font-weight:800;letter-spacing:.04em;color:var(--brand-d);}
.am-tl .role{font-family:var(--sans);font-size:16.5px;font-weight:700;color:var(--ink);margin:2px 0 2px;line-height:1.3;}
.am-tl .dsc{font-size:14.5px;color:var(--slate);line-height:1.6;}

/* people-centered map */
.am-pmap{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:12px;margin:28px 0;}
.am-pmap .cell{border:1px solid var(--line);border-radius:14px;padding:16px 14px;background:#fff;}
.am-pmap .cell.lead{background:linear-gradient(135deg,#fff7ed,#ffedd5);border-color:#fed7aa;grid-row:span 2;display:flex;flex-direction:column;justify-content:center;}
.am-pmap h4{font-family:var(--sans);font-size:14px;font-weight:800;margin:0 0 6px;color:var(--ink);letter-spacing:-.01em;}
.am-pmap .cell.lead h4{font-size:18px;color:var(--brand-d);}
.am-pmap p{font-size:13px;line-height:1.55;color:var(--slate);margin:0;}

/* link blocks */
.am-links{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:30px 0 8px;}
.am-link{display:flex;align-items:center;gap:13px;padding:16px;border:1px solid var(--line);border-radius:14px;background:#fff;text-decoration:none!important;border-bottom:1px solid var(--line)!important;transition:.18s;}
.am-link:hover{transform:translateY(-3px);box-shadow:0 12px 28px rgba(0,0,0,.08);border-color:#fdba74!important;}
.am-link .ic{flex:0 0 42px;width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:19px;color:#fff;}
.am-link .tx{display:flex;flex-direction:column;line-height:1.3;min-width:0;}
.am-link .tx b{font-family:var(--sans);font-size:14.5px;font-weight:800;color:var(--ink);}
.am-link .tx span{font-family:var(--sans);font-size:12px;color:var(--mut);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}

.am-tags{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0 8px;}
.am-tags span{font-family:var(--sans);font-size:12.5px;font-weight:600;color:var(--slate);background:var(--soft);border:1px solid var(--line);border-radius:999px;padding:6px 13px;}

@media(max-width:680px){
  .am{font-size:16px;}
  .am-stats{grid-template-columns:repeat(2,1fr);}
  .am-pmap{grid-template-columns:1fr;}
  .am-pmap .cell.lead{grid-row:auto;}
  .am-links{grid-template-columns:1fr;}
  .am-tabs{top:58px;}
}
</style>

<div class="am" id="about">

  <p class="am-eyebrow">About</p>
  <h1 class="am-name">Chris Lee<small>이광일 · 李光壹</small></h1>
  <p class="am-tag">An engineering leader who hopes to help technology and people grow together — carrying 23 years across dev, QA, and operations into the teams I get to work with.</p>
  <p class="am-meta">
    <span><i class="fas fa-building"></i> Platform Service &amp; R&amp;D · VNTG</span>
    <span><i class="fas fa-map-marker-alt"></i> Seoul, Korea</span>
    <span><i class="fas fa-robot"></i> Supporting an AI-Native shift</span>
  </p>

  <!-- HERO ILLUSTRATION : technology ↔ people bridge -->
  <div class="am-hero">
    <svg viewBox="0 0 1200 460" role="img" aria-label="Technology and people, connected by a bridge">
      <defs>
        <linearGradient id="amSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fbfcff"/><stop offset="1" stop-color="#eef2fa"/>
        </linearGradient>
        <linearGradient id="amBridge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#fb923c"/><stop offset="1" stop-color="#f97316"/>
        </linearGradient>
        <radialGradient id="amGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stop-color="#f97316" stop-opacity="0.18"/><stop offset="1" stop-color="#f97316" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="460" fill="url(#amSky)"/>
      <circle cx="600" cy="250" r="260" fill="url(#amGlow)"/>

      <!-- LEFT : technology mesh -->
      <g stroke="#cbd5e1" stroke-width="2" fill="none" opacity="0.9">
        <path d="M120 120 L230 170 L160 260 L280 300 L210 360"/>
        <path d="M230 170 L300 110 L380 180"/>
        <path d="M280 300 L360 250 L380 180"/>
        <path d="M160 260 L70 230"/>
      </g>
      <g fill="#1e293b">
        <rect x="108" y="108" width="24" height="24" rx="5"/>
        <rect x="218" y="158" width="24" height="24" rx="5"/>
        <rect x="288" y="98" width="24" height="24" rx="5"/>
        <rect x="148" y="248" width="24" height="24" rx="5"/>
        <rect x="268" y="288" width="24" height="24" rx="5"/>
        <rect x="58" y="218" width="24" height="24" rx="5"/>
      </g>
      <g fill="#f97316">
        <rect x="368" y="168" width="26" height="26" rx="6"/>
        <rect x="348" y="238" width="22" height="22" rx="5"/>
        <rect x="198" y="348" width="22" height="22" rx="5"/>
      </g>
      <!-- code ticks -->
      <g stroke="#94a3b8" stroke-width="3" stroke-linecap="round">
        <line x1="120" y1="395" x2="170" y2="395"/><line x1="180" y1="395" x2="230" y2="395"/>
        <line x1="120" y1="412" x2="155" y2="412"/><line x1="165" y1="412" x2="245" y2="412"/>
      </g>

      <!-- BRIDGE -->
      <path d="M330 300 Q600 130 870 300" fill="none" stroke="url(#amBridge)" stroke-width="10" stroke-linecap="round"/>
      <g stroke="#fdba74" stroke-width="4" stroke-linecap="round">
        <line x1="420" y1="252" x2="420" y2="300"/>
        <line x1="510" y1="218" x2="510" y2="300"/>
        <line x1="600" y1="206" x2="600" y2="300"/>
        <line x1="690" y1="218" x2="690" y2="300"/>
        <line x1="780" y1="252" x2="780" y2="300"/>
      </g>
      <circle cx="600" cy="201" r="11" fill="#fff" stroke="#f97316" stroke-width="5"/>

      <!-- RIGHT : people -->
      <g>
        <g transform="translate(880,250)"><circle cx="0" cy="0" r="30" fill="#1e293b"/><path d="M-44 92 a44 52 0 0 1 88 0 Z" fill="#1e293b"/></g>
        <g transform="translate(972,228)"><circle cx="0" cy="0" r="26" fill="#475569"/><path d="M-38 80 a38 46 0 0 1 76 0 Z" fill="#475569"/></g>
        <g transform="translate(1058,250)"><circle cx="0" cy="0" r="30" fill="#f97316"/><path d="M-44 92 a44 52 0 0 1 88 0 Z" fill="#f97316"/></g>
        <g transform="translate(1130,232)" opacity="0.85"><circle cx="0" cy="0" r="22" fill="#64748b"/><path d="M-32 70 a32 40 0 0 1 64 0 Z" fill="#64748b"/></g>
      </g>

      <!-- ground line -->
      <line x1="60" y1="400" x2="1160" y2="400" stroke="#e2e8f0" stroke-width="2"/>
    </svg>
  </div>

  <!-- LANGUAGE TABS -->
  <div class="am-tabs" role="tablist">
    <button class="on" data-lang="en" role="tab">English</button>
    <button data-lang="ko" role="tab">한국어</button>
  </div>

  <!-- ============== ENGLISH ============== -->
  <div class="am-pane on" data-pane="en">

    <p class="am-lead">I started as a developer, grew into quality engineering, and these days I spend most of my energy helping people grow. Along the way I learned that the hard part of software is rarely the code — it's aligning how we <strong>build</strong> with how we <strong>run</strong>, and supporting the people in between as they do their best work.</p>

    <p>Today, at <strong>VNTG</strong>, I have the privilege of working across two divisions within the CTO group: the <strong>Platform Service Division</strong> (Run &amp; Operate) and the <strong>R&amp;D Division</strong> (Research &amp; Build). One designs the platform; the other operates it. Being close to both lets me help keep the bridge between them short — fewer hand-offs, and a direction the teams can share.</p>

    <div class="am-stats">
      <div class="am-stat"><b>23</b><span>Years in the industry</span></div>
      <div class="am-stat"><b>8</b><span>Companies, one craft</span></div>
      <div class="am-stat"><b>5</b><span>W3C specs contributed</span></div>
      <div class="am-stat"><b>70</b><span>Largest team I supported</span></div>
    </div>

    <hr class="am-rule">

    <p class="am-kicker">Build × Run</p>
    <h2 class="am-h">Two divisions, one shared direction</h2>
    <p>Most organizations split the team that builds a platform from the team that keeps it alive. That split is where context leaks and priorities drift. Sitting close to both sides, I try to help the design intent survive all the way into production — together with the people on each team.</p>

    <!-- BUILD/RUN DIAGRAM -->
    <div class="am-fig">
      <svg viewBox="0 0 1000 360" role="img" aria-label="R&D Division builds, Platform Service Division runs, with Chris helping align both">
        <defs>
          <linearGradient id="amBuild" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1e293b"/><stop offset="1" stop-color="#334155"/></linearGradient>
          <linearGradient id="amRun" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f97316"/><stop offset="1" stop-color="#ea580c"/></linearGradient>
        </defs>
        <!-- BUILD card -->
        <rect x="40" y="60" width="370" height="240" rx="20" fill="url(#amBuild)"/>
        <text x="70" y="108" fill="#fb923c" font-family="-apple-system,sans-serif" font-size="15" font-weight="800" letter-spacing="2">R&amp;D DIVISION</text>
        <text x="70" y="146" fill="#fff" font-family="-apple-system,sans-serif" font-size="30" font-weight="800">Build</text>
        <text x="70" y="178" fill="#cbd5e1" font-family="-apple-system,sans-serif" font-size="15">Research &amp; construct the platform</text>
        <g fill="#e2e8f0" font-family="-apple-system,sans-serif" font-size="14.5">
          <text x="70" y="216">• Terroir core · NestJS / Nx</text>
          <text x="70" y="244">• Internal Developer Platform</text>
          <text x="70" y="272">• CI/CD · GitOps · SDD</text>
        </g>
        <!-- RUN card -->
        <rect x="590" y="60" width="370" height="240" rx="20" fill="url(#amRun)"/>
        <text x="620" y="108" fill="#fff7ed" font-family="-apple-system,sans-serif" font-size="15" font-weight="800" letter-spacing="2">PLATFORM SERVICE</text>
        <text x="620" y="146" fill="#fff" font-family="-apple-system,sans-serif" font-size="30" font-weight="800">Run</text>
        <text x="620" y="178" fill="#fff7ed" font-family="-apple-system,sans-serif" font-size="15">Operate &amp; serve the platform</text>
        <g fill="#fff" font-family="-apple-system,sans-serif" font-size="14.5">
          <text x="620" y="216">• Terroir operations · GCP / IDC</text>
          <text x="620" y="244">• Observability · LGTM stack</text>
          <text x="620" y="272">• Security · SECaaS</text>
        </g>
        <!-- bridge node -->
        <line x1="410" y1="180" x2="590" y2="180" stroke="#cbd5e1" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round"/>
        <circle cx="500" cy="180" r="42" fill="#fff" stroke="#f97316" stroke-width="4"/>
        <text x="500" y="175" text-anchor="middle" fill="#1e293b" font-family="-apple-system,sans-serif" font-size="13" font-weight="800">CHRIS</text>
        <text x="500" y="193" text-anchor="middle" fill="#94a3b8" font-family="-apple-system,sans-serif" font-size="11" font-weight="600">helps align</text>
        <text x="500" y="330" text-anchor="middle" fill="#475569" font-family="-apple-system,sans-serif" font-size="14" font-style="italic">Design intent → carried, together, into operations</text>
      </svg>
      <p class="am-cap">Staying close to both Build and Run helps the platform's design and its operation stay in one line.</p>
    </div>

    <hr class="am-rule">

    <p class="am-kicker">The journey</p>
    <h2 class="am-h">How I got here</h2>
    <p>Eight companies, one continuous thread: learning, with a lot of help from others, how products are built — and how they break — from every angle.</p>

    <ul class="am-tl">
      <li><div class="yr">2025 — NOW · VNTG</div><div class="role">Platform Service &amp; R&amp;D Divisions</div><div class="dsc">Working across two divisions under the CTO group, and helping our teams move toward an AI-Native way of working.</div></li>
      <li><div class="yr">2019 — 2025 · BAROGO</div><div class="role">R&amp;D Center</div><div class="dsc">Grew from QA lead to center head. Supported a 70-person engineering org through a large-scale legacy-to-new-architecture migration.</div></li>
      <li><div class="yr">2015 — 2018 · DALIWORKS</div><div class="role">QA / Product &amp; Operations (IoT)</div><div class="dsc">Quality, operations and tech support for the Thing+ IoT platform. Seoul IoT hackathon mentor.</div></li>
      <li><div class="yr">2006 — 2015 · OBIGO</div><div class="role">QCC Team</div><div class="dsc">~10 years in mobile &amp; automotive web platforms. Contributed to W3C Widget specs; worked on automotive IVI app testing for HKMC, Toyota, Honda.</div></li>
      <li><div class="yr">2002 — 2006</div><div class="role">Web developer → QA engineer</div><div class="dsc">Where it began — building sites, then discovering that quality was the craft I cared about most (E-systems, MDNT, MODA, Fuzewire).</div></li>
    </ul>

    <hr class="am-rule">

    <p class="am-kicker">Leadership</p>
    <h2 class="am-h">My center of gravity is people</h2>
    <p>I came up through quality and test automation, so I try to understand the work deeply. These days I hope to add more value by supporting direction and people than by writing the code myself. The standard four axes of engineering management land for me like this:</p>

    <div class="am-pmap">
      <div class="cell lead"><h4>People</h4><p>Where I put most of my care — hiring, 1:1s, growth and team culture. I'd love for this to be where I can help the most.</p></div>
      <div class="cell"><h4>Delivery</h4><p>Outcomes and timelines across both divisions; helping teams align.</p></div>
      <div class="cell"><h4>Technical</h4><p>Supporting direction through reviews, architecture guidance and roadmaps — rather than hands-on coding.</p></div>
      <div class="cell"><h4>Process</h4><p>Helping improve how we work and collaborate together.</p></div>
    </div>

    <p class="am-quote">“Adaptive yet principle-based. If I can help one person grow, they'll build things far beyond what I could ever ship on my own.”</p>

    <hr class="am-rule">

    <p class="am-kicker">Craft &amp; standards</p>
    <h2 class="am-h">Quality is in the DNA</h2>
    <p>Early in my career I had the chance — often on my own time — to take part in global standardization. I'm a contributor to <strong>five W3C Widget specifications</strong> (Digital Signature, Packaged Web Apps, Interface, View-mode, WARP), collaborating by night with the spec editor. I worked on <strong>automotive IVI</strong> app testing, helped author HKMC device-API specs, and supported <strong>BONDI / JIL / WAC</strong> certification. That standard of rigor still quietly shapes how I work.</p>
    <div class="am-tags">
      <span>SQA / SET</span><span>Test automation</span><span>W3C Widgets ×5</span><span>Automotive IVI</span><span>ISTQB FL</span><span>BONDI · JIL · WAC</span><span>Observability</span><span>DevOps mindset</span>
    </div>

    <hr class="am-rule">

    <p class="am-kicker">Right now</p>
    <h2 class="am-h">What we're working toward</h2>
    <p>These days I'm helping VNTG move toward becoming an <strong>AI-Native organization</strong>, supporting the <strong>AI Worker</strong> certification program so every member can apply AI to real work — not demos. In 2026 Q1, <strong>212 teammates took part and 96% completed</strong> the journey together.</p>
    <p>On the platform side, our R&amp;D team builds <strong>Terroir</strong>, our Internal Developer Platform, and the Platform Service team runs it with a full observability and security stack. And off the org chart, I keep a personal knowledge portal — this very site — as a small, living experiment in AI-assisted writing, design, and engineering. More than anything, I'm dreaming of teams that grow <em>with</em> these tools, not just ship a little faster.</p>

    <p class="am-kicker" style="margin-top:38px">Find me</p>
    <h2 class="am-h" style="margin-top:4px">Links</h2>
    <div class="am-links">
      <a class="am-link" href="https://cv.chrisnolja.dev/" target="_blank" rel="noopener"><span class="ic" style="background:#0f172a"><i class="fas fa-file-alt"></i></span><span class="tx"><b>Curriculum Vitae</b><span>cv.chrisnolja.dev</span></span></a>
      <a class="am-link" href="https://www.linkedin.com/in/chris-lee-b6a00520" target="_blank" rel="noopener"><span class="ic" style="background:#0a66c2"><i class="fab fa-linkedin-in"></i></span><span class="tx"><b>LinkedIn</b><span>chris-lee-b6a00520</span></span></a>
      <a class="am-link" href="https://github.com/chrisKILee" target="_blank" rel="noopener"><span class="ic" style="background:#1a1a1a"><i class="fab fa-github"></i></span><span class="tx"><b>GitHub</b><span>github.com/chrisKILee</span></span></a>
      <a class="am-link" href="https://www.instagram.com/junspapa_chris/" target="_blank" rel="noopener"><span class="ic" style="background:linear-gradient(135deg,#f09433,#dc2743,#bc1888)"><i class="fab fa-instagram"></i></span><span class="tx"><b>Instagram</b><span>@junspapa_chris</span></span></a>
    </div>

  </div>

  <!-- ============== 한국어 ============== -->
  <div class="am-pane" data-pane="ko">

    <p class="am-lead">저는 개발자로 시작해 품질 엔지니어링을 거쳤고, 요즘은 사람들이 성장하도록 돕는 데 가장 많은 에너지를 씁니다. 그 과정에서 배운 건, 소프트웨어의 어려운 부분은 코드가 아니라 — <strong>'만드는 방식(Build)'</strong>과 <strong>'운영하는 방식(Run)'</strong>을 맞추고, 그 사이에 있는 사람들이 최선의 일을 하도록 곁에서 거드는 일이라는 것입니다.</p>

    <p>현재 <strong>VNTG</strong> 기술총괄(CTO) 산하에서 두 개 실에 걸쳐 함께 일하는 행운을 누리고 있습니다. <strong>플랫폼서비스실</strong>(Run &amp; Operate)과 <strong>R&amp;D실</strong>(Research &amp; Build). 한쪽은 플랫폼을 설계하고, 다른 한쪽은 운영합니다. 양쪽 가까이에 있다 보니, 둘 사이의 다리를 짧게 유지하도록 거들 수 있습니다 — 인수인계가 줄고, 팀이 함께 바라볼 방향이 모이도록.</p>

    <div class="am-stats">
      <div class="am-stat"><b>23</b><span>업계 경력 (년)</span></div>
      <div class="am-stat"><b>8</b><span>거쳐온 회사</span></div>
      <div class="am-stat"><b>5</b><span>W3C 명세 기여</span></div>
      <div class="am-stat"><b>70</b><span>함께한 가장 큰 팀</span></div>
    </div>

    <hr class="am-rule">

    <p class="am-kicker">Build × Run</p>
    <h2 class="am-h">두 개의 실, 함께 바라보는 하나의 방향</h2>
    <p>대부분의 조직은 플랫폼을 '만드는 팀'과 '살아 있게 하는 팀'을 분리합니다. 바로 그 경계에서 맥락이 새고 우선순위가 어긋납니다. 양쪽 가까이에서, 설계 의도가 운영 단계까지 살아남도록 — 각 팀의 사람들과 함께 — 거들려 합니다.</p>

    <div class="am-fig">
      <svg viewBox="0 0 1000 360" role="img" aria-label="R&D실은 만들고 플랫폼서비스실은 운영하며 Chris가 정렬을 거든다">
        <rect x="40" y="60" width="370" height="240" rx="20" fill="url(#amBuild)"/>
        <text x="70" y="108" fill="#fb923c" font-family="-apple-system,sans-serif" font-size="15" font-weight="800" letter-spacing="2">R&amp;D실</text>
        <text x="70" y="146" fill="#fff" font-family="-apple-system,sans-serif" font-size="30" font-weight="800">Build</text>
        <text x="70" y="178" fill="#cbd5e1" font-family="-apple-system,sans-serif" font-size="15">플랫폼을 연구하고 구축</text>
        <g fill="#e2e8f0" font-family="-apple-system,sans-serif" font-size="14.5">
          <text x="70" y="216">• Terroir 코어 · NestJS / Nx</text>
          <text x="70" y="244">• 내부 개발자 플랫폼(IDP)</text>
          <text x="70" y="272">• CI/CD · GitOps · SDD</text>
        </g>
        <rect x="590" y="60" width="370" height="240" rx="20" fill="url(#amRun)"/>
        <text x="620" y="108" fill="#fff7ed" font-family="-apple-system,sans-serif" font-size="15" font-weight="800" letter-spacing="2">플랫폼서비스실</text>
        <text x="620" y="146" fill="#fff" font-family="-apple-system,sans-serif" font-size="30" font-weight="800">Run</text>
        <text x="620" y="178" fill="#fff7ed" font-family="-apple-system,sans-serif" font-size="15">플랫폼을 운영하고 서비스</text>
        <g fill="#fff" font-family="-apple-system,sans-serif" font-size="14.5">
          <text x="620" y="216">• Terroir 운영 · GCP / IDC</text>
          <text x="620" y="244">• 관측성 · LGTM 스택</text>
          <text x="620" y="272">• 보안 · SECaaS</text>
        </g>
        <line x1="410" y1="180" x2="590" y2="180" stroke="#cbd5e1" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round"/>
        <circle cx="500" cy="180" r="42" fill="#fff" stroke="#f97316" stroke-width="4"/>
        <text x="500" y="175" text-anchor="middle" fill="#1e293b" font-family="-apple-system,sans-serif" font-size="13" font-weight="800">CHRIS</text>
        <text x="500" y="193" text-anchor="middle" fill="#94a3b8" font-family="-apple-system,sans-serif" font-size="11" font-weight="600">정렬을 거듦</text>
        <text x="500" y="330" text-anchor="middle" fill="#475569" font-family="-apple-system,sans-serif" font-size="14" font-style="italic">설계 의도 → 함께, 운영까지 이어짐</text>
      </svg>
      <p class="am-cap">Build와 Run 양쪽에 가까이 있으면 플랫폼의 설계와 운영이 한 줄로 정렬되도록 거들 수 있습니다.</p>
    </div>

    <hr class="am-rule">

    <p class="am-kicker">여정</p>
    <h2 class="am-h">여기까지 온 길</h2>
    <p>여덟 개의 회사, 하나의 연결된 흐름 — 많은 사람의 도움 속에서, 제품이 어떻게 만들어지고 또 어떻게 무너지는지를 모든 각도에서 배워 온 시간입니다.</p>

    <ul class="am-tl">
      <li><div class="yr">2025 — 현재 · VNTG</div><div class="role">플랫폼서비스실 · R&amp;D실</div><div class="dsc">두 실에 걸쳐 함께 일하며, 우리 팀이 AI-Native한 방식으로 나아가도록 거들고 있습니다.</div></li>
      <li><div class="yr">2019 — 2025 · 바로고</div><div class="role">R&amp;D센터</div><div class="dsc">QA 리드에서 센터장까지 성장하며, 70명 규모 개발조직이 대규모 레거시→신규 아키텍처 전환을 지나도록 함께했습니다.</div></li>
      <li><div class="yr">2015 — 2018 · 달리웍스</div><div class="role">QA · 제품/운영 (IoT)</div><div class="dsc">Thing+ IoT 플랫폼의 품질·운영·기술지원. 서울시 IoT 해커톤 멘토.</div></li>
      <li><div class="yr">2006 — 2015 · 오비고</div><div class="role">QCC팀</div><div class="dsc">모바일·자동차 웹 플랫폼에서 약 10년. W3C 위젯 명세에 기여하고, 현대·도요타·혼다 IVI 앱 테스트에 참여.</div></li>
      <li><div class="yr">2002 — 2006</div><div class="role">웹 개발자 → QA 엔지니어</div><div class="dsc">시작점 — 사이트를 만들다가, 품질이 제가 가장 마음 쓰는 일이라는 걸 발견한 시기 (이시스템즈·MDNT·모다·퓨즈와이어).</div></li>
    </ul>

    <hr class="am-rule">

    <p class="am-kicker">리더십</p>
    <h2 class="am-h">제 무게중심은 '사람'입니다</h2>
    <p>품질과 테스트 자동화로 성장했기에 일을 깊이 이해하려 합니다. 다만 요즘은 코드를 직접 짜기보다, 방향과 사람을 지원하는 쪽에서 더 보탬이 되길 바랍니다. 엔지니어링 매니지먼트의 표준 네 축에 제 무게중심을 놓아 보면 이렇습니다:</p>

    <div class="am-pmap">
      <div class="cell lead"><h4>People (사람)</h4><p>가장 마음을 쓰는 곳 — 채용·1:1·성장·조직문화. 제가 가장 보탬이 되고 싶은 자리입니다.</p></div>
      <div class="cell"><h4>Delivery</h4><p>두 실의 산출물과 일정, 팀이 함께 정렬하도록 거드는 일.</p></div>
      <div class="cell"><h4>Technical</h4><p>리뷰·아키텍처 가이드·로드맵으로 방향을 지원 — 직접 구현이 아니라.</p></div>
      <div class="cell"><h4>Process</h4><p>우리가 함께 일하고 협업하는 방식을 개선하는 일.</p></div>
    </div>

    <p class="am-quote">"유연하되 원칙을 지킵니다. 한 사람의 성장을 도울 수 있다면, 그는 제가 혼자 만들 수 있는 것보다 훨씬 멀리까지 만들어낼 겁니다."</p>

    <hr class="am-rule">

    <p class="am-kicker">전문성 &amp; 표준</p>
    <h2 class="am-h">품질은 DNA에 있습니다</h2>
    <p>커리어 초반, 종종 개인 시간을 들여가며 글로벌 표준화에 참여할 기회를 얻었습니다. <strong>W3C 위젯 5개 명세</strong>(Digital Signature, Packaged Web Apps, Interface, View-mode, WARP)에 Contributor로 등재되었고, 명세 에디터와 야간 이메일로 함께 작업했습니다. <strong>자동차 IVI</strong> 앱 테스트에 참여하고, HKMC 디바이스 API 명세를 함께 작성했으며, <strong>BONDI / JIL / WAC</strong> 인증을 지원했습니다. 그때의 엄격함이 지금도 조용히 제 일하는 방식을 만듭니다.</p>
    <div class="am-tags">
      <span>SQA / SET</span><span>테스트 자동화</span><span>W3C 위젯 ×5</span><span>자동차 IVI</span><span>ISTQB FL</span><span>BONDI · JIL · WAC</span><span>관측성</span><span>DevOps 마인드셋</span>
    </div>

    <hr class="am-rule">

    <p class="am-kicker">지금</p>
    <h2 class="am-h">함께 나아가고 있는 것</h2>
    <p>요즘은 VNTG가 <strong>AI-Native 조직</strong>으로 나아가도록 거들며, 구성원 누구나 실무에 AI를 적용할 수 있도록 <strong>AI Worker 인증</strong> 프로그램을 지원하고 있습니다 — 데모가 아니라 진짜 일에. 2026년 1분기에는 <strong>212명이 함께 참여해 96%가 완주</strong>했습니다.</p>
    <p>플랫폼 측면에서는 R&amp;D 팀이 내부 개발자 플랫폼 <strong>Terroir(떼루아)</strong>를 만들고, 플랫폼서비스 팀이 관측성·보안 스택과 함께 이를 운영합니다. 그리고 조직도 바깥에서는 이 사이트 — 개인 지식 포털 — 를 작은 실험으로 가꾸며 AI 기반 글쓰기·디자인·엔지니어링을 이어갑니다. 무엇보다, 더 빨리 만드는 팀이 아니라 이 도구들과 <em>함께</em> 성장하는 팀을 꿈꿉니다.</p>

    <p class="am-kicker" style="margin-top:38px">연결</p>
    <h2 class="am-h" style="margin-top:4px">링크</h2>
    <div class="am-links">
      <a class="am-link" href="https://cv.chrisnolja.dev/" target="_blank" rel="noopener"><span class="ic" style="background:#0f172a"><i class="fas fa-file-alt"></i></span><span class="tx"><b>이력서 (CV)</b><span>cv.chrisnolja.dev</span></span></a>
      <a class="am-link" href="https://www.linkedin.com/in/chris-lee-b6a00520" target="_blank" rel="noopener"><span class="ic" style="background:#0a66c2"><i class="fab fa-linkedin-in"></i></span><span class="tx"><b>LinkedIn</b><span>chris-lee-b6a00520</span></span></a>
      <a class="am-link" href="https://github.com/chrisKILee" target="_blank" rel="noopener"><span class="ic" style="background:#1a1a1a"><i class="fab fa-github"></i></span><span class="tx"><b>GitHub</b><span>github.com/chrisKILee</span></span></a>
      <a class="am-link" href="https://www.instagram.com/junspapa_chris/" target="_blank" rel="noopener"><span class="ic" style="background:linear-gradient(135deg,#f09433,#dc2743,#bc1888)"><i class="fab fa-instagram"></i></span><span class="tx"><b>Instagram</b><span>@junspapa_chris</span></span></a>
    </div>

  </div>

</div>

<script>
(function(){
  var root=document.getElementById('about');
  if(!root)return;
  var btns=root.querySelectorAll('.am-tabs button');
  var panes=root.querySelectorAll('.am-pane');
  btns.forEach(function(b){
    b.addEventListener('click',function(){
      var l=b.getAttribute('data-lang');
      btns.forEach(function(x){x.classList.toggle('on',x===b);});
      panes.forEach(function(p){p.classList.toggle('on',p.getAttribute('data-pane')===l);});
    });
  });
})();
</script>
