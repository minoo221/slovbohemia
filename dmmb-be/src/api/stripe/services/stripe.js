'use strict';
const Stripe = require('stripe');
// @ts-ignore
const stripe = Stripe(process.env.STRAPI_ADMIN_LIVE_STRIPE_SECRET_KEY);
/**
 * stripe service
 */
var moment = require('moment');
const { errors } = require('@strapi/utils');
const { ApplicationError } = errors;

module.exports = {

  chargePayment: async (ctx) => {
    console.log("SERVICE chargePayment")

    let priceId = ctx.request.body.priceId;
    let userStripeId = ctx.request.body.userStripeId;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: priceId, //'price_1NjI0dKbNiX05g6vsKCPEFwV',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/platba-uspesna?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/cancel.html`,
      customer: userStripeId//'cus_OVcD82pxA2YkJE'
    });
      
    console.log(session);
   return session.url; 
  },

  sessionInfo: async(ctx, sessionId) => {
    // Get sessions
    const session = await stripe.checkout.sessions.retrieve(
      sessionId
    );
    const sessionLineItem = await stripe.checkout.sessions.listLineItems(
      sessionId
    );

    let stripeCustomer = session.customer;
    let stripeCustomerEmail = session.customer_details.email;
    let stripeStatus = session.status;
    let stripePaymentStatus = session.payment_status;
    
    if (sessionLineItem.data.length == 0) throw new ApplicationError('Wrong session ID');
    const priceCheckout = sessionLineItem.data[0].price;
    // Get price
    const price = await stripe.prices.retrieve(
      priceCheckout.id
    );
    if (price == null) throw new ApplicationError('No price found');
    // Get Product
    const product = await stripe.products.retrieve(
      price.product
    );
    if (price == null) throw new ApplicationError('No product found');

    // Get user from DB
    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: {stripeUserId: stripeCustomer},
      populate: ['role'],
    })
    if (user == null) throw new ApplicationError(`User with id ${stripeCustomer} not found`);
    if (user.lastCheckoutId != sessionId) {
      console.log("Update user subscription")
      if (stripeStatus == 'complete' && stripePaymentStatus == 'paid') {
      // get current date
      var currentDate = moment().add(product.metadata.days, 'days').format('YYYY-MM-DD');
      console.log(currentDate);
        // set role subscribed to user + set date
        const editedUser = await strapi.db.query('plugin::users-permissions.user').update({
          where: { stripeUserId: stripeCustomer },
          data: {
            role: {
              id: 3
            },
            subscribedUntil: currentDate,
            lastCheckoutId: sessionId
          }
        });
      }
    }
    
    return sessionId;
  },

  listOfProducts: async(limit) => {
    const prices = await stripe.prices.list({
      limit: limit,
    });

    let res = [];

    for (const price of prices.data) {

      const product = await stripe.products.retrieve(
        price.product
      );
      let item = {
        name: product.name,
        priceId: price.id,
        price: price.unit_amount / 100,
        currency: price.currency,
        description: product.description
      }
      res.push(item)

    }
    return res;
  }
};
