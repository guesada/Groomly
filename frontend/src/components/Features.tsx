import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Calendar, 
  Users, 
  BarChart3, 
  MessageCircle, 
  Star, 
  Bot 
} from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Agendamento Inteligente',
    description: 'Sistema de agendamento online 24/7 com confirmação automática e lembretes por SMS e email.',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Users,
    title: 'Gestão de Clientes',
    description: 'Histórico completo, preferências e análise de comportamento para atendimento personalizado.',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: BarChart3,
    title: 'Analytics Avançado',
    description: 'Dashboards com métricas em tempo real para tomar decisões baseadas em dados.',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: MessageCircle,
    title: 'Chat em Tempo Real',
    description: 'Comunicação instantânea entre profissionais e clientes para melhor experiência.',
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-50',
  },
  {
    icon: Star,
    title: 'Sistema de Avaliações',
    description: 'Colete feedback dos clientes e construa sua reputação online automaticamente.',
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  {
    icon: Bot,
    title: 'IA & Recomendações',
    description: 'Inteligência artificial para sugerir horários e serviços baseados em padrões.',
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
  },
];

export const Features: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" ref={ref} className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-primary-50 border border-primary-200 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-semibold text-primary-700 uppercase tracking-wide">
              Recursos
            </span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Tudo que Você Precisa em{' '}
            <span className="gradient-text">Um Só Lugar</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            Ferramentas profissionais para gerenciar seu negócio de beleza com eficiência e elegância
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="card h-full hover:shadow-2xl transition-all duration-300 hover:border-primary-200">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Floating decoration */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`absolute -top-2 -right-2 w-6 h-6 ${feature.bgColor} rounded-full opacity-60`}
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} rounded-b-2xl origin-left`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};