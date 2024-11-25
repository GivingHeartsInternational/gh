// api/create-payment-intent.js

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Секретный ключ Stripe

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount } = req.body;

  try {
    // Создаем платежное намерение
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Сумма в центах
      currency: 'usd',
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
