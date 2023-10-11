module.exports = {
  routes: [
     {
      method: 'POST',
      path: '/stripe/charge',
      handler: 'stripe.chargePayment',
      config: {
        policies: [],
        middlewares: [],
        auth: false
      },
     },
     {
      method: 'GET',
      path: '/stripe/session/:sessionId',
      handler: 'stripe.sessionInfo',
      config: {
        policies: [],
        middlewares: [],
        auth: false
      },
     },
     {
      method: 'GET',
      path: '/stripe/products',
      handler: 'stripe.listOfProducts',
      config: {
        policies: [],
        middlewares: [],
        auth: false
      },
     },
  ],
};
