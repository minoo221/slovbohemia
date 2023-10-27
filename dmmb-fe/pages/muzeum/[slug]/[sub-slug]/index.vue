<template>
  <section class="main-info text-center">
    <h2 class="mb-4"></h2>
  </section>
  <section class="museum-detail">
    <v-container>
      <v-row> </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const emit = defineEmits(["title"]);
import { useIndexStore } from "@/stores/";
const store = useIndexStore();
const route = useRoute();

/* definePageMeta({
  middleware: "auth",
}); */
useHead({
  script: [{ src: "https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/latest/js-cloudimage-360-view.min.js" }],
});

const isVisible: Ref<boolean> = ref(false);
const filter: Ref<string> = ref("");
const loading: Ref<boolean> = ref(false);
const page: Ref<number> = ref(1);

const { find, findOne } = useStrapi();

const { data: museum, refresh: refreshPrices } = await useAsyncData("lamps", () =>
  find<any>("lamps", {
    populate: "*",
    filters: {
      lamp_categories: {
        slug: route.params.slug,
      },
    },
  })
);

const { data: subCategories, refresh: refreshCategories } = await useAsyncData("lamp-categories", () =>
  findOne<any>("lamp-categories", route.params.slug)
);

const onShow = () => {
  isVisible.value = true;
};

const onHide = () => {
  isVisible.value = false;
};

const getMedia = (media: string) => {
  return useStrapiMedia(media);
};

const getArticles = async () => {
  loading.value = true;
  try {
    if (filter.value == "") {
      const { data: museum, refresh: refreshPrices } = await useAsyncData("lamps", () =>
        find<any>("lamps", {
          populate: "*",
          filters: {
            lamp_categories: {
              slug: route.params.slug,
            },
          },
          pagination: {
            page: page.value,
            pageSize: 2,
          },
        })
      );
    } else {
      const { data: museum, refresh: refreshPrices } = await useAsyncData("lamps", () =>
        find<any>("lamps", {
          populate: "*",
          filters: {
            lamp_categories: {
              slug: route.params.slug,
            },
            subcategories: {
              slug: filter.value,
            },
          },
          pagination: {
            page: page.value,
            pageSize: 2,
          },
        })
      );
    }
  } catch (e) {
    console.log(e);
    store.showError(t("login.form.responses.error"));
  } finally {
    loading.value = false;
  }
};

const resetFilter = () => {
  filter.value = "";
  getArticles();
};

onMounted(() => {
  store.setTitle(t("home.title"));
  console.log(store.title);
  getArticles();
  console.log("route", route.name);
  console.log("subcategories", subCategories.value);
});
</script>
<style scoped lang="scss">
.museum {
  .v-container {
    max-width: 1120px;
  }
  .articles-museum {
    position: relative;
    max-width: 860px;
    margin: 0 auto;

    &--with-filter {
      max-width: 100%;
    }
  }
}
</style>
