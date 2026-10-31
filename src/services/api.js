/**
 * NexusFlow Frontend API Client.
 * Communicates with the FastAPI backend (http://127.0.0.1:8000).
 * Includes intelligent mock-fallback if backend is offline or during static site hosting.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.port === '8000' ? '' : 'http://127.0.0.1:8000');

// In-memory fallback dataset for offline/static deployment
let localStudents = [
  { id: 1, roll_number: '21BCE1001', name: 'Arjun Mehta', department: 'CSE', semester: 5, section: 'A', overall_attendance: 91.4 },
  { id: 2, roll_number: '21BCE1002', name: 'Priya Sharma', department: 'CSE', semester: 5, section: 'A', overall_attendance: 96.0 },
  { id: 3, roll_number: '21BCE1003', name: 'Rahul Verma', department: 'CSE', semester: 5, section: 'A', overall_attendance: 78.2 },
  { id: 4, roll_number: '21BCE1004', name: 'Ananya Patel', department: 'CSE', semester: 5, section: 'A', overall_attendance: 84.5 },
  { id: 5, roll_number: '21BCE1005', name: 'Karthik Nair', department: 'CSE', semester: 5, section: 'A', overall_attendance: 71.0 },
  { id: 6, roll_number: '21BCE1006', name: 'Sneha Gupta', department: 'CSE', semester: 5, section: 'A', overall_attendance: 89.0 },
  { id: 7, roll_number: '21BCE1007', name: 'Rohan Das', department: 'CSE', semester: 5, section: 'A', overall_attendance: 68.5 },
  { id: 8, roll_number: '21BCE1008', name: 'Ishaan Roy', department: 'CSE', semester: 5, section: 'A', overall_attendance: 93.2 }
];

let localProxyRequests = [
  {
    id: 101,
    student_id: 5,
    requested_for: 'Karthik Nair (21BCE1005)',
    subject_code: 'CS501',
    date: new Date().toISOString().split('T')[0],
    reason: 'Official IEEE Tech Fest Coordinator duty at Main Auditorium.',
    status: 'Pending Review',
    flagged_anomaly: false,
    risk_score: 0.12,
    timestamp: new Date().toISOString()
  },
  {
    id: 102,
    student_id: 7,
    requested_for: 'Rohan Das (21BCE1007)',
    subject_code: 'CS502',
    date: new Date().toISOString().split('T')[0],
    reason: 'Late arrival due to transit bus breakdown.',
    status: 'Auto-Flagged',
    flagged_anomaly: true,
    risk_score: 0.88,
    timestamp: new Date().toISOString()
  }
];

let localAuditLogs = [
  { id: 1, event_type: 'SYSTEM_BOOT', description: 'NexusFlow Academic Core initialized for Campus-Alpha node.', actor: 'System Daemon', severity: 'info', created_at: new Date().toISOString() },
  { id: 2, event_type: 'PROXY_DETECTED', description: 'High-frequency attendance check attempt detected. Blocked by AI Sentinel.', actor: 'AI Sentinel', severity: 'critical', created_at: new Date().toISOString() },
  { id: 3, event_type: 'ATTENDANCE_OVERRIDE', description: 'Manual verification approved for Arjun Mehta (Official College Sports Council).', actor: 'Prof. Rajesh K.', severity: 'info', created_at: new Date().toISOString() },
  { id: 4, event_type: 'COMPLIANCE_AUDIT', description: 'Monthly AICTE attendance minimum variance verification passed with 99.4% parity.', actor: 'Compliance Bot', severity: 'info', created_at: new Date().toISOString() }
];

async function safeFetch(url, options = {}) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return null; // Fallback trigger
  }
}

export const api = {
  // Check backend server status
  async checkHealth() {
    const data = await safeFetch(`${API_BASE_URL}/health`);
    return {
      isLive: !!data,
      endpoint: API_BASE_URL,
      status: data?.status || 'offline-fallback'
    };
  },

  // Get students list
  async getStudents(query = '') {
    const backendData = await safeFetch(`${API_BASE_URL}/students${query ? `?query=${encodeURIComponent(query)}` : ''}`);
    if (backendData && Array.isArray(backendData)) {
      return { data: backendData, source: 'backend' };
    }
    const filtered = query
      ? localStudents.filter(s => s.name.toLowerCase().includes(query.toLowerCase()) || s.roll_number.toLowerCase().includes(query.toLowerCase()))
      : localStudents;
    return { data: filtered, source: 'local' };
  },

  // Record batch attendance
  async submitBatchAttendance(records) {
    const payload = { records };
    const backendData = await safeFetch(`${API_BASE_URL}/attendance/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (backendData) {
      return { success: true, count: backendData.count, source: 'backend' };
    }

    // Local simulation update
    records.forEach(rec => {
      const match = localStudents.find(s => s.id === rec.student_id);
      if (match) {
        if (rec.status === 'Present' || rec.status === 'present') {
          match.overall_attendance = Math.min(100, +(match.overall_attendance + 0.5).toFixed(1));
        } else if (rec.status === 'Absent' || rec.status === 'absent') {
          match.overall_attendance = Math.max(0, +(match.overall_attendance - 0.5).toFixed(1));
        }
      }
    });

    localAuditLogs.unshift({
      id: Date.now(),
      event_type: 'BATCH_ATTENDANCE',
      description: `Batch attendance synced for ${records.length} students.`,
      actor: 'Faculty System Sync (Sandbox)',
      severity: 'info',
      created_at: new Date().toISOString()
    });

    return { success: true, count: records.length, source: 'local' };
  },

  // Get proxy requests
  async getProxyRequests() {
    const backendData = await safeFetch(`${API_BASE_URL}/proxy-requests`);
    if (backendData && Array.isArray(backendData)) {
      return { data: backendData, source: 'backend' };
    }
    return { data: localProxyRequests, source: 'local' };
  },

  // Submit proxy request
  async submitProxyRequest(reqData) {
    const backendData = await safeFetch(`${API_BASE_URL}/proxy-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqData)
    });

    if (backendData) {
      return { data: backendData, source: 'backend' };
    }

    // Local Sentinel AI check
    const isSuspicious = /proxy|cover|friend|sleep|fake/i.test(reqData.reason);
    const newReq = {
      id: Date.now(),
      student_id: reqData.student_id,
      requested_for: reqData.requested_for,
      subject_code: reqData.subject_code,
      date: reqData.date,
      reason: reqData.reason,
      status: isSuspicious ? 'Auto-Flagged' : 'Pending Review',
      flagged_anomaly: isSuspicious,
      risk_score: isSuspicious ? 0.85 : 0.15,
      timestamp: new Date().toISOString()
    };
    localProxyRequests.unshift(newReq);

    if (isSuspicious) {
      localAuditLogs.unshift({
        id: Date.now(),
        event_type: 'PROXY_DETECTED',
        description: `AI Sentinel flagged suspicious proxy request from ${reqData.requested_for}.`,
        actor: 'AI Sentinel',
        severity: 'critical',
        created_at: new Date().toISOString()
      });
    }

    return { data: newReq, source: 'local' };
  },

  // Update proxy request status (Admin approval/rejection)
  async updateProxyStatus(id, status) {
    const backendData = await safeFetch(`${API_BASE_URL}/proxy-requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });

    if (backendData) {
      return { data: backendData, source: 'backend' };
    }

    const match = localProxyRequests.find(r => r.id === id);
    if (match) {
      match.status = status;
    }

    localAuditLogs.unshift({
      id: Date.now(),
      event_type: 'REQUEST_RESOLUTION',
      description: `Proxy/Leave request #${id} changed to '${status}'.`,
      actor: 'Academic Administrator',
      severity: status === 'Approved' ? 'info' : 'warning',
      created_at: new Date().toISOString()
    });

    return { data: match || { id, status }, source: 'local' };
  },

  // Get Admin KPIs
  async getAdminKPIs() {
    const backendData = await safeFetch(`${API_BASE_URL}/admin/kpis`);
    if (backendData) {
      return { data: backendData, source: 'backend' };
    }

    const avg = +(localStudents.reduce((acc, s) => acc + s.overall_attendance, 0) / localStudents.length).toFixed(1);
    const blocked = localProxyRequests.filter(r => r.flagged_anomaly || r.status === 'Rejected').length;

    return {
      data: {
        total_students: localStudents.length,
        total_faculty: 24,
        avg_campus_attendance: avg,
        proxy_attempts_blocked: blocked,
        system_uptime: 99.98,
        compliance_score: 99.4,
        pending_approvals: localProxyRequests.filter(r => r.status === 'Pending Review').length
      },
      source: 'local'
    };
  },

  // Get Audit Trail
  async getAuditLogs(limit = 20) {
    const backendData = await safeFetch(`${API_BASE_URL}/admin/audit?limit=${limit}`);
    if (backendData && Array.isArray(backendData)) {
      return { data: backendData, source: 'backend' };
    }
    return { data: localAuditLogs.slice(0, limit), source: 'local' };
  }
};

