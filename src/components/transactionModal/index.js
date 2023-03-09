import ArrowDown from '../../assets/arrow-down-black.svg';
import close from '../../assets/close-icon.svg';
import './style.css';

function AddOrUpdateTransaction({ categories, modalIsAddTransaction, setOpenTransactionModal, addOrEditTransaction, valueRef, categoryRef, descriptionRef, dateRef, errorMessage, transactionTypeIsEntry, setTransactionTypeIsEntry, valueInput, categoryInput, dateInput, descriptionInput }) {

    return (
        <div className='container__modal'>
            <div className='box__modal'>
                <div className='div__title'>
                    <h2 className='title__modal'>{`${modalIsAddTransaction ? 'Adicionar' : 'Editar'} Registro`}</h2>
                    <img
                        className='close-button'
                        src={close} alt='Fechar'
                        onClick={() => { setOpenTransactionModal(false) }}
                    />
                </div>
                <form className='form_container' onSubmit={addOrEditTransaction}>
                    <div className='type__box'>
                        <div
                            className={`box_style${transactionTypeIsEntry ? ' blue_box' : ' gray_box'}`}
                            onClick={() => { transactionTypeIsEntry === false && setTransactionTypeIsEntry(true) }}>
                            Entrada
                        </div>
                        <div
                            className={`box_style${transactionTypeIsEntry ? ' gray_box' : ' red_box'}`}
                            onClick={() => { transactionTypeIsEntry === true && setTransactionTypeIsEntry(false) }}>
                            Saída
                        </div>
                    </div>
                    <label htmlFor='value-input' className='value__label'>Valor</label>
                    <input type='number' name='valor' id='value-input' ref={valueRef} defaultValue={valueInput} />
                    <label className='category__label'>
                        Categoria
                        <select
                            name='categoria'
                            className='input_select'
                            ref={categoryRef}
                            defaultValue={categoryInput}
                        > {categories.map(item => (
                            <option
                                key={item.id}
                                value={item.descricao}>{item.descricao}</option>
                        ))}
                        </select>
                        <img className='arrow_down_icon' src={ArrowDown} alt='arrow-down icon' />
                    </label>
                    <label className='date__label'>
                        Data
                        <input type='date' name='data' ref={dateRef} defaultValue={dateInput} />
                    </label>
                    <label className='desc__label'>
                        Descrição
                        <input type='text' name='descricao' ref={descriptionRef} defaultValue={descriptionInput} />
                    </label>
                    <span className='error'>{errorMessage}</span>
                    <button className='btn_confirm'>Confirmar</button>
                </form>
            </div>
        </div >
    );
}

export default AddOrUpdateTransaction;