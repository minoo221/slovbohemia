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
          <v-btn color="secondary" link class="mr-4 mb-4 mb-sm-0"> Zistiť viac </v-btn>
          <v-btn color="primary" link class="mr-4 mb-4 mb-sm-0"> Kontaktujte nás </v-btn>
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

const banner: Ref<any> = ref({
  title: "SLOVBOHEMIA",
  desc: "Slogan: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  btns: [
    { title: "Pozrieť ponuku", link: localePath("/"), color: "primary" },
    { title: "Kontaktovať", link: localePath("/"), color: "secondary" },
  ],
  slides: [{ img: "/images/offer-1.jpg" }, { img: "/images/sanitarne-kabinky.jpg" }, { img: "/images/offer-2.jpg" }],
});

onMounted(async () => {
  store.setTitle(t("home.title"));
  console.log(store.title);
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
