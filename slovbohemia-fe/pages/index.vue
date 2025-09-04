<template>
  <PartialsBanner :data="banner"></PartialsBanner>
  <section class="offer">
    <div class="text-center mb-0 mb-sm-12">
      <h2 class="h1">Naša ponuka</h2>
    </div>
    <div
        v-for="(item, index) in offerItems"
        :key="item.title"
        class="offer__item"
        :class="{ 'offer__item--reversed': index % 2 === 1 }"
    >
      <v-container>
        <v-row class="align-center">
          <v-col cols="12" md="6">
            <h2>{{ item.title }}</h2>
            <p>{{ item.desc }}</p>
            <v-btn color="secondary" link :to="item.link"> Zistiť viac </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-img :src="item.imgSrc" width="100%" height="400px" cover></v-img>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </section>

  <section class="about-us">
    <v-container>
      <v-row>
        <v-col cols="12" md="5">
          <h2 class="h1">{{ about?.data.attributes?.title }}</h2>
          <p class="mb-8">
            {{ about?.data.attributes?.homeText }}
          </p>
          <v-btn color="secondary" link class="mr-4 mb-4 mb-sm-0" to="/o-nas"> Zistiť viac </v-btn>
          <v-btn color="primary" link class="mr-4 mb-4 mb-sm-0" to="/kontakt"> Kontaktujte nás </v-btn>
        </v-col>
        <v-col cols="12" md="6" offset-lg="1">
          <v-row>
            <v-col v-for="(image, index) in galleryImages.slice(0, 3)" :key="image.id" cols="12" :md="index === 2 ? '12' : '6'">
              <v-img :src="image.smallImg" width="100%" height="200px" cover @click="showGallery(index)"></v-img>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <section class="blog">
    <v-container>
      <div class="blog__title">
        <h2 class="h1">Náš blog</h2>
        <p>Prečítajte si novinky v oblasti sanitárnych kabíniek, šatňových skriniek či posuvných stien.</p>
      </div>
      <v-row class="mb-16">
        <v-col cols="12" md="4" v-for="blog in blogs?.data" :key="blog.id">
          <article>
            <v-img
                :src="store.getMediaUrl(blog.attributes.mainImg.data?.attributes.url)"
                width="100%"
                height="230px"
                cover
                class="mb-4"
            ></v-img>
            <ul class="mb-4">
              <li>{{ blog.attributes.category }}</li>
              <li>{{ $dayjs(blog.attributes.createdAt).format("DD.MM.YYYY") }}</li>
            </ul>
            <h3 class="mb-4">
              <NuxtLink :to="localePath({ name: 'blog-slug', params: { slug: blog.attributes.slug } })">
                {{ blog.attributes.title }}
              </NuxtLink>
            </h3>
            <p>{{ blog.attributes.info }}</p>
          </article>
        </v-col>
      </v-row>
      <div class="text-center">
        <v-btn color="secondary" link class="px-10" to="/blog"> Pozrieť všetky </v-btn>
      </div>
    </v-container>
    <client-only>
      <vue-easy-lightbox :visible="isVisible" :imgs="images" :index="imgIndex" @hide="onHide"></vue-easy-lightbox>
    </client-only>
  </section>
</template>

<script setup lang="ts">
import { useIndexStore } from "@/stores/";
import type { StrapiResponse, StrapiData, Blog, About } from "@/types/strapi";
import type { Banner, OfferItem, GalleryImage } from "@/types/index";


const { t } = useI18n();
const localePath = useLocalePath();
const store = useIndexStore();
const url = useStrapiUrl();
const route = useRoute();

const isVisible = ref(false);
const imgIndex = ref(0);
const images = ref<{ src: string; text: number }[]>([]);

