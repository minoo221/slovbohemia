'use strict';
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51IKj34KbNiX05g6vHD86ezpkOSXzazqwC8qC5NcKoPN8mPS7Qs1EXSAiaxbrWNtUYwH8GctE8arGHGFU6yw6EhqX0082zFO0ka');
/**
 * stripe service
 */

module.exports = {
  
  testService: async (ctx) => {
    
    
    /*stripe.customers.create({
      email: 'customer@example.com',
    })
  .then(customer => console.log(customer.id))
  .catch(error => console.error(error));*/
    
    //const entry = await strapi.entityService.findOne()
    const user = await strapi.db.query('plugin::users-permissions.user').findMany({
      populate: ['role'],
      orderBy: 'id',
    })
    
    /*await strapi.db.query('plugin::users-permissions.user').update({
      where: { id: 1 },
      populate: {
        role: {
          id: 3
        }
      },
      data: {
        role: {
          id: 3
        }
      }
    })*/
    /*
   await strapi.entityService.update('plugin::users-permissions.user', 1, {
     data: {
       role: {
         id: 3
       }
     }
    })*/
    
    const userService = await strapi.entityService.findMany('plugin::users-permissions.user', {
      populate: ['role'],
      orderBy: 'id',
    })
    
    
    //console.log(user);
    
    const loggedUser  = ctx.state.user;
    console.log(loggedUser);
    
   return "AHHOJ test API"; 
  }
};
