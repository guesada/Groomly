from supabase import create_client, Client
from config import Config
import json
from typing import Dict, List, Optional, Any

class SupabaseDB:
    def __init__(self):
        self.client: Client = create_client(Config.SUPABASE_URL, Config.SUPABASE_KEY)
        self.service_client: Client = create_client(Config.SUPABASE_URL, Config.SUPABASE_SERVICE_KEY)
    
    def get_client(self, use_service_key: bool = False) -> Client:
        """Retorna o cliente Supabase apropriado"""
        return self.service_client if use_service_key else self.client
    
    # Métodos para Clientes
    def create_client_user(self, data: Dict) -> Dict:
        """Cria um novo cliente"""
        result = self.client.table('clientes').insert(data).execute()
        return result.data[0] if result.data else None
    
    def get_client_by_email(self, email: str) -> Optional[Dict]:
        """Busca cliente por email"""
        result = self.client.table('clientes').select('*').eq('email', email).execute()
        return result.data[0] if result.data else None
    
    def get_client_by_id(self, client_id: int) -> Optional[Dict]:
        """Busca cliente por ID"""
        result = self.client.table('clientes').select('*').eq('id', client_id).execute()
        return result.data[0] if result.data else None
    
    def update_client(self, client_id: int, data: Dict) -> Dict:
        """Atualiza dados do cliente"""
        result = self.client.table('clientes').update(data).eq('id', client_id).execute()
        return result.data[0] if result.data else None
    
    # Métodos para Profissionais
    def create_professional(self, data: Dict) -> Dict:
        """Cria um novo profissional"""
        result = self.client.table('professionals').insert(data).execute()
        return result.data[0] if result.data else None
    
    def get_professional_by_email(self, email: str) -> Optional[Dict]:
        """Busca profissional por email"""
        result = self.client.table('professionals').select('*').eq('email', email).execute()
        return result.data[0] if result.data else None
    
    def get_professional_by_id(self, professional_id: int) -> Optional[Dict]:
        """Busca profissional por ID"""
        result = self.client.table('professionals').select('*').eq('id', professional_id).execute()
        return result.data[0] if result.data else None
    
    def get_all_professionals(self, active_only: bool = True) -> List[Dict]:
        """Lista todos os profissionais"""
        query = self.client.table('professionals').select('*')
        if active_only:
            query = query.eq('ativo', True)
        result = query.execute()
        return result.data or []
    
    def update_professional(self, professional_id: int, data: Dict) -> Dict:
        """Atualiza dados do profissional"""
        result = self.client.table('professionals').update(data).eq('id', professional_id).execute()
        return result.data[0] if result.data else None
    
    # Métodos para Serviços
    def create_service(self, data: Dict) -> Dict:
        """Cria um novo serviço"""
        result = self.client.table('services').insert(data).execute()
        return result.data[0] if result.data else None
    
    def get_all_services(self, active_only: bool = True) -> List[Dict]:
        """Lista todos os serviços"""
        query = self.client.table('services').select('*')
        if active_only:
            query = query.eq('ativo', True)
        result = query.execute()
        return result.data or []
    
    def get_service_by_id(self, service_id: int) -> Optional[Dict]:
        """Busca serviço por ID"""
        result = self.client.table('services').select('*').eq('id', service_id).execute()
        return result.data[0] if result.data else None
    
    def update_service(self, service_id: int, data: Dict) -> Dict:
        """Atualiza dados do serviço"""
        result = self.client.table('services').update(data).eq('id', service_id).execute()
        return result.data[0] if result.data else None
    
    # Métodos para Agendamentos
    def create_appointment(self, data: Dict) -> Dict:
        """Cria um novo agendamento"""
        result = self.client.table('appointments').insert(data).execute()
        return result.data[0] if result.data else None
    
    def get_appointment_by_id(self, appointment_id: str) -> Optional[Dict]:
        """Busca agendamento por ID"""
        result = self.client.table('appointments').select('*').eq('id', appointment_id).execute()
        return result.data[0] if result.data else None
    
    def get_appointments_by_client(self, client_id: int) -> List[Dict]:
        """Lista agendamentos do cliente"""
        result = self.client.table('appointments').select('*').eq('cliente_id', client_id).order('created_at', desc=True).execute()
        return result.data or []
    
    def get_appointments_by_professional(self, professional_id: int) -> List[Dict]:
        """Lista agendamentos do profissional"""
        result = self.client.table('appointments').select('*').eq('profissional_id', professional_id).order('created_at', desc=True).execute()
        return result.data or []
    
    def get_appointments_by_date(self, date: str, professional_id: int = None) -> List[Dict]:
        """Lista agendamentos por data"""
        query = self.client.table('appointments').select('*').eq('date', date)
        if professional_id:
            query = query.eq('profissional_id', professional_id)
        result = query.execute()
        return result.data or []
    
    def update_appointment(self, appointment_id: str, data: Dict) -> Dict:
        """Atualiza dados do agendamento"""
        result = self.client.table('appointments').update(data).eq('id', appointment_id).execute()
        return result.data[0] if result.data else None
    
    def delete_appointment(self, appointment_id: str) -> bool:
        """Deleta um agendamento"""
        result = self.client.table('appointments').delete().eq('id', appointment_id).execute()
        return len(result.data) > 0
    
    # Métodos para Preços Personalizados
    def get_professional_prices(self, professional_id: int) -> List[Dict]:
        """Lista preços personalizados do profissional"""
        result = self.client.table('professional_prices').select('*').eq('profissional_id', professional_id).eq('ativo', True).execute()
        return result.data or []
    
    def set_professional_price(self, professional_id: int, service_id: int, price: float, service_name: str) -> Dict:
        """Define preço personalizado para um serviço"""
        data = {
            'profissional_id': professional_id,
            'servico_id': service_id,
            'servico_nome': service_name,
            'preco': price,
            'ativo': True
        }
        
        # Verifica se já existe
        existing = self.client.table('professional_prices').select('*').eq('profissional_id', professional_id).eq('servico_id', service_id).execute()
        
        if existing.data:
            # Atualiza existente
            result = self.client.table('professional_prices').update({'preco': price, 'ativo': True}).eq('profissional_id', professional_id).eq('servico_id', service_id).execute()
        else:
            # Cria novo
            result = self.client.table('professional_prices').insert(data).execute()
        
        return result.data[0] if result.data else None
    
    # Métodos para Avaliações
    def create_review(self, data: Dict) -> Dict:
        """Cria uma nova avaliação"""
        result = self.client.table('reviews').insert(data).execute()
        return result.data[0] if result.data else None
    
    def get_professional_reviews(self, professional_id: int) -> List[Dict]:
        """Lista avaliações do profissional"""
        result = self.client.table('reviews').select('*').eq('profissional_id', professional_id).order('created_at', desc=True).execute()
        return result.data or []
    
    # Métodos para Chat
    def get_or_create_conversation(self, client_id: int, professional_id: int) -> Dict:
        """Busca ou cria uma conversa"""
        # Busca conversa existente
        result = self.client.table('chat_conversations').select('*').eq('cliente_id', client_id).eq('profissional_id', professional_id).execute()
        
        if result.data:
            return result.data[0]
        
        # Cria nova conversa
        data = {
            'cliente_id': client_id,
            'profissional_id': professional_id,
            'cliente_unread': 0,
            'profissional_unread': 0
        }
        result = self.client.table('chat_conversations').insert(data).execute()
        return result.data[0] if result.data else None
    
    def create_message(self, data: Dict) -> Dict:
        """Cria uma nova mensagem"""
        result = self.client.table('chat_messages').insert(data).execute()
        return result.data[0] if result.data else None
    
    def get_conversation_messages(self, conversation_id: int) -> List[Dict]:
        """Lista mensagens da conversa"""
        result = self.client.table('chat_messages').select('*').eq('conversation_id', conversation_id).order('created_at', desc=False).execute()
        return result.data or []
    
    # Métodos para Notificações
    def create_notification(self, data: Dict) -> Dict:
        """Cria uma nova notificação"""
        result = self.client.table('notifications').insert(data).execute()
        return result.data[0] if result.data else None
    
    def get_user_notifications(self, user_id: int, user_type: str) -> List[Dict]:
        """Lista notificações do usuário"""
        result = self.client.table('notifications').select('*').eq('user_id', user_id).eq('user_type', user_type).order('created_at', desc=True).execute()
        return result.data or []
    
    def mark_notification_as_read(self, notification_id: int) -> Dict:
        """Marca notificação como lida"""
        result = self.client.table('notifications').update({'is_read': True}).eq('id', notification_id).execute()
        return result.data[0] if result.data else None

# Instância global do banco
db = SupabaseDB()