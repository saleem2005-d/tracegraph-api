const pptxgen = require('pptxgenjs');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_16x9'; // 13.33 x 7.5 inches
pptx.author = 'Anantha Lakshmi Institute of Technology & Sciences';
pptx.company = 'Ministry of Home Affairs (I4C)';
pptx.subject = 'SIH26184 Project KAVACH-GRAPH Final Defense Deck';
pptx.title = 'Project KAVACH-GRAPH Presentation';

// ---------------------------------------------------------------------------
// COLOR SYSTEM (Deep Command Center Theme)
// ---------------------------------------------------------------------------
const C_BG = '06080F';          // Deep Obsidian Navy Canvas
const C_PANEL = '0B1021';       // Surface Container Background
const C_PANEL_BORDER = '1E293B';// 1px Slate Border
const C_CYAN = '38BDF8';        // Intelligence Highlight
const C_BLUE = '2563EB';        // Primary Flow
const C_RED = 'EF4444';         // Emergency Threat & Critical Path
const C_GREEN = '10B981';       // Verification / Capital Protected
const C_TEXT_WHITE = 'F8FAFC';  // High-Contrast Header White
const C_TEXT_MUTED = '94A3B8';  // Metadata & Secondary Text

// ---------------------------------------------------------------------------
// GLOBAL SLIDE SCAFFOLDING HELPER
// ---------------------------------------------------------------------------
function createBaseSlide(categoryTag, slideTitle, slideNum, speakerNotes) {
  const slide = pptx.addSlide();
  slide.background = { color: C_BG };

  // Top Accent Line
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.8, y: 0.4, w: 11.73, h: 0.04,
    fill: { color: C_CYAN }, line: { color: C_CYAN }
  });

  // Header Hierarchy (Category + Main Title)
  slide.addText(
    [
      { text: `${categoryTag.toUpperCase()}\n`, options: { fontSize: 10, bold: true, color: C_CYAN, fontFace: 'Arial' } },
      { text: slideTitle, options: { fontSize: 20, bold: true, color: C_TEXT_WHITE, fontFace: 'Arial' } }
    ],
    { x: 0.8, y: 0.5, w: 11.73, h: 1.0, margin: 0 }
  );

  // Statutory Footer
  slide.addText(
    `SMART INDIA HACKATHON 2026 | PROJECT KAVACH-GRAPH (PS ID: SIH26184) | MINISTRY OF HOME AFFAIRS (I4C) | SLIDE ${slideNum} OF 12`,
    { x: 0.8, y: 6.9, w: 11.73, h: 0.35, fontSize: 8.5, color: C_TEXT_MUTED, fontFace: 'Arial' }
  );

  if (speakerNotes) {
    slide.addNotes(speakerNotes);
  }

  return slide;
}

// ===========================================================================
// SLIDE 1: TITLE & STATUTORY SCOPE
// ===========================================================================
{
  const s1 = createBaseSlide(
    'Smart India Hackathon 2026 | Ministry of Home Affairs (I4C)',
    'PROJECT KAVACH-GRAPH: Autonomous Mule Layering Forensics & Cash-Out Interception',
    1,
    'Respected evaluators, under the I4C framework, the central battle in financial cybercrime is intercepting the physical cash withdrawal before the trail goes dark. KAVACH-GRAPH replaces manual 45-minute inter-bank inquiry latency with sub-15ms deterministic graph pathfinding and spatial probability modeling.'
  );

  // Metadata Grid Boxes
  const meta = [
    { label: 'PROBLEM STATEMENT ID', val: 'SIH26184', sub: 'Category: Software / Cyber Forensics' },
    { label: 'GOVERNMENT CLIENT', val: 'Ministry of Home Affairs', sub: 'Indian Cyber Crime Coordination Centre (I4C)' },
    { label: 'NOMINATED INSTITUTION', val: 'ALTS (Anantapur)', sub: 'SPOC: Dr. Muralidhar Kurni' },
    { label: 'STATUTORY COMPLIANCE', val: 'Sec 91 & 102 CrPC', sub: 'ISO 20022 Financial Messaging & DPDP 2023' }
  ];

  meta.forEach((item, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    s1.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.8 + col * 5.95, y: 1.7 + row * 1.45, w: 5.75, h: 1.25,
      fill: { color: C_PANEL }, line: { color: C_PANEL_BORDER, width: 1 }, rectRadius: 0.1
    });
    s1.addText(
      [
        { text: `${item.label}\n`, options: { fontSize: 9.5, bold: true, color: C_CYAN } },
        { text: `${item.val}\n`, options: { fontSize: 13, bold: true, color: C_TEXT_WHITE } },
        { text: item.sub, options: { fontSize: 9, color: C_TEXT_MUTED } }
      ],
      { x: 1.0 + col * 5.95, y: 1.75 + row * 1.45, w: 5.35, h: 1.15, margin: 0, fontFace: 'Arial' }
    );
  });

  // Executive Scope Box
  s1.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 4.8, w: 11.7, h: 1.8,
    fill: { color: C_PANEL }, line: { color: C_RED, width: 1.5 }, rectRadius: 0.1
  });
  s1.addText(
    [
      { text: 'OPERATIONAL SCOPE & EXECUTIVE VALUE\n', options: { fontSize: 11, bold: true, color: C_RED } },
      { text: 'An autonomous decision-support system for the CFCFRMS (1930 Helpline) that ingests cybercrime complaints, reconstructs multi-tier smurfing topologies in <15 milliseconds, predicts target cash-out ATMs using spatial decay algorithms, and automates Section 91 CrPC freeze recommendations before physical extraction occurs.', options: { fontSize: 10.5, color: C_TEXT_WHITE } }
    ],
    { x: 1.0, y: 4.95, w: 11.3, h: 1.5, margin: 0, fontFace: 'Arial' }
  );
}

