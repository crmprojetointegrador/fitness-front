import CardProduto from '../cardproduto/CardProduto'; 
import type { Produto } from '../../../models/Produto' 
import { useEffect, useState } from 'react';

function ListarProdutos() {


    const produtos: Produto[] = [
        {
            id: 1,
            nome: "Whey Protein Concentrado",
            dataValidade: "2024-12-31T00:00:00.000Z",
            preco: 149.90,
            calorias: 120,
            marca: "Growth Supplements",
            categoria: { id: 1, nome: "Suplementos", descricao: "Suplementos alimentares" },
            usuario: { id: 1, nome: "João Silva", usuario: "joao@email.com", senha: "", foto: "" }
        },
        {
            id: 2,
            nome: "Barra de Proteína",
            dataValidade: "2024-10-15T00:00:00.000Z",
            preco: 12.50,
            calorias: 150,
            marca: "Bold Snacks",
            categoria: { id: 2, nome: "Lanches", descricao: "Lanches rápidos" },
            usuario: { id: 2, nome: "Maria Souza", usuario: "maria@email.com", senha: "", foto: "" }
        }
    ];

    //Flame botando o bedelho de colocar uma tela de loading kkkk
      const [loading, setLoading] = useState(true);
      useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }, []);
      if (loading) {
        return (
          <div className="flex justify-center items-center min-h-[80vh]"
            style={{ background: 'linear-gradient(to right, #C9EED9, #FFFFFF)' }}
          >
            <p className="text-gray-600">Carregando a lista de produtos...</p>
          </div>
        );
      }
      // Flame esteve aqui hehehe

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