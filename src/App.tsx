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
import ListarProdutos from './components/produto/listarprodutos/ListarProdutos'
import DeletarProduto from './components/deletarproduto/DeletarProduto'
import FormProduto from './components/produto/formproduto/FormProduto'

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
            <Route path="/produtos" element={<ListarProdutos />} />
            <Route path="/cadastrarproduto" element={<FormProduto />} />
            <Route path="/editarproduto/:id" element={<FormProduto />} />
            <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;