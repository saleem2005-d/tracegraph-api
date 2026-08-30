import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5) # 16:9 Widescreen Standard

# Color Palette (MHA Cyber Command Dark Theme)
C_BG = RGBColor(6, 8, 15)           # Deep Obsidian Canvas
C_PANEL = RGBColor(11, 16, 33)       # Charcoal Surface Panel
C_BORDER = RGBColor(30, 41, 59)      # Slate Border
C_CYAN = RGBColor(56, 189, 248)      # Intelligence Accent
C_BLUE = RGBColor(37, 99, 235)       # Primary Flow Blue
C_RED = RGBColor(239, 68, 68)        # Emergency Threat / Target
C_GREEN = RGBColor(16, 185, 129)     # Verified / Protected Capital
C_TEXT_WHITE = RGBColor(248, 250, 252) # Crisp White Title
C_TEXT_MUTED = RGBColor(148, 163, 184) # Muted Slate Text
C_AMBER = RGBColor(245, 158, 11)     # Warning / Intermediate

def apply_bg(slide):
    background = slide.background
    fill = background.fill
    fill.solid()
    fill.fore_color.rgb = C_BG

def add_header(slide, category_text, title_text):
    # Top Accent Bar
    top_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.4), Inches(11.733), Inches(0.04))
    top_bar.fill.solid()
    top_bar.fill.fore_color.rgb = C_CYAN
    top_bar.line.color.rgb = C_CYAN
    
    # Header Text
    txBox = slide.shapes.add_textbox(Inches(0.8), Inches(0.5), Inches(11.733), Inches(0.95))
    tf = txBox.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    
    p0 = tf.paragraphs[0]
    p0.text = category_text.upper()
    p0.font.size = Pt(10)
    p0.font.bold = True
    p0.font.color.rgb = C_CYAN
    p0.font.name = "Arial"
    
    p1 = tf.add_paragraph()
    p1.text = title_text
    p1.font.size = Pt(18)
    p1.font.bold = True
    p1.font.color.rgb = C_TEXT_WHITE
    p1.font.name = "Arial"

def add_footer(slide, slide_num):
    txBox = slide.shapes.add_textbox(Inches(0.8), Inches(6.95), Inches(11.733), Inches(0.35))
    tf = txBox.text_frame
    p = tf.paragraphs[0]
    p.text = f"SMART INDIA HACKATHON 2026  |  PROJECT KAVACH-GRAPH (PS ID: SIH26184)  |  SLIDE {slide_num} OF 6"
    p.font.size = Pt(8.5)
    p.font.color.rgb = C_TEXT_MUTED
    p.font.name = "Arial"

slide_layout = prs.slide_layouts[6] # Blank Layout

# ==============================================================================
# SLIDE 1: TITLE & TEAM METADATA
# ==============================================================================
s1 = prs.slides.add_slide(slide_layout)
apply_bg(s1)
add_header(s1, "Smart India Hackathon 2026 | Official Idea Submission", "PROJECT KAVACH-GRAPH: Autonomous Mule Layering Forensics & Cash-Out Interception")

# 4 Metadata Cards Grid
meta_cards = [
    ("PROBLEM STATEMENT ID", "SIH26184", "Category: Software / Cyber Forensics"),
    ("THEME & CLIENT", "Blockchain & Cybersecurity", "Ministry of Home Affairs / I4C (1930 Platform)"),
    ("NOMINATED INSTITUTION", "Anantha Lakshmi Inst. of Tech & Sci (ALTS)", "SPOC: Dr. Muralidhar Kurni"),
    ("STATUTORY COMPLIANCE", "Sec 91 & 102 CrPC", "ISO 20022 Financial Spec | DPDP Act 2023")
]

for idx, (lbl, val, sub) in enumerate(meta_cards):
    col = idx % 2
    row = idx // 2
    x = Inches(0.8 + col * 5.95)
    y = Inches(1.65 + row * 1.45)
    
    p_box = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(5.75), Inches(1.25))
    p_box.fill.solid()
    p_box.fill.fore_color.rgb = C_PANEL
    p_box.line.color.rgb = C_BORDER
    
    tf = p_box.text_frame
    tf.word_wrap = True
    p0 = tf.paragraphs[0]
    p0.text = lbl
    p0.font.size = Pt(9.5)
    p0.font.bold = True
    p0.font.color.rgb = C_CYAN
    p0.font.name = "Arial"
    
    p1 = tf.add_paragraph()
    p1.text = val
    p1.font.size = Pt(13)
    p1.font.bold = True
    p1.font.color.rgb = C_TEXT_WHITE
    p1.font.name = "Arial"
    
    p2 = tf.add_paragraph()
    p2.text = sub
    p2.font.size = Pt(9)
    p2.font.color.rgb = C_TEXT_MUTED
    p2.font.name = "Arial"

