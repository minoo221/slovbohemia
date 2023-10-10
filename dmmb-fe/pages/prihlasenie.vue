<template>
  <section class="login">
    <v-container>
      <div class="login-cover">
        <v-form ref="form" @submit.prevent="sendForm()">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formData.username"
                :label="t('login.form.username')"
                variant="solo"
                required
                :rules="[(v) => !!v || t('register.form.rules.required')]"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="formData.password"
                :label="t('login.form.password')"
                variant="solo"
                required
                type="password"
                :rules="[(value) => !!value || t('register.form.rules.required')]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="ml-auto d-flex">
              <v-btn
                type="submit"
                append-icon="mdi-send"
                class="mt-2 ml-auto"
                :loading="loadingSend"
                :disabled="loadingSend"
                color="primary"
                >{{ t("login.form.loginBtn") }}</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
import type { Categories } from "~/types";
const emit = defineEmits(["title"]);
import { useIndexStore } from "@/stores/";
const store = useIndexStore();
useHead({
  script: [{ src: "https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/latest/js-cloudimage-360-view.min.js" }],
});

const formData: any = reactive({});
const form: Ref<any> = ref(null);
const loadingSend: Ref<boolean> = ref(false);

const user = useStrapiUser();

const { create, find } = useStrapi();
const { login } = useStrapiAuth();

const sendForm = async () => {
  const { valid } = await form.value.validate();
  console.log(valid);
  console.log(form.value);

  if (valid) {
    loadingSend.value = true;
    try {
      await login({
        identifier: formData.username,
        password: formData.password,
      });
      store.showSuccess(t("login.form.responses.success"));
      await form.value.reset();
    } catch (e) {
      console.log(e);
      store.showError(t("login.form.responses.error"));
    } finally {
      loadingSend.value = false;
    }
  }
};

onMounted(() => {
  store.setTitle(t("login.title"));
  console.log(store.title);
  console.log("user", user.value);
});
</script>
<style scoped lang="scss">
.login {
  .login-cover {
    max-width: 640px;
    margin: 0 auto;
  }
}
</style>
