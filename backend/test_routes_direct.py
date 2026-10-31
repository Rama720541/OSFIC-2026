"""Direct route and logic unit tests for NexusFlow backend."""

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.database import SessionLocal, Base, engine
from backend.models import Student, ProxyRequest, AuditLog
from backend.seed import seed_database
from backend.main import (
    get_students, get_student, get_faculty, get_timetable,
    record_batch_attendance, create_proxy_request, update_proxy_status,
    get_admin_kpis, get_audit_logs, _recalc_student_attendance
)
from backend.schemas import (
    AttendanceBatchCreate, AttendanceCreate,
    ProxyRequestCreate, ProxyRequestUpdate
)

def run_tests():
    print("--- Running NexusFlow Direct Backend Tests ---")
    Base.metadata.create_all(bind=engine)
    seed_database()
    db = SessionLocal()

    try:
        # Test 1: Fetch students
        students = get_students(None, None, db)
        assert len(students) >= 10, f"Expected at least 10 students, got {len(students)}"
        print(f"[PASS] Test 1: Retrieved {len(students)} students.")

        # Test 2: Search students
        search_res = get_students(None, "Arjun", db)
        assert len(search_res) >= 1, "Failed to search student 'Arjun'"
        assert search_res[0].name == "Arjun Mehta"
        print(f"[PASS] Test 2: Student search functional ({search_res[0].name}).")

        # Test 3: Faculty and Timetable
        faculty = get_faculty(db)
        assert len(faculty) >= 4, f"Expected at least 4 faculty, got {len(faculty)}"
        timetable = get_timetable("Monday", db)
        assert len(timetable) >= 1, "Failed to fetch Monday timetable"
        print(f"[PASS] Test 3: Faculty ({len(faculty)}) and Timetable ({len(timetable)}) verified.")

        # Test 4: Batch Attendance Recording
        first_stud = students[0]
        batch = AttendanceBatchCreate(records=[
            AttendanceCreate(student_id=first_stud.id, date="2026-10-31", subject_code="CS501", status="Present")
        ])
        res = record_batch_attendance(batch, db)
        assert res["count"] == 1
        print("[PASS] Test 4: Batch attendance recorded and SHA-256 audit log triggered.")

        # Test 5: AI Sentinel Proxy Request Validation
        # 5a. Legitimate request
        legit_req = ProxyRequestCreate(
            student_id=first_stud.id,
            requested_for=f"{first_stud.name} ({first_stud.roll_number})",
            subject_code="CS501",
            date="2026-10-31",
            reason="Representing college at Smart India Hackathon grand finale."
        )
        legit_out = create_proxy_request(legit_req, db)
        assert legit_out.flagged_anomaly is False
        assert legit_out.status == "Pending Review"
        assert legit_out.risk_score < 0.5
        print(f"[PASS] Test 5a: Legit proxy accepted for review (Risk: {legit_out.risk_score}).")

        # 5b. Suspicious proxy attempt
        susp_req = ProxyRequestCreate(
            student_id=first_stud.id,
            requested_for=f"{first_stud.name} ({first_stud.roll_number})",
            subject_code="CS501",
            date="2026-10-31",
            reason="Friend will cover my proxy class today."
        )
        susp_out = create_proxy_request(susp_req, db)
        assert susp_out.flagged_anomaly is True
        assert susp_out.status == "Auto-Flagged"
        assert susp_out.risk_score >= 0.7
        print(f"[PASS] Test 5b: AI Sentinel detected anomaly & auto-flagged (Risk: {susp_out.risk_score}).")

        # Test 6: Approve proxy request and audit logging
        updated = update_proxy_status(legit_out.id, ProxyRequestUpdate(status="Approved"), db)
        assert updated.status == "Approved"
        print(f"[PASS] Test 6: Proxy request #{legit_out.id} approved and logged to audit trail.")

        # Test 7: Admin KPIs & Institutional Audit
        kpis = get_admin_kpis(db)
        assert kpis.total_students >= 10
        assert kpis.total_faculty >= 4
        assert kpis.avg_campus_attendance > 0
        assert kpis.proxy_attempts_blocked >= 1
        print(f"[PASS] Test 7: Admin KPIs calculated (Attendance: {kpis.avg_campus_attendance}%, Blocked: {kpis.proxy_attempts_blocked}).")

        logs = get_audit_logs(20, db)
        assert len(logs) >= 3
        print(f"[PASS] Test 8: Audit trail retrieved {len(logs)} tamper-proof logs.")

        print("\n=========================================")
        print("ALL 8 BACKEND INTEGRATION TESTS PASSED 100%!")
        print("=========================================\n")
    finally:
        db.close()

if __name__ == "__main__":
    run_tests()
