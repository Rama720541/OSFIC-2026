import React, { useState } from 'react';
import { Calculator, TrendingUp, IndianRupee, Clock, Building, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export function RoiCalculator({ onOpenPilotModal }) {
  const [students, setStudents] = useState(6500);
  const [faculty, setFaculty] = useState(240);
  const [rooms, setRooms] = useState(85);

  // Dynamic calculations based on institutional parameters
  const annualHoursSaved = Math.round(faculty * 9.5 + (students / 100) * 12);
  const directCostSavingsLakhs = ((annualHoursSaved * 650 + rooms * 18000) / 100000).toFixed(1);
  const spaceOptimizationYield = Math.min(48, Math.round(28 + (rooms / 10)));
  const avoidedCapexLakhs = (rooms * 0.45).toFixed(1);

  return (
    <section id="roi-calculator" className="py-5" style={{ background: 'transparent' }}>
      <div className="container py-4">
        {/* Header */}
        <div className="text-center mb-5">
          <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1 fw-bold text-uppercase" style={{ fontSize: '0.75rem' }}>
            Institutional ROI & Space Economics
          </span>
          <h2 className="display-6 fw-bold mt-3 mb-2">
            Calculate Your Campus <span className="text-gradient-accent">Financial & Time Savings</span>
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '640px' }}>
            Quantify the immediate financial return for university registrars and the OSFIC ₹1 Crore panel.
          </p>
        </div>

        <div className="card-enterprise p-4 p-md-5 border-success border-opacity-30 shadow-lg">
          <div className="row g-5 align-items-center">
            {/* Left: Interactive Controls */}
            <div className="col-lg-6">
              <div className="d-flex align-items-center gap-2 mb-4">
                <Calculator size={22} className="text-success" />
                <h4 className="fw-bold mb-0">Campus Scale Parameters</h4>
              </div>

              {/* Slider 1: Students */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="fw-semibold small">Total Enrolled Students</label>
                  <span className="badge bg-primary font-mono fs-6">{students.toLocaleString('en-IN')} Students</span>
                </div>
                <input
                  type="range"
                  className="form-range"
                  min="1000"
                  max="25000"
                  step="500"
                  value={students}
                  onChange={(e) => setStudents(parseInt(e.target.value))}
                />
                <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.75rem' }}>
                  <span>1,000 (Small College)</span>
                  <span>12,000 (State University)</span>
                  <span>25,000+ (Multi-Campus)</span>
                </div>
              </div>

              {/* Slider 2: Faculty */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="fw-semibold small">Full-Time Faculty Members</label>
                  <span className="badge bg-primary font-mono fs-6">{faculty} Professors</span>
                </div>
                <input
                  type="range"
                  className="form-range"
                  min="50"
                  max="1200"
                  step="10"
                  value={faculty}
                  onChange={(e) => setFaculty(parseInt(e.target.value))}
                />
                <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.75rem' }}>
                  <span>50 Faculty</span>
                  <span>500 Faculty</span>
                  <span>1,200+ Faculty</span>
                </div>
              </div>

              {/* Slider 3: Rooms & Labs */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="fw-semibold small">Lecture Theatres, Labs & Auditoriums</label>
                  <span className="badge bg-primary font-mono fs-6">{rooms} Venues</span>
                </div>
                <input
                  type="range"
                  className="form-range"
                  min="20"
                  max="250"
                  step="5"
                  value={rooms}
                  onChange={(e) => setRooms(parseInt(e.target.value))}
                />
                <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.75rem' }}>
                  <span>20 Venues</span>
                  <span>120 Venues</span>
                  <span>250+ Venues</span>
                </div>
              </div>

              <div className="p-3 rounded-3" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                <div className="small text-muted">
                  <strong>OSFIC PS-040 Formula:</strong> Evaluates timetable coordination man-hours, idle classroom HVAC electricity wastage, and proxy teacher misallocation rates across 2 academic semesters.
                </div>
              </div>
            </div>

            {/* Right: Output Value Cards */}
            <div className="col-lg-6">
              <div className="p-4 rounded-4" style={{ background: 'var(--nf-bg-surface)', border: '1px solid var(--nf-border)' }}>
                <span className="badge bg-success text-white font-mono mb-3">ANNUAL ECONOMIC YIELD</span>

                <div className="row g-3 mb-4">
                  {/* Metric 1 */}
                  <div className="col-sm-6">
                    <div className="p-3 rounded-3 h-100" style={{ background: 'var(--nf-bg-card)', border: '1px solid var(--nf-border)' }}>
                      <div className="d-flex align-items-center gap-2 text-muted small mb-1">
                        <Clock size={16} className="text-primary" />
                        <span>Coordination Hours Saved</span>
                      </div>
                      <div className="fw-extrabold fs-3 text-primary font-mono">
                        {annualHoursSaved.toLocaleString('en-IN')} <span className="fs-6 fw-normal">Hrs/Yr</span>
                      </div>
                      <div className="text-muted" style={{ fontSize: '0.72rem' }}>Reclaimed for research & NIRF ranking focus</div>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="col-sm-6">
                    <div className="p-3 rounded-3 h-100" style={{ background: 'var(--nf-bg-card)', border: '1px solid var(--nf-border)' }}>
                      <div className="d-flex align-items-center gap-2 text-muted small mb-1">
                        <IndianRupee size={16} className="text-success" />
                        <span>Direct OPEX Savings</span>
                      </div>
                      <div className="fw-extrabold fs-3 text-success font-mono">
                        ₹{directCostSavingsLakhs} <span className="fs-6 fw-normal">Lakhs/Yr</span>
                      </div>
                      <div className="text-muted" style={{ fontSize: '0.72rem' }}>Saved from administration and power waste</div>
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="col-sm-6">
                    <div className="p-3 rounded-3 h-100" style={{ background: 'var(--nf-bg-card)', border: '1px solid var(--nf-border)' }}>
                      <div className="d-flex align-items-center gap-2 text-muted small mb-1">
                        <Building size={16} className="text-info" />
                        <span>Capacity Utilization</span>
                      </div>
                      <div className="fw-extrabold fs-3 text-info font-mono">
                        +{spaceOptimizationYield}%
                      </div>
                      <div className="text-muted" style={{ fontSize: '0.72rem' }}>Increases lab & auditorium throughput</div>
                    </div>
                  </div>

                  {/* Metric 4 */}
                  <div className="col-sm-6">
                    <div className="p-3 rounded-3 h-100" style={{ background: 'var(--nf-bg-card)', border: '1px solid var(--nf-border)' }}>
                      <div className="d-flex align-items-center gap-2 text-muted small mb-1">
                        <TrendingUp size={16} className="text-warning" />
                        <span>Avoided Infra CAPEX</span>
                      </div>
                      <div className="fw-extrabold fs-3 text-warning font-mono">
                        ₹{avoidedCapexLakhs} <span className="fs-6 fw-normal">Lakhs</span>
                      </div>
                      <div className="text-muted" style={{ fontSize: '0.72rem' }}>Delayed need for new civil constructions</div>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column gap-2 mb-4">
                  <div className="d-flex align-items-center gap-2 small text-muted">
                    <CheckCircle2 size={16} className="text-success" />
                    <span>Payback Period: <strong>&lt; 42 Days</strong> post institutional deployment</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 small text-muted">
                    <CheckCircle2 size={16} className="text-success" />
                    <span>Turnkey Integration: Works with existing college attendance and ERP systems</span>
                  </div>
                </div>

                <button onClick={onOpenPilotModal} className="btn btn-primary-enterprise w-100 d-flex align-items-center justify-content-center gap-2 py-3 fs-6">
                  <span>Download Full Institutional ROI Audit PDF</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default RoiCalculator;

