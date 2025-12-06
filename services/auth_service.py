"""Serviço de autenticação e autorização."""
from flask import session
from db import db, Cliente, Professional
from werkzeug.security import generate_password_hash, check_password_hash
import json


def authenticate_user(email, password):
    """Autentica um usuário (cliente ou profissional)."""
    # Tentar como cliente
    cliente = Cliente.query.filter_by(email=email).first()
    if cliente and check_password_hash(cliente.senha, password):
        return {**cliente.to_dict(), "tipo": "cliente"}
    
    # Tentar como profissional
    profissional = Professional.query.filter_by(email=email).first()
    if profissional and check_password_hash(profissional.senha, password):
        # Retornar como 'barbeiro' para compatibilidade com o frontend
        return {**profissional.to_dict(), "tipo": "barbeiro"}
    
    return None


def register_user(nome, email, password, tipo="cliente", telefone=None, categoria=None, servicos=None):
    """Registra um novo usuário."""
    # Verificar se email já existe
    if Cliente.query.filter_by(email=email).first() or Professional.query.filter_by(email=email).first():
        return False
    
    senha_hash = generate_password_hash(password)
    
    if tipo in ["barbeiro", "profissional"]:
        # Criar profissional
        user = Professional(
            nome=nome,
            email=email,
            senha=senha_hash,
            telefone=telefone,
            categoria=categoria or "Barbeiro",
            especialidades=json.dumps(servicos or []),
            ativo=True
        )
    else:
        # Criar cliente
        user = Cliente(nome=nome, email=email, senha=senha_hash, telefone=telefone)
    
    db.session.add(user)
    db.session.commit()
    return True


def exigir_login(tipo_requerido=None):
    """Verifica se o usuário está logado. Opcionalmente verifica o tipo."""
    if "usuario_email" not in session:
        return False
    
    if tipo_requerido and session.get("usuario_tipo") != tipo_requerido:
        return False
    
    return True


def usuario_atual():
    """Retorna os dados do usuário atual da sessão."""
    if not exigir_login():
        return None
    
    email = session.get("usuario_email")
    tipo = session.get("usuario_tipo")
    
    if tipo == "barbeiro":
        user = Professional.query.filter_by(email=email).first()
    else:
        user = Cliente.query.filter_by(email=email).first()
    
    return user.to_dict() if user else None
