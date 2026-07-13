import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserProvider } from './context/UserContext'
import './App.css'
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/home/Home"
import About from './pages/About'
import Login from "./pages/home/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import ListarCategorias from "./components/categoria/listarcategorias/ListarCategorias"
import FormCategoria from './components/categoria/formcategoria/FormCategoria'
import DeletarCategoria from './components/categoria/deletarcategoria/DeletarCategoria'
import ListarProdutos from "./components/produto/listarprodutos/ListarProdutos"
import FormProduto from './components/produto/formproduto/FormProduto'
import DeletarProduto from './components/deletarproduto/DeletarProduto'
import ImcPage from './pages/Imc'

function App() {
  return (
    <>
      <UserProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />

          <div className="min-h-[80vh]">
            <Routes>
              {/* Rotas Públicas */}
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />

              {/* Rotas Protegidas (Exigem login) */}
              <Route element={<ProtectedRoute />}>
             
                <Route path="/imc" element={<ImcPage />} />
                
                {/* Categorias */}
                <Route path="/categorias" element={<ListarCategorias />} />
                <Route path="/cadastrarcategoria" element={<FormCategoria />} />
                <Route path="/editarcategoria/:id" element={<FormCategoria />} />
                <Route path="/categorias/deletar/:id" element={<DeletarCategoria />} />

                {/* Produtos */}
                <Route path="/produtos" element={<ListarProdutos />} />
                <Route path="/cadastrarproduto" element={<FormProduto />} />
                <Route path="/editarproduto/:id" element={<FormProduto />} />
                <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
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