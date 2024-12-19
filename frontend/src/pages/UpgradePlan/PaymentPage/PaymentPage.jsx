import React, { useEffect, useState } from 'react';
import {
    useStripe,
    useElements,
    CardElement,
} from '@stripe/react-stripe-js';
import { basicPayment } from "../../../api/stripe";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAlert from "../../../hooks/useAlert";
import { useUser } from "../../../context/UserContext";
import Alert from "../../../components/global/SuccessfulAlert/SuccesfullAlert";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const type = queryParams.get('type');
    const { id } = useParams();
    const navigate = useNavigate();
    const { setUser, user } = useUser();
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCardComplete, setIsCardComplete] = useState(false);
    const { show, mainText, text, triggerAlert, onClose } = useAlert();

    useEffect(() => {
        if (id !== "pro" && id !== "business" && id !== "starter") {
            navigate("/upgrade");
        }
        if (user.subscription) {
            navigate("/upgrade");
        }
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (!elements) {
            return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message);
            setIsLoading(false);
            return;
        }

        const { paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        const res = await basicPayment({ plan: id, type, paymentMethod: paymentMethod.id });
        const plans = { starter: 10, pro: 100, business: 150 };

        const clientSecret = res?.latest_invoice?.payment_intent?.client_secret;

        if (clientSecret) {
            const confirm = await stripe.confirmCardPayment(clientSecret);
            if (confirm.error) {
                triggerAlert("Something went wrong!", "", "error");
                setIsLoading(false);
            } else {
                triggerAlert(`Plan was successfully activated!`, `You will get ${plans[id]} credits every month`);
                setUser({ ...user, subscription: id,
                    subscriptionType:type,
                    credits: user.credits + plans[id] });
                navigate("/");
            }
        }
    };

    const handleCardChange = (event) => {
        setIsCardComplete(event.complete);
        setErrorMessage(event.error ? event.error.message : null);
    };

    // Настройки стилизации для CardElement
    const cardStyleOptions = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSize: '16px',
                fontSmoothing: "antialiased",
                "::placeholder": {
                    color: "#a0aec0",
                },
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    };

    return (
        <>
            <Alert show={show} mainText={mainText} text={text} onClose={onClose} />
            <form onSubmit={handleSubmit} className="w-[300px] sm:w-[500px] mx-auto">
                <div className="border border-gray-300 rounded-md p-4 shadow-sm">
                    <CardElement options={cardStyleOptions} onChange={handleCardChange} className="p-2"/>
                </div>
                <button
                    type="submit"
                    className="bg-primary mt-4 text-white py-2 text-[20px] transition duration-500 ease-in-out hover:bg-primary-dark w-full rounded-md"
                    disabled={!stripe || !elements || isLoading || !isCardComplete}
                >
                    {isLoading ? "Processing..." : "Pay"}
                </button>
                {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
            </form>
        </>
    );
};

export default CheckoutForm;
