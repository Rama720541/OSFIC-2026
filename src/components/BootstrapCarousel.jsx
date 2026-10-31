import React from 'react';
import { Calendar, Cpu, Users, Building, ShieldCheck, ArrowRight, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';

export function BootstrapCarousel({ onOpenPilotModal }) {
  return (
    <section id="platform" className="py-5" style={{ background: 'transparent' }}>
      <div className="container py-3">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 fw-bold text-uppercase" style={{ fontSize: '0.75rem' }}>
            Flagship Capabilities
          </span>
          <h2 className="display-6 fw-bold mt-3 mb-2">
            Why NexusFlow is the <span className="text-gradient-primary">Gold Standard</span> for Campus ERP
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '680px' }}>
            Engineered specifically to fulfill the OSFIC 2026 mandate: transforming fragmented university scheduling into an autonomous, zero-friction operating system.
          </p>
        </div>

        {/* Authentic Bootstrap 5 Carousel */}
        <div
          id="nexusflowEnterpriseCarousel"
          className="carousel slide carousel-fade carousel-enterprise"
          data-bs-ride="carousel"
          data-bs-interval="6000"
        >
          {/* Indicators */}
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#nexusflowEnterpriseCarousel"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1: Smart Timetable Engine"
            ></button>
            <button
              type="button"
              data-bs-target="#nexusflowEnterpriseCarousel"
              data-bs-slide-to="1"
              aria-label="Slide 2: Disruption-Aware Rescheduling"
            ></button>
            <button
              type="button"
              data-bs-target="#nexusflowEnterpriseCarousel"
              data-bs-slide-to="2"
              aria-label="Slide 3: Infrastructure Optimization"
            ></button>
            <button
              type="button"
              data-bs-target="#nexusflowEnterpriseCarousel"
              data-bs-slide-to="3"
              aria-label="Slide 4: Institutional Governance"
            ></button>
          </div>

          {/* Slides */}
          <div className="carousel-inner">
            {/* Slide 1 */}
            <div className="carousel-item active p-4 p-md-5">
              <div className="row align-items-center g-4">
                <div className="col-lg-6">
                  <span className="badge bg-primary text-white rounded-pill px-3 py-1 font-mono mb-3">
                    01 // CSP & GENETIC SOLVER
                  </span>
                  <h3 className="display-6 fw-bold mb-3">
                    Conflict-Free Semester Schedules in <span className="text-primary">Under 4 Minutes</span>
                  </h3>
                  <p className="text-muted mb-4 fs-6">
                    Eliminate 400+ person-hours of manual spreadsheet battles every semester. NexusFlow enforces 25+ simultaneous constraints—faculty availability, room capacities, lab prerequisites, and NEP 2020 elective clusters—generating mathematically bulletproof timetables.
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li className="d-flex align-items-center gap-2 mb-2 text-muted small">
                      <CheckCircle2 size={16} className="text-primary" />
                      <span>Zero professor double-booking across multi-department courses</span>
                    </li>
                    <li className="d-flex align-items-center gap-2 mb-2 text-muted small">
                      <CheckCircle2 size={16} className="text-primary" />
                      <span>Optimized student break intervals and lab batch partitioning</span>
                    </li>
                    <li className="d-flex align-items-center gap-2 text-muted small">
                      <CheckCircle2 size={16} className="text-primary" />
                      <span>One-click export to PDF, Google Calendar, and Student Portals</span>
                    </li>
                  </ul>
                  <button onClick={onOpenPilotModal} className="btn btn-primary-enterprise d-inline-flex align-items-center gap-2">
                    <span>Request Technical Whitepaper</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
                <div className="col-lg-6">
                  <div className="p-4 rounded-4 shadow-sm border" style={{ background: 'var(--nf-bg-surface)', borderColor: 'var(--nf-border)' }}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="fw-bold small font-mono text-primary">BENCHMARK COMPARISON</span>
                      <span className="badge bg-success-subtle text-success">98.4% Efficiency Gain</span>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between small text-muted mb-1">
                        <span>Legacy Manual Scheduling</span>
                        <span>180 - 240 Hours / Semester</span>
                      </div>
                      <div className="progress" style={{ height: '8px' }}>
                        <div className="progress-bar bg-danger" role="progressbar" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="d-flex justify-content-between small text-muted mb-1">
                        <span>NexusFlow Autonomous Engine</span>
                        <span className="fw-bold text-success">&lt; 4 Minutes (0 Collisions)</span>
                      </div>
                      <div className="progress" style={{ height: '8px' }}>
                        <div className="progress-bar bg-success" role="progressbar" style={{ width: '8%' }}></div>
                      </div>
                    </div>
                    <div className="p-3 rounded-3" style={{ background: 'var(--nf-bg-card)', border: '1px solid var(--nf-border)' }}>
                      <div className="d-flex align-items-center gap-3">
                        <Zap size={24} className="text-warning flex-shrink-0" />
                        <div className="small">
                          <strong>Tested at Scale:</strong> Successfully resolved 1,450 weekly slots for 14,000 engineering students in 218 seconds.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="carousel-item p-4 p-md-5">
              <div className="row align-items-center g-4">
                <div className="col-lg-6">
                  <span className="badge bg-warning text-dark rounded-pill px-3 py-1 font-mono mb-3">
                    02 // DISRUPTION INTELLIGENCE
                  </span>
                  <h3 className="display-6 fw-bold mb-3">
                    Instant Faculty Substitutions <span className="text-warning">Without WhatsApp Chaos</span>
                  </h3>
                  <p className="text-muted mb-4 fs-6">
                    When an emergency strikes or a faculty member calls in sick at 8:00 AM, NexusFlow re-evaluates the timetable instantly. It identifies qualified, non-conflicting proxy professors and dispatches instant notifications in &lt; 90 seconds.
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li className="d-flex align-items-center gap-2 mb-2 text-muted small">
                      <CheckCircle2 size={16} className="text-warning" />
                      <span>Domain-competence matching for syllabus preservation</span>
                    </li>
                    <li className="d-flex align-items-center gap-2 mb-2 text-muted small">
                      <CheckCircle2 size={16} className="text-warning" />
                      <span>One-tap WhatsApp & SMS proxy confirmation for teachers</span>
                    </li>
                    <li className="d-flex align-items-center gap-2 text-muted small">
                      <CheckCircle2 size={16} className="text-warning" />
                      <span>Automated student timetable updates with real-time room beacons</span>
                    </li>
                  </ul>
                  <button onClick={onOpenPilotModal} className="btn btn-primary-enterprise d-inline-flex align-items-center gap-2">
                    <span>See Substitution Demo</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
                <div className="col-lg-6">
                  <div className="p-4 rounded-4 shadow-sm border" style={{ background: 'var(--nf-bg-surface)', borderColor: 'var(--nf-border)' }}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="fw-bold small font-mono text-warning">REAL-TIME DISPATCH AGENT</span>
                      <span className="badge bg-warning-subtle text-warning font-mono">STATUS: ACTIVE</span>
                    </div>
                    <div className="p-3 rounded-3 mb-3 border border-warning border-opacity-25 bg-warning bg-opacity-10">
                      <div className="small fw-bold text-warning mb-1">🚨 Sudden Faculty Leave Logged:</div>
                      <div className="small text-muted">
                        Prof. R. Mohanty (CS Dept) • Microprocessors • Today 11:30 AM (Room 201)
                      </div>
                    </div>
                    <div className="p-3 rounded-3 mb-3" style={{ background: 'var(--nf-bg-card)', border: '1px solid var(--nf-border)' }}>
                      <div className="small fw-bold mb-2">NexusFlow AI Proxy Recommendations:</div>
                      <div className="d-flex justify-content-between align-items-center py-1 border-bottom" style={{ borderColor: 'var(--nf-border)' }}>
                        <div>
                          <div className="fw-semibold small">Dr. Ananya Ray</div>
                          <div className="text-muted" style={{ fontSize: '0.7rem' }}>Free Slot • Embedded Systems Specialist</div>
                        </div>
                        <span className="badge bg-success text-white">99% Match (Auto-Selected)</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center py-1 mt-1">
                        <div>
                          <div className="fw-semibold small">Prof. S. Patnaik</div>
                          <div className="text-muted" style={{ fontSize: '0.7rem' }}>Free Slot • VLSI Specialist</div>
                        </div>
                        <span className="badge bg-secondary">Backup Proxy</span>
                      </div>
                    </div>
                    <div className="text-success small d-flex align-items-center gap-2">
                      <CheckCircle2 size={16} />
                      <span>Confirmation sent to 68 students and Dr. Ray via SMS/App</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="carousel-item p-4 p-md-5">
              <div className="row align-items-center g-4">
                <div className="col-lg-6">
                  <span className="badge bg-info text-dark rounded-pill px-3 py-1 font-mono mb-3">
                    03 // SPACE UTILIZATION
                  </span>
                  <h3 className="display-6 fw-bold mb-3">
                    Boost Campus Infrastructure Yield <span className="text-info">by 42%</span>
                  </h3>
                  <p className="text-muted mb-4 fs-6">
                    Stop letting 40-student elective batches consume 180-seat tiered lecture theaters. NexusFlow matches class sizes, lab equipment requirements, and building proximities to prevent wasted electricity and space bottlenecks.
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li className="d-flex align-items-center gap-2 mb-2 text-muted small">
                      <CheckCircle2 size={16} className="text-info" />
                      <span>Dynamic classroom capacity vs headcount balancing</span>
                    </li>
                    <li className="d-flex align-items-center gap-2 mb-2 text-muted small">
                      <CheckCircle2 size={16} className="text-info" />
                      <span>Specialized lab gear inventory allocation (IoT, GPU cluster, Robotics)</span>
                    </li>
                    <li className="d-flex align-items-center gap-2 text-muted small">
                      <CheckCircle2 size={16} className="text-info" />
                      <span>Direct savings of ₹18L - ₹60L in unnecessary campus expansions</span>
                    </li>
                  </ul>
                  <button onClick={onOpenPilotModal} className="btn btn-primary-enterprise d-inline-flex align-items-center gap-2">
                    <span>Calculate Your Space Savings</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
                <div className="col-lg-6">
                  <div className="p-4 rounded-4 shadow-sm border" style={{ background: 'var(--nf-bg-surface)', borderColor: 'var(--nf-border)' }}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="fw-bold small font-mono text-info">FACILITY EFFICIENCY HEATMAP</span>
                      <span className="badge bg-info-subtle text-info">+42% Reclaimed Space</span>
                    </div>
                    <div className="row g-2 mb-3">
                      <div className="col-4">
                        <div className="p-2 rounded text-center" style={{ background: 'var(--nf-bg-card)', border: '1px solid var(--nf-border)' }}>
                          <div className="small text-muted">Lecture Halls</div>
                          <div className="fw-bold fs-5 text-success">91%</div>
                          <div className="text-muted" style={{ fontSize: '0.65rem' }}>Active Usage</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="p-2 rounded text-center" style={{ background: 'var(--nf-bg-card)', border: '1px solid var(--nf-border)' }}>
                          <div className="small text-muted">AI & GPU Labs</div>
                          <div className="fw-bold fs-5 text-info">96%</div>
                          <div className="text-muted" style={{ fontSize: '0.65rem' }}>Full Capacity</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="p-2 rounded text-center" style={{ background: 'var(--nf-bg-card)', border: '1px solid var(--nf-border)' }}>
                          <div className="small text-muted">Seminar Rooms</div>
                          <div className="fw-bold fs-5 text-primary">88%</div>
                          <div className="text-muted" style={{ fontSize: '0.65rem' }}>Optimized</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 rounded-3" style={{ background: 'var(--nf-bg-card)', border: '1px solid var(--nf-border)' }}>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <span className="small fw-semibold">Electricity & HVAC Idling Reduction</span>
                        <span className="small text-success fw-bold">-26% Power Waste</span>
                      </div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                        Rooms scheduled in localized campus clusters to minimize lighting and AC runtime during off-peak hours.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 4 */}
            <div className="carousel-item p-4 p-md-5">
              <div className="row align-items-center g-4">
                <div className="col-lg-6">
                  <span className="badge bg-purple text-white rounded-pill px-3 py-1 font-mono mb-3" style={{ background: '#8b5cf6' }}>
                    04 // AUDIT & COMPLIANCE
                  </span>
                  <h3 className="display-6 fw-bold mb-3">
                    Institutional Governance <span style={{ color: '#8b5cf6' }}>Audit-Ready in Real-Time</span>
                  </h3>
                  <p className="text-muted mb-4 fs-6">
                    Eliminate compliance panic during NAAC, NBA, and UGC peer committee visits. NexusFlow archives immutable logs of every lecture slot conducted, proxy assignment approved, and student attendance logged.
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li className="d-flex align-items-center gap-2 mb-2 text-muted small">
                      <CheckCircle2 size={16} style={{ color: '#8b5cf6' }} />
                      <span>Tamper-proof digital logbook meeting NIRF & NAAC criteria</span>
                    </li>
                    <li className="d-flex align-items-center gap-2 mb-2 text-muted small">
                      <CheckCircle2 size={16} style={{ color: '#8b5cf6' }} />
                      <span>Direct sync with UGC credit framework & NEP 2020 guidelines</span>
                    </li>
                    <li className="d-flex align-items-center gap-2 text-muted small">
                      <CheckCircle2 size={16} style={{ color: '#8b5cf6' }} />
                      <span>Automated 75% attendance warning triggers for semester admit cards</span>
                    </li>
                  </ul>
                  <button onClick={onOpenPilotModal} className="btn btn-primary-enterprise d-inline-flex align-items-center gap-2">
                    <span>Schedule Executive Briefing</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
                <div className="col-lg-6">
                  <div className="p-4 rounded-4 shadow-sm border" style={{ background: 'var(--nf-bg-surface)', borderColor: 'var(--nf-border)' }}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="fw-bold small font-mono" style={{ color: '#8b5cf6' }}>NAAC / NIRF AUDIT REPORT</span>
                      <span className="badge bg-success text-white">100% VERIFIED</span>
                    </div>
                    <div className="p-3 rounded-3 mb-2" style={{ background: 'var(--nf-bg-card)', border: '1px solid var(--nf-border)' }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="small fw-semibold">Course Coverage Compliance</span>
                        <span className="small text-success fw-bold">99.2% on Track</span>
                      </div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>14,200 Scheduled lectures audited against syllabus targets</div>
                    </div>
                    <div className="p-3 rounded-3 mb-2" style={{ background: 'var(--nf-bg-card)', border: '1px solid var(--nf-border)' }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="small fw-semibold">Faculty Workload Equilibrium</span>
                        <span className="small text-primary fw-bold">Zero Violations</span>
                      </div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>UGC maximum 16-18 hours/week threshold strictly enforced</div>
                    </div>
                    <div className="p-3 rounded-3" style={{ background: 'var(--nf-bg-card)', border: '1px solid var(--nf-border)' }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="small fw-semibold">Biometric Attendance Correlation</span>
                        <span className="small text-info fw-bold">Synchronized</span>
                      </div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>Instant student eligibility reports ready for end-semester exams</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#nexusflowEnterpriseCarousel"
            data-bs-slide="prev"
            aria-label="Previous Slide"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#nexusflowEnterpriseCarousel"
            data-bs-slide="next"
            aria-label="Next Slide"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
}
export default BootstrapCarousel;

