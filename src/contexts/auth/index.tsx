import { useState } from 'react';
import { Despesa, User } from '../../types';

export interface AuthContextType {
  getUser: (userId: string) => void;
  user: User[] | null;
  acessToken: any;
}

export const GlobalAuthContext = (): AuthContextType => {
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const setCookie = (data: any) => {
    window.localStorage.setItem('rascunho', JSON.stringify(data));
  };

  const getUser = (userId: string) => {
    return {
      userName: 'string',
      userPassword: 'string',
      userEmail: 'string',
      role: 'string',
      profileImage: 'string',
      coverImage: 'string',
      userDateLastUpdated: 'string',
    }
  }

  const acessToken = false;

  return {
    getUser,
    user,
    acessToken
  };
};
