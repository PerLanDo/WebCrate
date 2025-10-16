@echo off
title WebCrate
echo.
echo ========================================
echo    Starting WebCrate Desktop App
echo ========================================
echo.

REM Start the server
node serve-dist.js

REM Keep the window open if there's an error
pause
