<template>
  <v-container>
    <div class="text-center">
      <h2 class="mb-4">{{ t("pay.success") }}</h2>
      <v-btn color="primary">{{ t("pay.redirect") }}</v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const emit = defineEmits(["title"]);
import { useIndexStore } from "@/stores/";
const store = useIndexStore();
const route = useRoute();

const client = useStrapiClient();
const user = useStrapiUser();

onMounted(async () => {
  store.setTitle(t("pay.title"));
  console.log(store.title);
  try {
    const link = await client<any>("/stripe/session/" + route.query.session_id, {
      method: "GET",
    });
  } catch (e) {
    console.log(e);
    store.showError(t("login.form.responses.error"));
  }
  console.log("route", route.query);
});
</script>

<style scoped></style>
