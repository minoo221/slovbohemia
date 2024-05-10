'use strict';

/**
 * sanitary-cabin controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::sanitary-cabin.sanitary-cabin', ({strapi}) => ({

	async findOne(ctx) {
		const {id} = ctx.params;
		const result = await strapi.db.query('api::sanitary-cabin.sanitary-cabin').findOne({
			where: {slug: id},
			populate: {
				gallery: true,
				parameters: true,
				colors: true,
				standartFittings: true,
				stainlessSteelFittings: true,
				mainImg: true,
			}
		})
		const sanitizedResults = await this.sanitizeOutput(result, ctx);

		return this.transformResponse(sanitizedResults);
	},
}));
