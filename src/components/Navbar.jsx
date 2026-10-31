import React, { useState } from 'react';
import { Sun, Moon, Sparkles, Building2, UserCheck, ShieldCheck, GraduationCap, ChevronDown, CheckCircle2, UserPlus, LogIn } from 'lucide-react';

export function Navbar({ theme, toggleTheme, onOpenPilotModal, onOpenLoginModal, onOpenRegisterModal }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg sticky-top glass-panel py-3 border-bottom">
      <div className="container">
        {/* Brand Logo & Version Tag */}
        <a className="navbar-brand d-flex align-items-center gap-2 text-decoration-none" href="#">
          <div className="rounded-3 p-2 d-flex align-items-center justify-content-center shadow-sm" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)', boxShadow: '0 0 16px rgba(56, 189, 248, 0.45)' }}>
            <Sparkles size={20} className="text-white" />
          </div>
          <div className="d-flex flex-column">
            <span className="fw-bolder fs-4 tracking-tight" style={{ letterSpacing: '-0.5px' }}>
              Nexus<span className="text-cyan">Flow</span>
            </span>
          </div>
          <span className="badge bg-primary bg-opacity-10 text-cyan border border-info border-opacity-30 rounded-pill px-2 py-1 ms-2 d-none d-sm-inline-flex align-items-center gap-1" style={{ fontSize: '0.72rem', boxShadow: '0 0 10px rgba(56, 189, 248, 0.15)' }}>
            <span className="pulsing-dot" style={{ width: '6px', height: '6px' }}></span>
            v1.0 Enterprise Ready
          </span>
        </a>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={() => setNavOpen(!navOpen)}
          aria-controls="nexusflowNav"
          aria-expanded={navOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links & Actions */}
        <div className={`collapse navbar-collapse ${navOpen ? 'show' : ''}`} id="nexusflowNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fw-medium">
            <li className="nav-item">
              <a className="nav-link px-3" href="#platform" onClick={() => setNavOpen(false)}>
                Platform
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3" href="#modules" onClick={() => setNavOpen(false)}>
                Modules
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3" href="#dashboards" onClick={() => setNavOpen(false)}>
                Dashboards
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3" href="#roi-calculator" onClick={() => setNavOpen(false)}>
                ROI Calculator
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3" href="#case-studies" onClick={() => setNavOpen(false)}>
                Case Studies
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3" href="#architecture" onClick={() => setNavOpen(false)}>
                Architecture
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2 flex-wrap mt-3 mt-lg-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="btn btn-outline-enterprise p-2 d-flex align-items-center justify-content-center rounded-circle"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
              style={{ width: '40px', height: '40px' }}
            >
              {theme === 'dark' ? (
                <Sun size={18} className="text-warning" />
              ) : (
                <Moon size={18} className="text-secondary" />
              )}
            </button>

            {/* Login Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-outline-enterprise dropdown-toggle d-flex align-items-center gap-2"
                type="button"
                id="loginDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <LogIn size={15} className="text-cyan" />
                <span>Login</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-lg border card-enterprise p-2" aria-labelledby="loginDropdown" style={{ minWidth: '230px' }}>
                <li>
                  <h6 className="dropdown-header small text-uppercase fw-bold text-muted font-mono" style={{ fontSize: '0.68rem' }}>SELECT PORTAL</h6>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2"
                    onClick={() => { onOpenLoginModal('Teacher'); setNavOpen(false); }}
                  >
                    <UserCheck size={16} className="text-cyan" />
                    <div>
                      <div className="fw-semibold">Teacher Portal</div>
                      <small className="text-muted">Attendance & proxy requests</small>
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2"
                    onClick={() => { onOpenLoginModal('Student'); setNavOpen(false); }}
                  >
                    <GraduationCap size={16} className="text-success" />
                    <div>
                      <div className="fw-semibold">Student Portal</div>
                      <small className="text-muted">Schedule & room changes</small>
                    </div>
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider my-1" />
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2"
                    onClick={() => { onOpenLoginModal('Admin'); setNavOpen(false); }}
                  >
                    <ShieldCheck size={16} className="text-purple" />
                    <div>
                      <div className="fw-semibold">Institutional Admin</div>
                      <small className="text-muted">ERP, HOD & Registrar</small>
                    </div>
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider my-1" />
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2 text-cyan fw-semibold"
                    onClick={() => { onOpenRegisterModal('Institution'); setNavOpen(false); }}
                  >
                    <UserPlus size={16} className="text-cyan" />
                    <div>
                      <div>New Institution? Register</div>
                      <small className="text-muted" style={{ fontSize: '0.7rem' }}>Onboard campus node</small>
                    </div>
                  </button>
                </li>
              </ul>
            </div>

            {/* Register CTA Button */}
            <button
              onClick={() => { onOpenRegisterModal('Institution'); setNavOpen(false); }}
              className="btn btn-outline-enterprise d-flex align-items-center gap-2"
            >
              <UserPlus size={16} className="text-cyan" />
              <span>Register</span>
            </button>

            {/* Primary Pilot CTA */}
            <button
              onClick={() => { onOpenPilotModal(); setNavOpen(false); }}
              className="btn btn-primary-enterprise d-flex align-items-center gap-2 glow-blue"
            >
              <Building2 size={16} />
              <span>Schedule Pilot</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
