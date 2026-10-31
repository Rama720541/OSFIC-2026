import React, { useState } from 'react';
import { UserCheck, GraduationCap, ShieldCheck, Lock, LogIn, CheckCircle2, ArrowRight } from 'lucide-react';

export function LoginModal({ isOpen, initialRole = 'Teacher', onClose, onSwitchToDashboard }) {
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      if (onSwitchToDashboard) {
        onSwitchToDashboard(selectedRole.toLowerCase());
      }
    }, 1200);
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)', zIndex: 1055 }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content card-enterprise p-2 border-primary border-opacity-50 shadow-2xl">
          {/* Header */}
          <div className="modal-header border-bottom pb-3" style={{ borderColor: 'var(--nf-border)' }}>
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 rounded-3 bg-primary text-white">
                <Lock size={18} />
              </div>
              <div>
                <h5 className="modal-title fw-bold mb-0">NexusFlow Institutional SSO</h5>
                <span className="small text-muted font-mono" style={{ fontSize: '0.72rem' }}>
                  Role-Based Authentication (RBAC)
                </span>
              </div>
            </div>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4">
            {/* Role Select Pill Group */}
            <div className="d-flex p-1 rounded-3 mb-4" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
              <button
                type="button"
                onClick={() => setSelectedRole('Teacher')}
                className={`btn btn-sm flex-grow-1 rounded-2 fw-semibold d-flex align-items-center justify-content-center gap-1 ${selectedRole === 'Teacher' ? 'btn-primary text-white' : 'btn-link text-muted text-decoration-none'
                  }`}
              >
                <UserCheck size={14} />
                <span>Teacher</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('Student')}
                className={`btn btn-sm flex-grow-1 rounded-2 fw-semibold d-flex align-items-center justify-content-center gap-1 ${selectedRole === 'Student' ? 'btn-primary text-white' : 'btn-link text-muted text-decoration-none'
                  }`}
              >
                <GraduationCap size={14} />
                <span>Student</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('Admin')}
                className={`btn btn-sm flex-grow-1 rounded-2 fw-semibold d-flex align-items-center justify-content-center gap-1 ${selectedRole === 'Admin' ? 'btn-primary text-white' : 'btn-link text-muted text-decoration-none'
                  }`}
              >
                <ShieldCheck size={14} />
                <span>Admin/HOD</span>
              </button>
            </div>

            {!isSuccess ? (
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-muted font-mono">
                    {selectedRole.toUpperCase()} USERNAME / ID:
                  </label>
                  <input
                    type="text"
                    readOnly
                    className="form-control font-mono"
                    value={
                      selectedRole === 'Teacher'
                        ? 'prof.senapati@vssut.ac.in'
                        : selectedRole === 'Student'
                          ? 'subham.panda.220109@vssut.ac.in'
                          : 'registrar.office@vssut.ac.in'
                    }
                  />
                  <div className="form-text small" style={{ fontSize: '0.72rem' }}>
                    Demo credentials pre-filled for evaluation
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold text-muted font-mono">ENCRYPTED PASSCODE / SSO TOKEN:</label>
                  <input
                    type="password"
                    readOnly
                    className="form-control font-mono"
                    value="••••••••••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary-enterprise w-100 d-flex align-items-center justify-content-center gap-2 py-2"
                >
                  <LogIn size={16} />
                  <span>Enter {selectedRole} Simulation Portal</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-3">
                <div className="rounded-circle bg-success text-white p-3 d-inline-flex mb-2">
                  <CheckCircle2 size={32} />
                </div>
                <h5 className="fw-bold text-success mb-1">Authenticated Successfully!</h5>
                <p className="small text-muted mb-0">Switching to the {selectedRole} Dashboard preview...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginModal;

