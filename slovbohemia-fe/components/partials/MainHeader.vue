<template>
  <header class="header">
    <div class="header__top" ref="header">
      <v-container>
        <v-row class="align-center" justify="space-between">
          <v-col cols="7" sm="3" class="py-0">
            <NuxtLink :to="localePath('/')" class="d-block">
              <v-img src="/images/logo.svg" alt="Slovbohemia" width="100%" contain></v-img>
            </NuxtLink>
          </v-col>
          <v-spacer class="d-none d-lg-block"></v-spacer>
          <v-col cols="12" md="8" sm="auto" class="d-none d-md-block">
            <div class="d-flex justify-space-around justify-lg-end" :key="menuKey">
              <div v-for="(item, index) in menu" :key="index">
                <v-btn
                  class="mx-0 px-2 mx-lg-2 px-lg-4"
                  color="white"
                  link
                  :to="item.to"
                  variant="plain"
                  nuxt
                  v-if="item.isContact == false"
                >
                  {{ item.title }}
                </v-btn>
                <v-btn class="mx-0 px-2 mx-lg-2 px-lg-8" color="primary" link :to="item.to" nuxt v-else>
                  {{ item.title }}
                </v-btn>
              </div>
            </div>
          </v-col>
          <v-col cols="auto" class="d-block d-md-none">
            <v-btn icon="mdi-menu" density="default" color="primary" @click="drawer = true"></v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-navigation-drawer v-model="drawer" temporary location="right" color="secondary">
      <div class="d-flex justify-end">
        <v-btn class="ml-auto" variant="text" size="x-large" icon="mdi-close" color="primary" @click="drawer = false"></v-btn>
      </div>
      <v-list nav bg-color="transparent" density="compact" color="white">
        <v-list-item
          v-for="(item, i) in menu"
          :key="i"
          :to="localePath(item.to)"
          nuxt
          nav
          base-color="white"
          link
          color="#fff"
          exact
        >
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script setup lang="ts">
import { useLocalePath, useSwitchLocalePath, useLocaleHead, useBrowserLocale } from "#i18n";
import type { Menu, Slider } from "~/types";
const { locale, t, locales, setLocale } = useI18n();
import { storeToRefs } from "pinia";

import { useIndexStore } from "@/stores/";
const store = useIndexStore();
const user = useStrapiUser();
const { logout } = useStrapiAuth();
const router = useRouter();
const route = useRoute();

const { title } = storeToRefs(store);

const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();

const availableLocales = computed(() => {
  return locales.value;
});

const header = ref<any>(null);

const drawer: Ref<boolean> = ref(false);
const activeLang: Ref<string> = ref("SK");
const languageMenu: Ref<boolean> = ref(false);
const accountMenu: Ref<boolean> = ref(false);
const menuKey: Ref<number> = ref(0);

const handleMenuItemClick = (lang: string, isReload: boolean = false) => {
  activeLang.value = lang;
  if (isReload == false) {
    console.log("som v redirect", lang);
    menuKey.value++;
    setLocale(lang);
    setTimeout(() => {
      router.push(localePath("/"));
    }, 400);
  }
};

const onLogout = () => {
  console.log("logout");

  logout();
  router.push(localePath("/"));
};

/* const { find } = useStrapi();
const { data: contact, refresh } = await useAsyncData("contact-information", () =>
  find<any>("contact-information", { populate: "*" })
); */

const { find } = useStrapi();

const { data: contact, refresh: refreshInfo } = await useAsyncData("contact-information", () =>
  find<any>("contact-information", { populate: "*", locale: locale.value })
);

const menu: Menu[] = reactive([
  { title: "Domov", to: localePath("/"), childrens: [], isContact: false },
  { title: "Ponuka", to: localePath("ponuka"), childrens: [], isContact: false },
  { title: "O nás", to: localePath("o-nas"), childrens: [], isContact: false },
  { title: "Blog", to: localePath("blog"), childrens: [], isContact: false },
  { title: "Kontakt", to: localePath("kontakt"), childrens: [], isContact: true },
]);

watch(locale, (newLocale) => {});

onMounted(() => {
  console.log(store.title);
  console.log("menu", menu);
  console.log("userHeader", user);
  console.log("locale", locale.value);
  handleMenuItemClick(locale.value, true);
});
</script>

<style scoped lang="scss">
.header {
  &__top {
    height: 100px;
    background: $grey-9;
    display: flex;
    align-items: center;
  }
  .header-menu {
    @media (max-width: 1250px) {
      .v-btn {
        font-size: 16px;
      }
    }
  }
  .v-row {
    height: 100%;
  }
}
.header__bottom {
  position: relative;
}
.v-carousel {
  &:deep {
    .v-window__controls {
      z-index: 10;
    }
  }
}
</style>
