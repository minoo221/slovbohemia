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

const banner: Ref<any> = ref({
  title: "Ponuka",
  desc: "Sanitárne kabíny sú vyrobené z dosiek z vysokotlakového laminátu HPL hrúbky 10 a 13 mm, drevotrieskové dosky s hrúbkou 24 až 28 mm pokrytých laminátom alebo melamínom. Konštrukcia je založená na hliníkových profiloch, eloxovaných alebo práškovaných farbou podľa zadanej farby. Na výber je aj konštrukcia z prvkov z nerezovej ocele alebo nylonu. Kovanie je chrómové, plastové alebo z nerezu.",
  btns: [{ title: "Kontaktovať", link: localePath("/"), color: "primary" }],
  slides: [{ img: "/images/slider.jpg" }],
  maxWidth: "920px",
});

const { data: prices, refresh: refreshReviews } = await useAsyncData("prices", () =>
  find<any>("stripe/products", { locale: locale.value })
);

/* const prices: any[] = reactive([
  { title: "1 deň", desc: "Členstvo platí 1 deň od zakúpenia", price: "3" },
  { title: "1 mesiac", desc: "Členstvo platí 1 mesiac od zakúpenia", price: "10" },
  { title: "Polrok", desc: "Členstvo platí 6 mesiacov od zakúpenia", price: "40" },
  { title: "Rok", desc: "Členstvo platí 12 mesiacov od zakúpenia", price: "70" },
]); */

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
