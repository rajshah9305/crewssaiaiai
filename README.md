# Universal NLP Interface

A production-ready full-stack application powered by crewAI agents and Groq API for natural language processing tasks. Features a modern two-pane interface with live execution tracking and intelligent output rendering.

## ✨ New Design Features

- **Two-Pane Layout**: Live execution tracking (left) + generated output (right)
- **Real-Time Execution Logs**: Watch AI processing with timestamped, color-coded logs
- **Intelligent Output Rendering**: Automatic code detection with terminal-style display
- **Chat-Style Input**: Bottom bar for natural language tasks with quick examples
- **Execution History**: Track all past executions with status indicators
- **Code Detection**: Automatically renders code in terminal-style view (black bg, green text)
- **Production-Ready**: No mockups, fallbacks, or incomplete integrations

## Core Features

- Universal NLP interface supporting any natural language task
- **5 Groq AI models to choose from:**
  - GPT OSS 120B (most powerful, supports reasoning & tools)
  - Llama 4 Maverick 17B (fast & efficient)
  - Llama 4 Scout 17B (optimized for speed)
  - Kimi K2 Instruct (balanced performance)
  - Llama 3.3 70B Versatile (versatile for various tasks)
- Automatic intent detection and routing
- Support for summarization, translation, sentiment analysis, entity extraction, text generation, and custom tasks
- crewAI agent orchestration with Groq LLM integration
- Modern, accessible UI with high-contrast design
- Secure API key handling (memory-only, never persisted)
- Rate limiting and input sanitization
- CI/CD pipeline with GitHub Actions

## Architecture

- **Frontend**: React + Vite + Tailwind CSS (Two-pane layout with live execution tracking)
- **Backend**: FastAPI + Groq API (with optional crewAI for local development)
- **Deployment**: Vercel-optimized (lightweight dependencies for serverless)

**Note**: The Vercel deployment uses direct Groq API calls to stay within the 250MB serverless function limit. For local development with full crewAI features, use `backend/requirements.txt`.

## New Interface Design

### Two-Pane Layout
```
┌─────────────────────────────────────────────────────┐
│         Header: Logo | Model Selector | API Key      │
├──────────────────────┬──────────────────────────────┤
│   Execution Pane     │      Output Pane             │
│   • Real-time logs   │  • Generated output          │
│   • Execution history│  • Code/text detection       │
│   • Status tracking  │  • Terminal-style rendering  │
├──────────────────────┴──────────────────────────────┤
│   Chat Input: Quick Examples | Text Input | Execute │
└─────────────────────────────────────────────────────┘
```

### Key Features
- **Left Pane**: Live execution tracking with color-coded logs and execution history
- **Right Pane**: Intelligent output rendering with automatic code detection
- **Bottom Bar**: Chat-style input with quick example buttons
- **Terminal-Style Code**: Automatically detects and renders code with black background and green text
- **Execution History**: Tracks all executions with status indicators (running/completed/failed

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.11 (required for crewAI)
- Groq API key ([Get one here](https://console.groq.com))

### Backend Setup

```bash
cd backend
python3.11 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your configuration
uvicorn app.main:app --reload
```

Backend runs on `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with backend URL
npm run dev
```

Frontend runs on `http://localhost:5173`

## API Endpoints

### GET /api/models

List all available Groq models.

**Response:**
```json
{
  "models": [
    {
      "id": "openai/gpt-oss-120b",
      "name": "GPT OSS 120B",
      "description": "Most powerful model with reasoning and tools support",
      "max_tokens": 65536,
      "supports_reasoning": true,
      "supports_tools": true
    },
    ...
  ]
}
```

### POST /api/process

Process natural language requests with automatic intent detection.

**Request:**
```json
{
  "text": "Your NLP task in natural language",
  "api_key": "gsk_...",
  "model": "openai/gpt-oss-120b",
  "options": {
    "temperature": 0.7,
    "max_tokens": 8192,
    "top_p": 1,
    "reasoning_effort": "medium",
    "enable_search": false,
    "enable_code": false
  }
}
```

**Response:**
```json
{
  "intent": "custom",
  "result": "...",
  "model": "openai/gpt-oss-120b",
  "tokens_used": 150,
  "processing_time": 1.23
}
```

## Environment Variables

See `.env.example` files in `frontend/` and `backend/` directories.

## Vercel Deployment

This application is configured for one-click deployment on Vercel.

### Deploy Steps

1. **Import to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel auto-detects configuration from `vercel.json`

2. **Add Environment Variables**
   - `GROQ_API_KEY`: Your Groq API key (required)
   - `VITE_API_URL`: Your Vercel URL (update after first deploy)
   - `CORS_ORIGINS`: Your Vercel URL (update after first deploy)

3. **Deploy**
   - Click "Deploy" and wait 2-3 minutes
   - Note your deployment URL

4. **Update Environment Variables**
   - Update `VITE_API_URL` and `CORS_ORIGINS` with your Vercel URL
   - Redeploy to apply changes

5. **Test**
   - Visit your Vercel URL
   - Enter your Groq API key in the UI
   - Submit a test task

### How It Works
- Frontend: Built with Vite, served as static files
- Backend: Runs as Vercel serverless functions via `/api/*` routes
- Auto-scaling: Vercel handles scaling automatically

## Security

- API keys stored in memory only, never persisted
- Input sanitization and validation
- Rate limiting per session
- CORS configuration for production
- No sensitive data logging

