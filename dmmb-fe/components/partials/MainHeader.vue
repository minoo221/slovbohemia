<template>
  <header class="header">
    <div class="header__top" ref="header">
      <div class="header-menu">
        <v-container>
          <v-row class="align-center" justify="space-between">
            <v-col col="2" md="2" class="py-0">
              <NuxtLink :to="localePath('/')" class="d-block">
                <v-img contain src="/images/logo.png" class="img-logo"></v-img>
              </NuxtLink>
            </v-col>
            <v-col cols="12" md="auto" class="d-none d-md-block">
              <div class="d-flex" :key="menuKey">
                <div v-for="item in menu" :key="item.id">
                  <v-btn
                    exact
                    class="mx-0 px-2 mx-lg-2 px-lg-4"
                    color="secondary"
                    link
                    :to="localePath(item.path)"
                    variant="plain"
                    nuxt
                    v-if="item.items.length == 0"
                  >
                    {{ item.title }}
                  </v-btn>
                  <v-menu v-else>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        exact
                        class="mx-0 px-2 mx-lg-2 px-lg-4"
                        color="secondary"
                        variant="plain"
                        v-bind="props"
                        append-icon="mdi-chevron-down"
                      >
                        {{ item.title }}
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(submenu, index) in item.items"
                        :key="index"
                        :value="index"
                        link
                        nuxt
                        :to="localePath(submenu.path)"
                      >
                        <v-list-item-title>{{ submenu.title }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </div>
            </v-col>
            <v-col cols="4" md="2" class="d-block">
              <div class="d-flex align-center">
                <v-menu v-model="accountMenu" location="bottom center" color="transparent">
                  <template v-slot:activator="{ props }">
                    <v-btn icon="mdi-account" v-bind="props" variant="plain" density="compact"> </v-btn>
                  </template>
                  <v-list dense v-if="!user">
                    <v-list-item :active="false" density="compact" :to="localePath('/prihlasenie')">
                      {{ t("header.login") }}
                    </v-list-item>
                    <v-list-item :active="false" density="compact" :to="localePath('/registracia')">
                      {{ t("header.register") }}
                    </v-list-item>
                  </v-list>
                  <v-list dense v-else>
                    <v-list-item :active="false" density="compact" :to="localePath('/profil')">
                      {{ t("header.profile") }}
                    </v-list-item>
                    <v-list-item :active="false" density="compact" @click="onLogout()">
                      {{ t("header.logout") }}
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-menu v-model="languageMenu" offset-y color="transparent">
                  <template v-slot:activator="{ props }">
                    <v-btn class="text-capitalize" v-bind="props" variant="plain">
                      {{ activeLang.toUpperCase() }}
                      <v-icon small right>mdi-menu-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list dense>
                    <v-list-item
                      v-for="(lang, index) in availableLocales"
                      :key="index"
                      :active="false"
                      density="compact"
                      @click.prevent="handleMenuItemClick(lang.code)"
                    >
                      {{ lang.code.toUpperCase() }}
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-col>
            <v-col cols="auto" class="d-block d-md-none">
              <v-btn icon="mdi-menu" density="default" color="primary" @click="drawer = true"></v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    <div class="header__bottom">
      <!-- <div class="title-cover align-center justify-center">
        <h1>{{ title }}</h1>
      </div> -->
      <Swiper
        :modules="[SwiperAutoplay, SwiperEffectFade, SwiperGrid, SwiperNavigation]"
        :loop="true"
        :navigation="true"
        :slidesPerView="1"
        :autoplay="{
          delay: 4500,
          disableOnInteraction: false,
        }"
        :effect="'fade'"
      >
        <SwiperSlide v-for="(item, index) in contact?.data.attributes.homeSlider.data" :key="item.id">
          <div class="img-cover">
            <img :src="store.getMediaUrl(item.attributes.url)" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <v-navigation-drawer v-model="drawer" temporary location="right" color="secondary">
      <div class="d-flex justify-end">
        <v-btn class="ml-auto" variant="text" size="x-large" icon="mdi-close" color="primary" @click="drawer = false"></v-btn>
      </div>
      <v-list nav bg-color="transparent" density="compact" color="white">
        <v-list-item
          v-for="(item, i) in menu"
          :key="i"
          :to="localePath(item.path)"
          nuxt
          nav
          base-color="white"
          :link="item.items.length == 0"
          color="#fff"
          exact
        >
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list>
            <v-list-item
              v-for="(submenu, index) in item.items"
              :key="index"
              :value="index"
              link
              nuxt
              :to="localePath(submenu.path)"
            >
              <v-list-item-title>{{ submenu.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
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
const menu: Ref<any> = ref([]);

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
/* const { data: menu, refresh: refreshMenu } = await useAsyncData("menu", () =>
  find<Menu>("navigation/render/main-navigation", {
    type: "TREE",
    locale: locale.value,
  })
); */

const getMenu = async () => {
  try {
    /* if (filter.value == "") { */
    const response = await find<Menu>("navigation/render/main-navigation", {
      type: "TREE",
      locale: locale.value,
    });
    menu.value = response;
  } catch (e) {
    console.log(e);
  }
};

const { data: contact, refresh: refreshInfo } = await useAsyncData("contact-information", () =>
  find<any>("contact-information", { populate: "*", locale: locale.value })
);

/* const menu: Menu[] = reactive([
  { title: "Domov", to: localePath("/"), childrens: [] },
  { title: "Muzeum", to: localePath("muzeum"), childrens: [] },
  { title: "Kontakt", to: localePath("kontakt"), childrens: [] },
  { title: "Obchodné podmienky", to: localePath("obchodne-podmienky"), childrens: [] },
]); */

watch(locale, (newLocale) => {
  getMenu();
});

onMounted(() => {
  console.log(store.title);
  console.log("menu", menu);
  console.log("userHeader", user);
  console.log("locale", locale.value);
  handleMenuItemClick(locale.value, true);
  getMenu();
});
</script>

<style scoped lang="scss">
.img-logo {
  max-width: 140px;
}
.header {
  &__top {
    /* position: fixed;
    width: 100%;
    z-index: 1000;
    transition: all 0.3s ease; */
    /* position: absolute;
    top: 0;
    left: auto;
    width: 100%;
    z-index: 10; */
    background: #fff;
    /* &::before {
      content: "";
      position: absolute;
      top: 0;
      left: auto;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.738) 19%,
        rgba(0, 0, 0, 0.541) 34%,
        rgba(0, 0, 0, 0.382) 47%,
        rgba(0, 0, 0, 0.278) 56.5%,
        rgba(0, 0, 0, 0.194) 65%,
        rgba(0, 0, 0, 0.126) 73%,
        rgba(0, 0, 0, 0.075) 80.2%,
        rgba(0, 0, 0, 0.042) 86.1%,
        rgba(0, 0, 0, 0.021) 91%,
        rgba(0, 0, 0, 0.008) 95.2%,
        rgba(0, 0, 0, 0.002) 98.2%,
        transparent 100%
      );
    } */
    &.isScrolled {
      transform: translateY(-50px);
      background: $secondary-100;
      @media (max-width: 960px) {
        transform: translateY(0px);
      }
    }
    .header-info {
      /* background: $secondary-80; */
      height: 50px;
    }
    .header-menu {
      /* background: $white; */

      .v-btn {
        color: $secondary-100;
      }
      @media (max-width: 1250px) {
        .v-btn {
          font-size: 12px;
        }
      }
    }
    .v-container {
      height: 100%;
    }
    .v-row {
      height: 100%;
    }
  }
  &__bottom {
    position: relative;
    z-index: 4;
    .title-cover {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 12;
    }
    h1 {
      color: #fff;
    }
    .swiper {
      background: #fff;
      height: 400px;
      @media (max-width: 960px) {
        height: 200px;
      }
      .img-cover {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
          height: 400px;
          object-fit: contain;
          @media (max-width: 960px) {
            height: 200px;
          }
        }
      }
      /* &::after {
        content: "";
        background: rgba(#000, 0.29);
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 4;
      } */
    }
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
