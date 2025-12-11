import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { UserPlus, Settings, Calendar } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Crie Sua Conta',
    description: 'Cadastre-se gratuitamente e configure seu perfil profissional em menos de 5 minutos.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    number: '02',
    icon: Settings,
    title: 'Configure Seus Serviços',
    description: 'Adicione seus serviços, preços e horários de disponibilidade de forma simples.',
    color: 'from-green-500 to-green-600',
  },
  {
    number: '03',
    icon: Calendar,
    title: 'Receba Agendamentos',
    description: 'Compartilhe seu link e comece a receber agendamentos automaticamente.',
    color: 'from-purple-500 to-purple-600',
  },
];

export const HowItWorks: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" ref={ref} className="section-padding bg-white">
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
              Como Funciona
            </span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Comece em{' '}
            <span className="gradient-text">3 Passos Simples</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            Configure sua conta e comece a receber agendamentos em minutos
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-200 via-primary-200 to-gray-200 -translate-y-1/2" />
          
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative text-center group"
              >
                {/* Step Number */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative inline-flex items-center justify-center w-20 h-20 mb-6 mx-auto"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`} />
                  <div className="relative bg-white rounded-xl w-16 h-16 flex items-center justify-center shadow-inner">
                    <step.icon className="w-8 h-8 text-gray-700" />
                  </div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="hidden lg:block absolute top-10 -right-6 text-primary-400"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};