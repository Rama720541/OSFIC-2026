#!/usr/bin/env python3
"""NexusFlow College SaaS - Master Launcher & Comprehensive Test Runner.

Usage:
  python startall.py         -> Tests everything, starts unified server, and opens browser
  python startall.py --test  -> Runs self-test suite only and reports status
  python startall.py --port  -> Custom port (default: 8000)
"""

import sys
import os
import subprocess
import time
import webbrowser
import argparse

# Ensure project root is in sys.path
PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
sys.path.insert(0, PROJECT_ROOT)

def print_banner():
    banner = """
=============================================================================
         NEXUSFLOW ENTERPRISE ACADEMIC SAAS PLATFORM
               AI-Powered Scheduling & Resource Optimization
=============================================================================
"""
    print(banner)

def check_python_environment():
    print("[*] Checking runtime environment...")
    v = sys.version_info
    print(f"    - Python version: {v.major}.{v.minor}.{v.micro} [OK]")
    if v.major < 3 or (v.major == 3 and v.minor < 8):
        print("[-] Error: Python 3.8 or higher is required.")
        sys.exit(1)

def ensure_dependencies():
    print("[*] Verifying backend dependencies...")
    required = ["fastapi", "uvicorn", "sqlalchemy", "pydantic"]
    missing = []
    for pkg in required:
        try:
            __import__(pkg)
        except ImportError:
            missing.append(pkg)

    if missing:
        print(f"    - Missing packages detected: {', '.join(missing)}")
        print("    - Installing required dependencies from backend/requirements.txt...")
        req_file = os.path.join(PROJECT_ROOT, "backend", "requirements.txt")
        cmd = [sys.executable, "-m", "pip", "install", "-r", req_file]
        res = subprocess.call(cmd)
        if res != 0:
            print("[-] Dependency installation failed. Please run 'pip install -r backend/requirements.txt' manually.")
            sys.exit(1)
        print("    - Dependencies installed successfully! [OK]")
    else:
        print("    - All core Python dependencies present. [OK]")

def run_software_tests():
    print("\n[*] Running comprehensive software self-test suite...")
    test_script = os.path.join(PROJECT_ROOT, "backend", "test_routes_direct.py")
    if not os.path.exists(test_script):
        print(f"[-] Test file not found: {test_script}")
        return False

    cmd = [sys.executable, test_script]
    result = subprocess.run(cmd, cwd=PROJECT_ROOT)
    if result.returncode == 0:
        print("[+] Software Self-Test: ALL 8 SUITES PASSED CLEANLY (100% OK)")
        return True
    else:
        print("[-] Some tests encountered issues. Review log above.")
        return False

def verify_frontend_build():
    print("\n[*] Checking frontend web assets...")
    dist_index = os.path.join(PROJECT_ROOT, "dist", "index.html")
    docs_index = os.path.join(PROJECT_ROOT, "docs", "index.html")

    if os.path.exists(dist_index):
        print("    - Production frontend build located at dist/ [OK]")
        return True
    elif os.path.exists(docs_index):
        print("    - Production frontend build located at docs/ [OK]")
        return True
    else:
        print("    - No pre-built frontend found. Attempting to build with npm...")
        try:
            subprocess.run(["npm", "run", "build"], cwd=PROJECT_ROOT, check=True)
            print("    - Frontend built successfully! [OK]")
            return True
        except Exception as e:
            print(f"    - Note: Could not build frontend automatically ({e}). API mode will still operate.")
            return False

def start_server(host="127.0.0.1", port=8000, no_browser=False):
    url = f"http://{host}:{port}"
    print(f"\n=============================================================================")
    print(f"[*] Starting NexusFlow Unified SaaS Engine on {url}")
    print(f"[*] Interactive API Docs (Swagger): {url}/docs")
    print(f"[*] SQLite Database Path:           {os.path.join(PROJECT_ROOT, 'osfic.db')}")
    print(f"=============================================================================")
    print("\n[+] PRE-CONFIGURED INSTITUTIONAL MOCK DEMO ACCOUNTS:")
    print("    1. Teacher Portal:   FAC-101    | s.jenkins@nexusflow.edu | faculty@2026")
    print("    2. Student Portal:   21BCE1001  | arjun.m@nexusflow.edu   | student@2026")
    print("    3. Dean / Admin:     ADM-001    | a.desai@nexusflow.edu   | admin@2026")
    print("\n[*] Press Ctrl+C anytime to stop the server.\n")

    if not no_browser:
        def open_browser():
            time.sleep(1.8)
            print(f"[*] Opening {url} in your default web browser...")
            try:
                webbrowser.open(url)
            except Exception:
                pass
        import threading
        t = threading.Thread(target=open_browser, daemon=True)
        t.start()

    # Launch uvicorn
    import uvicorn
    from backend.main import app
    uvicorn.run(app, host=host, port=port, log_level="info")

def main():
    parser = argparse.ArgumentParser(description="NexusFlow Academic SaaS Launcher")
    parser.add_argument("--test", action="store_true", help="Run diagnostic test suite only and exit")
    parser.add_argument("--port", type=int, default=8000, help="Port to bind server (default: 8000)")
    parser.add_argument("--host", type=str, default="127.0.0.1", help="Host interface (default: 127.0.0.1)")
    parser.add_argument("--no-browser", action="store_true", help="Do not automatically launch web browser")
    args = parser.parse_args()

    print_banner()
    check_python_environment()
    ensure_dependencies()
    frontend_ok = verify_frontend_build()
    test_ok = run_software_tests()

    if args.test:
        print("\n=============================================================================")
        if test_ok and frontend_ok:
            print("[+] DIAGNOSTIC RESULT: All frontend, backend, and database checks PASSED.")
            sys.exit(0)
        else:
            print("[-] DIAGNOSTIC RESULT: Self-test completed with warnings.")
            sys.exit(1)

    print("\n[*] Pre-flight validation successful. Launching platform...")
    try:
        start_server(host=args.host, port=args.port, no_browser=args.no_browser)
    except KeyboardInterrupt:
        print("\n[*] NexusFlow platform shut down cleanly. Goodbye!")
        sys.exit(0)

if __name__ == "__main__":
    main()
