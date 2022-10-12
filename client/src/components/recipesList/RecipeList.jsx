import Pagination from '../pagination/Pagination';
import RecipeCard from '../recipeCard/RecipeCard';
import s from './recipeList.module.css'
import { useSelector } from 'react-redux'
import { Loading } from '../createBar/CreateBar';

function RecipeList() {

    let recipesList = useSelector(state => state.currentPosts)
    let error = useSelector(state => state.isError)
    let isLoading = useSelector(state => state.isLoading)



    return (
        <section className={s.container}>
            <div className={s.recipesContainer}>
                {isLoading ? <Loading /> : error ? <h1>No se pudo encontrar</h1> : recipesList?.map(recipe => <RecipeCard key={recipe.id} id={recipe.id} name={recipe.name} summary={recipe.summary} image={recipe.img} diets={recipe.mixes} />)}
            </div>

            <div className={s.buttons}>
                <Pagination />
            </div>
        </section>
    );
}

export default RecipeList;