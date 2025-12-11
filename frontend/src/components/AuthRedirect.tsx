import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const AuthRedirect: React.FC = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated && user) {
        // Redireciona para o dashboard correto
        if (user.type === 'client') {
          navigate('/cliente', { replace: true });
        } else if (user.type === 'professional') {
          navigate('/barbeiro', { replace: true });
        }
      }
      // Se não está autenticado, fica na página inicial
    }
  }, [user, loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return null; // Não renderiza nada, apenas redireciona
};