import { Skeleton } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast';
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Await, useLocation , useNavigate} from 'react-router-dom';
import { stripePaymentConfirmation } from '../../store/actions';

const PaymentConfirmation = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    const [ errorMessage, setErrorMessage ] = useState("");
    const { cart } = useSelector((state) => state.carts);
    const [ loading, setLoading ] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const paymentIntent = searchParams.get("payment_intent");
    const clientSecret = searchParams.get("payment_intent_client_secret");
    const redirectStatus = searchParams.get("redirect_status");
    

    const navigate = useNavigate();
    const confirmationStarted = useRef(false);


    useEffect(() => {
    if (confirmationStarted.current) return;

    if (!paymentIntent || !clientSecret) {
        setErrorMessage("Nedostaju podaci o plaćanju.");
        return;
    }

   

    confirmationStarted.current = true;

    const confirmOrder = async () => {
        const sendData = {
            pgName: "Stripe",
            pgPaymentId: paymentIntent,
            pgStatus: "requires_capture",
            pgResponseMessage: "Stripe payment confirmation"
        };

        const success = await dispatch(
            stripePaymentConfirmation(
                sendData,
                setErrorMessage,
                setLoading,
                toast
            )
        );

        if (success) {
            setOrderSuccess(true);
        } else {
            toast.error("Kupnja nije dovršena.");
            // Ne brišemo košaricu automatski jer Stripe
            // autorizacija ili naplata možda još postoji.
        }
    };

    confirmOrder();

}, [paymentIntent, clientSecret, dispatch]);


  return (
    <div className='min-h-screen flex items-center justify-center'>
       {loading ? (
    <Skeleton />
) : orderSuccess ? (
    <div className="text-center">
        <FaCheckCircle className="text-green-500 mx-auto" size={64} />
        <h2 className="text-2xl font-bold mt-4">
            Plaćanje uspješno
        </h2>
        <p>Hvala na kupnji!</p>
    </div>
) : errorMessage ? (
    <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600">
            Plačanje neuspješno
        </h2>

        <p className="mt-3 text-gray-600">
            {errorMessage}
        </p>

        <button
            onClick={() => navigate("/cart", { replace: true })}
            className="mt-5 rounded bg-blue-600 px-5 py-2 text-white"
        >
            Nazad u košaricu
        </button>
    </div>
) : (
    <p>Potvrđivanje vaše uplate...</p>
)}
    </div>
  )
}

export default PaymentConfirmation