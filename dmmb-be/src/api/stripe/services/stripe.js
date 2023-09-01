'use strict';
const Stripe = require('stripe');
// @ts-ignore
const stripe = Stripe('sk_test_51IKj34KbNiX05g6vHD86ezpkOSXzazqwC8qC5NcKoPN8mPS7Qs1EXSAiaxbrWNtUYwH8GctE8arGHGFU6yw6EhqX0082zFO0ka');
/**
 * stripe service
 */

module.exports = {
  
  testService: async (ctx) => {
    
    
    /*stripe.customers.create({
      email: 'customer@example.com',
    })
  .then(customer => console.log(customer.id))
  .catch(error => console.error(error));*/
    
    //const entry = await strapi.entityService.findOne()
    const user = await strapi.db.query('plugin::users-permissions.user').findMany({
      populate: ['role'],
      orderBy: 'id',
    })
    
    /*await strapi.db.query('plugin::users-permissions.user').update({
      where: { id: 1 },
      populate: {
        role: {
          id: 3
        }
      },
      data: {
        role: {
          id: 3
        }
      }
    })*/
    /*
   await strapi.entityService.update('plugin::users-permissions.user', 1, {
     data: {
       role: {
         id: 3
       }
     }
    })*/
    
    const userService = await strapi.entityService.findMany('plugin::users-permissions.user', {
      populate: ['role'],
      orderBy: 'id',
    })
    
    
    //console.log(user);
    
    const loggedUser  = ctx.state.user;
    console.log(loggedUser);
    
   return "AHHOJ test API"; 
  },

  chargePayment: async (ctx) => {
    console.log("SERVICE chargePayment")
    
    /*stripe.customers.create({
      email: 'customer@example.com',
    })
  .then(customer => console.log(customer.id))
  .catch(error => console.error(error));*/

  /*const paymentIntent = await stripe.paymentIntents.create(
    {
      amount: 1099,
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
      //payment_method_types: ['card']
    },
    {
      stripeAccount: 'acct_1NjdKIQO3IetaHET',
    }
  );*/

  /*await stripe.charges.create({
    amount: 1,
    description: 'Test',
    curency: 'EUR',
    customer: 'cus_OVcD82pxA2YkJE'
  })*/

  /*const session = await stripe.checkout.sessions.create({
    line_items: [{
      price: '5',
      quantity: 1,
    }],
    payment_intent_data: {
      application_fee_amount: 123,
    },
    mode: 'payment',
    success_url: 'http://localhost:1337',
    cancel_url: 'http://localhost:1337/cancel',
  }, {
    stripeAccount: 'acct_1NjdKIQO3IetaHET',
  });*/

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
