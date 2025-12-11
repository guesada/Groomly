"""Rotas de autenticação - Login, Registro, etc."""

from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from db import db, Cliente, Professional
import re

auth_bp = Blueprint('auth', __name__)

def validate_email(email):
    """Valida formato do email"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_phone(phone):
    """Valida formato do telefone brasileiro"""
    # Remove caracteres não numéricos
    phone_clean = re.sub(r'[^\d]', '', phone)
    # Verifica se tem 10 ou 11 dígitos (com DDD)
    return len(phone_clean) in [10, 11]

@auth_bp.route('/api/auth/register', methods=['POST'])
def register():
    """Registra um novo usuário (cliente ou profissional)"""
    try:
        data = request.get_json()
        
        # Validações básicas
        required_fields = ['name', 'email', 'password', 'phone', 'userType']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'message': f'Campo {field} é obrigatório'
                }), 400
        
        name = data['name'].strip()
        email = data['email'].strip().lower()
        password = data['password']
        phone = data['phone'].strip()
        user_type = data['userType']  # 'client' ou 'professional'
        
        # Validações
        if len(name) < 2:
            return jsonify({
                'success': False,
                'message': 'Nome deve ter pelo menos 2 caracteres'
            }), 400
        
        if not validate_email(email):
            return jsonify({
                'success': False,
                'message': 'Email inválido'
            }), 400
        
        if len(password) < 6:
            return jsonify({
                'success': False,
                'message': 'Senha deve ter pelo menos 6 caracteres'
            }), 400
        
        if not validate_phone(phone):
            return jsonify({
                'success': False,
                'message': 'Telefone inválido'
            }), 400
        
        # Verifica se email já existe
        existing_client = Cliente.query.filter_by(email=email).first()
        existing_professional = Professional.query.filter_by(email=email).first()
        
        if existing_client or existing_professional:
            return jsonify({
                'success': False,
                'message': 'Email já cadastrado'
            }), 400
        
        # Hash da senha
        password_hash = generate_password_hash(password)
        
        if user_type == 'client':
            # Registra cliente
            new_user = Cliente(
                nome=name,
                email=email,
                senha=password_hash,
                telefone=phone,
                endereco=data.get('address', '')
            )
            
        elif user_type == 'professional':
            # Validações específicas para profissionais
            specialty = data.get('specialty')
            address = data.get('address')
            
            if not specialty:
                return jsonify({
                    'success': False,
                    'message': 'Especialidade é obrigatória para profissionais'
                }), 400
            
            if not address:
                return jsonify({
                    'success': False,
                    'message': 'Endereço é obrigatório para profissionais'
                }), 400
            
            # Mapeia especialidades para categorias
            specialty_map = {
                'barbeiro': 'Barbeiro',
                'cabeleireiro': 'Cabeleireira',
                'manicure': 'Manicure',
                'esteticista': 'Esteticista',
                'maquiador': 'Maquiadora'
            }
            
            categoria = specialty_map.get(specialty, 'Profissional de Beleza')
            
            # Registra profissional
            new_user = Professional(
                nome=name,
                email=email,
                senha=password_hash,
                telefone=phone,
                endereco=address,
                categoria=categoria,
                especialidades='[]',  # Será configurado depois
                preco_base=50.0,  # Preço padrão
                disponibilidade='[]',  # Será configurado depois
                bio=f'Profissional especializado em {categoria.lower()}.',
                ativo=True
            )
        else:
            return jsonify({
                'success': False,
                'message': 'Tipo de usuário inválido'
            }), 400
        
        # Salva no banco
        db.session.add(new_user)
        db.session.commit()
        
        # Cria sessão
        session['user_id'] = new_user.id
        session['user_type'] = user_type
        session['user_name'] = name
        
        return jsonify({
            'success': True,
            'message': 'Usuário registrado com sucesso!',
            'user': {
                'id': new_user.id,
                'name': name,
                'email': email,
                'type': user_type
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print(f"Erro no registro: {e}")
        return jsonify({
            'success': False,
            'message': 'Erro interno do servidor'
        }), 500

@auth_bp.route('/api/auth/login', methods=['POST'])
def login():
    """Faz login do usuário"""
    try:
        data = request.get_json()
        
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        
        if not email or not password:
            return jsonify({
                'success': False,
                'message': 'Email e senha são obrigatórios'
            }), 400
        
        # Busca usuário (cliente ou profissional)
        user = None
        user_type = None
        
        client = Cliente.query.filter_by(email=email).first()
        if client:
            user = client
            user_type = 'client'
        else:
            professional = Professional.query.filter_by(email=email).first()
            if professional:
                user = professional
                user_type = 'professional'
        
        if not user or not check_password_hash(user.senha, password):
            return jsonify({
                'success': False,
                'message': 'Email ou senha incorretos'
            }), 401
        
        # Cria sessão
        session['user_id'] = user.id
        session['user_type'] = user_type
        session['user_name'] = user.nome
        
        print(f"DEBUG: Login successful. Session created: {dict(session)}")
        
        return jsonify({
            'success': True,
            'message': 'Login realizado com sucesso!',
            'user': {
                'id': user.id,
                'name': user.nome,
                'email': user.email,
                'type': user_type
            },
            'redirect': f'/{user_type}' if user_type == 'client' else '/barbeiro'
        }), 200
        
    except Exception as e:
        print(f"Erro no login: {e}")
        return jsonify({
            'success': False,
            'message': 'Erro interno do servidor'
        }), 500

@auth_bp.route('/api/auth/logout', methods=['POST'])
def logout():
    """Faz logout do usuário"""
    session.clear()
    return jsonify({
        'success': True,
        'message': 'Logout realizado com sucesso!'
    }), 200

@auth_bp.route('/api/auth/test', methods=['GET'])
def test_auth():
    """Rota de teste para verificar se a API está funcionando"""
    return jsonify({
        'success': True,
        'message': 'API funcionando!',
        'session_data': dict(session)
    }), 200

@auth_bp.route('/api/auth/me', methods=['GET'])
def get_current_user():
    """Retorna informações do usuário logado"""
    try:
        user_id = session.get('user_id')
        user_type = session.get('user_type')
        
        print(f"DEBUG: Session data: {dict(session)}")
        print(f"DEBUG: user_id: {user_id}, user_type: {user_type}")
        
        if not user_id or not user_type:
            return jsonify({
                'success': False,
                'message': 'Usuário não autenticado'
            }), 401
        
        # Busca usuário
        if user_type == 'client':
            user = Cliente.query.get(user_id)
        else:
            user = Professional.query.get(user_id)
        
        if not user:
            session.clear()
            return jsonify({
                'success': False,
                'message': 'Usuário não encontrado'
            }), 404
        
        return jsonify({
            'success': True,
            'user': {
                'id': user.id,
                'name': user.nome,
                'email': user.email,
                'type': user_type,
                'phone': user.telefone,
                'address': getattr(user, 'endereco', '')
            }
        }), 200
        
    except Exception as e:
        print(f"Erro ao buscar usuário: {e}")
        return jsonify({
            'success': False,
            'message': 'Erro interno do servidor'
        }), 500

def register_auth_routes(app):
    """Registra as rotas de autenticação"""
    app.register_blueprint(auth_bp)