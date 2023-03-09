import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import ArrowDown from '../../assets/arrow-down.svg';
import ArrowUp from '../../assets/arrow-up.svg';
import DeleteIcon from '../../assets/delete-icon.svg';
import EditIcon from '../../assets/edit-icon.svg';
import api from '../../services/api';
import { getItem } from '../../utils/storage';
import './style.css';

function returnDate(date) {
    return format(new Date(date), 'dd/MM/yy');
}

function returnWeekday(date) {
    const returnedDate = format(new Date(date), 'EEE', { locale: ptBR });
    const formatedDate = returnedDate.slice(0, 1).toUpperCase() + returnedDate.slice(1).toLowerCase();
    return formatedDate;
}

function Table({ transactions, setTransactions, returnTransactions, returnCategories, refreshTable, setRefreshTable, addOrEditTransaction }) {
    const [orderByDate, setOrderByDate] = useState('crescent');

    function orderTransactionsByDate() {
        setOrderByDate(orderByDate === 'crescent' ? 'decrescent' : 'crescent');
        if (orderByDate === 'decrescent') {
            setTransactions([...transactions.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())]);
        } else {
            setTransactions([...transactions.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())]);
        }
    }

    useEffect(() => {
        returnTransactions();
        returnCategories();
    }, [refreshTable]);

    return (
        <div className='container-table'>
            <div className='titles-table'>
                <h2 className='date-title'>Data</h2>
                <img src={orderByDate === 'crescent' ? ArrowUp : ArrowDown} alt='icon' onClick={orderTransactionsByDate} />
                <h2 className='weekday-title'>Dia da semana</h2>
                <h2 className='description-title'>Descrição</h2>
                <h2 className='category-title'>Categoria</h2>
                <h2 className='value-title'>Valor</h2>
            </div>
            {transactions.length > 0 && transactions.map(transaction => (
                <div className='transaction' key={transaction.id}>
                    <h2 className='transaction-date'>{returnDate(transaction.data)}</h2>
                    <span className='transaction-day'>{returnWeekday(transaction.data)}</span>
                    <span className='transaction-description'>{transaction.descricao}</span>
                    <span className='transaction-category'>{transaction.categoria_nome}</span>
                    <span className={`transaction-value ${transaction.tipo === 'entrada' ? 'entry-color' : 'exit-color'}`}>{`R$ ${(transaction.valor / 100).toFixed(2).replace('.', ',')}`}
                    </span>
                    <img className='edit-icon' src={EditIcon} alt='edit-icon' id={transaction.id} onClick={(e) => {
                        addOrEditTransaction(e);
                    }} />
                    <img className='delete-icon' src={DeleteIcon} alt='delete-icon' onClick={(e) => e.target.nextSibling.classList.remove('hidden')} />
                    <div className='modal__delete__transaction hidden'>
                        <h3>Apagar item?</h3>
                        <div className='modal__delete__transaction__button'>
                            <button className='modal__delete__transaction__yes'
                                onClick={() => {
                                    try {
                                        const response = api.delete(`/transacao/${transaction.id}`, {
                                            headers: { Authorization: `Bearer ${getItem('token')}` }
                                        });
                                        setRefreshTable(refreshTable + 1);
                                    } catch (error) {
                                        console.log(error.response.data.mensagem);
                                    }
                                }}
                            >Sim</button>
                            <button className='modal__delete__transaction__not' onClick={(e) => e.target.parentElement.parentElement.classList.add('hidden')}>Não</button>
                        </div>
                    </div>
                </div>
            ))}
        </div >
    )
}

export default Table;