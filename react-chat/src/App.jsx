import { Route, Routes, useNavigate } from "react-router-dom";
import PageChat from "./page/PageChat/PageChat";
import PageChatList from "./page/PageChatList/PageChatList";
import PageMyProfile from "./page/PageProfile/PageProfile.jsx";
import ROUTES from "./config/routes.js";
import PageRegister from "./page/PageRegister/PageRegister.jsx";
import PageAuth from "./page/PageAuth/PageAuth.jsx";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute.jsx";
import globalRouter from "./globalRouter.js";
import PageChatInfo from "./page/PageChatInfo/PageChatInfo.jsx";

function App() {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;
  
  return (
    <Routes>
      <Route path={ROUTES.register} element={<PageRegister />} />
      <Route path={ROUTES.auth} element={<PageAuth />} />
      <Route element={<PrivateRoute />}>
        <Route path={ROUTES.root} element={<PageChatList />} />
        <Route path={ROUTES.profileWithUserId} element={<PageMyProfile />} />
        <Route path={ROUTES.chatWithChatId} element={<PageChat />} />
        <Route path={ROUTES.infoWithChatId} element={<PageChatInfo />} />
      </Route>
      <Route path="*" element={<div>404...Страница не найдена </div>} />
    </Routes>
  );
}

export default App;
