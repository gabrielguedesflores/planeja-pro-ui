import { useState, useEffect, useCallback } from 'react';
import { Despesa } from '../../types';
import { Endpoints, axiosInstance } from '../../api';

export interface DespesaContextType {
  getDespesas: () => Promise<void>;
  deleteDespesa: (despesaId: string) => Promise<void>;
  updateDespesa: (despesaId: string, updatedDespesa: Despesa) => Promise<void>;
  getTags: (despesas: Despesa[]) => string[] | unknown[];
  despesas: Despesa[] | null;
}

export const GlobalDespesasContext = (): DespesaContextType => {
  const [despesas, setDespesas] = useState<Despesa[] | null>(null);
  const storage = window.sessionStorage.getItem('session');
  const localDespesas = window.sessionStorage.getItem('despesas');
  let session: any;

  const getDespesas = async () => {
    try {
      const { data } = await axiosInstance.get(
        Endpoints.expense.get(session.user.id)
      );
      setDespesas(data);
      window.sessionStorage.setItem('despesas', JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching despesas:", error);
    }
  };

  useEffect(() => {
    if (storage) {
      session = JSON.parse(storage);
      console.log('[useAuthContext]', session);
    }
  
    if (localDespesas) {
      setDespesas(JSON.parse(localDespesas));
    } else {
      getDespesas();
    }
  }, []);

  const createDespesa = () => {};

  const deleteDespesa = async (despesaId: string) => {
    try {
      await axiosInstance.delete(
        `${Endpoints.expense.delete}/${despesaId}`
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
      );
      await getDespesas();
    } catch (error) {
      console.error("Error updating despesa:", error);
    }
  };

  const getTags = (despesas: Despesa[]) => { 
    // if (!despesas) getDespesas();
    if (!despesas) {
      return [];
    }
    return Array.from(despesas.reduce((acc, despesa) => {
      (despesa?.tags || []).forEach(tag => acc.add(tag));
      return acc;
    }, new Set()));
  };
  
  return {
    getDespesas,
    deleteDespesa,
    updateDespesa,
    getTags,
    despesas,
  };
};