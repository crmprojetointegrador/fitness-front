import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/home/Home"
import ImcPage from './pages/Imc'
import ListarCategorias from "./pages/categorias/ListarCategorias"
import FormCategoria from './components/categoria/formcategoria/FormCategoria'
import DeletarCategoria from './components/categoria/deletarcategoria/DeletarCategoria'

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />

        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/imc" element={<ImcPage />} />
            <Route path="/categorias" element={<ListarCategorias />} />
            <Route path="/cadastrarcategoria" element={<FormCategoria />} />
            <Route path="/editarcategoria/:id" element={<FormCategoria />} />
            <Route path="/categorias/deletar/:id" element={<DeletarCategoria />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;