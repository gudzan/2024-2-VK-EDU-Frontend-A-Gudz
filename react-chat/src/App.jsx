import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageChat from './page/PageChat/PageChat';
import PageChatList from './page/PageChatList/PageChatList';
import PageMyProfile from './page/PageMyProfile/PageMyProfile';

function App() {
  const baseUrl = '/2024-2-VK-EDU-Frontend-A-Gudz'
  return (
    <BrowserRouter>
      <Routes>
        <Route path={baseUrl} element={<PageChatList />} />
        <Route path={`${baseUrl}/my-profile`} element={<PageMyProfile />} />
        <Route path={`${baseUrl}/chat/:chatId`} element={<PageChat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
