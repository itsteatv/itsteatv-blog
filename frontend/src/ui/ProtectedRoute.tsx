import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ReactNode, useEffect } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const isAuthenticated = !!cookies.access_token;
  const isProtectedRoute =
    location.pathname !== "/signin" && location.pathname !== "/signup";

  useEffect(() => {
    if (!isAuthenticated && isProtectedRoute) {
      navigate("/signup");
    }
  }, [isAuthenticated, isProtectedRoute, navigate]);

  return isAuthenticated && isProtectedRoute ? children : null;
}

export default ProtectedRoute;
