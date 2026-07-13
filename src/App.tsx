import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import FormCategoria from './components/categoria/formcategoria/FormCategoria'
import DeletarCategoria from './components/categoria/deletarcategoria/DeletarCategoria'
function App() {
  return (
    <>

      <ToastContainer />
      <BrowserRouter>
        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/cadastrarcategoria" element={<FormCategoria />} />
            <Route path="/editarcategoria/:id" element={<FormCategoria />} />
            <Route path="/categorias/deletar/:id" element={<DeletarCategoria />} />          
            </Routes>
        </div>
      </BrowserRouter>

    </>
  )
}

export default App