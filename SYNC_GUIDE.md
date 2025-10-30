# Hướng dẫn sử dụng Script Đồng bộ

## Mục đích
Tự động đồng bộ code từ repo Ultra (`camtungo9045-pixel/tudotaichinh`) sang tài khoản chính (`hvduoc/thoatno`).

## Cách sử dụng

### Windows (PowerShell)
```powershell
# Chạy script
.\sync-to-main.ps1
```

### Linux/Mac (Bash)
```bash
# Cấp quyền thực thi
chmod +x sync-to-main.sh

# Chạy script
./sync-to-main.sh
```

## Script sẽ làm gì?

1. **Clone** repo từ tài khoản Ultra
2. **Thêm remote** tài khoản chính
3. **Push** toàn bộ code sang repo chính (force push)
4. **Dọn dẹp** thư mục tạm tự động
5. **Hiển thị** hướng dẫn deploy tiếp theo

## Sau khi chạy script

1. Vào [Vercel](https://vercel.com)
2. Kết nối repo: `https://github.com/hvduoc/thoatno`
3. Thêm biến môi trường `GEMINI_API_KEY`
4. Deploy!

## Lưu ý

- Script sử dụng `--force` push để đảm bảo đồng bộ hoàn toàn
- Thư mục tạm sẽ được tự động xóa sau khi hoàn thành
- Cần có quyền push vào repo đích (`hvduoc/thoatno`)

## Troubleshooting

### Lỗi authentication
```bash
# Cấu hình Git credentials nếu chưa có
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

### Lỗi quyền push
- Đảm bảo tài khoản có quyền push vào repo `hvduoc/thoatno`
- Hoặc tạo Personal Access Token và sử dụng làm password

## Quy trình hoàn chỉnh

1. **Build trên AI Studio** → Code ở `camtungo9045-pixel/tudotaichinh`
2. **Chạy script đồng bộ** → Code chuyển sang `hvduoc/thoatno`
3. **Deploy trên Vercel** → Production từ tài khoản chính