import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { buscar, deletar } from "../../services/Service"
import { ClipLoader } from "react-spinners"
import { ToastAlerta } from "../../utils/ToastAlerta"

import type { Produto } from "../../models/Produto"

function DeletarProduto() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [produto, setProduto] = useState<Produto>({} as Produto)

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, setProduto, {})
        } catch (error: any) {
            console.error("Erro ao buscar o produto", error)
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarProduto() {
        setIsLoading(true)

        try {
            await deletar(`/produtos/${id}`)
            ToastAlerta('Produto apagado com sucesso', 'sucesso')

        } catch (error: any) {
            ToastAlerta('Erro ao deletar o produto.', 'erro')
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/produtos")
    }
    
    return (
        <div className="w-full bg-linear-to-r from-[#C9EED9] to-[#FFFFFF] min-h-[80vh] flex flex-col items-center justify-center py-8">
            <h1 className='text-4xl text-center mb-4 font-bold text-slate-900'>Deletar Produto</h1>

            <p className='text-center font-semibold mb-8 text-slate-700'>
                Você tem certeza de que deseja apagar o produto a seguir?
            </p>

            <div className='w-full max-w-md bg-white/90 backdrop-blur-sm border border-green-200 flex flex-col rounded-2xl overflow-hidden justify-between font-poppins shadow-lg'>
                
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
                          <span className='ml-1 text-slate-700'>R$ {produto.preco ? produto.preco.toFixed(2).replace('.', ',') : '0,00'}</span>
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
                          <span className='ml-1 text-slate-700'>{produto.dataValidade ? new Date(produto.dataValidade).toLocaleDateString('pt-BR') : ''}</span>
                        </p>
                        <p>
                          <strong className='font-semibold text-green-700'>Categoria:</strong> 
                          <span className='ml-1 text-slate-700'>{produto.categoria?.descricao || 'Sem Categoria'}</span>
                        </p>
                    </div>
                </div>
                
                <div className="flex border-t border-green-100">
                    <button 
                        className='w-full text-green-700 bg-green-50 hover:bg-green-100 flex items-center justify-center py-3 font-semibold transition-colors border-r border-green-100'
                        onClick={retornar}>
                        Não
                    </button>
                    
                    <button 
                        className='text-red-600 bg-red-50 hover:bg-red-100 w-full flex items-center justify-center py-3 font-semibold transition-colors'
                        onClick={deletarProduto}>

                        { isLoading ? 
                            <ClipLoader 
                                color="#dc2626" 
                                size={24}
                            /> : 
                            <span>Sim</span>
                        }
                        
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarProduto