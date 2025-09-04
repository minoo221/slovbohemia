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
	app: {
        head: {
            htmlAttrs: { lang: 'sk' },
			link: [{ rel: 'icon', type: 'image/png', href: "/favicon.png" }]
        },
    },
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
		'nuxt-swiper',
		'@dargmuesli/nuxt-cookie-control',
		'@nuxtjs/google-fonts',
		'@vite-pwa/nuxt',
		'dayjs-nuxt',
    ],
	runtimeConfig: {
		public: {
			strapi: {
				url: process.env.NODE_ENV == 'development' ? process.env.STRAPI_URL : 'https://api.slovbohemia.sk', // can be overridden by NUXT_PUBLIC_STRAPI_URL environment variable
				populate: ['role'],
			},
			googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
			env: process.env.NODE_ENV
		}
	},
	cookieControl: {
		colors: {
			barBackground: '#ffffff',
			checkboxActiveBackground: '#00A34A', // text-green-600
			barButtonBackground: '#FB923C',
			barButtonColor: '#ffffff',
			barTextColor: "#000000",
			modalBackground: '#ffffff',
			modalButtonBackground: '#FB923C',
			modalButtonColor: '#ffffff',
			modalTextColor: '#000000',
		},
		closeModalOnClickOutside: true,
		cookies: {
			necessary: [
				{
				description:
					"Tieto súbory cookie sú nevyhnutné na to, aby sme vám mohli poskytovať služby dostupné prostredníctvom našej webovej stránky a aby ste mohli používať určité funkcie našej webovej stránky. Bez týchto súborov cookie vám nemôžeme poskytnúť určité služby na našom webe.",
				name:
					'Nevyhnutne potrebné cookies',
				targetCookieIds: ['NEC'],
				links: {
					'https://www.penzion-harmonia.sk/sukromie/ochrana-osobnych': 'Ochrana osobných údajov',
					'https://www.penzion-harmonia.sk/sukromie/cookies': 'Cookies',
				},
        	},
      ],
    },
	isCookieIdVisible: true,
	isIframeBlocked: true,
	locales: ['sk'],
  },

  googleFonts: {
    // Options
	families: {
		Roboto: {
			wght: [ 400, 500, 700],
		},
		'Noto+Sans': {
			wght: [ 300, 400, 700],
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
			},
			{
				code: 'de',
				name: 'Deutsch'
			}
		],  // used in URL path prefix
		strategy: 'prefix_except_default',
	    defaultLocale: 'sk',
        vueI18n: "./i18n.config.ts",
		customRoutes: 'config',
		detectBrowserLanguage: false,
		pages: {
			/* nahlad: {
				sk: '/nahlad', // -> accessible at /about-us (no prefix since it's the default locale)
				en: '/insight', // -> accessible at /fr/a-propos
				de: '/ansicht'     // -> accessible at /es/sobre
			}, */
			'nahlad/index': {
				sk: '/nahlad', // -> accessible at /about-us (no prefix since it's the default locale)
				en: '/insight', // -> accessible at /fr/a-propos
				de: '/ansicht'     // -> accessible at /es/sobre
			}
		}
		/* pages: {
			contact: {
				sk: '/kontakt',
				en: '/contact',
			}
		} */
    },
	strapi: {
		auth: {
			populate: ['role']
		}
	},
});
