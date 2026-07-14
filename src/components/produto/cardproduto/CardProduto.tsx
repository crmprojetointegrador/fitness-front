import { Link } from 'react-router-dom'
import type { Produto } from '../../../models/Produto'

interface CardProdutoProps {
  produto: Produto;
}

function CardProduto({ produto }: CardProdutoProps) {
    return (
        <div className='bg-white/90 backdrop-blur-sm border border-green-200 
            flex flex-col rounded-2xl overflow-hidden justify-between font-poppins shadow-lg hover:shadow-xl transition-shadow'> 
                
            <div>
                <div className="flex w-full bg-green-100/60 border-b border-green-100 py-3 px-4 items-center gap-4">
                    <img src={produto.usuario?.foto || 'https://i.imgur.com/pK6vSCy.png'}
                         className='h-12 rounded-full border-2 border-white shadow-sm' alt="Foto do usuário" />
                    <h3 className='text-lg font-bold text-center uppercase text-green-900'>
                        {produto.usuario?.nome || 'Usuário Desconhecido'}
                    </h3>
                </div>

                <div className='p-5 text-slate-800 flex flex-col gap-1'> 
                    <h4 className='text-xl font-bold uppercase text-slate-900 mb-2'>
                        {produto.nome}
                    </h4>
                    <p>
                      <strong className='font-semibold text-green-700'>Preço:</strong> 
                      <span className='ml-1 text-slate-700'>R$ {produto.preco.toFixed(2).replace('.', ',')}</span>
                    </p>
                    <p>
                      <strong className='font-semibold text-green-700'>Marca:</strong> 
                      <span className='ml-1 text-slate-700'>{produto.marca}</span>
                    </p>
                    <p>
                      <strong className='font-semibold text-green-700'>Calorias:</strong> 
                      <span className='ml-1 text-slate-700'>{produto.calorias} kcal</span>
                    </p>
                    <p>
                      <strong className='font-semibold text-green-700'>Validade:</strong> 
                      <span className='ml-1 text-slate-700'>{new Date(produto.dataValidade).toLocaleDateString('pt-BR')}</span>
                    </p>
                    <p>
                      <strong className='font-semibold text-green-700'>Categoria:</strong> 
                      <span className='ml-1 text-slate-700'>{produto.categoria?.descricao || 'Sem Categoria'}</span>
                    </p>
                </div>
            </div>

            <div className="flex border-t border-green-100">
                <Link to={`/editarproduto/${produto.id}`} className='w-full text-green-700 bg-green-50 
                    hover:bg-green-100 flex items-center justify-center py-3 font-semibold transition-colors border-r border-green-100'>
                    Editar
                </Link>
                <Link to={`/deletarproduto/${produto.id}`} className='text-red-600 bg-red-50 
                    hover:bg-red-100 w-full flex items-center justify-center py-3 font-semibold transition-colors'>
                    Deletar
                </Link>
            </div>
        </div>
    )
}

export default CardProduto