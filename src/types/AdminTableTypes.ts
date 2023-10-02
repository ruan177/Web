export interface User {
    id: number;
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