
import { useAuth } from "../context/loginContext";


export function PrivateRoute({ children }: { children: JSX.Element }) {
    const { user, logout } = useAuth();
  
    if (!user) {
      logout();
  
    };
    return children;
}