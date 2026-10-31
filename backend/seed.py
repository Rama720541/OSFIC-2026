"""Database seeding script with realistic college data."""

from datetime import datetime, date
from backend.database import SessionLocal, engine, Base
from backend.models import Student, Faculty, TimetableSlot, AttendanceRecord, ProxyRequest, AuditLog

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Check if already seeded
    if db.query(Student).first():
        print("Database already has records. Skipping seed.")
        db.close()
        return

    print("Seeding database with college SaaS data...")

    # 1. Faculty
    faculty_members = [
        Faculty(faculty_id="FAC-101", name="Dr. Sarah Jenkins", department="CSE", designation="Associate Professor", email="s.jenkins@nexusflow.edu", subject="CS501: Operating Systems"),
        Faculty(faculty_id="FAC-102", name="Prof. Rajesh K.", department="CSE", designation="Assistant Professor", email="rajesh.k@nexusflow.edu", subject="CS502: Distributed Database Systems"),
        Faculty(faculty_id="FAC-103", name="Dr. Anita Desai", department="CSE", designation="Professor & HOD", email="a.desai@nexusflow.edu", subject="CS503: Machine Learning"),
        Faculty(faculty_id="FAC-104", name="Prof. Vikram Seth", department="ECE", designation="Assistant Professor", email="v.seth@nexusflow.edu", subject="EC401: VLSI Design"),
    ]
    db.add_all(faculty_members)

    # 2. Students
    students = [
        Student(roll_number="21BCE1001", name="Arjun Mehta", department="CSE", semester=5, section="A", email="arjun.m@nexusflow.edu", overall_attendance=91.4),
        Student(roll_number="21BCE1002", name="Priya Sharma", department="CSE", semester=5, section="A", email="priya.s@nexusflow.edu", overall_attendance=96.0),
        Student(roll_number="21BCE1003", name="Rahul Verma", department="CSE", semester=5, section="A", email="rahul.v@nexusflow.edu", overall_attendance=78.2),
        Student(roll_number="21BCE1004", name="Ananya Patel", department="CSE", semester=5, section="A", email="ananya.p@nexusflow.edu", overall_attendance=84.5),
        Student(roll_number="21BCE1005", name="Karthik Nair", department="CSE", semester=5, section="A", email="karthik.n@nexusflow.edu", overall_attendance=71.0),
        Student(roll_number="21BCE1006", name="Sneha Gupta", department="CSE", semester=5, section="A", email="sneha.g@nexusflow.edu", overall_attendance=89.0),
        Student(roll_number="21BCE1007", name="Rohan Das", department="CSE", semester=5, section="A", email="rohan.d@nexusflow.edu", overall_attendance=68.5),
        Student(roll_number="21BCE1008", name="Ishaan Roy", department="CSE", semester=5, section="A", email="ishaan.r@nexusflow.edu", overall_attendance=93.2),
        Student(roll_number="21BCE1009", name="Neha Sen", department="CSE", semester=5, section="A", email="neha.s@nexusflow.edu", overall_attendance=88.0),
        Student(roll_number="21BCE1010", name="Devendra Jha", department="CSE", semester=5, section="A", email="devendra.j@nexusflow.edu", overall_attendance=74.5),
    ]
    db.add_all(students)
    db.commit()

    # Re-query students to link
    stud_objs = db.query(Student).all()
    today_str = date.today().isoformat()

    # 3. Timetable Slots
    slots = [
        TimetableSlot(day="Monday", start_time="09:00 AM", end_time="10:00 AM", subject_code="CS501", subject_name="Operating Systems", room="Hall 302", faculty_name="Dr. Sarah Jenkins"),
        TimetableSlot(day="Monday", start_time="10:15 AM", end_time="11:15 AM", subject_code="CS502", subject_name="Distributed Systems", room="Lab 4", faculty_name="Prof. Rajesh K."),
        TimetableSlot(day="Monday", start_time="11:30 AM", end_time="12:30 PM", subject_code="CS503", subject_name="Machine Learning", room="Hall 305", faculty_name="Dr. Anita Desai"),
        TimetableSlot(day="Tuesday", start_time="09:00 AM", end_time="10:00 AM", subject_code="CS503", subject_name="Machine Learning", room="Hall 305", faculty_name="Dr. Anita Desai"),
        TimetableSlot(day="Tuesday", start_time="10:15 AM", end_time="11:15 AM", subject_code="CS501", subject_name="Operating Systems", room="Hall 302", faculty_name="Dr. Sarah Jenkins"),
        TimetableSlot(day="Wednesday", start_time="09:00 AM", end_time="10:00 AM", subject_code="CS502", subject_name="Distributed Systems", room="Lab 4", faculty_name="Prof. Rajesh K."),
    ]
    db.add_all(slots)

    # 4. Initial Attendance Records
    for s in stud_objs:
        status = "Present" if s.overall_attendance >= 75 else "Absent"
        db.add(AttendanceRecord(
            student_id=s.id,
            date=today_str,
            subject_code="CS501",
            status=status,
            marked_by="Dr. Sarah Jenkins (QR/Biometric Sync)"
        ))

    # 5. Proxy Requests (Simulating student requests)
    db.add(ProxyRequest(
        student_id=stud_objs[4].id, # Karthik Nair
        requested_for=f"{stud_objs[4].name} ({stud_objs[4].roll_number})",
        subject_code="CS501",
        date=today_str,
        reason="Official IEEE Tech Fest Coordinator duty at Main Auditorium.",
        status="Pending Review",
        flagged_anomaly=False,
        risk_score=0.12
    ))
    db.add(ProxyRequest(
        student_id=stud_objs[6].id, # Rohan Das
        requested_for=f"{stud_objs[6].name} ({stud_objs[6].roll_number})",
        subject_code="CS502",
        date=today_str,
        reason="Late arrival due to transit bus breakdown.",
        status="Auto-Flagged",
        flagged_anomaly=True,
        risk_score=0.88
    ))

    # 6. Audit Logs
    db.add(AuditLog(
        event_type="SYSTEM_BOOT",
        description="NexusFlow Academic Core initialized for Campus-Alpha node.",
        actor="System Daemon",
        severity="info"
    ))
    db.add(AuditLog(
        event_type="PROXY_DETECTED",
        description="High-frequency attendance check attempt detected from IP 192.168.1.104 for Rohan Das. Blocked by AI Sentinel.",
        actor="AI Sentinel",
        severity="critical"
    ))
    db.add(AuditLog(
        event_type="ATTENDANCE_OVERRIDE",
        description="Manual verification approved for Arjun Mehta (Official College Sports Council).",
        actor="Prof. Rajesh K.",
        severity="info"
    ))
    db.add(AuditLog(
        event_type="COMPLIANCE_AUDIT",
        description="Monthly AICTE attendance minimum variance verification passed with 99.4% parity.",
        actor="Compliance Bot",
        severity="info"
    ))

    db.commit()
    db.close()
    print("Database seeding completed successfully!")

if __name__ == "__main__":
    seed_database()

