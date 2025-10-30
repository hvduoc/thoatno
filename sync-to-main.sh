#!/bin/bash
# Script tự động đồng bộ từ repo Ultra sang tài khoản chính
# Chạy: chmod +x sync-to-main.sh && ./sync-to-main.sh

echo "🚀 Bắt đầu đồng bộ từ repo Ultra sang tài khoản chính..."

# Cấu hình repo URLs
ULTRA_REPO="https://github.com/camtungo9045-pixel/tudotaichinh.git"
MAIN_REPO="https://github.com/hvduoc/thoatno.git"
TEMP_DIR="temp-sync-$(date +%Y%m%d-%H%M%S)"

# Function để dọn dẹp khi exit
cleanup() {
    cd ..
    if [ -d "$TEMP_DIR" ]; then
        rm -rf "$TEMP_DIR"
        echo "🧹 Đã dọn dẹp thư mục tạm"
    fi
}
trap cleanup EXIT

# Bước 1: Clone repo từ tài khoản Ultra
echo "📥 Clone repo từ tài khoản Ultra..."
git clone "$ULTRA_REPO" "$TEMP_DIR"
if [ $? -ne 0 ]; then
    echo "❌ Lỗi khi clone repo Ultra"
    exit 1
fi

# Chuyển vào thư mục
cd "$TEMP_DIR"

# Bước 2: Thêm remote cho tài khoản chính
echo "🔗 Thêm remote tài khoản chính..."
git remote add main-account "$MAIN_REPO"
if [ $? -ne 0 ]; then
    echo "❌ Lỗi khi thêm remote"
    exit 1
fi

# Bước 3: Push sang tài khoản chính
echo "📤 Push code sang tài khoản chính..."
git push main-account main --force
if [ $? -ne 0 ]; then
    echo "❌ Lỗi khi push code"
    exit 1
fi

echo "✅ Đồng bộ thành công!"
echo "🌐 Repo đã được đồng bộ tới: $MAIN_REPO"

echo ""
echo "🎯 Tiếp theo:"
echo "1. Vào Vercel kết nối repo: https://github.com/hvduoc/thoatno"
echo "2. Thêm biến môi trường GEMINI_API_KEY"
echo "3. Deploy!"