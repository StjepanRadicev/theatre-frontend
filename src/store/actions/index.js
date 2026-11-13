import { data, Navigate } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast";




const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 8000;
const REQUEST_TIMEOUT_MS = 60000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Greške koje upućuju na to da se server još budi (nema odgovora ili 502/503/504)
const isServerWakingError = (error) => {
    if (!error.response) return true; // timeout, network error, CORS greška od gatewaya
    return [502, 503, 504].includes(error.response.status);
};

export const fetchPerformances = (queryString) => async (dispatch) => {
    dispatch({ type: "IS_FETCHING" });

    const url = queryString
        ? `/public/performances/all?${queryString}`
        : `/public/performances/all`;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const { data } = await api.get(url, { timeout: REQUEST_TIMEOUT_MS });

            dispatch({
                type: "FETCH_PERFORMANCES",
                payload: data.content,
                pageNumber: data.pageNumber,
                pageSize: data.pageSize,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                lastPage: data.lastPage,
            });
            dispatch({ type: "IS_SUCCESS" });
            return;
        } catch (error) {
            console.log(`Pokušaj ${attempt} neuspješan`, error);

            const canRetry = isServerWakingError(error) && attempt < MAX_RETRIES;
            if (canRetry) {
                dispatch({ type: "SERVER_WAKING" }); // za poruku korisniku
                await sleep(RETRY_DELAY_MS);
                continue;
            }

            dispatch({
                type: "IS_ERROR",
                payload:
                    error?.response?.data?.message ||
                    (isServerWakingError(error)
                        ? "Server se pokreće, pokušajte ponovno za minutu."
                        : "Neuspjeh dohavta Izvedbi"),
            });
            return;
        }
    }
};

// export const fetchPerformances = (queryString) => async (dispatch) => {
//     try {
//         dispatch({ type: "IS_FETCHING" });

//         const url = queryString
//             ? `/public/performances/all?${queryString}`
//             : `/public/performances/all`;

//         const { data } = await api.get(url);
//         dispatch({
//             type: "FETCH_PERFORMANCES",
//             payload: data.content,
//             pageNumber: data.pageNumber,
//             pageSize: data.pageSize,
//             totalElements: data.totalElements,
//             totalPages: data.totalPages,
//             lastPage: data.lastPage,
//         });
//         dispatch({ type: "IS_SUCCESS" });
//     } catch (error) {
//         console.log(error);
//         dispatch({ type: "IS_ERROR",
//                     payload: error?.response?.data?.message || "Failed to fetch performances",

//          });
//     }
// };

export const fetchCategories = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "CATEGORY_LOADER" });
        const { data } = await api.get(`/public/categories`);
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_ERROR" });
    } catch (error) {
        console.log(error);
        dispatch({ type: "IS_ERROR",
                    payload: error?.response?.data?.message || "Neuspjeh dohvata Kategorija",

         });
    }
};


export const addToCart = (data, qty = 1, toast) =>
    (dispatch, getState) => {

        // console.log(getState());
        // // Find the performances
        // const { seats } = getState().seats;
        // const getSeats = seats.find(
        //     (item) => item.performanceSeatId === data.performanceSeatId
        // );

        // // Check for stocks
        // const isAvailable = getSeats.status == "AVAILABLE";

        // // if in stock -> add
        // if (isAvailable) {
        //     dispatch({ type: "ADD_CART", payload: {...data, quantity: 1 }});
        //     localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        // } else {
        //     // if not -> error

        // }


  dispatch({
    type: "ADD_CART",
    payload: {
      id: data.performanceSeatId,
      performanceSeatId: data.performanceSeatId,
      section: data.section,
      rowLabel: data.rowLabel,
      seatNumber: data.seatNumber,
      price: data.price,
      status: data.status,
      performanceName: data?.performanceName,
      quantity: 1,
      image: data?.image,
      time: data?.time,
    },
  });


  toast.success(`${data?.rowLabel} ${data?.seatNumber} dodano u košaricu`);

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().carts.cart)
  );

  
};

export const removeFromCart = (data, toast) => (dispatch, getState) => {
    dispatch({type: "REMOVE_CART", payload: data});
    toast.success(`${data.performanceName} ${data.section} obrisano iz košarice`);

     localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
}


