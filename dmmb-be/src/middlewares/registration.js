const Stripe = require('stripe');
const MailerLite = require('@mailerlite/mailerlite-nodejs').default;

// @ts-ignore
const stripe = Stripe(process.env.STRAPI_ADMIN_LIVE_STRIPE_SECRET_KEY);

const mailerlite = new MailerLite({
  api_key: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNzBjYjNlNDAyNzRlMmFjOTM3YjgwM2UzMWMzYjUxM2M4M2Y1MDNhOThiOGM4YjhhMTY1NTc0YzYyMjMxMGVjODBjNWMzNzk0MDBkMTZjYmYiLCJpYXQiOjE2OTcwMjkzMzkuMjIxODM1LCJuYmYiOjE2OTcwMjkzMzkuMjIxODM4LCJleHAiOjQ4NTI3MDI5MzkuMjE2ODI3LCJzdWIiOiI2NjUyMTIiLCJzY29wZXMiOltdfQ.HxTkEFLKM0EMmZPx7q_-wd5urxgN9HsTaaB1tib_6R9Hfjgpp_7E5nuXxf4MbKJCo7xR2ziIaGbOSznYVNJUoXjH_l8NJAFAbt3Ps-PdgOWsR1e4gQ0hHtboSRR_BoXp3RWMH_0cNGOfGE84UA-EE7lRUX44o-j6zm9UxERoCPWKDGwMDOdMdTHLcjE2NrjwNRja8ARBepptHddzf9td1IRGjo4OLnS5Z9eVjDybEWodpvgFcU4dhjzm6zK9XkhG7Ct-XX34S8Oz59oBmy6pVlH_UCGmN1eCCciE1NdFm29qmhvym89ArZchUrwmXFJGR9LqDrs0fW7pPkz-2cKePscoCv6uyVFmC-WF5xCsUU2opHhs3ZaKrW2Lm8xM-ezac3r3idlxfEPvH50vP1BVdoH-7pFwjfWcYOWRQqkdrQGR6_RMKjWC0Bwn9zpqWS0ytCUoDzkKgP2o51EXug-qb7hL7_7C5ci4OTrjqeVXAZ1C2zncDrONvGu4elbjrxLcyb6GSQTTG0D3sGYMAhE43B-VYXctxybHVN38ZzBU9qEoO9_9rGvglpqfRlSY91KDOaaNzp0SxPxT3tiz6nQBJFPlyzJzy4Opj9sJQvhH1cUTxlhotHOMp7YKC9wuM47DhZSYiVLJlNUJKzAMFJU_J-DuH7eOLIwEXSD8gdKlr-w"
});

module.exports = () => {
  return async (ctx, next) => {
    await next();
    // only if path was register with newsletter param and it was successfull. Then we will put user in the mailing list.

    if (ctx.request.url === '/api/auth/local/register' && ctx.response.status === 200) {
      console.log("Registration midd")
      const email = ctx.response.body.user.email;
      const name = ctx.response.body.user.nickname;
      const newsletter = ctx.response.body.user.newsletter;

       stripe.customers.create({
          email: email,
        })
      .then(customer => {
        console.log(customer.id);

        strapi.db.query('plugin::users-permissions.user').update({
          where: { email: email },
          data: {
            stripeUserId: customer.id,
          }
        });

        const subscriberData = {
          email: email,
          fields:	{
            name: name,
          },
          groups:	['101744616472052993'],
          status:	'active',
          subscribed_at: '',
          ip_address:	'',
          opted_in_at:	'',
          optin_ip:	'',
          unsubscribed_at:	''
        };
        console.log(ctx.response.body.user);

        if(newsletter == true) {
        //@ts-ignore
          mailerlite.subscribers.createOrUpdate(subscriberData)
            .then(response => {
              console.log("newsletter", newsletter);
            })
            .catch(error => {
              if (error.response) console.log(error.response.data);
              console.log(error.message);
            });
          }
      })

      .catch(error => {
        console.error(error)
        return error
      });
    }
  };
}