# Executive Value Box
sum_box = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(4.75), Inches(11.7), Inches(1.9))
sum_box.fill.solid()
sum_box.fill.fore_color.rgb = C_PANEL
sum_box.line.color.rgb = C_RED

stf = sum_box.text_frame
stf.word_wrap = True
sp0 = stf.paragraphs[0]
sp0.text = "CORE VALUE PROPOSITION & OPERATIONAL SCOPE"
sp0.font.size = Pt(11)
sp0.font.bold = True
sp0.font.color.rgb = C_RED

sp1 = stf.add_paragraph()
sp1.text = "An autonomous decision-support engine engineered specifically for the 1930 CFCFRMS platform that replaces 45-minute manual inter-bank inquiry latency with sub-15ms deterministic directed graph traversals and spatial decay probability modeling. It reconstructs multi-tier smurfing rings, calculates target ATM cash-out locations with 88%+ confidence, and automates Section 91 CrPC pre-freeze notices before physical cash extraction occurs."
sp1.font.size = Pt(10.5)
sp1.font.color.rgb = C_TEXT_WHITE
add_footer(s1, 1)

# ==============================================================================
# SLIDE 2: PROPOSED SOLUTION & CORE WORKFLOW
# ==============================================================================
s2 = prs.slides.add_slide(slide_layout)
apply_bg(s2)
add_header(s2, "Proposed Solution & Methodology", "The 12-Minute Golden-Hour Interception Workflow")

# Left Column: End-to-End Pipeline (45% Width)
p_left = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.65), Inches(5.4), Inches(5.0))
p_left.fill.solid()
p_left.fill.fore_color.rgb = C_PANEL
p_left.line.color.rgb = C_CYAN

pltf = p_left.text_frame
pltf.word_wrap = True
pl0 = pltf.paragraphs[0]
pl0.text = "END-TO-END INCIDENT PIPELINE"
pl0.font.size = Pt(11)
pl0.font.bold = True
pl0.font.color.rgb = C_CYAN

steps = [
    ("[t=00s] 1930 Incident Ingestion", "Citizen reports fraudulent UPI/IMPS debit via Helpline 1930."),
    ("[t=15ms] Deterministic BFS Graph", "NetworkX in-memory multigraph traverses 5-tier mule smurfing tree."),
    ("[t=40ms] Spatial Decay Scoring", "Softmax model calculates ATM cash liquidity and withdrawal velocity."),
    ("[t=60ms] Structured AI Dispatch", "Gemini 2.5 generates validated Sec 91 CrPC statutory dispatch orders."),
    ("[t=100ms] Automated Switch Hold", "API webhooks broadcast pre-freeze holds to destination bank switches.")
]
for title, desc in steps:
    p_t = pltf.add_paragraph()
    p_t.text = f"• {title}"
    p_t.font.size = Pt(10)
    p_t.font.bold = True
    p_t.font.color.rgb = C_TEXT_WHITE
    p_d = pltf.add_paragraph()
    p_d.text = f"   {desc}"
    p_d.font.size = Pt(8.5)
    p_d.font.color.rgb = C_TEXT_MUTED

# Right Column: Screenshot Placeholder (55% Width)
p_right = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.4), Inches(1.65), Inches(6.1), Inches(5.0))
p_right.fill.solid()
p_right.fill.fore_color.rgb = C_PANEL
p_right.line.color.rgb = C_RED

prtf = p_right.text_frame
prtf.word_wrap = True
pr0 = prtf.paragraphs[0]
pr0.text = "[ LIVE DASHBOARD PROTOTYPE SCREENSHOT ]"
pr0.font.size = Pt(12)
pr0.font.bold = True
pr0.font.color.rgb = C_RED
pr0.alignment = PP_ALIGN.CENTER

