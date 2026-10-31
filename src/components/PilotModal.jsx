import React, { useState } from 'react';
import { X, Building2, CheckCircle2, Send, Sparkles, ShieldCheck } from 'lucide-react';

export function PilotModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    institution: '',
    officerName: '',
    designation: 'Registrar / Dean Academics',
    email: '',
    phone: '',
    studentCount: '5,000 - 15,000 Students',
    modules: {
      timetable: true,
      proxy: true,
      attendance: true,
      space: true
    }
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
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(2, 6, 18, 0.8)', backdropFilter: 'blur(12px)', zIndex: 1055 }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content card-enterprise p-2 border-glow-cyan shadow-2xl">
          {/* Header */}
          <div className="modal-header border-bottom pb-3" style={{ borderColor: 'var(--nf-border)' }}>
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 rounded-3 text-white" style={{ background: 'linear-gradient(135deg, #0284c7, #2563eb)', boxShadow: '0 0 14px rgba(56, 189, 248, 0.4)' }}>
                <Building2 size={20} />
              </div>
              <div>
                <h5 className="modal-title fw-bold mb-0">Schedule an Institutional Pilot</h5>
                <span className="small text-cyan font-mono" style={{ fontSize: '0.72rem' }}>
                  OSFIC PS-040 Priority Deployment Track
                </span>
              </div>
            </div>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4">
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <p className="text-muted small mb-4">
                  Experience a zero-cost, 60-day parallel deployment of NexusFlow on your campus. Our deployment engineers will configure your department constraints and room inventories in under 72 hours.
                </p>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">University / College Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. State Technical University"
                      className="form-control"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Officer / Dean Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Prof. Niranjan Mohapatra"
                      className="form-control"
                      value={formData.officerName}
                      onChange={(e) => setFormData({ ...formData, officerName: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Designation</label>
                    <select
                      className="form-select"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    >
                      <option value="Registrar / Dean Academics">Registrar / Dean Academics</option>
                      <option value="Principal / Director">Principal / Director</option>
                      <option value="Head of Department (HOD)">Head of Department (HOD)</option>
                      <option value="Timetable Committee Convenor">Timetable Committee Convenor</option>
                      <option value="IT / ERP Systems Administrator">IT / ERP Systems Administrator</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Official Academic Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="dean.academics@univ.ac.in"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Contact Phone Number *</label>
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
                </div>

                {/* Modules to include */}
                <div className="mt-4 pt-3 border-top" style={{ borderColor: 'var(--nf-border)' }}>
                  <label className="form-label small fw-semibold text-cyan font-mono mb-2">MODULES FOR ON-SITE PILOT:</label>
                  <div className="row g-2">
                    <div className="col-sm-6">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" defaultChecked id="mod1" />
                        <label className="form-check-label small" htmlFor="mod1">
                          Smart Timetable Generator
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" defaultChecked id="mod2" />
                        <label className="form-check-label small" htmlFor="mod2">
                          Disruption-Aware Rescheduling & Proxy
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" defaultChecked id="mod3" />
                        <label className="form-check-label small" htmlFor="mod3">
                          Real-Time Digital Attendance Sync
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" defaultChecked id="mod4" />
                        <label className="form-check-label small" htmlFor="mod4">
                          Room & Laboratory Capacity Optimizer
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top" style={{ borderColor: 'var(--nf-border)' }}>
                  <button type="button" className="btn btn-outline-enterprise" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary-enterprise d-flex align-items-center gap-2 glow-blue">
                    <Send size={16} />
                    <span>Submit Institutional Request</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="rounded-circle bg-success text-white p-3 d-inline-flex mb-3 shadow" style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}>
                  <CheckCircle2 size={40} />
                </div>
                <h4 className="fw-bold mb-2">Pilot Request Confirmed!</h4>
                <p className="text-muted small mx-auto mb-4" style={{ maxWidth: '480px' }}>
                  Thank you, <strong>{formData.officerName || 'Administrator'}</strong>. Your institutional deployment brief for <strong>{formData.institution || 'your university'}</strong> has been registered with priority track <strong className="text-cyan">#OSFIC-2026-PILOT-{Math.floor(1000 + Math.random() * 9000)}</strong>.
                </p>
                <div className="p-3 rounded-3 mb-4 mx-auto text-start" style={{ maxWidth: '480px', background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                  <div className="small fw-semibold text-cyan mb-1">What happens next:</div>
                  <ul className="small text-muted mb-0 ps-3">
                    <li>Our Institutional Deployment Team will contact you within 24 hours.</li>
                    <li>We will provision a sandbox tenant for your academic department heads.</li>
                    <li>You will receive the complete OSFIC PS-040 compliance dossier.</li>
                  </ul>
                </div>
                <button className="btn btn-primary-enterprise px-4 glow-blue" onClick={handleReset}>
                  Done & Return to Landing Page
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default PilotModal;
