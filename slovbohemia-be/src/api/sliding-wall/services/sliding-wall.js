'use strict';

/**
 * sliding-wall service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sliding-wall.sliding-wall');
