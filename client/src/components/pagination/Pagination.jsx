import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { changePage, changeIndexOfPagination } from '../../redux/actions'

const ChangePages = styled.button`
    cursor: pointer;
    border: none;
    position: relative;
    width: 48px;
    height: 48px;
    border-radius: 15px;
    background: linear-gradient(145deg, #d2e388, #b0bf72);
    box-shadow:  8px 8px 16px #939f5f,
                -8px -8px 16px #f5ff9f;

    & :active {
        border: none;
        background: linear-gradient(145deg, #b0bf72, #d2e388);
    }

    & > * {
        width: 48px;
        height: 48px;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 15px;
    }
`
const Button = styled.button`
cursor: pointer;
width: 48px;
height: 48px;
border-radius: 15px;
background: #C4D47F;
box-shadow: ${props => props.selected};
 
            
border: none;
font-weight: 800;

&:active {
    border: none;
    background: linear-gradient(145deg, #b0bf72, #d2e388);
}
`


function Pagination() {

    const dispatch = useDispatch()
    const recipesLength = useSelector(state => state.recipes.length)
    const currentPage = useSelector(state => state.currentPage)
    const recipesPerPage = useSelector(state => state.recipesPerPage)
    const [firstButtonPagination, lastButtonPagination] = useSelector(state => state.sliceOfPagination)



    let numOfButtons = Math.ceil(recipesLength / 6)
    let listOfButtons = []
    const moveNumbersPagination = (numberOfPage) => {
        if(numberOfPage === lastButtonPagination) {
            if (lastButtonPagination + 4 > numOfButtons) return dispatch(changeIndexOfPagination(numOfButtons, firstButtonPagination))
            dispatch(changeIndexOfPagination(lastButtonPagination + 4, lastButtonPagination - 1))
        } else if(numberOfPage <= firstButtonPagination) {
            const prevLasttIndexOfPagination = (Math.floor(lastButtonPagination / 4) - 1) * 4;
            const prevFirstIndexOfPagination = ((Math.floor(prevLasttIndexOfPagination / 4) - 1) * 4) -1;
            dispatch(changeIndexOfPagination(prevLasttIndexOfPagination, prevFirstIndexOfPagination === -1 ? 0 : prevFirstIndexOfPagination))
        }
    }

    const changeCurrentPage = (e) => {
        const numberOfPage = parseInt(e.target?.innerHTML) || e
        moveNumbersPagination(numberOfPage)
        const indexOfLastRecipe = numberOfPage * recipesPerPage;
        const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
        dispatch(changePage(indexOfLastRecipe, indexOfFirstRecipe, numberOfPage))
    }

    const prevPage = () => {
        if ( currentPage > 1) changeCurrentPage(currentPage - 1)
    }
    
    const nextPage = () => {
        if ( currentPage < numOfButtons) changeCurrentPage(currentPage + 1)
    }



for (let index = 1; index <= numOfButtons; index++) {
    listOfButtons.push(<Button key={index} selected={index === currentPage ? "inset 5px 5px 10px #a7b46c, inset -5px -5px 10px #e1f492;" : "5px 5px 10px #a7b46c, -5px -5px 10px #e1f492;"} onClick={changeCurrentPage}>{index}</Button>) 
}
    const shortList = listOfButtons.slice(firstButtonPagination, lastButtonPagination)
    return ( 
        <>
            <ChangePages onClick={prevPage}><svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z"/></svg></ChangePages>
                {shortList}
            <ChangePages onClick={nextPage}><svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M17.7 34.9q-.4-.5-.425-1.1-.025-.6.425-1.05l8.8-8.8-8.85-8.85q-.4-.4-.375-1.075.025-.675.425-1.075.5-.5 1.075-.475.575.025 1.025.475l9.95 9.95q.25.25.35.5.1.25.1.55 0 .3-.1.55-.1.25-.35.5l-9.9 9.9q-.45.45-1.05.425-.6-.025-1.1-.425Z"/></svg></ChangePages>
        </>
     );
}

export default Pagination;