// ===========================================================================
// SLIDE 2: THE OPERATIONAL VULNERABILITY (TIMELINE)
// ===========================================================================
{
  const s2 = createBaseSlide(
    'Problem Statement Analysis',
    'The 12-Minute Cash-Out Window: Syndicates Move at UPI Speed, Police at Bureaucratic Speed',
    2,
    'When a citizen loses money, fraudsters split the funds across three layers of mule accounts in under 180 seconds and withdraw cash at an ATM in under 8 minutes. Our current police response averages 45 minutes across manual bank nodal emails. By the time a notice is processed, the money has exited the ATM dispenser.'
  );

  // Left Box: Adversary Speed
  s2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.7, w: 5.75, h: 4.9,
    fill: { color: C_PANEL }, line: { color: C_RED, width: 1.5 }, rectRadius: 0.1
  });
  s2.addText(
    [
      { text: 'ADVERSARY SPEED (0 TO 8 MINS)\n\n', options: { fontSize: 12, bold: true, color: C_RED } },
      { text: '• [t = 00s] Victim Defrauded: ', options: { fontSize: 10, bold: true, color: C_TEXT_WHITE } },
      { text: 'Citizen loses ₹8.5 Lakhs via phishing / digital arrest scam.\n\n', options: { fontSize: 10, color: C_TEXT_MUTED } },
      { text: '• [t = 45s] Layer-1 Smurfing: ', options: { fontSize: 10, bold: true, color: C_TEXT_WHITE } },
      { text: 'Funds split into 3 sub-₹50k tranches via UPI to evade AML limits.\n\n', options: { fontSize: 10, color: C_TEXT_MUTED } },
      { text: '• [t = 180s] Layer-2 Aggregation: ', options: { fontSize: 10, bold: true, color: C_TEXT_WHITE } },
      { text: 'Re-aggregated into 2 pass-through accounts across different banks.\n\n', options: { fontSize: 10, color: C_TEXT_MUTED } },
      { text: '• [t = 480s] PHYSICAL CASHOUT: ', options: { fontSize: 10, bold: true, color: C_RED } },
      { text: 'Mule withdraws currency from regional ATM. Trail goes completely dark.', options: { fontSize: 10, color: C_TEXT_MUTED } }
    ],
    { x: 1.0, y: 1.9, w: 5.35, h: 4.5, margin: 0, fontFace: 'Arial' }
  );

  // Right Box: Current Triage Lag
  s2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 6.75, y: 1.7, w: 5.75, h: 4.9,
    fill: { color: C_PANEL }, line: { color: C_PANEL_BORDER, width: 1 }, rectRadius: 0.1
  });
  s2.addText(
    [
      { text: 'CURRENT 1930 / POLICE TRIAGE LAG (0 TO 45+ MINS)\n\n', options: { fontSize: 12, bold: true, color: C_CYAN } },
      { text: '• [t = 10m] 1930 Helpline Call: ', options: { fontSize: 10, bold: true, color: C_TEXT_WHITE } },
      { text: 'Distressed citizen connects with state cyber cell call taker.\n\n', options: { fontSize: 10, color: C_TEXT_MUTED } },
      { text: '• [t = 18m] NCRP Ticket Logged: ', options: { fontSize: 10, bold: true, color: C_TEXT_WHITE } },
      { text: 'Manual entry of UTR and transaction references into portal.\n\n', options: { fontSize: 10, color: C_TEXT_MUTED } },
      { text: '• [t = 32m] Bank Nodal Inquiries: ', options: { fontSize: 10, bold: true, color: C_TEXT_WHITE } },
      { text: 'Sequential emails dispatched to Bank A; waiting on human officer.\n\n', options: { fontSize: 10, color: C_TEXT_MUTED } },
      { text: '• [t = 50m+] POST-MORTEM FILING: ', options: { fontSize: 10, bold: true, color: C_CYAN } },
      { text: 'Bank A confirms funds already hopped to Bank B. Ledger trail is dead.', options: { fontSize: 10, color: C_TEXT_MUTED } }
    ],
    { x: 6.95, y: 1.9, w: 5.35, h: 4.5, margin: 0, fontFace: 'Arial' }
  );
}

