import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { MAIN_THEME, mainTheme, MAIN_DARK_THEME, mainDarkTheme } from "@/helpers/themes";

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        ssr: true,
        components,
        directives,
        theme: {
			defaultTheme: MAIN_THEME,
			themes: {
				mainTheme,
				mainDarkTheme,
			},
			// add color variations
			variations: {
				colors: ["primary", "secondary"],
				lighten: 3,
				darken: 3,
			},
		},
    });

    nuxtApp.vueApp.use(vuetify);

    if (!process.server) console.log("❤️ Initialized Vuetify 3", vuetify);
});
