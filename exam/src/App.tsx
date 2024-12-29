import Home from './pages/Home/Home';
import History from './pages/History/History';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/history" element={<History />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<div>404...Страница не найдена </div>} />
    </Routes>
  )
}

export default App
