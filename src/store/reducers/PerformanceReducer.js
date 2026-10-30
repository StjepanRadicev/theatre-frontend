const initialState = {
    performances: null,
    shows: null,
    categories: null,
    pagination: {},
}


export const performanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_PERFORMANCES":
            return {
                ...state,
                performances: action.payload,
                pagination: {
                    ...state.pagination,
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage,
                },
            };

        case "FETCH_CATEGORIES":
            return {
                ...state,
                categories: action.payload,
                pagination: {
                    ...state.pagination,
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage,
                },
            };
    
        default:
            return state;
    }
};