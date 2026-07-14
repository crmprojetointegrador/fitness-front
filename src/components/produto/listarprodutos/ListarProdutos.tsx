import { useEffect, useState } from 'react';
import CardProduto from '../cardproduto/CardProduto';
import type { Produto } from '../../../models/Produto';
import { buscar } from '../../../services/Service';

function ListarProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);

    async function buscarProdutos() {
        try {
            await buscar('/produtos', setProdutos, {});
        } catch (error: any) {
            console.error("Erro ao buscar os produtos", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        buscarProdutos();
    }, []);

    if (loading) {
        return (
            <div 
                className="flex justify-center items-center min-h-[80vh]"
                style={{ background: 'linear-gradient(to right, #C9EED9, #FFFFFF)' }}
            >
                <p className="text-gray-600 font-medium">Carregando a lista de produtos...</p>
            </div>
        );
    }

    return (
        <div className="w-full bg-linear-to-r from-[#C9EED9] to-[#FFFFFF] min-h-[80vh] flex flex-col items-center py-8">
            <div className="container flex flex-col mx-auto px-4 font-poppins">
                <h1 className="text-4xl text-center mb-8 font-bold text-slate-900">Produtos Cadastrados</h1>
                {/* Se não houver produtos cadastrados no banco */}
                    {produtos.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500 text-lg">Nenhum produto cadastrado ainda.</p>
                        </div>
                    ) : (
                        <div className='container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {produtos.map((produto) => (
                                <CardProduto key={produto.id} produto={produto} />
                            ))}
                        </div>
                    )}
            </div>
        </div>
    );
}

export default ListarProdutos;