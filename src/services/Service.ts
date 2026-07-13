import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000'
})

export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header)
    setDados(resposta.data)
}