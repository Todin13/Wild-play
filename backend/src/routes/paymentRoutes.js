/*

routes for stripe webhook
Author: Kirill Smirnov

*/

const express = require('express');
const Stripe = require('stripe');

require('dotenv').config({ path: '../../.env' });
const stripe = Stripe(process.env.STRIPE_SECRET);

const router = express.Router();

router.post('/create-session', async (req, res) => {

  try {
    const { bookingId, amount, van } = req.body;

    if (!bookingId || isNaN(amount)) {
      return res.status(400).json({ 
        error: "invalid booking id or amount",
        received: req.body
      });
    }

    const amountInCents = Math.round(parseFloat(amount) * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: van 
              ? `${van.manufacturer || 'Van'} ${van.model || 'Booking'}` 
              : 'Vehicle Booking',
          },
          unit_amount: amountInCents,
        },
        quantity: 1,
      }],
      success_url: `${req.headers.origin || 'https://wild-play-api.vercel.app/api'}/bookings/${bookingId}`,
      cancel_url: `${req.headers.origin || 'https://wild-play-api.vercel.app/api'}/bookings/${bookingId}`,
      client_reference_id: bookingId.toString(),
    });

    console.log('Stripe session:', session.id);
    return res.json({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error) {
    console.error('session error:', error);
    return res.status(500).json({
      error: error.message,
      type: error.type      
    });
  }
});

module.exports = router;
