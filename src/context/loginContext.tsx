// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
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
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);


  const login = async (email: string, password: string) => {
    try {
      const response: AxiosResponse<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }> = await axios.post('http://localhost:8080/login', { email, password });
      if(response.status===200){
        setUser(response.data.user);
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        }
    } catch (error: any) {
      throw Error(error.response.data.error)
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    window.location.href = '/login';
  };

  useEffect(() => {
    // Axios interceptor para adicionar o token de acesso em cada requisição
    axios.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    });

    // Axios interceptor para lidar com tokens expirados
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401) {
          // Token de acesso expirado, tenta renovar com o token de atualização
          try {
            const response: AxiosResponse<{
              accessToken: string;
            }> = await axios.post('http://localhost:8080/refresh', { refreshToken });
            setAccessToken(response.data.accessToken);
            return axios(error.config); // Repete a requisição original com o novo token de acesso
          } catch (refreshError) {
            console.error('Erro ao renovar token de acesso', refreshError);
            logout(); // Desconecta o usuário se a renovação do token falhar
          }
        }
        return Promise.reject(error);
      }
    );
  }, [accessToken, refreshToken]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
