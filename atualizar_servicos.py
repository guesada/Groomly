"""
Script para Atualizar Serviços - Corte Digital
Remove serviços inadequados e adiciona serviços de barbearia masculina.

Uso:
    python atualizar_servicos.py
"""

import sqlite3
import os

DB_FILE = "corte_digital.db"

# Serviços de barbearia (apenas os 3 básicos)
SERVICOS_BARBEARIA = [
    ("Corte", "Corte de cabelo masculino", 35.00, 30),
    ("Corte + Barba", "Corte de cabelo + barba completa", 55.00, 45),
    ("Barba", "Aparar e modelar barba", 25.00, 20),
]

# Serviços a remover (manter apenas Corte, Corte + Barba e Barba)
SERVICOS_REMOVER = [
    "Corte Simples",
    "Corte Degradê",
    "Corte Social",
    "Corte Infantil",
    "Barba Completa",
    "Barba Express",
    "Sobrancelha",
    "Hidratação Capilar",
    "Platinado",
    "Luzes",
    "Design de sobrancelha",
    "Tratamento de hidratação",
    "Descoloração completa",
    "Mechas e luzes",
    "Pacote completo",
]

def verificar_banco():
    """Verifica se o banco existe."""
    if not os.path.exists(DB_FILE):
        print(f"❌ Banco de dados '{DB_FILE}' não encontrado!")
        print("\n💡 Execute primeiro:")
        print("   python setup_database.py")
        return False
    return True

def listar_servicos_atuais(cursor):
    """Lista serviços atuais."""
    cursor.execute("SELECT id, name, description, price, duration FROM services")
    servicos = cursor.fetchall()
    
    if not servicos:
        print("ℹ️  Nenhum serviço cadastrado")
        return []
    
    print("\n📋 Serviços atuais:")
    for servico in servicos:
        print(f"   • {servico[1]} - R$ {servico[3]:.2f}")
    
    return servicos

def remover_servicos_inadequados(cursor):
    """Remove serviços que não são de barbearia masculina."""
    print("\n🗑️  Removendo serviços inadequados...")
    
    removidos = 0
    for servico_nome in SERVICOS_REMOVER:
        cursor.execute("SELECT id FROM services WHERE name LIKE ?", (f"%{servico_nome}%",))
        result = cursor.fetchone()
        
        if result:
            cursor.execute("DELETE FROM services WHERE name LIKE ?", (f"%{servico_nome}%",))
            print(f"   ✓ Removido: {servico_nome}")
            removidos += 1
    
    if removidos == 0:
        print("   ℹ️  Nenhum serviço inadequado encontrado")
    else:
        print(f"   ✅ {removidos} serviço(s) removido(s)")
    
    return removidos

def adicionar_servicos_barbearia(cursor):
    """Adiciona serviços de barbearia masculina."""
    print("\n➕ Adicionando serviços de barbearia...")
    
    adicionados = 0
    for servico in SERVICOS_BARBEARIA:
        nome, descricao, preco, duracao = servico
        
        # Verificar se já existe
        cursor.execute("SELECT id FROM services WHERE name = ?", (nome,))
        if cursor.fetchone():
            print(f"   ℹ️  Já existe: {nome}")
            continue
        
        # Adicionar
        cursor.execute("""
            INSERT INTO services (name, description, price, duration, active)
            VALUES (?, ?, ?, ?, 1)
        """, (nome, descricao, preco, duracao))
        
        print(f"   ✓ Adicionado: {nome} - R$ {preco:.2f}")
        adicionados += 1
    
    if adicionados == 0:
        print("   ℹ️  Todos os serviços já estão cadastrados")
    else:
        print(f"   ✅ {adicionados} serviço(s) adicionado(s)")
    
    return adicionados

def atualizar_agendamentos(cursor):
    """Atualiza agendamentos que usam serviços removidos."""
    print("\n🔄 Verificando agendamentos...")
    
    # Buscar agendamentos com serviços removidos
    for servico_nome in SERVICOS_REMOVER:
        cursor.execute("""
            SELECT COUNT(*) FROM appointments 
            WHERE servico LIKE ?
        """, (f"%{servico_nome}%",))
        
        count = cursor.fetchone()[0]
        if count > 0:
            print(f"   ⚠️  {count} agendamento(s) com '{servico_nome}'")
            print(f"      Estes agendamentos serão mantidos no histórico")

def main():
    """Função principal."""
    print("\n" + "=" * 60)
    print("✂️  ATUALIZAÇÃO DE SERVIÇOS - CORTE DIGITAL")
    print("=" * 60)
    
    # Verificar banco
    if not verificar_banco():
        return
    
    # Conectar ao banco
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    try:
        # Listar serviços atuais
        listar_servicos_atuais(cursor)
        
        # Confirmar operação
        print("\n" + "=" * 60)
        resposta = input("\nDeseja atualizar os serviços? (s/N): ").strip().lower()
        
        if resposta not in ['s', 'sim', 'y', 'yes']:
            print("\n❌ Operação cancelada.\n")
            return
        
        # Remover serviços inadequados
        removidos = remover_servicos_inadequados(cursor)
        
        # Adicionar serviços de barbearia
        adicionados = adicionar_servicos_barbearia(cursor)
        
        # Verificar agendamentos
        atualizar_agendamentos(cursor)
        
        # Commit
        conn.commit()
        
        # Listar serviços finais
        print("\n" + "=" * 60)
        print("📋 SERVIÇOS ATUALIZADOS")
        print("=" * 60)
        listar_servicos_atuais(cursor)
        
        # Resumo
        print("\n" + "=" * 60)
        print("✅ ATUALIZAÇÃO CONCLUÍDA!")
        print("=" * 60)
        print(f"\n📊 Resumo:")
        print(f"   • Serviços removidos: {removidos}")
        print(f"   • Serviços adicionados: {adicionados}")
        print("\n💡 Os serviços foram atualizados com sucesso!")
        print("   Novos agendamentos usarão apenas serviços de barbearia.\n")
        
    except Exception as e:
        print(f"\n❌ Erro durante atualização: {e}")
        conn.rollback()
    
    finally:
        conn.close()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n❌ Operação cancelada.\n")
