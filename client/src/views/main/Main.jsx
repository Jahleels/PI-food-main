import BarAside from "../../components/barAside/BarAside";
import RecipeList from "../../components/recipesList/RecipeList";
import s from './main.module.css'

function Main() {
    return (
    <main className={s.mainContainer}>
        <BarAside />
        <RecipeList />
    </main>);
}

export default Main;