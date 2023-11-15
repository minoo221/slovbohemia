var moment = require('moment');

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */

  myJob: {
    task: async ({ strapi }) => {
      console.log("RUN CRON");
      // Add your own logic here (e.g. send a queue of email, create a database backup, etc.).
      const users = await strapi.db.query('plugin::users-permissions.user').findMany({
        where: {
          subscribedUntil: {
            $eq: moment().format('YYYY-MM-D')
          }
        },
      });
      let usersID = users.map(s => s.id);
      
      if (usersID.length > 0) {
        console.log("Updating Users:", usersID);
        for (const userId of usersID) {
          await strapi.db.query("plugin::users-permissions.user").update({
            where: {
              id: userId
            },
            data: {
              role: {
                id: 1
              },
            },
          });
        }
      }
    },
    options: {
      rule: "0 2 * * *",
    },
  },
};