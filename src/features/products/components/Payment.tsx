import React, { useState, useEffect, FormEvent } from 'react'
import { loadStripe, } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useAppSelector } from '../../../hooks/redux/hooks'
import { useAppDispatch } from './../../../hooks/redux/hooks';
import { resetCart } from '../productSlice';
import axios from 'axios'

const Payment = () =>
{

    const { cart } = useAppSelector(state => state.product)
    const dispatch = useAppDispatch()
    const stripe = useStripe()
    const elements = useElements()


    const [isProcessing, setIsProcessing] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState('')

    const totalQty = cart.reduce((acc: any, item: { quantity: any; }) => acc + item.quantity, 0)


    useEffect(() =>
    {
        if (totalQty === 0) return
        if (paymentStatus !== 'succeeded') return
        dispatch(resetCart())
    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();

        if (totalQty === 0) return;

        if (!stripe || !elements) return;

        const cardEl = elements.getElement(CardElement);

        setIsProcessing(true);

        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_API}/stripe`, {
                cart,
            });

            const { client_secret: clientSecret } = res.data;

            const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardEl!,
                },
            });

            if (!paymentIntent) {
                setPaymentStatus('Payment failed!');
            } else {
                setPaymentStatus(paymentIntent.status);
            }
        } catch (error) {
            console.error(error);
            setPaymentStatus('Payment failed!');
        }

        setIsProcessing(false);
    };
   

    return (
        <div style={{ fontSize: '20px' }}>
            <form id="payment-form" onSubmit={handleSubmit}>
                <label htmlFor="card-element"></label>
                <CardElement id="card-element" />
                {
                    !isProcessing && (
                        <button
                            style={{
                                marginTop: '16px',
                                height: '31px',
                                backgroundColor: '#f0c14b',
                                color: 'black',
                                display: 'flex',
                                fontWeight: 600,
                                fontSize: '20px',
                                padding: '24px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                width: '100%',
                            }}
                        >
                            Pay
                        </button>
                    )
                }
            </form>
        </div>
    )
}



const PaymentGateway = () =>
{
    const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`)

    return (
        <Elements stripe={stripePromise}>
            <Payment />
        </Elements>
    )
}

export default PaymentGateway
