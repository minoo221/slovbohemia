import { defineStore } from "pinia";

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
    },
});
