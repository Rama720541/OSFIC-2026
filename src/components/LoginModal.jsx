import React, { useState, useEffect } from 'react';
import {
  UserCheck, GraduationCap, ShieldCheck, Lock, LogIn, CheckCircle2,
  Copy, Check, Sparkles, ArrowRight, UserPlus, Info, KeyRound
} from 'lucide-react';

export const MOCK_ACCOUNTS = {
  teacher: {
    role: 'Teacher',
    tabId: 'teacher',
    id: 'FAC-101',
    name: 'Dr. Sarah Jenkins',
    email: 's.jenkins@nexusflow.edu',
    password: 'faculty@2026',
    department: 'Computer Science & Engineering',
    tag: 'Course Coordinator • CS501',
    color: '#2563eb',
    icon: UserCheck
  },
  student: {
    role: 'Student',
    tabId: 'student',
    id: '21BCE1001',
    name: 'Arjun Mehta',
    email: 'arjun.m@nexusflow.edu',
    password: 'student@2026',
    department: 'CSE • Semester 5 (Sec A)',
    tag: 'Roll: 21BCE1001 • 91.4% Att.',
    color: '#10b981',
    icon: GraduationCap
  },
  admin: {
    role: 'Admin',
    tabId: 'admin',
    id: 'ADM-001',
    name: 'Dr. Anita Desai',
    email: 'a.desai@nexusflow.edu',
    password: 'admin@2026',
    department: 'Institutional Governance',
    tag: 'Dean of Academics & NAAC Head',
    color: '#7c3aed',
    icon: ShieldCheck
  }
};

