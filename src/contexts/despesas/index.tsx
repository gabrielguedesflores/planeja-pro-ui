import { useState, useEffect } from 'react';
import { Despesa } from '../../types';
import { Endpoints, axiosInstance } from '../../api';

export interface DespesaContextType {
  getDespesas: () => Promise<void>;
  deleteDespesa: (despesaId: string) => Promise<void>;
  updateDespesa: (despesaId: string, updatedDespesa: Despesa) => Promise<void>;
  despesas: Despesa[] | null;
}

export const GlobalDespesasContext = (): DespesaContextType => {
  const [despesas, setDespesas] = useState<Despesa[] | null>(null);
  const storage = window.sessionStorage.getItem('session');
  let session: any;

  if (storage) {
    session = JSON.parse(storage);
    console.log('[useAuthContext]', session);
  }

  const accessToken = '6520e7081f2025b1828c482e';

  const authHeaders = {
    Authorization: `Bearer ${accessToken}`
  };

  useEffect(() => {
    const localDespesas = window.sessionStorage.getItem('despesas');
    if (localDespesas) {
      setDespesas(JSON.parse(localDespesas));
    }
  }, []);

  const getDespesas = async () => {
    try {
      const { data } = await axiosInstance.get(
        Endpoints.expense.get(session.user.id),
        { headers: authHeaders }
      );
      setDespesas(data);
      window.sessionStorage.setItem('despesas', JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching despesas:", error);
    }
  };

  const deleteDespesa = async (despesaId: string) => {
    try {
      await axiosInstance.delete(
        `${Endpoints.expense.delete}/${despesaId}`,
        { headers: authHeaders }
      );
      setDespesas(prev => prev ? prev.filter(despesa => despesa._id !== despesaId) : null);
    } catch (error) {
      console.error("Error deleting despesa:", error);
    }
  };

  const updateDespesa = async (despesaId: string, updatedDespesa: Despesa) => {
    try {
      await axiosInstance.put(
        `${Endpoints.expense.update}/${despesaId}`,
        updatedDespesa,
        { headers: authHeaders }
      );
      await getDespesas();
    } catch (error) {
      console.error("Error updating despesa:", error);
    }
  };

  return {
    getDespesas,
    deleteDespesa,
    updateDespesa,
    despesas,
  };
};
