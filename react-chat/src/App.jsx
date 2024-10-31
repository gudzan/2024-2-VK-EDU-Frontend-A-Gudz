import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageChat from './page/PageChat/PageChat';
import PageChatList from './page/PageChatList/PageChatList';

function App() {
  const baseUrl = '/2024-2-VK-EDU-Frontend-A-Gudz'
  return (
    <BrowserRouter>
      <Routes>
        <Route path={baseUrl} element={<PageChatList />} />
        <Route path={`${baseUrl}/chat/:chatId`} element={<PageChat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
