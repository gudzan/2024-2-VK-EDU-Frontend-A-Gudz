import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageChat from './page/PageChat/PageChat';
import PageChatList from './page/PageChatList/PageChatList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/2024-2-VK-EDU-Frontend-A-Gudz" element={<PageChatList />} />
        <Route path="/2024-2-VK-EDU-Frontend-A-Gudz/chat/:chatId" element={<PageChat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
