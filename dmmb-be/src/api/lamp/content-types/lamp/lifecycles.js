
module.exports = {
  beforeCreate(event) {
    const { data, where, select, populate } = event.params;

    // let's do a 20% discount everytime
  },

  afterCreate(event) {
    const { result, params } = event;
	console.log(event);
    // do something to the result;
  }
}