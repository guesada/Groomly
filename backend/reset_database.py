"""
Script para resetar e reformular o banco de dados do Groomly.
Este script irá:
1. Dropar todas as tabelas existentes
2. Criar novas tabelas com a estrutura atualizada
3. Criar dados de exemplo (opcional)
"""

from app import app
from db import db, Cliente, Professional, Service, Appointment, Product, Report
from db import ProfessionalPrice, ChatConversation, ChatMessage, Review, Notification
from db import WorkingHours, BlockedTime
from werkzeug.security import generate_password_hash
import json

def reset_database():
    """Reseta o banco de dados completamente."""
    with app.app_context():
        print("🗑️  Dropando todas as tabelas...")
        db.drop_all()
        
        print("✨ Criando novas tabelas...")
        db.create_all()
        
        print("✅ Banco de dados resetado com sucesso!")
        print("\n📊 Tabelas criadas:")
        print("  - clientes")
        print("  - professionals")
        print("  - services")
        print("  - appointments")
        print("  - products")
        print("  - reports")
        print("  - professional_prices")
        print("  - chat_conversations")
        print("  - chat_messages")
        print("  - reviews")
        print("  - notifications")
        print("  - working_hours")
        print("  - blocked_times")


def create_sample_data():
    """Cria dados de exemplo para testes."""
    with app.app_context():
        print("\n📝 Criando dados de exemplo...")
        
        # Criar clientes de exemplo
        cliente1 = Cliente(
            nome="João Silva",
            email="joao@email.com",
            senha=generate_password_hash("123456"),
            telefone="(11) 98765-4321"
        )
        
        cliente2 = Cliente(
            nome="Maria Santos",
            email="maria@email.com",
            senha=generate_password_hash("123456"),
            telefone="(11) 98765-1234"
        )
        
        db.session.add_all([cliente1, cliente2])
        
        # Criar profissionais de exemplo
        profissional1 = Professional(
            nome="Carlos Barbeiro",
            email="carlos@email.com",
            senha=generate_password_hash("123456"),
            telefone="(11) 91234-5678",
            categoria="Barbeiro",
            especialidades=json.dumps(["Corte de Cabelo", "Barba", "Corte + Barba"]),
            avaliacao=4.8,
            total_avaliacoes=45,
            bio="Barbeiro profissional com 10 anos de experiência",
            ativo=True
        )
        
        profissional2 = Professional(
            nome="Ana Cabeleireira",
            email="ana@email.com",
            senha=generate_password_hash("123456"),
            telefone="(11) 91234-8765",
            categoria="Cabeleireiro",
            especialidades=json.dumps(["Corte Feminino", "Coloração", "Escova", "Hidratação"]),
            avaliacao=4.9,
            total_avaliacoes=78,
            bio="Especialista em coloração e cortes femininos",
            ativo=True
        )
        
        profissional3 = Professional(
            nome="Paula Manicure",
            email="paula@email.com",
            senha=generate_password_hash("123456"),
            telefone="(11) 91234-6789",
            categoria="Manicure",
            especialidades=json.dumps(["Manicure", "Pedicure", "Unhas Decoradas"]),
            avaliacao=5.0,
            total_avaliacoes=120,
            bio="Especialista em nail art e cuidados com as unhas",
            ativo=True
        )
        
        db.session.add_all([profissional1, profissional2, profissional3])
        db.session.commit()
        
        # Criar serviços padrão
        servicos = [
            Service(
                nome="Corte de Cabelo Masculino",
                categoria="Cabelo",
                preco=35.00,
                duracao=30,
                descricao="Corte masculino tradicional",
                popular=True,
                ativo=True
            ),
            Service(
                nome="Corte de Cabelo Feminino",
                categoria="Cabelo",
                preco=50.00,
                duracao=45,
                descricao="Corte feminino com finalização",
                popular=True,
                ativo=True
            ),
            Service(
                nome="Barba",
                categoria="Cabelo",
                preco=25.00,
                duracao=20,
                descricao="Aparar e modelar barba",
                popular=True,
                ativo=True
            ),
            Service(
                nome="Corte + Barba",
                categoria="Cabelo",
                preco=55.00,
                duracao=50,
                descricao="Combo completo de corte e barba",
                popular=True,
                ativo=True
            ),
            Service(
                nome="Coloração",
                categoria="Cabelo",
                preco_min=80.00,
                preco_max=200.00,
                duracao=120,
                descricao="Coloração completa do cabelo",
                popular=True,
                ativo=True
            ),
            Service(
                nome="Manicure",
                categoria="Unhas",
                preco=30.00,
                duracao=40,
                descricao="Cuidados com as unhas das mãos",
                popular=True,
                ativo=True
            ),
            Service(
                nome="Pedicure",
                categoria="Unhas",
                preco=35.00,
                duracao=50,
                descricao="Cuidados com as unhas dos pés",
                popular=True,
                ativo=True
            ),
            Service(
                nome="Escova",
                categoria="Cabelo",
                preco=40.00,
                duracao=40,
                descricao="Escova modeladora",
                popular=False,
                ativo=True
            ),
            Service(
                nome="Hidratação",
                categoria="Cabelo",
                preco=60.00,
                duracao=60,
                descricao="Tratamento de hidratação profunda",
                popular=False,
                ativo=True
            ),
            Service(
                nome="Maquiagem",
                categoria="Estética",
                preco_min=80.00,
                preco_max=150.00,
                duracao=60,
                descricao="Maquiagem profissional",
                popular=False,
                ativo=True
            )
        ]
        
        db.session.add_all(servicos)
        db.session.commit()
        
        # Criar horários de trabalho para os profissionais
        dias_semana = {
            1: "Segunda",
            2: "Terça",
            3: "Quarta",
            4: "Quinta",
            5: "Sexta",
            6: "Sábado"
        }
        
        for prof_id in [profissional1.id, profissional2.id, profissional3.id]:
            for dia in range(1, 7):  # Segunda a Sábado
                horario = WorkingHours(
                    profissional_id=prof_id,
                    dia_semana=dia,
                    hora_inicio="09:00",
                    hora_fim="18:00",
                    intervalo_inicio="12:00",
                    intervalo_fim="13:00",
                    ativo=True
                )
                db.session.add(horario)
        
        db.session.commit()
        
        # Criar preços personalizados para os profissionais
        # Carlos Barbeiro
        precos_carlos = [
            ProfessionalPrice(profissional_id=profissional1.id, servico_id=1, servico_nome="Corte de Cabelo Masculino", preco=35.00),
            ProfessionalPrice(profissional_id=profissional1.id, servico_id=3, servico_nome="Barba", preco=25.00),
            ProfessionalPrice(profissional_id=profissional1.id, servico_id=4, servico_nome="Corte + Barba", preco=55.00),
        ]
        
        # Ana Cabeleireira
        precos_ana = [
            ProfessionalPrice(profissional_id=profissional2.id, servico_id=2, servico_nome="Corte de Cabelo Feminino", preco=60.00),
            ProfessionalPrice(profissional_id=profissional2.id, servico_id=5, servico_nome="Coloração", preco=150.00),
            ProfessionalPrice(profissional_id=profissional2.id, servico_id=8, servico_nome="Escova", preco=45.00),
            ProfessionalPrice(profissional_id=profissional2.id, servico_id=9, servico_nome="Hidratação", preco=70.00),
        ]
        
        # Paula Manicure
        precos_paula = [
            ProfessionalPrice(profissional_id=profissional3.id, servico_id=6, servico_nome="Manicure", preco=35.00),
            ProfessionalPrice(profissional_id=profissional3.id, servico_id=7, servico_nome="Pedicure", preco=40.00),
        ]
        
        db.session.add_all(precos_carlos + precos_ana + precos_paula)
        db.session.commit()
        
        print("✅ Dados de exemplo criados com sucesso!")
        print("\n👥 Usuários criados:")
        print("  📧 Clientes:")
        print("     - joao@email.com / 123456")
        print("     - maria@email.com / 123456")
        print("  💼 Profissionais:")
        print("     - carlos@email.com / 123456 (Barbeiro)")
        print("     - ana@email.com / 123456 (Cabeleireira)")
        print("     - paula@email.com / 123456 (Manicure)")


if __name__ == "__main__":
    print("=" * 60)
    print("🔄 RESET DO BANCO DE DADOS - GROOMLY")
    print("=" * 60)
    print("\n⚠️  ATENÇÃO: Este script irá APAGAR TODOS OS DADOS!")
    print("Tem certeza que deseja continuar? (s/n): ", end="")
    
    resposta = input().lower()
    
    if resposta == 's':
        reset_database()
        
        print("\n📝 Deseja criar dados de exemplo? (s/n): ", end="")
        resposta_exemplo = input().lower()
        
        if resposta_exemplo == 's':
            create_sample_data()
        
        print("\n" + "=" * 60)
        print("✅ PROCESSO CONCLUÍDO COM SUCESSO!")
        print("=" * 60)
    else:
        print("\n❌ Operação cancelada.")
