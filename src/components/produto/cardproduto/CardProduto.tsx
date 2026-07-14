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
                {/* Cabeçalho do Card com a foto dinâmica do usuário logado */}
                <div className="flex w-full bg-green-100/60 border-b border-green-100 py-3 px-4 items-center gap-4">
                    <img 
                        src={produto.usuario?.foto || 'https://i.imgur.com/pK6vSCy.png'}
                        className='h-12 w-12 rounded-full border-2 border-white shadow-sm object-cover' 
                        alt="Foto do usuário" 
                    />
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
                      <span className='ml-1 text-slate-700