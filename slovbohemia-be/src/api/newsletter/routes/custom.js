module.exports = {
  routes: [
	{ // Path defined with an URL parameter
      method: 'POST',
      path: '/create-subscriber',
      handler: 'newsletter.sendData',
	  config: {
        auth: false,
      },
    }
  ]
}
