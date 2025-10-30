@echo off
echo 🚀 Bat dau dong bo tu repo Ultra sang tai khoan chinh...
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
echo ✅ Dong bo thanh cong!
echo 🌐 Repo da duoc dong bo toi: %MAIN_REPO%
echo.
echo 🎯 Tiep theo:
echo 1. Vao Vercel ket noi repo: https://github.com/hvduoc/thoatno
echo 2. Them bien moi truong GEMINI_API_KEY
echo 3. Deploy!
echo.
pause