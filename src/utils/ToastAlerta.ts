// filepath: /Users/convidado/Desktop/projeto_fitness_front/fitness-front/src/utils/toastAlerta.ts
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ToastAlerta(mensagem: string, tipo: 'sucesso' | 'erro') {
    if (tipo === 'sucesso') {
        toast.success(mensagem, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    } else if (tipo === 'erro') {
        toast.error(mensagem, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }
}