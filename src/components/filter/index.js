import './style.css';

function Filter({ categories, transactions, setTransactions, returnTransactions }) {
    let allFilteredTransactions = [];

    function handleFilterCategories(e) {
        if (e.target.innerHTML === '+' || e.target.innerHTML === 'x<span></span>') return;
        e.target.classList.toggle('apply-filter');
        if (e.target.className === 'category') {
            e.target.innerHTML = e.target.textContent.slice(0, e.target.textContent.length - 1) + '<span>+<span>';
        } else {
            e.target.innerHTML = e.target.textContent.slice(0, e.target.textContent.length - 1) + '<span>x<span>';
        }
    }

    function cleanFilter() {
        returnTransactions();
        const categoryButtons = document.querySelectorAll('.apply-filter');
        categoryButtons.forEach(category => {
            category.classList.remove('apply-filter');
            category.innerHTML = category.innerText.split('\n')[0] + '<span>+<span>';
        });
    }

    function applyFilter() {
        const categoryButtons = document.querySelectorAll('.apply-filter');
        if (categoryButtons.length < 1) return;
        categoryButtons.forEach(category => {
            const filteredTransactions = transactions.filter(transaction => transaction.categoria_nome === category.innerText.split('\n')[0]);
            allFilteredTransactions = [...allFilteredTransactions, ...filteredTransactions];
        });
        setTransactions([...allFilteredTransactions]);
    }

    return (
        <div className='container-filter'>
            <h2>Categoria</h2>
            <div className='categories'>
                {categories.length > 0 && categories.map(category => (
                    <button className='category' onClick={(e) => handleFilterCategories(e)} key={category.id}>{category.descricao}<span>+</span></button>
                ))}
            </div>
            <div className='bottom-buttons'>
                <button className='bottom-btn clean-filter-btn' onClick={cleanFilter}>Limpar Filtros</button>
                <button className='bottom-btn apply-filter-btn' onClick={applyFilter}>Aplicar Filtros</button>
            </div>
        </div>
    )
}

export default Filter;