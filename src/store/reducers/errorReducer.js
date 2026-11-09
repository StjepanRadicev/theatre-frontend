

const initialState = {
    isLoading: false,
    errorMessage: null,
    categoryLoader: false,
    categoryError: null,
    btnLoader: false,
    isWaking: false,
};

export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case "IS_FETCHING":
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
                isWaking: false,
            };

         case "SERVER_WAKING":
            return {
                ...state,
                isWaking: true,
            };

        case "BUTTON_LOADER":
            return {
                ...state,
                btnLoader: true,
                errorMessage: null,
                categoryError: null
            };

        case "IS_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                btnLoader: false,
                categoryError: null,
                categoryLoader: false,
                isWaking: false,  
            };

        case "IS_ERROR":
        return {
            ...state,
            isLoading: false,
            errorMessage: action.payload,
            btnLoader: false,
            categoryLoader: false,
            isWaking: false,
        };

        case "CATEGORY_SUCCESS":
            return {
                ...state,
                categoryLoader: false,
                categoryError: null,
            };

        case "CATEGORY_LOADER":
        return {
            ...state,
            categoryLoader: true,
            categoryError: null,
            errorMessage: null
        };

        
        default:
            return state;
    }
    
};