@echo off
cd /d "c:\Users\PC\Desktop\MGIsoft Tech"
start "MGIsoft Server" cmd /k "python -m http.server 8000"
timeout /t 2 /nobreak >nul
start "" "http://localhost:8000/index_new.html"