// ===========================================================================
// SLIDE 3: STRUCTURAL BLINDSPOTS IN EXISTING SYSTEMS
// ===========================================================================
{
  const s3 = createBaseSlide(
    'Root-Cause Diagnostic',
    'Three Structural Blindspots in Existing Anti-Fraud Infrastructure',
    3,
    'Single-bank AML engines are blind to cross-bank hops. Relational databases fail at deep multi-hop graph queries, and financial transaction switches lack spatial awareness of physical ATM liquidity or police patrols.'
  );

  const blindspots = [
    { num: '01', title: 'INSTITUTIONAL SILOS', desc: 'Banks only monitor internal accounts. When funds jump from HDFC to SBI to ICICI, forensic visibility breaks at each boundary.' },
    { num: '02', title: 'RELATIONAL GRAPH LIMITS', desc: 'SQL tables fail on recursive cross-entity pathfinding; deep multi-hop queries time out under high transaction volumes.' },
    { num: '03', title: 'NO SPATIAL AWARENESS', desc: 'Financial switches process transactions with zero real-time correlation to physical ATM cash balances or police patrol GPS.' }
  ];

  blindspots.forEach((b, idx) => {
    s3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.8 + idx * 3.95, y: 1.7, w: 3.8, h: 4.9,
      fill: { color: C_PANEL }, line: { color: C_PANEL_BORDER, width: 1 }, rectRadius: 0.1
    });
    s3.addText(
      [
        { text: `${b.num}\n`, options: { fontSize: 24, bold: true, color: C_CYAN } },
        { text: `${b.title}\n\n`, options: { fontSize: 12, bold: true, color: C_TEXT_WHITE } },
        { text: b.desc, options: { fontSize: 10.5, color: C_TEXT_MUTED } }
      ],
      { x: 1.0 + idx * 3.95, y: 1.9, w: 3.4, h: 4.5, margin: 0, fontFace: 'Arial' }
    );
  });
}

// ===========================================================================
// SLIDE 4: EMPIRICAL EVIDENCE & STATUTORY MANDATE
// ===========================================================================
{
  const s4 = createBaseSlide(
    'Research & Statistical Validation',
    'Validated National Cyber Fraud Data & Statutory Legal Anchors',
    4,
    'Official MHA disclosures show over ₹52,000 Crore lost to cyber fraud in 6 years and over 32 Lakh mule accounts flagged. However, rapid intervention through 1930 has already saved ₹8,690 Crore, proving that sub-second response times directly preserve citizen capital.'
  );

  const stats = [
    { num: '₹52,976 CR', label: 'Lost across India over 6 yrs (I4C / NHRC Disclosures)' },
    { num: '32+ LAKH', label: 'Mule accounts identified in I4C National Suspect Registry' },
    { num: '₹8,690 CR', label: 'Citizen capital saved via 1930 Golden Hour interventions' }
  ];

  stats.forEach((st, idx) => {
    s4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.8 + idx * 3.95, y: 1.7, w: 3.8, h: 1.6,
      fill: { color: C_PANEL }, line: { color: C_CYAN, width: 1 }, rectRadius: 0.1
    });
    s4.addText(
      [
        { text: `${st.num}\n`, options: { fontSize: 18, bold: true, color: C_CYAN } },
        { text: st.label, options: { fontSize: 9.5, color: C_TEXT_WHITE } }
      ],
      { x: 1.0 + idx * 3.95, y: 1.85, w: 3.4, h: 1.3, margin: 0, fontFace: 'Arial' }
    );
  });

  s4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 3.6, w: 11.7, h: 3.0,
    fill: { color: C_PANEL }, line: { color: C_PANEL_BORDER, width: 1 }, rectRadius: 0.1
  });
  s4.addText(
    [
      { text: 'STATUTORY COMPLIANCE & LEGAL ANCHORS\n\n', options: { fontSize: 11, bold: true, color: C_CYAN } },
      { text: '• Section 91 & 102, Code of Criminal Procedure (CrPC): ', options: { fontSize: 10, bold: true, color: C_TEXT_WHITE } },
      { text: 'Empowers police officers to demand immediate production of digital records and order precautionary holds on stolen property.\n\n', options: { fontSize: 10, color: C_TEXT_MUTED } },
      { text: '• CERT-In Cyber Security Directives (Sec 70B IT Act): ', options: { fontSize: 10, bold: true, color: C_TEXT_WHITE } },
      { text: 'Statutory 6-hour reporting window for financial transaction compromises and rapid mitigation mandates.\n\n', options: { fontSize: 10, color: C_TEXT_MUTED } },
      { text: '• Citizen Financial Cyber Fraud Reporting System (CFCFRMS): ', options: { fontSize: 10, bold: true, color: C_TEXT_WHITE } },
      { text: 'Official 1930 SOP for inter-bank transaction blocking during the active Golden Hour.', options: { fontSize: 10, color: C_TEXT_MUTED } }
    ],
    { x: 1.0, y: 3.75, w: 11.3, h: 2.7, margin: 0, fontFace: 'Arial' }
  );
}

