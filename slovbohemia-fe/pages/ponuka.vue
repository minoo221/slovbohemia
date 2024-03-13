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
  desc: "Vyberte si zo širokej ponuky našich produktov.",
  btns: [{ title: "Kontaktovať", link: localePath("/kontakt"), color: "primary" }],
  slides: [{ img: "/images/offer-2.jpg" }],
  maxWidth: "920px",
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
    &:nth-of-type(odd) {
      background: $grey-3;
      .v-row {
        flex-direction: row-reverse;
      }
    }
  }
}
</style>
