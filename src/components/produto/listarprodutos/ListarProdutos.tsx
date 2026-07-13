import { useEffect, useState } from 'react';
import CardProduto from '../cardproduto/CardProduto';
import type { Produto } from '../../../models/Produto';
import { buscar } from '../../../services/Service';

function ListarProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    async function buscarProdutos() {
        try {
            await buscar('/produtos', setProdutos, {})
        } catch (error: any) {
            console.error("Erro ao buscar os produtos", error)
        }
    }

    useEffect(() => {
        buscarProdutos();
    }, []);

    return (
        <>
            <div className="flex justify-center w-full my-4 bg-[#FFFFFF]">
                <div className="container flex flex-col mx-2">
                    <div className='container mx-auto my-4 
                        grid grid-cols-1 md:grid-cols-2 
                        lg:grid-cols-3 gap-4'>

                        {produtos.map((produto) => (
                            <CardProduto key={produto.id} produto={produto} />
                        ))}

                    </div>
                </div>
            </div>
        </>
    );
}

export default ListarProdutos;
