import React, { useState } from 'react';
import {
  UserCheck, GraduationCap, ShieldCheck, X, ArrowRight,
  Sparkles, Lock, Monitor, Building2, ChevronRight
} from 'lucide-react';

const PORTALS = [
  {
    id: 'teacher',
    label: 'Teacher Portal',
    sublabel: 'Faculty Dashboard',
    description: 'Mark attendance, request proxy, manage your daily teaching timeline and class disruptions.',
    icon: UserCheck,
    gradient: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
    shadow: 'rgba(37, 99, 235, 0.35)',
    accent: '#2563eb',
    accentLight: '#eff6ff',
    accentBorder: '#bfdbfe',
    badgeClass: 'bg-primary-subtle text-primary border border-primary-subtle',
    features: ['Quick Attendance Marker', 'AI Proxy Request Engine', 'Live Class Countdown']
  },
  {
    id: 'student',
    label: 'Student Portal',
    sublabel: 'Academic Dashboard',
    description: 'View your daily schedule timeline, live attendance health gauge, and instant room change alerts.',
    icon: GraduationCap,
    gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    shadow: 'rgba(16, 185, 129, 0.35)',
    accent: '#10b981',
    accentLight: '#f0fdf4',
    accentBorder: '#bbf7d0',
    badgeClass: 'bg-success-subtle text-success border border-success-subtle',
    features: ['Personalized Schedule Timeline', 'Attendance Health Simulator', 'Room Beacon Alerts']
  },
  {
    id: 'admin',
    label: 'Admin Portal',
    sublabel: 'Institutional Command',
    description: 'Monitor campus-wide scheduling, review faculty substitutions, and access audit compliance reports.',
    icon: ShieldCheck,
    gradient: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)',
    shadow: 'rgba(109, 40, 217, 0.35)',
    accent: '#7c3aed',
    accentLight: '#f5f3ff',
    accentBorder: '#ddd6fe',
    badgeClass: 'bg-primary-subtle text-primary border border-primary-subtle',
    features: ['Campus Timetable Control', 'Substitution Audit Logs', 'NAAC Compliance Reports']
  }
];

export function DashboardSelectorModal({ isOpen, onClose, onSelectRole }) {
  const [hovered, setHovered] = useState(null);

  if (!isOpen) return null;

  const handleSelect = (portalId) => {
    onSelectRole(portalId);
    onClose();
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      aria-label="Select Dashboard Portal"
      style={{
        backgroundColor: 'rgba(2, 6, 18, 0.75)',
        backdropFilter: 'blur(14px)',
        zIndex: 1060
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div
          className="modal-content card-enterprise p-2 shadow-2xl"
          style={{ border: '1px solid var(--nf-border-bright)' }}
        >
          {/* Header */}
          <div
            className="modal-header border-bottom pb-3"
            style={{ borderColor: 'var(--nf-border)' }}
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="p-2 rounded-3 text-white d-flex align-items-center justify-content-center"
                style={{
                  background: 'linear-gradient(135deg, #1d4ed8, #7c3aed)',
                  boxShadow: '0 0 18px rgba(99, 102, 241, 0.4)'
                }}
              >
                <Monitor size={22} />
              </div>
              <div>
                <h5 className="modal-title fw-bold mb-0">Mock Dashboard Access</h5>
                <span className="small text-muted font-mono" style={{ fontSize: '0.72rem' }}>
                  SELECT PORTAL TO EXPLORE LIVE DEMO
                </span>
              </div>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4">
            <p className="text-muted small text-center mb-4">
              Choose a role portal to instantly navigate to its interactive demo.
              All data is simulated — no login required.
            </p>

            <div className="row g-3">
              {PORTALS.map((portal) => {
                const Icon = portal.icon;
                const isHov = hovered === portal.id;
                return (
                  <div key={portal.id} className="col-md-4">
                    <button
                      type="button"
                      className="w-100 text-start border-0 bg-transparent p-0"
                      onMouseEnter={() => setHovered(portal.id)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => handleSelect(portal.id)}
                      aria-label={`Open ${portal.label} mock dashboard`}
                    >
                      <div
                        className="p-4 rounded-4 h-100 d-flex flex-column"
                        style={{
                          background: isHov
                            ? `linear-gradient(180deg, ${portal.accentLight} 0%, #ffffff 100%)`
                            : 'var(--nf-bg-surface)',
                          border: `1.5px solid ${isHov ? portal.accent : 'var(--nf-border)'}`,
                          boxShadow: isHov ? `0 12px 28px -4px ${portal.shadow}` : 'none',
                          transition: 'all 0.2s ease',
                          transform: isHov ? 'translateY(-4px)' : 'none',
                          cursor: 'pointer'
                        }}
                      >
                        {/* Icon */}
                        <div
                          className="rounded-3 p-3 mb-3 d-flex align-items-center justify-content-center shadow-sm"
                          style={{
                            background: portal.gradient,
                            boxShadow: `0 6px 16px ${portal.shadow}`,
                            width: '56px',
                            height: '56px'
                          }}
                        >
                          <Icon size={26} className="text-white" />
                        </div>

                        {/* Labels */}
                        <div className="mb-2">
                          <div className="fw-bold mb-0">{portal.label}</div>
                          <small className={`badge rounded-pill px-2 py-0.5 font-mono ${portal.badgeClass}`}
                            style={{ fontSize: '0.66rem' }}>
                            {portal.sublabel}
                          </small>
                        </div>

                        {/* Description */}
                        <p className="small text-muted mb-3" style={{ fontSize: '0.82rem', lineHeight: 1.5 }}>
                          {portal.description}
                        </p>

                        {/* Features list */}
                        <ul className="list-unstyled mb-0 mt-auto">
                          {portal.features.map((f, i) => (
                            <li key={i} className="d-flex align-items-center gap-2 small text-muted mb-1">
                              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: portal.accent, flexShrink: 0, display: 'inline-block' }}></span>
                              {f}
                            </li>
                          ))}
                        </ul>

                        {/* CTA row */}
                        <div
                          className="mt-3 pt-3 d-flex align-items-center justify-content-between border-top"
                          style={{ borderColor: isHov ? portal.accentBorder : 'var(--nf-border)' }}
                        >
                          <span
                            className="small fw-semibold"
                            style={{ color: isHov ? portal.accent : 'var(--nf-text-muted)' }}
                          >
                            Enter Dashboard
                          </span>
                          <ArrowRight
                            size={16}
                            style={{ color: isHov ? portal.accent : 'var(--nf-text-muted)', transition: 'transform 0.2s', transform: isHov ? 'translateX(4px)' : 'none' }}
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Security notice */}
            <div
              className="mt-4 p-3 rounded-3 d-flex align-items-center gap-2"
              style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}
            >
              <Lock size={14} className="text-muted flex-shrink-0" />
              <span className="small text-muted font-mono" style={{ fontSize: '0.72rem' }}>
                SANDBOX MODE — All data is mock/simulated. No credentials required. No real institution data accessed.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSelectorModal;
