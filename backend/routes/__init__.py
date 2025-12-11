"""Registro das rotas (blueprints) do Corte Digital."""

from . import appointments, info, barber_prices
from .auth import register_auth_routes
from .user import register_user_routes


def register_routes(app):
    """Registra todos os blueprints no app Flask principais."""

    register_auth_routes(app)  # Rotas de autenticação
    register_user_routes(app)  # Rotas de dados do usuário
    app.register_blueprint(info.info_bp)
    app.register_blueprint(appointments.appointments_bp)
    app.register_blueprint(barber_prices.barber_prices_bp)
