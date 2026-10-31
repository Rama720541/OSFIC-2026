import React from 'react';
import { XCircle, CheckCircle2, MessageSquareWarning, ArrowRight, ShieldCheck, Clock, Users, Database, Cpu } from 'lucide-react';

export function ProblemSolutionGrid({ onOpenPilotModal }) {
  const problems = [
    {
      title: "Departmental Silos & Invisible Clashes",
      desc: "Computer Science, Electrical, and Mechanical departments book shared central auditoriums and GPU labs independently on paper or spreadsheets, leading to chaotic Monday morning collisions.",
      metric: "Over 40+ clashes per semester in average colleges"
    },
    {
      title: "Endless WhatsApp & Phone Coordination",
      desc: "When a professor is sick, HODs spend 45+ frantic minutes calling faculty on WhatsApp, frequently assigning teachers who don't know the syllabus or who already have classes.",
      metric: "75% of proxy assignments are sub-optimal"
    },
    {
      title: "Manual Section & Lab Overlap Checks",
      desc: "Committees spend 3 sleepless weeks cross-checking student roll numbers, section divisions, elective batches, and lab bench capacities by hand.",
      metric: "200+ wasted faculty work-hours annually"
    },
    {
      title: "Disoriented Students & Wasted Assets",
      desc: "Students arrive at locked lecture halls with zero prior notice. Meanwhile, ₹2 Cr worth of advanced IoT & robotics lab equipment sits locked and underutilized 40% of the week.",
      metric: "38% campus space inefficiency"
    }
  ];

  const solutions = [
    {
      title: "Centralized Autonomous Constraint Engine",
      desc: "NexusFlow runs integer programming and CSP solvers across all campus buildings and departments simultaneously, guaranteeing zero double-bookings before schedules are ever published.",
      metric: "0% Hard-Constraint Collisions Guaranteed"
    },
    {
      title: "One-Tap AI Faculty Substitution",
      desc: "Smart algorithmic matching ranks available faculty based on syllabus domain expertise, teaching load limits, and building proximity, confirming proxies in < 90 seconds.",
      metric: "100% Transparent substitution tracking"
    },
    {
      title: "Instant Algorithmic Verification in Minutes",
      desc: "Handles elective course permutations, NEP 2020 multi-disciplinary baskets, and lab equipment prerequisites seamlessly with mathematical validation.",
      metric: "85% Reduction in coordination hours"
    },
    {
      title: "Real-Time Student Beacons & Maximum Utilization",
      desc: "Instant mobile push notifications and live campus signage alert students to room modifications immediately, while capacity-matching boosts laboratory yield by 42%.",
      metric: "+42% Lab & lecture hall yield"
    }
  ];

  return (
    <section id="case-studies" className="py-5">
      <div className="container py-4">
        {/* Header */}
        <div className="text-center mb-5">
          <span className="badge-osfic text-uppercase font-mono mb-2" style={{ fontSize: '0.72rem' }}>
            <Cpu size={14} className="text-cyan" />
            The Institutional Paradigm Shift
          </span>
          <h2 className="display-6 fw-bold mt-2 mb-2">
            The Old Way vs. <span className="text-gradient-primary">The NexusFlow Way</span>
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '640px' }}>
            Transforming administrative friction into a competitive advantage for forward-thinking universities.
          </p>
        </div>

        {/* Side-by-Side Comparison Container */}
        <div className="row g-4 align-items-stretch">
          {/* The Old Way Column */}
          <div className="col-lg-6">
            <div className="h-100 p-4 p-md-5 rounded-4 card-enterprise position-relative border-danger border-opacity-30" style={{ background: 'rgba(239, 68, 68, 0.03)' }}>
              <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom border-danger border-opacity-25">
                <div className="d-flex align-items-center gap-2">
                  <div className="p-2 rounded-3 bg-danger bg-opacity-10 text-danger">
                    <XCircle size={22} />
                  </div>
                  <div>
                    <h4 className="fw-bold mb-0 text-danger">The Old Way</h4>
                    <span className="small text-muted font-mono" style={{ fontSize: '0.75rem' }}>Manual, Paper-Driven & Fragmented</span>
                  </div>
                </div>
                <span className="badge bg-danger text-white rounded-pill px-3 py-1 font-mono" style={{ fontSize: '0.7rem' }}>STATUS QUO</span>
              </div>

              <div className="d-flex flex-column gap-3">
                {problems.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-3" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                    <div className="d-flex align-items-start gap-3">
                      <div className="text-danger flex-shrink-0 mt-1">
                        <XCircle size={18} />
                      </div>
                      <div>
                        <h5 className="fs-6 fw-bold mb-1">{item.title}</h5>
                        <p className="small text-muted mb-2">{item.desc}</p>
                        <span className="badge bg-danger-subtle text-danger font-mono" style={{ fontSize: '0.7rem' }}>
                          Impact: {item.metric}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* The NexusFlow Way Column (Fully Optimized for both Dark and Light Mode) */}
          <div className="col-lg-6">
            <div className="h-100 p-4 p-md-5 rounded-4 card-enterprise position-relative nexusflow-way-card shadow-2xl">
              <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom" style={{ borderColor: 'var(--nf-border-bright)' }}>
                <div className="d-flex align-items-center gap-2">
                  <div className="p-2 rounded-3 solution-item-icon" style={{ background: 'rgba(56, 189, 248, 0.15)' }}>
                    <CheckCircle2 size={22} />
                  </div>
                  <div>
                    <h4 className="fw-bold mb-0 nexusflow-way-title">The NexusFlow Way</h4>
                    <span className="small text-muted font-mono" style={{ fontSize: '0.75rem' }}>Automated Intelligence & Real-Time Sync</span>
                  </div>
                </div>
                <span className="badge rounded-pill px-3 py-1 font-mono" style={{ background: 'linear-gradient(135deg, #0284c7, #2563eb)', color: '#fff', fontSize: '0.7rem' }}>ENTERPRISE ERP</span>
              </div>

              <div className="d-flex flex-column gap-3">
                {solutions.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-3 solution-item-card">
                    <div className="d-flex align-items-start gap-3">
                      <div className="solution-item-icon flex-shrink-0 mt-1">
                        <CheckCircle2 size={18} />
                      </div>
                      <div>
                        <h5 className="fs-6 fw-bold mb-1 solution-item-title">{item.title}</h5>
                        <p className="small text-muted mb-2">{item.desc}</p>
                        <span className="badge bg-success bg-opacity-15 text-success border border-success border-opacity-30 font-mono" style={{ fontSize: '0.7rem' }}>
                          Guarantee: {item.metric}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="mt-5 p-4 rounded-4 card-enterprise border-glow-cyan text-center d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 shadow-lg">
          <div className="text-md-start">
            <h5 className="fw-bold mb-1">Ready to bring zero-collision scheduling to your campus?</h5>
            <p className="small text-muted mb-0">Join the OSFIC 2026 pilot program for higher education institutions.</p>
          </div>
          <button onClick={onOpenPilotModal} className="btn btn-primary-enterprise d-flex align-items-center gap-2 flex-shrink-0 glow-blue">
            <span>Schedule Institutional Onboarding</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
export default ProblemSolutionGrid;
