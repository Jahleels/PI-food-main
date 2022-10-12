import neu from '../../neu-card.module.css'
import s from './BarAside.module.css'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipesFromName, changePage, changeIndexOfPagination, orderBy, filterBy, reset } from '../../redux/actions'
import styled from 'styled-components'

const Button = styled.button`
cursor: pointer;
font-family: 'Inter';
font-weight: 600;
font-size: 14px;
background-color: #4E5533;
color: #F0F0F2;
border-radius: 28px;
border: none;
padding: 10px 40px;
margin-top: 28px;
animation: load 300ms ease-in;

@keyframes load {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

&:active {
    border: none;
    background-color: #363b24;
}
`

function BarAside() {
    const valueOrder = useSelector(state => state.valueOrder)
    const valueFilter = useSelector(state => state.valueFilter)
    const valueSearch = useSelector(state => state.valueSearch)
    const diets = useSelector(state => state.diets)
    const history = useHistory()
    const dispatch = useDispatch()

    const resetList = () => {
        dispatch(reset())
    }

    const orderList = (e) => {
        dispatch(orderBy(e.target.value))
    }

    const filterList = (e) => {
        dispatch(filterBy(e.target.value))
        if(valueOrder !== 'Order') dispatch(orderBy(valueOrder))
    }

    const handleSearch = (e) => {
        dispatch(orderBy('Order'))
        dispatch(filterBy('Filter by diet'))

        dispatch(getRecipesFromName(e.target.value))
        dispatch(changePage(0, 5, 1))
        dispatch(changeIndexOfPagination(4, 0))
    }

    const handleRedirect = (e) => {
        e.preventDefault()
        history.push('/create')
    }
    return ( 
        <aside className={s.container}>
            <button className={`${neu.card} ${neu.btn}`} onClick={handleRedirect}>Add new recipe</button>
            <input type="search" onChange={handleSearch} value={valueSearch} className={`${neu.card} ${neu.input}`} placeholder='Search' />
            <select onChange={filterList} value={valueFilter} className={`${neu.card} ${neu.input}`} name="diets" id="dietsSelect">
                <option hidden>Filter by diet</option>
                {diets?.map( diet => <option key={diet.id} value={diet.name}>{diet.name}</option>)}
            </select>
            <select onChange={orderList} value={valueOrder} className={`${neu.card} ${neu.input}`} name="order" id="order">
                <option hidden>Order</option>
                <option>Ascendant</option>
                <option>Descendant</option>
            </select>
            <Button onClick={resetList}>Reset</Button>
        </aside>
    );
}

export default BarAside;