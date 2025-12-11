import { useState, useEffect } from 'react';
import { userService } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';

interface DashboardData {
  user: any;
  upcoming_appointments?: any[];
  recent_history?: any[];
  today_appointments?: any[];
  stats: {
    total_appointments?: number;
    total_spent?: number;
    upcoming_count?: number;
    today_revenue?: number;
    month_revenue?: number;
    today_clients?: number;
    month_clients?: number;
    rating?: number;
    total_reviews?: number;
  };
}

export const useDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const fetchDashboardData = async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await userService.getDashboardData();
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Erro ao carregar dados');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [isAuthenticated]);

  return {
    data,
    loading,
    error,
    refetch: fetchDashboardData,
  };
};