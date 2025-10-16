@echo off
echo.
echo ========================================
echo   Creating WebCrate Desktop Shortcut
echo ========================================
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0create-desktop-shortcut.ps1"

echo.
pause
