import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import PageChat from './page/PageChat/PageChat';
import PageChatList from './page/PageChatList/PageChatList';
import PageMyProfile from './page/PageMyProfile/PageMyProfile';
import ROUTES from './config/routes.js';
import PageRegister from './page/PageRegister/PageRegister.jsx';
import PageAuth from './page/PageAuth/PageAuth.jsx';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute.jsx';

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path={ROUTES.register} element={<PageRegister />} />
        <Route path={ROUTES.auth} element={<PageAuth />} />
        <Route element={<PrivateRoute />}>
          <Route path={ROUTES.root} element={<PageChatList />} />
          <Route path={ROUTES.myProfile} element={<PageMyProfile />} />
          <Route path={ROUTES.chatWithChatId} element={<PageChat />} />
        </Route>
        <Route path="*" element={<div>404...Страница не найдена </div>} />
      </Routes>
    </HashRouter>
  )
}

export default App
