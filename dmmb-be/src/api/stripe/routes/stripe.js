module.exports = {
  routes: [
     {
      method: 'GET',
      path: '/stripe',
       handler: 'stripe.getStrapi',
      config: {
        policies: [],
        middlewares: [],
      },
     },
  ],
};
