// const initialState = {
//     cart: [],
//     totalPrice: 0,
//     cartId: null,
//     isCartLocked: false,
// }

// export const cartReducer = (state = initialState, action) => {

//     switch (action.type) {
//         case "ADD_CART":
//             const seatToAdd = action.payload;
//             const existingSeat = state.cart.find(
//                 (item) => item.performanceSeatId === seatToAdd.performanceSeatId
//             );

//             if(existingSeat) {
//                 const updatedCart = state.cart.map((item) => {
//                     if (item.performanceSeatId === seatToAdd.performanceSeatId) {
//                         return seatToAdd;
//                     } else {
//                         return item;
//                     }
//                 });

//                 return {
//                     ...state,
//                     cart: updatedCart,
//                 };
//             } else {
//                 const newCart = [...state.cart, seatToAdd];
//                 return {
//                     ...state,
//                     cart: newCart,
//                 };
//             }
          
//         case "REMOVE_CART":
//             return {
//                 ...state,
//                 cart: state.cart.filter(
//                     (item) => item.performanceSeatId !== action.payload.performanceSeatId
//                 ),
//             }
            
//         case "GET_USER_CART_SEATS":
//             return {
//                 ...state,
//                 cart: action.payload,
//                 totalPrice: action.totalPrice,
//                 cartId: action.cartId,
//             };

//         case "CLEAR_CART":
//             return { cart:[], totalPrice: 0, cartId: null }


//         case "LOCK_CART":
//             return {
//                 ...state,
//                 isCartLocked: true,
//             };

//         case "UNLOCK_CART":
//             return {
//                 ...state,
//                 isCartLocked: false,
//             };

            
//         default:
//             return state;
//     }

//     return state;
// }




const initialState = {
    cart: [],
    totalPrice: 0,
    cartId: null,
    isCartLocked: false,
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CART": {
            if (state.isCartLocked) return state;

            const seatToAdd = action.payload;

            const existingSeat = state.cart.find(
                item => item.performanceSeatId === seatToAdd.performanceSeatId
            );

            const updatedCart = existingSeat
                ? state.cart.map(item =>
                    item.performanceSeatId === seatToAdd.performanceSeatId
                        ? seatToAdd
                        : item
                )
                : [...state.cart, seatToAdd];

            return {
                ...state,
                cart: updatedCart,
            };
        }

        case "REMOVE_CART":
            if (state.isCartLocked) return state;

            return {
                ...state,
                cart: state.cart.filter(
                    item =>
                        item.performanceSeatId !==
                        action.payload.performanceSeatId
                ),
            };

        case "GET_USER_CART_SEATS":
            return {
                ...state,
                cart: action.payload,
                totalPrice: action.totalPrice,
                cartId: action.cartId,
            };

        case "LOCK_CART":
            return {
                ...state,
                isCartLocked: true,
            };

        case "UNLOCK_CART":
            return {
                ...state,
                isCartLocked: false,
            };

        case "CLEAR_CART":
            return {
                ...initialState,
            };

        default:
            return state;
    }
};












































