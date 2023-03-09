import { useRef, useState } from 'react';
import FilterIcon from '../../assets/filter-icon.svg';
import EditProfile from '../../components/editProfileModal';
import Filter from '../../components/filter';
import Header from '../../components/header';
import Resume from '../../components/resume';
import Table from '../../components/table';
import AddOrUpdateTransaction from '../../components/transactionModal';
import api from '../../services/api';
import { getItem } from '../../utils/storage';
import './style.css';

function Main() {
    const [transactions, setTransactions] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [categories, setCategories] = useState([]);
    const [openModalEditProfile, setOpenModalEditProfile] = useState(false);
    const [openTransactionModal, setOpenTransactionModal] = useState(false);
    const [modalIsAddTransaction, setModalIsAddTransaction] = useState(true);
    const [refreshTable, setRefreshTable] = useState(0);
    const [transactionIdEdit, setTransactionIdEdit] = useState(0);
    const [valueInput, setValueInput] = useState('');
    const [categoryInput, setCategoryInput] = useState('');
    const [dateInput, setDateInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const valueRef = useRef(null);
    const categoryRef = useRef(null);
    const dateRef = useRef(null);
    const descriptionRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [transactionTypeIsEntry, setTransactionTypeIsEntry] = useState(true);

    async function returnTransactions() {
        try {
            const token = getItem('token');
            const response = await api.get('/transacao', { headers: { Authorization: `Bearer ${token}` } });
            setTransactions([...response.data]);
        } catch (error) {
            console.log(error);
        }
    }

    async function returnCategories() {
        try {
            const token = getItem('token');
            const response = await api.get('/categoria', { headers: { Authorization: `Bearer ${token}` } });
            setCategories([...response.data]);
        } catch (error) {
            console.log(error);
        }
    }

    function filterButtonClick() {
        setShowFilter(!showFilter);
        returnCategories();
    }

    async function addOrEditTransaction(e) {
        if (e.type === 'submit') {
            e.preventDefault();
            if (!valueRef.current.value || !categoryRef.current.value || !dateRef.current.value || !descriptionRef.current.value) {
                setErrorMessage('Todos os campos devem ser preenchidos!');
                return;
            }
            const token = getItem('token');
            const categorySelected = categories.filter(category => category.descricao === categoryRef.current.value);
            if (modalIsAddTransaction) {
                try {
                    const response = await api.post('/transacao',
                        {
                            tipo: transactionTypeIsEntry ? 'entrada' : 'saida',
                            descricao: descriptionRef.current.value,
                            valor: valueRef.current.value * 100,
                            data: dateRef.current.value,
                            categoria_id: categorySelected[0].id
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                    setRefreshTable(refreshTable + 1);
                    setOpenTransactionModal(false);
                } catch (error) {
                    console.log(error.response.data.mensagem);
                }
            } else {
                try {
                    const response = await api.put(`/transacao/${transactionIdEdit}`,
                        {
                            descricao: descriptionRef.current.value,
                            valor: valueRef.current.value * 100,
                            data: dateRef.current.value,
                            categoria_id: categorySelected[0].id,
                            tipo: transactionTypeIsEntry ? 'entrada' : 'saida'
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                    setRefreshTable(refreshTable + 1);
                    setOpenTransactionModal(false);
                } catch (error) {
                    console.log(error.response.data.mensagem);
                }
            }
        }
        if (e.type === 'click') {
            setOpenTransactionModal(true);
            setModalIsAddTransaction(false);
            setTransactionIdEdit(e.target.id);
            const transactionContent = e.target.parentNode.innerText.split('\n');
            const transactionValueNoFormatted = transactionContent[4].slice(2);
            const transactionValueFormatted = transactionValueNoFormatted.slice(0, transactionValueNoFormatted.length - 3);
            setValueInput(Number(transactionValueFormatted));
            setCategoryInput(transactionContent[3]);
            const dateFormatted = `20${transactionContent[0].slice(-2)}-${transactionContent[0].slice(3, 5)}-${transactionContent[0].slice(0, 2)}`;
            setDateInput(dateFormatted);
            setDescriptionInput(transactionContent[2]);
            if (e.target.previousSibling.className === 'transaction-value entry-color') {
                setTransactionTypeIsEntry(true);
            } else {
                setTransactionTypeIsEntry(false);
            }
        }
        return;
    }

    return (
        <div className='container main'>
            <Header setOpenModalEditProfile={setOpenModalEditProfile} />
            <div className='container-main'>
                <div>
                    <button className='filter-button' onClick={filterButtonClick}><img src={FilterIcon} alt='filter icon' />Filtrar</button>
                    {showFilter && <Filter categories={categories} transactions={transactions} setTransactions={setTransactions} returnTransactions={returnTransactions} />}
                    <Table transactions={transactions} setTransactions={setTransactions} returnTransactions={returnTransactions} returnCategories={returnCategories} refreshTable={refreshTable} setRefreshTable={setRefreshTable} addOrEditTransaction={addOrEditTransaction} valueRef={valueRef} categoryRef={categoryRef} dateRef={dateRef} descriptionRef={descriptionRef} />
                </div>
                <Resume setOpenTransactionModal={setOpenTransactionModal} setModalIsAddTransaction={setModalIsAddTransaction} refreshTable={refreshTable} setValueInput={setValueInput} setCategoryInput={setCategoryInput} setDateInput={setDateInput} setDescriptionInput={setDescriptionInput} setTransactionTypeIsEntry={setTransactionTypeIsEntry} />
            </div>
            {openModalEditProfile && <EditProfile setOpenModalEditProfile={setOpenModalEditProfile} />}
            {openTransactionModal && <AddOrUpdateTransaction categories={categories} modalIsAddTransaction={modalIsAddTransaction} setOpenTransactionModal={setOpenTransactionModal} refreshTable={refreshTable} setRefreshTable={setRefreshTable} addOrEditTransaction={addOrEditTransaction} valueRef={valueRef} categoryRef={categoryRef} dateRef={dateRef} descriptionRef={descriptionRef} errorMessage={errorMessage} transactionTypeIsEntry={transactionTypeIsEntry} setTransactionTypeIsEntry={setTransactionTypeIsEntry} valueInput={valueInput} categoryInput={categoryInput} dateInput={dateInput} descriptionInput={descriptionInput} />}
        </div>
    )
}

export default Main;