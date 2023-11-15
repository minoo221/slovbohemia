<template>
  <div>
    <section class="about-us">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <h2 class="mb-4">Zdar Boh,</h2>
            <p>
              Vitajte na stánkach digitálneho baníckeho múzea. Toto múzeum má za cieľ významne prispieť k väčšiemu povedomiu o
              baníctve, baníckych lampách, meracej technike, slávnostných odevoch a iných predmetoch využívaných v baníctve. Našim
              hlavným cieľom je rozšíriť vedomosti či už laickej verenosti alebo odbornej. Múzeum otvára zbierky širšiemu publiku
              pomocou digitálnych technológií. Vďaka nemu bližšie nahliadnete do histórie baníckych predmetov a získate nové
              vedomosti. V múzeu najdete poznatky od staroveku až po koniec 20. storočia a budete sa môcť bližšie pozrieť na
              najstaršie osvetľovacie telesa z obdobia 1000 p.n.l. až po predmety používané v nedavnej histórii. Návštevníci môžu
              využívať najaktuálnejšie informácie, fotografie a videá, pričom sa môžu tešit na ďalšie zaujímavé exponáty, ktoré
              budú pribúdať. Pravidelne budeme pridávať nové predmety a informácie. Pre prístup do digitálneho baníckeho múzea je
              nutné sa zaregistrovať a zaplatiť na aké časové oddobie chcete mať prístup. Po zaplatení sa vám sprístupní celý
              aktuálny obsah múzea. O nových exponátoch budeme pravidelne informovať prosterdníctvom emailov uz zaregistrovaných
              užívateľov. Tešíme sa na Vašu návštevu
            </p>
          </v-col>
          <v-col cols="12" md="6">
            <div class="img-cover">
              <img contain src="/images/lamp.JPG" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="main-info text-center" v-if="!user && user?.role.id != 3">
      <h3>{{ t("home.homeInfo") }}</h3>
    </section>
    <section class="prices" v-if="!user && user?.role.id != 3">
      <v-container>
        <v-row>
          <v-col cols="12" md="3" v-for="(item, index) in prices">
            <v-card class="mr-0 px-4 py-4" elevation="4" rounded="lg" width="100%">
              <v-card-item>
                <div>
                  <div class="text-h5 font-weight-bold">{{ item.name }}</div>
                  <div class="text-caption mb-4">{{ item.description }}</div>
                  <div class="text-h2 font-weight-bold text-warning">{{ item.price }}&euro;</div>
                </div>
              </v-card-item>

              <v-card-actions class="d-flex justify-end">
                <v-btn color="warning" variant="outlined" block @click="selectSubscription(item.priceId)"> Vybrať </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="museum" v-else>
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <div class="articles-museum">
              <div class="text-center">
                <h2 class="h1 mb-8">Najnovšie clánky</h2>
              </div>
              <v-row>
                <v-col cols="12" v-for="itemMuseum in museum?.data" class="mb-4">
                  <v-card elevation="0" color="transparent">
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-img
                          class="text-left align-end rounded-md"
                          :src="store.getMediaUrl(itemMuseum.attributes.coverImg.data?.attributes.url)"
                          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                          height="250px"
                          cover
                        >
                          <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                              <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                            </v-row>
                          </template>
                        </v-img>
                      </v-col>
                      <v-col md="8">
                        <v-card-title class="text-left" v-text="itemMuseum.attributes.title"></v-card-title>

                        <v-card-text>
                          <p class="mb-4" v-if="itemMuseum.attributes.summaryText">{{ itemMuseum.attributes.summaryText }}</p>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            class="mx-2"
                            color="warning"
                            link
                            :to="localePath({ name: 'muzeum-slug-subslug', params: { subslug: itemMuseum.attributes.slug } })"
                            variant="text"
                            append-icon="mdi-arrow-right"
                          >
                            {{ t("museum.showMore") }}
                          </v-btn>
                        </v-card-actions>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
import type { Gallery } from "~/types";
const emit = defineEmits(["title"]);
const localePath = useLocalePath();

import { useIndexStore } from "@/stores/";
const store = useIndexStore();

const isVisible: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(false);

const { findOne, find } = useStrapi();
const client = useStrapiClient();
const user = useStrapiUser();

const { data: prices, refresh: refreshReviews } = await useAsyncData("prices", () => find<any>("stripe/products"));

const { data: museum, refresh: refreshPrices } = await useAsyncData("lamps", () =>
  find<any>("lamps", {
    populate: "*",
    pagination: {
      page: 1,
      pageSize: 4,
    },
  })
);

/* const prices: any[] = reactive([
  { title: "1 deň", desc: "Členstvo platí 1 deň od zakúpenia", price: "3" },
  { title: "1 mesiac", desc: "Členstvo platí 1 mesiac od zakúpenia", price: "10" },
  { title: "Polrok", desc: "Členstvo platí 6 mesiacov od zakúpenia", price: "40" },
  { title: "Rok", desc: "Členstvo platí 12 mesiacov od zakúpenia", price: "70" },
]); */

const onShow = () => {
  isVisible.value = true;
};

const onHide = () => {
  isVisible.value = false;
};

const selectSubscription = async (priceId: string) => {
  try {
    const link = await client<any>("/stripe/charge", {
      method: "POST",
      body: { priceId: priceId, userStripeId: user.value?.stripeUserId },
    });
    console.log(link);
    window.location.replace(link);
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  store.setTitle(t("home.title"));
  console.log(store.title);
  console.log("prices", prices);
  console.log("museum", museum);
});
</script>
<style scoped lang="scss">
.main-info {
  max-width: 680px;
  margin: 0 auto;
  margin-bottom: 80px;
}

.prices {
  .v-card {
  }
}

.museum {
  .v-container {
    max-width: 1120px;
  }
  .articles-museum {
    position: relative;
    max-width: 860px;
    margin: 0 auto;
    min-height: 280px;

    &--with-filter {
      max-width: 100%;
    }

    .v-card {
      .v-btn {
        position: absolute;
        bottom: 5px;
        right: 5px;
      }
    }
  }
}

.about-us {
  p {
    line-height: 28px;
  }
  .img-cover {
    border-radius: 60% 40% 40% 20% / 70% 50% 30% 25%;
    overflow: hidden;
    height: 500px;
    width: 100%;
    background: #fff;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