// ===========================================================================
// SLIDE 5: DUAL-ENGINE SYSTEM ARCHITECTURE
// ===========================================================================
{
  const s5 = createBaseSlide(
    'Engineering & System Architecture',
    'Strict Segregation: Deterministic Forensic Engine + Agentic Synthesis Layer',
    5,
    'We enforce a strict separation of concerns. Pathfinding and probability scoring are performed entirely by deterministic graph algorithms and mathematical decay solvers—guaranteeing sub-15ms latency without hallucinations. Gemini 2.5 is deployed strictly at the decision synthesis layer.'
  );

  // Diagram Layout (Left: Deterministic, Right: Agentic)
  s5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.7, w: 5.75, h: 4.9,
    fill: { color: C_PANEL }, line: { color: C_CYAN, width: 1.5 }, rectRadius: 0.1
  });
  s5.addText(
    [
      { text: 'DETERMINISTIC FORENSIC CORE (Pure Math / No LLM)\n\n', options: { fontSize: 11, bold: true, color: C_CYAN } },
      { text: '• NetworkX BFS Directed Multigraph Engine\n', options: { fontSize: 10, bold: true, color: C_TEXT_WHITE } },
      { text: 'Traverses cross-bank adjacency matrices locally in memory in <15ms.\n\n', options: { fontSize: 9.5, color: C_TEXT_MUTED } },
      { text: '• SHA-256 Client-Side Anonymization\n', options: { fontSize: 10, bold: true, color: C_TEXT_WHITE } },
      { text: 'Hashes all PII (Account, Phone, UPI) at ingestion; zero clear-text leakage.\n\n', options: { fontSize: 9.5, color: C_TEXT_MUTED } },
      { text: '• Spatial Decay Softmax Solver\n', options: { fontSize: 10, bold: true, color: C_TEXT_WHITE } },
      { text: 'Calculates Haversine decay, liquidity balance, and velocity multipliers.', options: { fontSize: 9.5, color: C_TEXT_MUTED } }
    ],
    { x: 1.0, y: 1.9, w: 5.35, h: 4.5, margin: 0, fontFace: 'Arial' }
  );

  s5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 6.75, y: 1.7, w: 5.75, h: 4.9,
    fill: { color: C_PANEL }, line: { color: C_PANEL_BORDER, width: 1 }, rectRadius: 0.1
  });
  s5.addText(
    [
      { text: 'AGENTIC DECISION LAYER (Google Gemini 2.5 Flash)\n\n', options: { fontSize: 11, bold: true, color: C_TEXT_WHITE } },
      { text: '• Pydantic v2 Schema Enforcement\n', options: { fontSize: 10, bold: true, color: C_CYAN } },
      { text: 'Forces LLM outputs into strict, typed JSON contracts (PoliceDispatchAlert).\n\n', options: { fontSize: 9.5, color: C_TEXT_MUTED } },
      { text: '• Statutory Dispatch Order Generation\n', options: { fontSize: 10, bold: true, color: C_CYAN } },
      { text: 'Synthesizes actionable Sec 91 CrPC notices for field PCR units.\n\n', options: { fontSize: 9.5, color: C_TEXT_MUTED } },
      { text: '• Fail-Safe Execution\n', options: { fontSize: 10, bold: true, color: C_CYAN } },
      { text: 'If external API drops, the deterministic engine runs uninterrupted.', options: { fontSize: 9.5, color: C_TEXT_MUTED } }
    ],
    { x: 6.95, y: 1.9, w: 5.35, h: 4.5, margin: 0, fontFace: 'Arial' }
  );
}

