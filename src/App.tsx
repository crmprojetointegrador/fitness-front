import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserProvider } from './context/UserContext'
import './App.css'

import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/home/Home"
import ImcPage from './pages/Imc'
import ListarCategorias from "./components/categoria/listarcategorias/ListarCategorias"
import ListarProdutos from "./components/produto/listarprodutos/ListarProdutos"
import FormCategoria from './components/categoria/formcategoria/FormCategoria'
import DeletarCategoria from './components/categoria/deletarcategoria/DeletarCategoria'
import About from './pages/About'
import Login from "./pages/home/Login"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <>
      <UserProvider>
        <ToastContainer />
        <BrowserRouter>

          <Navbar />

          <div className="min-h-[80vh]">
            <Routes>
              {/*  Rotas Públicas: Qualquer pessoa pode acessar sem logar */}
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />

              {/* Rotas Protegidas: Se tentar acessar sem estar logada, vai direto para o /login */}
              <Route element={<ProtectedRoute />}>
                <Route path="/imc" element={<ImcPage />} />
                <Route path="/categorias" element={<ListarCategorias />} />
                <Route path="/produtos" element={<ListarProdutos />} />
                <Route path="/cadastrarcategoria" element={<FormCategoria />} />
                <Route path="/editarcategoria/:id" element={<FormCategoria />} />
                <Route path="/categorias/deletar/:id" element={<DeletarCategoria />} />
              </Route>
            </Routes>
          </div>

          <Footer />
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App;