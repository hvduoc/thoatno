@echo off
echo 🚀 Build va push len tai khoan chinh...
echo 📁 Thu muc hien tai: %CD%
echo.

REM Kiem tra xem co la thu muc git hay khong
if not exist .git (
    echo 🔧 Khoi tao Git repository...
    git init
    git remote add origin https://github.com/hvduoc/thoatno.git
    git branch -M main
) else (
    echo ✅ Git repository da ton tai
    REM Kiem tra xem remote origin da ton tai chua
    git remote get-url origin >nul 2>&1
    if errorlevel 1 (
        echo 🔗 Them remote origin...
        git remote add origin https://github.com/hvduoc/thoatno.git
    )
)

echo 📦 Cai dat dependencies...
if exist package.json (
    call npm install
    if errorlevel 1 (
        echo ❌ Loi khi cai dat dependencies
        pause
        exit /b 1
    )
) else (
    echo ❌ Khong tim thay package.json trong thu muc: %CD%
    echo Dam bao ban dang o trong thu muc project dung
    pause
    exit /b 1
)

echo 🔨 Build app...
call npm run build
if errorlevel 1 (
    echo ❌ Loi khi build app
    pause
    exit /b 1
)

echo 📤 Add, commit va push len GitHub...
git add .
git commit -m "Update from local: %date% %time%"
git push origin main
if errorlevel 1 (
    echo ⚠️ Loi khi push, thu lai voi force push...
    git push origin main -f
    if errorlevel 1 (
        echo ❌ Loi khi push len GitHub
        echo Kiem tra:
        echo - Internet connection
        echo - GitHub credentials  
        echo - Repository permissions
        echo - URL repo: https://github.com/hvduoc/thoatno.git
        pause
        exit /b 1
    )
)

echo.
echo ✅ Build va push thanh cong!
echo 🌐 Code da duoc push len: https://github.com/hvduoc/thoatno
echo 📁 Tu thu muc: %CD%
echo.
echo 🎯 Tiep theo:
echo 1. Vercel se tu dong detect thay doi va build
echo 2. Neu chua ket noi, vao Vercel ket noi repo
echo 3. Them bien moi truong GEMINI_API_KEY neu chua co
echo.
echo 🔄 Vercel dashboard: https://vercel.com/hvduoc/thoatno
echo.
pause