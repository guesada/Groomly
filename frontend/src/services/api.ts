import axios from 'axios';

// Configuração base do axios
const api = axios.create({
  baseURL: 'http://localhost:5001',
  withCredentials: true, // Importante para cookies de sessão
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para tratar erros globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Só redireciona para login se não estivermos já na página de login ou registro
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Tipos TypeScript
export interface User {
  id: number;
  name: string;
  email: string;
  type: 'client' | 'professional';
  phone?: string;
  address?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  userType: 'client' | 'professional';
  specialty?: string;
  address?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  user?: User;
  redirect?: string;
}

// Serviços de autenticação
export const authService = {
  // Registrar usuário
  async register(data: RegisterData): Promise<ApiResponse<User>> {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  },

  // Fazer login
  async login(data: LoginData): Promise<ApiResponse<User>> {
    const response = await api.post('/api/auth/login', data);
    return response.data;
  },

  // Fazer logout
  async logout(): Promise<ApiResponse> {
    const response = await api.post('/api/auth/logout');
    return response.data;
  },

  // Obter usuário atual
  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await api.get('/api/auth/me');
    return response.data;
  },
};

// Serviços de profissionais
export const professionalService = {
  // Listar profissionais
  async list(): Promise<ApiResponse> {
    const response = await api.get('/api/professionals');
    return response.data;
  },

  // Obter profissional por ID
  async getById(id: number): Promise<ApiResponse> {
    const response = await api.get(`/api/professionals/${id}`);
    return response.data;
  },
};

// Serviços de agendamentos
export const appointmentService = {
  // Listar agendamentos do usuário
  async list(): Promise<ApiResponse> {
    const response = await api.get('/api/appointments');
    return response.data;
  },

  // Criar agendamento
  async create(data: any): Promise<ApiResponse> {
    const response = await api.post('/api/appointments', data);
    return response.data;
  },

  // Cancelar agendamento
  async cancel(id: string): Promise<ApiResponse> {
    const response = await api.delete(`/api/appointments/${id}`);
    return response.data;
  },
};

// Serviços de serviços (lista de serviços disponíveis)
export const serviceService = {
  // Listar serviços
  async list(): Promise<ApiResponse> {
    const response = await api.get('/api/services');
    return response.data;
  },

  // Obter serviço por ID
  async getById(id: number): Promise<ApiResponse> {
    const response = await api.get(`/api/services/${id}`);
    return response.data;
  },
};

// Serviços de dados do usuário
export const userService = {
  // Obter dados do dashboard
  async getDashboardData(): Promise<ApiResponse> {
    const response = await api.get('/api/user/dashboard');
    return response.data;
  },
};

export default api;