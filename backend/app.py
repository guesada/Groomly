# Desabilita criação de __pycache__
import sys
sys.dont_write_bytecode = True

# Importações necessárias do Flask e extensões
from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO

# Importa configurações e banco de dados
from config import Config
from database import db

# Importa o registro de rotas
from routes import register_routes

# Cria a instância principal da aplicação Flask
app = Flask(__name__)

# Carrega configurações
app.config.from_object(Config)

# Configurar CORS para permitir credenciais (cookies de sessão)
CORS(app, 
     supports_credentials=True, 
     origins=Config.CORS_ORIGINS,
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

# Inicializa SocketIO para comunicação em tempo real
import os
is_production = os.environ.get('RENDER', False)
async_mode = 'gevent' if is_production else 'threading'

socketio = SocketIO(app, cors_allowed_origins=Config.CORS_ORIGINS, manage_session=False, async_mode=async_mode)

# Registra todas as rotas da aplicação (endpoints)
print("🔌 Registrando rotas...")
register_routes(app)


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
    print("=" * 60)
    print("  🚀 GROOMLY - Servidor Iniciando")
    print("=" * 60)
    print(f"  📍 Endereço: http://{Config.HOST}:{Config.PORT}")
    print(f"  🔧 Modo: {'Produção' if os.environ.get('RENDER') else 'Desenvolvimento'}")
    print(f"  🔌 Async mode: {async_mode}")
    print(f"  🗄️  Database: Supabase")
    print("=" * 60)
    print()
    
    socketio.run(app, host=Config.HOST, port=Config.PORT, debug=Config.DEBUG, allow_unsafe_werkzeug=True)