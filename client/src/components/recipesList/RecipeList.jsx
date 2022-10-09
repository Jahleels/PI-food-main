import Pagination from '../pagination/Pagination';
import RecipeCard from '../recipeCard/RecipeCard';
import s from './recipeList.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes } from '../../redux/actions'
import { useEffect } from 'react'

function RecipeList() {

    let recipesList = useSelector(state => state.currentPosts)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch]) 


    return (
        <section className={s.container}>
            <div className={s.recipesContainer}>
                {recipesList.map(recipe => <RecipeCard key={recipe.id} id={recipe.id} name={recipe.name} summary={recipe.summary} image={recipe.img} />)}
            </div>

            <div className={s.buttons}>
                <Pagination />
            </div>
        </section>
    );
}

export default RecipeList;