// ===========================================================================
// SLIDE 6: TRANSACTION GRAPH FORENSICS (DAG VISUAL)
// ===========================================================================
{
  const s6 = createBaseSlide(
    'Forensic Methodology',
    'Reconstructing 5-Tier Directed Smurfing Networks in Memory',
    6,
    'Here is our graph engine reconstructing an active case in 8.4 milliseconds. It isolates a classic 1-to-3 fan-out designed to bypass reporting thresholds, followed by a rapid fan-in to two Tier-2 accounts. Every edge is weighted by timestamp differentials.'
  );

  s6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.7, w: 11.7, h: 4.9,
    fill: { color: C_PANEL }, line: { color: C_PANEL_BORDER, width: 1 }, rectRadius: 0.1
  });

  // Flow Hierarchy Visual Representation
  const nodes = [
    { label: 'SOURCE VICTIM', sub: '₹8.50 Lakh Debit', x: 1.2, y: 3.3, col: C_RED },
    { label: 'MULE T1-01', sub: '₹2.83 Lakh (UPI)', x: 4.2, y: 2.1, col: 'F59E0B' },
    { label: 'MULE T1-02', sub: '₹2.83 Lakh (UPI)', x: 4.2, y: 3.3, col: 'F59E0B' },
    { label: 'MULE T1-03', sub: '₹2.83 Lakh (UPI)', x: 4.2, y: 4.5, col: 'F59E0B' },
    { label: 'MULE T2-01', sub: '₹4.16 Lakh (IMPS)', x: 7.4, y: 2.7, col: C_BLUE },
    { label: 'MULE T2-02', sub: '₹4.16 Lakh (IMPS)', x: 7.4, y: 3.9, col: C_BLUE },
    { label: 'TARGET ATM', sub: 'ATM-IN-DEL-009', x: 10.4, y: 3.3, col: C_RED }
  ];

  nodes.forEach(n => {
    s6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: n.x, y: n.y, w: 1.7, h: 0.9,
      fill: { color: C_BG }, line: { color: n.col, width: 1.5 }, rectRadius: 0.08
    });
    s6.addText(
      [
        { text: `${n.label}\n`, options: { fontSize: 8.5, bold: true, color: n.col } },
        { text: n.sub, options: { fontSize: 8, color: C_TEXT_WHITE } }
      ],
      { x: n.x, y: n.y + 0.1, w: 1.7, h: 0.7, align: 'center', fontFace: 'Arial' }
    );
  });

  s6.addText(
    'TOPOLOGICAL METRICS: Traversal Latency: 8.42ms | Fan-Out/Fan-In Symmetry: 1 -> 3 -> 2 -> 1 | Transit Delta: 180s',
    { x: 1.0, y: 5.9, w: 11.3, h: 0.4, fontSize: 9.5, bold: true, color: C_CYAN, fontFace: 'Courier New' }
  );
}

// ===========================================================================
// SLIDE 7: SPATIAL DECAY CASH-OUT PREDICTION MATRIX
// ===========================================================================
{
  const s7 = createBaseSlide(
    'Spatial Probability Modeling',
    'Multi-Factor Spatial Decay & Softmax Probability Allocation',
    7,
    'How do we predict ATM-009 with 88% confidence? We evaluate three real-world constraints: Haversine spatial decay, terminal cash liquidity (filtering out ATMs with insufficient funds), and current withdrawal velocity anomalies.'
  );

  s7.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.7, w: 11.7, h: 1.3,
    fill: { color: C_PANEL }, line: { color: C_CYAN, width: 1 }, rectRadius: 0.1
  });
  s7.addText(
    [
      { text: 'MATHEMATICAL SCORING FORMULATION:\n', options: { fontSize: 10, bold: true, color: C_CYAN } },
      { text: 'Raw Score S_i = [ 1 / (Dist_km)^1.2 ] * [ Liquidity_INR / Max_Cap ] * [ 1 + (0.15 * Vel_w) ]\n', options: { fontSize: 9.5, color: C_TEXT_WHITE, fontFace: 'Courier New' } },
      { text: 'Probability P(ATM_i) = exp(S_i - max(S)) / Σ exp(S_j - max(S))', options: { fontSize: 9.5, color: C_TEXT_WHITE, fontFace: 'Courier New' } }
    ],
    { x: 1.0, y: 1.8, w: 11.3, h: 1.1, margin: 0 }
  );

  // Structured Table
  const tableRows = [
    [
      { text: 'TERMINAL ID', options: { bold: true, color: C_CYAN, fill: { color: C_BG } } },
      { text: 'BANK', options: { bold: true, color: C_CYAN, fill: { color: C_BG } } },
      { text: 'DISTANCE', options: { bold: true, color: C_CYAN, fill: { color: C_BG } } },
      { text: 'LIQUIDITY', options: { bold: true, color: C_CYAN, fill: { color: C_BG } } },
      { text: 'VELOCITY', options: { bold: true, color: C_CYAN, fill: { color: C_BG } } },
      { text: 'PROBABILITY', options: { bold: true, color: C_CYAN, fill: { color: C_BG } } },
      { text: 'STATUS', options: { bold: true, color: C_CYAN, fill: { color: C_BG } } }
    ],
    ['ATM-IN-DEL-009', 'AXIS', '0.84 km', '₹20.90 Lakh', '4.4 tx/hr', '88.2%', 'TARGET LOCKED'],
    ['ATM-IN-DEL-003', 'ICICI', '1.42 km', '₹18.30 Lakh', '2.1 tx/hr', '6.4%', 'MONITOR'],
    ['ATM-IN-DEL-001', 'PNB', '2.10 km', '₹10.20 Lakh', '0.9 tx/hr', '3.1%', 'STANDBY'],
    ['ATM-IN-DEL-012', 'SBI', '3.45 km', '₹21.80 Lakh', '1.2 tx/hr', '2.3%', 'STANDBY']
  ];

  s7.addTable(tableRows, {
    x: 0.8, y: 3.2, w: 11.7,
    fontSize: 9.5, color: C_TEXT_WHITE,
    border: { pt: 1, color: C_PANEL_BORDER },
    fill: { color: C_PANEL }
  });
}

