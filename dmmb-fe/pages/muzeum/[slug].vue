<template>
  <section class="main-info text-center">
    <h3>{{ t("museum.title") }}</h3>
  </section>
  <section class="prices">
    <v-container>
      <v-row>
        <v-col cols="12" md="3" v-for="(item, index) in prices">
          <v-card class="mr-0 px-4 py-4" elevation="4" rounded="lg" width="100%">
            <v-card-item>
              <div>
                <div class="text-h5 font-weight-bold">{{ item.title }}</div>
                <div class="text-caption mb-4">{{ item.desc }}</div>
                <div class="text-h2 font-weight-bold text-warning">{{ item.price }}&euro;</div>
              </div>
            </v-card-item>

            <v-card-actions class="d-flex justify-end">
              <v-btn color="warning" variant="outlined" block> Vybrať </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
import type { Categories } from "~/types";
const emit = defineEmits(["title"]);
import { useIndexStore } from "@/stores/";
const store = useIndexStore();
definePageMeta({
  middleware: "auth",
});
useHead({
  script: [{ src: "https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/latest/js-cloudimage-360-view.min.js" }],
});

const isVisible: Ref<boolean> = ref(false);

const onShow = () => {
  isVisible.value = true;
};

const onHide = () => {
  isVisible.value = false;
};

onMounted(() => {
  store.setTitle(t("home.title"));
  console.log(store.title);
});
</script>
<style scoped lang="scss"></style>
