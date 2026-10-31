import React, { useState } from 'react';
import { ArrowRight, Play, ShieldAlert, CheckCircle, Zap, RefreshCw, Cpu, Award } from 'lucide-react';

export function HeroSection({ onOpenPilotModal, onScrollToDemo }) {
  const [resolved, setResolved] = useState(false);
  const [resolving, setResolving] = useState(false);

  const handleResolve = () => {
    setResolving(true);
    setTimeout(() => {
      setResolving(false);
      setResolved(true);
    }, 800);
  };

  const handleReset = () => {
    setResolved(false);
  };

  return (
    <section className="position-relative hero-glow-bg pt-5 pb-5 overflow-hidden">
      <div className="container pt-4 pb-2">
        <div className="row align-items-center g-5">
          {/* Left Column: 1Cr Hook Copy & CTAs */}
          <div className="col-lg-7">
            {/* Eyebrow Tag */}
            <div className="mb-4">
              <span className="badge-osfic">
                <span className="badge bg-primary text-white rounded-pill px-2 py-0" style={{ fontSize: '0.7rem' }}>
                  GOV. INITIATIVE
                </span>
                <span className="fw-semibold">OSFIC PS-040 Approved | Academic Resource & Timetable Intelligence</span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="display-4 fw-extrabold mb-3 tracking-tight" style={{ fontWeight: 800, lineHeight: 1.15 }}>
              Stop Managing Timetable Chaos.{' '}
              <span className="text-gradient-primary d-block mt-2">
                Start Automating Academic Flow.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="lead text-muted mb-4 fs-5" style={{ lineHeight: 1.6, maxWidth: '640px' }}>
              The centralized ERP platform that eliminates schedule collisions, automates faculty substitutions in real-time, and maximizes campus resource utilization across 40+ academic departments.
            </p>

            {/* Primary Action Buttons */}
            <div className="d-flex flex-wrap gap-3 align-items-center mb-5">
              <button
                onClick={onOpenPilotModal}
                className="btn btn-primary-enterprise d-flex align-items-center gap-2 px-4 py-3 fs-6"
              >
                <span>Deploy at Your Institution</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onScrollToDemo}
                className="btn btn-outline-enterprise d-flex align-items-center gap-2 px-4 py-3 fs-6"
              >
                <Play size={18} className="text-primary fill-primary" />
                <span>Explore Interactive Demo</span>
              </button>
            </div>

            {/* Trust Stats Mini Row */}
            <div className="row g-3 pt-3 border-top" style={{ borderColor: 'var(--nf-border)' }}>
              <div className="col-sm-4">
                <div className="d-flex align-items-center gap-2">
                  <div className="text-primary fw-bolder fs-3 font-mono">0%</div>
                  <div className="small text-muted lh-sm">Hard-Constraint Clashes</div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="d-flex align-items-center gap-2">
                  <div className="text-primary fw-bolder fs-3 font-mono">&lt; 90s</div>
                  <div className="small text-muted lh-sm">Faculty Proxy Dispatch</div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="d-flex align-items-center gap-2">
                  <div className="text-primary fw-bolder fs-3 font-mono">42%</div>
                  <div className="small text-muted lh-sm">Lab Capacity Boost</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Constraint Simulator */}
          <div className="col-lg-5">
            <div className="card-enterprise p-4 shadow-lg position-relative border" style={{ borderColor: 'var(--nf-border)' }}>
              {/* Card Header */}
              <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom" style={{ borderColor: 'var(--nf-border)' }}>
                <div className="d-flex align-items-center gap-2">
                  <div className="p-1 rounded-2 bg-primary bg-opacity-10">
                    <Cpu size={18} className="text-primary" />
                  </div>
                  <div>
                    <span className="fw-bold small text-uppercase tracking-wider font-mono">Live Constraint Engine</span>
                    <span className="badge bg-primary-subtle text-primary rounded-pill ms-2 font-mono" style={{ fontSize: '0.65rem' }}>v1.0</span>
                  </div>
                </div>
                <span className={`badge ${resolved ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-danger-subtle text-danger border border-danger-subtle'} rounded-pill px-3 py-1 font-mono`}>
                  {resolved ? '100% Conflict Free' : '1 Collision Detected'}
                </span>
              </div>

              {/* Simulation Matrix Box */}
              <div className="p-3 rounded-3 mb-3" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                <div className="d-flex justify-content-between text-muted small mb-2 font-mono">
                  <span>TIMETABLE SLOT: MON 10:00 - 11:00 AM</span>
                  <span className="text-primary fw-semibold">ROOM: LAB 302</span>
                </div>

                {!resolved ? (
                  <div className="p-3 rounded-3 bg-danger bg-opacity-10 border border-danger border-opacity-30 mb-2">
                    <div className="d-flex align-items-start gap-2">
                      <ShieldAlert size={20} className="text-danger flex-shrink-0 mt-1" />
                      <div>
                        <div className="fw-bold text-danger">Hard Conflict: Double Room Booking</div>
                        <div className="small text-muted mt-1">
                          <strong>Batch CS-A</strong> (Prof. P. Dash - Operating Systems) clashes with <strong>Batch EC-B</strong> (Dr. S. Tripathy - Digital Signal Proc.).
                        </div>
                        <div className="badge bg-danger text-white mt-2 font-mono" style={{ fontSize: '0.7rem' }}>
                          Room Capacity Exceeded (142/60 seats)
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-3 bg-success bg-opacity-10 border border-success border-opacity-30 mb-2">
                    <div className="d-flex align-items-start gap-2">
                      <CheckCircle size={20} className="text-success flex-shrink-0 mt-1" />
                      <div>
                        <div className="fw-bold text-success">Autonomous Re-Route Completed</div>
                        <div className="small text-muted mt-1">
                          Batch CS-A preserved in Lab 302. Batch EC-B dynamically re-allocated to available Seminar Hall B with equipment compatibility verified.
                        </div>
                        <div className="badge bg-success text-white mt-2 font-mono" style={{ fontSize: '0.7rem' }}>
                          Capacity Match: 100% • 0 Conflicts
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-slots overview */}
                <div className="row g-2 mt-2 pt-2 border-top" style={{ borderColor: 'var(--nf-border)' }}>
                  <div className="col-6">
                    <div className="schedule-cell cell-active">
                      <div className="fw-semibold small">CS-301: OS Lab</div>
                      <div className="text-muted" style={{ fontSize: '0.7rem' }}>Lab 302 • 58 Students</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className={`schedule-cell ${resolved ? 'cell-success' : 'cell-warning'}`}>
                      <div className="fw-semibold small">{resolved ? 'EC-202: DSP Lab' : 'Clash: EC-202'}</div>
                      <div className="text-muted" style={{ fontSize: '0.7rem' }}>{resolved ? 'Seminar B (Auto-Assigned)' : 'Conflict: Lab 302'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Simulation Trigger */}
              <div className="d-flex gap-2">
                {!resolved ? (
                  <button
                    onClick={handleResolve}
                    disabled={resolving}
                    className="btn btn-primary-enterprise w-100 d-flex align-items-center justify-content-center gap-2 py-2"
                  >
                    {resolving ? (
                      <>
                        <RefreshCw size={16} className="spinner-border spinner-border-sm" />
                        <span>Evaluating CSP Constraints...</span>
                      </>
                    ) : (
                      <>
                        <Zap size={16} />
                        <span>Test Autonomous Conflict Resolver</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    className="btn btn-outline-enterprise w-100 d-flex align-items-center justify-content-center gap-2 py-2 small"
                  >
                    <RefreshCw size={14} />
                    <span>Reset Simulation</span>
                  </button>
                )}
              </div>

              <div className="text-center mt-3">
                <span className="text-muted font-mono" style={{ fontSize: '0.72rem' }}>
                  Powered by NexusFlow Multi-Constraint Genetic & CSP Solvers
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Strip Below Hero */}
        <div className="mt-5 pt-4 text-center border-top" style={{ borderColor: 'var(--nf-border)' }}>
          <p className="text-muted small fw-semibold text-uppercase tracking-wider mb-3 font-mono" style={{ fontSize: '0.78rem' }}>
            Trusted by 100+ Institutions • Zero Hard-Constraint Violations Guaranteed
          </p>
          <div className="d-flex flex-wrap align-items-center justify-content-center gap-4 gap-md-5 opacity-80">
            <span className="fw-bold font-mono text-muted d-flex align-items-center gap-2">
              <Award size={18} className="text-primary" /> 100+ HIGHER ED CAMPUSES
            </span>
            <span className="fw-bold font-mono text-muted d-flex align-items-center gap-2">
              <Award size={18} className="text-primary" /> STATE TECHNICAL UNIVERSITIES
            </span>
            <span className="fw-bold font-mono text-muted d-flex align-items-center gap-2">
              <Award size={18} className="text-primary" /> AUTONOMOUS COLLEGES
            </span>
            <span className="fw-bold font-mono text-muted d-flex align-items-center gap-2">
              <Award size={18} className="text-primary" /> POLYTECHNIC & STEM INSTITUTES
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
export default HeroSection;
