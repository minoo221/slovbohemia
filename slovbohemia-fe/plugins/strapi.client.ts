import type { Strapi4Error } from '@nuxtjs/strapi/dist/runtime/types/v4'
export default defineNuxtPlugin((nuxt) => {
  nuxt.hook('strapi:error' as any, (e: Strapi4Error) => {
	console.log(e);

  })
})