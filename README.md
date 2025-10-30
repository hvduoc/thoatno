<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally and deploy to Vercel.

View your app in AI Studio: https://ai.studio/apps/drive/1eQ014coyaw8Rrh0wF2TkbTN5SjElrxip

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   ```bash
   npm run dev
   ```

## Deploy to Vercel

This project is ready for secure deployment to Vercel with proper API key handling.

### Quick Deploy
1. Push your code to GitHub
2. Connect your GitHub repo to [Vercel](https://vercel.com)
3. Add `GEMINI_API_KEY` environment variable in Vercel project settings
4. Deploy automatically

### Detailed Instructions
See [DEPLOY.md](./DEPLOY.md) for comprehensive deployment guide including:
- Serverless function setup (already configured)
- Environment variable configuration
- Security best practices
- Troubleshooting tips

### What's Included for Vercel
- ✅ Serverless API function (`/api/genai`) for secure AI calls
- ✅ Environment variable configuration
- ✅ SPA routing support
- ✅ Production build optimization
- ✅ CORS and error handling

### Build Commands
```bash
npm run build    # Build for production
npm run preview  # Preview production build locally
```
