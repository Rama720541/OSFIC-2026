import React, { useState } from 'react';
import { Calendar, RefreshCw, QrCode, Sliders, CheckCircle2, ArrowRight, Layers, Sparkles, Building2, BellRing, BarChart3 } from 'lucide-react';

export function CoreModulesShowcase({ onOpenPilotModal }) {
  const [activeModule, setActiveModule] = useState(0);

  const modules = [
    {
      id: "smart-generator",
      title: "Smart Timetable Generator",
      tagline: "Runs hard and soft constraint algorithms to generate conflict-free semester schedules in minutes.",
      icon: <Calendar className="text-primary" size={28} />,
      kpi: "< 4 Min Run Time",
      features: [
        "Simultaneous multi-objective CSP (Constraint Satisfaction Problem) optimization",
        "Enforces UGC maximum workload rules & NEP 2020 multi-disciplinary baskets",
        "Auto-handles shared resources: Central Audits, Physics/Chemistry labs & Sports grounds",
        "Configurable faculty preferred time slots and departmental break policies"
      ],
      previewStats: [
        { label: "Constraint Rules Processed", val: "48+" },
        { label: "Schedule Clashes", val: "0" },
        { label: "Faculty Satisfaction", val: "94%" }
      ],
      badge: "ALGORITHMIC CORE"
    },
    {
      id: "disruption-rescheduling",
      title: "Disruption-Aware Rescheduling",
      tagline: "Automatically re-evaluates affected classes when a room goes offline or a teacher takes leave.",
      icon: <RefreshCw className="text-warning" size={28} />,
      kpi: "< 90s Substitution",
      features: [
        "Real-time event listener for sudden faculty sick leaves and room maintenance flags",
        "Domain-expertise matching algorithm suggests optimal proxy teachers instantly",
        "Automated WhatsApp & push alert dispatch to teacher and enrolled students",
        "Zero cascade delay—neighboring classes and lab timings remain unaffected"
      ],
      previewStats: [
        { label: "Avg. Resolution Time", val: "1.4 min" },
        { label: "Syllabus Drift Prevented", val: "100%" },
        { label: "Unnotified Cancellations", val: "0%" }
      ],
      badge: "REAL-TIME AGENT"
    },
    {
      id: "attendance-sync",
      title: "Real-Time Attendance Sync",
      tagline: "Binds digital attendance logs directly to active class slots and updates student metrics instantly.",
      icon: <QrCode className="text-success" size={28} />,
      kpi: "Instant Sync",
      features: [
        "One-tap geo-fenced QR or biometric token validation for in-session students",
        "Dynamic 75% attendance health warning system alerts students before debarment",
        "Direct API integration with university examination ERP for hall ticket generation",
        "Tamper-proof digital course diary logging actual teaching hours and topics covered"
      ],
      previewStats: [
        { label: "Manual Roll-call Saved", val: "12 min/hr" },
        { label: "Attendance Audit Ready", val: "Instant" },
        { label: "Proxy Attendance Rate", val: "0.2%" }
      ],
      badge: "ERP INTEGRATION"
    },
    {
      id: "room-optimizer",
      title: "Room & Lab Optimizer",
      tagline: "Prevents underutilization by matching section headcounts with exact facility capacities.",
      icon: <Sliders className="text-info" size={28} />,
      kpi: "+42% Yield Boost",
      features: [
        "Headcount-to-capacity matrix matching ensures small electives don't block large lecture halls",
        "Specialized hardware tags (GPU workstation, chemical fume hoods, CAD labs) allocation",
        "Predictive HVAC & lighting schedule cuts institutional energy bills by 24%",
        "Interactive campus floor-plan heatmaps for Registrars and Estate Officers"
      ],
      previewStats: [
        { label: "Space Utilization", val: "+42%" },
        { label: "Energy Bill Savings", val: "₹18.4L/yr" },
        { label: "Dormant Capacity", val: "< 5%" }
      ],
      badge: "CAMPUS INFRASTRUCTURE"
    }
  ];

  return (
    <section id="modules" className="py-5" style={{ background: 'transparent' }}>
      <div className="container py-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 fw-bold text-uppercase" style={{ fontSize: '0.75rem' }}>
            Enterprise Architecture
          </span>
          <h2 className="display-6 fw-bold mt-3 mb-2">
            Engineered for <span className="text-gradient-primary">Campus-Scale Precision</span>
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '640px' }}>
            Four purpose-built intelligence engines operating harmoniously to eliminate schedule friction and resource waste.
          </p>
        </div>

        {/* 4 B2B Feature Cards Grid */}
        <div className="row g-4">
          {modules.map((mod, idx) => (
            <div key={mod.id} className="col-md-6 col-lg-3">
              <div
                className={`card-enterprise p-4 h-100 d-flex flex-column justify-content-between position-relative ${activeModule === idx ? 'border-primary' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveModule(idx)}
              >
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="p-3 rounded-3" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                      {mod.icon}
                    </div>
                    <span className="badge bg-secondary-subtle text-secondary font-mono" style={{ fontSize: '0.68rem' }}>
                      {mod.badge}
                    </span>
                  </div>

                  <h3 className="h5 fw-bold mb-2">{mod.title}</h3>
                  <p className="small text-muted mb-3" style={{ minHeight: '60px' }}>
                    {mod.tagline}
                  </p>

                  <div className="p-2 rounded-2 mb-3 d-flex justify-content-between align-items-center" style={{ background: 'var(--nf-bg-surface)' }}>
                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>Benchmark KPI:</span>
                    <span className="fw-bold text-primary font-mono" style={{ fontSize: '0.85rem' }}>{mod.kpi}</span>
                  </div>

                  <ul className="list-unstyled mb-0">
                    {mod.features.slice(0, 2).map((feat, fIdx) => (
                      <li key={fIdx} className="d-flex align-items-start gap-2 mb-2 text-muted" style={{ fontSize: '0.8rem' }}>
                        <CheckCircle2 size={14} className="text-primary flex-shrink-0 mt-1" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 mt-3 border-top" style={{ borderColor: 'var(--nf-border)' }}>
                  <button
                    className={`btn w-100 btn-sm py-2 d-flex align-items-center justify-content-center gap-1 ${activeModule === idx ? 'btn-primary' : 'btn-outline-enterprise'}`}
                  >
                    <span>{activeModule === idx ? 'Active Architecture View' : 'Explore Deep Dive'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Module Interactive Deep Dive Panel */}
        <div className="mt-5 p-4 p-md-5 rounded-4 card-enterprise border-primary border-opacity-30 position-relative">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge bg-primary text-white font-mono px-3 py-1">
                  MODULE {activeModule + 1} DEEP DIVE
                </span>
                <span className="text-muted small">• Integrated with OSFIC PS-040 Spec</span>
              </div>
              <h3 className="display-6 fw-bold mb-3">{modules[activeModule].title}</h3>
              <p className="lead text-muted fs-6 mb-4">{modules[activeModule].tagline}</p>

              <div className="row g-3 mb-4">
                {modules[activeModule].features.map((feat, idx) => (
                  <div key={idx} className="col-md-6">
                    <div className="p-3 rounded-3 h-100" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                      <div className="d-flex align-items-start gap-2">
                        <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-1" />
                        <span className="small">{feat}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={onOpenPilotModal} className="btn btn-primary-enterprise d-inline-flex align-items-center gap-2">
                <span>Deploy {modules[activeModule].title} on Campus</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="col-lg-5">
              <div className="p-4 rounded-4 shadow-sm" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="fw-bold small font-mono text-primary">LIVE SIMULATED METRICS</span>
                  <span className="pulsing-dot"></span>
                </div>

                <div className="d-flex flex-column gap-3">
                  {modules[activeModule].previewStats.map((stat, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-3 d-flex justify-content-between align-items-center" style={{ background: 'var(--nf-bg-card)', border: '1px solid var(--nf-border)' }}>
                      <span className="small text-muted">{stat.label}</span>
                      <span className="fw-bolder fs-5 text-primary font-mono">{stat.val}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 p-3 rounded-3" style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px dashed var(--nf-border-bright)' }}>
                  <div className="small text-muted">
                    <strong>Enterprise Sandbox Note:</strong> This module runs natively inside existing college databases without requiring overhaul of existing legacy student ERPs.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default CoreModulesShowcase;

