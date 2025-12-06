# 🔧 Troubleshooting - Groomly

## Problema: Profissional não redireciona para dashboard correto

### Sintomas:
- Usuário se registra como profissional
- Após login, vai para dashboard de cliente ao invés de barbeiro

### Diagnóstico:

#### 1. Verificar logs do servidor
Após fazer registro e login, verifique os logs:

```
📝 Registro - Tipo: profissional, Categoria: Barbeiro, Serviços: ['Corte', 'Barba']
🔐 Login - Email: teste@email.com, Tipo: barbeiro
```

#### 2. Verificar console do navegador
Abra o DevTools (F12) e verifique:

```javascript
📝 Dados de registro: {
  name: "Teste",
  email: "teste@email.com",
  userType: "profissional",
  categoria: "Barbeiro",
  servicos: ["Corte", "Barba"]
}

🔄 Redirecionando para: barbeiro
```

### Soluções Implementadas:

#### 1. Login Automático Após Registro
- ✅ Após registro bem-sucedido, faz login automático
- ✅ Redireciona imediatamente para o dashboard correto
- ✅ Não precisa mais fazer login manual

#### 2. Compatibilidade de Tipos
- ✅ Frontend aceita tanto `profissional` quanto `barbeiro`
- ✅ Backend retorna `barbeiro` para compatibilidade
- ✅ Redirecionamento funciona para ambos os tipos

#### 3. Logs de Debug
- ✅ Logs no backend para rastrear tipo de usuário
- ✅ Logs no frontend para verificar redirecionamento
- ✅ Fácil identificação de problemas

### Como Testar:

#### Teste 1: Registro de Profissional
```
1. Abrir página inicial
2. Clicar em "Sou Profissional"
3. Preencher dados:
   - Nome: Teste Barbeiro
   - Email: teste@email.com
   - Telefone: (11) 98765-4321
   - Senha: 123456
4. Selecionar categoria: Barbeiro
5. Selecionar serviços: Corte, Barba
6. Submeter formulário
7. ✅ Deve fazer login automático
8. ✅ Deve redirecionar para /barbeiro
9. ✅ Deve mostrar dashboard de barbeiro
```

#### Teste 2: Registro de Cliente
```
1. Abrir página inicial
2. Clicar em "Cadastrar"
3. Selecionar "Sou Cliente"
4. Preencher dados
5. Submeter formulário
6. ✅ Deve fazer login automático
7. ✅ Deve redirecionar para /cliente
8. ✅ Deve mostrar dashboard de cliente
```

### Verificações Adicionais:

#### 1. Verificar Sessão
No Python shell:
```python
from app import app
from flask import session

with app.test_request_context():
    # Simular login
    session['usuario_tipo'] = 'barbeiro'
    print(session.get('usuario_tipo'))  # Deve mostrar 'barbeiro'
```

#### 2. Verificar Banco de Dados
```python
from app import app
from db import Professional

with app.app_context():
    prof = Professional.query.filter_by(email='teste@email.com').first()
    if prof:
        print(f"Nome: {prof.nome}")
        print(f"Categoria: {prof.categoria}")
        print(f"Especialidades: {prof.especialidades}")
```

#### 3. Verificar Redirecionamento
No navegador, após login:
```javascript
// No console
console.log('Tipo de usuário:', response.data.user.userType);
console.log('Redirecionando para:', 
  (userType === 'profissional' || userType === 'barbeiro') ? '/barbeiro' : '/cliente'
);
```

### Problemas Comuns:

#### Problema 1: "Categoria é obrigatória"
**Causa**: Não selecionou categoria no formulário
**Solução**: Selecionar uma categoria antes de submeter

#### Problema 2: "Selecione pelo menos um serviço"
**Causa**: Não selecionou nenhum serviço
**Solução**: Clicar em pelo menos um card de serviço

#### Problema 3: Redireciona para cliente mesmo sendo profissional
**Causa**: Tipo de usuário não está sendo salvo corretamente
**Solução**: 
1. Verificar logs do servidor
2. Verificar se o tipo está sendo enviado no formulário
3. Verificar se o banco de dados foi resetado corretamente

#### Problema 4: Erro 400 no registro
**Causa**: Campos obrigatórios faltando
**Solução**: Verificar console do navegador para ver quais campos estão faltando

### Fluxo Completo:

```
1. Usuário preenche formulário
   ↓
2. Frontend valida campos
   ↓
3. POST /api/users/register
   ↓
4. Backend valida e cria usuário
   ↓
5. Frontend faz login automático
   ↓
6. POST /api/users/login
   ↓
7. Backend autentica e retorna tipo
   ↓
8. Frontend verifica tipo
   ↓
9. Redireciona para dashboard correto
   - barbeiro → /barbeiro
   - cliente → /cliente
```

### Arquivos Modificados:

1. **templates/index.html**
   - Linha ~2168: Login automático após registro
   - Linha ~2155: Compatibilidade de tipos no redirecionamento

2. **routes/auth.py**
   - Linha ~60: Logs de debug no registro
   - Linha ~35: Logs de debug no login

3. **services/auth_service.py**
   - Linha ~20: Retorna 'barbeiro' para profissionais
   - Linha ~30: Aceita 'profissional' no registro

### Comandos Úteis:

```bash
# Ver logs em tempo real
python app.py

# Resetar banco de dados
python reset_database.py

# Verificar estrutura do banco
python
>>> from app import app
>>> from db import db
>>> with app.app_context():
...     print(db.metadata.tables.keys())

# Limpar sessão (se necessário)
# No navegador: Application > Storage > Clear site data
```

### Checklist de Verificação:

- [ ] Banco de dados foi resetado
- [ ] Servidor está rodando
- [ ] Console do navegador não mostra erros
- [ ] Logs do servidor mostram tipo correto
- [ ] Formulário envia todos os campos
- [ ] Login automático funciona
- [ ] Redirecionamento está correto
- [ ] Dashboard carrega corretamente

### Contato:

Se o problema persistir:
1. Verifique todos os logs
2. Teste com usuários de exemplo
3. Limpe cache do navegador
4. Reinicie o servidor
5. Verifique se todas as mudanças foram salvas

---

**Última atualização**: Dezembro 2024  
**Status**: ✅ Problema resolvido com login automático
