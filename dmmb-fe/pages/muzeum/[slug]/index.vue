<template>
  <section class="main-info text-center">
    <h2 class="mb-4">{{ subCategories?.data.attributes.title }}</h2>
  </section>
  <section class="museum">
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <h3 class="ml-2 mb-4">Filter:</h3>
          <v-radio-group v-model="currentFilter">
            <v-radio
              v-for="item in subCategories?.data.attributes.subcategories.data"
              :label="item.attributes.title"
              :value="item.attributes.slug"
              v-if="subCategories?.data.attributes.subcategories.data.length > 0"
            ></v-radio>
          </v-radio-group>
          <v-form @submit.prevent="filterTitle()">
            <v-text-field
              :loading="loading"
              v-model="search"
              density="compact"
              variant="solo"
              :label="t('museum.search')"
              append-inner-icon="mdi-magnify"
              single-line
              hide-details
              class="mb-4"
              @click:append-inner="filterTitle()"
            ></v-text-field>
            <input type="submit" hidden />
          </v-form>
          <v-btn class="ml-auto" color="error" variant="text" size="small" @click="resetFilter()">
            {{ t("museum.resetFilter") }}
          </v-btn>
        </v-col>
        <v-col cols="12" md="9">
          <div
            class="articles-museum"
            :class="{ 'articles-museum--with-filter': subCategories?.data.attributes.subcategories.data.length > 0 }"
          >
            <v-overlay v-model="loading" contained class="align-center justify-center" scrim="white">
              <v-progress-circular color="warning" indeterminate size="64"></v-progress-circular>
            </v-overlay>
            <v-row>
              <v-col cols="12" v-for="(item, index) in museum?.data" class="mb-4">
                <v-card elevation="0" color="transparent">
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-img
                        class="text-left align-end rounded-md"
                        :src="store.getMediaUrl(item.attributes.coverImg.data?.attributes.url)"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        height="250px"
                        cover
                      >
                        <template v-slot:placeholder>
                          <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </v-col>
                    <v-col md="8">
                      <v-card-title class="text-left" v-text="item.attributes.title"></v-card-title>

                      <v-card-text>
                        <p class="mb-4" v-if="item.attributes.summaryText">{{ item.attributes.summaryText }}</p>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          class="mx-2"
                          color="warning"
                          link
                          :to="localePath({ name: 'muzeum-slug-subslug', params: { subslug: item.attributes.slug } })"
                          variant="text"
                          append-icon="mdi-arrow-right"
                        >
                          {{ t("museum.showMore") }}
                        </v-btn>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
            <v-pagination
              v-model="currentPage"
              class="my-4"
              :length="museum.meta?.pagination.pageCount"
              :total-visible="4"
            ></v-pagination>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const emit = defineEmits(["title"]);
import { useIndexStore } from "@/stores/";
const store = useIndexStore();
const route = useRoute();
const config = useRuntimeConfig();
const router = useRouter();

definePageMeta({
  middleware: "auth",
});

const isVisible: Ref<boolean> = ref(false);
const filter: Ref<string> = ref("");
const loading: Ref<boolean> = ref(false);
const page: Ref<number> = ref(1);
const search: Ref<string> = ref("");

const { find, findOne } = useStrapi();

const museum: Ref<any> = ref([]);

const { data: subCategories, refresh: refreshCategories } = await useAsyncData("lamp-categories", () =>
  findOne<any>("lamp-categories", route.params.slug, { locale: locale.value })
);

useHead({
  title: subCategories.value?.data.attributes.title,
  meta: [{ name: subCategories.value?.data.attributes.title }],
  script: [{ src: "https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/latest/js-cloudimage-360-view.min.js" }],
});

const onShow = () => {
  isVisible.value = true;
};

const onHide = () => {
  isVisible.value = false;
};

const getMedia = (media: string) => {
  return useStrapiMedia(media);
};

const currentPage = computed({
  // getter
  get() {
    return Number(route.query.page) || 1;
  },
  set(newPage) {
    // You could alternatively call your API here if you have serverside pagination

    router.push({ query: { ...route.query, page: newPage } }).catch(() => {});
  },
});

const currentFilter = computed({
  // getter
  get() {
    return route.query.filter || null;
  },
  set(newFilter) {
    // You could alternatively call your API here if you have serverside pagination

    router.push({ query: { ...route.query, filter: newFilter } }).catch(() => {});
  },
});

const filterTitle = () => {
  router.push({ query: { ...route.query, searchTitle: search.value } }).catch(() => {});
  getArticles();
};

const filterMuseum = () => {
  router.push({ query: { ...route.query, page: 1 } }).catch(() => {});
  getArticles();
};

const getArticles = async () => {
  loading.value = true;
  console.log("tu som v metode");

  try {
    /* if (filter.value == "") { */
    const response = await find<any>("lamps", {
      pagination: {
        page: currentPage.value,
        pageSize: 10,
      },
      populate: "*",
      locale: locale.value,
      filters:
        subCategories.value?.data.attributes.subcategories.data.length > 0
          ? {
              title: {
                $contains: search.value,
              },
              lamp_categories: {
                slug: route.params.slug,
              },
              subcategories: {
                slug: {
                  $contains: currentFilter.value,
                },
              },
            }
          : {
              title: {
                $contains: search.value,
              },
              lamp_categories: {
                slug: route.params.slug,
              },
            },
    });
    museum.value = response;

    /* } else {
      const { data: museumData, refresh: refreshPrices } = await useAsyncData("lamps", () =>
        find<any>("lamps", {
          populate: "*",
          pagination: {
            page: page.value,
            pageSize: 6,
          },
          filters: {
            lamp_categories: {
              slug: route.params.slug,
            },
            subcategories: {
              slug: filter.value,
            },
          },
        })
      );
      museum.value = museumData.value;
    } */
  } catch (e) {
    console.log(e);
    store.showError(t("login.form.responses.error"));
  } finally {
    loading.value = false;
  }
};

const resetFilter = () => {
  router.push({ query: { ...route.query, page: 1 } }).catch(() => {});
  currentPage.value = 1;
  currentFilter.value = null;
  search.value = "";
  router.replace({ query: {} });
};

watch(currentPage, (newPage) => {
  getArticles();
});

watch(currentFilter, (newFilter) => {
  router.push({ query: { ...route.query, page: 1 } }).catch(() => {});
  getArticles();
});

onMounted(async () => {
  store.setTitle(subCategories.value?.data.attributes.title);
  console.log(store.title);
  search.value = route.query?.searchTitle ? route.query?.searchTitle : "";
  await getArticles();
  console.log("museum", museum.value);
  console.log("subcategories", subCategories.value);
  console.log("route", route.params.slug);
  console.log("env", config.public.env);
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
    min-height: 280px;

    &--with-filter {
      max-width: 100%;
    }

    .v-card {
      .v-btn {
        position: absolute;
        bottom: 5px;
        right: 5px;
      }
    }
  }
}
</style>
