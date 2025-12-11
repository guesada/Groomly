import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card max-w-md w-full mx-4"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Groomly</span>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta!
          </h1>
          <p className="text-gray-600">
            Entre na sua conta para continuar
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              placeholder="seu@email.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              placeholder="••••••••"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              <span className="ml-2 text-sm text-gray-600">Lembrar-me</span>
            </label>
            <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
              Esqueceu a senha?
            </a>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-primary"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Entrar
          </motion.button>
          
          <p className="text-center text-gray-600">
            Não tem uma conta?{' '}
            <a href="/register" className="text-primary-600 hover:text-primary-700 font-medium">
              Cadastre-se gratuitamente
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};