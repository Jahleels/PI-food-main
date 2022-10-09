import neu from '../../neu-card.module.css'
import s from './BarAside.module.css'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getRecipesFromName } from '../../redux/actions'
import { useState, useEffect } from 'react'

function BarAside() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    useEffect(() => {
        dispatch(getRecipesFromName(search))
    }, [search, dispatch])

    const handleRedirect = (e) => {
        e.preventDefault()
        history.push('/create')
    }
    return ( 
        <aside className={s.container}>
            <button className={`${neu.card} ${neu.btn}`} onClick={handleRedirect}>Agregar nueva receta</button>
            <input type="search" value={search} onChange={e => setSearch(e.target.value)} className={`${neu.card} ${neu.input}`} placeholder='Buscar' />
            <select className={`${neu.card} ${neu.input}`} name="diets" id="dietsSelect">
                <option value="v">Dietas</option>
                <option value="v">Vegetariano</option>
                <option value="v">Omnivoro</option>
            </select>
        </aside>
    );
}

export default BarAside;