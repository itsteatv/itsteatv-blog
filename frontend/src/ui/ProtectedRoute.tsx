import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ReactNode, useEffect } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();

  const isAuthenticated = !!Cookies.get("access_token");
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
