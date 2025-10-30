@echo off
echo 🚀 Build va dong bo tu AI Studio sang tai khoan chinh...
echo.

REM Cau hinh repo URLs
set ULTRA_REPO=https://github.com/camtungo9045-pixel/tudotaichinh.git
set MAIN_REPO=https://github.com/hvduoc/thoatno.git
set TEMP_DIR=temp-sync-%date:~-4,4%%date:~-10,2%%date:~-7,2%-%time:~0,2%%time:~3,2%%time:~6,2%
set TEMP_DIR=%TEMP_DIR: =0%

echo 📥 Clone repo tu tai khoan Ultra...
git clone %ULTRA_REPO% %TEMP_DIR%
if errorlevel 1 (
    echo ❌ Loi khi clone repo Ultra
    pause
    exit /b 1
)

cd %TEMP_DIR%

echo 🔨 Kiem tra va build app...
if exist package.json (
    echo - Cai dat dependencies...
    call npm install
    if errorlevel 1 (
        echo ❌ Loi khi cai dat dependencies
        cd ..
        rmdir /s /q %TEMP_DIR%
        pause
        exit /b 1
    )
    
    echo - Build app...
    call npm run build
    if errorlevel 1 (
        echo ❌ Loi khi build app
        cd ..
        rmdir /s /q %TEMP_DIR%
        pause
        exit /b 1
    )
    
    echo - Commit build moi...
    git add .
    git commit -m "Auto build: %date% %time%"
    
    echo - Push build moi len repo Ultra...
    git push origin main
    if errorlevel 1 (
        echo ⚠️ Khong the push len repo Ultra (co the do quyen han)
        echo Tiep tuc dong bo phien ban hien tai...
    )
) else (
    echo - Khong tim thay package.json, bo qua buoc build
)

echo 🔗 Them remote tai khoan chinh...
git remote add main-account %MAIN_REPO%
if errorlevel 1 (
    echo ❌ Loi khi them remote
    cd ..
    rmdir /s /q %TEMP_DIR%
    pause
    exit /b 1
)

echo 📤 Push code sang tai khoan chinh...
git push main-account main --force
if errorlevel 1 (
    echo ❌ Loi khi push code
    cd ..
    rmdir /s /q %TEMP_DIR%
    pause
    exit /b 1
)

cd ..
rmdir /s /q %TEMP_DIR%

echo.
echo ✅ Build va dong bo thanh cong!
echo 🌐 Repo da duoc dong bo toi: %MAIN_REPO%
echo.
echo 🎯 Tiep theo:
echo 1. Vao Vercel ket noi repo: https://github.com/hvduoc/thoatno
echo 2. Them bien moi truong GEMINI_API_KEY
echo 3. Deploy!
echo.
echo 📝 Luu y: Neu can cap nhat code moi tren AI Studio,
echo       hay chay lai script nay de dong bo phien ban moi nhat.
echo.
pause