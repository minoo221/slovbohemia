'use strict';

/**
 * lamp controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::lamp.lamp', ({strapi}) => ({

	async findOne(ctx) {
		const {id} = ctx.params;
		const result = await strapi.db.query('api::lamp.lamp').findOne({
			where: {slug: id}
		})
		const sanitizedResults = await this.sanitizeOutput(result, ctx);

		return this.transformResponse(sanitizedResults);
	},

	/* async find(ctx) {
        const {id} = ctx.params;
		console.log(ctx.query);

        const entity = await strapi.entityService.findMany('api::lamp.lamp', {
            where: {
				lamp_category: {
					title: {
						$eq: 'Category 4'
					},
				}
          },
		  start: 1,
		  limit: 1,
        });
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);

    } */

	async create(ctx) {
		// some logic here
		const response = await super.create(ctx);
		// some more logic
		console.log("create");
		return response;
}

}));
