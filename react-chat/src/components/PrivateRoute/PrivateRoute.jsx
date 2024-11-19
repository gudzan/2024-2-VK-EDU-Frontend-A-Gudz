import { Navigate, Outlet, useLocation } from "react-router-dom";
import ROUTES from "../../config/routes";
import { useSelector } from "react-redux";

export const PrivateRoute = () => {
  const { isSuccess } = useSelector((state) => state.auth)
  const location = useLocation()
  if (isSuccess) {
    return <Outlet />
  }
  return <Navigate to={ROUTES.auth} state={{ from: location }} replace />
};
