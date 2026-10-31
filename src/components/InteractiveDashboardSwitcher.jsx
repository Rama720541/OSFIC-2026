import React, { useState, useEffect } from 'react';
import { UserCheck, GraduationCap, Clock, AlertTriangle, CheckCircle, Calendar, MapPin, Send, Check, RefreshCw, Sparkles, BookOpen, ChevronRight, ShieldAlert, FileText, Cpu } from 'lucide-react';

export function InteractiveDashboardSwitcher({ onOpenPilotModal }) {
  const [activeTab, setActiveTab] = useState('teacher'); // 'teacher' | 'student'

  // Teacher Portal State
  const [countdown, setCountdown] = useState({ mins: 14, secs: 28 });
  const [proxyRequested, setProxyRequested] = useState(false);
  const [proxyTeacher, setProxyTeacher] = useState('Dr. Ananya Ray (Embedded Systems)');
  const [attendanceSaved, setAttendanceSaved] = useState(false);
  const [students, setStudents] = useState([
    { roll: "CS-001", name: "Aarav Sharma", status: "present" },
    { roll: "CS-002", name: "Ananya Patnaik", status: "present" },
    { roll: "CS-003", name: "Debashis Mohanty", status: "late" },
    { roll: "CS-004", name: "Ishita Senapati", status: "present" },
    { roll: "CS-005", name: "Pritam Tripathy", status: "absent" },
    { roll: "CS-006", name: "Ritika Swain", status: "present" }
  ]);

  // Student Portal State
  const [attendanceHealth, setAttendanceHealth] = useState(78.5); // %
  const [roomAlertDismissed, setRoomAlertDismissed] = useState(false);

  // Live countdown timer effect for teacher dashboard
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.secs > 0) {
          return { ...prev, secs: prev.secs - 1 };
        } else if (prev.mins > 0) {
          return { mins: prev.mins - 1, secs: 59 };
        }
        return { mins: 15, secs: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleAttendance = (idx, newStatus) => {
    setStudents((prev) => {
      const updated = [...prev];
      updated[idx].status = newStatus;
      return updated;
    });
    setAttendanceSaved(false);
  };

  const handleSaveAttendance = () => {
    setAttendanceSaved(true);
    setTimeout(() => setAttendanceSaved(false), 3500);
  };

  const handleRequestProxy = () => {
    setProxyRequested(true);
  };

  return (
    <section id="dashboards" className="py-5">
      <div className="container py-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="badge-osfic text-uppercase font-mono mb-2" style={{ fontSize: '0.72rem' }}>
            <Cpu size={14} className="text-cyan" />
            Live Enterprise MVPs
          </span>
          <h2 className="display-6 fw-bold mt-2 mb-2">
            Experience the <span className="text-gradient-primary">NexusFlow Interface</span>
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '640px' }}>
            Test drive the dual portals built for faculty empowerment and student clarity. Toggle below to test live functionality.
          </p>

          {/* Interactive Toggle Switch */}
          <div className="d-inline-flex p-1 rounded-pill mt-3 shadow-lg border" style={{ background: 'var(--nf-bg-surface)', borderColor: 'var(--nf-border)' }}>
            <button
              onClick={() => setActiveTab('teacher')}
              className={`btn rounded-pill px-4 py-2 d-flex align-items-center gap-2 fw-semibold transition-all ${
                activeTab === 'teacher' ? 'btn-primary-enterprise glow-blue' : 'btn-link text-muted text-decoration-none'
              }`}
            >
              <UserCheck size={18} className={activeTab === 'teacher' ? 'text-white' : 'text-cyan'} />
              <span>Teacher Portal Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('student')}
              className={`btn rounded-pill px-4 py-2 d-flex align-items-center gap-2 fw-semibold transition-all ${
                activeTab === 'student' ? 'btn-primary-enterprise glow-blue' : 'btn-link text-muted text-decoration-none'
              }`}
            >
              <GraduationCap size={18} className={activeTab === 'student' ? 'text-white' : 'text-cyan'} />
              <span>Student Portal Preview</span>
            </button>
          </div>
        </div>

        {/* ===================== TAB 1: TEACHER PORTAL ===================== */}
        {activeTab === 'teacher' && (
          <div className="card-enterprise p-4 p-md-5 border-glow-cyan shadow-2xl">
            {/* Top Bar / Profile Header */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 pb-4 mb-4 border-bottom" style={{ borderColor: 'var(--nf-border)' }}>
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle p-2 d-flex align-items-center justify-content-center text-white" style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #0284c7, #2563eb)', boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)' }}>
                  <UserCheck size={28} />
                </div>
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <h4 className="fw-bold mb-0">Prof. Rajeshwar Senapati</h4>
                    <span className="badge bg-primary bg-opacity-20 text-cyan border border-info border-opacity-30 rounded-pill font-mono" style={{ fontSize: '0.72rem' }}>
                      Faculty ID: CSE-4089
                    </span>
                  </div>
                  <small className="text-muted">Dept. of Computer Science & Engineering • Academic Cluster 1</small>
                </div>
              </div>

              {/* Today's Active Countdown Badge */}
              <div className="p-3 rounded-3 d-flex align-items-center gap-3 border-glow-cyan" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border-bright)' }}>
                <Clock size={24} className="text-cyan animate-pulse" />
                <div>
                  <div className="small text-muted font-mono" style={{ fontSize: '0.7rem' }}>NEXT ACTIVE CLASS COUNTDOWN</div>
                  <div className="fw-bolder fs-5 text-cyan font-mono">
                    CS-301 (Lab 304) starts in {String(countdown.mins).padStart(2, '0')}:{String(countdown.secs).padStart(2, '0')}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Portal Content Grid */}
            <div className="row g-4">
              {/* Left Column: Quick Attendance Marker */}
              <div className="col-lg-7">
                <div className="p-4 rounded-4 h-100" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h5 className="fw-bold mb-1 d-flex align-items-center gap-2">
                        <span>Quick Attendance Marker</span>
                        <span className="badge bg-primary text-white font-mono" style={{ fontSize: '0.65rem' }}>ACTIVE SLOT</span>
                      </h5>
                      <p className="text-muted small mb-0">Course: CS-301 Operating Systems Lab • Section A (Batch 2023-27)</p>
                    </div>
                    <button
                      onClick={handleSaveAttendance}
                      className="btn btn-sm btn-primary-enterprise d-flex align-items-center gap-1 glow-blue"
                    >
                      {attendanceSaved ? <Check size={14} /> : <FileText size={14} />}
                      <span>{attendanceSaved ? 'Saved to University ERP!' : 'Submit Class Log'}</span>
                    </button>
                  </div>

                  {attendanceSaved && (
                    <div className="alert alert-success d-flex align-items-center gap-2 py-2 small mb-3 border-success">
                      <CheckCircle size={16} />
                      <span>Attendance batch committed to central ERP registry with SHA-256 audit timestamp!</span>
                    </div>
                  )}

                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.85rem' }}>
                      <thead>
                        <tr className="text-muted font-mono" style={{ fontSize: '0.75rem' }}>
                          <th>ROLL NO</th>
                          <th>STUDENT NAME</th>
                          <th className="text-center">ATTENDANCE STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((st, sIdx) => (
                          <tr key={st.roll}>
                            <td className="font-mono fw-semibold text-cyan">{st.roll}</td>
                            <td>{st.name}</td>
                            <td className="text-center">
                              <div className="btn-group btn-group-sm" role="group">
                                <button
                                  type="button"
                                  onClick={() => handleToggleAttendance(sIdx, 'present')}
                                  className={`btn ${st.status === 'present' ? 'btn-success text-white' : 'btn-outline-secondary'}`}
                                >
                                  Present
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleToggleAttendance(sIdx, 'late')}
                                  className={`btn ${st.status === 'late' ? 'btn-warning text-dark' : 'btn-outline-secondary'}`}
                                >
                                  Late
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleToggleAttendance(sIdx, 'absent')}
                                  className={`btn ${st.status === 'absent' ? 'btn-danger text-white' : 'btn-outline-secondary'}`}
                                >
                                  Absent
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top text-muted small" style={{ borderColor: 'var(--nf-border)' }}>
                    <span>Present: {students.filter(s => s.status === 'present').length} • Late: {students.filter(s => s.status === 'late').length} • Absent: {students.filter(s => s.status === 'absent').length}</span>
                    <span className="text-cyan fw-medium font-mono">Sync Status: Auto-Connected</span>
                  </div>
                </div>
              </div>

              {/* Right Column: One-Tap Absence & Proxy Requests + Schedule */}
              <div className="col-lg-5">
                <div className="d-flex flex-column gap-3">
                  {/* One-Tap Absence / Proxy Request Engine */}
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
                        <p className="text-muted small mb-3">
                          Need sudden medical leave or attending academic conference? NexusFlow automatically computes non-conflicting peer faculty with syllabus domain compatibility.
                        </p>
                        <div className="mb-3">
                          <label className="form-label small text-muted font-mono mb-1">SELECT AFFECTED CLASS:</label>
                          <select className="form-select form-select-sm" defaultValue="cs301">
                            <option value="cs301">CS-301: Operating Systems (11:30 AM - Lab 304)</option>
                            <option value="cs402">CS-402: Cloud Architecture (02:30 PM - LH-2)</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label className="form-label small text-muted font-mono mb-1">AI-RECOMMENDED PROXY FACULTY:</label>
                          <select
                            className="form-select form-select-sm"
                            value={proxyTeacher}
                            onChange={(e) => setProxyTeacher(e.target.value)}
                          >
                            <option value="Dr. Ananya Ray (Embedded Systems)">Dr. Ananya Ray (Free slot • 99% Syllabus Match)</option>
                            <option value="Prof. S. K. Mishra (Systems & Kernels)">Prof. S. K. Mishra (Free slot • 95% Match)</option>
                          </select>
                        </div>
                        <button
                          onClick={handleRequestProxy}
                          className="btn btn-warning w-100 fw-semibold d-flex align-items-center justify-content-center gap-2 py-2"
                        >
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
                        <p className="small text-muted mb-2">
                          Notification sent to <strong>{proxyTeacher}</strong> via SMS and NexusFlow Teacher App. Status: <em>Awaiting 1-Tap Confirmation</em>.
                        </p>
                        <div className="d-flex justify-content-between align-items-center pt-2 border-top border-success border-opacity-25">
                          <span className="badge bg-success text-white font-mono">SLOT PROTECTED</span>
                          <button
                            onClick={() => setProxyRequested(false)}
                            className="btn btn-link btn-sm text-muted text-decoration-none p-0"
                          >
                            Reset Request
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Today's Teaching Schedule mini list */}
                  <div className="p-3 rounded-4" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                    <div className="fw-bold small text-muted font-mono mb-2">TODAY'S FACULTY TIMELINE</div>
                    <div className="d-flex flex-column gap-2">
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-2" style={{ background: 'var(--nf-bg-card)', border: '1px solid var(--nf-border)' }}>
                        <div>
                          <div className="fw-semibold small">09:00 - 10:00 AM: Advanced Data Structures</div>
                          <div className="text-muted" style={{ fontSize: '0.72rem' }}>Hall 102 • Completed (54/58 Present)</div>
                        </div>
                        <span className="badge bg-success-subtle text-success">Done</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-2 border-glow-cyan" style={{ background: 'rgba(56, 189, 248, 0.08)' }}>
                        <div>
                          <div className="fw-bold small text-cyan font-mono">11:30 - 01:00 PM: OS Lab Simulation</div>
                          <div className="text-muted" style={{ fontSize: '0.72rem' }}>Lab 304 • Starting Soon</div>
                        </div>
                        <span className="badge bg-primary text-white font-mono">Up Next</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-2" style={{ background: 'var(--nf-bg-card)', border: '1px solid var(--nf-border)' }}>
                        <div>
                          <div className="fw-semibold small">02:30 - 03:30 PM: Departmental Research Review</div>
                          <div className="text-muted" style={{ fontSize: '0.72rem' }}>Conference Room A • Scheduled</div>
                        </div>
                        <span className="badge bg-secondary-subtle text-secondary">Pending</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: STUDENT PORTAL ===================== */}
        {activeTab === 'student' && (
          <div className="card-enterprise p-4 p-md-5 border-glow-cyan shadow-2xl">
            {/* Top Bar / Student Profile Header */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 pb-4 mb-4 border-bottom" style={{ borderColor: 'var(--nf-border)' }}>
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle p-2 d-flex align-items-center justify-content-center text-white" style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #059669, #10b981)', boxShadow: '0 0 16px rgba(16, 185, 129, 0.4)' }}>
                  <GraduationCap size={28} />
                </div>
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <h4 className="fw-bold mb-0">Subham Sourav Panda</h4>
                    <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill font-mono">
                      B.Tech CSE • Sem 5
                    </span>
                  </div>
                  <small className="text-muted">Reg No: 2201090124 • Section A • Academic Node</small>
                </div>
              </div>

              {/* Attendance Health Gauge */}
              <div className="p-3 rounded-3 d-flex align-items-center gap-3" style={{ background: 'var(--nf-bg-surface)', border: `1px solid ${attendanceHealth >= 75 ? 'rgba(16, 185, 129, 0.5)' : 'rgba(244, 63, 94, 0.5)'}`, boxShadow: attendanceHealth >= 75 ? '0 0 16px -3px rgba(16, 185, 129, 0.3)' : '0 0 16px -3px rgba(244, 63, 94, 0.3)' }}>
                <div className="text-center font-mono">
                  <div className="small text-muted" style={{ fontSize: '0.7rem' }}>OVERALL ATTENDANCE</div>
                  <div className={`fw-bolder fs-4 ${attendanceHealth >= 75 ? 'text-success' : 'text-danger'}`}>
                    {attendanceHealth}%
                  </div>
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

            {/* Instant Room Relocation Banner */}
            {!roomAlertDismissed && (
              <div className="alert alert-warning alert-dismissible fade show d-flex align-items-center gap-3 p-3 mb-4 rounded-3 border-warning" role="alert">
                <AlertTriangle size={24} className="text-warning flex-shrink-0" />
                <div className="flex-grow-1">
                  <strong>🚨 Live Room Relocation Alert (NexusFlow Beacon):</strong>
                  <div className="small mt-1">
                    Your 11:30 AM class (<strong>CS-301: OS Lab</strong>) has been relocated from <em>Old Lab 102</em> to <strong>Annex Lab 304</strong> due to projector calibration. Verified seats: 60/60.
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setRoomAlertDismissed(true)}
                  aria-label="Close"
                ></button>
              </div>
            )}

            {/* Student Schedule & Attendance Details */}
            <div className="row g-4">
              {/* Left Column: Personalized Daily Schedule Timeline */}
              <div className="col-lg-7">
                <div className="p-4 rounded-4 h-100" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h5 className="fw-bold mb-1">Personalized Daily Schedule Timeline</h5>
                      <span className="small text-muted font-mono">TODAY: MONDAY, AUTUMN SEMESTER</span>
                    </div>
                    <span className="badge bg-primary bg-opacity-15 text-cyan border border-info border-opacity-30 font-mono">
                      WEEK 9 • ON SCHEDULE
                    </span>
                  </div>

                  <div className="d-flex flex-column gap-3">
                    {/* Item 1 */}
                    <div className="timeline-item">
                      <div className="timeline-dot" style={{ backgroundColor: 'var(--nf-success)', boxShadow: '0 0 10px var(--nf-success)' }}></div>
                      <div className="p-3 rounded-3 card-enterprise mb-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold small font-mono">09:00 - 10:00 AM • Lecture Hall 102</span>
                          <span className="badge bg-success-subtle text-success">Attended</span>
                        </div>
                        <h6 className="fw-bold text-cyan mt-1 mb-1">CS-302: Database Management Systems</h6>
                        <div className="small text-muted d-flex align-items-center gap-2">
                          <span>Instructor: Dr. B. K. Patel</span>
                          <span>• Topic: B+ Tree Indexing</span>
                        </div>
                      </div>
                    </div>

                    {/* Item 2: Active / Current */}
                    <div className="timeline-item">
                      <div className="timeline-dot" style={{ backgroundColor: '#38bdf8', boxShadow: '0 0 14px #38bdf8' }}></div>
                      <div className="p-3 rounded-3 card-enterprise mb-2 border-glow-cyan" style={{ background: 'rgba(56, 189, 248, 0.08)' }}>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold small text-cyan d-flex align-items-center gap-1 font-mono">
                            <span className="pulsing-dot" style={{ width: '6px', height: '6px' }}></span>
                            11:30 AM - 01:00 PM • Annex Lab 304 (Updated)
                          </span>
                          <span className="badge bg-primary text-white font-mono">ACTIVE SLOT</span>
                        </div>
                        <h6 className="fw-bold mt-1 mb-1">CS-301: Operating Systems & Virtualization Lab</h6>
                        <div className="small text-muted d-flex align-items-center gap-2">
                          <span>Instructor: Prof. Rajeshwar Senapati</span>
                          <span>• Bench: Terminal 24 Assigned</span>
                        </div>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="timeline-item">
                      <div className="timeline-dot" style={{ backgroundColor: 'var(--nf-text-muted)' }}></div>
                      <div className="p-3 rounded-3 card-enterprise mb-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold small text-muted font-mono">02:30 - 03:30 PM • Seminar Hall B</span>
                          <span className="badge bg-secondary-subtle text-secondary">Upcoming</span>
                        </div>
                        <h6 className="fw-bold mt-1 mb-1">EC-204: Signals & Digital Systems (Open Elective)</h6>
                        <div className="small text-muted d-flex align-items-center gap-2">
                          <span>Instructor: Dr. S. Tripathy</span>
                          <span>• Lecture: Fast Fourier Transform</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Attendance Health Simulator & Quick Resources */}
              <div className="col-lg-5">
                <div className="d-flex flex-column gap-3">
                  {/* Attendance Health Interactive Simulator */}
                  <div className="p-4 rounded-4" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h5 className="fw-bold mb-0">Attendance Health Test</h5>
                      <span className="badge bg-primary bg-opacity-20 text-cyan font-mono" style={{ fontSize: '0.7rem' }}>REGISTRY SIMULATOR</span>
                    </div>
                    <p className="small text-muted mb-3">
                      Drag the slider below to simulate student attendance health and see how NexusFlow automatically enforces the mandatory 75% UGC exam cutoff policy.
                    </p>

                    <label className="form-label d-flex justify-content-between small font-mono">
                      <span>Simulated Attendance:</span>
                      <strong className={`fs-6 ${attendanceHealth >= 75 ? 'text-success' : 'text-danger'}`}>{attendanceHealth}%</strong>
                    </label>
                    <input
                      type="range"
                      className="form-range mb-3"
                      min="60"
                      max="100"
                      step="0.5"
                      value={attendanceHealth}
                      onChange={(e) => setAttendanceHealth(parseFloat(e.target.value))}
                    />

                    {attendanceHealth < 75 ? (
                      <div className="p-3 rounded-3 bg-danger bg-opacity-10 border border-danger border-opacity-30">
                        <div className="d-flex align-items-center gap-2 text-danger fw-bold small mb-1">
                          <ShieldAlert size={16} />
                          <span>Admit Card Debarment Warning Triggered!</span>
                        </div>
                        <div className="text-muted" style={{ fontSize: '0.78rem' }}>
                          Notice automatically sent to student portal and faculty advisor. Need <strong>{Math.ceil((0.75 * 60 - (attendanceHealth / 100 * 60)) / (1 - 0.75))}</strong> consecutive classes to restore eligibility.
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 rounded-3 bg-success bg-opacity-10 border border-success border-opacity-30">
                        <div className="d-flex align-items-center gap-2 text-success fw-bold small mb-1">
                          <CheckCircle size={16} />
                          <span>Eligible for End-Semester Examinations</span>
                        </div>
                        <div className="text-muted" style={{ fontSize: '0.78rem' }}>
                          Biometric correlation confirmed. Hall ticket download enabled upon fee clearance.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Syllabus & Lecture Vault */}
                  <div className="p-4 rounded-4" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                    <div className="fw-bold small text-muted font-mono mb-2">COURSE VAULT & SLIDES</div>
                    <div className="d-flex flex-column gap-2">
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-2" style={{ background: 'var(--nf-bg-card)', border: '1px solid var(--nf-border)' }}>
                        <div className="d-flex align-items-center gap-2">
                          <BookOpen size={16} className="text-cyan" />
                          <span className="small fw-semibold">CS-301: Lab Manual v2.4</span>
                        </div>
                        <span className="badge bg-primary text-white font-mono" style={{ fontSize: '0.7rem' }}>PDF (3.2 MB)</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-2" style={{ background: 'var(--nf-bg-card)', border: '1px solid var(--nf-border)' }}>
                        <div className="d-flex align-items-center gap-2">
                          <BookOpen size={16} className="text-cyan" />
                          <span className="small fw-semibold">CS-302: Query Optimization Notes</span>
                        </div>
                        <span className="badge bg-primary text-white font-mono" style={{ fontSize: '0.7rem' }}>PDF (1.8 MB)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="text-center mt-4">
          <button onClick={onOpenPilotModal} className="btn btn-outline-enterprise d-inline-flex align-items-center gap-2">
            <span>Schedule a Customized Campus Demonstration</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
export default InteractiveDashboardSwitcher;
