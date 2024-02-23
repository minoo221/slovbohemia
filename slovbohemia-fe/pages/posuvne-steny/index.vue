<template>
  <PartialsBanner :data="banner"></PartialsBanner>
  <section class="offer">
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
  title: "Posuvné steny",
  desc: "Systém posuvných stien sa skladá z jednotlivých prvkov pohybujúcich sa ľahko v hliníkovej koľajnici.",
  btns: [{ title: "Kontaktovať", link: localePath("/"), color: "primary" }],
  slides: [{ img: "/images/slider.jpg" }],
  maxWidth: "790px",
});

const { data: prices, refresh: refreshReviews } = await useAsyncData("prices", () =>
  find<any>("stripe/products", { locale: locale.value })
);

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
      v-row {
        flex-direction: row-reverse;
      }
    }
    &:nth-of-type(even) {
      background: $grey-3;
    }
  }
}
</style>
