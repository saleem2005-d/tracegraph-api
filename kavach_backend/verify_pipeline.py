import time
import requests
import json

BASE_URL = "http://127.0.0.1:8000"

def test_pipeline():
    print("Testing /health endpoint...")
    try:
        r = requests.get(f"{BASE_URL}/health", timeout=5)
        print("Health Status:", r.json())
    except Exception as e:
        print("Server not running or unreachable. Please start uvicorn first.")
        return

    print("\nSimulating real-time 1930 Cyber Fraud Incident Ingestion...")
    fir_data = {
        "fir_id": "FIR-2026-DEL-9821",
        "victim_account": "VICTIM-9988776655",
        "stolen_amount": 750000.0,
        "incident_timestamp": time.time(),
        "reported_upi_ref": "UPI/26184/CRIME/99"
    }

    t0 = time.perf_counter()
    res = requests.post(f"{BASE_URL}/api/v1/incident/process-fir", json=fir_data)
    elapsed = (time.perf_counter() - t0) * 1000

    print(f"Response Received in {elapsed:.2f} ms")
    print(json.dumps(res.json(), indent=2))

if __name__ == "__main__":
    test_pipeline()
