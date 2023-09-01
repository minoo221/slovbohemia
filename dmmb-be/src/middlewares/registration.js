const Stripe = require('stripe');
// @ts-ignore
const stripe = Stripe('sk_test_51IKj34KbNiX05g6vHD86ezpkOSXzazqwC8qC5NcKoPN8mPS7Qs1EXSAiaxbrWNtUYwH8GctE8arGHGFU6yw6EhqX0082zFO0ka');

module.exports = () => {
  return async (ctx, next) => {
    await next();
    // only if path was register with newsletter param and it was successfull. Then we will put user in the mailing list.
    
    if (ctx.request.url === '/api/auth/local/register' && ctx.response.status === 200) {
      console.log("Registration midd")
      const email = ctx.response.body.user.email;
      const name = ctx.response.body.user.nickname;

       stripe.customers.create({
          email: email,
        })
      .then(customer => {
        console.log(customer.id);

        strapi.db.query('plugin::users-permissions.user').update({
          where: { email: email },
          data: {
            stripeUserId: customer.id
          }
        });
      })
      .catch(error => console.error(error));
    }
  };
}