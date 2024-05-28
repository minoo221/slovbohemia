<template>
  <PartialsBanner :data="banner"></PartialsBanner>
  <!-- <section class="catalog">
     <v-container class="text-center">
      <h2 class="text-uppercase mb-4">Katalóg na stiahnutie</h2>
      <v-btn color="black" link class="px-6"> Prezrieť katalóg </v-btn>
    </v-container>
  </section> -->
  <section class="benefits">
    <v-container>
      <h2 class="h1 mb-8 text-uppercase">Výhody</h2>
      <v-row>
        <v-col cols="12" md="4" class="px-8 text-center" v-for="(item, index) in benefits">
          <v-img width="90px" contain :src="item.img" position="center" class="mx-auto mb-8"></v-img>
          <span class="text-grey-6">{{ item.desc }}</span>
        </v-col>
      </v-row>
    </v-container>
  </section>
  <section class="utilization">
    <v-container>
      <h2 class="h1 mb-8 text-uppercase">Využitie</h2>
      <v-row>
        <v-col cols="12" md="4" class="px-8 text-center" v-for="(item, index) in utilization">
          <v-img width="90px" contain :src="item.img" position="center" class="mx-auto mb-8"></v-img>
          <span class="text-grey-6">{{ item.desc }}</span>
        </v-col>
      </v-row>
    </v-container>
  </section>
  <section class="products">
    <v-container>
      <div class="blog__title">
        <h2 class="h1">VÝROBKY</h2>
        <p>Vyberte si z ponuky našich sanitárnych kabiniek.</p>
      </div>
      <v-row class="mb-16">
        <v-col cols="12" md="4" v-for="(product, index) in products?.data" :key="index" class="mb-4">
          <article>
            <v-img
              :src="
                product?.attributes.gallery?.data && product?.attributes.gallery.data[0]?.attributes.formats.medium.url
                  ? store.getMediaUrl(product?.attributes.gallery.data[0].attributes.formats.medium.url)
                  : ''
              "
              width="100%"
              height="230px"
              cover
              class="mb-4"
            ></v-img>
            <h3 class="mb-4">{{ product?.attributes.title }}</h3>
            <v-btn
              color="secondary"
              link
              :to="localePath({ name: 'sanitarne-kabinky-slug', params: { slug: product?.attributes.slug } })"
              class="px-10"
            >
              Pozrieť produkt
            </v-btn>
          </article>
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

const banner: Ref<any> = ref({
  title: "Sanitárne kabínky",
  desc: "Sanitárne kabíny sú vyrobené z dosiek z vysokotlakového laminátu HPL hrúbky 10 a 13 mm, drevotrieskové dosky s hrúbkou 24 až 28 mm pokrytých laminátom alebo melamínom. Konštrukcia je založená na hliníkových profiloch, eloxovaných alebo práškovaných farbou podľa zadanej farby. Na výber je aj konštrukcia z prvkov z nerezovej ocele alebo nylonu. Kovanie je chrómové, plastové alebo z nerezu.",
  btns: [{ title: "Kontaktovať", link: localePath("/kontakt"), color: "primary" }],
  slides: [{ img: "/images/sanitarne-kabinky.jpg" }],
  maxWidth: "920px",
});

const { find } = useStrapi();
const url = useStrapiUrl();

/* const { data: products, refresh: refreshProducts } = await useAsyncData("sanitary-cabins", () =>
  find<any>("sanitary-cabins", { populate: "*" })
); */

/* const products = await find<any>("sanitary-cabins", { populate: "*" }); */

const {
  data: products,
  pending,
  error,
  refresh,
} = await useFetch(url + "/sanitary-cabins", {
  query: { populate: "*" },
});

const benefits: any[] = reactive([
  { img: "/images/clock.png", desc: "dlhá životnosť vzhľadom na pevnú konštrukciu," },
  {
    img: "/images/woods.png",
    desc: "vyrobené štandardne z drevotrieskovej dosky alebo koncentrovaného vysokotlakového laminátu HPL,",
  },
  { img: "/images/check.png", desc: "vysoká kvalita použitých matriálov," },
  { img: "/images/circles.png", desc: "dokonalá kombinácia trvanlivosti, estetiky a funkčnosti," },
  { img: "/images/palette.png", desc: "možnosť ľubovoľnej skladby farieb," },
  { img: "/images/weight.png", desc: "konkurencieschopnosť nákladov v porovnaní s tradičnými riešeniami," },
  { img: "/images/clean.png", desc: "funkčnosť pri udržiavaní čistoty," },
  { img: "/images/shield.png", desc: "bezpečnosť užívateľa vďaka vhodnej konštrukcii," },
  {
    img: "/images/feather.png",
    desc: "ľahká konštrukcia, založená na moduloch. Stavebnicový systém umožňuje dodávku výrobkov ako v špeciálnych tak aj v štandardných veľkostiach,",
  },
]);

const utilization: any[] = reactive([
  { img: "/images/hotel.png", desc: "verejné budovy (hotely, banky, obchodné centrá, reštaurácie)" },
  {
    img: "/images/sports.png",
    desc: "športové a rekreačné zariadenia (plavecké bazény, kryté plavárne, fitness centrá, zábavno-športové haly)",
  },
  { img: "/images/knowledge.png", desc: "školské zariadenia (školy, škôlky, univerzity)" },
  { img: "/images/factory.png", desc: "priemyselné stavby (výrobné a skladovacie haly)" },
  { img: "/images/store.png", desc: "nákupné centrá" },
  { img: "/images/hospital.png", desc: "zdravotnícke zariadenia (nemocnice, kliniky, laboratóriá)" },
]);

onMounted(async () => {
  store.setTitle(t("home.title"));
  console.log(store.title);
  console.log("products", products);
});
</script>
<style scoped lang="scss">
.catalog {
  background: $secondary-1;
  padding: 50px 0;
}
.benefits {
  text-align: center;
  padding: 32px 0 45px 0;
  background: $grey-3;
}

.utilization {
  text-align: center;
  padding: 32px 0 45px 0;
}
.products {
  padding: 72px 0 60px 0;
  background: $grey-3;

  &__title {
    text-align: center;
    margin: 0 auto;
    max-width: 560px;
    margin-bottom: 70px;

    h2 {
      margin-bottom: 20px;
    }

    p {
      font-size: 22px;
      line-height: 27px;
      font-weight: 500;
      margin-bottom: 0;
    }
  }

  article {
    .v-img {
      border-radius: 32px;
    }
  }
}
</style>
