import vuetify from "vite-plugin-vuetify";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: ["vuetify/lib/styles/main.sass", "~/assets/scss/styles.scss"],
    build: {
		transpile: ["vuetify"],
	},
	/* vue: {
    	compilerOptions: {
      		isCustomElement: (tag) => ['silent-box'].includes(tag),
		},
	}, */
	vite: {
		ssr: {
			noExternal: ["vuetify"],
		},
		define: {
			"process.env.DEBUG": false,
		},
		css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/scss/_variables.scss";',
                },
            },
        },

	},
    modules: [
        /* Treeshaking: https://next.vuetifyjs.com/en/features/treeshaking/ */
        async (options, nuxt) => {
			// @ts-ignore
			nuxt.hooks.hook("vite:extendConfig", (config) => config.plugins.push(vuetify()));
		},
        "@pinia/nuxt",
        "@nuxtjs/i18n",
		'@nuxtjs/strapi',
    ],
	runtimeConfig: {
		public: {
			strapi: {
				url: process.env.STRAPI_URL // can be overridden by NUXT_PUBLIC_STRAPI_URL environment variable
			},
		}
	},
    i18n: {
		 locales: [
			{
				code: 'en',
				name: 'English'
			},
			{
				code: 'sk',
				name: 'Slovensky'
			}
		],  // used in URL path prefix
		strategy: 'prefix_except_default',
	    defaultLocale: 'sk',
        vueI18n: "./i18n.config.ts",
		customRoutes: 'config',
		/* pages: {
			contact: {
				sk: '/kontakt',
				en: '/contact',
			}
		} */
    },
});
