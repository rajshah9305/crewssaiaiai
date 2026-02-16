# Infrastructure & Deployment

This directory contains deployment guides for the Universal NLP Interface.
The Vercel configuration (`vercel.json`) lives at the repository root.

## Deployment Options

### Backend Deployment

The FastAPI backend can be deployed to various platforms without Docker:

#### Option 1: Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Option 2: Render
1. Connect your GitHub repository
2. Create a new Web Service
3. Set build command: `cd backend && pip install -r requirements.txt`
4. Set start command: `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`

#### Option 3: Google Cloud Run
```bash
# Deploy using buildpacks (no Docker needed)
gcloud run deploy nlp-backend \
  --source ./backend \
  --region us-central1 \
  --allow-unauthenticated
```

#### Option 4: AWS Lambda (with Mangum)
Add to `backend/requirements.txt`:
```
mangum==0.17.0
```

Create `backend/lambda_handler.py`:
```python
from mangum import Mangum
from app.main import app

handler = Mangum(app)
```

Deploy using AWS SAM or Serverless Framework.

### Frontend Deployment

The React frontend can be deployed to static hosting:

#### Option 1: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel
```

#### Option 2: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

#### Option 3: Cloudflare Pages
```bash
# Install Wrangler
npm install -g wrangler

# Deploy
cd frontend
npm run build
wrangler pages deploy dist
```

## Environment Variables

### Backend
- `ENVIRONMENT`: development/production
- `API_HOST`: Host to bind (default: 0.0.0.0)
- `API_PORT`: Port to bind (default: 8000)
- `CORS_ORIGINS`: Comma-separated allowed origins
- `RATE_LIMIT_PER_MINUTE`: Rate limit (default: 20)
- `DEFAULT_GROQ_MODEL`: Default Groq model (default: llama-3.3-70b-versatile)

### Frontend
- `VITE_API_URL`: Backend API URL

## Security Considerations

1. Always use HTTPS in production
2. Configure CORS properly for your frontend domain
3. Set appropriate rate limits
4. Never commit API keys to version control
5. Use environment variables for all sensitive configuration
6. Enable security headers in production

## Monitoring

Consider adding:
- Application monitoring (e.g., Sentry, DataDog)
- Log aggregation (e.g., Logtail, Papertrail)
- Uptime monitoring (e.g., UptimeRobot, Pingdom)
- Performance monitoring (e.g., New Relic, AppDynamics)

## Scaling

For high-traffic scenarios:
- Use a CDN for frontend assets
- Enable backend auto-scaling
- Implement caching where appropriate
- Consider a load balancer for multiple backend instances
- Monitor and optimize database queries if you add persistence