// ===========================================================================
// SLIDE 8: TACTICAL COMMAND CENTER (DASHBOARD PREVIEW)
// ===========================================================================
{
  const s8 = createBaseSlide(
    'Operational Prototype',
    'Real-Time Tactical Command Console for Law Enforcement Operations',
    8,
    'This is our working command dashboard. When an incident is ingested, the node graph lights up sequentially with hop timestamps. The tactical map recenters on the target ATM with a pulsing intercept perimeter, and the Golden Hour countdown begins.'
  );

  // Top KPI Ribbon
  const kpis = [
    { label: 'FRAUD CASES INGESTED', val: '127 Today' },
    { label: 'ESTIMATED FUNDS RECOVERABLE', val: '₹2.34 Cr' },
    { label: 'AVG TRAVERSAL LATENCY', val: '< 15 ms' },
    { label: 'MULE ACCOUNTS ISOLATED', val: '61 Layered' }
  ];

  kpis.forEach((k, idx) => {
    s8.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.8 + idx * 2.95, y: 1.7, w: 2.8, h: 0.9,
      fill: { color: C_PANEL }, line: { color: C_PANEL_BORDER, width: 1 }, rectRadius: 0.08
    });
    s8.addText(
      [
        { text: `${k.label}\n`, options: { fontSize: 8, color: C_TEXT_MUTED } },
        { text: k.val, options: { fontSize: 12, bold: true, color: C_CYAN } }
      ],
      { x: 0.9 + idx * 2.95, y: 1.75, w: 2.6, h: 0.8, fontFace: 'Arial' }
    );
  });

  // UI Placeholder Panels
  s8.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 2.8, w: 5.75, h: 3.8,
    fill: { color: C_PANEL }, line: { color: C_RED, width: 1 }, rectRadius: 0.1
  });
  s8.addText(
    [
      { text: 'SIMULATOR & AI DECISION DOSSIER\n\n', options: { fontSize: 10, bold: true, color: C_RED } },
      { text: '• FIR ID: FIR-2026-DEL-1027 (₹8.50 Lakh Loss)\n', options: { fontSize: 9, color: C_TEXT_WHITE } },
      { text: '• Golden Intercept Window: 11:42 mins (Ticking Countdown)\n', options: { fontSize: 9, color: 'FBBF24' } },
      { text: '• Multi-Factor Confidence Score: 88%\n', options: { fontSize: 9, color: C_GREEN } },
      { text: '  - Velocity: 92% | Graph Pattern: 85% | Proximity: 90%\n\n', options: { fontSize: 8.5, color: C_TEXT_MUTED } },
      { text: '• Automated Freeze: Sec 91 CrPC Webhook Dispatched', options: { fontSize: 9, bold: true, color: C_CYAN } }
    ],
    { x: 1.0, y: 2.95, w: 5.35, h: 3.5, margin: 0, fontFace: 'Arial' }
  );

  s8.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 6.75, y: 2.8, w: 5.75, h: 3.8,
    fill: { color: C_PANEL }, line: { color: C_PANEL_BORDER, width: 1 }, rectRadius: 0.1
  });
  s8.addText(
    [
      { text: 'REACT FLOW DAG & LEAFLET GIS MAP MATRIX\n\n', options: { fontSize: 10, bold: true, color: C_CYAN } },
      { text: '• Dynamic Staged Particle Flow (Victim -> T1 -> T2 -> ATM)\n', options: { fontSize: 9, color: C_TEXT_WHITE } },
      { text: '• Real-Time Edge Transit Timestamps on Connectors\n', options: { fontSize: 9, color: C_TEXT_WHITE } },
      { text: '• Dark Canvas Leaflet GIS (Esri Tiles / Zero Watermarks)\n', options: { fontSize: 9, color: C_TEXT_WHITE } },
      { text: '• Pulsing 600m Danger Radius over Target Terminal (ATM-009)', options: { fontSize: 9, color: C_RED } }
    ],
    { x: 6.95, y: 2.95, w: 5.35, h: 3.5, margin: 0, fontFace: 'Arial' }
  );
}

