
import { useAuth } from "../context/loginContext";


export function AdminRoute({ children }: { children: JSX.Element }) {
    const { user, logout } = useAuth();
  
    if (!user?.isAdmin) {
      logout();
  
    };
    return children;
}