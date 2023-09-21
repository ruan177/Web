
import { useAuth } from "../context/loginContext";


export function PrivateRoute({ children }: { children: JSX.Element }) {
    const { loggedIn } = useAuth();
  
    if (!loggedIn) {
      window.location.href = "/login";
  
    };
    return children;
}