import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Scissors, Sparkles } from 'lucide-react';
import { cn } from '@/utils/cn';

interface Specialty {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const SPECIALTIES: Specialty[] = [
  {
    value: 'barbeiro',
    label: 'Barbeiro',
    description: 'Cortes masculinos, barba e tratamentos',
    icon: <Scissors className="w-6 h-6" />,
    color: 'from-blue-500 to-blue-600',
  },
  {
    value: 'cabeleireiro',
    label: 'Cabeleireiro',
    description: 'Cortes, coloração e tratamentos capilares',
    icon: <Scissors className="w-6 h-6" />,
    color: 'from-purple-500 to-purple-600',
  },
  {
    value: 'manicure',
    label: 'Manicure',
    description: 'Cuidados com unhas e esmaltação',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-pink-500 to-pink-600',
  },
  {
    value: 'esteticista',
    label: 'Esteticista',
    description: 'Tratamentos faciais e corporais',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-teal-500 to-teal-600',
  },
  {
    value: 'maquiador',
    label: 'Maquiador',
    description: 'Maquiagem social, artística e noivas',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-rose-500 to-rose-600',
  },
];

interface SpecialtyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (specialty: string) => void;
  selectedSpecialty: string;
}

export const SpecialtyModal: React.FC<SpecialtyModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedSpecialty,
}) => {
  const handleSelect = (value: string) => {
    onSelect(value);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="relative px-8 pt-8 pb-4">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                Qual é a sua especialidade?
              </h2>
              <p className="text-gray-500 mt-2">
                Escolha a área que melhor representa seu trabalho
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-6 max-h-[60vh] overflow-y-auto">
            <div className="space-y-3">
              {SPECIALTIES.map((spec, index) => (
                <motion.button
                  key={spec.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSelect(spec.value)}
                  className={cn(
                    'w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left group',
                    selectedSpecialty === spec.value
                      ? 'border-primary-500 bg-primary-50/50'
                      : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br transition-transform duration-200 group-hover:scale-105',
                      spec.color
                    )}
                  >
                    {spec.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{spec.label}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {spec.description}
                    </p>
                  </div>

                  {/* Check */}
                  <div
                    className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200',
                      selectedSpecialty === spec.value
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-transparent group-hover:bg-gray-200'
                    )}
                  >
                    <Check className="w-4 h-4" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 bg-gray-50/80 border-t border-gray-100">
            <p className="text-center text-sm text-gray-400">
              Você poderá atualizar isso depois nas configurações
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
