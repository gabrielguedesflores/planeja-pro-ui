import { useState } from 'react';
import { Despesa, User } from '../../types';

export interface DespesaContextType {
  getDespesa: (userId: string) => void;
  despesas: Despesa[] | null;
}

export const GlobalDespesasContext = (): DespesaContextType => {
  const [error, setError] = useState<string | null>(null);
  const [despesas, setDespesas] = useState<Despesa[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const setCookie = (data: any) => {
    window.localStorage.setItem('rascunho', JSON.stringify(data));
  };

  const getDespesa = () => {
    return {
      id: "string",
      userId: "string",
      description: "string",
      amount: 1,
      date: "string",
      tags: []
    }
  }

  return {
    getDespesa,
    despesas,
  };
};