pr1 = prtf.add_paragraph()
pr1.text = "\n(Paste screenshot of React Flow DAG + Leaflet GIS Map with Red Intercept Ring)\n\nKey Interactive Capabilities:\n✓ Live 11:42 Golden Window Intercept Countdown Timer\n✓ Staged Node Lighting (Victim -> T1 -> T2 -> Cashout ATM)\n✓ Dynamic Transit Timestamps on Edge Connectors\n✓ 1-Click Sec 91 CrPC Automated Bank Freeze Trigger"
pr1.font.size = Pt(10)
pr1.font.color.rgb = C_TEXT_MUTED
pr1.alignment = PP_ALIGN.CENTER
add_footer(s2, 2)

# ==============================================================================
# SLIDE 3: TECHNICAL APPROACH & SYSTEM ARCHITECTURE
# ==============================================================================
s3 = prs.slides.add_slide(slide_layout)
apply_bg(s3)
add_header(s3, "Technical Approach & Architecture", "Dual-Engine Architecture: Deterministic Graph Core + Structured Agent")

# Left Column: Deterministic Core
p_arch_l = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.65), Inches(5.75), Inches(5.0))
p_arch_l.fill.solid()
p_arch_l.fill.fore_color.rgb = C_PANEL
p_arch_l.line.color.rgb = C_CYAN

atf_l = p_arch_l.text_frame
atf_l.word_wrap = True
at0_l = atf_l.paragraphs[0]
at0_l.text = "DETERMINISTIC GRAPH FORENSICS (PURE MATH)"
at0_l.font.size = Pt(11)
at0_l.font.bold = True
at0_l.font.color.rgb = C_CYAN

det_points = [
    ("In-Memory NetworkX BFS Engine:", "Traverses multi-bank adjacency matrices locally in <15ms with guaranteed O(V+E) linear time."),
    ("SHA-256 Client-Side Anonymization:", "Hashes all citizen PII (Account, UPI, Phone) at ingestion; zero clear-text exposure."),
    ("Spatial Decay Softmax Formulation:", "Raw Score S_i = [1/(Dist)^1.2] * [Liquidity/Max] * [1 + 0.15*Velocity]. Pinpoints target ATM with 88%+ confidence."),
    ("Zero Hallucination Guarantee:", "Pathfinding is strictly isolated from LLMs to prevent false positive criminal accusations.")
]
for title, desc in det_points:
    p = atf_l.add_paragraph()
    p.text = f"• {title} {desc}"
    p.font.size = Pt(9.5)
    p.font.color.rgb = C_TEXT_WHITE

# Right Column: Structured AI & Tech Stack
p_arch_r = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.75), Inches(1.65), Inches(5.75), Inches(5.0))
p_arch_r.fill.solid()
p_arch_r.fill.fore_color.rgb = C_PANEL
p_arch_r.line.color.rgb = C_BORDER

atf_r = p_arch_r.text_frame
atf_r.word_wrap = True
at0_r = atf_r.paragraphs[0]
at0_r.text = "AGENTIC DECISION LAYER & TECHNOLOGY STACK"
at0_r.font.size = Pt(11)
at0_r.font.bold = True
at0_r.font.color.rgb = C_TEXT_WHITE

stack_points = [
    ("Google Gemini 2.5 Flash:", "Enforces strict Pydantic v2 schemas to synthesize typed PoliceDispatchAlert JSON contracts."),
    ("Statutory Mandate Synthesis:", "Formats actionable Section 91 CrPC notice payloads for field police patrol units."),
    ("Frontend Stack:", "React 18, TypeScript, TailwindCSS, @xyflow/react (Dynamic DAGs), React-Leaflet GIS."),
    ("Backend API Layer:", "FastAPI (Asynchronous Python microservice), NumPy, Uvicorn."),
    ("Synthetic Dataset:", "50,000+ Multi-Tier Banking Transactions modeled on real I4C smurfing topologies.")
]
for title, desc in stack_points:
    p = atf_r.add_paragraph()
    p.text = f"• {title} {desc}"
    p.font.size = Pt(9.5)
    p.font.color.rgb = C_TEXT_WHITE
add_footer(s3, 3)

# ==============================================================================
# SLIDE 4: FEASIBILITY, PRIVACY & ROADMAP
# ==============================================================================
s4 = prs.slides.add_slide(slide_layout)
apply_bg(s4)
add_header(s4, "Feasibility, Viability & Security", "Privacy-by-Design & 4-Stage Production Roadmap")

