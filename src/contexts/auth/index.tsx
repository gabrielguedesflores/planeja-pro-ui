import { Login } from '../../types';
import { Endpoints, axiosInstance } from '../../api';
import jwt from 'jwt-decode';

export interface AuthContextType {
  getSession: () => any;
  getUser: (userId: string, token: string) => any;
  logout: () => any;
  login: ({ userEmail, userPassword }: Login) => Promise<boolean>;
}

export const GlobalAuthContext = (): AuthContextType => {

  const getSession = (): any => {
    let session = {
      user: null,
      accessToken: null,
    };
    if (window.sessionStorage.getItem('session')) {
      const storage = window.sessionStorage.getItem('session');

      if (storage) {
        session = JSON.parse(storage);
      }
    }

    return session;
  };

  const getUser = async (userId: string, token: string) => {
    try {
      const { data } = await axiosInstance.get(
        Endpoints.user.getUser(userId),
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      return {
        name: data.userName,
        email: data.userEmail,
        role: data.role,
        profileImage: data.profileImage,
        coverImage: data.coverImage,
        userDateLastUpdated: data.userDateLastUpdated,
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const logout = (): boolean => {
    try {
      window.sessionStorage.removeItem('session');
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const login = async ({ userEmail, userPassword }: Login): Promise<boolean> => {
    try {
      const login = {
        userEmail,
        userPassword
      }

      const { data } = await axiosInstance.post(
        Endpoints.token.login(), 
        login,
      );

      const parsedToken: any = jwt(data.access_token);
      const user = await getUser(parsedToken.sub, data.access_token);
      
      const session = {
        user,
        accessToken: data.access_token,
      };

      window.sessionStorage.setItem('session', JSON.stringify(session));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return {
    getSession,
    getUser,
    logout,
    login
  };
};
