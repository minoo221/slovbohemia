'use strict';
const MailerLite = require('@mailerlite/mailerlite-nodejs').default;
const mailerlite = new MailerLite({
  api_key: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZGFhOTE1NGY5NTk4YmNhZTc0M2E3ZTA5YWJhY2RiZmE5ZGZlMzFmNmIyOGE2OWFjZjc2OWM5MzY5MjJmNjBjNWM2YmJjMzY3YjU0NzY5ZjIiLCJpYXQiOjE3MTI1NzU4NzAuNzc3MDY3LCJuYmYiOjE3MTI1NzU4NzAuNzc3MDcsImV4cCI6NDg2ODI0OTQ3MC43NzM3OTQsInN1YiI6Ijg5ODI3NiIsInNjb3BlcyI6W119.ZkxgJvDpPGoROgNR4C9ZZaM0BttHa62jiU-Q1DBt4lLpdzkN4acKDpAQ-rk9ZsH2-aRGcaY-xDFJwAFAZEqBCtUkjsT34s1bbjut68ZMmI4QLJEgDqEEEz-4qvIQlnKPRsfY5PB1NHC6aB4lPDzX_0mYMQr2JDwLPla7CTb2158lV2u0xtP6GAKe_9-KnuhUn_6cokZEX2dIuMiRjbjv27g4NDFVRewMOjSbiraDyD1EOisKN8J3EuE_6US-YU75GD11cwiEDW4QHmBZHqWB-zo0bo0YPjQZ7iszYGp75CUOp_v6Ba7oyHx3SRAhyCGzBmGgXvd2Fy_U8O2qkhgBYvy8UO5ye4lI_6ke81p-v9f8o4NBQNtAAPWqPlshvCeaJ9HU8o0PWTRnecIGGgdzxN2KNZsLSBenmqvHfLCQe0P5w0aya3f-Oh04XQomly_ZufmKi-DAstb_jQLPDBxga8ywswG4MpkIv61udXwqIg4MEp31jTbjrJPr4WUPgNGn5SEl02PZOa5_ebiHhC5wLWuWMmEM-q2viE1e4-JSPJaOtOUqUqZtZETi3gi2Yh2xfx-BOkBSTqb3sKWFcCqLFjDfqeI3Q5Aprji5UqzGEk7m4UNeOQP2prnmrzySdsM8RFC9Yui10yT5cMTTDaumPfY4Hz3030bt1PBECHQGTvE"
});

/**
 * newsletter controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::newsletter.newsletter', ({ strapi }) => ({
	async sendData(ctx) {
		try {
		const response = await super.create(ctx);
		const { email } = ctx.request.body.data;
		console.log(ctx.request.body.data);

		const subscriberData = {
          email: email,
          groups:	['117049172947895379'],
          status:	'active',
          subscribed_at: '',
          ip_address:	'',
          opted_in_at:	'',
          optin_ip:	'',
          unsubscribed_at:	''
        };

        //@ts-ignore
          		mailerlite.subscribers.createOrUpdate(subscriberData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
              if (error.response) console.log(error.response.data);
              console.log(error.message);
            });
            await strapi.service('api::contact.create');


            return response;
		} catch (err) {
			strapi.log.debug('📺: ', err);
			return ctx.badRequest(null, err);
		}
	}
}));
