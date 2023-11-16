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
				defaultFrom: 'milanblasko28@gmail.com',
				defaultReplyTo: 'milanblasko28@gmail.com',
				testAddress: 'milanblasko28@gmail.com',
			},
		},
	},
  // ...
});