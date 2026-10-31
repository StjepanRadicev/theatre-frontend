import React, { useEffect, useRef, useState } from 'react'
import Stepper from '@mui/material/Stepper';
import { Label } from '@headlessui/react';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useDispatch, useSelector } from 'react-redux';
import { cancelCheckout, createUserCart, getUserCart } from '../../store/actions';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import Skeleton from '../shared/Skeleton';
import ErrorPage from '../shared/ErrorPage';
import PaymentMethod from './PaymentMethod';
import OrderSummary from './OrderSummary';
import StripePayment from './StripePayment';
import PaypalPayment from './PaypalPayment';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {

    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();
    const { isLoading, errorMessage } = useSelector((state) => state.errors);
    const { cart, cartId, totalPrice } = useSelector((state) => state.carts);
    

    const [openCancelDialog, setOpenCancelDialog] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);

    const navigate = useNavigate();

    
const [secondsLeft, setSecondsLeft] = useState(null);

const expiryHandled = useRef(false);

const reservationRequestStarted = useRef(false);

const heldUntil = cart
    ?.filter((seat) => seat.status === "HELD" && seat.heldUntil)
    .map((seat) => new Date(`${seat.heldUntil}Z`).getTime())
    .filter((time) => Number.isFinite(time))
    .sort((a, b) => a - b)[0];

   

useEffect(() => {
    if (!heldUntil) return;

    const updateTimer = () => {
        const remaining = Math.max(
        0,
        Math.ceil((heldUntil - Date.now()) / 1000) - 60
        );

        setSecondsLeft(remaining);
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
}, [heldUntil]);



    //const { paymentMethod } = useSelector((state) => state.payment);

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    }

     
const handleCancelCheckout = async () => {
    if (isCancelling) return;

    setIsCancelling(true);

    try {
        const success = await dispatch(cancelCheckout());

        if (!success) {
            toast.error("Failed to cancel reservation.");
            return;
        }

        setOpenCancelDialog(false);

        toast.success("Rezervacija je uspješno piništena.");

        navigate("/cart", { replace: true });

    } finally {
        setIsCancelling(false);
    }
};


useEffect(() => {
    if (secondsLeft === null || secondsLeft > 0) return;
    if (expiryHandled.current) return;

    expiryHandled.current = true;

    const cancelExpiredCheckout = async () => {
        const success = await dispatch(cancelCheckout());

        if (success) {
            toast.error("Vrijeme rezervacije je isteklo. Rezervacija je poništena.");
            navigate("/cart", { replace: true });
        } else {
            toast.error("Could not cancel reservation.");
        }
    };

    cancelExpiredCheckout();
}, [secondsLeft, dispatch, navigate]);


    const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
};

    
    

    const steps = [
        "Sažetak narudžbe",
        "Plaćanje",
    ];

    

   
useEffect(() => {
    if (reservationRequestStarted.current) return;

    reservationRequestStarted.current = true;

    const initializeCheckout = async () => {
        // 1. Provjeri postoji li već rezervacija
        const existingCart = await dispatch(getUserCart());

        if (existingCart?.performances?.some(
            seat => seat.status === "HELD" && seat.heldUntil
        )) {
            return; // Postojeća rezervacija je učitana
        }

        // 2. Ako nema rezervacije, kreiraj novu
        if (cart.length > 0) {
            const sendCartItems = cart.map(item => ({
                performanceSeat: {
                    performanceSeatId: item.performanceSeatId
                }
            }));

            const success = await dispatch(createUserCart(sendCartItems));

            if (success) return;
        }

        toast.error("Unable to restore reservation.");
        navigate("/cart", { replace: true });
    };

    initializeCheckout();


}, [dispatch, cart, cartId, navigate]);




return (
    <div className='py-14 min-h-[calc(100vh-100px)]'>

    
{secondsLeft !== null && (
    <div className="text-center mb-6">
        <p className="text-gray-600 font-medium">
            Preostalo vrijeme rezervacije
        </p>

        <p className={`text-2xl font-bold ${
            secondsLeft <= 120 ? "text-red-600" : "text-green-600"
        }`}>
            {String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:
            {String(secondsLeft % 60).padStart(2, "0")}
        </p>

        <p className="text-xs text-gray-500">
            Naplata se zatvara unutar jedne minute
        </p>
    </div>
)}


        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
                <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>


            {isLoading ? (
                <div className='lg:w-[80] mx-auto py-5'>
                     <Skeleton />
                </div>
            ) : (
                <div className='mt-5'>
                    
                   {activeStep === 0 && (
                        <OrderSummary
                            totalPrice={totalPrice}
                            cart={cart}
                            paymentMethod="Stripe"
                        />
                    )}

                    {activeStep === 1 && (
                        <StripePayment />
                    )}
                                        
                </div>
            ) }
        

        <div
            className='flex justify-between items-center px-4 fixed z-50 h-24 bottom-0 bg-white left-0 w-full py-4 border-slate-200 '
                        style={ { boxShadow: "0 -2px 4px rgba(100, 100, 100, 0.15"}}>
            <Button
                variant='outlined'
                disabled={activeStep === 0}
                onClick={handleBack}>
                    Povratak
            </Button>

            <Button
                variant="text"
                color="error"
                onClick={() => setOpenCancelDialog(true)}
                    >
                    Prekini naplatu
            </Button>

            
               {activeStep !== steps.length - 1 && (
                    <button
                        disabled={
                            !cartId ||
                            isLoading ||
                            !!errorMessage
                        }
                        className={`bg-custom-blue font-semibold px-6 h-10 rounded-md text-white
                            ${!cartId || isLoading || errorMessage ? "opacity-60" : ""}
                        `}
                        onClick={handleNext}
                    >
                        Nastavi
                    </button>
                )}

        </div>

        <Dialog
                open={openCancelDialog}
                onClose={() => {
                    if (!isCancelling) {
                        setOpenCancelDialog(false);
                    }
                }}
            >
                <DialogTitle>
                    Prekinuti naplatu?
                </DialogTitle>

                <DialogContent>
                    Jeste li sigurni da želite prekinuti naplatu?
                    Vaša odabrana sjedala će biti obrisana i
                    vaša rezervacija će biti poništena.
                </DialogContent>

                <DialogActions>
                    <Button
                        disabled={isCancelling}
                        onClick={() => setOpenCancelDialog(false)}
                    >
                        Nastavi naplatu
                    </Button>

                    <Button
                        color="error"
                        variant="contained"
                        disabled={isCancelling}
                        onClick={handleCancelCheckout}
                    >
                        {isCancelling
                            ? "Poništavanje..."
                            : "Poništi rezervaciju"}
                    </Button>
                </DialogActions>
            </Dialog>

       {errorMessage && <ErrorPage message={errorMessage} />}
    </div>
  );
}

export default Checkout;