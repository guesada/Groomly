"""
Script para remover serviços antigos do banco de dados
"""
import sqlite3

DB_FILE = "corte_digital.db"

def main():
    print("\n🗑️  Removendo serviços antigos...\n")
    
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    # Listar serviços atuais
    cursor.execute("SELECT id, name, price FROM services")
    servicos = cursor.fetchall()
    
    print("📋 Serviços antes:")
    for s in servicos:
        print(f"   • {s[1]} - R$ {s[2]:.2f}")
    
    # Deletar serviços que não são os 3 básicos
    cursor.execute("""
        DELETE FROM services 
        WHERE name NOT IN ('Corte', 'Barba', 'Corte + Barba')
    """)
    
    removidos = cursor.rowcount
    conn.commit()
    
    # Listar serviços finais
    cursor.execute("SELECT id, name, price FROM services")
    servicos = cursor.fetchall()
    
    print(f"\n✅ {removidos} serviço(s) removido(s)\n")
    print("📋 Serviços finais:")
    for s in servicos:
        print(f"   • {s[1]} - R$ {s[2]:.2f}")
    
    conn.close()
    print("\n✅ Limpeza concluída!\n")

if __name__ == "__main__":
    main()
