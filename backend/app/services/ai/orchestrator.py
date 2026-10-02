from langgraph.graph import StateGraph, END
from .state import DevSecOpsState
from .agents import (
    security_analyzer_node,
    risk_assessment_node,
    explainer_node,
    remediation_node
)

def build_orchestrator():
    # Initialiser le graphe avec notre état
    workflow = StateGraph(DevSecOpsState)

    # 1. Ajouter les "Nœuds" (Nos Agents)
    workflow.add_node("analyzer", security_analyzer_node)
    workflow.add_node("risk_assessor", risk_assessment_node)
    workflow.add_node("explainer", explainer_node)
    workflow.add_node("remediator", remediation_node)

    # 2. Définir le point de départ
    workflow.set_entry_point("analyzer")

    # 3. Définir les "Chemins" (Edges)
    workflow.add_edge("analyzer", "risk_assessor")
    workflow.add_edge("risk_assessor", "explainer")
    workflow.add_edge("explainer", "remediator")
    workflow.add_edge("remediator", END) # Fin du processus

    # Compiler le graphe
    return workflow.compile()

# On instancie notre pipeline d'IA
ai_pipeline = build_orchestrator()
