const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async () => {
  console.log("Loading products from Stripe...");
  try {
    const products = await stripe.products.list();
    const prices = await stripe.prices.list();
    let pricedProducts = products.data.map((product) => {
      const price = prices.data.filter((price) => price.product === product.id);
      let productReturn = { ...product, price: price[0].unit_amount };
      return productReturn;
    });
    let bodyResponse = JSON.stringify({ data: pricedProducts });
    console.log(pricedProducts);
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
