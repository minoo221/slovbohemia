<template>
  <section class="main-info text-center">
    <h2 class="mb-4">{{ t("museum.insight") }}</h2>
  </section>
  <section class="museum">
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <div class="articles-museum">
            <v-row>
              <v-col cols="12" v-for="insightMuseum in museum?.data" class="mb-4">
                <v-card elevation="0" color="transparent">
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-img
                        class="text-left align-end rounded-md"
                        :src="store.getMediaUrl(insightMuseum?.attributes.coverImg.data?.attributes.url)"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        height="250px"
                        contain
                      >
                        <template v-slot:placeholder>
                          <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </v-col>
                    <v-col md="8">
                      <v-card-title class="text-left" v-text="insightMuseum?.attributes.title"></v-card-title>

                      <v-card-text>
                        <p class="mb-4" v-if="insightMuseum?.attributes.summaryText">
                          {{ insightMuseum?.attributes.summaryText }}
                        </p>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          class="mx-2"
                          color="warning"
                          link
                          nuxt
                          :href="localePath({ name: 'nahladSlug', params: { nahladSlug: insightMuseum.attributes.slug } })"
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

const isVisible: Ref<boolean> = ref(false);
const filter: Ref<string> = ref("");
const loading: Ref<boolean> = ref(false);
const page: Ref<number> = ref(1);
const search: Ref<string> = ref("");

const { find, findOne } = useStrapi();

const { data: subCategories, refresh: refreshCategories } = await useAsyncData("lamp-categories", () =>
  findOne<any>("lamp-categories", route.params.slug, { locale: locale.value })
);

const { data: museum, refresh: refreshPrices } = await useAsyncData("lamps", () =>
  find<any>("lamps", {
    locale: locale.value,
    populate: "*",
    pagination: {
      page: 1,
      pageSize: 4,
    },
    filters: {
      lamp_categories: {
        slug: {
          $eq: route.path.substring(1),
        },
      },
    },
  })
);

useHead({
  title: t("museum.insight"),
  meta: [{ name: t("museum.insight") }],
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

onMounted(async () => {
  store.setTitle(t("museum.insight"));
  console.log("museum", museum.value);
  console.log("subcategories", subCategories.value);
  console.log("route", route.path.substring(1));
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
