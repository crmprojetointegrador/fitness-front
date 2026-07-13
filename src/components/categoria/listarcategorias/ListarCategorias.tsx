import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Categoria {
    id: number;
    descricao: string;
}

function ListarCategorias() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Dados mockados de uma loja fitness
        const dadosMock: Categoria[] = [
            { id: 1, descricao: 'Barras de Cereal - Energia para o treino' },
            { id: 2, descricao: 'Materiais de Exercício - Colchonetes, halteres e mais' },
            { id: 3, descricao: 'Suplementos - Whey, creatina e vitaminas' },
            { id: 4, descricao: 'Roupas Fitness - Leggings, tops e camisas' },
            { id: 5, descricao: 'Acessórios - Garrafas, luvas e faixas' },
            { id: 6, descricao: 'Alimentos Saudáveis - Oleaginosas, frutas secas' },
        ];

        setTimeout(() => {
            setCategorias(dadosMock);
            setLoading(false);
        }, 500);
    }, []);

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
                            </div>
                        ))}
                    </div>
                )}

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