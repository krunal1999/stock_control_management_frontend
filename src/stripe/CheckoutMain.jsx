import React, { useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import StripeService from "./StripeService";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./Stripe.css";

const stripePromise = loadStripe(
  "pk_test_51NeDLBDAj2pgXHIpnQCnA9VlWNjwXH1Gv5j3ez4FIyx4eIn0JOeHcIhB1KoSWL0hicteWX5TXpWIvrVfV6MJLoMc00sUyY27Gf"
);

export default function CheckoutMain({price}) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const body = {
      items: [
        {
          id: price,
        }
        
      ],
    };
    StripeService.createpaymentintent(body).then((res) => {
      console.log(res.data);
      setClientSecret(res.data.clientSecret);
    });
  }, [price]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
