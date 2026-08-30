from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="PROJECT KAVACH-GRAPH API",
    version="3.0.0",
    description="Autonomous Mule Layering Forensics & Cash-Out Interception Engine (SIH26184)"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SIM_DATA = {
    "fir_id": "1930-CFCFRMS-2026-88129",
    "golden_window_remaining_minutes": 11.42,
    "stolen_amount": 500000.0,
    "nodes": [
        {"id": "V1", "label": "Victim: 8823-XXXX-1029", "type": "victim", "layer": 0, "balance": 0, "bank": "SBI", "status": "debited", "lat": 14.6850, "lng": 77.5980},
        {"id": "M1", "label": "Mule L1: 4410-XXXX-9912", "type": "mule", "layer": 1, "balance": 0, "bank": "HDFC", "status": "forwarded", "lat": 14.6830, "lng": 77.6010},
        {"id": "M2", "label": "Mule L2: 1290-XXXX-4531", "type": "mule", "layer": 2, "balance": 0, "bank": "ICICI", "status": "forwarded", "lat": 14.6800, "lng": 77.6030},
        {"id": "M3", "label": "Mule L2: 8871-XXXX-0092", "type": "mule", "layer": 2, "balance": 150000.0, "bank": "Axis Bank", "status": "held", "lat": 14.6750, "lng": 77.5920},
        {"id": "M4", "label": "Mule L3: 3319-XXXX-6712", "type": "mule", "layer": 3, "balance": 0, "bank": "Kotak Mahindra", "status": "in_transit", "lat": 14.6810, "lng": 77.6000},
        {"id": "ATM_TARGET", "label": "TARGET ATM #KA-8819", "type": "atm", "layer": 4, "balance": 350000.0, "bank": "SBI ATM", "status": "intercept_target", "lat": 14.6819, "lng": 77.6006}
    ],
    "edges": [
        {"source": "V1", "target": "M1", "amount": 500000.0, "latency_seconds": 12, "timestamp": "19:10:02"},
        {"source": "M1", "target": "M2", "amount": 350000.0, "latency_seconds": 24, "timestamp": "19:10:26"},
        {"source": "M1", "target": "M3", "amount": 150000.0, "latency_seconds": 18, "timestamp": "19:10:20"},
        {"source": "M2", "target": "M4", "amount": 350000.0, "latency_seconds": 32, "timestamp": "19:10:58"},
        {"source": "M4", "target": "ATM_TARGET", "amount": 350000.0, "latency_seconds": 45, "timestamp": "19:11:43"}
    ],
    "target_atm_prediction": {
        "terminal_id": "ATM-ANANTAPUR-01",
        "location_name": "Clock Tower SBI ATM Terminal, Anantapur",
        "latitude": 14.6819,
        "longitude": 77.6006,
        "confidence_score": 0.884,
        "recommended_pcr_van_id": "AP-PCR-09 (1.4 km)",
        "estimated_pcr_eta_minutes": 3.8
    },
    "atms": [
        {"id": "ATM-1", "name": "Clock Tower SBI ATM", "lat": 14.6819, "lng": 77.6006, "prob": 0.884, "status": "target", "liquidity": 350000, "address": "Clock Tower Road, Anantapur"},
        {"id": "ATM-2", "name": "Subhash Road HDFC ATM", "lat": 14.6860, "lng": 77.6040, "prob": 0.082, "status": "safe", "liquidity": 120000, "address": "Subhash Road, Near ALTS"},
        {"id": "ATM-3", "name": "RTC Bus Stand ICICI ATM", "lat": 14.6780, "lng": 77.5950, "prob": 0.034, "status": "safe", "liquidity": 80000, "address": "Central Bus Station Road"}
    ],
    "gemini_police_dispatch_alert": {
        "alert_id": "I4C-MHA-2026-9810A",
        "statutory_mandate": "Section 91 & Section 102 CrPC Precautionary Digital Seizure Order",
        "risk_level": "CRITICAL_GOLDEN_HOUR",
        "urgency_action": "Route PCR Van AP-PCR-09 to Clock Tower ATM. Pre-freeze hold on Kotak Bank Switch.",
        "ai_rationale": "High velocity layering pattern (5 hops in 121s) indicates active cash extraction attempt."
    }
}

FREEZE_RESP = {
    "status": "SUCCESS_ACCOUNT_FROZEN",
    "account_id": "3319-XXXX-6712",
    "bank_name": "Kotak Mahindra Bank",
    "amount_secured": 350000.0,
    "legal_reference": "Sec 91 CrPC Mandate under FIR 1930-CFCFRMS-2026-88129",
    "switch_ack_latency_ms": 13.8
}

@app.get("/")
def root():
    return {"status": "online", "service": "KAVACH-GRAPH", "ps_id": "SIH26184"}

@app.all("/api/v1/incident/process-fir")
@app.all("/api/simulate")
@app.all("/api/v1/atms/predict-cashout")
def get_simulation():
    return SIM_DATA

@app.all("/api/v1/atms/heat-matrix")
def get_heat_matrix():
    return {"status": "success", "hotspots": SIM_DATA["atms"]}

@app.all("/api/v1/incident/freeze")
@app.all("/api/freeze")
def execute_freeze():
    return FREEZE_RESP

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
