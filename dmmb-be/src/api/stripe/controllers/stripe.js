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
  async getStrapi(ctx, next) {
    try {
      //console.log(ctx)
      console.log('strapi.services ', strapi.services);
      //console.log(strapi.api)
      const data = await strapi
            .service("api::stripe.stripe")
            .testService(ctx);
      console.log(data, "data");

      ctx.body = data;
    } catch (err) {
      console.error(err);
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
};
