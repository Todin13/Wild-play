/*

Webhook for stripe payment ssystem
Author: Kirill Smirnov

*/

const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET);

// Middleware to parse the raw body for Stripe webhook signature verification
router.post('/webhook', async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);   //process.env.STRIPE_WEBHOOK_SECRET     
    } catch (err) {        
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        // console.log('session:', {
        //     client_reference_id: session.client_reference_id,
        //     payment_status: session.payment_status
        // });

        const bookingId = session.client_reference_id;

        if (!bookingId) {
            //console.warn('bookingId not found in client_reference_id');
            return res.status(200).send();
        }

        try {
            //console.log(`booking ${bookingId} as paid`);

            //api endpoint for stripe webhook to mark booking as paid and confirmed
            const response = await fetch(`https://wild-play-api.vercel.app/api/bookings/${bookingId}/paid`, { //http://localhost:${process.env.PORT}/api/
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' }
            });
        
            if (!response.ok) {
                throw new Error(`http error; status: ${response.status}`);
            }
            
            const text = await response.text();
            //console.log(`booking ${bookingId} marked as paid; response: ${text}`);
        } catch (err) {
            console.error(`failed to set booking ${bookingId} as paid:`, err);
        }
    }

    res.status(200).send();
});

module.exports = router;