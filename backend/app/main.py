from fastapi import FastAPI
from app.services.ai.orchestrator import ai_pipeline

app = FastAPI(
    title="AI DevSecOps Platform",
    description="AI-powered DevSecOps security platform",
    version="0.1.0",
)

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/api/analyze")
async def analyze_finding(finding: dict):
    """
    Reçoit une faille de sécurité brute et déclenche tous les agents LangGraph.
    """
    initial_state = {"raw_finding": finding}
    result = ai_pipeline.invoke(initial_state)
    return result

