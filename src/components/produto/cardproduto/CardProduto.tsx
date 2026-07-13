import { Link } from 'react-router-dom'
import type { Produto } from '../../../models/Produto'

interface CardProdutoProps {
  produto: Produto;
}

function CardProduto({ produto }: CardProdutoProps) {
    return (
    
        <div className='border-slate-200 border 
            flex flex-col rounded overflow-hidden justify-between font-poppins shadow-sm'> 
                
            <div>
                <div className="flex w-full bg-[#C9EED9] py-2 px-4 items-center gap-4">
                    <img src='https://i.imgur.com/pK6vSCy.png'
                         className='h-12 rounded-full' alt="Foto do usuário" />
                    <h3 className='text-lg font-bold text-center uppercase text-slate-900'>
                        {produto.usuario?.nome || 'Usuário Desconhecido'}
                    </h3>
                </div>

                <div className='p-4 text-slate-900'> 
                    <h4 className='text-lg font-semibold uppercase text-slate-900'>
                        {produto.nome}
                    </h4>
                    <p className='mt-2'>
                      <strong className='font-semibold'>Preço:</strong> 
                      R$ {produto.preco.toFixed(2).replace('.', ',')}
                    </p>
                    <p>
                      <strong className='font-semibold'>Marca:</strong> {produto.marca}
                    </p>
                    <p>
                      <strong className='font-semibold'>Calorias:</strong> {produto.calorias} kcal
                    </p>
                    <p>
                      <strong className='font-semibold'>Validade:</strong> {new Date(produto.dataValidade).toLocaleDateString('pt-BR')}
                    </p>
                    <p>
                      <strong className='font-semibold'>Categoria:</strong> {produto.categoria?.nome || 'Sem Categoria'}
                    </p>
                </div>
            </div>

            <div className="flex">
                <Link to={`/editarproduto/${produto.id}`} className='w-full text-slate-900 bg-[#C9EED9] 
                    hover:bg-[#a0d9b6] flex items-center justify-center py-2'>
                    <button className='w-full text-center'>Editar</button>
                </Link>
                <Link to={`/deletarproduto/${produto.id}`} className='text-white bg-red-400 
                    hover:bg-red-700 w-full flex items-center justify-center'>
                    <button className='w-full text-center'>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardProduto