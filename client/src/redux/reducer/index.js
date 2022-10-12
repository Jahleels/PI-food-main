import { 
    GET_RECIPES,
    GET_RECIPE_DETAIL, 
    GET_DIETS, 
    CREATE_RECIPE,
    CREATE_DETAIL,
    GET_RECIPES_FROM_NAME,
    REQUEST_FAILURE,
    CHANGE_PAGE,
    SLICE_OF_PAGINATION,
    ORDER_BY,
    FILTER_BY,
    RESET,
    compareValues } from '../actions'


const initialState = {
    isLoading: true,
    isError: false,
    errorMessage: '',
    recipes:[],
    recipesBackup: [],
    recipesFromName:[],
    diets:[],
    recipeDetail: {},
    createDetail: {

    },
    currentPosts:[],
    currentPage:1,
    recipesPerPage:6,
    sliceOfPagination: [0, 4],

    valueOrder:'Order',
    valueFilter:'Filter by diet',
    valueSearch:''
}

const mainReducer = (state = initialState, action) => {
    let indexOfLastRecipe = state.currentPage * state.recipesPerPage;
    let indexOfFirstRecipe = indexOfLastRecipe - state.recipesPerPage
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                recipesBackup: action.payload,
                isLoading: false,
                currentPosts: action.payload.slice(indexOfFirstRecipe, indexOfLastRecipe)
            }

        case GET_RECIPES_FROM_NAME:

            return {
                ...state,
                recipes: action.payload[0],
                recipesFromName: action.payload[0],
                isLoading: false,
                currentPosts: action.payload[0]?.slice(0, 6),
                valueSearch: action.payload[1]
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
                recipes: [action.payload, ...state.recipes],
                recipesBackup: [action.payload, ...state.recipes]
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

        case ORDER_BY:

            let recipes = action.payload !== 'Order'
            ? state.recipes.sort(compareValues('name', action.payload))  
            : state.recipesBackup;

            return {
                ...state,
                recipes: recipes,
                currentPosts: recipes.slice(indexOfFirstRecipe, indexOfLastRecipe),
                valueOrder: action.payload
            }
        
        case FILTER_BY:

            let filteredRecipes = action.payload !== 'Filter by diet' 
            ? !state.recipesFromName.length 
                ? state.recipesBackup.filter( recipe => recipe.mixes.some( diet => diet.diet.name === action.payload)) 
                : state.recipesFromName?.filter( recipe => recipe.mixes.some( diet => diet.diet.name === action.payload)) 
            : state.recipesBackup;

            return {
                ...state,
                recipes: filteredRecipes,
                currentPosts: filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe),
                valueFilter: action.payload
            }

        case RESET:

            return {
                ...state,
                recipes: state.recipesBackup,
                currentPosts: state.recipesBackup.slice(0, 6),
                valueFilter: 'Filter by diet',
                valueOrder: 'Order',
                valueSearch: '',
                currentPage: 1
            }
        
        default:
            return state
    }
}

export default mainReducer;