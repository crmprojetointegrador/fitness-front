import { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext';

function Navbar() {
    const context = useContext(UserContext);
    const navigate = useNavigate();

    if (!context) return null;
    const { usuarioAtual, estaLogado, logout } = context;

    return (
        <div className="w-full bg-linear-to-r from-[#C9EED9] to-[#FFFFFF] flex-col items-center px-8 py-4 shadow-md">
            <div className="w-full flex justify-between items-center">
                <Link to='/home' className="text-3xl font-bold text-gray-800">
                    🏋️ PowerPlace 🏋️
                </Link>

                <div className='flex gap-6 items-center text-gray-700'>
                    <Link to='/home' className='hover:text-green-700 transition'>Home</Link>
                    <Link to='/about' className='hover:underline'>Sobre nós</Link>

                    {estaLogado ? (
                        <>
                            <Link to='/categorias' className='hover:text-green-700 transition'>Categorias</Link>
                            <Link to='/produtos' className='hover:text-green-700 transition'>Produtos</Link>
                            <Link to='/imc' className='hover:text-green-700 transition'>Calcule seu IMC</Link>

                            <div className="flex items-center gap-3 bg-white/60 border border-green-200 rounded-lg px-3 py-1 ml-2">
                                <span className="text-sm font-semibold text-gray-800">Olá, {usuarioAtual?.nome.split(' ')[0]}</span>
                                <button
                                    onClick={logout}
                                    className="text-xs font-bold text-red-600 hover:text-red-800 transition cursor-pointer"
                                >
                                    Sair
                                </button>
                            </div>
                        </>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-green-600 text-white text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-green-700 transition"
                        >
                            Entrar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;