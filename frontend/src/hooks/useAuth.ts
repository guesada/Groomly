import { useState, useEffect, createContext, useContext } from 'react';
import { authService, User } from '@/services/api';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: any) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Verifica se o usuário está logado ao carregar a página
  useEffect(() => {
    // Sempre verifica auth, mas não redireciona se estivermos em login/register
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authService.getCurrentUser();
      if (response.success && response.user) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (error: any) {
      // Se for 401, usuário não está logado (normal)
      // Outros erros podem ser problemas de rede
      console.log('Auth check:', error.response?.status === 401 ? 'Not authenticated' : error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await authService.login({ email, password });
      
      if (response.success && response.user) {
        setUser(response.user);
        toast.success(response.message || 'Login realizado com sucesso!');
        return true;
      } else {
        toast.error(response.message || 'Erro ao fazer login');
        return false;
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao fazer login';
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: any): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await authService.register(data);
      
      if (response.success && response.user) {
        setUser(response.user);
        toast.success(response.message || 'Cadastro realizado com sucesso!');
        return true;
      } else {
        toast.error(response.message || 'Erro ao fazer cadastro');
        return false;
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao fazer cadastro';
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
      setUser(null);
      toast.success('Logout realizado com sucesso!');
      // Redireciona para a página inicial
      window.location.href = '/';
    } catch (error) {
      // Mesmo com erro, limpa o usuário localmente
      setUser(null);
      window.location.href = '/';
    }
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
};

export { AuthContext };