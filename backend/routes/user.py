"""Rotas para dados do usuário logado"""

from flask import Blueprint, request, jsonify, session
from db import db, Cliente, Professional, Appointment
from datetime import datetime, timedelta
import json

user_bp = Blueprint('user', __name__)

@user_bp.route('/api/user/dashboard', methods=['GET'])
def get_dashboard_data():
    """Retorna dados do dashboard do usuário logado"""
    try:
        user_id = session.get('user_id')
        user_type = session.get('user_type')
        
        if not user_id or not user_type:
            return jsonify({
                'success': False,
                'message': 'Usuário não autenticado'
            }), 401
        
        if user_type == 'client':
            return get_client_dashboard_data(user_id)
        else:
            return get_professional_dashboard_data(user_id)
            
    except Exception as e:
        print(f"Erro ao buscar dados do dashboard: {e}")
        return jsonify({
            'success': False,
            'message': 'Erro interno do servidor'
        }), 500

def get_client_dashboard_data(client_id):
    """Dados do dashboard do cliente"""
    client = Cliente.query.get(client_id)
    if not client:
        return jsonify({
            'success': False,
            'message': 'Cliente não encontrado'
        }), 404
    
    # Busca agendamentos do cliente
    appointments = Appointment.query.filter_by(cliente_id=client_id).all()
    
    # Separa agendamentos por status
    upcoming = []
    history = []
    
    today = datetime.now().date()
    
    for apt in appointments:
        apt_data = apt.to_dict()
        apt_date = datetime.strptime(apt.date, '%Y-%m-%d').date()
        
        if apt_date >= today and apt.status in ['agendado', 'confirmado']:
            upcoming.append(apt_data)
        else:
            history.append(apt_data)
    
    # Ordena por data
    upcoming.sort(key=lambda x: (x['date'], x['time']))
    history.sort(key=lambda x: (x['date'], x['time']), reverse=True)
    
    # Estatísticas
    total_appointments = len(appointments)
    total_spent = sum(apt.total_price or 0 for apt in appointments if apt.status == 'concluido')
    
    return jsonify({
        'success': True,
        'data': {
            'user': client.to_dict(),
            'upcoming_appointments': upcoming[:5],  # Próximos 5
            'recent_history': history[:5],  # Últimos 5
            'stats': {
                'total_appointments': total_appointments,
                'total_spent': total_spent,
                'upcoming_count': len(upcoming)
            }
        }
    }), 200

def get_professional_dashboard_data(professional_id):
    """Dados do dashboard do profissional"""
    professional = Professional.query.get(professional_id)
    if not professional:
        return jsonify({
            'success': False,
            'message': 'Profissional não encontrado'
        }), 404
    
    # Busca agendamentos do profissional
    appointments = Appointment.query.filter_by(profissional_id=professional_id).all()
    
    # Data de hoje
    today = datetime.now().date()
    today_str = today.strftime('%Y-%m-%d')
    
    # Agendamentos de hoje
    today_appointments = [
        apt.to_dict() for apt in appointments 
        if apt.date == today_str
    ]
    today_appointments.sort(key=lambda x: x['time'])
    
    # Estatísticas do mês atual
    month_start = today.replace(day=1)
    month_appointments = [
        apt for apt in appointments 
        if datetime.strptime(apt.date, '%Y-%m-%d').date() >= month_start
    ]
    
    # Receita do mês
    month_revenue = sum(
        apt.total_price or 0 
        for apt in month_appointments 
        if apt.status == 'concluido'
    )
    
    # Receita de hoje
    today_revenue = sum(
        apt.total_price or 0 
        for apt in appointments 
        if apt.date == today_str and apt.status == 'concluido'
    )
    
    # Clientes únicos do mês
    month_clients = len(set(apt.cliente_id for apt in month_appointments))
    
    return jsonify({
        'success': True,
        'data': {
            'user': professional.to_dict(),
            'today_appointments': today_appointments,
            'stats': {
                'today_revenue': today_revenue,
                'month_revenue': month_revenue,
                'today_clients': len(today_appointments),
                'month_clients': month_clients,
                'rating': professional.avaliacao,
                'total_reviews': professional.total_avaliacoes
            }
        }
    }), 200

def register_user_routes(app):
    """Registra as rotas de usuário"""
    app.register_blueprint(user_bp)