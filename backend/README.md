# Groomly Backend

Backend da plataforma Groomly desenvolvido em Python com Flask.

## Estrutura do Projeto

```
backend/
├── app.py                 # Aplicação principal Flask
├── config.py             # Configurações da aplicação
├── constants.py          # Constantes do sistema
├── database_config.py    # Configuração do banco de dados
├── db.py                # Conexão com banco de dados
├── requirements.txt      # Dependências Python
├── reset_database.py     # Script para resetar o banco
├── start.py             # Script de inicialização
├── routes/              # Rotas da API
│   ├── __init__.py
│   ├── analytics.py
│   ├── auth.py
│   ├── chat.py
│   ├── notifications.py
│   └── reviews.py
└── services/            # Serviços de negócio
    ├── __init__.py
    ├── ai_recommendation_service.py
    ├── analytics_service.py
    ├── appointment_service.py
    ├── auth_service.py
    ├── chat_service.py
    ├── info_service.py
    ├── notification_service.py
    ├── review_service.py
    └── validation_service.py
```

## Como Executar

### 1. Instalar Dependências

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
DEBUG=True
HOST=127.0.0.1
PORT=5001
```

### 3. Iniciar o Servidor

```bash
python start.py
```

Ou diretamente:

```bash
python app.py
```

## API Endpoints

O backend fornece uma API REST completa para:

- **Autenticação** (`/api/auth/*`)
- **Agendamentos** (`/api/appointments/*`)
- **Chat** (`/api/chat/*`)
- **Notificações** (`/api/notifications/*`)
- **Analytics** (`/api/analytics/*`)
- **Avaliações** (`/api/reviews/*`)

## WebSocket

O backend também suporta comunicação em tempo real via WebSocket para:

- Chat em tempo real
- Notificações push
- Atualizações de agendamentos

## Banco de Dados

Utiliza SQLite para desenvolvimento e PostgreSQL para produção.

Para resetar o banco de dados:

```bash
python reset_database.py
```