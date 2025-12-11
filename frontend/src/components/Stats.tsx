import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { number: '10k+', label: 'Profissionais', color: 'from-blue-500 to-blue-600' },
  { number: '500k+', label: 'Agendamentos', color: 'from-green-500 to-green-600' },
  { number: '4.9', label: 'Avaliação', color: 'from-yellow-500 to-yellow-600' },
  { number: '24/7', label: 'Suporte', color: 'from-purple-500 to-purple-600' },
];

export const Stats: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-8 h-8 bg-white/20 rounded-lg"
                  />
                </div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                  className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2"
                >
                  {stat.number}
                </motion.div>
                
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};