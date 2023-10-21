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
  const [user, setUser] =useState(()=> localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || "") : null);
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access') || "") : null);
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refresh') ? JSON.parse(localStorage.getItem('refresh') || "") : null);


  const login = async (email: string, password: string) => {
    try {
      const response: AxiosResponse<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }> = await axios.post('https://node-api-v91t.onrender.com/login', { email, password });
      if(response.status === 200){
        const { user, accessToken, refreshToken } = response.data;
  
        setUser(user);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
  
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('access', JSON.stringify(accessToken));
        localStorage.setItem('refresh', JSON.stringify(refreshToken));
       
      }
    } catch (error: any) {
      throw Error(error.response.data.error)

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
    const response = await axios.post('https://node-api-v91t.onrender.com/refresh', { refreshToken });
    const newAccessToken = response.data.access;
    setAccessToken(newAccessToken);
    localStorage.setItem('access', JSON.stringify(newAccessToken));
  };

 
  return (
    <AuthContext.Provider value={{ user, login, logout, accessToken, renewToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};
