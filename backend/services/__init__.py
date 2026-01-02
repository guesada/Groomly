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
    update_appointment_status
)

# Serviços de informações
from .info_service import (
    list_barbers,
    list_services,
    list_notifications,
    report_week
)


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
    'list_barbers',
    'list_services',
    'list_notifications',
    'report_week'
]
