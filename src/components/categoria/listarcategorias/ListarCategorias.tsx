import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastAlerta } from '../../../utils/ToastAlerta'
import { buscar } from '../../../services/Service'

interface Categoria {
    id: number;
    descricao: string;
}

function ListarCategorias() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        buscarcategorias()
    }, [categorias.length])

    async function buscarcategorias() {
        try {
            setLoading(true)
            await buscar('/categorias', setCategorias, { headers: {} })
        } catch (error: any) {
            ToastAlerta('Erro ao buscar a categoria', 'erro')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[80vh]"
                style={{ background: 'linear-gradient(to right, #C9EED9, #FFFFFF)' }}
            >
                <p className="text-gray-600">Carregando categorias cadastradas...</p>
            </div>
        );
    }

    return (
        <div
            style={{
                background: 'linear-gradient(to right, #C9EED9, #FFFFFF)',
                minHeight: '80vh',
                padding: '2rem 1rem'
            }}
        >
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    <span style={{ color: "#2d3748" }}>🏋️ Categorias de Produtos</span>
                </h2>

                <p className="text-center text-gray-600 mb-8">
                    Confira nossas categorias de produtos para ajudar você!
                </p>

                {categorias.length === 0 ? (
                    <p className="text-center text-gray-500">Nenhuma categoria cadastrada.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categorias.map((categoria) => (
                            <div
                                key={categoria.id}
                                className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                            >
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {categoria.descricao}
                                </h3>
                                <div className="flex">
                                    <Link to={`/editarcategoria/${categoria.id}`}
                                        className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2'>
                                        <button>Editar</button>
                                    </Link>

                                    <Link to={`/categorias/deletar/${categoria.id}`}
                                        className='text-slate-100 bg-red-400 hover:bg-red-700 w-full flex items-center justify-center'>
                                        <button>Deletar</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="text-center mt-8">
                    <Link
                        to="/cadastrarcategoria"
                        style={{
                            borderRadius: "0.5rem",
                            backgroundColor: "#38a169",
                            color: "white",
                            border: "none",
                            padding: "0.75rem 2rem",
                            cursor: "pointer",
                            textDecoration: "none",
                            fontSize: "1.1rem"
                        }}
                    >
                        Cadastrar Nova Categoria
                    </Link>
                </div>


                <div className="text-center mt-8">
                    <Link
                        to="/"
                        className="text-green-700 hover:underline"
                    >
                        ← Voltar para Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ListarCategorias;