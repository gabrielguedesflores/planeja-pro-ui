import { createContext, useContext } from 'react';
import { GlobalDespesasContext, DespesaContextType } from './despesas';
import { AuthContextType, GlobalAuthContext } from './auth';

export interface InterfaceContext {
  despesas: DespesaContextType;
  auth: AuthContextType
}

export const GlobalContext = createContext<InterfaceContext>({} as InterfaceContext);

interface GlobalContextProviderType {
  children: React.ReactNode;
}

const GlobalContextProvider = ({ children }: GlobalContextProviderType) => {
  return (
    <GlobalContext.Provider
      value={{
        despesas: GlobalDespesasContext(),
        auth: GlobalAuthContext()
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useDespesaContext = () => useContext(GlobalContext).despesas;
export const useAuthContext = () => useContext(GlobalContext).auth;

export default GlobalContextProvider;
