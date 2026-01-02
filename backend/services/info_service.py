"""Serviço de informações gerais (barbeiros, serviços, notificações, relatórios)."""
from database import db
from datetime import datetime, timedelta


def list_barbers():
    """Lista todos os barbeiros."""
    professionals = db.get_all_professionals()
    return professionals


def list_services():
    """Lista todos os serviços."""
    services = db.get_all_services()
    return services


def list_notifications():
    """Lista notificações (placeholder - implementar conforme necessário)."""
    # TODO: Implementar sistema de notificações
    return []


def report_week():
    """Gera relatório da semana."""
    # Calcular data de início da semana (7 dias atrás)
    today = datetime.now()
    week_ago = today - timedelta(days=7)
    week_ago_str = week_ago.strftime("%Y-%m-%d")
    
    # Buscar agendamentos da semana
    # TODO: Implementar busca por período no Supabase
    appointments = []  # Placeholder
    
    # Calcular estatísticas
    total_appointments = len(appointments)
    completed = len([a for a in appointments if a.get('status') == "concluido"])
    cancelled = len([a for a in appointments if a.get('status') == "cancelado"])
    pending = len([a for a in appointments if a.get('status') == "agendado"])
    
    # Calcular receita (apenas agendamentos concluídos)
    revenue = sum(a.get('total_price', 0) or 0 for a in appointments if a.get('status') == "concluido")
    
    return {
        "period": f"{week_ago_str} até {today.strftime('%Y-%m-%d')}",
        "total_appointments": total_appointments,
        "completed": completed,
        "cancelled": cancelled,
        "pending": pending,
        "revenue": revenue
    }