export const authenticateSignInUser
 = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {

    try {
        setLoader(true);
        const { data} = await api.post("/auth/signin", sendData);
        dispatch({ type: "LOGIN_USER", payload: data});
        localStorage.setItem("auth", JSON.stringify(data));
        reset();
        toast.success("Prijava je uspješna",
            { duration: 6000 }
        );
        navigate("/");
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Interna pogreška poslužitelja",
             { duration: 6000 }
        ); 
    } finally {
        setLoader(false);
    }
}
 

export const registerNewUser
 = (sendData, toast, reset, navigate, setLoader,setError) => async (dispatch) => {

     try {
        setLoader(true);

        const { data } = await api.post("/auth/signup", sendData);

        reset();

        toast.success(
            "Registracija je uspješna! Molim provjerite vaš email zbog verifikacije računa.",
            { duration: 6000 }
        );

        navigate("/login", {
            state: {
                registrationSuccess: true
            }
        });

    } catch (error) {
        console.log(error);

        const backendErrors = error?.response?.data?.errors;

        if (backendErrors && typeof backendErrors === "object") {

            Object.entries(backendErrors).forEach(([field, message]) => {
                setError(field, {
                    type: "server",
                    message: message
                });
            });

        } else {
            toast.error(
                error?.response?.data?.message ||
                "Interna pogreška poslužitelja"
            );
        }

    } finally {
        setLoader(false);
    }

    // try {
    //     setLoader(true);
    //     const { data} = await api.post("/auth/signup", sendData);
    //     reset();
    //     toast.success(data?.message || "User registered successfully");
    //     navigate("/login");
    // } catch (error) {
    //     console.log(error);
    //     toast.error(error?.response?.data?.message || error?.response?.data?.password || "Internal Server Error"); 
    // } finally {
    //     setLoader(false);
    // }
}

export const logOutUser = (navigate) => (dispatch) => {

    localStorage.removeItem("auth");

    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("cartItems");
    
    dispatch({ type: "LOG_OUT" });

    setTimeout(() => {
        navigate("/", { replace: true });
    }, 0);
};


export const addUpdateUserAddress = 
    (sendData, toast, addressId, setOpenAddressModal) => async (dispatch, getState) => {
      
    const { user } = getState().auth;

    dispatch({ type: "BUTTON_LOADER" });

    try {
        if (!addressId) {
            const { data} = await api.post("/addresses", sendData);
        } else {
            await api.patch(`/addresses/${addressId}`, sendData);
        }
        dispatch(getUserAddresses());
        toast.success("Address saved successfully");
        dispatch({ type:"IS_SUCCESS"});
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Interna pogreška poslužitelja"); 
        dispatch({ type: "IS_ERROR", payload: null });

    } finally {
        setOpenAddressModal(false);
    }
};

export const deleteUserAddress = (toast, addressId, setOpenDeleteModal) => async (dispatch, getState) => {

    const { user } = getState().auth;
    try {
        dispatch({ type: "BUTTON_LOADER" });
        await api.delete(`/addresses/${addressId}`);
        dispatch({ type: "IS_SUCCESS" });
        dispatch(getUserAddresses());
        dispatch(clearCheckoutAddress());
        toast.success("Adresa je dodana uspješno");
    } catch (error) {
        console.log(error);
        dispatch({ type: "IS_ERROR",
                    //payload: error?.response?.data?.message || "Greška prilikom brisanja adrese",

         });
          toast.error(
        error?.response?.data?.message ||
        "Greška prilikom brisanja adrese."
    );
    } finally {
        setOpenDeleteModal(false);
    }
};

export const clearCheckoutAddress = () => {
    return {
        type: "REMOVE_CHECKOUT_ADDRESS",
    }
}

