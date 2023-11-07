<template>
  <section class="main-info text-center">
    <h3>{{ t("home.homeInfo") }}</h3>
  </section>
  <section class="prices">
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
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
import type { Gallery } from "~/types";
const emit = defineEmits(["title"]);
import { useIndexStore } from "@/stores/";
const store = useIndexStore();

const isVisible: Ref<boolean> = ref(false);

const { findOne, find } = useStrapi();
const client = useStrapiClient();
const user = useStrapiUser();

const { data: prices, refresh: refreshReviews } = await useAsyncData("prices", () => find<any>("stripe/products"));

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
  console.log("user", user.value?.stripeUserId);
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
</style>
