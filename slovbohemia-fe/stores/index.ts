import { defineStore } from "pinia";


/* const config = useRuntimeConfig(); */

interface State {
  title: string | null
  snackbar: any;
}

export const useIndexStore = defineStore("index", {
    state: (): State => {
        return {
            title: null,
            snackbar: {
                text: null,
                color: null,
                visible: false,
            },
        };
    },

    getters: {

    },

    actions: {
        setTitle(val: string) {
            this.title = val
        },
        showInfo(text: string) {
            this.snackbar = { text, color: "info", visible: true };
        },
        showSuccess(text: string) {
            this.snackbar = { text, color: "success", visible: true };
        },
        showWarning(text: string) {
            this.snackbar = { text, color: "warning", visible: true };
        },
        showError(text: string) {
            this.snackbar = { text, color: "error", visible: true };
        },
        getMediaUrl(url: string) {
            const ENV = useRuntimeConfig().public.env;
            const STRAPI_URL = useRuntimeConfig().public.strapi.url;
            if(ENV == 'development') {
                return 'http://194.163.176.146:1337' + url
            } else {
                return STRAPI_URL + url
            }
        },
    },
});
