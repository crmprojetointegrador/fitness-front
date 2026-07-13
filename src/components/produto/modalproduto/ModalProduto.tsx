import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FormProduto from '../formproduto/FormProduto'; // Ajuste o caminho se necessário

function ModalProduto() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border-2 border-slate-900 text-slate-900 rounded px-4 py-2 hover:bg-[#C9EED9] font-poppins font-semibold transition-all'>
                        Novo Produto
                    </button>
                }
                modal
                contentStyle={{
                    borderRadius: '1rem',
                    paddingBottom: '2rem',
                    width: 'auto', 
                    maxWidth: '800px'
                }}
            >
                <FormProduto />
            </Popup>
        </>
    );
}

export default ModalProduto;