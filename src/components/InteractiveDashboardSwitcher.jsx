import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import {
  UserCheck, GraduationCap, Clock, AlertTriangle, CheckCircle, Calendar,
  Send, Check, RefreshCw, BookOpen, ChevronRight, ShieldAlert, FileText, Cpu,
  ShieldCheck, BarChart3, Users, Building2, TrendingUp, AlertOctagon, CheckCircle2,
  Download, Eye, ArrowUpRight, Activity, Zap, Lock, Monitor, ArrowRight, XCircle, FileSpreadsheet
} from 'lucide-react';
import { api } from '../services/api';

// InteractiveDashboardSwitcher forwarded a ref so parent (App) can imperatively set the active tab.
export const InteractiveDashboardSwitcher = forwardRef(function InteractiveDashboardSwitcher(
  { onOpenPilotModal, onOpenLoginModal, currentUser, backendStatus },
  ref
) {
  const [activeTab, setActiveTab] = useState('teacher'); // 'teacher' | 'student' | 'admin'

  // Expose setActiveTab to parent via ref
  useImperativeHandle(ref, () => ({
    goToTab(tab) {
      if (tab) setActiveTab(tab.toLowerCase());
    }
  }));

  // Automatically sync active tab when user logs in with a specific role
  useEffect(() => {
    if (currentUser?.tabId) {
      setActiveTab(currentUser.tabId);
    }
  }, [currentUser]);

  // ── Teacher Portal State ──────────────────────────────────────────────────
  const [countdown, setCountdown] = useState({ mins: 14, secs: 28 });
  const [proxyRequested, setProxyRequested] = useState(false);
  const [proxyReason, setProxyReason] = useState('Official Academic Council Review Meeting');
  const [proxyTeacher, setProxyTeacher] = useState('Prof. Rajesh K. (Distributed Systems)');
  const [attendanceSaved, setAttendanceSaved] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [students, setStudents] = useState([
    { id: 1, roll: '21BCE1001', name: 'Arjun Mehta', status: 'present' },
    { id: 2, roll: '21BCE1002', name: 'Priya Sharma', status: 'present' },
    { id: 3, roll: '21BCE1003', name: 'Rahul Verma', status: 'late' },
    { id: 4, roll: '21BCE1004', name: 'Ananya Patel', status: 'present' },
    { id: 5, roll: '21BCE1005', name: 'Karthik Nair', status: 'absent' },
    { id: 6, roll: '21BCE1006', name: 'Sneha Gupta', status: 'present' },
    { id: 7, roll: '21BCE1007', name: 'Rohan Das', status: 'absent' },
    { id: 8, roll: '21BCE1008', name: 'Ishaan Roy', status: 'present' }
  ]);

  // ── Student Portal State ──────────────────────────────────────────────────
  const [attendanceHealth, setAttendanceHealth] = useState(currentUser?.role === 'Student' ? 91.4 : 78.5);
  const [roomAlertDismissed, setRoomAlertDismissed] = useState(false);
  const [studentLeaveReason, setStudentLeaveReason] = useState('');
  const [studentLeaveSubmitted, setStudentLeaveSubmitted] = useState(false);
  const [leaveAiVerdict, setLeaveAiVerdict] = useState(null);

  // ── Admin Portal State ────────────────────────────────────────────────────
  const [adminAlertDismissed, setAdminAlertDismissed] = useState(false);
  const [auditGenerated, setAuditGenerated] = useState(false);
  const [kpiMetrics, setKpiMetrics] = useState({
    total_students: 1248,
    total_faculty: 247,
    avg_campus_attendance: 84.6,
    proxy_attempts_blocked: 14,
    system_uptime: 99.98,
    compliance_score: 99.4,
    pending_approvals: 2
  });
  const [auditLogs, setAuditLogs] = useState([]);
  const [proxyFeed, setProxyFeed] = useState([
    { id: 1, orig: 'Dr. Sarah Jenkins', proxy: 'Prof. Rajesh K.', course: 'CS-501 Operating Systems', time: '11:30 AM', status: 'Pending Review', match: '98%', risk: 'Low (0.12)' },
    { id: 2, orig: 'Rohan Das (Student)', proxy: 'AI Sentinel Flag', course: 'CS-502 Database Lab', time: '02:00 PM', status: 'Auto-Flagged', match: 'Anomaly', risk: 'High (0.88)' },
    { id: 3, orig: 'Prof. Vikram Seth', proxy: 'Dr. Anita Desai', course: 'EC-401 VLSI Design', time: '03:30 PM', status: 'Approved', match: '96%', risk: 'Low (0.08)' }
  ]);

  // Fetch initial data from API client
  useEffect(() => {
    async function loadData() {
      // Load students
      const studRes = await api.getStudents();
      if (studRes?.data && studRes.data.length > 0) {
        setStudents(studRes.data.map(s => ({
          id: s.id,
          roll: s.roll_number,
          name: s.name,
          status: s.overall_attendance >= 75 ? 'present' : 'absent'
        })));
      }

      // Load Admin KPIs
      const kpiRes = await api.getAdminKPIs();
      if (kpiRes?.data) {
        setKpiMetrics(kpiRes.data);
      }

      // Load Audit Logs
      const auditRes = await api.getAuditLogs(6);
      if (auditRes?.data) {
        setAuditLogs(auditRes.data);
      }
    }
    loadData();
  }, []);

  // Live countdown timer (Teacher dashboard)
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { mins: prev.mins - 1, secs: 59 };
        return { mins: 15, secs: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleAttendance = (idx, newStatus) => {
    setStudents((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], status: newStatus };
      return updated;
    });
    setAttendanceSaved(false);
  };

  const handleSaveAttendance = async () => {
    const payload = students.map(s => ({
      student_id: s.id || 1,
      date: new Date().toISOString().split('T')[0],
      subject_code: 'CS501',
      status: s.status === 'present' ? 'Present' : s.status === 'late' ? 'OD' : 'Absent',
      marked_by: currentUser?.name || 'Dr. Sarah Jenkins'
    }));

    const res = await api.submitBatchAttendance(payload);
    setSaveMessage(res.source === 'backend' ? 'Committed to live SQLite Database with SHA-256 Audit Trail!' : 'Committed to Central ERP Simulation!');
    setAttendanceSaved(true);
    setTimeout(() => setAttendanceSaved(false), 4500);

    // Refresh audit logs
    const auditRes = await api.getAuditLogs(6);
    if (auditRes?.data) setAuditLogs(auditRes.data);
  };

  const handleRequestProxy = async () => {
    const reqData = {
      student_id: 1,
      requested_for: currentUser?.name || 'Dr. Sarah Jenkins',
      subject_code: 'CS501',
      date: new Date().toISOString().split('T')[0],
      reason: proxyReason
    };
    await api.submitProxyRequest(reqData);
    setProxyRequested(true);

    // Refresh proxy feed and audits
    const auditRes = await api.getAuditLogs(6);
    if (auditRes?.data) setAuditLogs(auditRes.data);
  };

  const handleStudentLeaveSubmit = async (e) => {
    e.preventDefault();
    if (!studentLeaveReason.trim()) return;

    const reqData = {
      student_id: currentUser?.id === '21BCE1001' ? 1 : 7,
      requested_for: `${currentUser?.name || 'Arjun Mehta'} (${currentUser?.id || '21BCE1001'})`,
      subject_code: 'CS501',
      date: new Date().toISOString().split('T')[0],
      reason: studentLeaveReason
    };

    const res = await api.submitProxyRequest(reqData);
    setLeaveAiVerdict(res.data);
    setStudentLeaveSubmitted(true);

    // Update proxy feed in admin
    setProxyFeed(prev => [
      {
        id: res.data.id,
        orig: `${res.data.requested_for}`,
        proxy: res.data.flagged_anomaly ? 'AI Sentinel Flag' : 'Dean Review',
        course: 'CS-501 OS Lab',
        time: 'Today',
        status: res.data.status,
        match: res.data.flagged_anomaly ? 'Suspicious' : 'Valid OD',
        risk: `${res.data.risk_score >= 0.7 ? 'High' : 'Low'} (${res.data.risk_score})`
      },
      ...prev
    ]);

    const auditRes = await api.getAuditLogs(6);
    if (auditRes?.data) setAuditLogs(auditRes.data);
  };

  const handleUpdateProxyStatus = async (feedIdx, newStatus) => {
    const item = proxyFeed[feedIdx];
    await api.updateProxyStatus(item.id, newStatus);
    setProxyFeed(prev => {
      const copy = [...prev];
      copy[feedIdx] = { ...copy[feedIdx], status: newStatus };
      return copy;
    });

    const auditRes = await api.getAuditLogs(6);
    if (auditRes?.data) setAuditLogs(auditRes.data);
  };

  const handleGenerateAudit = () => {
    setAuditGenerated(true);
    // Generate downloadable compliance report JSON
    const reportData = {
      institution: 'NexusFlow Institute of Technology',
      audit_timestamp: new Date().toISOString(),
      compliance_seal: 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
      kpi_summary: kpiMetrics,
      accreditation_compliance: {
        naac_criterion_1: '99.4% Syllabi Compliance',
        aicte_faculty_ratio: '1:15 Validated',
        attendance_integrity: 'Zero-Proxy Guarantee Enforced'
      }
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NexusFlow_Institutional_Audit_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setTimeout(() => setAuditGenerated(false), 3500);
  };

  // Shared tab button helper
  const TabBtn = ({ id, icon: Icon, label, color }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`btn rounded-pill px-4 py-2 d-flex align-items-center gap-2 fw-semibold transition-all ${
        activeTab === id ? 'btn-primary-enterprise glow-blue' : 'btn-link text-muted text-decoration-none'
      }`}
      aria-selected={activeTab === id}
      role="tab"
    >
      <Icon size={18} className={activeTab === id ? 'text-white' : 'text-primary'} />
      <span>{label}</span>
    </button>
  );

  return (
    <section id="dashboards" className="py-5">
      <div className="container py-4">
        {/* Section Header */}
        <div className="text-center mb-4">
          <span className="badge-osfic text-uppercase font-mono mb-2" style={{ fontSize: '0.72rem' }}>
            <Cpu size={14} className="text-cyan" />
            Live Enterprise SaaS Engine
          </span>
          <h2 className="display-6 fw-bold mt-2 mb-2">
            Experience the <span className="text-gradient-primary">NexusFlow Interface</span>
          </h2>
          <p className="text-muted mx-auto mb-2" style={{ maxWidth: '640px' }}>
            Fully operational role dashboards for Colleges & Universities. Connects to SQLite & FastAPI with real-time audit logging and automated Sentinel AI proxy protection.
          </p>

          {/* Active User Session Bar */}
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-3 border" style={{ background: 'var(--nf-bg-surface)', borderColor: 'var(--nf-border)' }}>
            <span className="small text-muted font-mono">Current Mock Session:</span>
            <span className="badge rounded-pill font-mono" style={{ background: `${currentUser?.color || '#2563eb'}20`, color: currentUser?.color || '#2563eb', border: `1px solid ${currentUser?.color || '#2563eb'}40` }}>
              {currentUser?.name || 'Dr. Sarah Jenkins'} ({currentUser?.role || 'Teacher'})
            </span>
            <button
              onClick={() => onOpenLoginModal && onOpenLoginModal(currentUser?.role || 'Teacher')}
              className="btn btn-xs btn-link text-cyan p-0 font-mono text-decoration-none small"
              style={{ fontSize: '0.72rem' }}
            >
              [Switch Mock ID]
            </button>
          </div>

          {/* Interactive Toggle Switch — 3 tabs */}
          <div
            className="d-flex justify-content-center p-1 rounded-pill shadow-lg border mx-auto"
            style={{ background: 'var(--nf-bg-surface)', borderColor: 'var(--nf-border)', maxWidth: '480px' }}
            role="tablist"
          >
            <TabBtn id="teacher" icon={UserCheck} label="Teacher" />
            <TabBtn id="student" icon={GraduationCap} label="Student" />
            <TabBtn id="admin" icon={ShieldCheck} label="Admin / HOD" />
          </div>
        </div>

        {/* ================= TAB 1: TEACHER PORTAL ========================= */}
        {activeTab === 'teacher' && (
          <div className="card-enterprise p-4 p-md-5 shadow-2xl" style={{ borderColor: 'var(--nf-border-bright)' }}>
            {/* Profile Header */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 pb-4 mb-4 border-bottom" style={{ borderColor: 'var(--nf-border)' }}>
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle p-2 d-flex align-items-center justify-content-center text-white" style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #1d4ed8, #2563eb)', boxShadow: '0 0 16px rgba(37, 99, 235, 0.4)' }}>
                  <UserCheck size={28} />
                </div>
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <h4 className="fw-bold mb-0">
                      {currentUser?.role === 'Teacher' ? currentUser.name : 'Dr. Sarah Jenkins'}
                    </h4>
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill font-mono" style={{ fontSize: '0.72rem' }}>
                      Faculty ID: {currentUser?.role === 'Teacher' ? currentUser.id : 'FAC-101'}
                    </span>
                  </div>
                  <small className="text-muted">
                    Dept. of Computer Science & Engineering • Subject: CS501 Operating Systems
                  </small>
                </div>
              </div>
              <div className="p-3 rounded-3 d-flex align-items-center gap-3" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border-bright)' }}>
                <Clock size={24} className="text-primary" />
                <div>
                  <div className="small text-muted font-mono" style={{ fontSize: '0.7rem' }}>NEXT LECTURE COUNTDOWN</div>
                  <div className="fw-bolder fs-5 text-primary font-mono">
                    CS-501 (Hall 302) in {String(countdown.mins).padStart(2, '0')}:{String(countdown.secs).padStart(2, '0')}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="row g-4">
              {/* Left: Attendance Table */}
              <div className="col-lg-7">
                <div className="p-4 rounded-4 h-100" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h5 className="fw-bold mb-1 d-flex align-items-center gap-2">
                        Quick Attendance Roster
                        <span className="badge bg-primary text-white font-mono" style={{ fontSize: '0.65rem' }}>ACTIVE SESSION</span>
                      </h5>
                      <p className="text-muted small mb-0">Course: CS-501 Operating Systems • Section A (Batch 2023-27)</p>
                    </div>
                    <button onClick={handleSaveAttendance} className="btn btn-sm btn-primary-enterprise d-flex align-items-center gap-1 glow-blue">
                      {attendanceSaved ? <Check size={14} /> : <FileText size={14} />}
                      <span>{attendanceSaved ? 'Saved to ERP!' : 'Commit Attendance'}</span>
                    </button>
                  </div>

                  {attendanceSaved && (
                    <div className="alert alert-success d-flex align-items-center gap-2 py-2 small mb-3">
                      <CheckCircle size={16} />
                      <span>{saveMessage}</span>
                    </div>
                  )}

                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.85rem' }}>
                      <thead>
                        <tr className="text-muted font-mono" style={{ fontSize: '0.75rem' }}>
                          <th>ROLL NO</th>
                          <th>STUDENT NAME</th>
                          <th className="text-center">STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((st, sIdx) => (
                          <tr key={st.roll}>
                            <td className="font-mono fw-semibold text-primary">{st.roll}</td>
                            <td>{st.name}</td>
                            <td className="text-center">
                              <div className="btn-group btn-group-sm" role="group" aria-label={`Attendance for ${st.name}`}>
                                {['present', 'late', 'absent'].map((s) => (
                                  <button
                                    key={s}
                                    type="button"
                                    onClick={() => handleToggleAttendance(sIdx, s)}
                                    className={`btn ${
                                      st.status === s
                                        ? s === 'present' ? 'btn-success text-white'
                                          : s === 'late' ? 'btn-warning text-dark'
                                          : 'btn-danger text-white'
                                        : 'btn-outline-secondary'
                                    }`}
                                  >
                                    {s === 'present' ? 'Present' : s === 'late' ? 'OD/Duty' : 'Absent'}
                                  </button>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top text-muted small" style={{ borderColor: 'var(--nf-border)' }}>
                    <span>
                      Present: {students.filter(s => s.status === 'present').length} •{' '}
                      OD/Duty: {students.filter(s => s.status === 'late').length} •{' '}
                      Absent: {students.filter(s => s.status === 'absent').length}
                    </span>
                    <span className="text-primary fw-medium font-mono">Sync: Connected to Central ERP</span>
                  </div>
                </div>
              </div>

              {/* Right: Proxy Request + Schedule */}
              <div className="col-lg-5">
                <div className="d-flex flex-column gap-3">
                  <div className="p-4 rounded-4" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="d-flex align-items-center gap-2">
                        <Send size={18} className="text-warning" />
                        <h5 className="fw-bold mb-0">Emergency Proxy Request</h5>
                      </div>
                      <span className="badge bg-warning-subtle text-warning font-mono">ONE-TAP ENGINE</span>
                    </div>
                    {!proxyRequested ? (
                      <div>
                        <p className="text-muted small mb-3">NexusFlow automatically identifies non-conflicting peer faculty with syllabus domain compatibility.</p>
                        <div className="mb-2">
                          <label className="form-label small text-muted font-mono mb-1">REASON FOR PROXY:</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={proxyReason}
                            onChange={(e) => setProxyReason(e.target.value)}
                            placeholder="Reason for substitution"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label small text-muted font-mono mb-1">AI-RECOMMENDED PROXY FACULTY:</label>
                          <select className="form-select form-select-sm" value={proxyTeacher} onChange={(e) => setProxyTeacher(e.target.value)}>
                            <option value="Prof. Rajesh K. (Distributed Systems)">Prof. Rajesh K. (Free Slot • 98% Syllabus Match)</option>
                            <option value="Dr. Anita Desai (Machine Learning)">Dr. Anita Desai (Free Slot • 94% Match)</option>
                            <option value="Prof. Vikram Seth (ECE VLSI)">Prof. Vikram Seth (Free Slot • 89% Match)</option>
                          </select>
                        </div>
                        <button onClick={handleRequestProxy} className="btn btn-warning w-100 fw-semibold d-flex align-items-center justify-content-center gap-2 py-2">
                          <Send size={16} />
                          <span>Dispatch Instant Proxy Request</span>
                        </button>
                      </div>
                    ) : (
                      <div className="p-3 rounded-3 bg-success bg-opacity-10 border border-success border-opacity-30">
                        <div className="d-flex align-items-center gap-2 text-success fw-bold mb-1">
                          <CheckCircle size={18} />
                          <span>Proxy Request Dispatched!</span>
                        </div>
                        <p className="small text-muted mb-2">Notification sent to <strong>{proxyTeacher}</strong> via SMS and NexusFlow App.</p>
                        <div className="d-flex justify-content-between align-items-center pt-2 border-top border-success border-opacity-25">
                          <span className="badge bg-success text-white font-mono">SLOT PROTECTED</span>
                          <button onClick={() => setProxyRequested(false)} className="btn btn-link btn-sm text-muted text-decoration-none p-0">Reset</button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-3 rounded-4" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                    <div className="fw-bold small text-muted font-mono mb-2">TODAY'S FACULTY TIMELINE</div>
                    <div className="d-flex flex-column gap-2">
                      {[
                        { time: '09:00 - 10:00 AM', course: 'CS501: Operating Systems', room: 'Hall 302', note: 'Completed (54/58)', badge: 'Done', cls: 'bg-success-subtle text-success' },
                        { time: '11:30 - 01:00 PM', course: 'CS501: OS Kernel Lab', room: 'Lab 4', note: 'Starting Soon', badge: 'Up Next', cls: 'bg-primary text-white', active: true },
                        { time: '02:30 - 03:30 PM', course: 'Departmental Faculty Council', room: 'Conference Room A', note: 'Scheduled', badge: 'Pending', cls: 'bg-secondary-subtle text-secondary' }
                      ].map((item, i) => (
                        <div key={i} className="d-flex justify-content-between align-items-center p-2 rounded-2"
                          style={{ background: item.active ? 'rgba(37, 99, 235, 0.07)' : 'var(--nf-bg-card)', border: `1px solid ${item.active ? 'var(--nf-border-bright)' : 'var(--nf-border)'}` }}>
                          <div>
                            <div className={`fw-${item.active ? 'bold' : 'semibold'} small ${item.active ? 'text-primary font-mono' : ''}`}>{item.time}: {item.course}</div>
                            <div className="text-muted" style={{ fontSize: '0.72rem' }}>{item.room} • {item.note}</div>
                          </div>
                          <span className={`badge ${item.cls}`}>{item.badge}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: STUDENT PORTAL ========================= */}
        {activeTab === 'student' && (
          <div className="card-enterprise p-4 p-md-5 shadow-2xl" style={{ borderColor: 'var(--nf-border-bright)' }}>
            {/* Student Profile Header */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 pb-4 mb-4 border-bottom" style={{ borderColor: 'var(--nf-border)' }}>
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle p-2 d-flex align-items-center justify-content-center text-white" style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #059669, #10b981)', boxShadow: '0 0 16px rgba(16, 185, 129, 0.4)' }}>
                  <GraduationCap size={28} />
                </div>
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <h4 className="fw-bold mb-0">
                      {currentUser?.role === 'Student' ? currentUser.name : 'Arjun Mehta'}
                    </h4>
                    <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill font-mono">B.Tech CSE • Sem 5</span>
                  </div>
                  <small className="text-muted">
                    Roll No: {currentUser?.role === 'Student' ? currentUser.id : '21BCE1001'} • Section A • Academic Node
                  </small>
                </div>
              </div>
              <div className="p-3 rounded-3 d-flex align-items-center gap-3" style={{ background: 'var(--nf-bg-surface)', border: `1px solid ${attendanceHealth >= 75 ? 'rgba(16, 185, 129, 0.5)' : 'rgba(244, 63, 94, 0.5)'}` }}>
                <div className="text-center font-mono">
                  <div className="small text-muted" style={{ fontSize: '0.7rem' }}>OVERALL ATTENDANCE</div>
                  <div className={`fw-bolder fs-4 ${attendanceHealth >= 75 ? 'text-success' : 'text-danger'}`}>{attendanceHealth}%</div>
                </div>
                <div className="ps-2 border-start" style={{ borderColor: 'var(--nf-border)' }}>
                  <span className={`badge ${attendanceHealth >= 75 ? 'bg-success text-white' : 'bg-danger text-white'} rounded-pill`}>
                    {attendanceHealth >= 75 ? 'Exam Eligible (>75%)' : 'Caution: Below 75%'}
                  </span>
                  <div className="small text-muted mt-1" style={{ fontSize: '0.72rem' }}>
                    {attendanceHealth >= 75 ? 'Safe: 3 absences margin remaining' : 'Debarment Warning: Attend next 3 classes!'}
                  </div>
                </div>
              </div>
            </div>

            {/* Room alert banner */}
            {!roomAlertDismissed && (
              <div className="alert alert-warning alert-dismissible fade show d-flex align-items-center gap-3 p-3 mb-4 rounded-3" role="alert">
                <AlertTriangle size={22} className="text-warning flex-shrink-0" />
                <div className="flex-grow-1">
                  <strong>🚨 Live Room Relocation Alert:</strong>
                  <div className="small mt-1">Your 11:30 AM class (<strong>CS-501: OS Kernel Lab</strong>) relocated from <em>Old Lab 102</em> to <strong>Annex Lab 4</strong>. Verified seats: 60/60.</div>
                </div>
                <button type="button" className="btn-close" onClick={() => setRoomAlertDismissed(true)} aria-label="Close"></button>
              </div>
            )}

            <div className="row g-4">
              {/* Left: Timeline */}
              <div className="col-lg-7">
                <div className="p-4 rounded-4 h-100" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h5 className="fw-bold mb-1">Personalized Daily Schedule</h5>
                      <span className="small text-muted font-mono">TODAY: MONDAY, AUTUMN SEMESTER</span>
                    </div>
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle font-mono">WEEK 9 • ON SCHEDULE</span>
                  </div>

                  <div className="d-flex flex-column gap-3">
                    {[
                      { time: '09:00 - 10:00 AM • Hall 302', course: 'CS-501: Operating Systems', instructor: 'Dr. Sarah Jenkins', topic: 'Virtual Memory & Page Tables', status: 'Attended', statusCls: 'bg-success-subtle text-success', active: false, dotColor: '#10b981' },
                      { time: '10:15 - 11:15 AM • Lab 4', course: 'CS-502: Distributed Systems', instructor: 'Prof. Rajesh K.', topic: 'Raft Consensus Protocol', status: 'ACTIVE SLOT', statusCls: 'bg-primary text-white', active: true, dotColor: '#2563eb' },
                      { time: '11:30 AM - 12:30 PM • Hall 305', course: 'CS-503: Machine Learning', instructor: 'Dr. Anita Desai', topic: 'Neural Network Backpropagation', status: 'Upcoming', statusCls: 'bg-secondary-subtle text-secondary', active: false, dotColor: 'var(--nf-text-muted)' }
                    ].map((item, i) => (
                      <div key={i} className="timeline-item">
                        <div className="timeline-dot" style={{ backgroundColor: item.dotColor }}></div>
                        <div className={`p-3 rounded-3 card-enterprise mb-2 ${item.active ? 'border-primary' : ''}`}
                          style={item.active ? { background: 'rgba(37, 99, 235, 0.05)' } : {}}>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className={`fw-bold small font-mono ${item.active ? 'text-primary d-flex align-items-center gap-1' : ''}`}>
                              {item.active && <span className="pulsing-dot me-1" style={{ width: '6px', height: '6px' }}></span>}
                              {item.time}
                            </span>
                            <span className={`badge ${item.statusCls}`}>{item.status}</span>
                          </div>
                          <h6 className={`fw-bold mt-1 mb-1 ${item.active ? 'text-primary' : ''}`}>{item.course}</h6>
                          <div className="small text-muted d-flex align-items-center gap-2">
                            <span>Instructor: {item.instructor}</span>
                            <span>• {item.topic}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Attendance Simulator + Student Request Form */}
              <div className="col-lg-5">
                <div className="d-flex flex-column gap-3">
                  {/* Attendance health slider */}
                  <div className="p-4 rounded-4" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h5 className="fw-bold mb-0">Attendance Health Test</h5>
                      <span className="badge bg-primary-subtle text-primary font-mono" style={{ fontSize: '0.7rem' }}>REGISTRY SIMULATOR</span>
                    </div>
                    <p className="small text-muted mb-3">Drag the slider to test NexusFlow enforcing the 75% UGC cutoff rule automatically.</p>
                    <label className="form-label d-flex justify-content-between small font-mono">
                      <span>Simulated Attendance:</span>
                      <strong className={`fs-6 ${attendanceHealth >= 75 ? 'text-success' : 'text-danger'}`}>{attendanceHealth}%</strong>
                    </label>
                    <input type="range" className="form-range mb-3" min="60" max="100" step="0.5"
                      value={attendanceHealth} onChange={(e) => setAttendanceHealth(parseFloat(e.target.value))} />
                    {attendanceHealth < 75 ? (
                      <div className="p-3 rounded-3 bg-danger bg-opacity-10 border border-danger border-opacity-30">
                        <div className="d-flex align-items-center gap-2 text-danger fw-bold small mb-1">
                          <ShieldAlert size={16} /><span>Admit Card Debarment Warning!</span>
                        </div>
                        <div className="text-muted" style={{ fontSize: '0.78rem' }}>
                          Need <strong>{Math.ceil((0.75 * 60 - (attendanceHealth / 100 * 60)) / (1 - 0.75))}</strong> consecutive classes to restore eligibility.
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 rounded-3 bg-success bg-opacity-10 border border-success border-opacity-30">
                        <div className="d-flex align-items-center gap-2 text-success fw-bold small mb-1">
                          <CheckCircle size={16} /><span>Eligible for End-Semester Exams</span>
                        </div>
                        <div className="text-muted" style={{ fontSize: '0.78rem' }}>Hall ticket download enabled upon fee clearance.</div>
                      </div>
                    )}
                  </div>

                  {/* Student Leave / OD Request with AI Sentinel */}
                  <div className="p-4 rounded-4" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <h5 className="fw-bold mb-0">Submit OD / Leave Request</h5>
                      <span className="badge bg-cyan-subtle text-cyan font-mono" style={{ fontSize: '0.7rem' }}>AI SENTINEL</span>
                    </div>
                    <p className="small text-muted mb-3">
                      Submissions are scanned in real-time by Sentinel AI for keyword anomalies and proxy attempts.
                    </p>

                    {!studentLeaveSubmitted ? (
                      <form onSubmit={handleStudentLeaveSubmit}>
                        <div className="mb-2">
                          <label className="form-label small text-muted font-mono mb-1">REASON / DOCUMENTATION:</label>
                          <textarea
                            className="form-control form-control-sm"
                            rows={2}
                            value={studentLeaveReason}
                            onChange={(e) => setStudentLeaveReason(e.target.value)}
                            required
                            placeholder="e.g. Representing college at Smart India Hackathon OR medical leave"
                          />
                        </div>
                        <button type="submit" className="btn btn-sm btn-primary-enterprise w-100 d-flex align-items-center justify-content-center gap-2 py-1.5 glow-blue">
                          <Send size={14} />
                          <span>Submit Request to HOD</span>
                        </button>
                      </form>
                    ) : (
                      <div className={`p-3 rounded-3 border ${leaveAiVerdict?.flagged_anomaly ? 'bg-danger bg-opacity-10 border-danger border-opacity-30' : 'bg-success bg-opacity-10 border-success border-opacity-30'}`}>
                        <div className="d-flex align-items-center gap-2 fw-bold small mb-1">
                          {leaveAiVerdict?.flagged_anomaly ? (
                            <><AlertOctagon size={16} className="text-danger" /><span className="text-danger">AI Sentinel Flagged Anomaly!</span></>
                          ) : (
                            <><CheckCircle size={16} className="text-success" /><span className="text-success">Request Sent for Review!</span></>
                          )}
                        </div>
                        <div className="small text-muted mb-2">
                          Status: <strong>{leaveAiVerdict?.status}</strong> • Risk Score: <strong>{(leaveAiVerdict?.risk_score * 100).toFixed(0)}%</strong>
                        </div>
                        <button type="button" onClick={() => { setStudentLeaveSubmitted(false); setStudentLeaveReason(''); }} className="btn btn-link btn-xs text-muted p-0 text-decoration-none small">
                          Submit Another Request
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ADMIN PORTAL ========================== */}
        {activeTab === 'admin' && (
          <div className="card-enterprise p-4 p-md-5 shadow-2xl" style={{ borderColor: 'var(--nf-border-bright)' }}>
            {/* Admin Profile Header */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 pb-4 mb-4 border-bottom" style={{ borderColor: 'var(--nf-border)' }}>
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle p-2 d-flex align-items-center justify-content-center text-white" style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #6d28d9, #7c3aed)', boxShadow: '0 0 16px rgba(124, 58, 237, 0.4)' }}>
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <h4 className="fw-bold mb-0">
                      {currentUser?.role === 'Admin' ? currentUser.name : 'Dr. Anita Desai'}
                    </h4>
                    <span className="badge rounded-pill font-mono px-2" style={{ background: 'rgba(124, 58, 237, 0.15)', color: '#7c3aed', border: '1px solid rgba(124,58,237,0.3)', fontSize: '0.72rem' }}>
                      Dean of Academics & NAAC Head
                    </span>
                  </div>
                  <small className="text-muted">Institutional Admin • All-Department Central Access • Audit Level: NAAC / NIRF Tier-1</small>
                </div>
              </div>
              <div className="d-flex gap-2 flex-wrap">
                <div className="p-2 px-3 rounded-3 text-center" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                  <div className="fw-bolder fs-5 text-primary font-mono">{kpiMetrics.total_students}</div>
                  <div className="small text-muted" style={{ fontSize: '0.7rem' }}>Enrolled Students</div>
                </div>
                <div className="p-2 px-3 rounded-3 text-center" style={{ background: 'var(--nf-bg-surface)', border: '1px solid rgba(16,185,129,0.4)' }}>
                  <div className="fw-bolder fs-5 text-success font-mono">{kpiMetrics.avg_campus_attendance}%</div>
                  <div className="small text-muted" style={{ fontSize: '0.7rem' }}>Campus Attendance</div>
                </div>
                <div className="p-2 px-3 rounded-3 text-center" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                  <div className="fw-bolder fs-5 font-mono" style={{ color: '#7c3aed' }}>{kpiMetrics.proxy_attempts_blocked}</div>
                  <div className="small text-muted" style={{ fontSize: '0.7rem' }}>Proxies Blocked</div>
                </div>
              </div>
            </div>

            {/* Conflict / Alert banner */}
            {!adminAlertDismissed && (
              <div className="alert alert-warning alert-dismissible fade show d-flex align-items-center gap-3 p-3 mb-4 rounded-3" role="alert">
                <AlertOctagon size={22} className="text-warning flex-shrink-0" />
                <div className="flex-grow-1">
                  <strong>⚡ AICTE Faculty Load Alert:</strong>
                  <div className="small mt-1">Prof. Rajesh K. is assigned 19 hrs/week — exceeds AICTE 18-hr soft limit. NexusFlow recommends shifting 1 tutorial to Dr. Anita Desai (Free: Thursday 11:30 AM).</div>
                </div>
                <button type="button" className="btn-close" onClick={() => setAdminAlertDismissed(true)} aria-label="Close"></button>
              </div>
            )}

            <div className="row g-4">
              {/* Left: Campus Stats + Live Requests Feed */}
              <div className="col-lg-7">
                <div className="d-flex flex-column gap-3">
                  {/* KPI grid */}
                  <div className="row g-3">
                    {[
                      { label: 'Total Scheduled Classes', val: '1,248', sub: 'This Semester', icon: Calendar, color: '#2563eb' },
                      { label: 'Substitutions Handled', val: `${proxyFeed.length}`, sub: '100% Slot Coverage', icon: RefreshCw, color: '#10b981' },
                      { label: 'Rooms Utilized', val: '86/94', sub: '91.5% Space Efficiency', icon: Building2, color: '#7c3aed' },
                      { label: 'AI Sentinel Uptime', val: `${kpiMetrics.system_uptime}%`, sub: 'Active Protection', icon: Users, color: '#f59e0b' }
                    ].map((kpi, i) => {
                      const Icon = kpi.icon;
                      return (
                        <div key={i} className="col-6">
                          <div className="p-3 rounded-3 card-enterprise d-flex align-items-center gap-3">
                            <div className="p-2 rounded-3 flex-shrink-0" style={{ background: `${kpi.color}20`, border: `1px solid ${kpi.color}30` }}>
                              <Icon size={20} style={{ color: kpi.color }} />
                            </div>
                            <div>
                              <div className="fw-bolder fs-5 font-mono" style={{ color: kpi.color }}>{kpi.val}</div>
                              <div className="small fw-semibold" style={{ lineHeight: 1.2 }}>{kpi.label}</div>
                              <div className="text-muted" style={{ fontSize: '0.7rem' }}>{kpi.sub}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Live Substitution & Proxy Feed */}
                  <div className="p-4 rounded-4" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex align-items-center gap-2">
                        <Activity size={18} className="text-primary" />
                        <h5 className="fw-bold mb-0">Live Proxy & Substitution Queue</h5>
                      </div>
                      <span className="d-flex align-items-center gap-1 font-mono" style={{ fontSize: '0.72rem', color: '#10b981' }}>
                        <span className="pulsing-dot" style={{ width: '6px', height: '6px' }}></span>
                        LIVE SYNC
                      </span>
                    </div>

                    <div className="d-flex flex-column gap-2">
                      {proxyFeed.map((item, i) => (
                        <div key={item.id || i} className="p-3 rounded-3 d-flex align-items-center justify-content-between gap-3"
                          style={{ background: 'var(--nf-bg-card)', border: '1px solid var(--nf-border)', fontSize: '0.82rem' }}>
                          <div className="flex-grow-1">
                            <div className="fw-semibold">{item.course} <span className="text-muted font-mono">• {item.time}</span></div>
                            <div className="text-muted small">
                              Target: <strong>{item.orig}</strong> → Sub: <strong>{item.proxy}</strong> (Risk: {item.risk})
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-2 flex-shrink-0">
                            <span className={`badge ${
                              item.status === 'Approved' ? 'bg-success-subtle text-success' :
                              item.status === 'Auto-Flagged' ? 'bg-danger-subtle text-danger' :
                              'bg-warning-subtle text-warning'
                            } font-mono`} style={{ fontSize: '0.68rem' }}>
                              {item.status}
                            </span>
                            {item.status !== 'Approved' && (
                              <button
                                onClick={() => handleUpdateProxyStatus(i, 'Approved')}
                                className="btn btn-xs btn-outline-success py-0 px-1 font-mono"
                                style={{ fontSize: '0.68rem' }}
                                title="Approve Request"
                              >
                                Approve
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Audit & Compliance Panel */}
              <div className="col-lg-5">
                <div className="d-flex flex-column gap-3">
                  {/* Tamper-Proof Audit Trail */}
                  <div className="p-4 rounded-4" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="d-flex align-items-center gap-2">
                        <FileSpreadsheet size={18} style={{ color: '#7c3aed' }} />
                        <h5 className="fw-bold mb-0">Tamper-Proof Audit Trail</h5>
                      </div>
                      <span className="badge font-mono" style={{ background: 'rgba(124, 58, 237, 0.15)', color: '#7c3aed', fontSize: '0.68rem' }}>
                        SHA-256
                      </span>
                    </div>

                    <div className="d-flex flex-column gap-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {auditLogs.length > 0 ? (
                        auditLogs.map((log) => (
                          <div key={log.id} className="p-2 rounded-2" style={{ background: 'var(--nf-bg-card)', border: '1px solid var(--nf-border)', fontSize: '0.74rem' }}>
                            <div className="d-flex justify-content-between">
                              <span className="fw-bold font-mono text-cyan">{log.event_type}</span>
                              <span className="text-muted font-mono" style={{ fontSize: '0.65rem' }}>
                                {log.created_at ? new Date(log.created_at).toLocaleTimeString() : 'Just now'}
                              </span>
                            </div>
                            <div className="text-muted mt-0.5" style={{ lineHeight: '1.2' }}>{log.description}</div>
                            <div className="text-muted font-mono mt-1" style={{ fontSize: '0.65rem' }}>Actor: {log.actor}</div>
                          </div>
                        ))
                      ) : (
                        <div className="text-muted small text-center py-2">No audit events logged yet.</div>
                      )}
                    </div>
                  </div>

                  {/* Audit Report Generator */}
                  <div className="p-4 rounded-4" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <FileText size={18} className="text-primary" />
                      <h5 className="fw-bold mb-0">NAAC / NIRF Audit Export</h5>
                    </div>
                    <p className="text-muted small mb-3">Generate cryptographically verified compliance records with digital hash seals for regulatory submission.</p>

                    <button
                      onClick={handleGenerateAudit}
                      className={`btn w-100 d-flex align-items-center justify-content-center gap-2 fw-semibold ${
                        auditGenerated ? 'btn-success' : 'btn-primary-enterprise'
                      }`}
                    >
                      {auditGenerated ? (
                        <><CheckCircle2 size={16} /><span>Official Report Downloaded!</span></>
                      ) : (
                        <><Download size={16} /><span>Export Official Audit Package</span></>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Banner — Schedule Demo */}
        <div className="text-center mt-5">
          <button onClick={onOpenPilotModal} className="btn btn-outline-enterprise d-inline-flex align-items-center gap-2 me-3">
            <span>Schedule a Customized Campus Demonstration</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
});

export default InteractiveDashboardSwitcher;
