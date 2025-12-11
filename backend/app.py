# Desabilita criação de __pycache__
import sys
sys.dont_write_bytecode = True

# Importações necessárias do Flask e extensões
from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO

# Importa o registro de rotas e serviços da aplicação
from routes import register_routes
import services

# Cria a instância principal da aplicação Flask
app = Flask(__name__)

# Configurar CORS para permitir credenciais (cookies de sessão)
# Permite requisições do frontend (porta 3000) e backend (porta 5001)
CORS(app, 
     supports_credentials=True, 
     origins=[
         "http://localhost:3000",  # Frontend React
         "http://127.0.0.1:3000",  # Frontend React
     ],
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

# Inicializa SocketIO para comunicação em tempo real
import os
is_production = os.environ.get('RENDER', False)
async_mode = 'gevent' if is_production else 'threading'

socketio = SocketIO(app, cors_allowed_origins=[
    "http://localhost:3000", "http://127.0.0.1:3000",  # Frontend React
    "http://localhost:5001", "http://127.0.0.1:5001"   # Backend Flask
], manage_session=False, async_mode=async_mode)

# Chave secreta para criptografia de sessões e cookies
app.secret_key = "corte_digital_2025_secret_key"

# Configurações da aplicação
app.config["JSON_SORT_KEYS"] = False  # Mantém a ordem original das chaves JSON nas respostas
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"  # Permite cookies em desenvolvimento
app.config["SESSION_COOKIE_SECURE"] = False  # Permite cookies sem HTTPS em desenvolvimento
app.config["SESSION_COOKIE_HTTPONLY"] = False  # Permite acesso via JavaScript em desenvolvimento
app.config["SESSION_COOKIE_DOMAIN"] = None  # Permite cookies em localhost
app.config["SESSION_PERMANENT"] = False  # Sessão não permanente

# Inicializa a conexão com o banco de dados e carrega dados iniciais
services.init_app(app)

# Cria tabelas do sistema dentro do contexto da aplicação
with app.app_context():
    try:
        print("📊 Criando tabelas do sistema...")
        # Tabelas são criadas automaticamente pelo SQLAlchemy
        print("✅ Todas as tabelas criadas!")
    except Exception as e:
        print(f"⚠️  Aviso ao criar tabelas: {e}")

# Registra todas as rotas da aplicação (endpoints)
print("🔌 Registrando rotas...")
register_routes(app)


@app.before_request
def auto_complete_appointments():
    """
    Middleware executado antes de cada requisição HTTP.
    Verifica e marca automaticamente como concluídos os agendamentos
    que já passaram da data/hora agendada.
    """
    try:
        services.auto_complete_past_appointments()
    except Exception as e:
        # Não bloqueia a requisição se houver erro na verificação automática
        print(f"Erro ao auto-completar agendamentos: {e}")


@app.errorhandler(404)
def handler_404(_):
    """
    Manipulador de erro 404 - Rota não encontrada.
    Retorna uma resposta JSON padronizada quando o endpoint não existe.
    """
    return jsonify({"success": False, "message": "Rota não encontrada"}), 404


@app.errorhandler(500)
def handler_500(erro):
    """
    Manipulador de erro 500 - Erro interno do servidor.
    Retorna uma resposta JSON com a mensagem do erro.
    """
    return jsonify({"success": False, "message": str(erro)}), 500


@app.errorhandler(Exception)
def handler_exception(erro):
    """
    Manipulador genérico de exceções.
    Captura todos os erros não tratados, imprime o traceback completo
    no console e retorna uma resposta JSON com a mensagem de erro.
    """
    import traceback
    traceback.print_exc()  # Imprime o stack trace completo no console para debug
    return jsonify({"success": False, "message": str(erro)}), 500


if __name__ == "__main__":
    import os
    from pathlib import Path
    import shutil
    
    # Limpa __pycache__ ao iniciar
    print("🧹 Limpando cache...")
    for pycache in Path('.').rglob('__pycache__'):
        try:
            shutil.rmtree(pycache)
        except:
            pass
    
    # Inicia o servidor Flask com SocketIO
    # Em produção, usa a porta do ambiente. Em desenvolvimento, usa 5001
    port = int(os.environ.get("PORT", 5001))
    host = os.environ.get("HOST", "127.0.0.1")
    debug = os.environ.get("DEBUG", "True") == "True"
    
    print("=" * 60)
    print("  🚀 CORTE DIGITAL - Servidor Iniciando")
    print("=" * 60)
    print(f"  📍 Endereço: http://{host}:{port}")
    print(f"  🔧 Modo: {'Produção' if os.environ.get('RENDER') else 'Desenvolvimento'}")
    print(f"  🔌 Async mode: {async_mode}")
    print("=" * 60)
    print()
    
    socketio.run(app, host=host, port=port, debug=debug, allow_unsafe_werkzeug=True)