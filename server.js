const express = require("express");
const app = express();
const port = 3000;
const stripe = require("stripe")(
  "sk_test_51NK4CMJQ2b7DFDnhxRvdOCUoGYcBa94YmUAHkWRALm1kcj98nNcElLt4Q2LM5ErTd13yIpvJMd9dXZdDHKAPHfou00BN9Q0aPG"
);

app.get("/", (req, res) => {
  const message = "Hello, world!";
  res.json({ message });
});

app.post("/payment-sheet", async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2022-11-15" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "eur",
    customer: customer.id,
    payment_method_types: ["card"],
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey:
      "pk_test_51NK4CMJQ2b7DFDnhnkdp4y89M4NizcQ244LZ2DDB66ADoG72qQ5PNtwyHsxWeN48Lk4zWXWMcL63bq7K0HFPAD0y00UfSonSf1",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
