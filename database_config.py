#!/usr/bin/env python3
"""
Configuração centralizada do banco de dados MySQL
Lê as configurações do arquivo .env
"""

import os
import pymysql
from dotenv import load_dotenv
from urllib.parse import unquote

# Carregar variáveis de ambiente
load_dotenv()

def get_database_connection():
    """
    Retorna uma conexão com o banco de dados MySQL
    usando as configurações do .env
    """
    database_url = os.getenv('DATABASE_URL')
    
    if not database_url:
        raise ValueError("DATABASE_URL não encontrada no arquivo .env")
    
    # Formato esperado: root@localhost:3306@senha@database
    # ou: usuario@host:porta@senha@database
    parts = database_url.split('@')
    
    if len(parts) < 4:
        raise ValueError(f"Formato inválido de DATABASE_URL. Esperado: usuario@host:porta@senha@database")
    
    user = parts[0]
    host_port = parts[1]
    password = unquote(parts[2])  # Decodificar URL encoding (ex: %40 -> @)
    database = parts[3]
    
    # Separar host e porta
    if ':' in host_port:
        host, port = host_port.split(':')
        port = int(port)
    else:
        host = host_port
        port = 3306
    
    # Criar conexão
    connection = pymysql.connect(
        host=host,
        port=port,
        user=user,
        password=password,
        database=database,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )
    
    return connection

def get_database_config():
    """
    Retorna um dicionário com as configurações do banco de dados
    """
    database_url = os.getenv('DATABASE_URL')
    
    if not database_url:
        raise ValueError("DATABASE_URL não encontrada no arquivo .env")
    
    parts = database_url.split('@')
    
    if len(parts) < 4:
        raise ValueError(f"Formato inválido de DATABASE_URL")
    
    user = parts[0]
    host_port = parts[1]
    password = unquote(parts[2])  # Decodificar URL encoding (ex: %40 -> @)
    database = parts[3]
    
    if ':' in host_port:
        host, port = host_port.split(':')
        port = int(port)
    else:
        host = host_port
        port = 3306
    
    return {
        'host': host,
        'port': port,
        'user': user,
        'password': password,
        'database': database
    }

if __name__ == "__main__":
    # Teste de conexão
    try:
        config = get_database_config()
        print("=== CONFIGURAÇÃO DO BANCO DE DADOS ===")
        print(f"Host: {config['host']}")
        print(f"Porta: {config['port']}")
        print(f"Usuário: {config['user']}")
        print(f"Database: {config['database']}")
        
        print("\n=== TESTANDO CONEXÃO ===")
        conn = get_database_connection()
        print("✅ Conexão estabelecida com sucesso!")
        
        cursor = conn.cursor()
        cursor.execute("SELECT VERSION()")
        version = cursor.fetchone()
        print(f"Versão do MySQL: {version}")
        
        conn.close()
        
    except Exception as e:
        print(f"❌ Erro: {e}")
