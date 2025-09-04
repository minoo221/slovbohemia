'use strict';

/**
 * wardrobe service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wardrobe.wardrobe');
