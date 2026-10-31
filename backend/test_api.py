"""Comprehensive test suite for NexusFlow College SaaS API."""

import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.database import Base, engine

client = TestClient(app)

def setup_module(module):
    """Ensure database tables and initial seeds exist."""
    Base.metadata.create_all(bind=engine)

def test_health_and_root():
    res = client.get("/")
    assert res.status_code == 200
    data = res.json()
    assert data["service"] == "NexusFlow College SaaS API"
    assert data["status"] == "online"

    health = client.get("/health")
    assert health.status_code == 200
    assert health.json()["status"] == "healthy"

def test_get_students():
    res = client.get("/students")
    assert res.status_code == 200
    students = res.json()
    assert isinstance(students, list)
    assert len(students) >= 5
    assert "roll_number" in students[0]
    assert "overall_attendance" in students[0]

def test_get_students_filtered():
    res = client.get("/students?query=Arjun")
    assert res.status_code == 200
    students = res.json()
    assert len(students) >= 1
    assert "Arjun" in students[0]["name"]

def test_get_faculty_and_timetable():
    res_fac = client.get("/faculty")
    assert res_fac.status_code == 200
    assert len(res_fac.json()) >= 1

    res_tt = client.get("/timetable")
    assert res_tt.status_code == 200
    assert len(res_tt.json()) >= 1

def test_record_batch_attendance():
    students = client.get("/students").json()
    assert len(students) > 0
    target_id = students[0]["id"]

    batch_payload = {
        "records": [
            {
                "student_id": target_id,
                "date": "2026-10-31",
                "subject_code": "CS501",
                "status": "Present",
                "marked_by": "Test System Roster"
            }
        ]
    }
    res = client.post("/attendance/batch", json=batch_payload)
    assert res.status_code == 200
    assert res.json()["count"] == 1

def test_proxy_request_ai_sentinel():
    students = client.get("/students").json()
    s_id = students[0]["id"]

    # Low risk legit request
    legit_payload = {
        "student_id": s_id,
        "requested_for": f"{students[0]['name']} ({students[0]['roll_number']})",
        "subject_code": "CS501",
        "date": "2026-10-31",
        "reason": "Official Inter-College Robotics Symposium Presentation."
    }
    res = client.post("/proxy-requests", json=legit_payload)
    assert res.status_code == 200
    data = res.json()
    assert data["status"] in ["Pending Review", "Approved"]
    assert data["risk_score"] < 0.7
    req_id = data["id"]

    # Test update proxy status
    upd = client.patch(f"/proxy-requests/{req_id}", json={"status": "Approved"})
    assert upd.status_code == 200
    assert upd.json()["status"] == "Approved"

    # Suspicious request trigger
    suspicious_payload = {
        "student_id": s_id,
        "requested_for": f"{students[0]['name']} ({students[0]['roll_number']})",
        "subject_code": "CS501",
        "date": "2026-10-31",
        "reason": "Asking my friend to cover proxy because I want to sleep late."
    }
    res_susp = client.post("/proxy-requests", json=suspicious_payload)
    assert res_susp.status_code == 200
    susp_data = res_susp.json()
    assert susp_data["flagged_anomaly"] is True
    assert susp_data["status"] == "Auto-Flagged"
    assert susp_data["risk_score"] >= 0.7

def test_admin_kpis_and_audit():
    kpis = client.get("/admin/kpis")
    assert kpis.status_code == 200
    data = kpis.json()
    assert data["total_students"] > 0
    assert data["total_faculty"] > 0
    assert data["system_uptime"] > 99.0

    audits = client.get("/admin/audit")
    assert audits.status_code == 200
    assert len(audits.json()) > 0

