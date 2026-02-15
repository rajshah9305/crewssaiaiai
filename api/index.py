import sys
import os

# Add the backend directory to sys.path so that 'app' can be imported
# The directory structure is:
# /
#   api/index.py
#   backend/
#     app/
#       main.py
#       ...
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend'))
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

from app.main import app
