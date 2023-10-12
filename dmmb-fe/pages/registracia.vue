<template>
  <section class="register">
    <v-container>
      <div class="register-cover">
        <v-form ref="form" @submit.prevent="sendForm()">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="formData.username"
                :label="t('register.form.username')"
                variant="solo"
                class="input-required"
                required
                :rules="[(v) => !!v || t('register.form.rules.required')]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="formData.email"
                :label="t('register.form.email')"
                variant="solo"
                class="input-required"
                required
                :rules="[
                  (v) => !!v || t('register.form.rules.required'),
                  (v) => /.+@.+\..+/.test(v) || t('register.form.rules.email'),
                ]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="formData.password"
                :label="t('register.form.password')"
                variant="solo"
                class="input-required"
                required
                type="password"
                :rules="[
                  (v) => v?.length >= 6 || t('register.form.rules.minLength'),
                  (value) => !!value || t('register.form.rules.required'),
                  passwordConfirmationRule,
                ]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="formData.rePassword"
                :label="t('register.form.rePassword')"
                variant="solo"
                class="input-required"
                required
                type="password"
                :rules="[
                  (v) => v?.length >= 6 || t('register.form.rules.minLength'),
                  (value) => !!value || t('register.form.rules.required'),
                  passwordConfirmationRule,
                ]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="formData.tel" :label="t('register.form.tel')" variant="solo"></v-text-field>
            </v-col>
            <v-col cols="12" class="pb-0">
              <v-checkbox
                v-model="formData.newsletter"
                :label="t('register.form.newsletter')"
                color="primary"
                density="compact"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col cols="12">
              <v-checkbox
                v-model="formData.agree"
                :label="t('register.form.agree')"
                color="primary"
                value="agree"
                density="compact"
                required
                class="input-required"
                :rules="[(v) => !!v || t('register.form.rules.requiredAgree')]"
              ></v-checkbox>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" md="3" class="ml-auto d-flex">
              <v-btn
                type="submit"
                append-icon="mdi-send"
                class="mt-2 ml-auto"
                :loading="loadingSend"
                :disabled="loadingSend"
                color="primary"
                >{{ t("register.form.registerBtn") }}</v-btn
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

const passwordConfirmationRule = computed(() => formData.password === formData.rePassword || "Password must match");

const user = useStrapiUser();

const { create, find } = useStrapi();
const { register } = useStrapiAuth();

const sendForm = async () => {
  const { valid } = await form.value.validate();
  console.log(valid);
  console.log(form.value);

  if (valid) {
    loadingSend.value = true;
    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.tel,
        newsletter: formData.newsletter,
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
  store.setTitle(t("register.title"));
  console.log(store.title);
  console.log("user", user);
});
</script>
<style scoped lang="scss">
.register {
  .register-cover {
    max-width: 890px;
    margin: 0 auto;
  }
}
</style>
