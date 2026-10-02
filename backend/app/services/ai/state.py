from typing import TypedDict, Dict, Any

class DevSecOpsState(TypedDict):
    """
    C'est l'état qui sera partagé et modifié par tous nos agents LangGraph.
    """
    raw_finding: Dict[str, Any]      # Donnée brute provenant du scanner (Semgrep, Trivy...)
    structured_vuln: Dict[str, Any]  # Résultat de l'Agent 1 (Security Analyzer)
    risk_assessment: Dict[str, Any]  # Résultat de l'Agent 2 (Risk Assessor)
    explanation: str                 # Résultat de l'Agent 3 (Explainer)
    remediation_plan: str            # Résultat de l'Agent 4 (Remediation)
    current_step: str                # Pour suivre l'avancement
