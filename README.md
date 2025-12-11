# 🚀 Groomly - Plataforma Profissional de Agendamento para Beleza

Uma plataforma moderna e completa para profissionais de beleza gerenciarem seus negócios com tecnologia de ponta.

## ✨ Características

- **Frontend Moderno**: React + TypeScript + Tailwind CSS
- **Backend Robusto**: Python Flask + WebSocket
- **Design Responsivo**: Interface elegante e profissional
- **Tempo Real**: Chat e notificações instantâneas
- **Analytics**: Relatórios e métricas detalhadas
- **Multi-plataforma**: Funciona em desktop e mobile

## 🏗️ Estrutura do Projeto

```
groomly/
├── frontend/           # React + TypeScript + Tailwind
│   ├── src/
│   │   ├── components/ # Componentes reutilizáveis
│   │   ├── pages/      # Páginas da aplicação
│   │   ├── styles/     # Estilos globais
│   │   └── utils/      # Utilitários
│   ├── package.json
│   └── vite.config.ts
├── backend/            # Python Flask API
│   ├── routes/         # Rotas da API
│   ├── services/       # Lógica de negócio
│   ├── app.py         # Aplicação principal
│   └── requirements.txt
├── images/            # Assets e imagens
└── .env              # Variáveis de ambiente
```

## 🚀 Como Executar

### Pré-requisitos

- **Node.js** 18+ e npm/yarn
- **Python** 3.8+
- **Git**

### 1. Clone o Repositório

```bash
git clone <repository-url>
cd groomly
```

### 2. Backend (Python Flask)

```bash
cd backend
pip install -r requirements.txt
python start.py
```

O backend estará rodando em `http://localhost:5001`

### 3. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

O frontend estará rodando em `http://localhost:3000`

## 🎯 Funcionalidades

### Para Clientes
- ✅ Buscar profissionais por localização
- ✅ Agendar serviços online
- ✅ Chat em tempo real com profissionais
- ✅ Histórico de agendamentos
- ✅ Sistema de avaliações
- ✅ Notificações push

### Para Profissionais
- ✅ Dashboard completo de gestão
- ✅ Agenda inteligente
- ✅ Relatórios financeiros
- ✅ Chat com clientes
- ✅ Gestão de serviços e preços
- ✅ Analytics detalhadas

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS
- **Framer Motion** - Animações
- **Vite** - Build tool
- **React Router** - Roteamento
- **Axios** - Cliente HTTP

### Backend
- **Flask** - Framework web Python
- **SocketIO** - WebSocket para tempo real
- **SQLite/PostgreSQL** - Banco de dados
- **Flask-CORS** - CORS handling
- **Werkzeug** - WSGI utilities

## 📱 Screenshots

### Landing Page
Interface moderna e atrativa para conversão de visitantes.

### Dashboard Profissional
Painel completo com métricas, agenda e gestão de clientes.

### Dashboard Cliente
Interface simples para agendamentos e histórico.

## 🔧 Configuração de Desenvolvimento

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
DEBUG=True
HOST=127.0.0.1
PORT=5001
```

### Scripts Úteis

```bash
# Frontend
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build

# Backend
python start.py      # Iniciar servidor
python reset_database.py  # Resetar banco de dados
```

## 🚀 Deploy

### Frontend
O build do frontend é gerado em `frontend/dist` e pode ser servido por qualquer servidor web.

### Backend
O backend Flask pode ser deployado em qualquer plataforma que suporte Python (Heroku, Railway, etc.).

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

- **Website**: [groomly.com](https://groomly.com)
- **Email**: contato@groomly.com
- **LinkedIn**: [Groomly](https://linkedin.com/company/groomly)

---

Feito com ❤️ para revolucionar o mercado de beleza com tecnologia.