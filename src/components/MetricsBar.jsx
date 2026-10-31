import React from 'react';
import { Target, Zap, Shield, FileCheck, Award, ArrowUpRight, CheckCircle, Cpu } from 'lucide-react';

export function MetricsBar({ onOpenPilotModal }) {
  const metrics = [
    {
      value: "0%",
      label: "Hard-Constraint Collision Rate",
      description: "Zero overlapping schedules across professors, student batches, and laboratory venues.",
      icon: <Target className="text-primary" size={24} />
    },
    {
      value: "85%",
      label: "Reduction in Coordination Hours",
      description: "Cuts weeks of frantic scheduling committee debates down to mere automated minutes.",
      icon: <Zap className="text-warning" size={24} />
    },
    {
      value: "100%",
      label: "Transparent Faculty Substitutions",
      description: "Every emergency leave and proxy assignment is logged with domain matching & audit trails.",
      icon: <Shield className="text-success" size={24} />
    },
    {
      value: "Instant",
      label: "Real-Time Institutional Audit Logs",
      description: "One-click generation of NAAC, NBA & NIRF compliant course execution diaries.",
      icon: <FileCheck className="text-primary" size={24} />
    }
  ];

  return (
    <section className="py-5 border-top border-bottom" style={{ borderColor: 'var(--nf-border)', background: 'var(--nf-bg-surface)' }}>
      <div className="container py-3">
        {/* Metric Cards Grid */}
        <div className="row g-4 mb-5">
          {metrics.map((m, idx) => (
            <div key={idx} className="col-sm-6 col-lg-3">
              <div className="p-4 rounded-4 card-enterprise h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="p-2 rounded-3" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                      {m.icon}
                    </div>
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle font-mono" style={{ fontSize: '0.65rem' }}>
                      AUDITED
                    </span>
                  </div>
                  <div className="display-5 fw-extrabold text-gradient-primary font-mono mb-2">
                    {m.value}
                  </div>
                  <h6 className="fw-bold mb-2">{m.label}</h6>
                </div>
                <p className="text-muted small mb-0" style={{ fontSize: '0.8rem' }}>
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 1 Crore Fund Deployment Note */}
        <div className="p-4 rounded-4 card-enterprise mandate-card shadow-xl position-relative">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge font-mono px-3 py-1" style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)', color: '#fff', fontSize: '0.72rem' }}>
                  ₹1 CRORE VENTURE MANDATE
                </span>
                <span className="text-muted small font-mono">• OSFIC 2026 Academic Innovation Fund</span>
              </div>
              <h4 className="fw-bold mb-2">Built to Scale Across 120+ Higher Education Campuses</h4>
              <p className="text-muted small mb-0" style={{ maxWidth: '680px' }}>
                The ₹1 Crore institutional capital injection funds statewide rollout across technical universities, multi-lingual faculty voice-agents, and high-performance GPU-accelerated CSP scheduling clusters.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <button onClick={onOpenPilotModal} className="btn btn-primary-enterprise d-inline-flex align-items-center gap-2 glow-blue">
                <span>View Venture Pitch Deck</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default MetricsBar;
