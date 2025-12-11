#!/usr/bin/env python3
"""
Script de inicialização do backend Groomly
"""

import os
import sys
from pathlib import Path

# Adiciona o diretório backend ao Python path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

# Importa e executa a aplicação
if __name__ == "__main__":
    from app import app, socketio
    
    # Configurações do servidor
    port = int(os.environ.get("PORT", 5001))
    host = os.environ.get("HOST", "127.0.0.1")
    debug = os.environ.get("DEBUG", "True") == "True"
    
    print("=" * 60)
    print("  🚀 GROOMLY BACKEND - Servidor Iniciando")
    print("=" * 60)
    print(f"  📍 Endereço: http://{host}:{port}")
    print(f"  🔧 Modo: {'Produção' if os.environ.get('RENDER') else 'Desenvolvimento'}")
    print("=" * 60)
    print()
    
    # Inicia o servidor
    socketio.run(app, host=host, port=port, debug=debug, allow_unsafe_werkzeug=True)