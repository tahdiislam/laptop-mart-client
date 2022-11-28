import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_PK);

export default function Payment() {
  const { result } = useLoaderData();
  const navigation = useNavigation();
  const { price, productName } = result;
  // loading spinner
  if (navigation.state === "loading") {
    return <Loading />;
  }
  return (
    <div className="mx-4 md:mx-0">
      <h3 className="text-2xl font-semibold text-primary mb-4">Payment</h3>
      <p className="text-lg">
        Please pay $<strong>{price}</strong> for this product {productName}
      </p>
      <div className="w-96 my-6 mx-auto">
        <Elements stripe={stripePromise}>
          <CheckOutForm result={result} />
        </Elements>
      </div>
    </div>
  );
}
