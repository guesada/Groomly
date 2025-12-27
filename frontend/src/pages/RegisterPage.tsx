import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAuth } from '@/hooks/useAuth';
import { SpecialtyModal } from '@/components/SpecialtyModal';

export const RegisterPage: React.FC = () => {
  const [userType, setUserType] = useState<'client' | 'professional'>('client');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSpecialtyModal, setShowSpecialtyModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    specialty: '',
    experience: ''
  });

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        userType,
        ...(userType === 'professional' && {
          specialty: formData.specialty,
          address: formData.address
        })
      };

      const success = await register(registrationData);
      
      if (success) {
        // Redireciona baseado no tipo de usuário
        if (userType === 'client') {
          navigate('/cliente');
        } else {
          navigate('/barbeiro');
        }
      }
    } catch (error) {
      console.error('Erro no registro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            className="relative mx-auto mb-8"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 w-24 h-24 mx-auto bg-primary-400/20 rounded-full blur-2xl" />
            
            {/* Logo container */}
            <div className="relative w-24 h-24 mx-auto bg-white rounded-2xl shadow-lg shadow-primary-100/50 p-3 ring-1 ring-gray-100">
              <img 
                src="/logo.png" 
                alt="Zelo Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Bem-vindo ao Zelo
            </h2>
            <p className="text-gray-500">
              Crie sua conta e comece agora
            </p>
          </motion.div>
        </div>

        {/* User Type Selection */}
        <div className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-gray-200/50">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setUserType('client')}
              className={cn(
                'p-4 rounded-xl text-sm font-semibold transition-all duration-200',
                userType === 'client'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              Sou Cliente
            </button>
            <button
              type="button"
              onClick={() => setUserType('professional')}
              className={cn(
                'p-4 rounded-xl text-sm font-semibold transition-all duration-200',
                userType === 'professional'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              Sou Profissional
            </button>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Seu nome completo"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
            </div>

            {/* Professional-specific fields */}
            {userType === 'professional' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Especialidade
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowSpecialtyModal(true)}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-3 border rounded-xl transition-all duration-200 text-left',
                      formData.specialty
                        ? 'border-primary-300 bg-primary-50/50'
                        : 'border-gray-300 hover:border-gray-400'
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <Sparkles className="w-5 h-5 text-gray-400" />
                      {formData.specialty ? (
                        <span className="text-gray-900 font-medium capitalize">
                          {formData.specialty}
                        </span>
                      ) : (
                        <span className="text-gray-500">Selecione sua especialidade</span>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Endereço do Estabelecimento
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="Endereço completo"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-lg py-4 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'Criando conta...' : 'Criar Conta'}</span>
              {!loading && (
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              )}
            </motion.button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Já tem uma conta?{' '}
              <Link 
                to="/login" 
                className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200"
              >
                Fazer Login
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link 
            to="/" 
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            ← Voltar ao início
          </Link>
        </div>
      </motion.div>

      {/* Specialty Modal */}
      <SpecialtyModal
        isOpen={showSpecialtyModal}
        onClose={() => setShowSpecialtyModal(false)}
        onSelect={(specialty) => setFormData({ ...formData, specialty })}
        selectedSpecialty={formData.specialty}
      />
    </div>
  );
};