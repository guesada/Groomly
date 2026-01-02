"""Serviço de gerenciamento de agendamentos."""
from flask import session
from database import db
from datetime import datetime
import uuid


def list_appointments_for_user():
    """Lista agendamentos do usuário atual."""
    email = session.get("usuario_email")
    tipo = session.get("usuario_tipo")
    user_id = session.get("usuario_id")
    
    if tipo == "barbeiro":
        # Barbeiro vê seus próprios agendamentos
        appointments = db.get_appointments_by_professional(user_id)
    else:
        # Cliente vê seus agendamentos
        appointments = db.get_appointments_by_client(user_id)
    
    return appointments


def list_appointments_for_barber(barber_id, date=None):
    """Lista agendamentos de um barbeiro específico."""
    if date:
        appointments = db.get_appointments_by_date(date, barber_id)
    else:
        appointments = db.get_appointments_by_professional(barber_id)
    
    return appointments


def create_appointment(data):
    """Cria um novo agendamento."""
    appointment_id = str(uuid.uuid4())
    
    appointment_data = {
        'id': appointment_id,
        'cliente': session.get("usuario_nome"),
        'cliente_email': session.get("usuario_email"),
        'cliente_id': session.get("usuario_id"),
        'profissional': data.get("barberName"),
        'profissional_id': data.get("barberId"),
        'servico': data.get("serviceName"),
        'servico_id': data.get("serviceId"),
        'date': data.get("date"),
        'time': data.get("time"),
        'status': "agendado",
        'total_price': data.get("totalPrice", 0.0),
        'created_at': datetime.utcnow().isoformat()
    }
    
    result = db.create_appointment(appointment_data)
    return result


def cancel_appointment_by_id(appointment_id):
    """Cancela um agendamento."""
    result = db.update_appointment(appointment_id, {'status': 'cancelado'})
    return result is not None


def update_appointment_status(appointment_id, status):
    """Atualiza o status de um agendamento."""
    result = db.update_appointment(appointment_id, {'status': status})
    return result is not None
