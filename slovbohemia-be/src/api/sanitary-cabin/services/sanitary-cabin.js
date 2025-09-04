'use strict';

/**
 * sanitary-cabin service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sanitary-cabin.sanitary-cabin');
