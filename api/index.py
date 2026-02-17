import os
import sys
import traceback

# Ensure the backend package is importable in Vercel's serverless runtime.
# __file__ resolves to /var/task/api/index.py; backend lives at /var/task/backend.
_backend_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "backend")
if _backend_path not in sys.path:
    sys.path.insert(0, _backend_path)

try:
    from app.main import app  # noqa: E402
except Exception as e:
    # If import fails, create a minimal FastAPI app to show the error
    print(f"ERROR: Failed to import app: {e}")
    print(traceback.format_exc())
    
    from fastapi import FastAPI
    from fastapi.responses import JSONResponse
    
    app = FastAPI()
    
    @app.get("/")
    @app.get("/api/{path:path}")
    @app.post("/api/{path:path}")
    async def error_handler():
        return JSONResponse(
            status_code=500,
            content={
                "error": "Function initialization failed",
                "detail": str(e),
                "traceback": traceback.format_exc()
            }
        )

# Vercel's Python runtime looks for an `app` ASGI/WSGI object in this module.
# The import above exposes it as `app`.
