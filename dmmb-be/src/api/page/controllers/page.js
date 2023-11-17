'use strict';

/**
 * page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::page.page', ({strapi}) => ({

	async findOne(ctx) {
		const {id} = ctx.params;
		const result = await strapi.db.query('api::page.page').findOne({
			where: {slug: id},
		})
		const sanitizedResults = await this.sanitizeOutput(result, ctx);

		return this.transformResponse(sanitizedResults);
	},
}));
