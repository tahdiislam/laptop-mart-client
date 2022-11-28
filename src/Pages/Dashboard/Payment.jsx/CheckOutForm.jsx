import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckOutForm({ result }) {
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const element = useElements();
  const navigate = useNavigate();

  // price
  const { price, buyerName, buyerEmail, _id, productId } = result;

  // load client secret
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${import.meta.env.VITE_server_url}create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("lmt")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  // form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    // validation checkup
    if (!stripe || !element) {
      return;
    }

    const card = element.getElement(CardElement);
    // check validation
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }
    setSuccess("");
    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: buyerName,
            email: buyerEmail,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }

    const payment = {
      price,
      transactionId: paymentIntent.id,
      email: buyerEmail,
      bookingId: _id,
    };

    if (paymentIntent.status === "succeeded") {
      axios
        .post(
          `${import.meta.env.VITE_server_url}payments/${productId}`,
          payment,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("lmt")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.result.acknowledged) {
            setSuccess("Congrats! your payment completed");
            setTransactionId(paymentIntent.id);
            navigate("/dashboard/my-orders/");
          }
          console.log(res);
        });
    }
    setProcessing(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-sm mt-4 btn-primary"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      <p className="text-red-500">
        <small>{cardError}</small>
      </p>
      {success && (
        <div>
          <p className="text-green-500">{success}</p>
          <p>
            Your transactionId:{" "}
            <span className="font-bold">{transactionId}</span>
          </p>
        </div>
      )}
    </>
  );
}
