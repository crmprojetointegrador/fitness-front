import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { atualizar, buscar, cadastrar } from '../../../services/Service'
import type { Categoria } from '../../../models/Categoria'
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from '../../../utils/ToastAlerta'

function FormCategoria() {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria, { headers: {} })
        } catch (error: any) {
            ToastAlerta('Erro ao buscar a categoria', 'erro')
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        })
    }

    function retornar() {
        navigate('/categorias')
    }

    async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/categorias`, categoria, setCategoria)
                ToastAlerta('Categoria atualizada com sucesso', 'sucesso')
            } catch (error: any) {
                ToastAlerta('Erro ao atualizar a categoria', 'erro')
            }
        } else {
            try {
                await cadastrar(`/categorias`, categoria, setCategoria)
                ToastAlerta('Categoria cadastrada com sucesso', 'sucesso')
            } catch (error: any) {
                ToastAlerta('Erro ao cadastrar a categoria', 'erro')
            }
        }

        setIsLoading(false)
        retornar()
    }

    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? 'Cadastrar Categoria' : 'Atualizar Categoria'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaCategoria}>

                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição</label>
                    <input
                        type="text"
                        placeholder="Descrição"
                        name="descricao"
                        value={categoria.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="rounded bg-[#3B8C5A] hover:bg-[#2F6B3A]
                                text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
                >
                    {isLoading ?  <ClipLoader
                            color="#ffffff"
                            size={24}
                        /> : (
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    )}
                </button>
            </form>
        </div>
    )
}

export default FormCategoria