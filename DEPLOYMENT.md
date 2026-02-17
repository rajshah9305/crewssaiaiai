# Vercel Deployment Guide

This application is configured for seamless deployment on Vercel with both frontend and backend.

## Prerequisites

- Vercel account (sign up at https://vercel.com)
- GitHub repository connected to Vercel
- Groq API key (get one at https://console.groq.com)

## Quick Deploy

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel will auto-detect the configuration from `vercel.json`
4. Add environment variables (see below)
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Environment Variables

Configure these in your Vercel project settings:

### Required Variables
- `GROQ_API_KEY`: Your Groq API key (for backend)
- `VITE_API_URL`: Your Vercel deployment URL (e.g., https://your-app.vercel.app)

### Optional Variables
- `ENVIRONMENT`: Set to "production"
- `CORS_ORIGINS`: Your frontend URL (auto-configured)
- `RATE_LIMIT_PER_MINUTE`: API rate limit (default: 20)
- `DEFAULT_GROQ_MODEL`: Default model (default: llama-3.3-70b-versatile)
- `LOG_LEVEL`: Logging level (default: INFO)

## Project Structure

```
├── api/
│   └── index.py          # Vercel serverless function entry point
├── backend/
│   └── app/              # FastAPI application
├── frontend/
│   └── src/              # React application
└── vercel.json           # Vercel configuration
```

## How It Works

1. **Frontend**: Built with Vite and served as static files
2. **Backend**: Runs as Vercel serverless functions via `/api/*` routes
3. **Routing**: All `/api/*` requests are routed to the Python backend

## Post-Deployment

1. Test your deployment at `https://your-app.vercel.app`
2. Update `VITE_API_URL` if needed
3. Monitor logs in Vercel dashboard
4. Set up custom domain (optional)

## Custom Domain

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `VITE_API_URL` and `CORS_ORIGINS` accordingly

## Troubleshooting

### Backend not responding
- Check environment variables are set correctly
- Verify `GROQ_API_KEY` is valid
- Check function logs in Vercel dashboard

### CORS errors
- Ensure `CORS_ORIGINS` includes your frontend URL
- Check that `VITE_API_URL` points to correct backend

### Build failures
- Verify all dependencies are in `requirements.txt` and `package.json`
- Check build logs in Vercel dashboard

## Monitoring

- View logs: Vercel Dashboard → Your Project → Logs
- Monitor performance: Vercel Dashboard → Your Project → Analytics
- Set up alerts: Vercel Dashboard → Your Project → Settings → Notifications

## Scaling

Vercel automatically scales your application:
- Frontend: Served via global CDN
- Backend: Auto-scales serverless functions
- Rate limiting: Configured in backend (20 req/min default)

## Support

For issues:
1. Check Vercel documentation: https://vercel.com/docs
2. Review application logs in Vercel dashboard
3. Check GitHub repository issues
