import React, { createContext, useContext, useState, useEffect } from 'react';

// Defina o tipo para o contexto
interface AuthContextType {
  loggedIn: boolean;
  changeLoggedIn: (value: boolean) => void;
}

// Crie o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crie um componente de provedor para encapsular a lógica de autenticação
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loggedIn, setLoggedIn] = useState<boolean>(
    localStorage.access ? true : false
  );

  function changeLoggedIn(value: boolean) {
    setLoggedIn(value);
    if (value === false) {
      localStorage.clear();
      window.location.href = '/login';
    }
  }

  useEffect(() => {
    // Quando o estado loggedIn é atualizado, você pode realizar ações específicas aqui
    // Por exemplo, você pode realizar uma chamada de API para atualizar o estado do usuário ou fazer qualquer outra coisa que seja necessária.
  }, [loggedIn]);

  return (
    <AuthContext.Provider value={{ loggedIn, changeLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

// Crie um gancho personalizado para acessar o contexto em componentes filhos
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
