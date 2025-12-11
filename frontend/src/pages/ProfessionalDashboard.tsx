import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Star, 
  DollarSign, 
  TrendingUp,
  Users,
  Settings,
  Plus,
  BarChart3
} from 'lucide-react';

export const ProfessionalDashboard: React.FC = () => {
  const todayAppointments = [
    {
      id: 1,
      client: 'João Silva',
      service: 'Corte + Barba',
      time: '09:00',
      duration: '45min',
      price: 'R$ 45,00',
      status: 'confirmed'
    },
    {
      id: 2,
      client: 'Maria Santos',
      service: 'Corte Feminino',
      time: '10:30',
      duration: '60min',
      price: 'R$ 80,00',
      status: 'confirmed'
    },
    {
      id: 3,
      client: 'Carlos Mendes',
      service: 'Barba',
      time: '14:00',
      duration: '30min',
      price: 'R$ 25,00',
      status: 'pending'
    }
  ];

  const stats = {
    todayRevenue: 'R$ 320,00',
    monthRevenue: 'R$ 8.450,00',
    todayClients: 8,
    monthClients: 156,
    rating: 4.9,
    totalReviews: 234
  };

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
                <h1 className="text-xl font-bold text-gray-900">Olá, Profissional!</h1>
                <p className="text-sm text-gray-600">Gerencie seu negócio</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Novo Horário
              </button>
              <button className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-gray-200/50"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Receita Hoje</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayRevenue}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-gray-200/50"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Clientes Hoje</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayClients}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-gray-200/50"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Receita Mensal</p>
                <p className="text-2xl font-bold text-gray-900">{stats.monthRevenue}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-gray-200/50"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avaliação</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-gray-900">{stats.rating}</p>
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Today's Schedule */}
            <div className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-gray-200/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Agenda de Hoje</h2>
                <span className="text-sm text-gray-600">
                  {new Date().toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>

              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                          <User className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{appointment.client}</h3>
                          <p className="text-gray-600">{appointment.service}</p>
                          <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{appointment.time}</span>
                            </div>
                            <span>•</span>
                            <span>{appointment.duration}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-primary-600">{appointment.price}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className={`px-2 py-1 text-xs rounded-lg ${
                            appointment.status === 'confirmed' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-gray-200/50">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex flex-col items-center space-y-2 p-4 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors duration-200"
                >
                  <Plus className="w-6 h-6 text-primary-600" />
                  <span className="font-semibold text-primary-700">Novo Agendamento</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex flex-col items-center space-y-2 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200"
                >
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <span className="font-semibold text-blue-700">Ver Agenda</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex flex-col items-center space-y-2 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors duration-200"
                >
                  <BarChart3 className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-green-700">Relatórios</span>
                </motion.button>
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
                <h3 className="font-bold text-gray-900">João Barbeiro</h3>
                <p className="text-gray-600">Especialista em Cortes</p>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-semibold text-gray-900">{stats.rating}</span>
                  <span className="text-sm text-gray-600">({stats.totalReviews} avaliações)</span>
                </div>
                
                <button className="w-full mt-4 btn-ghost">
                  Editar Perfil
                </button>
              </div>
            </div>

            {/* Monthly Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-gray-200/50">
              <h3 className="font-bold text-gray-900 mb-4">Resumo Mensal</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Clientes Atendidos</span>
                  <span className="font-bold text-gray-900">{stats.monthClients}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Receita Total</span>
                  <span className="font-bold text-gray-900">{stats.monthRevenue}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Ticket Médio</span>
                  <span className="font-bold text-gray-900">R$ 54,17</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Taxa de Ocupação</span>
                  <span className="font-bold text-green-600">87%</span>
                </div>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-gray-200/50">
              <h3 className="font-bold text-gray-900 mb-4">Avaliações Recentes</h3>
              <div className="space-y-4">
                {[
                  { name: 'Carlos Silva', rating: 5, comment: 'Excelente profissional!' },
                  { name: 'Ana Costa', rating: 5, comment: 'Muito satisfeita com o resultado.' },
                  { name: 'Pedro Santos', rating: 4, comment: 'Bom atendimento e qualidade.' }
                ].map((review, index) => (
                  <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900">{review.name}</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
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