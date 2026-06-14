---
layout: page
title: About
description: "Chris Lee (이광일) — People-first engineering leader bridging technology and teams. Leading Platform Service & R&D at VNTG, driving an AI-Native transformation."
comments: false
---

<style>
/* ===== About · Medium-style (scoped) ===== */
.am{--ink:#1a1a1a;--slate:#475569;--mut:#6b7280;--line:#e8e8e8;--soft:#f8fafc;--brand:#f97316;--brand-d:#ea580c;--navy:#1e293b;max-width:740px;margin:0 auto;color:var(--ink);font-family:'Merriweather',Georgia,serif;font-weight:300;line-height:1.85;font-size:19px;letter-spacing:-.003em;}
.am *{box-sizing:border-box;}
.am-eyebrow{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--brand);margin:0 0 14px;}
.am-name{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-weight:800;font-size:clamp(38px,7vw,58px);line-height:1.08;letter-spacing:-.03em;margin:0 0 6px;color:var(--ink);}
.am-name small{display:block;font-size:.42em;font-weight:600;color:var(--mut);letter-spacing:0;margin-top:8px;}
.am-tag{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:clamp(19px,2.6vw,23px);font-weight:400;color:var(--slate);line-height:1.5;margin:18px 0 0;max-width:620px;}
.am-meta{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:15px;color:var(--mut);margin:22px 0 0;display:flex;flex-wrap:wrap;gap:10px 18px;align-items:center;}
.am-meta span{display:inline-flex;align-items:center;gap:7px;}
.am-meta i{color:var(--brand);}

