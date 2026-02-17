from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/api/test")
async def test():
    return JSONResponse(content={"status": "ok", "message": "Python function is working"})

@app.get("/")
async def root():
    return JSONResponse(content={"status": "ok", "message": "Root endpoint working"})