# Top 3 Defense Cards
defenses = [
    ("DPDP Act 2023 Compliance", "SHA-256 local client hashing anonymizes all account data. Graph nodes operate strictly on cryptographic IDs.", C_GREEN),
    ("Hardware Efficiency", "Runs locally on standard police workstations with <400MB RAM footprint; zero costly cloud dependencies.", C_CYAN),
    ("Offline Robustness", "Deterministic graph and spatial engine operate fully air-gapped without mandatory internet access.", C_BLUE)
]
for idx, (title, desc, col) in enumerate(defenses):
    x = Inches(0.8 + idx * 3.95)
    p = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(1.65), Inches(3.8), Inches(2.2))
    p.fill.solid()
    p.fill.fore_color.rgb = C_PANEL
    p.line.color.rgb = col
    tf = p.text_frame
    tf.word_wrap = True
    p0 = tf.paragraphs[0]
    p0.text = title.upper()
    p0.font.size = Pt(10.5)
    p0.font.bold = True
    p0.font.color.rgb = col
    p1 = tf.add_paragraph()
    p1.text = desc
    p1.font.size = Pt(9.5)
    p1.font.color.rgb = C_TEXT_WHITE

# Bottom 4-Stage Roadmap Strip
r_panel = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(4.1), Inches(11.7), Inches(2.6))
r_panel.fill.solid()
r_panel.fill.fore_color.rgb = C_PANEL
r_panel.line.color.rgb = C_BORDER

rtf = r_panel.text_frame
rtf.word_wrap = True
rp0 = rtf.paragraphs[0]
rp0.text = "PRODUCTION EXECUTION ROADMAP"
rp0.font.size = Pt(11)
rp0.font.bold = True
rp0.font.color.rgb = C_CYAN

stages = [
    ("[DONE] Phase 0: Research & Surveys", "Validated with Cyber Crime Police Station officers; confirmed manual inquiry bottleneck."),
    ("[DONE] Phase 1: Functional Prototype", "Full-stack build: Sub-15ms BFS engine, spatial decay model, React Flow DAG console."),
    ("[NEXT] Phase 2: I4C Sandbox Pilot (Q3 2026)", "Ingestion of anonymized historical NCRP data and bank nodal mock webhook testing."),
    ("[FUTURE] Phase 3: National Scale (2027)", "Federation across 750+ District Cyber Crime Police Stations (CCPS) and NPCI switch rails.")
]
for s in stages:
    p = rtf.add_paragraph()
    p.text = f"• {s}"
    p.font.size = Pt(9.5)
    p.font.color.rgb = C_TEXT_WHITE
add_footer(s4, 4)

# ==============================================================================
# SLIDE 5: IMPACT & COMPARATIVE MATRIX
# ==============================================================================
s5 = prs.slides.add_slide(slide_layout)
apply_bg(s5)
add_header(s5, "Impact, Benefits & Benchmarking", "Comparative Analysis: Legacy 1930 SOP vs Project KAVACH-GRAPH")

# Comparison Table
table_shape = s5.shapes.add_table(5, 3, Inches(0.8), Inches(1.65), Inches(11.7), Inches(2.8))
table = table_shape.table
table.columns[0].width = Inches(3.2)
table.columns[1].width = Inches(4.25)
table.columns[2].width = Inches(4.25)

headers = ["EVALUATION DIMENSION", "EXISTING 1930 / BANK WORKFLOW", "PROJECT KAVACH-GRAPH (PROPOSED)"]
for i, h in enumerate(headers):
    cell = table.cell(0, i)
    cell.fill.solid()
    cell.fill.fore_color.rgb = C_BG
    p = cell.text_frame.paragraphs[0]
    p.text = h
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = C_CYAN

