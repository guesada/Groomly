import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Star, 
  MapPin, 
  Phone,
  Plus,
  History,
  Settings
} from 'lucide-react';

export const ClientDashboard: React.FC = () => {
  const upcomingAppointments = [
    {
      id: 1,
      professional: 'João Silva',
      service: 'Corte + Barba',
      date: '2024-01-15',
      time: '14:00',
      location: 'Barbearia Central',
      price: 'R$ 45,00'
    },
    {
      id: 2,
      professional: 'Maria Santos',
      service: 'Corte Feminino',
      date: '2024-01-18',
      time: '10:30',
      location: 'Salão Elegance',
      price: 'R$ 80,00'
    }
  ];

  const recentHistory = [
    {
      id: 1,
      professional: 'Carlos Mendes',
      service: 'Corte + Barba',
      date: '2024-01-10',
      rating: 5,
      price: 'R$ 45,00'
    },
    {
      id: 2,
      professional: 'Ana Costa',
      service: 'Manicure',
      date: '2024-01-08',
      rating: 4,
      price: 'R$ 25,00'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Olá, Cliente!</h1>
                <p className="text-sm text-gray-600">Gerencie seus agendamentos</p>
              </div>
            </div>
            <button className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-gray-200/50">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-3 p-4 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors duration-200"
                >
                  <Plus className="w-6 h-6 text-primary-600" />
                  <span className="font-semibold text-primary-700">Novo Agendamento</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  <History className="w-6 h-6 text-gray-600" />
                  <span className="font-semibold text-gray-700">Ver Histórico</span>
                </motion.button>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-gray-200/50">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Próximos Agendamentos</h2>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{appointment.service}</h3>
                        <p className="text-gray-600 mt-1">com {appointment.professional}</p>
                        
                        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(appointment.date).toLocaleDateString('pt-BR')}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{appointment.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-primary-600">{appointment.price}</p>
                        <div className="flex space-x-2 mt-2">
                          <button className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200">
                            Cancelar
                          </button>
                          <button className="px-3 py-1 text-xs bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors duration-200">
                            Reagendar
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent History */}
            <div className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-gray-200/50">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Histórico Recente</h2>
              <div className="space-y-4">
                {recentHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.service}</h3>
                      <p className="text-gray-600">com {item.professional}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(item.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{item.price}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < item.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-gray-200/50">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-gray-900">João Cliente</h3>
                <p className="text-gray-600">joao@email.com</p>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">(11) 99999-9999</span>
                </div>
                
                <button className="w-full mt-4 btn-ghost">
                  Editar Perfil
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-gray-200/50">
              <h3 className="font-bold text-gray-900 mb-4">Suas Estatísticas</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total de Serviços</span>
                  <span className="font-bold text-gray-900">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Valor Gasto</span>
                  <span className="font-bold text-gray-900">R$ 1.280,00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Avaliação Média</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-bold text-gray-900">4.8</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Favorite Professionals */}
            <div className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-gray-200/50">
              <h3 className="font-bold text-gray-900 mb-4">Profissionais Favoritos</h3>
              <div className="space-y-3">
                {['João Silva', 'Maria Santos', 'Carlos Mendes'].map((name, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{name}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">4.9</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};