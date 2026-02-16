import os
import sys

# Ensure the backend package is importable in Vercel's serverless runtime.
# __file__ resolves to /var/task/api/index.py; backend lives at /var/task/backend.
_backend_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "backend")
if _backend_path not in sys.path:
    sys.path.insert(0, _backend_path)

from app.main import app  # noqa: E402

# Vercel's Python runtime looks for an `app` ASGI/WSGI object in this module.
# The import above exposes it as `app`.
