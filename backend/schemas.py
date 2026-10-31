"""Pydantic schemas for data validation and API responses."""

from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel

# Student Schemas
class StudentBase(BaseModel):
    roll_number: str
    name: str
    department: str
    semester: int = 5
    section: str = "A"
    email: str
    overall_attendance: float = 85.0

class StudentCreate(StudentBase):
    pass

class StudentOut(StudentBase):
    id: int

    class Config:
        from_attributes = True


# Faculty Schemas
class FacultyBase(BaseModel):
    faculty_id: str
    name: str
    department: str
    designation: str = "Assistant Professor"
    email: str
    subject: str

class FacultyCreate(FacultyBase):
    pass

class FacultyOut(FacultyBase):
    id: int

    class Config:
        from_attributes = True


# Timetable Schemas
class TimetableBase(BaseModel):
    day: str
    start_time: str
    end_time: str
    subject_code: str
    subject_name: str
    room: str
    faculty_name: str
    department: str = "CSE"
    semester: int = 5

class TimetableCreate(TimetableBase):
    pass

class TimetableOut(TimetableBase):
    id: int

    class Config:
        from_attributes = True


# Attendance Schemas
class AttendanceCreate(BaseModel):
    student_id: int
    date: str
    subject_code: str
    status: str
    marked_by: str = "Faculty"

class AttendanceBatchCreate(BaseModel):
    records: List[AttendanceCreate]

class AttendanceOut(BaseModel):
    id: int
    student_id: int
    date: str
    subject_code: str
    status: str
    marked_by: str
    timestamp: datetime

    class Config:
        from_attributes = True


# Proxy Request Schemas
class ProxyRequestCreate(BaseModel):
    student_id: int
    requested_for: str
    subject_code: str
    date: str
    reason: str

class ProxyRequestUpdate(BaseModel):
    status: str # "Approved" or "Rejected"

class ProxyRequestOut(BaseModel):
    id: int
    student_id: int
    requested_for: str
    subject_code: str
    date: str
    reason: str
    status: str
    flagged_anomaly: bool
    risk_score: float
    timestamp: datetime

    class Config:
        from_attributes = True


# Audit Log Schemas
class AuditLogCreate(BaseModel):
    event_type: str
    description: str
    actor: str
    severity: str = "info"

class AuditLogOut(BaseModel):
    id: int
    event_type: str
    description: str
    actor: str
    severity: str
    created_at: datetime

    class Config:
        from_attributes = True


# Admin KPIs Schema
class AdminKPIsOut(BaseModel):
    total_students: int
    total_faculty: int
    avg_campus_attendance: float
    proxy_attempts_blocked: int
    system_uptime: float
    compliance_score: float
    pending_approvals: int
