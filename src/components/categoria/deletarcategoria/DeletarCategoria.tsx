import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { buscar, deletar } from '../../../services/Service'
import type { Categoria } from '../../../models/Categoria'
import { RotatingLines } from 'react-loader-spinner'
import { ToastAlerta } from '../../../utils/ToastAlerta'

function DeletarCategoria() {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [categoria, setCategoria] = useState<Categoria | null>(null) // Ajustado para permitir null

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
           await buscar(`/categorias/${id}`, setCategoria, { headers: {} })
        } catch (error: any) {
            ToastAlerta('Erro ao buscar a categoria', 'erro')
        }
    }

    useEffect(() => {
        if (id) {
            buscarPorId(id)
        }
    }, [id])

    function retornar() {
        navigate('/categorias')
    }

    async function deletarCategoria() {
        setIsLoading(true)

        try {
            if (id) {
                await deletar(`/categorias/${id}`)
                ToastAlerta('Categoria deletada com sucesso', 'sucesso')
            } else {
                ToastAlerta('ID da categoria não encontrado', 'erro')
            }
        } catch (error: any) {
            ToastAlerta('Erro ao deletar a categoria', 'erro')
        }
        setIsLoading(false)
        retornar()
    }

    return (
        <div className="w-full bg-linear-to-r from-[#C9EED9] to-[#FFFFFF] min-h-[80vh] flex flex-col items-center justify-center py-8">
            <h1 className='text-4xl text-center mb-4 font-bold text-slate-900'>Deletar Categoria</h1>

            <p className='text-center font-semibold text-slate-700 mb-2'>
                Você tem certeza de que deseja apagar a categoria a seguir?
            </p>
            <p className='text-center text-sm font-semibold text-red-600 bg-red-50 p-2 rounded-lg max-w-md w-full border border-red-200 mb-6'>
                ⚠️ Atenção: Ao deletar esta categoria, todos os produtos vinculados a ela também serão deletados permanentemente.
            </p>

            <div className='w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 flex flex-col overflow-hidden font-poppins'>
                <header className='py-3 px-6 bg-[#3B8C5A] text-white font-bold text-2xl text-center'>
                    Categoria
                </header>
                <div className="p-6">
                    {categoria ? (
                        <h3 className="text-2xl font-semibold text-gray-800 text-center">
                            {categoria.descricao}
                        </h3>
                    ) : (
                        <p className='text-red-500 text-center'>Categoria não encontrada</p>
                    )}
                </div>
                <div className="flex border-t border-gray-100">
                    <button
                        onClick={retornar}
                        className='w-full text-green-700 bg-green-50 hover:bg-green-100 flex items-center justify-center py-3 font-semibold transition-colors border-r border-green-100'>
                        Não
                    </button>
                    <button
                        onClick={deletarCategoria}
                        className='text-red-600 bg-red-50 hover:bg-red-100 w-full flex items-center justify-center py-3 font-semibold transition-colors'>
                        {isLoading ? (
                            <RotatingLines
                                strokeColor="#dc2626"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            />
                        ) : (
                            <span>Sim</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarCategoria