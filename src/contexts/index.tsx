import { createContext, useContext } from 'react';
import { GlobalDespesasContext, DespesaContextType } from './despesas';
import { AuthContextType, GlobalAuthContext } from './auth';

export interface UBRContext {
  despesas: DespesaContextType;
  auth: AuthContextType
}

export const GlobalContext = createContext<UBRContext>({} as UBRContext);

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
export const rascunhoReducer = (state: any, action: any) => {
  let cookies = JSON.parse(window.localStorage.getItem('rascunho')!);
  window.localStorage.removeItem('rascunho');

  state = Object.assign(cookies, action.payload);

  Object.assign(state.titulares[0], cookies.titulares[0], action.payload?.titular);

  window.localStorage.setItem('rascunho', JSON.stringify(state));

  return state;
};

export default GlobalContextProvider;
