const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async () => {
  console.log("Loading product from Stripe...");
  try {
    const products = await stripe.products.list();
    let myProduct = products.data.filter(
      (product) => product.id === "prod_NYbzDeICK8egy0"
    );
    currentProduct = myProduct[0];
    const prices = await stripe.prices.list();
    const price = prices.data.filter(
      (price) => price.product === "prod_NYbzDeICK8egy0"
    );
    //console.log(price);
    let productReturn = { ...currentProduct, price: price[0].unit_amount };
    //console.log(productReturn);
    let bodyResponse = JSON.stringify({ data: [productReturn] });
    console.log(bodyResponse);
    return {
      statusCode: 200,
      contentType: "application/json",
      body: bodyResponse,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
