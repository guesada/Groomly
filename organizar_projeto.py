#!/usr/bin/env python3
"""
Script para organizar o projeto e remover arquivos desnecessários
"""

import os
import shutil

# Arquivos essenciais que devem permanecer na raiz
ARQUIVOS_ESSENCIAIS = [
    'app.py',
    'db.py',
    'services.py',
    'requirements.txt',
    '.env',
    'corte_digital.db',
    'setup_database.py',
    'reset_database.py',
    'seed_leo_pablo.py',  # Script principal de seed
]

# Arquivos para remover
ARQUIVOS_REMOVER = [
    'atualizar_servicos.py',
    'AUTO_COMPLETE_AGENDAMENTOS.md',
    'auto_complete_appointments.py',
    'database_config.py',
    'DURACAO_SERVICO.md',
    'EXEMPLOS_TESTE.md',
    'FIX_FILTRO_CONCLUIDO_BARBEIRO.md',
    'FIX_HISTORICO.md',
    'inserir_agendamentos_barbeiro.py',
    'inserir_agendamentos_concluidos.py',
    'INSERIR_DADOS_TESTE.md',
    'inserir_servicos_principais.py',
    'limpar_database.py',
    'limpar_servicos_antigos.py',
    'MELHORIAS_BARBEIRO.md',
    'MUDANCAS_FINAIS.md',
    'README_AUTO_COMPLETE.md',
    'README_SEED_LEO_PABLO.md',
    'REMOCAO_PERFIL.md',
    'RESUMO_FINAL_COMPLETO.md',
    'RESUMO_IMPLEMENTACAO.md',
    'seed_completo_leo.py',
    'seed_historico_barbeiro_leo.py',
    'seed_historico_leo.py',
    'testar_auto_complete.py',
    'testar_servicos.py',
    'testar_sistema_precos.py',
    'VALIDACAO_HORARIOS.md',
    'verificar_estrutura_db.py',
    'verificar_sistema.py',
]

def organizar_projeto():
    print("=" * 80)
    print("🧹 ORGANIZANDO PROJETO")
    print("=" * 80)
    
    # Criar pasta docs se não existir
    if not os.path.exists('docs'):
        os.makedirs('docs')
        print("✓ Pasta 'docs' criada")
    
    removidos = 0
    
    # Remover arquivos desnecessários
    print("\n📋 Removendo arquivos desnecessários...")
    for arquivo in ARQUIVOS_REMOVER:
        if os.path.exists(arquivo):
            try:
                os.remove(arquivo)
                print(f"  ✓ Removido: {arquivo}")
                removidos += 1
            except Exception as e:
                print(f"  ✗ Erro ao remover {arquivo}: {e}")
    
    # Listar arquivos essenciais mantidos
    print("\n📦 Arquivos essenciais mantidos na raiz:")
    for arquivo in ARQUIVOS_ESSENCIAIS:
        if os.path.exists(arquivo):
            print(f"  ✓ {arquivo}")
    
    # Listar pastas
    print("\n📁 Pastas do projeto:")
    pastas = ['routes', 'static', 'templates', 'scripts']
    for pasta in pastas:
        if os.path.exists(pasta):
            print(f"  ✓ {pasta}/")
    
    print("\n" + "=" * 80)
    print(f"✅ ORGANIZAÇÃO CONCLUÍDA!")
    print(f"   • {removidos} arquivo(s) removido(s)")
    print(f"   • {len([f for f in ARQUIVOS_ESSENCIAIS if os.path.exists(f)])} arquivo(s) essencial(is) mantido(s)")
    print("=" * 80)
    
    print("\n📋 Estrutura final do projeto:")
    print("""
    corte-digital/
    ├── app.py                  # Aplicação principal
    ├── db.py                   # Modelos do banco de dados
    ├── services.py             # Lógica de negócio
    ├── requirements.txt        # Dependências
    ├── .env                    # Configurações
    ├── corte_digital.db        # Banco de dados
    ├── setup_database.py       # Setup inicial
    ├── reset_database.py       # Reset do banco
    ├── seed_leo_pablo.py       # Dados de teste
    ├── routes/                 # Rotas da API
    ├── static/                 # CSS e JavaScript
    ├── templates/              # Templates HTML
    └── scripts/                # Scripts auxiliares
    """)

if __name__ == "__main__":
    confirmar = input("Deseja organizar o projeto e remover arquivos desnecessários? (s/n): ")
    
    if confirmar.lower() == 's':
        organizar_projeto()
    else:
        print("\n❌ Operação cancelada.")
