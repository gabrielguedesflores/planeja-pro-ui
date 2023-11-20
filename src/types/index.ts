export interface Despesa {
  _id: string,
  userId: string,
  description: string,
  amount: number,
  date: string,
  tags?: [],
  _class?: string
};

export interface User {
  userName: string,
  userPassword: string,
  userEmail: string,
  role: string,
  profileImage: string,
  coverImage: string,
  userDateLastUpdated: string,
};

export default class RoutesPaths {
  static dashboard = '/dashboard';
  static despesas = '/despesas';
  static login = '/login';
  static cadastro = '/cadastro';
  static perfil = '/perfil';
  static configuracoes = '/configuracoes';
}

export interface Login {
  userEmail: string,
  userPassword: string
}
export class ErrorMessages {
  static defaultError = 'Serviço indisponível. Tente novamente mais tarde.';
}