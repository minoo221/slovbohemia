<template>
  <PartialsBanner :data="banner"></PartialsBanner>
  <section class="about-us">
    <v-container>
      <v-row>
        <v-col cols="12" md="5">
          <h2 class="h1">{{ about?.data.attributes?.title }}</h2>
          <p class="mb-8">
            {{ about?.data.attributes?.aboutUsText }}
          </p>
          <v-btn color="secondary" class="mr-4" link :to="localePath('ponuka')"> Zistiť viac </v-btn>
          <v-btn color="primary" link :to="localePath('kontakt')"> Kontaktujte nás </v-btn>
        </v-col>
        <v-col cols="12" md="6" offset-lg="1" class="d-flex align-center">
          <v-row>
            <v-col v-for="(image, index) in galleryImages.slice(0, 3)" cols="12" :md="index === 2 ? '12' : '6'">
              <v-img :src="image.smallImg" width="100%" height="200px" cover @click="showGallery(index)"></v-img>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <client-only>
      <vue-easy-lightbox :visible="isVisible" :imgs="images" :index="imgIndex" @hide="onHide"></vue-easy-lightbox>
    </client-only>
  </section>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const emit = defineEmits(["title"]);
const localePath = useLocalePath();

import { useIndexStore } from "@/stores/";
const store = useIndexStore();
const url = useStrapiUrl();

const isVisible: Ref<boolean> = ref(false);
const imgIndex: Ref<number> = ref(0);
const images: Ref<any> = ref([]);

useServerSeoMeta({
  ogTitle: () => "Slovbohemia systems",
  title: () => "Slovbohemia systems | O nás",
  description: () =>
    "Vitajte na stránkach firmy Slovbohemia Systems, ktorá sa zaoberá dodávaním a montážou posuvných stien, sanitárnych kabín a šatňových skriniek. Prezrite si našu ponuku a v prípade akýchkoľvek otázok nás neváhajte kontaktovať",
  ogDescription: () =>
    "Slvebohemia Systems, firma zaoberajúca sa dodávaním a montážou posuvných stien, sanitárnych kabín a šatňových skriniek. Prezrite si našu ponuku a v prípade akýchkoľvek otázok nás neváhajte kontaktovať",
  ogImage: () => "/images/offer-2.jpg",
  ogImageUrl: () => "/images/offer-2.jpg",
  twitterCard: () => "summary_large_image",
  twitterTitle: () => "Slovbohemia systems",
  twitterDescription: () =>
    "Slovbohemia Systems, firma zaoberajúca sa dodávaním a montážou posuvných stien, sanitárnych kabín a šatňových skriniek. Prezrite si našu ponuku a v prípade akýchkoľvek otázok nás neváhajte kontaktovať",
  twitterImage: () => "/images/offer-2.jpg",
});

const banner: Ref<any> = ref({
  title: "O nás",
  desc: "Štýlové riešenia pre vaše priestory. Šatňové skrinky, sanitárne kabínky a posuvné steny od nás vám prinášajú spoľahlivosť a eleganciu v každom kroku.",
  btns: [{ title: "Kontaktovať", link: localePath("/kontakt"), color: "primary" }],
  slides: [{ img: "/images/offer-1.jpg" }],
  maxWidth: "920px",
});

const {
  data: about,
  pending,
  error,
  refresh,
} = await useFetch(url + "/about", {
  query: { populate: "*" },
});

const onShow = () => {
  isVisible.value = true;
};

const onHide = () => {
  isVisible.value = false;
};
const galleryImages = computed(() => {
  return (about?.value?.data.attributes.gallery.data || []).map((obj: any) => {
    /* console.log(obj); */
    /* return obj.id; */
    return {
      id: obj.id,
      smallImg: obj.attributes.formats.small.url
        ? store.getMediaUrl(obj.attributes.formats.small.url)
        : store.getMediaUrl(obj.attributes.url),
      largeImg: store.getMediaUrl(obj.attributes.url),
    };
  });
});

function showGallery(index: number) {
  /* images.value = apartments[index].value.gallery; */

  const result = galleryImages.value.map((obj: any) => {
    console.log(obj);

    return {
      text: obj.id,
      src: obj.largeImg,
    };
  });

  images.value = result;

  imgIndex.value = index;

  console.log("result", result);
  console.log("index", index);

  onShow();
  /* gallery.silentbox.openOverlay(item, index); */
}

/* const prices: any[] = reactive([
  { title: "1 deň", desc: "Členstvo platí 1 deň od zakúpenia", price: "3" },
  { title: "1 mesiac", desc: "Členstvo platí 1 mesiac od zakúpenia", price: "10" },
  { title: "Polrok", desc: "Členstvo platí 6 mesiacov od zakúpenia", price: "40" },
  { title: "Rok", desc: "Členstvo platí 12 mesiacov od zakúpenia", price: "70" },
]); */

onMounted(async () => {});
</script>
<style scoped lang="scss">
.offer {
  padding: 80px 0 60px 0;
  &__item {
    align-items: center;
    padding: 60px 16px;

    h2 {
      font-size: 56px;
      margin-bottom: 20px;
    }
    p {
      font-size: 22px;
      line-height: 27px;
      margin-bottom: 39px;
    }
    .v-img {
      border-radius: 32px;
    }
    &:nth-of-type(odd) {
      background: $grey-3;
      .v-row {
        flex-direction: row-reverse;
      }
    }
  }
}
</style>
