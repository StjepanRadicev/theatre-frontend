import { configureStore } from "@reduxjs/toolkit";
import { performanceReducer } from "./PerformanceReducer";
import { errorReducer } from "./errorReducer";
import seatReducer from "./seatReducer";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import { paymentMethodReducer } from "./paymentMethodReducer";
import adminReducer from "./adminReducer";
import { orderReducer } from "./orderReducer";
import showReducer from "./showReducer";
import hallReducer from "./hallReducer";
import { userReducer } from "./userReducer";



const user = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

    const selectUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
    ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
    : [];

const initialState = {
    auth: { user: user, selectUserCheckoutAddress},
    carts: { cart: cartItems},
};

export const store = configureStore({
    reducer: { 
        performances: performanceReducer,
        errors: errorReducer,
        seats: seatReducer,
        carts: cartReducer,
        auth: authReducer,
        payment: paymentMethodReducer,
        admin: adminReducer,
        orders: orderReducer,
        shows: showReducer,
        halls: hallReducer,
        users: userReducer,
    },
    preloadedState: initialState,
});

export default store;