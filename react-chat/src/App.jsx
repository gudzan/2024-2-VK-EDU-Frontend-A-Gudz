import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import PageChat from './page/PageChat/PageChat';
import PageChatList from './page/PageChatList/PageChatList';
import PageMyProfile from './page/PageMyProfile/PageMyProfile';
import ROUTES from './config/routes.js';
import PageHome from './page/PageHome/PageHome.jsx';

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path={ROUTES.root} element={<PageChatList />} />
        <Route path={ROUTES.chats} element={<PageChatList />} />
        <Route path={ROUTES.myProfile} element={<PageMyProfile />} />
        <Route path={ROUTES.chatWithChatId} element={<PageChat />} />
        <Route path={ROUTES.login} element={<PageHome />} />
      </Routes>
    </HashRouter>
  )
}

export default App
