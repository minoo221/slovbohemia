<template>
  <footer class="footer">
    <div class="footer__top">
      <v-container>
        <div class="newsletter">
          <h2 class="h1">Newsletter</h2>
          <p>Prihláste sa na odber noviniek a dostávajte vždý nové informácie.</p>
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
            <NuxtLink to="/" class="d-block">
              <v-img src="/images/logo-footer.svg" alt="Slovbohemia" width="320" height="60" contain class="pt-6 mb-4"></v-img>
            </NuxtLink>
            <p>
              Spoľahnite sa na nás pre kvalitu a inováciu vo výrobe šatňových skriniek, sanitárnych kabínok a posuvných stien.
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
          <v-col cols="12" sm="6" md="5" lg="5" offset-md="0">
            <h2 class="mx-4">Kontakt</h2>
            {{ data }}
            <!-- <v-list bg-color="transparent" density="compact" color="grey-10">
              <v-list-item base-color="grey-10" color="grey-10">
                <v-list-item-title>IČO: {{ contact?.data.attributes.company?.ico }}</v-list-item-title>
              </v-list-item>
              <v-list-item base-color="grey-10" color="grey-10">
                <v-list-item-title>DIČ: {{ contact?.data.attributes.company?.dic }}</v-list-item-title>
              </v-list-item>
              <v-list-item base-color="grey-10" color="grey-10">
                <v-list-item-title>
                  EMAIL:
                  <a :href="`mailto:${contact?.data.attributes.email}`" class="contact-link">{{
                    contact?.data.attributes.email
                  }}</a>
                </v-list-item-title>
              </v-list-item>
              <v-list-item base-color="grey-10" color="grey-10">
                <v-list-item-title
                  >TEL:
                  <a :href="`tel:${contact.data?.attributes.tel}`" class="contact-link">{{ contact.data?.attributes.tel }}</a>
                </v-list-item-title>
              </v-list-item>
            </v-list> -->
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
const { locale, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();

const { find } = useStrapi();
const url = useStrapiUrl();

const { data: contactD, refresh: refreshC } = await useAsyncData("contact-information", () =>
  find<any>("contact-information", { populate: "*" })
);

const { data, pending, error, refresh } = await useFetch(url + "/contact-information", {
  query: { populate: "*" },
});

const menu: any[] = reactive([
  { title: "Sanitárne kabíny", to: localePath("/sanitarne-kabinky") },
  { title: "Šatňové skrinky", to: localePath("satnove-skrinky") },
  { title: "Posuvné steny", to: localePath("cennik") },
  { title: "Detské ihriská", to: localePath("okolie") },
]);

onMounted(() => {
  console.log("contact", data);
  console.log("contactD", contactD);
  refresh();
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
      white-space: initial;
    }

    a {
      color: inherit;
      text-decoration: none;
    }
  }

  &__bottom {
    background: $secondary;
    @media (max-width: 960px) {
      text-align: center;
    }
    &:deep(.v-btn__content) {
      color: $grey-10;
    }
    span {
      color: $grey-10;
    }
  }
}
</style>
