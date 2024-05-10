<template>
  <PartialsBanner :data="banner"></PartialsBanner>
  <section class="about-us">
    <v-container>
      <v-row>
        <v-col cols="12" md="5">
          <h2 class="h1">O nás</h2>
          <p class="mb-8">
            SlovBohemia je vaším spoľahlivým partnerom v oblasti komerčných riešení! Naša firma sa špecializuje nielen na výrobu
            šatňových skriniek. Sme hrdí na naše moderné a funkčné šatňové skrinky, ktoré poskytujú praktické úložné riešenia a
            zároveň pridávajú štýlový dotyk do každého prostredia. Okrem toho, naša ponuka zahŕňa aj špeciálne navrhnuté sanitárne
            kabínky, ktoré spĺňajú najvyššie hygienické normy a sú ideálne pre použitie v rôznych verejných či komerčných
            priestoroch. Navyše, naša firma ponúka široký výber posuvných stien, ktoré sú ideálne pre efektívne využitie priestoru
            v kancelárskych a komerčných prostrediach. Sú navrhnuté s dôrazom na estetiku a funkčnosť, aby poskytovali maximálnu
            flexibilitu a pohodlie pre vašich zamestnancov alebo návštevníkov. Spoľahnite sa na SlovBohemia pre špičkové
            interiérové riešenia, ktoré kombinujú praktickosť, štýl a kvalitu. Naši skúsení odborníci sú pripravení splniť vaše
            individuálne potreby a poskytnúť vám osobitnú starostlivosť od začiatku až do konca každého projektu. Dovolte nám
            pomôcť vám vytvoriť priestory, ktoré vás nadchnú svojou funkčnosťou a krásou!
          </p>
          <v-btn color="secondary" class="mr-4" link :to="localePath('ponuka')"> Zistiť viac </v-btn>
          <v-btn color="primary" link :to="localePath('kontakt')"> Kontaktujte nás </v-btn>
        </v-col>
        <v-col cols="12" md="6" offset-lg="1" class="d-flex align-center">
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
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const emit = defineEmits(["title"]);
const localePath = useLocalePath();

import { useIndexStore } from "@/stores/";
const store = useIndexStore();

useServerSeoMeta({
  ogTitle: () => "Slovbohemia systems",
  title: () => "Slovbohemia systems | O nás",
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

const banner: Ref<any> = ref({
  title: "O nás",
  desc: "Štýlové riešenia pre vaše priestory. Šatňové skrinky, sanitárne kabínky a posuvné steny od nás vám prinášajú spoľahlivosť a eleganciu v každom kroku.",
  btns: [{ title: "Kontaktovať", link: localePath("/kontakt"), color: "primary" }],
  slides: [{ img: "/images/offer-1.jpg" }],
  maxWidth: "920px",
});

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
