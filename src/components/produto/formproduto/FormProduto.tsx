import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

import type { Produto } from "../../../models/Produto";
import type { Categoria } from "../../../models/Categoria";

function FormProduto() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [categorias, setCategorias] = useState<Categoria[]>([])

    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)

    const [produto, setProduto] = useState<Produto>({} as Produto)


    const { id } = useParams<{ id: string }>()

    async function buscarProdutoPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, setProduto, {})
        } catch (error: any) {
            console.error("Erro ao buscar o produto", error)
        }
    }

    async function buscarCategoriaPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria, {})
        } catch (error: any) {
            console.error("Erro ao buscar a categoria", error)
        }
    }

    async function buscarCategorias() {
        try {
            await buscar('/categorias', setCategorias, {})
        } catch (error: any) {
            console.error("Erro ao buscar categorias", error)
        }
    }

    useEffect(() => {
        buscarCategorias()

        if (id !== undefined) {
            buscarProdutoPorId(id)
        }
    }, [id])

    useEffect(() => {
        setProduto({
            ...produto,
            categoria: categoria,
        })
    }, [categoria])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;

        setProduto({
            ...produto,
            [name]: (name === 'preco' || name === 'calorias') ? (value === '' ? '' : value) : value,
        });
    }

    function retornar() {
        navigate('/produtos');
    }

    async function gerarNovoProduto(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/produtos`, produto, setProduto);
                ToastAlerta('Produto atualizado com sucesso', 'sucesso')
            } catch (error: any) {
                ToastAlerta('Erro ao atualizar o Produto', 'erro')
            }
        } else {
            try {
                await cadastrar(`/produtos`, produto, setProduto)
                ToastAlerta('Produto cadastrado com sucesso', 'sucesso');
            } catch (error: any) {
                ToastAlerta('Erro ao cadastrar o Produto', 'erro');
            }
        }

        setIsLoading(false)
        retornar()
    }

    return (
        <div className="w-full bg-linear-to-r from-[#C9EED9] to-[#FFFFFF] min-h-[80vh] flex flex-col items-center">
            <div className="container flex flex-col mx-auto items-center font-poppins text-slate-900">
                <h1 className="text-4xl text-center my-8 font-bold text-slate-900">
                {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4 mb-8"
                onSubmit={gerarNovoProduto}>

                <div className="flex flex-col gap-2">
                    <label htmlFor="nome" className="font-semibold text-gray-800">Nome do Produto</label>
                    <input
                        type="text"
                        placeholder="Ex: Whey Protein"
                        name="nome"
                        required
                        className="border-2 border-slate-300 bg-white/90 focus:border-slate-500 focus:outline-none rounded p-2"
                        value={produto.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="preco" className="font-semibold text-gray-800">Preço (R$)</label>
                    <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        name="preco"
                        required
                        className="border-2 border-slate-300 bg-white/90 focus:border-slate-500 focus:outline-none rounded p-2"
                        value={produto.preco}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex gap-4 w-full">
                    <div className="flex flex-col gap-2 w-1/2">
                        <label htmlFor="calorias" className="font-semibold text-gray-800">Calorias (kcal)</label>
                        <input
                            type="number"
                            placeholder="0"
                            name="calorias"
                            required
                            className="border-2 border-slate-300 bg-white/90 focus:border-slate-500 focus:outline-none rounded p-2"
                            value={produto.calorias}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                        <label htmlFor="marca" className="font-semibold text-gray-800">Marca</label>
                        <input
                            type="text"
                            placeholder="Ex: Growth"
                            name="marca"
                            required
                            className="border-2 border-slate-300 bg-white/90 focus:border-slate-500 focus:outline-none rounded p-2"
                            value={produto.marca}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="dataValidade" className="font-semibold text-gray-800">Data de Validade</label>
                    <input
                        type="date"
                        name="dataValidade"
                        required
                        className="border-2 border-slate-300 bg-white/90 focus:border-slate-500 focus:outline-none rounded p-2"
                        value={produto.dataValidade ? produto.dataValidade.split('T')[0] : ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <p className="font-semibold text-gray-800">Categoria do Produto</p>
                    <select name="categoria" id="categoria" className='border-2 p-2 border-slate-300 bg-white/90 focus:border-slate-500 focus:outline-none rounded'
                        onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
                        value={produto.categoria?.id || ""}
                    >
                        <option value="" disabled>Selecione uma Categoria</option>

                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.descricao}</option>
                        ))}

                    </select>
                </div>

                <button
                    type='submit'
                    className='rounded-lg disabled:bg-green-600/50 disabled:text-white/80 bg-green-600 hover:bg-green-700
                               text-white font-bold w-1/2 mx-auto py-2 mt-4 flex justify-center transition-all cursor-pointer disabled:cursor-not-allowed'
                    disabled={!produto.categoria?.id}
                >
                    {isLoading ?
                        <ClipLoader
                            color="#ffffff"
                            size={24}
                        /> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    }
                </button>
            </form>
            </div>
        </div>
    );
}

export default FormProduto;