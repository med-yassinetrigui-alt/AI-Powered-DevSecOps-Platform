import os
from typing import Dict, Any
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser, StrOutputParser
from .state import DevSecOpsState

# Initialisation du LLM ultra-rapide de Groq
llm = ChatGroq(
    model="openai/gpt-oss-120b",
    temperature=0,
    api_key=os.getenv("GROQ_API_KEY")
)

def security_analyzer_node(state: DevSecOpsState) -> Dict[str, Any]:
    raw_finding = state.get("raw_finding", {})
    print("[Agent] Security Analyzer: Analyse en cours par Groq...")
    
    prompt = PromptTemplate.from_template(
        "Tu es un Analyste en Sécurité DevSecOps. Extrais les informations techniques de cette faille provenant d'un scanner.\n\n"
        "Faille brute: {finding}\n\n"
        "Réponds UNIQUEMENT avec un objet JSON valide contenant 3 clés: 'title' (titre clair), 'category' (SAST, Secret, Dependency...), et 'description' (description technique brève)."
    )
    chain = prompt | llm | JsonOutputParser()
    
    try:
        structured_vuln = chain.invoke({"finding": str(raw_finding)})
    except Exception as e:
        structured_vuln = {"title": "Erreur d'analyse", "category": "Erreur", "description": str(e)}
        
    return {"structured_vuln": structured_vuln, "current_step": "analyzer"}

def risk_assessment_node(state: DevSecOpsState) -> Dict[str, Any]:
    vuln = state.get("structured_vuln", {})
    print("[Agent] Risk Assessor: Évaluation du risque par Groq...")
    
    prompt = PromptTemplate.from_template(
        "Tu es un Expert en Évaluation des Risques (Risk Assessor). Évalue la criticité de cette vulnérabilité.\n"
        "Titre: {title}\nCatégorie: {category}\nDescription: {description}\n\n"
        "Réponds UNIQUEMENT avec un objet JSON valide contenant 3 clés: 'severity' (LOW, MEDIUM, HIGH, ou CRITICAL), 'cvss_score' (nombre entre 0 et 10), 'business_impact' (impact métier court en français)."
    )
    chain = prompt | llm | JsonOutputParser()
    
    try:
        risk = chain.invoke(vuln)
    except Exception:
        risk = {"severity": "UNKNOWN", "cvss_score": 0, "business_impact": "Impossible d'évaluer le risque"}
        
    return {"risk_assessment": risk, "current_step": "risk"}

def explainer_node(state: DevSecOpsState) -> Dict[str, Any]:
    vuln = state.get("structured_vuln", {})
    risk = state.get("risk_assessment", {})
    print("[Agent] Explainer: Vulgarisation de la faille par Groq...")
    
    prompt = PromptTemplate.from_template(
        "Tu es un Formateur en Cybersécurité. Explique cette vulnérabilité en 2 ou 3 phrases simples en français pour qu'un développeur junior puisse la comprendre.\n"
        "Titre: {title}\nSévérité: {severity}\nDescription: {description}\n\n"
        "Explication :"
    )
    chain = prompt | llm | StrOutputParser()
    explanation = chain.invoke({"title": vuln.get("title"), "severity": risk.get("severity"), "description": vuln.get("description")})
    
    return {"explanation": explanation.strip(), "current_step": "explainer"}

def remediation_node(state: DevSecOpsState) -> Dict[str, Any]:
    vuln = state.get("structured_vuln", {})
    raw_finding = state.get("raw_finding", {})
    print("[Agent] Remediation: Génération et application du correctif via GitHub...")
    
    prompt = PromptTemplate.from_template(
        "Tu es un Ingénieur DevSecOps. Propose une correction complète pour cette vulnérabilité.\n"
        "Titre: {title}\nDescription: {description}\nFichier cible: {file}\n\n"
        "Réponds UNIQUEMENT avec un objet JSON valide contenant 3 clés: "
        "'file_path' (le chemin exact du fichier à corriger), "
        "'new_content' (le code complet du fichier une fois corrigé), "
        "et 'pr_title' (un titre anglais pour la Pull Request)."
    )
    chain = prompt | llm | JsonOutputParser()
    
    try:
        # On extrait le nom du fichier si le scanner l'a trouvé, sinon on met "inconnu"
        file_target = raw_finding.get("file", "inconnu")
        
        fix_plan = chain.invoke({
            "title": vuln.get("title"), 
            "description": vuln.get("description"),
            "file": file_target
        })
        
        # Appel du service GitHub pour créer la PR
        from app.services.github_service import create_remediation_pr
        
        pr_url = create_remediation_pr(
            repo_name="med-yassinetrigui-alt/AI-Powered-DevSecOps-Platform",
            file_path=fix_plan.get("file_path", file_target),
            new_content=fix_plan.get("new_content", ""),
            pr_title=fix_plan.get("pr_title", "Fix: Security Vulnerability"),
            pr_body=f"🤖 **Remédiation automatique par l'IA Groq**\n\n**Faille détectée :** {vuln.get('title')}\n\n{vuln.get('description')}"
        )
        
        remediation_result = f"Correctif généré avec succès ! Une Pull Request a été ouverte automatiquement ici : {pr_url}"
    except Exception as e:
        remediation_result = f"Le correctif a été pensé, mais la création de la Pull Request a échoué : {str(e)}"
    
    return {"remediation_plan": remediation_result, "current_step": "remediation"}
