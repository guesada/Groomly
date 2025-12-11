import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Star, 
  Phone,
  Plus,
  History,
  Settings
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useDashboard } from '@/hooks/useDashboard';

export const ClientDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { data: dashboardData, loading, error } = useDashboard();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  const upcomingAppointments = dashboardData?.upcoming_appointments || [];
  const recentHistory = dashboardData?.recent_history || [];
  const stats = dashboardData?.stats || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="Groomly Logo" 
                className="w-20 h-20 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Olá, {user?.name || 'Cliente'}!</h1>
                <p className="text-sm text-gray-600">Gerencie seus agendamentos</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={logout}
                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
              >
                Sair
              </button>
              <button className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
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
              {upcomingAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum agendamento próximo</p>
                  <button className="btn-primary mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Agendar Serviço
                  </button>
                </div>
              ) : (
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
                        <h3 className="font-semibold text-gray-900">{appointment.servico}</h3>
                        <p className="text-gray-600 mt-1">com {appointment.profissional}</p>
                        
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
                            <span className={`px-2 py-1 text-xs rounded-lg ${
                              appointment.status === 'confirmado' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {appointment.status === 'confirmado' ? 'Confirmado' : 'Agendado'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-primary-600">
                          R$ {appointment.total_price?.toFixed(2) || '0,00'}
                        </p>
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
              )}
            </div>

            {/* Recent History */}
            <div className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-gray-200/50">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Histórico Recente</h2>
              {recentHistory.length === 0 ? (
                <div className="text-center py-8">
                  <History className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum histórico ainda</p>
                </div>
              ) : (
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
              )}
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
                <h3 className="font-bold text-gray-900">{user?.name || 'Cliente'}</h3>
                <p className="text-gray-600">{user?.email}</p>
                {user?.phone && (
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{user.phone}</span>
                  </div>
                )}
                
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
                  <span className="font-bold text-gray-900">{stats.total_appointments || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Valor Gasto</span>
                  <span className="font-bold text-gray-900">
                    R$ {stats.total_spent?.toFixed(2) || '0,00'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Próximos Agendamentos</span>
                  <span className="font-bold text-primary-600">{stats.upcoming_count || 0}</span>
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