import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContextType, User } from '../types/AdminTableTypes';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() =>
  sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user') || '') : null
  );
  const [accessToken, setAccessToken] = useState<string | null>(() =>
  sessionStorage.getItem('access') ? JSON.parse(sessionStorage.getItem('access') || '') : null
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
  sessionStorage.getItem('refresh') ? JSON.parse(sessionStorage.getItem('refresh') || '') : null
  );


  const login = async (email: string, password: string) => {
    try {
      const response: AxiosResponse<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }> = await axios.post('https://markedapi-b89c1e24f33a.herokuapp.com/login', { email, password });
      if (response.status === 200) {
        const { user, accessToken, refreshToken } = response.data;

        setUser(user);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('access', JSON.stringify(accessToken));
        sessionStorage.setItem('refresh', JSON.stringify(refreshToken));

      
      }
    } catch (error: any) {
      throw Error(error.response.data.error);
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    sessionStorage.clear();
    window.location.href = '/';
  };

  const renewToken = async () => {
    try {
      const response = await axios.post('https://markedapi-b89c1e24f33a.herokuapp.com/refresh', { refreshToken });
      setAccessToken(response.data.access);
      sessionStorage.setItem('access', JSON.stringify(response.data.access));
    } catch (error) {
      console.error('Erro ao renovar o token:', error);
      logout(); // Desloga o usuário em caso de erro na renovação do token
    }
  };

  


  return (
    <AuthContext.Provider
      value={{ user, login, logout, accessToken, renewToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