// ===========================================================================
// SLIDE 9: COMPARATIVE CAPABILITY BENCHMARK
// ===========================================================================
{
  const s9 = createBaseSlide(
    'Industry Benchmark',
    'Operational Capability Matrix: Legacy Workflow vs Project KAVACH-GRAPH',
    9,
    'This comparison highlights the core transformation. Today, tracing funds across multiple banks takes 45 to 120 minutes through manual emails and portals. KAVACH-GRAPH executes in under 15 milliseconds, shifting law enforcement from post-mortem filing to real-time physical interception.'
  );

  const compTable = [
    [
      { text: 'DIMENSION', options: { bold: true, color: C_CYAN, fill: { color: C_BG } } },
      { text: 'LEGACY 1930 / BANK WORKFLOW', options: { bold: true, color: C_TEXT_MUTED, fill: { color: C_BG } } },
      { text: 'PROJECT KAVACH-GRAPH', options: { bold: true, color: C_GREEN, fill: { color: C_BG } } }
    ],
    ['Traversal Response Time', '45 to 120 Minutes (Manual Email / Portal)', '< 15 Milliseconds (Deterministic In-Memory)'],
    ['Cross-Bank Visibility', 'Siloed (Single Institution Ledger View)', 'Unified Cross-Bank Directed Multigraph'],
    ['Layering Recognition', 'Flat Tabular Lookups (Relational SQL)', 'Multi-Hop Smurfing Graph DAG Engine'],
    ['ATM Cash-Out Prediction', 'Zero Capability (Post-Mortem CCTV Review)', 'Multi-Factor Spatial Decay Softmax Model'],
    ['Police Unit Dispatch', 'Delayed FIR / Days Post-Withdrawal', '12-Minute Golden Window Patrol Routing'],
    ['Bank Freeze Execution', 'Manual Batch Nodal Emails', 'Automated Sec 91 CrPC Webhooks (<100ms)']
  ];

  s9.addTable(compTable, {
    x: 0.8, y: 1.7, w: 11.7,
    fontSize: 9.5, color: C_TEXT_WHITE,
    border: { pt: 1, color: C_PANEL_BORDER },
    fill: { color: C_PANEL }
  });
}

// ===========================================================================
// SLIDE 10: SCALABILITY & PERFORMANCE BENCHMARKS
// ===========================================================================
{
  const s10 = createBaseSlide(
    'Technical Scalability & Stress Testing',
    'Performance Profile Under 50,000 Synthetic Transaction Bursts',
    10,
    'To verify national scalability, we stress-tested our engine against bursts of 50,000 synthetic transaction records. The in-memory graph maintains a sub-15 millisecond traversal latency with an active footprint under 400 megabytes.'
  );

  const bench = [
    { metric: '11.4 ms', label: 'Average Traversal Latency across 5-Hop Layering Chains' },
    { metric: '4,200 tx/s', label: 'Peak Ingestion Throughput per FastAPI Worker Process' },
    { metric: '384 MB', label: 'Active RAM Footprint for 100,000 Graph Nodes and Edges' },
    { metric: '3.2 ms', label: 'Spatial Softmax Evaluation Latency over 100 Regional ATMs' }
  ];

  bench.forEach((b, idx) => {
    s10.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.8 + idx * 2.95, y: 1.7, w: 2.8, h: 1.8,
      fill: { color: C_PANEL }, line: { color: C_CYAN, width: 1 }, rectRadius: 0.1
    });
    s10.addText(
      [
        { text: `${b.metric}\n`, options: { fontSize: 18, bold: true, color: C_CYAN } },
        { text: b.label, options: { fontSize: 9.5, color: C_TEXT_WHITE } }
      ],
      { x: 1.0 + idx * 2.95, y: 1.85, w: 2.4, h: 1.5, margin: 0, fontFace: 'Arial' }
    );
  });

  s10.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 3.8, w: 11.7, h: 2.8,
    fill: { color: C_PANEL }, line: { color: C_PANEL_BORDER, width: 1 }, rectRadius: 0.1
  });
  s10.addText(
    [
      { text: 'ENTERPRISE PRODUCTION DEPLOYMENT TOPOLOGY\n\n', options: { fontSize: 11, bold: true, color: C_CYAN } },
      { text: '• Ingestion Gateway: ', options: { fontSize: 10, bold: true, color: C_TEXT_WHITE } },
      { text: 'Asynchronous FastAPI endpoints backed by Redis Streams for zero-drop event queues.\n\n', options: { fontSize: 10, color: C_TEXT_MUTED } },
      { text: '• Distributed Compute Layer: ', options: { fontSize: 10, bold: true, color: C_TEXT_WHITE } },
      { text: 'Horizontally scalable graph partitions (Memgraph / Neo4j in-memory clusters).\n\n', options: { fontSize: 10, color: C_TEXT_MUTED } },
      { text: '• Sovereign On-Premise SOC: ', options: { fontSize: 10, bold: true, color: C_TEXT_WHITE } },
      { text: 'Zero external cloud lock-in; deployable inside state police cyber cell data centers.', options: { fontSize: 10, color: C_TEXT_MUTED } }
    ],
    { x: 1.0, y: 3.95, w: 11.3, h: 2.5, margin: 0, fontFace: 'Arial' }
  );
}

