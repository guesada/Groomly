export interface User {
  id: string;
  name: string;
  email: string;
  type: 'client' | 'professional';
  avatar?: string;
  phone?: string;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  icon: string;
}

export interface Professional {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  specialties: string[];
  services: Service[];
  rating: number;
  reviewCount: number;
  workingHours: WorkingHours;
}

export interface WorkingHours {
  [key: string]: {
    isOpen: boolean;
    start: string;
    end: string;
  };
}

export interface Appointment {
  id: string;
  clientId: string;
  professionalId: string;
  serviceId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  clientId: string;
  professionalId: string;
  appointmentId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}