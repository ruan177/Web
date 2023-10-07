export interface User {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
  }
  
export interface Course {
    id: number;
    name: string;
    description: string;
    isAproved: boolean;
  }
 export interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => void;
    logout: () => void;
  }