# NexusFlow — Academic Resource & Timetable Intelligence Platform

> **OSFIC 2026 Mandate (Problem Statement PS-040: Academic Scheduling & Resource Optimization)**  
> **Full-Stack SaaS Platform: Enterprise React + Vite Frontend & FastAPI + SQLite Core Engine**

---

## 🌟 Key Highlights & Full-Stack SaaS Architecture

- **Global Navigation Bar**: Features the NexusFlow brand, live pulsing `v1.0 Enterprise SaaS` badge, dynamic theme toggle (Dark / Light mode), multi-role Login dropdown (`Teacher`, `Student`, `Institutional Admin`), and modal trigger for `Schedule an Institutional Pilot`.
- **Pre-Configured Mock IDs & Instant SSO Evaluation**:
  - 👨‍🏫 **Teacher Portal**:
    - **ID / Email**: `FAC-101` / `s.jenkins@nexusflow.edu`
    - **Passcode**: `faculty@2026`
    - **Name**: Dr. Sarah Jenkins (Associate Professor, CSE • CS501 Operating Systems)
  - 🎓 **Student Portal**:
    - **ID / Email**: `21BCE1001` / `arjun.m@nexusflow.edu`
    - **Passcode**: `student@2026`
    - **Name**: Arjun Mehta (B.Tech CSE • Sem 5, 91.4% Attendance)
  - 🏛️ **Institutional Admin / Dean Portal**:
    - **ID / Email**: `ADM-001` / `a.desai@nexusflow.edu`
    - **Passcode**: `admin@2026`
    - **Name**: Dr. Anita Desai (Dean of Academics & NAAC Accreditation Head)
- **FastAPI Core Backend (`backend/`)**:
  - **SQLite Database** (`osfic.db`) with SQLAlchemy ORM and schema auto-migration.
  - **CRUD & Analytics Endpoints**:
    - `GET /students` — Filter by department, search by name/roll.
    - `POST /attendance/batch` — Bulk sync classroom attendance with auto-recalculated student percentage.
    - `POST /proxy-requests` — Anomaly detection & AI Sentinel risk scoring (flags suspicious proxy attempts).
    - `PATCH /proxy-requests/{id}` — Academic dean review & substitution authorization.
    - `GET /admin/kpis` — Live calculation of campus attendance, active faculty load, and blocked anomalies.
    - `GET /admin/audit` — Immutable SHA-256 institutional audit trail.
- **Frontend API Client (`src/services/api.js`)**:
  - Automatically queries the FastAPI backend when available.
  - Seamless, zero-crash offline sandbox fallback if static or backend is paused.
- **Live AI Sentinel**:
  - Evaluates student proxy requests against behavioral models and keywords (`proxy`, `cover`, `emergency fake`).
  - Flags anomalies and alerts administrators in real-time.
- **Compliance & Audit Generation**:
  - One-click cryptographic JSON/PDF export for NAAC / NIRF regulatory audits with digital seals.

---

## 🚀 Getting Started

### 1. Install Frontend Dependencies
```bash
npm install
```

### 2. Install Backend Python Dependencies
```bash
pip install -r backend/requirements.txt
```

### 3. Run Backend Server (FastAPI + SQLite)
```bash
npm run backend
```
> The API will be available at `http://127.0.0.1:8000` with Swagger docs at `http://127.0.0.1:8000/docs`.

### 4. Run Frontend Development Server
```bash
npm run dev
```
> The React application will run at `http://localhost:5173`.

### 5. Run Direct Backend Integration Tests
```bash
npm run test:backend
```
> Validates all 8 institutional workflow endpoints, database transactions, and AI Sentinel risk scoring.

### 6. Production Build & Deployment
```bash
npm run build
```
Creates production-ready minified assets in `dist/` and synced for GitHub Pages in `docs/`.

---

## 🏛️ Institutional Onboarding & Commercial Deployment

NexusFlow is architected for zero-downtime integration into existing university ERPs (SAP, PeopleSoft, TCS iON, Jenzabar):
1. **Containerized Deployment**: Ready for Docker & Kubernetes on campus private cloud or AWS/Azure GovCloud.
2. **Data Sovereignty**: Complete compliance with the Indian Digital Personal Data Protection (DPDP) Act 2023.
3. **Role-Based Access Control (RBAC)**: Strict separation between students, faculty, and institutional deans.
