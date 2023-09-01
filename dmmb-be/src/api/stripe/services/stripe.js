'use strict';
const Stripe = require('stripe');
// @ts-ignore
const stripe = Stripe('sk_test_51IKj34KbNiX05g6vHD86ezpkOSXzazqwC8qC5NcKoPN8mPS7Qs1EXSAiaxbrWNtUYwH8GctE8arGHGFU6yw6EhqX0082zFO0ka');
/**
 * stripe service
 */

module.exports = {

  chargePayment: async (ctx) => {
    console.log("SERVICE chargePayment")

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1NjI0dKbNiX05g6vsKCPEFwV',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:1337/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:1337/cancel.html`,
    customer: 'cus_OVcD82pxA2YkJE'
  });
    
  console.log(session);
   return session.url; 
  },

  sessionInfo: async(sessionId) => {
    const session = await stripe.checkout.sessions.retrieve(
      sessionId
    );

    let stripeCustomer = session.customer;
    let stripeCustomerEmail = session.customer_details.email;
    let stripeStatus = session.status;
    let stripePaymentStatus = session.payment_status;

    // Get user from DB
    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: {stripeUserId: stripeCustomer},
      populate: ['role'],
    })

    if (user.lastCheckoutId != sessionId) {
      console.log("Update user subscription")
      if (stripeStatus == 'complete' && stripePaymentStatus == 'paid') {
        // set role subscribed to user + set date
        const editedUser = await strapi.db.query('plugin::users-permissions.user').update({
          where: { stripeUserId: stripeCustomer },
          data: {
            role: {
              id: 3
            },
            subscribedUntil: '2025-09-01',
            lastCheckoutId: sessionId
          }
        });
  
        
        //console.log(editedUser);
      }
    }
    
    console.log(session);
    return sessionId;
  }
};
