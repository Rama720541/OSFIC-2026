"""SQLAlchemy models for NexusFlow College SaaS."""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from backend.database import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    roll_number = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(100), nullable=False)
    department = Column(String(50), nullable=False)  # e.g. CSE, ECE, MECH
    semester = Column(Integer, default=5)
    section = Column(String(10), default="A")
    email = Column(String(120), unique=True, nullable=False)
    overall_attendance = Column(Float, default=85.0)

    attendance_records = relationship("AttendanceRecord", back_populates="student")
    proxy_requests = relationship("ProxyRequest", back_populates="student")


class Faculty(Base):
    __tablename__ = "faculty"

    id = Column(Integer, primary_key=True, index=True)
    faculty_id = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(100), nullable=False)
    department = Column(String(50), nullable=False)
    designation = Column(String(50), default="Assistant Professor")
    email = Column(String(120), unique=True, nullable=False)
    subject = Column(String(100), nullable=False)


class TimetableSlot(Base):
    __tablename__ = "timetable_slots"

    id = Column(Integer, primary_key=True, index=True)
    day = Column(String(20), nullable=False)  # Monday, Tuesday, etc.
    start_time = Column(String(20), nullable=False)  # e.g. "09:00 AM"
    end_time = Column(String(20), nullable=False)    # e.g. "10:00 AM"
    subject_code = Column(String(20), nullable=False)
    subject_name = Column(String(100), nullable=False)
    room = Column(String(50), nullable=False)
    faculty_name = Column(String(100), nullable=False)
    department = Column(String(50), default="CSE")
    semester = Column(Integer, default=5)


class AttendanceRecord(Base):
    __tablename__ = "attendance_records"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    date = Column(String(20), nullable=False) # YYYY-MM-DD
    subject_code = Column(String(20), nullable=False)
    status = Column(String(20), nullable=False) # "Present", "Absent", "OD", "Proxy-Flagged"
    marked_by = Column(String(100), default="Faculty")
    timestamp = Column(DateTime, default=datetime.utcnow)

    student = relationship("Student", back_populates="attendance_records")


class ProxyRequest(Base):
    __tablename__ = "proxy_requests"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    requested_for = Column(String(100), nullable=False) # e.g. "Arjun Mehta (CSE-045)"
    subject_code = Column(String(20), nullable=False)
    date = Column(String(20), nullable=False)
    reason = Column(Text, nullable=False)
    status = Column(String(30), default="Pending Review") # "Pending Review", "Approved", "Rejected", "Auto-Flagged"
    flagged_anomaly = Column(Boolean, default=False)
    risk_score = Column(Float, default=0.1) # 0.0 to 1.0 AI confidence flag
    timestamp = Column(DateTime, default=datetime.utcnow)

    student = relationship("Student", back_populates="proxy_requests")


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    event_type = Column(String(50), nullable=False) # "ATTENDANCE_OVERRIDE", "PROXY_DETECTED", "TIMETABLE_CHANGE", "POLICY_ALERT"
    description = Column(String(255), nullable=False)
    actor = Column(String(100), nullable=False) # Admin/Faculty name or "AI Sentinel"
    severity = Column(String(20), default="info") # "info", "warning", "critical"
    created_at = Column(DateTime, default=datetime.utcnow)
