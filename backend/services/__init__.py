"""Services Package - Serviços principais da aplicação."""

# Serviços de autenticação
from .auth_service import (
    authenticate_user,
    register_user,
    exigir_login,
    usuario_atual
)

# Serviços de agendamento
from .appointment_service import (
    list_appointments_for_user,
    list_appointments_for_barber,
    create_appointment,
    cancel_appointment_by_id,
    update_appointment_status,
    auto_complete_past_appointments
)

# Serviços de informações
from .info_service import (
    list_barbers,
    list_services,
    list_notifications,
    report_week
)


def init_app(app):
    """Inicializa serviços com a aplicação Flask."""
    from db import db
    import os
    
    # Configuração MySQL direta
    from urllib.parse import quote_plus
    
    # Credenciais MySQL diretas
    user = 'root'
    password = 'pjn@2024'
    host = 'localhost'
    port = 3306
    database = 'CorteDigital'
    
    # Codifica a senha para URL
    password_encoded = quote_plus(password)
    
    # Formato SQLAlchemy
    sqlalchemy_uri = f'mysql+pymysql://{user}:{password_encoded}@{host}:{port}/{database}?charset=utf8mb4'
    
    app.config['SQLALCHEMY_DATABASE_URI'] = sqlalchemy_uri
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    with app.app_context():
        db.create_all()


__all__ = [
    'authenticate_user',
    'register_user',
    'exigir_login',
    'usuario_atual',
    'list_appointments_for_user',
    'list_appointments_for_barber',
    'create_appointment',
    'cancel_appointment_by_id',
    'update_appointment_status',
    'auto_complete_past_appointments',
    'list_barbers',
    'list_services',
    'list_notifications',
    'report_week',
    'init_app'
]
