@echo off
title NexusFlow Academic SaaS Platform
color 0B
echo =============================================================================
echo               NexusFlow Academic SaaS Platform - One-Click Launcher
echo =============================================================================
echo.
echo [*] Initializing platform and checking Python environment...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [-] Python was not found on your system PATH.
    echo [*] Please install Python 3.8+ from https://www.python.org/downloads/
    echo [*] Ensure "Add Python to PATH" is checked during installation.
    pause
    exit /b 1
)

echo [*] Starting NexusFlow with automated dependency checks and self-tests...
python startall.py
if %errorlevel% neq 0 (
    echo.
    echo [-] Platform stopped or encountered an issue.
    pause
)
