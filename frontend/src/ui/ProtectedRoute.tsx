import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("access_token");
  console.log(isAuthenticated);
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
