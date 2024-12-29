import { Navigate, Outlet, useLocation } from "react-router-dom";
import ROUTES from "../../config/routes";
import { useSelector } from "react-redux";
import { selectAuthStatus } from "../../store/auth/authSelectors";
import storeStatus from "../../store/storeStatus";
import ChatPolling from "../ChatsPolling/ChatPolling";

export const PrivateRoute = () => {
  const authStatus = useSelector(selectAuthStatus);
  const location = useLocation();
  if (authStatus === storeStatus.success) {
    return (
      <ChatPolling>
        <Outlet />
      </ChatPolling>
    );
  }
  return <Navigate to={ROUTES.auth} state={{ from: location }} replace />;
};
