<template>
  <PartialsBanner :data="banner" />

  <section class="about-us">
    <v-container>
      <v-row>
        <v-col cols="12" md="5">
          <h2 class="h1">{{ about?.data.attributes?.title }}</h2>
          <p class="mb-8">
            {{ about?.data.attributes?.aboutUsText }}
          </p>
          <v-btn
              color="secondary"
              class="mr-4 mb-4 mb-sm-0"
              link
              :to="localePath('ponuka')"
          >
            Zistiť viac
          </v-btn>
          <v-btn
              color="primary"
              class="mr-4 mb-4 mb-sm-0"
              link
              :to="localePath('kontakt')"
          >
            Kontaktujte nás
          </v-btn>
        </v-col>

        <v-col cols="12" md="6" offset-lg="1">
          <v-row>
            <v-col
                v-for="(image, index) in galleryImages.slice(0, 3)"
                :key="image.id"
                cols="12"
                :md="index === 2 ? '12' : '6'"
            >
              <v-img
                  :src="image.smallImg"
                  width="100%"
                  height="200px"
                  cover
                  @click="showGallery(index)"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <client-only>
      <vue-easy-lightbox
          :visible="isVisible"
          :imgs="images"
          :index="imgIndex"
          @hide="onHide"
      />
    </client-only>
  </section>
</template>

<script setup lang="ts">
import { useIndexStore } from "@/stores/";
import type { StrapiData, About } from "@/types/strapi";
import type { Banner, GalleryImage } from "@/types/index";

// --- Composables ---
const { t } = useI18n();
const localePath = useLocalePath();
const store = useIndexStore();
const url = useStrapiUrl();

// --- State ---
const isVisible = ref(false);
const imgIndex = ref(0);
const images = ref<{ src: string; text: number }[]>([]);

// --- Banner ---
const banner: Ref<Banner> = ref({
  title: "O nás",
  desc: "Štýlové riešenia pre vaše priestory. Šatňové skrinky, sanitárne kabínky a posuvné steny od nás vám prinášajú spoľahlivosť a eleganciu v každom kroku.",
  btns: [{ title: "Kontaktovať", link: localePath("/kontakt"), color: "primary" }],
  slides: [{ img: "/images/offer-1.jpg" }],
  maxWidth: "920px",
});

// --- API volanie ---
const { data: about } = await useFetch<StrapiData<About>>(url + "/about", {
  query: { populate: "*" },
});

// --- SEO Meta ---
useServerSeoMeta({
  ogTitle: "Slovbohemia systems",
  title: "Slovbohemia systems | O nás",
  description:
      "Vitajte na stránkach firmy Slovbohemia Systems, ktorá sa zaoberá dodávaním a montážou posuvných stien, sanitárnych kabín a šatňových skriniek.",
  ogImage: "/images/offer-2.jpg",
  twitterCard: "summary_large_image",
  twitterTitle: "Slovbohemia systems",
  twitterDescription:
      "Slovbohemia Systems, firma zaoberajúca sa dodávaním a montážou posuvných stien, sanitárnych kabín a šatňových skriniek.",
  twitterImage: "/images/offer-2.jpg",
});

// --- Computed ---
const galleryImages = computed<GalleryImage[]>(() => {
  return (
      about.value?.data.attributes.gallery.data.map((obj) => ({
        id: obj.id,
        smallImg: obj.attributes.formats.small?.url
            ? store.getMediaUrl(obj.attributes.formats.small.url)
            : store.getMediaUrl(obj.attributes.url),
        largeImg: store.getMediaUrl(obj.attributes.url),
      })) || []
  );
});

// --- Methods ---
const onShow = () => (isVisible.value = true);
const onHide = () => (isVisible.value = false);

function showGallery(index: number) {
  images.value = galleryImages.value.map((obj) => ({
    src: obj.largeImg,
    text: obj.id,
  }));
  imgIndex.value = index;
  onShow();
}

onMounted(() => {
  store.setTitle(t("about.title"));
});
</script>

<style scoped lang="scss">
.about-us {
  padding: 80px 0 60px 0;

  .v-img {
    border-radius: 32px;
    cursor: pointer;
  }

  h2 {
    font-size: 56px;
    margin-bottom: 20px;

    @media (max-width: 960px) {
      font-size: 38px;
    }
  }

  p {
    font-size: 22px;
    line-height: 27px;
    margin-bottom: 39px;

    @media (max-width: 960px) {
      font-size: 18px;
    }
  }
}
</style>
