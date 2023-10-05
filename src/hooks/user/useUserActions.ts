import { useAuth } from "../../context/loginContext";

export function useUserActions() {
    const { loggedIn, changeLoggedIn } = useAuth();
    const userUuid = localStorage.getItem('user');
  
    const logout = () => {
      changeLoggedIn(false);
      localStorage.clear();
    };
  
    return {
      loggedIn,
      userUuid,
      logout,
    };
  }