const initialState = {
    halls: []
};

const hallReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_ALL_HALL":
            return {
                ...state,
                halls: action.payload
            };

        default:
            return state;
    }
};

export default hallReducer;