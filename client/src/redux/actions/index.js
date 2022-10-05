import axios from 'axios';



//      ACTION-TYPES
export const PORT = "http://localhost:3001"
export const GET_RECIPES = "GET_RECIPES" 
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL"
export const GET_RECIPES_FROM_NAME = "GET_RECIPES_FROM_NAME"
export const CREATE_RECIPE = "CREATE_RECIPE"
export const GET_DIETS = "GET_DIETS"
export const REQUEST_FAILURE = "REQUEST_FAILURE"

//      ACTIONS
export const getRecipes = () => {
    return async (dispatch) => {
        return axios.get(`${PORT}/recipes/list`)
        .then(({ data }) => dispatch({
            type:GET_RECIPES,
            payload: data
        }))
    }
}


export const getRecipeDetail = (id) => {
    return async (dispatch) => {
        return axios.get(`${PORT}/recipes/${id}`)
        .then(({ data }) => dispatch({
            type:GET_RECIPE_DETAIL,
            payload: data
        }))
    }
}

export const createRecipe = (payload) => {
    return {
        type:CREATE_RECIPE,
        payload
    }
}

export const getRecipesFromName = (name) => {
    return async (dispatch) => {
        return axios.get(`${PORT}/recipes/?name=${name}`)
        .then(({ data }) => dispatch({
            type:GET_RECIPES_FROM_NAME,
            payload: data
        }))
        .catch( err => dispatch({
            type: REQUEST_FAILURE,
            payload: err
        }))
    }
}

export const getDiets = () => {
    return async (dispatch) => {
        return axios.get(`${PORT}/diets`)
        .then(({ data }) => dispatch({
            type:GET_DIETS,
            payload: data
        }))
        .catch( err => dispatch({
            type: REQUEST_FAILURE,
            payload: err
        }))
    }
}