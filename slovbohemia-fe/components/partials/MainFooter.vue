<template>
  <footer class="footer">
    <div class="footer__top">
      <v-container>
        <div class="newsletter">
          <h2 class="h1">Newsletter</h2>
          <p>Priíhlaste sa na odber noviniek a dostávajte vždý nové informácie.</p>
          <div class="d-flex">
            <v-text-field class="mr-4" placeholder="Váš email" variant="solo" :rounded="0" hide-details></v-text-field>
            <v-btn color="primary">Odoberať</v-btn>
          </div>
        </div>
      </v-container>
    </div>
    <div class="footer__middle">
      <v-container>
        <v-row>
          <v-col cols="12" md="3" lg="3">
            <h2>Logo</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni totam, aut ducimus a commodi ipsam placeat? Eum
              officia nobis similique.
            </p>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3" offset-lg="1">
            <h2 class="mx-4">Produkty</h2>
            <v-list nav bg-color="transparent" density="compact" color="grey-10">
              <v-list-item v-for="(item, i) in menu" :key="i" :to="item.to" nuxt nav link color="grey-10" exact>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3" offset-md="0">
            <h2 class="mx-4">Kontakt</h2>
            <v-list bg-color="transparent" density="compact" color="grey-10">
              <v-list-item base-color="grey-10" color="grey-10">
                <v-list-item-title>IČO:</v-list-item-title>
              </v-list-item>
              <v-list-item base-color="grey-10" color="grey-10">
                <v-list-item-title>DIČ:</v-list-item-title>
              </v-list-item>
              <v-list-item base-color="grey-10" color="grey-10">
                <v-list-item-title>EMAIL:</v-list-item-title>
              </v-list-item>
              <v-list-item base-color="grey-10" color="grey-10">
                <v-list-item-title>TEL:</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="footer__bottom">
      <v-container>
        <v-row>
          <v-col cols="12" md="6" lg="6" class="d-flex align-center">
            <span>© 2023 SLOVBOHEMIA.SK</span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn variant="plain" class="text-subtitle-1 text-decoration-underline" link>Zásady ochrany osobných údajov</v-btn>
            <v-btn variant="plain" class="text-subtitle-1 text-decoration-underline" link>Podmienky služby</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";
const { locale, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
import type { Menu, Slider } from "~/types";
const center: any = reactive({ lat: 49.10315253556189, lng: 19.59352807900453 });
const info: Ref<any> = ref([]);

const { find } = useStrapi();
const { data: contact, refresh: refreContact } = await useAsyncData("contact-information", () =>
  find<any>("contact-information", { populate: "*", locale: locale.value })
);

const { data: home, refresh: refreshHome } = await useAsyncData("homen", () =>
  find<any>("home", { populate: "*", locale: locale.value })
);

const menu: any[] = reactive([
  { title: "Sanitárne kabíny", to: localePath("/") },
  { title: "Šatňové skrinky", to: localePath("apartmany") },
  { title: "Posuvné steny", to: localePath("cennik") },
  { title: "Detské ihriská", to: localePath("okolie") },
]);

const getMenu = async () => {
  console.log("menu", locale.value);

  try {
    /* if (filter.value == "") { */
    const response = await find<Menu>("navigation/render/footer", {
      type: "TREE",
      locale: locale.value,
    });
    info.value = response;
  } catch (e) {
    console.log(e);
  }
};

watch(locale, (newLocale) => {
  getMenu();
});

onMounted(() => {
  getMenu();
});
</script>

<style scoped lang="scss">
.footer {
  &__top {
    background-color: $grey-10;
    padding: 35px 0 60px 0;
  }
  .newsletter {
    color: white;
    border-radius: 5px;
    text-align: center;
    max-width: 540px;
    margin: 0 auto;
    h2 {
      color: $white;
      margin-bottom: 1rem;
    }
    p {
      font-size: 22px;
      margin-bottom: 35px;
    }
    .v-btn {
      height: 56px;
    }
  }

  &__middle {
    padding: 70px 0 45px 0;
    background: $secondary-1;
    h2 {
      margin-bottom: 15px;
    }
    p {
      color: $grey-10;
    }
    .v-list-item--nav {
      &:deep(.v-list-item-title) {
        font-size: 22px;
      }
    }
    .v-list-item-title {
      font-size: 22px;
      font-weight: 600;
    }
  }

  &__bottom {
    background: $secondary;
    &:deep(.v-btn__content) {
      color: $grey-10;
    }
    span {
      color: $grey-10;
    }
  }
}
</style>