// ===========================================================================
// SLIDE 11: IMPLEMENTATION ROADMAP
// ===========================================================================
{
  const s11 = createBaseSlide(
    'Deployment Roadmap',
    'Phased Integration Strategy from Pilot Sandbox to National Federation',
    11,
    'We have established a clear, non-overpromising roadmap. Phase 1 is fully built and operational right now on our testbed. Phase 2 involves deploying within an I4C test sandbox to ingest historical NCRP data. Phase 3 targets state-wide federation.'
  );

  const phases = [
    { title: 'PHASE 1: BENCH VALIDATION', status: 'COMPLETED (CURRENT)', desc: '• Sub-15ms NetworkX BFS engine\n• Spatial decay softmax solver\n• React Flow visual DAG console\n• Simulated Sec 91 CrPC freeze API', col: C_GREEN },
    { title: 'PHASE 2: I4C SANDBOX PILOT', status: 'TARGET: Q3 2026', desc: '• Historical NCRP complaint ingestion\n• Bank nodal mock webhook sandbox\n• Calibration with PCR patrol response\n• Dockerized microservice package', col: C_CYAN },
    { title: 'PHASE 3: NATIONAL SCALE', status: 'TARGET: 2027', desc: '• Federation with 750+ Cyber Cells\n• Integration with NPCI IPG rails\n• Real-time automated switch holds\n• Full sovereign deployment', col: C_BLUE }
  ];

  phases.forEach((p, idx) => {
    s11.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.8 + idx * 3.95, y: 1.7, w: 3.8, h: 4.9,
      fill: { color: C_PANEL }, line: { color: p.col, width: 1.5 }, rectRadius: 0.1
    });
    s11.addText(
      [
        { text: `${p.title}\n`, options: { fontSize: 11, bold: true, color: p.col } },
        { text: `${p.status}\n\n`, options: { fontSize: 9, bold: true, color: C_TEXT_MUTED } },
        { text: p.desc, options: { fontSize: 10, color: C_TEXT_WHITE } }
      ],
      { x: 1.0 + idx * 3.95, y: 1.9, w: 3.4, h: 4.5, margin: 0, fontFace: 'Arial' }
    );
  });
}

// ===========================================================================
// SLIDE 12: CONCLUSION & DEFENSE THESIS
// ===========================================================================
{
  const s12 = createBaseSlide(
    'Executive Defense Thesis',
    'Transforming Cyber Fraud Defense from Post-Mortem Filing to Physical Interception',
    12,
    'To conclude: KAVACH-GRAPH solves the central bottleneck of cyber fraud. It replaces slow, manual inter-bank queries with sub-15ms deterministic graph forensics and spatial decay calculations. It does not guess, it does not hallucinate, and it provides law enforcement with the exact time and location needed to intercept physical cash-outs. Thank you.'
  );

  const pillars = [
    { title: 'DETERMINISTIC SPEED', sub: '< 15 ms Graph Core', desc: 'Eliminates the 45-minute inter-bank inquiry delay via in-memory directed traversals.' },
    { title: 'MATHEMATICAL ACCURACY', sub: '88%+ Target Confidence', desc: 'Multi-factor spatial decay pinpoints target ATMs with zero LLM pathfinding hallucinations.' },
    { title: 'STATUTORY COMPLIANCE', sub: 'Sec 91 / 102 CrPC', desc: 'Pre-formatted webhook directives enable automated holds across downstream bank switches.' }
  ];

  pillars.forEach((pil, idx) => {
    s12.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.8 + idx * 3.95, y: 1.7, w: 3.8, h: 3.2,
      fill: { color: C_PANEL }, line: { color: C_CYAN, width: 1 }, rectRadius: 0.1
    });
    s12.addText(
      [
        { text: `${pil.title}\n`, options: { fontSize: 11, bold: true, color: C_CYAN } },
        { text: `${pil.sub}\n\n`, options: { fontSize: 13, bold: true, color: C_TEXT_WHITE } },
        { text: pil.desc, options: { fontSize: 10, color: C_TEXT_MUTED } }
      ],
      { x: 1.0 + idx * 3.95, y: 1.85, w: 3.4, h: 2.9, margin: 0, fontFace: 'Arial' }
    );
  });

  s12.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 5.1, w: 11.7, h: 1.5,
    fill: { color: C_PANEL }, line: { color: C_RED, width: 1 }, rectRadius: 0.1
  });
  s12.addText(
    [
      { text: 'PROBLEM STATEMENT ID: SIH26184 | MINISTRY OF HOME AFFAIRS (I4C)\n', options: { fontSize: 10, bold: true, color: C_RED } },
      { text: 'Project KAVACH-GRAPH | Anantha Lakshmi Institute of Technology & Sciences (ALTS)\n', options: { fontSize: 11, bold: true, color: C_TEXT_WHITE } },
      { text: 'The floor is now open for technical cross-examination.', options: { fontSize: 9.5, color: C_TEXT_MUTED } }
    ],
    { x: 1.0, y: 5.25, w: 11.3, h: 1.2, margin: 0, fontFace: 'Arial' }
  );
}

// ---------------------------------------------------------------------------
// FILE EXPORT
// ---------------------------------------------------------------------------
const OUTPUT_FILE = 'SIH26184_KAVACH_GRAPH_Master_Deck.pptx';
pptx.writeFile({ fileName: OUTPUT_FILE })
  .then(fileName => {
    console.log(`\n===============================================================`);
    console.log(` SUCCESS: Presentation deck successfully generated!`);
    console.log(` File Saved: ${fileName}`);
    console.log(` Total Slides: 12 Widescreen (16:9) Slides with Full Speaker Notes`);
    console.log(`===============================================================\n`);
  })
  .catch(err => {
    console.error('Error generating PPTX:', err);
  });
