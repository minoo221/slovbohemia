module.exports = ({ env }) => ({
  // ...
  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: 'milanblasko28@gmail.com',
        defaultReplyTo: 'milanblasko28@gmail.com',
      },
    },
  },
  // ...
});