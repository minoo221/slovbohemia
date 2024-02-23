<template>
  <v-app>
    <v-container v-if="loading" class="d-flex justify-center py-16">
      <PartialsLoader color="grey"></PartialsLoader>
    </v-container>
    <div v-show="!loading">
      <Suspense>
        <NuxtLayout>
          <NuxtLoadingIndicator color="#f2c514" :height="7" />
          <NuxtPage />
        </NuxtLayout>
      </Suspense>
    </div>
  </v-app>
</template>
<script setup lang="ts">
const nuxtApp = useNuxtApp();
const loading: Ref<boolean> = ref(false);

addRouteMiddleware(
  "global-loader",
  () => {
    loading.value = true;
  },
  {
    global: true,
  }
);
nuxtApp.hook("page:finish", () => {
  setTimeout(() => (loading.value = false), 1000); // timeout kvoli animacii
});
</script>
