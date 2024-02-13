<template>
  <PartialsBanner :data="banner"></PartialsBanner>
  <section class="offer">
    <div class="text-center mb-12">
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
            <v-btn color="secondary" link> Zistiť viac </v-btn>
          </v-col>
          <v-col cols="12" md="6"> <v-img src="/images/offer-1.jpg" width="100%" height="400px" cover></v-img></v-col>
        </v-row>
      </v-container>
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
            <v-btn color="secondary" link> Zistiť viac </v-btn>
          </v-col>
          <v-col cols="12" md="6"> <v-img src="/images/offer-2.jpg" width="100%" height="400px" cover></v-img></v-col>
        </v-row>
      </v-container>
    </div>
  </section>
  <section class="about-us">
    <v-container>
      <v-row>
        <v-col cols="12" md="5">
          <h2 class="h1">O nás</h2>
          <p class="mb-8">
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
            eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <v-btn color="secondary" link class="mr-4"> Zistiť viac </v-btn>
          <v-btn color="primary" link> Kotnaktujte nás </v-btn>
        </v-col>
        <v-col cols="12" md="6" offset-lg="1">
          <v-row>
            <v-col cols="12" md="6">
              <v-img src="/images/offer-2.jpg" width="100%" height="200px" cover></v-img>
            </v-col>
            <v-col cols="12" md="6">
              <v-img src="/images/offer-2.jpg" width="100%" height="200px" cover></v-img>
            </v-col>
            <v-col cols="12">
              <v-img src="/images/offer-2.jpg" width="100%" height="200px" cover></v-img>
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
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      </div>
      <v-row class="mb-16">
        <v-col cols="12" md="4">
          <article>
            <v-img src="/images/offer-2.jpg" width="100%" height="230px" cover class="mb-4"></v-img>
            <ul class="mb-4">
              <li>Kategória</li>
              <li>Dátum</li>
            </ul>
            <h3 class="mb-4">Lorem ipsum dolor sit amet, consectetur.</h3>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia in deserunt mollit anim id est sint
              laborum.
            </p>
          </article>
        </v-col>
        <v-col cols="12" md="4">
          <article>
            <v-img src="/images/offer-2.jpg" width="100%" height="230px" cover class="mb-4"></v-img>
            <ul class="mb-4">
              <li>Kategória</li>
              <li>Dátum</li>
            </ul>
            <h3 class="mb-4">Lorem ipsum dolor sit amet, consectetur.</h3>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia in deserunt mollit anim id est sint
              laborum.
            </p>
          </article>
        </v-col>
        <v-col cols="12" md="4">
          <article>
            <v-img src="/images/offer-2.jpg" width="100%" height="230px" cover class="mb-4"></v-img>
            <ul class="mb-4">
              <li>Kategória</li>
              <li>Dátum</li>
            </ul>
            <h3 class="mb-4">Lorem ipsum dolor sit amet, consectetur.</h3>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia in deserunt mollit anim id est sint
              laborum.
            </p>
          </article>
        </v-col>
      </v-row>
      <div class="text-center">
        <v-btn color="secondary" link class="px-10"> Pozrieť všetky </v-btn>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const emit = defineEmits(["title"]);
const localePath = useLocalePath();

import { useIndexStore } from "@/stores/";
const store = useIndexStore();

const { findOne, find } = useStrapi();
const client = useStrapiClient();
const user = useStrapiUser();
const { fetchUser } = useStrapiAuth();

const { data: prices, refresh: refreshReviews } = await useAsyncData("prices", () =>
  find<any>("stripe/products", { locale: locale.value })
);

/* const prices: any[] = reactive([
  { title: "1 deň", desc: "Členstvo platí 1 deň od zakúpenia", price: "3" },
  { title: "1 mesiac", desc: "Členstvo platí 1 mesiac od zakúpenia", price: "10" },
  { title: "Polrok", desc: "Členstvo platí 6 mesiacov od zakúpenia", price: "40" },
  { title: "Rok", desc: "Členstvo platí 12 mesiacov od zakúpenia", price: "70" },
]); */

const banner: Ref<any> = ref({
  title: "SLOVBOHEMIA",
  desc: "Slogan: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  btns: [
    { title: "Pozrieť ponuku", link: localePath("/"), color: "primary" },
    { title: "Kontaktovať", link: localePath("/"), color: "secondary" },
  ],
  slides: [{ img: "/images/slider.jpg" }, { img: "/images/slider.jpg" }, { img: "/images/slider.jpg" }],
});

onMounted(async () => {
  store.setTitle(t("home.title"));
  console.log(store.title);
});
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
