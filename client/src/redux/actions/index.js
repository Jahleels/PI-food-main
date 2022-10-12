import axios from 'axios';



//      ACTION-TYPES
export const PORT = "http://localhost:3001"
export const GET_RECIPES = "GET_RECIPES" 
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL"
export const CLEAR_RECIPE_DETAIL = "CLEAR_RECIPE_DETAIL"
export const GET_RECIPES_FROM_NAME = "GET_RECIPES_FROM_NAME"
export const CREATE_RECIPE = "CREATE_RECIPE"
export const CREATE_DETAIL = "CREATE_DETAIL"
export const GET_DIETS = "GET_DIETS"
export const REQUEST_FAILURE = "REQUEST_FAILURE"
export const CHANGE_PAGE = "CHANGE_PAGE"
export const SLICE_OF_PAGINATION = "SLICE_OF_PAGINATION"
export const ORDER_BY = "ORDER_BY" 
export const FILTER_BY = "FILTER_BY"
export const RESET = "RESET"

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

export const clearRecipeDetail = () => {
    return {
        type:CLEAR_RECIPE_DETAIL
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
            payload: [data, name]
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

export const changePage = (indexOfLastRecipe, indexOfFirstRecipe, currentPage) => {
    return {
        type: CHANGE_PAGE,
        payload: [indexOfFirstRecipe, indexOfLastRecipe, currentPage]
    }
}

export const changeIndexOfPagination = (lastButtonPagination, firstButtonPagination) => {
    return {
        type: SLICE_OF_PAGINATION,
        payload: [firstButtonPagination, lastButtonPagination]
    }
}

export const orderBy = (order) => {
    return {
        type: ORDER_BY,
        payload: order
    }
}

export const filterBy = (filter) => {
    return {
        type: FILTER_BY,
        payload: filter
    }
}

export const reset = () => {
    return{ 
        type: RESET
    }
}

// Functions Helpers

export function compareValues(key, order = 'Ascendente') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'Descendente') ? (comparison * -1) : comparison
      );
    };
  }