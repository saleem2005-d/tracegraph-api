import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any

app = FastAPI(
    title="PROJECT KAVACH-GRAPH API",
    version="2.0.0",
    description="Autonomous Mule Layering Forensics & Cash-Out Interception Engine (SIH26184)"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "KAVACH-GRAPH Autonomous Forensics Engine",
        "ps_id": "SIH26184",
        "golden_window_window_seconds": 720
    }

@app.get("/api/v1/atms/heat-matrix")
def get_heat_matrix():
    return {
        "status": "success",
        "hotspots": [
            {"terminal_id": "ATM-ANANTAPUR-01", "name": "Clock Tower SBI ATM", "lat": 14.6819, "lng": 77.6006, "risk_score": 0.884, "liquidity": 350000},
            {"terminal_id": "ATM-ANANTAPUR-02", "name": "Subhash Road HDFC ATM", "lat": 14.6850, "lng": 77.6030, "risk_score": 0.420, "liquidity": 120000},
            {"terminal_id": "ATM-ANANTAPUR-03", "name": "RTC Bus Stand ICICI ATM", "lat": 14.6780, "lng": 77.5950, "risk_score": 0.310, "liquidity": 80000}
        ]
    }

@app.all("/api/v1/incident/process-fir")
@app.all("/api/simulate")
def process_fir():
    return {
        "fir_id": "1930-CFCFRMS-2026-88129",
        "golden_window_remaining_minutes": 11.42,
        "stolen_amount": 500000.0,
        "nodes": [
            {"id": "V1", "label": "Victim (Citizen)", "type": "victim", "layer": 0, "balance": 0, "bank": "SBI", "status": "debited"},
            {"id": "M1", "label": "Mule Tier-1", "type": "mule", "layer": 1, "balance": 0, "bank": "HDFC", "status": "forwarded"},
            {"id": "M2", "label": "Mule Tier-2", "type": "mule", "layer": 2, "balance": 0, "bank": "ICICI", "status": "forwarded"},
            {"id": "M3", "label": "Mule Tier-2", "type": "mule", "layer": 2, "balance": 150000.0, "bank": "Axis Bank", "status": "held"},
            {"id": "M4", "label": "Mule Tier-3 (Courier)", "type": "mule", "layer": 3, "balance": 0, "bank": "Kotak Mahindra", "status": "in_transit"},
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
        "gemini_police_dispatch_alert": {
            "alert_id": "I4C-MHA-2026-9810A",
            "statutory_mandate": "Section 91 & Section 102 CrPC Precautionary Digital Seizure Order",
            "risk_level": "CRITICAL_GOLDEN_HOUR",
            "urgency_action": "Route PCR Van AP-PCR-09 to Clock Tower ATM. Pre-freeze hold on Kotak Bank Switch.",
            "ai_rationale": "High velocity layering pattern (5 hops in 121s) indicates active cash extraction attempt."
        }
    }

@app.all("/api/v1/incident/freeze")
@app.all("/api/freeze")
def execute_freeze():
    return {
        "status": "SUCCESS_ACCOUNT_FROZEN",
        "account_id": "3319-XXXX-6712",
        "bank_name": "Kotak Mahindra Bank",
        "amount_secured": 350000.0,
        "legal_reference": "Sec 91 CrPC Mandate under FIR 1930-CFCFRMS-2026-88129",
        "switch_ack_latency_ms": 13.8
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
