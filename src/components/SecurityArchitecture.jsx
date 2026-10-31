import React from 'react';
import { ShieldCheck, Lock, Server, Key, EyeOff, Database, CheckCircle2, Cpu, HardDrive } from 'lucide-react';

export function SecurityArchitecture() {
  const trustItems = [
    {
      title: "Multi-Tenant Isolation",
      tagline: "Cryptographically isolated data stores for each institution",
      desc: "Every college operates within an isolated tenant workspace. Student records, exam rosters, and faculty leave archives are isolated via schema-level separation with AES-256 at-rest encryption.",
      icon: <Database className="text-primary" size={26} />,
      badge: "ISO / IEC 27001"
    },
    {
      title: "Role-Based Access Control (RBAC)",
      tagline: "Strict institutional permission boundaries",
      desc: "Granular access tiers for Vice Chancellors, Registrars, HODs, Course Instructors, and Students. No unauthorized modifications to master timetable drafts without administrative sign-off.",
      icon: <Key className="text-warning" size={26} />,
      badge: "ZERO-TRUST RBAC"
    },
    {
      title: "Immutable Audit Trails",
      tagline: "Cryptographic hash verification for accreditation",
      desc: "Every timetable tweak, emergency room swap, and substitution acceptance produces an immutable audit event with actor identity, timestamp, and previous state preserved for NAAC verification.",
      icon: <Lock className="text-success" size={26} />,
      badge: "AUDIT LOGGED"
    },
    {
      title: "99.98% High Availability SLA",
      tagline: "Resilient cloud clusters with multi-zone redundancy",
      desc: "Engineered to withstand registration day spikes when 20,000+ students access semester schedules simultaneously. Hosted on sovereign Indian data center infrastructure.",
      icon: <Server className="text-primary" size={26} />,
      badge: "MEITY COMPLIANT"
    }
  ];

  return (
    <section id="architecture" className="py-5">
      <div className="container py-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="badge-osfic text-uppercase font-mono mb-2" style={{ fontSize: '0.72rem' }}>
            <Cpu size={14} className="text-cyan" />
            Enterprise Trust & Resilience
          </span>
          <h2 className="display-6 fw-bold mt-2 mb-2">
            Bank-Grade Security for <span className="text-gradient-primary">University Data</span>
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '640px' }}>
            Built in alignment with India's Digital Personal Data Protection (DPDP) Act 2023 and UGC regulatory standards.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="row g-4 mb-5">
          {trustItems.map((item, idx) => (
            <div key={idx} className="col-md-6">
              <div className="p-4 p-md-5 rounded-4 card-enterprise h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="p-3 rounded-3" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                      {item.icon}
                    </div>
                    <span className="badge bg-secondary-subtle text-secondary font-mono" style={{ fontSize: '0.7rem' }}>
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="fw-bold mb-1">{item.title}</h4>
                  <div className="text-primary small fw-semibold mb-3 font-mono">{item.tagline}</div>
                  <p className="text-muted small mb-0" style={{ lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Architecture Snapshot */}
        <div className="p-4 rounded-4 card-enterprise" style={{ background: 'var(--nf-bg-surface)' }}>
          <div className="row align-items-center g-4">
            <div className="col-md-3 text-center text-md-start">
              <span className="fw-bold font-mono small text-primary">STACK HIGHLIGHTS</span>
              <h5 className="fw-bold mb-0 mt-1">Enterprise Architecture</h5>
            </div>
            <div className="col-md-9">
              <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
                <span className="badge bg-body-tertiary text-body border p-2 px-3 font-mono" style={{ borderColor: 'var(--nf-border)' }}>FastAPI / Python Constraint Solvers</span>
                <span className="badge bg-body-tertiary text-body border p-2 px-3 font-mono" style={{ borderColor: 'var(--nf-border)' }}>React 18 + WebSockets Mesh</span>
                <span className="badge bg-body-tertiary text-body border p-2 px-3 font-mono" style={{ borderColor: 'var(--nf-border)' }}>PostgreSQL with Row-Level Security (RLS)</span>
                <span className="badge bg-body-tertiary text-body border p-2 px-3 font-mono" style={{ borderColor: 'var(--nf-border)' }}>Redis Cache for Sub-10ms Queries</span>
                <span className="badge bg-body-tertiary text-body border p-2 px-3 font-mono" style={{ borderColor: 'var(--nf-border)' }}>Indian Cloud Sovereignty (AWS Mumbai / NIC)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default SecurityArchitecture;
