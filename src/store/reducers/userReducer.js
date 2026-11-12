const initialState = {
    users: [],
    pagination: {},
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case "FETCH_USERS":
            return {
                ...state,
                users: action.payload,
                pagination: {
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