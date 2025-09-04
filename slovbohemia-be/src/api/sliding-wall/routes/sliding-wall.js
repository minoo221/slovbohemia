'use strict';

/**
 * sliding-wall router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::sliding-wall.sliding-wall');
