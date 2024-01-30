import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
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

  return children;
}

export default ProtectedRoute;
