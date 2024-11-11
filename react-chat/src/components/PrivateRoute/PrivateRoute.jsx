import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ROUTES from "../../config/routes";

export const PrivateRoute = () => {
  const { isAuth } = useAuth()
  const location = useLocation()
  if (isAuth === true) {
    return <Outlet />
  }
  return <Navigate to={ROUTES.auth} state={{ from: location }} replace />
};
