import { useEffect, useState } from 'react';
import api from '../../services/api';
import { getItem } from '../../utils/storage';
import './style.css';

function Resume({ setOpenTransactionModal, setModalIsAddTransaction, refreshTable, setValueInput, setCategoryInput, setDateInput, setDescriptionInput, setTransactionTypeIsEntry }) {
    const [output, setOutput] = useState(0);
    const [entry, setEntry] = useState(0);
    const [balance, setBalance] = useState(0);

    function handleConfirmModal() {
        setOpenTransactionModal(true);
        setModalIsAddTransaction(true);
        setTransactionTypeIsEntry(true);
        setValueInput(null);
        setCategoryInput(null);
        setDateInput(null);
        setDescriptionInput(null);
    }

    const getExtract = async () => {
        try {
            const token = getItem('token');
            const response = await api.get('/transacao/extrato', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const { entrada } = response.data;
            const { saida } = response.data;
            setEntry(entrada);
            setOutput(saida);
            setBalance(entrada - saida);
        } catch (error) {
            console.log(error.response.data.mensagem);
        }
    }

    useEffect(() => {
        getExtract()
    }, [refreshTable]);

    return (
        <div className='container-resume'>
            <div className='content__resume'>
                <h1 className='title__resume'>Resumo</h1>
                <div className='entrys__div'>
                    <h4 className='entrys'>Entradas</h4>
                    <h4 className='value__entry purple'>R$ {(entry / 100).toFixed(2).replace('.', ',')}</h4>
                </div>
                <div className='exit__div'>
                    <h4 className='exits'>Saídas</h4>
                    <h4 className='value__exits orange'> R$ {(output / 100).toFixed(2).replace('.', ',')}</h4>
                </div>
                <div className='line'></div>
                <div className='balance__div'>
                    <h4 className='balance'>Saldo</h4>
                    <h4 className='value__balance blue'>R$ {(balance / 100).toFixed(2).replace('.', ',')}</h4>
                </div>
            </div>
            <button
                className='btn-register'
                onClick={handleConfirmModal}>Adicionar Registro
            </button>
        </div>
    );
}

export default Resume;