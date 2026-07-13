import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import ListarCategorias from "./pages/categorias/ListarCategorias";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />

                <div className="min-h-[80vh]">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/categorias" element={<ListarCategorias />} />
                    </Routes>
                </div>

                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;