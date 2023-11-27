'use strict';

/**
 * A set of functions called "actions" for `stripe`
 */

module.exports = {
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }

  async chargePayment(ctx, next) {
    try {
      console.log("chargePayment");
      const data = await strapi
            .service("api::stripe.stripe")
            .chargePayment(ctx);

      ctx.body = data;
    } catch (err) {
      console.error(err);
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },

  async sessionInfo(ctx, next) {
    try {
      console.log("sessionInfo");
      const data = await strapi
            .service("api::stripe.stripe")
            .sessionInfo(ctx, ctx.params.sessionId);

      ctx.body = data;
    } catch (err) {
      console.error(err);
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },

  async listOfProducts(ctx, next) {
    try {
      console.log("listOfProducts");
      console.log(ctx.request.query);
      const data = await strapi
            .service("api::stripe.stripe")
            .listOfProducts(5, ctx.request.query.locale);

      ctx.body = data;
    } catch (err) {
      console.error(err);
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  }
};
