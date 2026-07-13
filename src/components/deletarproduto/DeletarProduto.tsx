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
        <div className='container w-1/3 mx-auto font-poppins text-slate-900'>
            <h1 className='text-4xl text-center my-4 font-bold'>Deletar Produto</h1>

            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o produto a seguir?
            </p>

            <div className='border-2 border-slate-900 flex flex-col rounded-2xl overflow-hidden justify-between'>
                
                <header 
                    className='py-2 px-6 bg-[#3B8C5A] text-white font-bold text-2xl'>
                    Produto
                </header>

                <div className="p-4 bg-white">
                    <p className='text-xl h-full font-semibold'>{produto.nome}</p>
                    <p className='mt-2'>Marca: {produto.marca}</p>
                    <p>Preço: R$ {produto.preco?.toFixed(2).replace('.', ',')}</p>
                </div>
                
                <div className="flex border-t border-slate-900">
                    <button 
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2 font-bold transition-all'
                        onClick={retornar}>
                        Não
                    </button>
                    
                    <button 
                        className='w-full text-slate-100 bg-[#3B8C5A] hover:bg-[#2F6B3A] flex items-center justify-center font-bold transition-all'
                        onClick={deletarProduto}>

                        { isLoading ? 
                            <ClipLoader 
                                color="#ffffff" 
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