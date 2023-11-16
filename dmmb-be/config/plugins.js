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
				defaultFrom: 'no-reply@muzeum.eu.sk',
				defaultReplyTo: 'muzeum.eu.sk@gmail.com',
				testAddress: 'muzeum.eu.sk@muzeum.eu.sk',
			},
		},
	},
  // ...
});