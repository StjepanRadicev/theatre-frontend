import Skeleton from '@mui/material/Skeleton';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'

const PaymentForm = ({ clientSecret, totalPrice }) => {

    const stripe = useStripe();
    const elements = useElements();
    //const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        if (isProcessing) return;
            setIsProcessing(true);
            setErrorMessage("");

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message);
            setIsProcessing(false);
            return;
}

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
            return_url: `${import.meta.env.VITE_FRONTEND_URL}/order-confirm`
            }
        });

        if (error) {
            setErrorMessage(error.message);
            setIsProcessing(false);
            return false;
        }
    };

    const paymentElementOptions = {
            layout: "tabs",
        };

        
    const isLoading = !clientSecret || !stripe || !elements;


  return (
    <form onSubmit={handleSubmit} className='max-w-lg mx-auto p-4 mb-10'>
        <h2 className='text-xl font-semibold mb-4'>Podaci o plaćanju</h2>
        {isLoading ? (
            <Skeleton />
        ) : (
            <>
            {clientSecret && <PaymentElement options={paymentElementOptions}/> }
            {errorMessage && (
                <div className='text-red-500 mt-2'>{errorMessage}</div>
            )}

            <button
                type="submit"
                className="text-white w-full px-5 py-[10px] bg-black mt-2 rounded-md font-bold disabled:opacity-50"
                disabled={!stripe || isLoading || isProcessing}
            >
                {isProcessing
                    ? "Processing..."
                    : `Pay EUR${Number(totalPrice).toFixed(2)}`}
            </button>
            </>
        )}
    </form>
  )
}

export default PaymentForm