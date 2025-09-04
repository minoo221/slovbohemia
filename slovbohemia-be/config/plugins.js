module.exports = ({ env }) => ({
  // ...
 email: {
		config: {
			provider: 'nodemailer',
			providerOptions: {
				host: env('SMTP_HOST'),
				port: env('SMTP_PORT'),
				auth: {
					user: env('SMTP_USERNAME'),
					pass: env('SMTP_PASSWORD'),
				},
			},
			settings: {
				defaultFrom: 'slovbohemia@slovbohemia.sk',
				defaultReplyTo: 'slovbohemialm@gmail.com',
				testAddress: 'milanblasko28@gmail.com',
			},
		},
	},
  // ...
});