export const getUserAddresses = (queryString) => async (dispatch, getState) => {

    const { user } = getState().auth;
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/users/addresses`);
        dispatch({ type: "USER_ADDRESS", payload: data});
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ type: "IS_ERROR",
                    payload: error?.response?.data?.message || "Failed to fetch user's address",

         });
    }
};

export const selectUserCheckoutAddress = (address) => {
    localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));
    return {
        type: "SELECT_CHECKOUT_ADDRESS",
        payload: address,
    }
};


export const addPaymentMethod = (method) => {
    return {
        type: "ADD_PAYMENT_METHOD",
        payload: method,
    }
};


export const createUserCart = (sendCartItems) => async (dispatch, getState) => {


    try {
        dispatch({ type: "IS_FETCHING" });

        await api.post('/cart/create', sendCartItems);
        await dispatch(getUserCart());

        return true;

    } catch (error) {
        console.log(error);

        dispatch({ type: "UNLOCK_CART" });
        
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Nije uspjelo dodavanje stavki u košaricu",
        });

        return false;
    }



    // const { user } = getState().auth;
    // try {
    //     dispatch({ type: "IS_FETCHING" });
    //     await api.post('/cart/create', sendCartItems);
    //     await dispatch(getUserCart());
        
    // } catch (error) {
    //     console.log(error);
    //     dispatch({ type: "IS_ERROR",
    //                 payload: error?.response?.data?.message || "Failed to create cart items",

    //      });
    // }
};




export const getUserCart = () => async (dispatch, getState) => {

    const { user } = getState().auth;
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get('/carts/users/cart');

        dispatch({
            type: "GET_USER_CART_SEATS",
            payload:  data.performances,
            totalPrice: data.totalPrice,
            cartId: data.cartId
        })
        //localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        dispatch({ type: "IS_SUCCESS" });
     
        return data;


    } catch (error) {
        console.log(error);
        dispatch({ type: "IS_ERROR",
                    payload: error?.response?.data?.message || "Nije uspio dohvat stavki iz košarice",

         });

         return null;
    }
};



export const createStripePaymentSecret
 = (totalPrice) => async (dispatch, getState) => {

    try {
        dispatch({ type: "IS_FETCHING" });
        const { data} = await api.post("/order/stripe-client-secret", {
            "amount" : Number(totalPrice) * 100,
            "currency" : "EUR"
        });
        dispatch({ type: "CLIENT_SECRET", payload: data });
        localStorage.setItem("client-secret", JSON.stringify(data));
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Failed to create client secret"); 
    } 
}



export const stripePaymentConfirmation =
    (sendData, setErrorMessage, setLoading, toast) => async (dispatch) => {

    setLoading(true);

    try {
        const response = await api.post(
            "/order/users/payments/Stripe",
            sendData
        );

        if (!response.data) {
            throw new Error("Order confirmation failed");
        }

        localStorage.removeItem("cartItems");
        localStorage.removeItem("client-secret");

        dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
        dispatch({ type: "CLEAR_CART" });

        toast.success("Order Accepted");
        return true;

    } catch (error) {
        setErrorMessage(
            error?.response?.data?.message ||
            "Payment could not be completed. Please contact support if your card was charged."
        );
        return false;

    } finally {
        setLoading(false);
    }
};





// export const stripePaymentConfirmation
//  = (sendData, setErrorMessage, setLoading, toast) => async (dispatch, getState) => {

//     try {
        
//         const  response = await api.post("/order/users/payments/online", sendData);
//         console.log(response);

//         if (response.data) {
//             console.log("IN if");
//             localStorage.removeItem("CHECKOUT_ADDRESS");
//             localStorage.removeItem("cartItems");
//             localStorage.removeItem("client-secret");
//             dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS"});
//             dispatch({ type: "CLEAR_CART"});
//             toast.success("Order Accepted");
//         } else {
//             setErrorMessage("Payment Failed, Please try again");
//         }
//     } catch (error) {
//         setErrorMessage("Payment Failed, Please try again");
//     }
// }


// export const cancelCheckout = () => async (dispatch) => {
//     try {
//         dispatch({ type: "IS_FETCHING" });

//         await api.delete("/cart/clear");

//         dispatch({ type: "CLEAR_CART" });
//         localStorage.removeItem("cartItems");

//         dispatch({ type: "IS_SUCCESS" });

//         return true;
//     } catch (error) {
//         dispatch({
//             type: "IS_ERROR",
//             payload:
//                 error?.response?.data?.message ||
//                 "Failed to cancel checkout"
//         });

//         return false;
//     }
// };




export const cancelCheckout = () => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });

        // OVDJE stavi svoj stvarni backend endpoint
        await api.delete("/cart/clear");

        dispatch({ type: "CLEAR_CART" });

        localStorage.removeItem("cartItems");
        localStorage.removeItem("checkoutActive");

        dispatch({ type: "IS_SUCCESS" });

        return true;

    } catch (error) {
        console.error(error);

        dispatch({
            type: "IS_ERROR",
            payload:
                error?.response?.data?.message ||
                "Nije uspjelo otkazivanje Naplate",
        });

        return false;
    }
};



export const analyticsAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING"});
        const { data } = await api.get('/admin/app/analytics');
        dispatch({
            type: "FETCH_ANALYTICS",
            payload: data,
        })
        dispatch({ type: "IS_SUCCESS"});
    } catch (error) {
        dispatch({
             type: "IS_ERROR",
             payload: error?.response?.data?.message || "Nije uspjelo dohvačanje podatka Analitike",
            });
    }
};



export const monthlyRevenueAction = () => async (dispatch) => {
    try {
        const { data } = await api.get(
            "/admin/app/analytics/revenue"
        );

        dispatch({
            type: "FETCH_MONTHLY_REVENUE",
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: "IS_ERROR",
            payload:
                error?.response?.data?.message ||
                "Failed to fetch monthly revenue",
        });
    }
};



export const showOccupancyAction = () => async (dispatch) => {
    try {
        const { data } = await api.get("/admin/app/analytics/occupancy");

        dispatch({
            type: "FETCH_SHOW_OCCUPANCY",
            payload: data
        });

    } catch (error) {
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message ||
                "Failed to fetch show occupancy"
        });
    }
};



export const monthlySoldTicketsAction = () => async (dispatch) => {
    try {
        const { data } = await api.get("/admin/app/analytics/tickets");

        dispatch({
            type: "FETCH_MONTHLY_SOLD_TICKETS",
            payload: data
        });

    } catch (error) {
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message ||
                "Failed to fetch monthly sold tickets"
        });
    }
};



export const getOrdersForDashboard = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });

        const { data } = await api.get(`/admin/orders?${queryString}`);

        dispatch({
            type: "GET_ADMIN_ORDERS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ type: "IS_ERROR",
                    payload: error?.response?.data?.message || "Failed to fetch orders data",

         });
    }
};

export const getOrdersByUserId = (userId, queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });

        const { data } = await api.get(
            `/admin/users/${userId}/orders?${queryString}`
        );

        dispatch({
            type: "GET_USER_ORDERS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });

        dispatch({ type: "IS_SUCCESS" });

    } catch (error) {
        console.log(error);

        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message ||
                "Dohvat narudžbi korisnika nije uspio.",
        });
    }
};



export const dashboardPerformancesAction = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });

        const url = queryString
            ? `/admin/performances?${queryString}`
            : `/admin/performances`;

        const { data } = await api.get(url);
        dispatch({
            type: "FETCH_PERFORMANCES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ type: "IS_ERROR",
                    payload: error?.response?.data?.message || "Nije uspjelo dohvačanje Izvedbi",

         });
    }
};




export const fetchDropdownShows = () => async (dispatch) => {
    try {
        const { data } = await api.get("/public/show/all");

        dispatch({
            type: "FETCH_DROPDOWN_SHOWS",
            payload: data
        });

    } catch (error) {
        console.error("Error fetching dropdown shows:", error);
    }
};

export const fetchAllShows = (queryString = "") => async (dispatch) => {
    try {
        const { data } = await api.get(
            `/public/show${queryString ? `?${queryString}` : ""}`
        );

        dispatch({
            type: "FETCH_ALL_SHOWS",
            payload: data,
        });
    } catch (error) {
        console.error(error);
    }
};


export const fetchAllHall = () => async (dispatch) => {
    try {
        const { data } = await api.get("/public/hall");

        dispatch({
            type: "FETCH_ALL_HALL",
            payload: data.content
        });

    } catch (error) {
        console.error("Error fetching halls:", error);
    }
};



export const updatePerformanceFromDashboard =
    (sendData, toast, reset, setLoader, setOpen, queryString) =>
    async (dispatch) => {
        try {
            setLoader(true);

            await api.put(
                `/admin/performance/${sendData.id}`,
                sendData
            );

            toast.success("Izvedba je uspješno ažurirana");

            reset();
            setOpen(false);

            await dispatch(dashboardPerformancesAction(queryString));

        } catch (error) {
            console.error("UPDATE ERROR:", error);
            console.error("BACKEND RESPONSE:", error.response?.data);

            const errorMessage =
                error.response?.data?.message ||
                error.response?.data?.description ||
                "Greška pri ažuriranju izvedbe";

            toast.error(errorMessage);

        } finally {
            setLoader(false);
        }
    };



export const addPerformanceFromDashboard =
    (sendData, toast, reset, setLoader, setOpen, queryString) =>
    async (dispatch) => {

        try {
            setLoader(true);

            const { showId, hallId } = sendData;

            await api.post(
                `/admin/show/${showId}/hall/${hallId}/performance`,
                sendData
            );

            toast.success("Izvedba je uspješno dodana.");

            reset();
            setOpen(false);

            dispatch(dashboardPerformancesAction(queryString));

        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Greška prilikom dodavanja izvedbe."
            );

        } finally {
            setLoader(false);
        }
    };







    export const updateProductImageFromDashboard =
        (formData, performanceId, toast, setLoader, setOpen, isAdmin, queryString) => async (dispatch) => {
        try {
            setLoader(true);

            const endpoint = isAdmin ? "/performances/" : "/seller/products/";

            await api.put(`${endpoint}${performanceId}/image`, formData);

            toast.success("Fotografija je uspješno dodana.");
            setOpen(false);

            await dispatch(dashboardPerformancesAction(queryString));

        } catch (error) {
            toast.error(
                error?.response?.data?.description ||
                "Greška prilikom dodavanja."
            );
        } finally {
            setLoader(false);
        }
    };





export const addShowFromDashboard =
    (sendData, toast, reset, setLoader, setOpen, queryString) =>
    async (dispatch) => {

        try {
            setLoader(true);

            const { categoryId, ...showData } = sendData;

            await api.post(
                `/admin/categories/${categoryId}/show`,
                showData
            );

            toast.success("Predstava je uspješno dodana.");
            reset();
            setOpen(false);

            dispatch(fetchAllShows(queryString));

        } catch (error) {
            console.error(error);
            toast.error(
                error?.response?.data?.message ||
                "Greška prilikom dodavanja predstave."
            );
        } finally {
            setLoader(false);
        }
    };


export const updateShowFromDashboard =
    (sendData, toast, reset, setLoader, setOpen, queryString) =>
    async (dispatch) => {

        try {
            setLoader(true);

            const { showId, categoryId, ...showData } = sendData;

            await api.put(
                `/admin/show/${showId}/categories/${categoryId}`,
                showData
            );

            toast.success("Predstava je uspješno ažurirana.");
            reset();
            setOpen(false);

            dispatch(fetchAllShows(queryString));

        } catch (error) {
            console.error(error);
            toast.error(
                error?.response?.data?.message ||
                "Greška prilikom ažuriranja predstave."
            );
        } finally {
            setLoader(false);
        }
    };


    export const dashboardUsersAction = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });

        const url = queryString
            ? `/admin/users?${queryString}`
            : `/admin/users`;

        const { data } = await api.get(url);

        dispatch({
            type: "FETCH_USERS",
            payload: data.content,
            pageNumber: data.number,
            pageSize: data.size,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.last,
        });

        dispatch({ type: "IS_SUCCESS" });

    } catch (error) {
        console.log(error);

        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message
                || "Dohvat korisnika nije uspio.",
        });
    }
};



export const deleteAdminUser = (userId) => async (dispatch) => {
    try {
        await api.delete(`/admin/users/${userId}`);

        toast.success("Korisnik je uspješno obrisan.");

        return true;

    } catch (error) {
        const message =
            error?.response?.data?.message ||
            "Brisanje korisnika nije uspjelo.";

        toast.error(message);

        return false;
    }
};


export const deletePerformance = (
    toast,
    performanceId,
    setOpenDeleteModal,
    queryString
) => async (dispatch) => {
    try {
        dispatch({ type: "BUTTON_LOADER" });

        await api.delete(`/admin/performance/${performanceId}`);

        dispatch({ type: "IS_SUCCESS" });

        toast.success(
            "Izvedba je uspješno obrisana.",
            { duration: 6000 }
        );

        dispatch(dashboardPerformancesAction(queryString));

    } catch (error) {
        console.error(error);

        dispatch({ type: "IS_ERROR" });

        toast.error(
            error?.response?.data?.message ||
            "Greška prilikom brisanja izvedbe."
        );
    } finally {
        setOpenDeleteModal(false);
    }
};


export const deleteShow = (
    toast,
    showId,
    setOpenDeleteModal,
    queryString
) => async (dispatch) => {
    try {
        dispatch({ type: "BUTTON_LOADER" });

        await api.delete(`/admin/show/${showId}`);

        dispatch({ type: "IS_SUCCESS" });

        toast.success("Predstava je uspješno obrisana.");

        dispatch(fetchAllShows(queryString));

    } catch (error) {
        console.error(error);

        dispatch({ type: "IS_ERROR" });

        toast.error(
            error?.response?.data?.message ||
            "Greška prilikom brisanja predstave."
        );
    } finally {
        setOpenDeleteModal(false);
    }
};