/* hero illustration */
.am-hero{margin:38px 0 6px;border-radius:16px;overflow:hidden;border:1px solid var(--line);background:linear-gradient(135deg,#fbfcff,#f4f6fb);}
.am-hero svg{display:block;width:100%;height:auto;}

/* language tabs */
.am-tabs{position:sticky;top:64px;z-index:20;display:inline-flex;gap:4px;background:#fff;border:1px solid var(--line);border-radius:999px;padding:5px;margin:40px 0 8px;box-shadow:0 4px 20px rgba(0,0,0,.05);}
.am-tabs button{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;font-weight:700;letter-spacing:.02em;border:0;background:transparent;color:var(--mut);padding:8px 20px;border-radius:999px;cursor:pointer;transition:.18s;}
.am-tabs button.on{background:var(--ink);color:#fff;}

.am hr.am-rule{border:0;border-top:1px solid var(--line);margin:46px 0;}
.am-pane{display:none;}
.am-pane.on{display:block;animation:amfade .35s ease;}
@keyframes amfade{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}

.am h2.am-h{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-weight:800;font-size:clamp(26px,4vw,33px);letter-spacing:-.02em;line-height:1.2;margin:54px 0 8px;color:var(--ink);}
.am .am-kicker{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--brand);margin:0 0 4px;}
.am p{margin:0 0 24px;}
.am p.am-lead{font-size:22px;line-height:1.7;color:var(--navy);}
.am strong{font-weight:700;}
.am a{color:var(--brand-d);text-decoration:none;border-bottom:1px solid rgba(234,88,12,.3);transition:.15s;}
.am a:hover{border-bottom-color:var(--brand-d);}

/* pull quote */
.am-quote{font-family:'Merriweather',Georgia,serif;font-style:italic;font-size:25px;line-height:1.55;color:var(--ink);border-left:4px solid var(--brand);padding:6px 0 6px 26px;margin:36px 0;font-weight:300;}

/* stats strip */
.am-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:36px 0;}
.am-stat{background:var(--soft);border:1px solid var(--line);border-radius:14px;padding:20px 14px;text-align:center;}
.am-stat b{display:block;font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:clamp(26px,5vw,36px);font-weight:800;color:var(--brand);letter-spacing:-.02em;line-height:1;}
.am-stat span{display:block;font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:12.5px;font-weight:600;color:var(--mut);margin-top:8px;line-height:1.35;letter-spacing:.01em;}

/* build/run diagram */
.am-fig{margin:34px 0;}
.am-fig svg{display:block;width:100%;height:auto;border-radius:14px;border:1px solid var(--line);background:#fff;}
.am-cap{font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:13.5px;color:var(--mut);text-align:center;margin:12px 0 0;font-style:normal;}

/* timeline */
.am-tl{list-style:none;padding:0;margin:30px 0;position:relative;}
.am-tl:before{content:"";position:absolute;left:9px;top:6px;bottom:6px;width:2px;background:linear-gradient(var(--brand),#e2e8f0);}
.am-tl li{position:relative;padding:0 0 26px 38px;}
.am-tl li:before{content:"";position:absolute;left:3px;top:6px;width:14px;height:14px;border-radius:50%;background:#fff;border:3px solid var(--brand);}
.am-tl .yr{font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:13px;font-weight:800;letter-spacing:.04em;color:var(--brand-d);}
.am-tl .role{font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:18px;font-weight:700;color:var(--ink);margin:2px 0 2px;line-height:1.3;}
.am-tl .dsc{font-size:16px;color:var(--slate);line-height:1.6;}

/* people-centered map */
.am-pmap{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:12px;margin:30px 0;}
.am-pmap .cell{border:1px solid var(--line);border-radius:14px;padding:18px 16px;background:#fff;}
.am-pmap .cell.lead{background:linear-gradient(135deg,#fff7ed,#ffedd5);border-color:#fed7aa;grid-row:span 2;display:flex;flex-direction:column;justify-content:center;}
.am-pmap h4{font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:15px;font-weight:800;margin:0 0 6px;color:var(--ink);letter-spacing:-.01em;}
.am-pmap .cell.lead h4{font-size:20px;color:var(--brand-d);}
.am-pmap p{font-size:14px;line-height:1.55;color:var(--slate);margin:0;}

/* link blocks */
.am-links{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:32px 0 8px;}
.am-link{display:flex;align-items:center;gap:14px;padding:18px 18px;border:1px solid var(--line);border-radius:14px;background:#fff;text-decoration:none!important;border-bottom:1px solid var(--line)!important;transition:.18s;}
.am-link:hover{transform:translateY(-3px);box-shadow:0 12px 28px rgba(0,0,0,.08);border-color:#fdba74!important;}
.am-link .ic{flex:0 0 44px;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;color:#fff;}
.am-link .tx{display:flex;flex-direction:column;line-height:1.3;min-width:0;}
.am-link .tx b{font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:15.5px;font-weight:800;color:var(--ink);}
.am-link .tx span{font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:12.5px;color:var(--mut);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}

.am-tags{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0 8px;}
.am-tags span{font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:13px;font-weight:600;color:var(--slate);background:var(--soft);border:1px solid var(--line);border-radius:999px;padding:6px 14px;}

@media(max-width:680px){
  .am{font-size:18px;}
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
  <p class="am-tag">People-first engineering leader bridging technology and teams — turning 23 years across dev, QA, and operations into how organizations build and grow.</p>
  <p class="am-meta">
    <span><i class="fas fa-building"></i> Platform Service &amp; R&amp;D · VNTG</span>
    <span><i class="fas fa-map-marker-alt"></i> Seoul, Korea</span>
    <span><i class="fas fa-robot"></i> AI-Native transformation</span>
  </p>

  <!-- HERO ILLUSTRATION : technology ↔ people bridge -->
  <div class="am-hero">
    <svg viewBox="0 0 1200 460" role="img" aria-label="An engineering leader bridging technology and people">
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

    <p class="am-lead">I started as a developer, grew into quality engineering, and now lead people. Along the way I learned that the hard part of software is rarely the code — it's aligning how we <strong>build</strong> with how we <strong>run</strong>, and helping the people in between do their best work.</p>

    <p>Today, at <strong>VNTG</strong>, I lead two divisions within the CTO group in parallel: the <strong>Platform Service Division</strong> (Run &amp; Operate) and the <strong>R&amp;D Division</strong> (Research &amp; Build). One designs the platform; the other operates it. Holding both means the bridge between them is short — fewer hand-offs, faster decisions, and a single, coherent direction.</p>

    <div class="am-stats">
      <div class="am-stat"><b>23</b><span>Years in the industry</span></div>
      <div class="am-stat"><b>8</b><span>Companies, one craft</span></div>
      <div class="am-stat"><b>5</b><span>W3C specs contributed</span></div>
      <div class="am-stat"><b>70</b><span>Engineers led at peak</span></div>
    </div>

    <hr class="am-rule">

    <p class="am-kicker">Build × Run</p>
    <h2 class="am-h">Two divisions, one direction</h2>
    <p>Most organizations split the team that builds a platform from the team that keeps it alive. That split is where context leaks and priorities drift. I lead both sides so the design intent survives all the way into production.</p>

    <!-- BUILD/RUN DIAGRAM -->
    <div class="am-fig">
      <svg viewBox="0 0 1000 360" role="img" aria-label="R&D Division builds, Platform Service Division runs, Chris bridges both">
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
        <text x="500" y="193" text-anchor="middle" fill="#94a3b8" font-family="-apple-system,sans-serif" font-size="11" font-weight="600">aligns both</text>
        <text x="500" y="330" text-anchor="middle" fill="#475569" font-family="-apple-system,sans-serif" font-size="14" font-style="italic">Design intent → carried straight into operations</text>
      </svg>
      <p class="am-cap">Holding Build and Run together keeps the platform's design and its operation in one line.</p>
    </div>

    <hr class="am-rule">

    <p class="am-kicker">The journey</p>
    <h2 class="am-h">How I got here</h2>
    <p>Eight companies, one continuous thread: understanding how products are built — and how they break — from every angle.</p>

    <ul class="am-tl">
      <li><div class="yr">2025 — NOW · VNTG</div><div class="role">Head of Platform Service &amp; R&amp;D Divisions</div><div class="dsc">Two divisions in parallel under the CTO group. Driving the company-wide AI-Native shift.</div></li>
      <li><div class="yr">2019 — 2025 · BAROGO</div><div class="role">Head of R&amp;D Center</div><div class="dsc">From QA lead to center head. Led a 70-person engineering org and a large-scale legacy-to-new-architecture migration.</div></li>
      <li><div class="yr">2015 — 2018 · DALIWORKS</div><div class="role">QA / Product &amp; Operations (IoT)</div><div class="dsc">Quality, operations and tech support for the Thing+ IoT platform. Seoul IoT hackathon mentor.</div></li>
      <li><div class="yr">2006 — 2015 · OBIGO</div><div class="role">QCC Team Lead</div><div class="dsc">~10 years in mobile &amp; automotive web platforms. W3C Widget spec contributor; automotive IVI app testing for HKMC, Toyota, Honda.</div></li>
      <li><div class="yr">2002 — 2006</div><div class="role">Web developer → QA engineer</div><div class="dsc">Where it began — building sites, then discovering that quality was my real craft (E-systems, MDNT, MODA, Fuzewire).</div></li>
    </ul>

    <hr class="am-rule">

    <p class="am-kicker">Leadership</p>
    <h2 class="am-h">My center of gravity is people</h2>
    <p>I came up through quality and test automation, so I understand the work deeply. But in my current role I create more value by guiding direction than by writing code. The standard four axes of engineering management map to me like this:</p>

    <div class="am-pmap">
      <div class="cell lead"><h4>People</h4><p>My main focus — hiring, 1:1s, growth, talent management and team culture. The leverage is here.</p></div>
      <div class="cell"><h4>Delivery</h4><p>Outcomes and timelines across both divisions; cross-team alignment.</p></div>
      <div class="cell"><h4>Technical</h4><p>Direction through reviews, architecture guidance and roadmaps — not hands-on coding.</p></div>
      <div class="cell"><h4>Process</h4><p>Improving how the organization works and collaborates.</p></div>
    </div>

    <p class="am-quote">“Adaptive yet principle-based. I'd rather grow a person than ship a feature — because good people ship every feature after.”</p>

    <hr class="am-rule">

    <p class="am-kicker">Craft &amp; standards</p>
    <h2 class="am-h">Quality is in the DNA</h2>
    <p>Early in my career I worked — often on my own time — on global standardization. I'm a contributor to <strong>five W3C Widget specifications</strong> (Digital Signature, Packaged Web Apps, Interface, View-mode, WARP), collaborating by night with the spec editor. I led <strong>automotive IVI</strong> app testing and authored HKMC device-API specs, and handled <strong>BONDI / JIL / WAC</strong> certification. That standard of rigor still shapes every decision I make.</p>
    <div class="am-tags">
      <span>SQA / SET</span><span>Test automation</span><span>W3C Widgets ×5</span><span>Automotive IVI</span><span>ISTQB FL</span><span>BONDI · JIL · WAC</span><span>Observability</span><span>DevOps mindset</span>
    </div>

    <hr class="am-rule">

    <p class="am-kicker">Right now</p>
    <h2 class="am-h">What I'm building today</h2>
    <p>I'm leading VNTG's shift toward an <strong>AI-Native organization</strong> through the <strong>AI Worker</strong> certification program — helping every member apply AI to real work, not demos. In 2026 Q1, <strong>212 people took part and 96% finished</strong> the journey.</p>
    <p>On the platform side, the R&amp;D Division builds <strong>Terroir</strong>, our Internal Developer Platform, while Platform Service runs it with a full observability and security stack. And outside the org chart, I curate a personal knowledge portal — this very site — as a living experiment in AI-assisted writing, design, and engineering.</p>

    <p class="am-kicker" style="margin-top:42px">Find me</p>
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

    <p class="am-lead">저는 개발자로 시작해 품질 엔지니어링을 거쳐, 지금은 사람을 이끕니다. 그 과정에서 배운 건, 소프트웨어의 어려운 부분은 코드가 아니라 — <strong>'만드는 방식(Build)'</strong>과 <strong>'운영하는 방식(Run)'</strong>을 하나로 정렬하고, 그 사이에 있는 사람들이 최선의 일을 하도록 돕는 일이라는 것입니다.</p>

    <p>현재 <strong>VNTG</strong> 기술총괄(CTO) 산하에서 두 개 실을 함께 이끕니다. <strong>플랫폼서비스실</strong>(Run &amp; Operate)과 <strong>R&amp;D실</strong>(Research &amp; Build). 한쪽은 플랫폼을 설계하고, 다른 한쪽은 운영합니다. 둘을 같이 맡는다는 건 그 사이의 다리가 짧다는 뜻입니다 — 인수인계가 줄고, 결정이 빨라지며, 방향이 하나로 모입니다.</p>

    <div class="am-stats">
      <div class="am-stat"><b>23</b><span>업계 경력 (년)</span></div>
      <div class="am-stat"><b>8</b><span>거쳐온 회사</span></div>
      <div class="am-stat"><b>5</b><span>W3C 명세 기여</span></div>
      <div class="am-stat"><b>70</b><span>최대 매니지먼트 인원</span></div>
    </div>

    <hr class="am-rule">

    <p class="am-kicker">Build × Run</p>
    <h2 class="am-h">두 개의 실, 하나의 방향</h2>
    <p>대부분의 조직은 플랫폼을 '만드는 팀'과 '살아 있게 하는 팀'을 분리합니다. 바로 그 경계에서 맥락이 새고 우선순위가 어긋납니다. 저는 양쪽을 함께 맡아 설계 의도가 운영 단계까지 그대로 살아남도록 합니다.</p>

    <div class="am-fig">
      <svg viewBox="0 0 1000 360" role="img" aria-label="R&D실은 만들고 플랫폼서비스실은 운영하며 Chris가 둘을 잇는다">
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
        <text x="500" y="193" text-anchor="middle" fill="#94a3b8" font-family="-apple-system,sans-serif" font-size="11" font-weight="600">양쪽 정렬</text>
        <text x="500" y="330" text-anchor="middle" fill="#475569" font-family="-apple-system,sans-serif" font-size="14" font-style="italic">설계 의도 → 운영까지 그대로 이어짐</text>
      </svg>
      <p class="am-cap">Build와 Run을 함께 맡으면 플랫폼의 설계와 운영이 한 줄로 정렬됩니다.</p>
    </div>

    <hr class="am-rule">

    <p class="am-kicker">여정</p>
    <h2 class="am-h">여기까지 온 길</h2>
    <p>여덟 개의 회사, 하나의 연결된 흐름 — 제품이 어떻게 만들어지고 또 어떻게 무너지는지를 모든 각도에서 이해해 온 시간입니다.</p>

    <ul class="am-tl">
      <li><div class="yr">2025 — 현재 · VNTG</div><div class="role">플랫폼서비스실장 · R&amp;D실장 (겸직)</div><div class="dsc">기술총괄 산하 두 개 실을 함께 이끌며, 전사 AI-Native 전환을 주도.</div></li>
      <li><div class="yr">2019 — 2025 · 바로고</div><div class="role">R&amp;D센터 센터장</div><div class="dsc">QA 리드에서 센터장까지. 70명 규모 개발조직과 대규모 레거시→신규 아키텍처 전환을 총괄.</div></li>
      <li><div class="yr">2015 — 2018 · 달리웍스</div><div class="role">QA · 제품/운영 (IoT)</div><div class="dsc">Thing+ IoT 플랫폼의 품질·운영·기술지원. 서울시 IoT 해커톤 멘토.</div></li>
      <li><div class="yr">2006 — 2015 · 오비고</div><div class="role">QCC팀 팀장</div><div class="dsc">모바일·자동차 웹 플랫폼에서 약 10년. W3C 위젯 명세 Contributor, 현대·도요타·혼다 IVI 앱 테스트 주도.</div></li>
      <li><div class="yr">2002 — 2006</div><div class="role">웹 개발자 → QA 엔지니어</div><div class="dsc">시작점 — 사이트를 만들다가, 품질이 진짜 내 일이라는 걸 발견한 시기 (이시스템즈·MDNT·모다·퓨즈와이어).</div></li>
    </ul>

    <hr class="am-rule">

    <p class="am-kicker">리더십</p>
    <h2 class="am-h">제 무게중심은 '사람'입니다</h2>
    <p>품질과 테스트 자동화로 성장했기에 일을 깊이 이해합니다. 다만 지금의 역할에서는 코드를 직접 짜기보다 방향을 제시할 때 더 큰 가치를 만듭니다. 엔지니어링 매니지먼트의 표준 네 축에 제 무게중심을 매핑하면 이렇습니다:</p>

    <div class="am-pmap">
      <div class="cell lead"><h4>People (사람)</h4><p>주 포커스 — 채용·1:1·성장·인재관리·조직문화. 레버리지는 여기에 있습니다.</p></div>
      <div class="cell"><h4>Delivery</h4><p>두 실의 산출물과 일정, 부서 간 조율.</p></div>
      <div class="cell"><h4>Technical</h4><p>리뷰·아키텍처 가이드·로드맵으로 방향 제시 — 직접 구현이 아닌.</p></div>
      <div class="cell"><h4>Process</h4><p>조직이 일하고 협업하는 방식을 개선.</p></div>
    </div>

    <p class="am-quote">"유연하되 원칙을 지킵니다. 기능 하나를 더 내보내기보다 사람 하나를 키우는 쪽을 택합니다 — 좋은 사람은 그 뒤의 모든 기능을 만들어내니까요."</p>

    <hr class="am-rule">

    <p class="am-kicker">전문성 &amp; 표준</p>
    <h2 class="am-h">품질은 DNA에 있습니다</h2>
    <p>커리어 초반, 종종 개인 시간을 들여가며 글로벌 표준화에 참여했습니다. <strong>W3C 위젯 5개 명세</strong>(Digital Signature, Packaged Web Apps, Interface, View-mode, WARP)에 Contributor로 등재되었고, 명세 에디터와 야간 이메일로 협업했습니다. <strong>자동차 IVI</strong> 앱 테스트를 주도하고 HKMC 디바이스 API 명세를 작성했으며, <strong>BONDI / JIL / WAC</strong> 인증을 대응했습니다. 그때의 엄격함이 지금의 모든 의사결정을 만듭니다.</p>
    <div class="am-tags">
      <span>SQA / SET</span><span>테스트 자동화</span><span>W3C 위젯 ×5</span><span>자동차 IVI</span><span>ISTQB FL</span><span>BONDI · JIL · WAC</span><span>관측성</span><span>DevOps 마인드셋</span>
    </div>

    <hr class="am-rule">

    <p class="am-kicker">지금</p>
    <h2 class="am-h">요즘 만들고 있는 것</h2>
    <p>VNTG를 <strong>AI-Native 조직</strong>으로 전환하는 흐름을 <strong>AI Worker 인증</strong> 프로그램으로 이끌고 있습니다 — 데모가 아니라 실무에 AI를 적용하도록 돕는 일입니다. 2026년 1분기에 <strong>212명이 참여해 96%가 완주</strong>했습니다.</p>
    <p>플랫폼 측면에서는 R&amp;D실이 내부 개발자 플랫폼 <strong>Terroir(떼루아)</strong>를 구축하고, 플랫폼서비스실이 관측성·보안 스택과 함께 이를 운영합니다. 그리고 조직도 바깥에서는 이 사이트 — 개인 지식 포털 — 를 직접 큐레이션하며 AI 기반 글쓰기·디자인·엔지니어링을 살아 있는 실험으로 이어가고 있습니다.</p>

    <p class="am-kicker" style="margin-top:42px">연결</p>
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
