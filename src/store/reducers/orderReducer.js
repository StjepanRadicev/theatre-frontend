const initialState = {
    adminOrders: null,
    pagination: {},
    userOrders: [],
    userOrdersPagination: {},
};

export const orderReducer = (state = initialState, action ) => {
    switch (action.type) {
        case "GET_ADMIN_ORDERS":
            return {
                ...state,
                adminOrders: action.payload,
                pagination: {
                    ...state.pagination,
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage,
                },
            };

        case "GET_USER_ORDERS":
            return {
                ...state,
                userOrders: action.payload,
                userOrdersPagination: {
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