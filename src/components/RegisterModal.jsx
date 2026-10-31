import React, { useState } from 'react';
import { Building2, UserCheck, GraduationCap, Lock, Mail, Phone, CheckCircle2, UserPlus, ArrowRight, ShieldCheck, Sparkles, School } from 'lucide-react';

export function RegisterModal({ isOpen, initialRole = 'Institution', onClose, onSwitchToLogin }) {
  const [selectedRole, setSelectedRole] = useState(initialRole); // 'Institution' | 'Teacher' | 'Student'
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    institutionName: '',
    department: 'Computer Science & Engineering',
    email: '',
    phone: '',
    idNumber: '',
    password: '',
    confirmPassword: '',
    studentCount: '5,000 - 15,000 Students'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(2, 6, 18, 0.82)', backdropFilter: 'blur(14px)', zIndex: 1055 }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content card-enterprise p-2 border-glow-cyan shadow-2xl">
          {/* Header */}
          <div className="modal-header border-bottom pb-3" style={{ borderColor: 'var(--nf-border)' }}>
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 rounded-3 text-white" style={{ background: 'linear-gradient(135deg, #0284c7, #2563eb)', boxShadow: '0 0 14px rgba(56, 189, 248, 0.4)' }}>
                <UserPlus size={20} />
              </div>
              <div>
                <h5 className="modal-title fw-bold mb-0">Create NexusFlow Account</h5>
                <span className="small text-cyan font-mono" style={{ fontSize: '0.72rem' }}>
                  Institutional Onboarding & Single Sign-On
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
                onClick={() => setSelectedRole('Institution')}
                className={`btn btn-sm flex-grow-1 rounded-2 fw-semibold d-flex align-items-center justify-content-center gap-1 ${
                  selectedRole === 'Institution' ? 'btn-primary-enterprise glow-blue' : 'btn-link text-muted text-decoration-none'
                }`}
              >
                <School size={15} className={selectedRole === 'Institution' ? 'text-white' : 'text-cyan'} />
                <span>Register College/Uni</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('Teacher')}
                className={`btn btn-sm flex-grow-1 rounded-2 fw-semibold d-flex align-items-center justify-content-center gap-1 ${
                  selectedRole === 'Teacher' ? 'btn-primary-enterprise glow-blue' : 'btn-link text-muted text-decoration-none'
                }`}
              >
                <UserCheck size={15} className={selectedRole === 'Teacher' ? 'text-white' : 'text-cyan'} />
                <span>Faculty Sign Up</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('Student')}
                className={`btn btn-sm flex-grow-1 rounded-2 fw-semibold d-flex align-items-center justify-content-center gap-1 ${
                  selectedRole === 'Student' ? 'btn-primary-enterprise glow-blue' : 'btn-link text-muted text-decoration-none'
                }`}
              >
                <GraduationCap size={15} className={selectedRole === 'Student' ? 'text-white' : 'text-cyan'} />
                <span>Student Sign Up</span>
              </button>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Institution-specific fields */}
                  {selectedRole === 'Institution' && (
                    <>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">University / College Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. State Institute of Technology"
                          className="form-control"
                          value={formData.institutionName}
                          onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Registrar / Vice Chancellor / Dean Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dr. A. K. Mohanty"
                          className="form-control"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Official University Email (.ac.in / .edu) *</label>
                        <input
                          type="email"
                          required
                          placeholder="registrar@univ.ac.in"
                          className="form-control"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Official Phone Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          className="form-control"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Campus Student Enrollment</label>
                        <select
                          className="form-select"
                          value={formData.studentCount}
                          onChange={(e) => setFormData({ ...formData, studentCount: e.target.value })}
                        >
                          <option value="1,000 - 5,000 Students">1,000 - 5,000 Students</option>
                          <option value="5,000 - 15,000 Students">5,000 - 15,000 Students</option>
                          <option value="15,000 - 30,000+ Students">15,000 - 30,000+ Students</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Campus ERP System in Use</label>
                        <select className="form-select" defaultValue="none">
                          <option value="none">Manual / Spreadsheets & Paper</option>
                          <option value="legacy">Legacy In-House Database</option>
                          <option value="commercial">Third-Party Commercial ERP</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* Teacher-specific fields */}
                  {selectedRole === 'Teacher' && (
                    <>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Full Name with Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="Prof. Rajeshwar Senapati"
                          className="form-control"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">College / University Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. VSSUT / OUTR / Engineering College"
                          className="form-control"
                          value={formData.institutionName}
                          onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Department *</label>
                        <select
                          className="form-select"
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        >
                          <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                          <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
                          <option value="Electrical Engineering">Electrical Engineering</option>
                          <option value="Mechanical Engineering">Mechanical Engineering</option>
                          <option value="Civil Engineering">Civil Engineering</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Faculty ID Number *</label>
                        <input
                          type="text"
                          required
                          placeholder="CSE-4089"
                          className="form-control font-mono"
                          value={formData.idNumber}
                          onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Institutional Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="faculty.name@college.ac.in"
                          className="form-control"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Phone (for WhatsApp Proxy alerts) *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          className="form-control"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </>
                  )}

                  {/* Student-specific fields */}
                  {selectedRole === 'Student' && (
                    <>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Student Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="Subham Sourav Panda"
                          className="form-control"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Institution Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. State Engineering College"
                          className="form-control"
                          value={formData.institutionName}
                          onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Roll / Registration Number *</label>
                        <input
                          type="text"
                          required
                          placeholder="2201090124"
                          className="form-control font-mono"
                          value={formData.idNumber}
                          onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Current Semester</label>
                        <select className="form-select" defaultValue="5">
                          <option value="1">Semester 1 (1st Year)</option>
                          <option value="3">Semester 3 (2nd Year)</option>
                          <option value="5">Semester 5 (3rd Year)</option>
                          <option value="7">Semester 7 (4th Year)</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Student Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="student.22@univ.ac.in"
                          className="form-control"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Mobile Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          className="form-control"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </>
                  )}

                  {/* Password fields */}
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Create Password *</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      className="form-control"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Confirm Password *</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      className="form-control"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-check mt-3">
                  <input className="form-check-input" type="checkbox" required defaultChecked id="agreeTerms" />
                  <label className="form-check-label small text-muted" htmlFor="agreeTerms">
                    I agree to the Institutional Data Policy and DPDP Act 2023 compliance protocols.
                  </label>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top" style={{ borderColor: 'var(--nf-border)' }}>
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="btn btn-link text-cyan text-decoration-none small p-0 fw-semibold"
                  >
                    Already have an account? Sign In
                  </button>

                  <div className="d-flex gap-2">
                    <button type="button" className="btn btn-outline-enterprise" onClick={onClose}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary-enterprise d-flex align-items-center gap-2 glow-blue">
                      <UserPlus size={16} />
                      <span>Complete Registration</span>
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="rounded-circle bg-success text-white p-3 d-inline-flex mb-3 shadow" style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}>
                  <CheckCircle2 size={40} />
                </div>
                <h4 className="fw-bold mb-2">Registration Completed!</h4>
                <p className="text-muted small mx-auto mb-4" style={{ maxWidth: '480px' }}>
                  Welcome to NexusFlow, <strong>{formData.name || 'User'}</strong>! Your <strong>{selectedRole}</strong> credentials have been registered with institutional token:
                </p>
                <div className="p-3 rounded-3 mb-4 mx-auto font-mono text-cyan" style={{ maxWidth: '380px', background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border-bright)' }}>
                  NX-REG-2026-{Math.floor(100000 + Math.random() * 900000)}
                </div>
                <div className="d-flex justify-content-center gap-3">
                  <button className="btn btn-primary-enterprise px-4 glow-blue" onClick={onSwitchToLogin}>
                    Proceed to SSO Sign In
                  </button>
                  <button className="btn btn-outline-enterprise px-4" onClick={handleReset}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default RegisterModal;

