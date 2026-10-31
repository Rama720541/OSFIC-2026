import React from 'react';
import { Sparkles, ArrowUpRight, ShieldCheck, Heart, Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';

export function Footer({ onOpenPilotModal, onOpenLoginModal }) {
  return (
    <footer className="pt-5 pb-4 border-top" style={{ borderColor: 'var(--nf-border)', background: 'var(--nf-bg-surface)' }}>
      <div className="container">
        {/* Main Footer Links Grid */}
        <div className="row g-4 mb-5">
          {/* Brand Info & 1Cr Tag */}
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="bg-primary text-white rounded-3 p-2 d-flex align-items-center justify-content-center shadow-sm">
                <Sparkles size={20} />
              </div>
              <span className="fw-bolder fs-4 tracking-tight">
                Nexus<span className="text-primary">Flow</span>
              </span>
            </div>

            <p className="text-muted small mb-3" style={{ lineHeight: 1.6, maxWidth: '340px' }}>
              The centralized ERP intelligence platform eliminating schedule collisions, automating faculty substitutions in real-time, and maximizing campus infrastructure yield.
            </p>

            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="pulsing-dot"></span>
              <span className="small text-muted font-mono" style={{ fontSize: '0.75rem' }}>
                Operational Status: All Systems 99.99% Normal
              </span>
            </div>

            <div className="d-flex gap-2">
              <a href="#platform" className="btn btn-outline-enterprise p-2 rounded-circle text-muted" aria-label="Github">
                <Github size={16} />
              </a>
              <a href="#platform" className="btn btn-outline-enterprise p-2 rounded-circle text-muted" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="#platform" className="btn btn-outline-enterprise p-2 rounded-circle text-muted" aria-label="Twitter">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links Column 1: Platform */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold text-uppercase small font-mono mb-3 text-muted">Platform</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><a href="#platform" className="text-muted text-decoration-none hover-primary">Smart Timetable Generator</a></li>
              <li><a href="#modules" className="text-muted text-decoration-none hover-primary">Disruption Engine</a></li>
              <li><a href="#modules" className="text-muted text-decoration-none hover-primary">Attendance Sync</a></li>
              <li><a href="#modules" className="text-muted text-decoration-none hover-primary">Space & Lab Optimizer</a></li>
              <li><a href="#roi-calculator" className="text-muted text-decoration-none hover-primary">Campus ROI Calculator</a></li>
            </ul>
          </div>

          {/* Quick Links Column 2: Portals */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold text-uppercase small font-mono mb-3 text-muted">Institutional Access</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <button onClick={() => onOpenLoginModal('Teacher')} className="btn btn-link p-0 text-muted text-decoration-none small text-start">
                  Teacher Portal Login
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLoginModal('Student')} className="btn btn-link p-0 text-muted text-decoration-none small text-start">
                  Student Portal Login
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLoginModal('Admin')} className="btn btn-link p-0 text-muted text-decoration-none small text-start">
                  Institutional Admin & HOD
                </button>
              </li>
              <li>
                <button onClick={onOpenPilotModal} className="btn btn-link p-0 text-primary text-decoration-none small text-start fw-semibold">
                  Schedule Institutional Pilot
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 3: Resources & Docs */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold text-uppercase small font-mono mb-3 text-muted">Documentation</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><a href="#architecture" className="text-muted text-decoration-none hover-primary">Technical Whitepaper</a></li>
              <li><a href="#architecture" className="text-muted text-decoration-none hover-primary">REST & WebSockets API</a></li>
              <li><a href="#architecture" className="text-muted text-decoration-none hover-primary">Security & DPDP Compliance</a></li>
              <li><a href="#architecture" className="text-muted text-decoration-none hover-primary">NEP 2020 Guidelines</a></li>
              <li><a href="#case-studies" className="text-muted text-decoration-none hover-primary">Engineering Case Studies</a></li>
            </ul>
          </div>

          {/* Column 4: Gov Initiative Callout */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold text-uppercase small font-mono mb-3 text-muted">Mandate</h6>
            <div className="p-3 rounded-3" style={{ background: 'var(--nf-bg-card)', border: '1px solid var(--nf-border)' }}>
              <span className="badge bg-primary text-white font-mono mb-1" style={{ fontSize: '0.65rem' }}>OSFIC 2026</span>
              <p className="small text-muted mb-2" style={{ fontSize: '0.75rem' }}>
                Problem Statement PS-040: Academic Scheduling & Resource Optimization.
              </p>
              <button onClick={onOpenPilotModal} className="btn btn-sm btn-outline-primary w-100 font-mono" style={{ fontSize: '0.7rem' }}>
                Review Proposal
              </button>
            </div>
          </div>
        </div>

        {/* Prominent Government Alignment Note & Legal Strip */}
        <div className="pt-4 border-top" style={{ borderColor: 'var(--nf-border)' }}>
          <div className="p-3 rounded-3 mb-3 text-center" style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid var(--nf-border-bright)' }}>
            <p className="small text-muted mb-0">
              <strong className="text-primary">Government Alignment Note:</strong> Developed for <strong>OSFIC 2026 Challenge (PS-040: Academic Scheduling & Resource Optimization)</strong>. Engineered for university registrars, departmental chairpersons, and academic deans across higher education campuses in India.
            </p>
          </div>

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 text-muted small" style={{ fontSize: '0.78rem' }}>
            <div>
              &copy; {new Date().getFullYear()} NexusFlow Technologies Pvt. Ltd. All rights reserved.
            </div>
            <div className="d-flex gap-3">
              <a href="#architecture" className="text-muted text-decoration-none hover-primary">Privacy Policy</a>
              <span>•</span>
              <a href="#architecture" className="text-muted text-decoration-none hover-primary">Terms of Enterprise Pilot</a>
              <span>•</span>
              <a href="#architecture" className="text-muted text-decoration-none hover-primary">Data Security Protocol</a>
              <span>•</span>
              <a href="#architecture" className="text-muted text-decoration-none hover-primary">SLA Agreement</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;

