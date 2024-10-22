import { usePage } from './hooks/usePage';
import PageChat from './page/PageChat/PageChat';
import PageChatList from './page/PageChatList/PageChatList';

function App() {
  const { chatId } = usePage();
  return (
    <>
      {chatId ? <PageChat /> : <PageChatList />}
    </>
  )
}

export default App
