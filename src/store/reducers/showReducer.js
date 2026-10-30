const initialState = {
    shows: [],
    dropdownShows: [],
    pagination: {},
};

const showReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_ALL_SHOWS":
            return {
                ...state,
                shows: action.payload.content,
                pagination: {
            pageNumber: action.payload.pageNumber,
            pageSize: action.payload.pageSize,
            totalElements: action.payload.totalElements,
            totalPages: action.payload.totalPages,
            lastPage: action.payload.lastPage,
        },
            };

        case "FETCH_DROPDOWN_SHOWS":
            return {
                ...state,
                dropdownShows: action.payload,
            };
            
        default:
            return state;
    }
};

export default showReducer;