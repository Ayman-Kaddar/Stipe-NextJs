import { Stripe } from "stripe";
import ButtonBuy from "../component/buttonBuy";

async function loadPrices() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const prices = await stripe.prices.list();
  // const sortedPrices = prices.data.sort(
  //   (a, b) => a.unit_amount - b.unit_amount
  // );
  // return sortedPrices;
  const Plan = prices.data.find((price) => price.nickname === "Plan Gold");
  return Plan ? [Plan] : [];
}

async function PricingPage() {
  const prices = await loadPrices();
  console.log(prices);

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <header>
          <h1 className="text-center my-5">Pricing</h1>
        </header>

        <div className="flex gap-x-2">
          {prices.map((price) => (
            <div key={price.id} className="bg-slate-300 mb-2 p-7">
              <h3>{price.nickname}</h3>
              <h2 className="text-3xl font-bold">{price.unit_amount / 100}$</h2>
              <ButtonBuy priceId={price.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
