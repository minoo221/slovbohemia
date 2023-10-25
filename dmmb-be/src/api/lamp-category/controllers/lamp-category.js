'use strict';

/**
 * lamp-category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::lamp-category.lamp-category', ({strapi}) => ({

	async findOne(ctx) {
		const {id} = ctx.params;
		const result = await strapi.db.query('api::lamp-category.lamp-category').findOne({
			where: {slug: id},
			populate: {
				subcategories: true
			}
		})
		const sanitizedResults = await this.sanitizeOutput(result, ctx);

		return this.transformResponse(sanitizedResults);
	},
}));