export function LoginModal({
  isOpen,
  initialRole = 'Teacher',
  onClose,
  onSwitchToDashboard,
  onSwitchToRegister,
  onUserAuthenticated
}) {
  const [selectedRole, setSelectedRole] = useState(initialRole.toLowerCase());
  const [emailOrId, setEmailOrId] = useState(MOCK_ACCOUNTS.teacher.email);
  const [password, setPassword] = useState(MOCK_ACCOUNTS.teacher.password);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  // Sync state when initialRole changes
  useEffect(() => {
    const key = (initialRole || 'Teacher').toLowerCase();
    const validKey = ['teacher', 'student', 'admin'].includes(key) ? key : 'teacher';
    setSelectedRole(validKey);
    setEmailOrId(MOCK_ACCOUNTS[validKey].email);
    setPassword(MOCK_ACCOUNTS[validKey].password);
    setIsSuccess(false);
  }, [initialRole, isOpen]);

  if (!isOpen) return null;

  const currentMock = MOCK_ACCOUNTS[selectedRole] || MOCK_ACCOUNTS.teacher;

  const handleSelectRole = (roleKey) => {
    setSelectedRole(roleKey);
    setEmailOrId(MOCK_ACCOUNTS[roleKey].email);
    setPassword(MOCK_ACCOUNTS[roleKey].password);
  };

  const handleCopy = (text, key) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const executeLogin = (account) => {
    setIsSuccess(true);
    if (onUserAuthenticated) {
      onUserAuthenticated(account);
    }
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      if (onSwitchToDashboard) {
        onSwitchToDashboard(account.tabId);
      }
    }, 900);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    executeLogin(currentMock);
  };

  const handleQuickLogin = (roleKey) => {
    const acc = MOCK_ACCOUNTS[roleKey];
    setSelectedRole(roleKey);
    setEmailOrId(acc.email);
    setPassword(acc.password);
    executeLogin(acc);
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(2, 6, 18, 0.82)', backdropFilter: 'blur(12px)', zIndex: 1055 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content card-enterprise p-2 border-glow-cyan shadow-2xl">
          {/* Header */}
          <div className="modal-header border-bottom pb-3" style={{ borderColor: 'var(--nf-border)' }}>
            <div className="d-flex align-items-center gap-2">
              <div
                className="p-2 rounded-3 text-white"
                style={{
                  background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                  boxShadow: '0 0 14px rgba(56, 189, 248, 0.4)'
                }}
              >
                <Lock size={18} />
              </div>
              <div>
                <h5 className="modal-title fw-bold mb-0">NexusFlow Institutional SSO Login</h5>
                <span className="small text-cyan font-mono" style={{ fontSize: '0.72rem' }}>
                  Choose Role or One-Click Mock ID Evaluation Access
                </span>
              </div>
            </div>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4">
            {/* 3 Mock ID Selector Cards */}
            <div className="mb-4">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="small fw-bold text-muted font-mono text-uppercase">
                  Select Mock ID Profile for Direct Access:
                </span>
                <span className="badge bg-primary-subtle text-primary font-mono" style={{ fontSize: '0.68rem' }}>
                  Pre-configured for Evaluation
                </span>
              </div>

              <div className="row g-2">
                {Object.entries(MOCK_ACCOUNTS).map(([key, acc]) => {
                  const Icon = acc.icon;
                  const isSelected = selectedRole === key;
                  return (
                    <div key={key} className="col-md-4">
                      <div
                        onClick={() => handleSelectRole(key)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSelectRole(key); }}
                        className={`p-3 rounded-3 h-100 transition-all text-start border ${
                          isSelected ? 'shadow-md' : 'opacity-85'
                        }`}
                        style={{
                          background: isSelected ? 'var(--nf-bg-surface)' : 'var(--nf-bg-card)',
                          borderColor: isSelected ? acc.color : 'var(--nf-border)',
                          cursor: 'pointer',
                          transform: isSelected ? 'translateY(-2px)' : 'none'
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div
                            className="p-2 rounded-2 text-white"
                            style={{ background: acc.color, boxShadow: isSelected ? `0 0 12px ${acc.color}80` : 'none' }}
                          >
                            <Icon size={16} />
                          </div>
                          <span
                            className="badge font-mono rounded-pill"
                            style={{
                              background: `${acc.color}15`,
                              color: acc.color,
                              border: `1px solid ${acc.color}35`,
                              fontSize: '0.68rem'
                            }}
                          >
                            {acc.role}
                          </span>
                        </div>
                        <div className="fw-bold small mb-0">{acc.name}</div>
                        <div className="text-muted font-mono" style={{ fontSize: '0.7rem' }}>
                          ID: {acc.id}
                        </div>
                        <div className="text-muted small mt-1" style={{ fontSize: '0.7rem', lineHeight: '1.2' }}>
                          {acc.tag}
                        </div>

                        <div className="mt-2 pt-2 border-top d-flex justify-content-between align-items-center" style={{ borderColor: 'var(--nf-border)' }}>
                          <span className="font-mono text-muted" style={{ fontSize: '0.65rem' }}>
                            Pass: {acc.password}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuickLogin(key);
                            }}
                            className="btn btn-xs btn-outline-primary py-0 px-2 font-mono"
                            style={{ fontSize: '0.68rem' }}
                            title="Instant One-Click Login"
                          >
                            ⚡ Fast-Track
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {!isSuccess ? (
              <form onSubmit={handleFormSubmit}>
                <div className="p-3 rounded-3 mb-4" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="small font-mono fw-bold text-cyan">
                      AUTHENTICATION CREDENTIALS ({currentMock.role.toUpperCase()} PORTAL)
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(`${emailOrId} / ${password}`, 'full')}
                      className="btn btn-link btn-sm text-muted text-decoration-none p-0 font-mono d-flex align-items-center gap-1"
                      style={{ fontSize: '0.7rem' }}
                    >
                      {copiedKey === 'full' ? <Check size={12} className="text-success" /> : <Copy size={12} />}
                      <span>{copiedKey === 'full' ? 'Copied!' : 'Copy Credentials'}</span>
                    </button>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-7">
                      <label className="form-label small text-muted font-mono mb-1">
                        INSTITUTIONAL EMAIL OR ID:
                      </label>
                      <input
                        type="text"
                        className="form-control font-mono form-control-sm"
                        value={emailOrId}
                        onChange={(e) => setEmailOrId(e.target.value)}
                        required
                        placeholder="Enter ID or Email"
                      />
                    </div>
                    <div className="col-md-5">
                      <label className="form-label small text-muted font-mono mb-1">
                        SSO PASSCODE:
                      </label>
                      <input
                        type="text"
                        className="form-control font-mono form-control-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column flex-sm-row gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary-enterprise flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2 glow-blue"
                  >
                    <LogIn size={16} />
                    <span>Enter {currentMock.role} Dashboard Portal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin(selectedRole)}
                    className="btn btn-outline-enterprise d-flex align-items-center justify-content-center gap-2 py-2 font-mono"
                    style={{ minWidth: '180px' }}
                  >
                    <Sparkles size={16} className="text-warning" />
                    <span>Instant Mock SSO</span>
                  </button>
                </div>

                <div className="text-center mt-3 pt-3 border-top" style={{ borderColor: 'var(--nf-border)' }}>
                  <button
                    type="button"
                    onClick={onSwitchToRegister}
                    className="btn btn-link text-cyan text-decoration-none small p-0 fw-semibold d-flex align-items-center justify-content-center gap-1 w-100"
                  >
                    <UserPlus size={14} />
                    <span>Want a fresh tenant for your campus? Request Institutional Pilot Onboarding</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4">
                <div
                  className="rounded-circle bg-success text-white p-3 d-inline-flex mb-3"
                  style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h5 className="fw-bold text-success mb-1">
                  Authenticated as {currentMock.name}!
                </h5>
                <p className="small text-muted mb-0 font-mono">
                  Loading {currentMock.role} Workspace simulation ({currentMock.department})...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
