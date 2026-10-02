from fastapi import FastAPI

app = FastAPI(
    title="AI DevSecOps Platform",
    description="AI-powered DevSecOps security platform",
    version="0.1.0",
)

@app.get("/health")
def health():
    return {"status": "healthy"}
