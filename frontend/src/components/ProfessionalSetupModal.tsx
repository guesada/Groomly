import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Check,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface WorkingDay {
  enabled: boolean;
  startTime: string;
  endTime: string;
  breakStart: string;
  breakEnd: string;
}

interface ProfessionalSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: SetupData) => Promise<void>;
  initialData?: {
    specialty?: string;
    workingHours?: Record<number, WorkingDay>;
  };
}

interface SetupData {
  specialty: string;
  workingHours: Record<number, WorkingDay>;
}

const DAYS_OF_WEEK = [
  { id: 0, name: 'Domingo', short: 'Dom' },
  { id: 1, name: 'Segunda-feira', short: 'Seg' },
  { id: 2, name: 'Terça-feira', short: 'Ter' },
  { id: 3, name: 'Quarta-feira', short: 'Qua' },
  { id: 4, name: 'Quinta-feira', short: 'Qui' },
  { id: 5, name: 'Sexta-feira', short: 'Sex' },
  { id: 6, name: 'Sábado', short: 'Sáb' },
];

const SPECIALTIES = [
  { value: 'barbeiro', label: 'Barbeiro', emoji: '💈' },
  { value: 'cabeleireiro', label: 'Cabeleireiro', emoji: '✂️' },
  { value: 'manicure', label: 'Manicure', emoji: '💅' },
  { value: 'esteticista', label: 'Esteticista', emoji: '🧖' },
  { value: 'maquiador', label: 'Maquiador', emoji: '💄' },
];

const TIME_OPTIONS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00',
];

const DEFAULT_WORKING_DAY: WorkingDay = {
  enabled: false,
  startTime: '09:00',
  endTime: '18:00',
  breakStart: '12:00',
  breakEnd: '13:00',
};

export const ProfessionalSetupModal: React.FC<ProfessionalSetupModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [step, setStep] = useState(1);
  const [specialty, setSpecialty] = useState(initialData?.specialty || '');
  const [workingHours, setWorkingHours] = useState<Record<number, WorkingDay>>(() => {
    if (initialData?.workingHours) return initialData.workingHours;
    
    // Default: Segunda a Sábado habilitados
    const defaults: Record<number, WorkingDay> = {};
    DAYS_OF_WEEK.forEach((day) => {
      defaults[day.id] = {
        ...DEFAULT_WORKING_DAY,
        enabled: day.id >= 1 && day.id <= 6, // Seg-Sáb
      };
    });
    return defaults;
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleDayToggle = (dayId: number) => {
    setWorkingHours((prev) => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        enabled: !prev[dayId].enabled,
      },
    }));
  };

  const handleTimeChange = (
    dayId: number,
    field: keyof WorkingDay,
    value: string
  ) => {
    setWorkingHours((prev) => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        [field]: value,
      },
    }));
  };

  const handleNext = () => {
    if (step === 1 && !specialty) {
      setError('Selecione sua especialidade');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleBack = () => {
    setError('');
    setStep(1);
  };

  const handleSave = async () => {
    const enabledDays = Object.values(workingHours).filter((d) => d.enabled);
    if (enabledDays.length === 0) {
      setError('Selecione pelo menos um dia de trabalho');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await onSave({ specialty, workingHours });
      onClose();
    } catch (err) {
      setError('Erro ao salvar configurações. Tente novamente.');
    } finally {
      setSaving(false);
    }
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
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {step === 1 ? 'Sua Especialidade' : 'Horários de Trabalho'}
              </h2>
              <p className="text-gray-600 mt-1">
                {step === 1
                  ? 'Escolha sua área de atuação'
                  : 'Configure seus dias e horários disponíveis'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Progress */}
          <div className="px-6 pt-4">
            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  'flex-1 h-2 rounded-full transition-colors',
                  step >= 1 ? 'bg-primary-500' : 'bg-gray-200'
                )}
              />
              <div
                className={cn(
                  'flex-1 h-2 rounded-full transition-colors',
                  step >= 2 ? 'bg-primary-500' : 'bg-gray-200'
                )}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>Especialidade</span>
              <span>Horários</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[50vh]">
            {step === 1 ? (
              /* Step 1: Specialty Selection */
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SPECIALTIES.map((spec) => (
                    <motion.button
                      key={spec.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSpecialty(spec.value);
                        setError('');
                      }}
                      className={cn(
                        'flex items-center space-x-4 p-4 rounded-xl border-2 transition-all',
                        specialty === spec.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      )}
                    >
                      <span className="text-3xl">{spec.emoji}</span>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-gray-900">{spec.label}</p>
                      </div>
                      {specialty === spec.value && (
                        <Check className="w-5 h-5 text-primary-500" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              /* Step 2: Working Hours */
              <div className="space-y-4">
                {DAYS_OF_WEEK.map((day) => (
                  <div
                    key={day.id}
                    className={cn(
                      'p-4 rounded-xl border transition-all',
                      workingHours[day.id]?.enabled
                        ? 'border-primary-200 bg-primary-50/50'
                        : 'border-gray-200 bg-gray-50'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={workingHours[day.id]?.enabled || false}
                          onChange={() => handleDayToggle(day.id)}
                          className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span
                          className={cn(
                            'font-medium',
                            workingHours[day.id]?.enabled
                              ? 'text-gray-900'
                              : 'text-gray-500'
                          )}
                        >
                          {day.name}
                        </span>
                      </label>
                    </div>

                    {workingHours[day.id]?.enabled && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3"
                      >
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Início
                          </label>
                          <select
                            value={workingHours[day.id]?.startTime}
                            onChange={(e) =>
                              handleTimeChange(day.id, 'startTime', e.target.value)
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          >
                            {TIME_OPTIONS.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Fim
                          </label>
                          <select
                            value={workingHours[day.id]?.endTime}
                            onChange={(e) =>
                              handleTimeChange(day.id, 'endTime', e.target.value)
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          >
                            {TIME_OPTIONS.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Intervalo início
                          </label>
                          <select
                            value={workingHours[day.id]?.breakStart}
                            onChange={(e) =>
                              handleTimeChange(day.id, 'breakStart', e.target.value)
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          >
                            <option value="">Sem intervalo</option>
                            {TIME_OPTIONS.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Intervalo fim
                          </label>
                          <select
                            value={workingHours[day.id]?.breakEnd}
                            onChange={(e) =>
                              handleTimeChange(day.id, 'breakEnd', e.target.value)
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          >
                            <option value="">Sem intervalo</option>
                            {TIME_OPTIONS.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 mt-4 p-3 bg-red-50 text-red-700 rounded-xl"
              >
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            {step === 2 ? (
              <button
                onClick={handleBack}
                className="px-6 py-3 text-gray-700 font-medium hover:bg-gray-200 rounded-xl transition-colors"
              >
                Voltar
              </button>
            ) : (
              <div />
            )}

            {step === 1 ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
              >
                Próximo
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={saving}
                className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Salvando...' : 'Salvar Configurações'}
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
