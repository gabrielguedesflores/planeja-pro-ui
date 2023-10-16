export interface Despesa {
  id: string,
  userId: string,
  description: string,
  amount: number,
  date: string,
  tags?: []
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
}

export interface Login {
  userEmail: string,
  userPassword: string
}