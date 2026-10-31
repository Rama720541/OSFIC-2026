import React from 'react';
import {
  UserCheck, GraduationCap, ShieldCheck,
  Monitor, ArrowRight, Lock, Sparkles
} from 'lucide-react';

const PORTALS = [
  {
    id: 'teacher',
    label: 'Teacher Portal',
    sublabel: 'Faculty',
    desc: 'Mark attendance, fire proxy requests, track your live class countdown.',
    icon: UserCheck,
    gradient: 'linear-gradient(135deg, #1d4ed8, #2563eb)',
    glow: 'rgba(37, 99, 235, 0.25)',
    accent: '#2563eb',
    lightBg: '#eff6ff',
    lightBorder: '#bfdbfe'
  },
  {
    id: 'student',
    label: 'Student Portal',
    sublabel: 'Academics',
    desc: 'Live schedule timeline, attendance health gauge & room beacon alerts.',
    icon: GraduationCap,
    gradient: 'linear-gradient(135deg, #059669, #10b981)',
    glow: 'rgba(16, 185, 129, 0.25)',
    accent: '#10b981',
    lightBg: '#f0fdf4',
    lightBorder: '#bbf7d0'
  },
  {
    id: 'admin',
    label: 'Admin Portal',
    sublabel: 'Registrar',
    desc: 'Campus-wide scheduling control, substitution logs & NAAC compliance.',
    icon: ShieldCheck,
    gradient: 'linear-gradient(135deg, #6d28d9, #7c3aed)',
    glow: 'rgba(124, 58, 237, 0.25)',
    accent: '#7c3aed',
    lightBg: '#f5f3ff',
    lightBorder: '#ddd6fe'
  }
];

/**
 * MockDashboardCTA
 * Rendered below the "Schedule Demo" button inside InteractiveDashboardSwitcher.
 * Shows three portal cards; clicking opens DashboardSelectorModal OR directly
 * scrolls & activates that specific tab (via onSelectRole).
 */
export function MockDashboardCTA({ onOpenSelectorModal }) {
  return (
    <div className="mt-4 pt-4 border-top" style={{ borderColor: 'var(--nf-border)' }}>
      {/* Header */}
      <div className="text-center mb-4">
        <div className="d-inline-flex align-items-center gap-2 badge-osfic mb-3" style={{ fontSize: '0.75rem' }}>
          <Monitor size={14} className="text-primary" />
          <span className="font-mono text-uppercase fw-bold">Mock Dashboard Access</span>
          <span className="badge bg-primary text-white rounded-pill font-mono ms-1" style={{ fontSize: '0.62rem' }}>SANDBOX</span>
        </div>
        <h5 className="fw-bold mb-1">Explore Every Portal — No Login Required</h5>
        <p className="text-muted small mb-0" style={{ maxWidth: '520px', margin: '0 auto' }}>
          Click a role below to instantly jump to its interactive demo. All data is simulated in a secure sandbox environment.
        </p>
      </div>

      {/* Portal Cards Row */}
      <div className="row g-3 justify-content-center">
        {PORTALS.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.id} className="col-md-4">
              <button
                type="button"
                className="w-100 text-start border-0 bg-transparent p-0 portal-mock-card-btn"
                onClick={() => onOpenSelectorModal(p.id)}
                aria-label={`Open ${p.label} mock dashboard`}
              >
                <div className="p-4 rounded-4 h-100 d-flex flex-column portal-mock-card">
                  {/* Icon + badge row */}
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: '48px',
                        height: '48px',
                        background: p.gradient,
                        boxShadow: `0 6px 16px ${p.glow}`
                      }}
                    >
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="fw-bold">{p.label}</div>
                      <span className="badge rounded-pill px-2 font-mono" style={{
                        background: p.lightBg,
                        color: p.accent,
                        border: `1px solid ${p.lightBorder}`,
                        fontSize: '0.65rem'
                      }}>
                        {p.sublabel}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="small text-muted mb-3 flex-grow-1" style={{ fontSize: '0.82rem', lineHeight: 1.55 }}>
                    {p.desc}
                  </p>

                  {/* CTA */}
                  <div
                    className="d-flex align-items-center justify-content-between pt-3 border-top portal-mock-cta"
                    style={{ borderColor: p.lightBorder }}
                  >
                    <span className="small fw-semibold" style={{ color: p.accent }}>
                      Launch Mock Dashboard
                    </span>
                    <ArrowRight size={16} style={{ color: p.accent }} />
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Security assurance */}
      <div className="text-center mt-3">
        <span className="d-inline-flex align-items-center gap-1 text-muted font-mono" style={{ fontSize: '0.72rem' }}>
          <Lock size={12} />
          Sandbox mode — no credentials required · no real data accessed
        </span>
      </div>
    </div>
  );
}

export default MockDashboardCTA;
