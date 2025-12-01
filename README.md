# 💈 Corte Digital - Sistema de Agendamento para Barbearias

Sistema completo de agendamento online para barbearias, desenvolvido com Flask e MySQL.

---

## 🚀 Funcionalidades

### Para Clientes
- ✅ Agendamento online de serviços
- ✅ Visualização de agendamentos ativos
- ✅ Histórico de serviços realizados
- ✅ Cancelamento de agendamentos

### Para Barbeiros
- ✅ Dashboard profissional com métricas
- ✅ Agenda inteligente com filtros
- ✅ Gerenciamento de agendamentos
- ✅ Relatórios de faturamento
- ✅ Personalização de preços por serviço

### Sistema
- ✅ Auto-conclusão de agendamentos (baseado em duração do serviço)
- ✅ Validação de horários
- ✅ Prevenção de conflitos
- ✅ Interface moderna e responsiva

---

## 📋 Pré-requisitos

- Python 3.8+
- MySQL 8.0+
- pip (gerenciador de pacotes Python)

---

## 🔧 Instalação

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd corte-digital
```

### 2. Instale as dependências
```bash
pip install -r requirements.txt
```

### 3. Configure o banco de dados

Edite o arquivo `.env` com suas credenciais MySQL:
```env
DATABASE_URL=root@localhost:3306@sua_senha@cortedigital
```

### 4. Execute o setup do banco de dados
```bash
python setup_database.py
```

### 5. (Opcional) Insira dados de teste
```bash
python seed_leo_pablo.py
```

---

## ▶️ Executar o Sistema

```bash
python app.py
```

Acesse: http://localhost:5001

---

## 👥 Contas de Teste

Após executar `seed_leo_pablo.py`:

**Cliente:**
- Email: leoguesa08@gmail.com
- Senha: (definida no cadastro)

**Barbeiro:**
- Email: pablo@gmail.com
- Senha: (definida no cadastro)

---

## 📁 Estrutura do Projeto

```
corte-digital/
├── app.py                  # Aplicação principal Flask
├── db.py                   # Modelos do banco de dados
├── services.py             # Lógica de negócio
├── requirements.txt        # Dependências Python
├── .env                    # Configurações (não versionado)
├── corte_digital.db        # Banco de dados SQLite (dev)
├── setup_database.py       # Setup inicial do banco
├── reset_database.py       # Reset do banco de dados
├── seed_leo_pablo.py       # Script de dados de teste
├── routes/                 # Rotas da API
│   ├── __init__.py
│   ├── auth.py            # Autenticação
│   ├── appointments.py    # Agendamentos
│   ├── info.py            # Informações
│   ├── pages.py           # Páginas
│   └── barber_prices.py   # Preços do barbeiro
├── static/                 # Arquivos estáticos
│   ├── css/               # Estilos CSS
│   └── js/                # JavaScript
├── templates/              # Templates HTML
│   ├── index.html
│   ├── cliente_dashboard.html
│   └── barbeiro_dashboard.html
└── scripts/                # Scripts auxiliares
    ├── migrate_database.py
    ├── seed_database.py
    └── verificar_sistema.py
```

---

## 🎯 Serviços Disponíveis

| Serviço | Duração | Preço Base |
|---------|---------|------------|
| Corte | 30 min | R$ 35,00 |
| Barba | 20 min | R$ 25,00 |
| Corte + Barba | 60 min | R$ 55,00 |

*Barbeiros podem personalizar seus preços*

---

## 🔄 Fluxo de Agendamento

1. **Cliente agenda** → Status: `pendente`
2. **Barbeiro confirma** → Status: `agendado`
3. **Horário + duração passa** → Status: `concluído` (automático)

---

## 🛠️ Tecnologias Utilizadas

- **Backend:** Flask (Python)
- **Banco de Dados:** MySQL / SQLite
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **ORM:** SQLAlchemy
- **Autenticação:** Flask Sessions

---

## 📊 Funcionalidades Avançadas

### Auto-Conclusão de Agendamentos
- Sistema verifica automaticamente agendamentos passados
- Considera a duração do serviço
- Marca como concluído após término do serviço

### Validação Inteligente
- Previne agendamentos em horários passados
- Detecta conflitos de horário
- Valida disponibilidade do barbeiro

### Dashboard Profissional
- Métricas em tempo real
- Gráfico semanal de faturamento
- Próximos agendamentos
- Top serviços realizados

---

## 🧪 Scripts Úteis

### Setup Inicial
```bash
python setup_database.py
```

### Reset do Banco
```bash
python reset_database.py
```

### Dados de Teste
```bash
python seed_leo_pablo.py
```

### Organizar Projeto
```bash
python organizar_projeto.py
```

---

## 📝 Notas

- O sistema usa auto-conclusão baseada na duração do serviço
- Barbeiros não podem cancelar agendamentos passados
- Relatórios incluem agendamentos futuros (projeção)
- Interface responsiva e moderna

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

---

## 📄 Licença

Este projeto é privado e proprietário.

---

## 👨‍💻 Desenvolvedor

Sistema desenvolvido para gerenciamento de barbearias.

---

## 🆘 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação
2. Execute `python verificar_sistema.py`
3. Consulte os logs do sistema
