N
<template>
  <PartialsBanner :data="banner"></PartialsBanner>
  <section class="offer">
    <div class="text-center mb-0 mb-sm-12">
      <h2 class="h1">Naša ponuka</h2>
    </div>
    <div class="offer__item">
      <v-container>
        <v-row class="align-center">
          <v-col cols="12" md="6">
            <h2>Sanitárne kabíny</h2>
            <p>
              Náš systém je postavený na báze dosiek z vysokotlakového laminátu alebo drevotrieskových dosiek a konštrukcie z
              hliníka alebo nerezu.
            </p>
            <v-btn color="secondary" link to="/sanitarne-kabinky"> Zistiť viac </v-btn>
          </v-col>
          <v-col cols="12" md="6"> <v-img src="/images/offer-1.jpg" width="100%" height="400px" cover></v-img></v-col>
        </v-row>
      </v-container>
    </div>
    <div class="offer__item">
      <v-container>
        <v-row class="align-center">
          <v-col cols="12" md="6">
            <h2>Šatňové skrinky</h2>
            <p>
              Naše skrinky sa vyznačujú estetickým vzhľadom a ergonomikou. Sú vyrobené z liateho laminátu HPL v rôznych farbách a
              vzoroch.
            </p>
            <v-btn color="secondary" link to="/satnove-skrinky"> Zistiť viac </v-btn>
          </v-col>
          <v-col cols="12" md="6"> <v-img src="/images/offer-2.jpg" width="100%" height="400px" cover></v-img></v-col>
        </v-row>
      </v-container>
    </div>
    <div class="offer__item">
      <v-container>
        <v-row class="align-center">
          <v-col cols="12" md="6">
            <h2>Posuvné steny</h2>
            <p>
              Systém posuvných stien rýchlym a atraktívnym spôsobom rozdelí veľké sály na menšie časti kedykoľvek v čase rokovania
              alebo prezentácie.
            </p>
            <v-btn color="secondary" link to="/posuvne-steny"> Zistiť viac </v-btn>
          </v-col>
          <v-col cols="12" md="6"> <v-img src="/images/offer-3.jpg" width="100%" height="400px" cover></v-img></v-col>
        </v-row>
      </v-container>
    </div>
    <div class="offer__item">
      <v-container>
        <v-row class="align-center">
          <v-col cols="12" md="6">
            <h2>Umývadlové dosky</h2>
            <p>
              Vysoká životnosť povrchu, odolnosť voči nečistotám a vonkajším faktorom v kombinácii so širokou škálou farieb robia
              z HPL dosiek základný nástroj pre dizajnérov.
            </p>
            <v-btn color="secondary" link to="/umyvadlove-dosky"> Zistiť viac </v-btn>
          </v-col>
          <v-col cols="12" md="6"> <v-img src="/images/offer-4.jpg" width="100%" height="400px" cover></v-img></v-col>
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
            <v-col v-for="(image, index) in galleryImages.slice(0, 3)" cols="12" :md="index === 2 ? '12' : '6'">
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
              :src="store.getMediaUrl(blog?.attributes.mainImg.data?.attributes.url)"
              width="100%"
              height="230px"
              cover
              class="mb-4"
            ></v-img>
            <ul class="mb-4">
              <li>{{ blog?.attributes?.category }}</li>
              <li>{{ $dayjs(blog?.attributes?.createdAt).format("DD.MM.YYYY") }}</li>
            </ul>
            <h3 class="mb-4">
              <NuxtLink :to="localePath({ name: 'blog-slug', params: { slug: blog?.attributes.slug } })">{{
                blog?.attributes?.title
              }}</NuxtLink>
            </h3>
            <p>
              {{ blog?.attributes?.info }}
            </p>
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
const { locale, t } = useI18n();
const emit = defineEmits(["title"]);
const localePath = useLocalePath();

import { useIndexStore } from "@/stores/";
const store = useIndexStore();
const url = useStrapiUrl();
const route = useRoute();

const isVisible: Ref<boolean> = ref(false);
const imgIndex: Ref<number> = ref(0);
const images: Ref<any> = ref([]);

const banner: Ref<any> = ref({
  title: "SLOVBOHEMIA",
  desc: "Vitajte na stránkach firmy Slovebohemia Systems, ktorá sa zaoberá dodávaním a montážou posuvných stien, sanitárnych kabín a šatňových skriniek. Prezrite si našu ponuku a v prípade akýchkoľvek otázok nás neváhajte kontaktovať",
  btns: [
    { title: "Pozrieť ponuku", link: localePath("/ponuka"), color: "primary" },
    { title: "Kontaktovať", link: localePath("/kontakt"), color: "secondary" },
  ],
  slides: [{ img: "/images/offer-1.jpg" }, { img: "/images/sanitarne-kabinky.jpg" }, { img: "/images/offer-2.jpg" }],
});

const {
  data: blogs,
  pending,
  error,
  refresh,
} = await useFetch(url + "/blogs", {
  query: { populate: "*" },
});

const {
  data: about,
  error: errorAbot,
  pending: pendingAbout,
  refresh: refreshAbout,
} = await useFetch(url + "/about", {
  query: { populate: "*" },
});

useServerSeoMeta({
  ogTitle: () => "Slovbohemia systems",
  title: () => "Slovbohemia systems | Hlavná stránka",
  description: () =>
    "Vitajte na stránkach firmy Slovebohemia Systems, ktorá sa zaoberá dodávaním a montážou posuvných stien, sanitárnych kabín a šatňových skriniek. Prezrite si našu ponuku a v prípade akýchkoľvek otázok nás neváhajte kontaktovať",
  ogDescription: () =>
    "Slovebohemia Systems, firma zaoberajúca sa dodávaním a montážou posuvných stien, sanitárnych kabín a šatňových skriniek. Prezrite si našu ponuku a v prípade akýchkoľvek otázok nás neváhajte kontaktovať",
  ogImage: () => "/images/offer-2.jpg",
  ogImageUrl: () => "/images/offer-2.jpg",
  twitterCard: () => "summary_large_image",
  twitterTitle: () => "Slovbohemia systems",
  twitterDescription: () =>
    "Slovebohemia Systems, firma zaoberajúca sa dodávaním a montážou posuvných stien, sanitárnych kabín a šatňových skriniek. Prezrite si našu ponuku a v prípade akýchkoľvek otázok nás neváhajte kontaktovať",
  twitterImage: () => "/images/offer-2.jpg",
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

onMounted(async () => {
  store.setTitle(t("home.title"));
  console.log(store.title);
  console.log(route);
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
    &:nth-of-type(odd) {
      background: $grey-3;
      .v-row {
        flex-direction: row-reverse;
      }
    }
  }
}
</style>
