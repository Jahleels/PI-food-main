import { 
    GET_RECIPES,
    GET_RECIPE_DETAIL, 
    GET_DIETS, 
    CREATE_RECIPE,
    GET_RECIPES_FROM_NAME,
    REQUEST_FAILURE } from '../actions'


const initialState = {
    isLoading: true,
    isError: false,
    errorMessage: '',
    recipes:[],
    diets:[],
    recipeDetail: {}
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
            
            return {
                ...state,
                recipes: action.payload,
                isLoading: false
            }

        case GET_RECIPES_FROM_NAME:

            return {
                ...state,
                recipes: action.payload,
                isLoading: false
            }
    
        case GET_DIETS:

            return {
                ...state,
                diets: action.payload,
                isLoading: false
            }

        case GET_RECIPE_DETAIL:

            return {
                ...state,
                recipeDetail: action.payload,
                isLoading: false
            }

        case CREATE_RECIPE:

            return {
                ...state,
                recipes: [action.payload, ...state.recipes]
            }

        case REQUEST_FAILURE:

            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload
            }

        default:
            return state
    }
}

export default mainReducer;