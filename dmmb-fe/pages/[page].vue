<template>
  <div>
    <section class="page-detail">
      <v-container>
        <div class="text">
          <v-container>
            <v-card>
              <v-card-title class="h2 px-8 py-8">
                {{ page?.data.attributes.title }}
              </v-card-title>
              <v-card-text class="px-8">
                <client-only>
                  <p v-html="page?.data.attributes.text"></p>
                </client-only>
              </v-card-text>
            </v-card>
          </v-container>
        </div>
      </v-container>
      <client-only>
        <vue-easy-lightbox :visible="isVisible" :imgs="images" :index="imgIndex" @hide="onHide"></vue-easy-lightbox>
      </client-only>
    </section>
  </div>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const emit = defineEmits(["title"]);
import { useIndexStore } from "@/stores/";
const store = useIndexStore();
const route = useRoute();

const isVisible: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(false);
const rotateGallery: Ref<any> = ref(null);
const swiperHeight: Ref<number> = ref(0);
const imgIndex: Ref<number> = ref(0);
const images: Ref<any> = ref([]);

const { find, findOne } = useStrapi();

const { data: page, refresh: refreshPage } = await useAsyncData("pages", () => findOne<any>("pages", route.params.page), {
  locale: locale.value,
});

useHead({
  title: page.value?.data.attributes.title,
  script: [{ src: "https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/latest/js-cloudimage-360-view.min.js" }],
});

/* definePageMeta({
  name: "test2",
}); */

const onShow = () => {
  isVisible.value = true;
};

const onHide = () => {
  isVisible.value = false;
};

onMounted(async () => {
  console.log(store.title);
  console.log("route", route);
  console.log("pages", page.value);
});
</script>
<style scoped lang="scss">
.page-detail {
  .v-container {
    max-width: 1120px;
  }

  .v-card {
    &:deep {
      ul,
      ol {
        padding-left: 15px;
        li {
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>
