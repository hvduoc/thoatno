# Script tự động đồng bộ từ repo Ultra sang tài khoản chính
# Chạy: .\sync-to-main.ps1

Write-Host "🚀 Bắt đầu đồng bộ từ repo Ultra sang tài khoản chính..." -ForegroundColor Green

# Cấu hình repo URLs
$ultraRepo = "https://github.com/camtungo9045-pixel/tudotaichinh.git"
$mainRepo = "https://github.com/hvduoc/thoatno.git"
$tempDir = "temp-sync-$(Get-Date -Format 'yyyyMMdd-HHmmss')"

try {
    # Bước 1: Clone repo từ tài khoản Ultra
    Write-Host "📥 Clone repo từ tài khoản Ultra..." -ForegroundColor Yellow
    git clone $ultraRepo $tempDir
    if ($LASTEXITCODE -ne 0) { throw "Lỗi khi clone repo Ultra" }

    # Chuyển vào thư mục
    Set-Location $tempDir

    # Bước 2: Thêm remote cho tài khoản chính
    Write-Host "🔗 Thêm remote tài khoản chính..." -ForegroundColor Yellow
    git remote add main-account $mainRepo
    if ($LASTEXITCODE -ne 0) { throw "Lỗi khi thêm remote" }

    # Bước 3: Push sang tài khoản chính
    Write-Host "📤 Push code sang tài khoản chính..." -ForegroundColor Yellow
    git push main-account main --force
    if ($LASTEXITCODE -ne 0) { throw "Lỗi khi push code" }

    Write-Host "✅ Đồng bộ thành công!" -ForegroundColor Green
    Write-Host "🌐 Repo đã được đồng bộ tới: $mainRepo" -ForegroundColor Cyan

} catch {
    Write-Host "❌ Lỗi: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
} finally {
    # Quay về thư mục gốc và xóa temp
    Set-Location ..
    if (Test-Path $tempDir) {
        Remove-Item $tempDir -Recurse -Force
        Write-Host "🧹 Đã dọn dẹp thư mục tạm" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "🎯 Tiếp theo:" -ForegroundColor Magenta
Write-Host "1. Vào Vercel kết nối repo: https://github.com/hvduoc/thoatno" -ForegroundColor White
Write-Host "2. Thêm biến môi trường GEMINI_API_KEY" -ForegroundColor White
Write-Host "3. Deploy!" -ForegroundColor White