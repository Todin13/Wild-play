const express = require('express');
const Stripe = require('stripe');

require('dotenv').config({ path: '../../.env' });
const stripe = Stripe(process.env.STRIPE_SECRET);

const router = express.Router();

router.post('/create-session', async (req, res) => {
    const { bookingId, amount, van } = req.body;
  
    try {
      if (!amount || !van || !van.manufacturer || !van.model) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {name: `${van.manufacturer} ${van.model} Booking`},
            unit_amount: amount * 100,
          },
          quantity: 1,
        }],
        success_url: `${req.headers.origin}/bookings/${bookingId}`, 
        cancel_url: `${req.headers.origin}/bookings/${bookingId}`, 
        client_reference_id: bookingId,
      });
  
      res.json({ sessionId: session.id });
    } catch (error) {
      //console.error("Stripe:", error);
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
