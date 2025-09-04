<template>
  <PartialsBanner :data="banner"></PartialsBanner>

  <section class="offer">
    <div class="text-center mb-12">
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
</template>

<script setup lang="ts">
import type {Banner} from "~/types";

const { locale, t } = useI18n();
const emit = defineEmits(["title"]);
const localePath = useLocalePath();

import { useIndexStore } from "@/stores/";
const store = useIndexStore();

const banner: Ref<Banner> = ref({
  title: "Ponuka",
  desc: "Vyberte si zo širokej ponuky našich produktov.",
  btns: [{ title: "Kontaktovať", link: localePath("/kontakt"), color: "primary" }],
  slides: [{ img: "/images/offer-2.jpg" }],
  maxWidth: "920px",
});

const offerItems = ref([
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

    &--reversed {
      background: $grey-3;
      .v-row {
        flex-direction: row-reverse;
      }
    }
  }
}
</style>
