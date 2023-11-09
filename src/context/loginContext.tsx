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
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null
  );
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access') || '') : null
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    localStorage.getItem('refresh') ? JSON.parse(localStorage.getItem('refresh') || '') : null
  );
  const [lastActivity, setLastActivity] = useState(Date.now());
  const inactivityTimeout = 900000; // 15 minutos em milissegundos
  let inactivityTimer: number;

  const handleInactivity = () => {
    logout(); // Desloga o usuário quando inativo
  };

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(handleInactivity, inactivityTimeout);
  };

  const login = async (email: string, password: string) => {
    try {
      const response: AxiosResponse<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }> = await axios.post('http://localhost:8080/login', { email, password });
      if (response.status === 200) {
        const { user, accessToken, refreshToken } = response.data;

        setUser(user);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('access', JSON.stringify(accessToken));
        localStorage.setItem('refresh', JSON.stringify(refreshToken));

        resetInactivityTimer();
      }
    } catch (error: any) {
      throw Error(error.response.data.error);
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.clear();
    window.location.href = '/login';
  };

  const renewToken = async () => {
    try {
      const response = await axios.post('http://localhost:8080/refresh', { refreshToken });
      const newAccessToken = response.data.access;
      setAccessToken(newAccessToken);
      localStorage.setItem('access', JSON.stringify(newAccessToken));
    } catch (error) {
      console.error('Erro ao renovar o token:', error);
      logout(); // Desloga o usuário em caso de erro na renovação do token
    }
  };

  const handleUserActivity = useCallback(() => {
    setLastActivity(Date.now());
    resetInactivityTimer();
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    resetInactivityTimer();

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, [handleUserActivity]);

  useEffect(() => {
    const checkInactivity = setInterval(() => {
      const elapsedTime = Date.now() - lastActivity;
      if (elapsedTime >= inactivityTimeout) {
        handleInactivity();
      }
    }, 1000);

    return () => {
      clearInterval(checkInactivity);
    };
  }, [lastActivity, inactivityTimeout]);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, accessToken, renewToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