const banner: Ref<Banner> = ref({
  title: "SLOVBOHEMIA",
  desc: "Vitajte na stránkach firmy Slovbohemia Systems, ktorá sa zaoberá dodávaním a montážou posuvných stien, sanitárnych kabín a šatňových skriniek. Prezrite si našu ponuku a v prípade akýchkoľvek otázok nás neváhajte kontaktovať",
  btns: [
    { title: "Pozrieť ponuku", link: localePath("/ponuka"), color: "primary" },
    { title: "Kontaktovať", link: localePath("/kontakt"), color: "secondary" },
  ],
  slides: [{ img: "/images/offer-1.jpg" }, { img: "/images/sanitarne-kabinky.jpg" }, { img: "/images/offer-2.jpg" }],
});

const offerItems: Ref<OfferItem[]> = ref([
  {
    title: "Sanitárne kabíny",
    desc: "Náš systém je postavený na báze dosiek z vysokotlakového laminátu alebo drevotrieskových dosiek a konštrukcie z hliníka alebo nerezu.",
    link: "/sanitarne-kabinky",
    imgSrc: "/images/offer-1.jpg",
  },
  {
    title: "Šatňové skrinky",
    desc: "Naše skrinky sa vyznačujú estetickým vzhľadom a ergonomikou. Sú vyrobené z liateho laminátu HPL v rôznych farbách a vzoroch.",
    link: "/satnove-skrinky",
    imgSrc: "/images/offer-2.jpg",
  },
  {
    title: "Posuvné steny",
    desc: "Systém posuvných stien rýchlym a atraktívnym spôsobom rozdelí veľké sály na menšie časti kedykoľvek v čase rokovania alebo prezentácie.",
    link: "/posuvne-steny",
    imgSrc: "/images/offer-3.jpg",
  },
  {
    title: "Umývadlové dosky",
    desc: "Vysoká životnosť povrchu, odolnosť voči nečistotám a vonkajším faktorom v kombinácii so širokou škálou farieb robia z HPL dosiek základný nástroj pre dizajnérov.",
    link: "/umyvadlove-dosky",
    imgSrc: "/images/offer-4.jpg",
  },
]);

// --- API volania s typmi ---
const [{ data: blogs }, { data: about }] = await Promise.all([
  useFetch<StrapiResponse<Blog>>(url + "/blogs", { query: { populate: "*" } }),
  useFetch<StrapiData<About>>(url + "/about", { query: { populate: "*" } }),
]);

// --- SEO Meta ---
useServerSeoMeta({
  ogTitle: "Slovbohemia systems",
  title: "Slovbohemia systems | Hlavná stránka",
  description: "Vitajte na stránkach firmy Slovbohemia Systems...",
  // ... ostatné SEO atribúty
});

// --- Computed Properties s typmi ---
const galleryImages = computed<GalleryImage[]>(() => {
  return (about.value?.data.attributes.gallery.data || []).map((obj) => {
    return {
      id: obj.id,
      smallImg: obj.attributes.formats.small?.url
          ? store.getMediaUrl(obj.attributes.formats.small.url)
          : store.getMediaUrl(obj.attributes.url),
      largeImg: store.getMediaUrl(obj.attributes.url),
    };
  });
});

// --- Metódy ---
const onShow = () => (isVisible.value = true);
const onHide = () => (isVisible.value = false);

function showGallery(index: number) {
  images.value = galleryImages.value.map((obj) => ({
    src: obj.largeImg,
    text: obj.id, // V pôvodnom kóde si mal text: obj.id, ponechávam
  }));
  imgIndex.value = index;
  onShow();
}

onMounted(() => {
  store.setTitle(t("home.title"));
});
</script>

<style scoped lang="scss">
.offer {
  padding: 80px 0 60px 0;
  @media (max-width: 960px) {
    padding: 60px 0 0 0;
  }
  &__item {
    align-items: center;
    padding: 60px 16px;
    @media (max-width: 960px) {
      padding: 30px 0;
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
    .v-img {
      border-radius: 32px;
    }
    &:first-child {
      padding-top: 10px;
    }

    /* Nový, robustnejší spôsob striedania layoutu */
    &--reversed {
      background: $grey-3;
      .v-row {
        flex-direction: row-reverse;
      }
    }
  }
}
// Ostatné štýly zostávajú rovnaké
</style>