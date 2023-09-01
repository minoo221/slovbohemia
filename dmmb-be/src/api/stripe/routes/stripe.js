module.exports = {
  routes: [
     {
      method: 'GET',
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
  ],
};
