import os
import uuid
from github import Github
from github.GithubException import GithubException

def create_remediation_pr(repo_name: str, file_path: str, new_content: str, pr_title: str, pr_body: str) -> str:
    """
    Connecte l'IA à GitHub pour créer une Pull Request corrective.
    repo_name: "votre-pseudo/AI-Powered-DevSecOps-Platform"
    """
    token = os.getenv("GITHUB_TOKEN")
    if not token:
        raise ValueError("ERREUR: GITHUB_TOKEN manquant dans le fichier .env !")
        
    g = Github(token)
    repo = g.get_repo(repo_name)
    
    # Génération d'un nom de branche unique
    branch_name = f"ai-remediation/{uuid.uuid4().hex[:8]}"
    
    # Récupération de la branche par défaut (main ou master)
    default_branch = repo.default_branch
    sb = repo.get_branch(default_branch)
    
    # Création de la nouvelle branche
    repo.create_git_ref(ref=f"refs/heads/{branch_name}", sha=sb.commit.sha)
    
    try:
        # Récupération de l'ancien fichier
        file_content = repo.get_contents(file_path, ref=branch_name)
        
        # Mise à jour du fichier avec la correction de l'IA
        repo.update_file(
            path=file_content.path,
            message=f"fix(security): {pr_title}",
            content=new_content,
            sha=file_content.sha,
            branch=branch_name
        )
    except GithubException as e:
        if e.status == 404:
            raise ValueError(f"Le fichier {file_path} est introuvable sur le dépôt.")
        raise e
        
    # Création de la Pull Request
    pr = repo.create_pull(
        title=pr_title,
        body=pr_body,
        head=branch_name,
        base=default_branch
    )
    
    return pr.html_url
