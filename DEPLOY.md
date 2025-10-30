# Hướng dẫn Deploy lên Vercel

## Tóm tắt thay đổi đã thực hiện

Dự án đã được chuẩn bị để deploy an toàn lên Vercel với các thay đổi sau:

### 1. Tạo Serverless API Function
- **File mới**: `api/genai.ts` - xử lý các request AI server-side
- **Lợi ích**: API key được giữ bí mật trên server, không lộ ra client

### 2. Bảo mật Vite Config
- **File**: `vite.config.ts` - đã loại bỏ việc nhúng API key vào client bundle
- **Lợi ích**: Tránh lộ secret khi build production

### 3. Cập nhật Frontend
- **File**: `components/FinancialPlanApp.tsx` - thay đổi từ gọi trực tiếp GoogleGenAI sang fetch tới `/api/genai`
- **Lợi ích**: Giao tiếp an toàn với serverless function

### 4. Cấu hình Vercel
- **File mới**: `vercel.json` - cấu hình build và routing cho SPA
- **File mới**: Dependency `@vercel/node` cho TypeScript types

## Các bước Deploy

### Bước 1: Chuẩn bị môi trường local (đã hoàn thành)
✅ Đã cài đặt dependencies cần thiết
✅ Đã tạo serverless function
✅ Đã bảo mật cấu hình

### Bước 2: Deploy lên Vercel

#### Option A: Sử dụng Vercel Dashboard (Khuyến nghị)
1. Đăng nhập vào [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import repository từ GitHub
4. Vercel sẽ tự động detect Vite framework
5. Click "Deploy"

#### Option B: Sử dụng Vercel CLI
```powershell
# Cài đặt Vercel CLI
npm i -g vercel

# Đăng nhập
vercel login

# Deploy từ thư mục dự án
vercel
```

### Bước 3: Thiết lập Environment Variables
Sau khi deploy, cần thêm API key:

1. Vào Vercel Dashboard → Project Settings
2. Chọn tab "Environment Variables"
3. Thêm biến:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: `your-actual-gemini-api-key`
   - **Environment**: Production (và Preview nếu cần)
4. Click "Save"
5. Redeploy project để áp dụng biến mới

### Bước 4: Kiểm tra
1. Mở URL được Vercel cung cấp
2. Test chức năng AI trong phần "Tăng tốc Thu nhập"
3. Kiểm tra Console nếu có lỗi

## Troubleshooting

### Lỗi "API key not found"
- Đảm bảo đã thêm `GEMINI_API_KEY` trong Environment Variables
- Redeploy sau khi thêm biến môi trường

### Lỗi 404 khi navigate
- `vercel.json` đã cấu hình rewrites cho SPA routing
- Nếu vẫn lỗi, kiểm tra file `vercel.json` có được deploy đúng không

### Lỗi Build
```powershell
# Test build local trước
npm run build
```

### Lỗi Function timeout
- Function có giới hạn 10s trên free tier
- Kiểm tra logs trong Vercel Dashboard → Functions

## Bảo mật đã được áp dụng

✅ **API Key không lộ ra client**: Chỉ tồn tại trên server
✅ **CORS được cấu hình**: Cho phép frontend gọi API
✅ **Error handling**: Xử lý lỗi đầy đủ trong serverless function
✅ **Rate limiting**: Có thể thêm sau nếu cần

## Next Steps (Tùy chọn)

1. **Custom Domain**: Thêm domain riêng trong Vercel settings
2. **Analytics**: Enable Vercel Analytics để theo dõi usage
3. **Rate Limiting**: Thêm giới hạn request để bảo vệ API quota
4. **Error Monitoring**: Tích hợp Sentry hoặc LogRocket
5. **Performance**: Enable Vercel Edge Functions nếu cần tốc độ cao hơn

## Commands hữu ích

```powershell
# Build và test local
npm run build
npm run preview

# Deploy với CLI
vercel --prod

# Xem logs functions
vercel logs

# Set environment variable qua CLI
vercel env add GEMINI_API_KEY
```