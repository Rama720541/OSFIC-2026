#!/usr/bin/env python3
"""NexusFlow Deliverable Packager.

Packages the complete software into a standalone, clean ZIP file ready to send
to colleges, universities, and evaluators.
"""

import os
import zipfile
import shutil

PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
ZIP_NAME = "NexusFlow_College_SaaS_Release.zip"
OUTPUT_PATH = os.path.join(PROJECT_ROOT, ZIP_NAME)

INCLUDED_ITEMS = [
    "backend",
    "dist",
    "docs",
    "src",
    "index.html",
    "package.json",
    "README.md",
    "run.bat",
    "startall.py",
    "vite.config.js"
]

EXCLUDED_EXTS = [".pyc", ".pyo", ".pyd", ".db", ".log"]
EXCLUDED_DIRS = ["__pycache__", ".pytest_cache", ".git", "node_modules", ".vite"]

def create_deliverable_zip():
    print(f"[*] Packaging NexusFlow into standalone deliverable: {ZIP_NAME}...")

    # Ensure dist exists
    dist_dir = os.path.join(PROJECT_ROOT, "dist")
    if not os.path.exists(os.path.join(dist_dir, "index.html")):
        print("[-] Warning: dist/index.html is missing. Run 'npm run build' first.")

    count = 0
    with zipfile.ZipFile(OUTPUT_PATH, "w", zipfile.ZIP_DEFLATED) as zf:
        for item in INCLUDED_ITEMS:
            full_path = os.path.join(PROJECT_ROOT, item)
            if not os.path.exists(full_path):
                continue

            if os.path.isfile(full_path):
                arcname = os.path.relpath(full_path, PROJECT_ROOT)
                zf.write(full_path, arcname)
                count += 1
            elif os.path.isdir(full_path):
                for root, dirs, files in os.walk(full_path):
                    # Filter out excluded directories
                    dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRS]
                    for f in files:
                        if any(f.endswith(ext) for ext in EXCLUDED_EXTS):
                            continue
                        file_full = os.path.join(root, f)
                        arcname = os.path.relpath(file_full, PROJECT_ROOT)
                        zf.write(file_full, arcname)
                        count += 1

    size_mb = os.path.getsize(OUTPUT_PATH) / (1024 * 1024)
    print(f"[+] Deliverable successfully packaged!")
    print(f"    - Target ZIP: {OUTPUT_PATH}")
    print(f"    - Total Files Archived: {count}")
    print(f"    - Package Size: {size_mb:.2f} MB")
    print(f"\n[+] HOW A COLLEGE USES THIS PACKAGE:")
    print("    1. Download and extract 'NexusFlow_College_SaaS_Release.zip'")
    print("    2. Double-click 'run.bat' (Windows) or execute 'python startall.py'")
    print("    3. Platform automatically tests, seeds SQLite database, and opens the browser at http://127.0.0.1:8000!")

if __name__ == "__main__":
    create_deliverable_zip()
