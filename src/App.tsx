import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImcPage from './pages/Imc';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Router>
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/imc" element={<ImcPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