rows = [
    ("Traversal Latency", "45 to 120 Minutes (Manual Emails)", "< 15 Milliseconds (Deterministic In-Memory BFS)"),
    ("Cross-Bank Visibility", "Siloed (Single Institution Ledger View)", "Unified Cross-Bank Directed Multigraph (DAG)"),
    ("ATM Cash-Out Prediction", "Zero Capability (Post-Mortem CCTV Review)", "Multi-Factor Spatial Decay Softmax Model (88%+)"),
    ("Bank Freeze Notice", "Manual Batch Nodal Emails", "Automated Sec 91 CrPC REST Webhooks (<100ms)")
]
for r_idx, r_data in enumerate(rows):
    for c_idx, val in enumerate(r_data):
        cell = table.cell(r_idx + 1, c_idx)
        cell.fill.solid()
        cell.fill.fore_color.rgb = C_PANEL
        p = cell.text_frame.paragraphs[0]
        p.text = val
        p.font.size = Pt(9.5)
        p.font.color.rgb = C_GREEN if c_idx == 2 else (C_TEXT_MUTED if c_idx == 1 else C_TEXT_WHITE)

# Bottom Stakeholder ROI Panel
roi_panel = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(4.7), Inches(11.7), Inches(2.0))
roi_panel.fill.solid()
roi_panel.fill.fore_color.rgb = C_PANEL
roi_panel.line.color.rgb = C_GREEN

roitf = roi_panel.text_frame
roitf.word_wrap = True
roip0 = roitf.paragraphs[0]
roip0.text = "QUANTIFIED STAKEHOLDER ROI & NATIONAL BENEFITS"
roip0.font.size = Pt(11)
roip0.font.bold = True
roip0.font.color.rgb = C_GREEN

roi_points = [
    ("For Police Officers:", "12-minute predictive window with exact ATM GPS coordinates for targeted patrol van routing."),
    ("For Citizens:", "Estimated 65% reduction in unrecoverable physical cash-out losses during Golden-Hour incidents."),
    ("For MHA / I4C:", "Unified automated multi-agency triage pipeline with zero proprietary vendor licensing lock-in.")
]
for k, v in roi_points:
    p = roitf.add_paragraph()
    p.text = f"• {k} {v}"
    p.font.size = Pt(9.5)
    p.font.color.rgb = C_TEXT_WHITE
add_footer(s5, 5)

# ==============================================================================
# SLIDE 6: RESEARCH FOUNDATIONS & STATUTORY CITATIONS
# ==============================================================================
s6 = prs.slides.add_slide(slide_layout)
apply_bg(s6)
add_header(s6, "Statutory Frameworks & Citations", "Official Research Foundation & Legal Standards")

ref_panel = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.65), Inches(11.7), Inches(5.0))
ref_panel.fill.solid()
ref_panel.fill.fore_color.rgb = C_PANEL
ref_panel.line.color.rgb = C_BORDER

reftf = ref_panel.text_frame
reftf.word_wrap = True
refp0 = reftf.paragraphs[0]
refp0.text = "OFFICIAL GOVERNMENT REPORTS, LEGAL STATUTES & SCIENTIFIC CITATIONS"
refp0.font.size = Pt(11)
refp0.font.bold = True
refp0.font.color.rgb = C_CYAN

refs = [
    ("1. Indian Cyber Crime Coordination Centre (I4C), MHA:", "Citizen Financial Cyber Fraud Reporting & Management System (CFCFRMS / Helpline 1930 SOP Guidelines)."),
    ("2. Statutory Criminal Procedure Provisions:", "Section 91 & Section 102, Code of Criminal Procedure (CrPC) for Digital Requisitioning and Precautionary Account Seizure."),
    ("3. Cybersecurity & Incident Mitigation Mandates:", "Section 69B & Section 70B, Information Technology Act, 2000 (CERT-In Cybersecurity Directions)."),
    ("4. Financial Messaging Standards:", "ISO 20022 Universal Financial Industry Message Scheme & NPCI Unified Payments Interface (UPI) Procedural Guidelines."),
    ("5. Graph Algorithms & Applied Mathematics:", "A. Hagberg et al., 'Exploring Network Structure with NetworkX', Proceedings of SciPy Conference."),
    ("6. Geospatial Decay Modeling:", "R. W. Sinnott, 'Virtues of the Haversine', Sky and Telescope (Earth-surface distance computation).")
]
for title, desc in refs:
    p = reftf.add_paragraph()
    p.text = f"• {title} {desc}"
    p.font.size = Pt(9.5)
    p.font.color.rgb = C_TEXT_WHITE
add_footer(s6, 6)

output_filename = "SIH26184_Official_6Slide_Deck.pptx"
prs.save(output_filename)
print(f"SUCCESS: {output_filename} generated successfully!")
