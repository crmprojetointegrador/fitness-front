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
            const categoriaEncontrada = await buscar(`/categorias/${id}`, setCategoria, { headers: {} })
            if (categoria) {
                setCategoria(categoria)
            } else {
                setCategoria(null) // Define como null se não encontrar
            }
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
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar Categoria</h1>

            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar a categoria a seguir?
            </p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header className='py-2 px-6 bg-[#3B8C5A] text-white font-bold text-2xl'>
                    Categoria
                </header>
                <div className="p-4">
                    {categoria ? (
                        <>
                            <p className='text-xl h-full'>{categoria.nome}</p>
                            <p>{categoria.descricao}</p>
                        </>
                    ) : (
                        <p className='text-red-500'>Categoria não encontrada</p>
                    )}
                </div>
                <div className="flex">
                    <button
                        onClick={retornar}
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'>
                        Não
                    </button>
                    <button
                        onClick={deletarCategoria}
                        className='w-full text-slate-100 bg-[#3B8C5A] hover:bg-[#2F6B3A]
                        flex items-center justify-center'>
                        {isLoading ? (
                            <RotatingLines
                                strokeColor="white"
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