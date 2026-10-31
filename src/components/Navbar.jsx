import React, { useState } from 'react';
import { Sun, Moon, Sparkles, Building2, UserCheck, ShieldCheck, GraduationCap, ChevronDown, CheckCircle2, UserPlus, LogIn } from 'lucide-react';

export function Navbar({ theme, toggleTheme, onOpenPilotModal, onOpenLoginModal, onOpenRegisterModal }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg sticky-top glass-panel py-1 py-lg-1.5 border-bottom">
      <div className="container-fluid px-3 px-xl-5">
        {/* Brand Logo & Version Tag */}
        <a className="navbar-brand d-flex align-items-center gap-2 text-decoration-none me-3 py-0" href="#">
          <div className="rounded-2 p-1.5 d-flex align-items-center justify-content-center shadow-sm" style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)' }}>
            <Sparkles size={17} className="text-white" />
          </div>
          <div className="d-flex align-items-center">
            <span className="fw-bolder fs-5 tracking-tight" style={{ letterSpacing: '-0.4px' }}>
              Nexus<span className="text-primary">Flow</span>
            </span>
          </div>
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2 py-0.5 ms-2 d-none d-sm-inline-flex align-items-center gap-1 font-mono" style={{ fontSize: '0.68rem' }}>
            <span className="pulsing-dot" style={{ width: '5px', height: '5px' }}></span>
            v1.0 Enterprise
          </span>
        </a>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0 shadow-none py-1 px-2"
          type="button"
          onClick={() => setNavOpen(!navOpen)}
          aria-controls="nexusflowNav"
          aria-expanded={navOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ width: '1.25em', height: '1.25em' }}></span>
        </button>

        {/* Nav Links & Actions */}
        <div className={`collapse navbar-collapse ${navOpen ? 'show' : ''}`} id="nexusflowNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fw-medium" style={{ fontSize: '0.88rem' }}>
            <li className="nav-item">
              <a className="nav-link px-2.5 py-1" href="#platform" onClick={() => setNavOpen(false)}>
                Platform
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-2.5 py-1" href="#modules" onClick={() => setNavOpen(false)}>
                Modules
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-2.5 py-1" href="#dashboards" onClick={() => setNavOpen(false)}>
                Dashboards
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-2.5 py-1" href="#roi-calculator" onClick={() => setNavOpen(false)}>
                ROI Calculator
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-2.5 py-1" href="#case-studies" onClick={() => setNavOpen(false)}>
                Case Studies
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-2.5 py-1" href="#architecture" onClick={() => setNavOpen(false)}>
                Architecture
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2 flex-wrap mt-2 mt-lg-0 ms-lg-auto">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="btn btn-outline-enterprise p-1 d-flex align-items-center justify-content-center rounded-circle"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
              style={{ width: '34px', height: '34px' }}
            >
              {theme === 'dark' ? (
                <Sun size={16} className="text-warning" />
              ) : (
                <Moon size={16} className="text-secondary" />
              )}
            </button>

            {/* Login Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-outline-enterprise py-1 px-2.5 d-flex align-items-center gap-1.5"
                type="button"
                id="loginDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ fontSize: '0.84rem' }}
              >
                <LogIn size={14} className="text-primary" />
                <span>Login</span>
                <ChevronDown size={12} className="opacity-70" />
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-lg border card-enterprise p-2" aria-labelledby="loginDropdown" style={{ minWidth: '230px' }}>
                <li>
                  <h6 className="dropdown-header small text-uppercase fw-bold text-muted font-mono" style={{ fontSize: '0.68rem' }}>SELECT PORTAL</h6>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-2 py-1.5 d-flex align-items-center gap-2"
                    onClick={() => { onOpenLoginModal('Teacher'); setNavOpen(false); }}
                  >
                    <UserCheck size={15} className="text-primary" />
                    <div>
                      <div className="fw-semibold small">Teacher Portal</div>
                      <small className="text-muted" style={{ fontSize: '0.7rem' }}>Attendance & proxy requests</small>
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-2 py-1.5 d-flex align-items-center gap-2"
                    onClick={() => { onOpenLoginModal('Student'); setNavOpen(false); }}
                  >
                    <GraduationCap size={15} className="text-success" />
                    <div>
                      <div className="fw-semibold small">Student Portal</div>
                      <small className="text-muted" style={{ fontSize: '0.7rem' }}>Schedule & room changes</small>
                    </div>
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider my-1" />
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-2 py-1.5 d-flex align-items-center gap-2"
                    onClick={() => { onOpenLoginModal('Admin'); setNavOpen(false); }}
                  >
                    <ShieldCheck size={15} className="text-purple" />
                    <div>
                      <div className="fw-semibold small">Institutional Admin</div>
                      <small className="text-muted" style={{ fontSize: '0.7rem' }}>ERP, HOD & Registrar</small>
                    </div>
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider my-1" />
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-2 py-1.5 d-flex align-items-center gap-2 text-primary fw-semibold"
                    onClick={() => { onOpenRegisterModal('Institution'); setNavOpen(false); }}
                  >
                    <UserPlus size={15} className="text-primary" />
                    <div>
                      <div className="small">New Institution? Register</div>
                      <small className="text-muted" style={{ fontSize: '0.7rem' }}>Onboard campus node</small>
                    </div>
                  </button>
                </li>
              </ul>
            </div>

            {/* Register CTA Button */}
            <button
              onClick={() => { onOpenRegisterModal('Institution'); setNavOpen(false); }}
              className="btn btn-outline-enterprise py-1 px-2.5 d-flex align-items-center gap-1.5"
              style={{ fontSize: '0.84rem' }}
            >
              <UserPlus size={14} className="text-primary" />
              <span>Register</span>
            </button>

            {/* Primary Pilot CTA */}
            <button
              onClick={() => { onOpenPilotModal(); setNavOpen(false); }}
              className="btn btn-primary-enterprise py-1.5 px-3 d-flex align-items-center gap-1.5"
              style={{ fontSize: '0.84rem' }}
            >
              <Building2 size={15} />
              <span>Schedule Pilot</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
