import { 
    GET_RECIPES,
    GET_RECIPE_DETAIL, 
    GET_DIETS, 
    CREATE_RECIPE,
    CREATE_DETAIL,
    GET_RECIPES_FROM_NAME,
    REQUEST_FAILURE,
    CHANGE_PAGE,
    SLICE_OF_PAGINATION } from '../actions'


const initialState = {
    isLoading: true,
    isError: false,
    errorMessage: '',
    recipes:[],
    diets:[],
    recipeDetail: {},
    createDetail: {

    },
    currentPosts:[],
    currentPage:1,
    recipesPerPage:6,
    sliceOfPagination: [0, 4]
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
            const indexOfLastRecipe = state.currentPage * state.recipesPerPage;
            const indexOfFirstRecipe = indexOfLastRecipe - state.recipesPerPage
            return {
                ...state,
                recipes: action.payload,
                isLoading: false,
                currentPosts: action.payload.slice(indexOfFirstRecipe, indexOfLastRecipe)
            }

        case GET_RECIPES_FROM_NAME:

            return {
                ...state,
                recipes: action.payload,
                isLoading: false,
                currentPosts: action.payload.slice(0, 6)
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

        case CREATE_DETAIL:

            return {
                ...state,
                createDetail: {...state.createDetail, ...action.payload}
            }

        case REQUEST_FAILURE:

            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload
            }

        case CHANGE_PAGE:

            return {
                ...state,
                currentPosts: state.recipes.slice(action.payload[0], action.payload[1]),
                currentPage: action.payload[2]
            }

        case SLICE_OF_PAGINATION:

            return {
                ...state,
                sliceOfPagination: action.payload
            }
        
        default:
            return state
    }
}

export default mainReducer;