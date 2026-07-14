import { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext';

function Navbar() {
    const context = useContext(UserContext);
    const navigate = useNavigate();

    const [menuAberto, setMenuAberto] = useState(false);

    if (!context) return null;
    const { usuarioAtual, estaLogado, logout } = context;

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    const fecharMenu = () => {
        setMenuAberto(false);
    };

    return (
        // Mantemos 'relative' para que o menu flutuante se alinhe perfeitamente logo abaixo
        <div className="w-full bg-linear-to-r from-[#C9EED9] to-[#FFFFFF] flex flex-col px-8 py-4 shadow-md relative z-50">
            <div className="w-full flex justify-between items-center">
                <Link to='/home' onClick={fecharMenu} className="text-2xl md:text-3xl font-bold text-gray-800">
                    🏋️ PowerPlace 🏋️
                </Link>

                {/* Botão Sanduíche */}
                <button
                    onClick={toggleMenu}
                    className="block md:hidden text-gray-800 focus:outline-none cursor-pointer"
                    aria-label="Abrir menu"
                >
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {menuAberto ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                {/* Menu Desktop */}
                <div className='hidden md:flex gap-6 items-center text-gray-700 font-medium'>
                    <Link to='/home' className='hover:text-green-700 transition'>Home</Link>
                    <Link to='/about' className='hover:underline'>Sobre nós</Link>

                    {estaLogado ? (
                        <>
                            <Link to='/categorias' className='hover:text-green-700 transition'>Categorias</Link>
                            <Link to='/produtos' className='hover:text-green-700 transition'>Produtos</Link>
                            <Link to='/imc' className='hover:text-green-700 transition'>Calcule seu IMC</Link>

                            <div className="flex items-center gap-3 bg-white/60 border border-green-200 rounded-lg px-3 py-1 ml-2">
                                <Link to='/perfil' className="text-sm font-semibold text-gray-800 hover:text-green-700 transition">
                                    Olá, {usuarioAtual?.nome.split(' ')[0]}
                                </Link>
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
                            className="bg-green-600 text-white text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-green-700 transition cursor-pointer"
                        >
                            Entrar
                        </button>
                    )}
                </div>
            </div>

            {/* 📱 Menu Mobile Dropdown - AGORA FLUTUANDO (Overlay) */}
            {menuAberto && (
                <div className="absolute top-full left-0 w-full md:hidden flex flex-col gap-4 px-8 py-6 bg-white border-t border-green-100 text-gray-700 font-medium shadow-lg rounded-b-xl z-50">
                    <Link to='/home' onClick={fecharMenu} className='hover:text-green-700 py-1 transition'>Home</Link>
                    <Link to='/about' onClick={fecharMenu} className='hover:text-green-700 py-1 transition'>Sobre nós</Link>

                    {estaLogado ? (
                        <>
                            <Link to='/categorias' onClick={fecharMenu} className='hover:text-green-700 py-1 transition'>Categorias</Link>
                            <Link to='/produtos' onClick={fecharMenu} className='hover:text-green-700 py-1 transition'>Produtos</Link>
                            <Link to='/imc' onClick={fecharMenu} className='hover:text-green-700 py-1 transition'>Calcule seu IMC</Link>

                            <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-1">
                                <Link to='/perfil' onClick={fecharMenu} className="text-sm font-semibold text-gray-800 hover:text-green-700 transition">
                                    Olá, {usuarioAtual?.nome.split(' ')[0]}
                                </Link>
                                <button
                                    onClick={() => { logout(); fecharMenu(); }}
                                    className="text-sm font-bold text-red-600 hover:text-red-800 transition cursor-pointer"
                                >
                                    Sair
                                </button>
                            </div>
                        </>
                    ) : (
                        <button
                            onClick={() => { navigate("/login"); fecharMenu(); }}
                            className="w-full text-center bg-green-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
                        >
                            Entrar
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Navbar;