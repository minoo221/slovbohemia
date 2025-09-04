<template>
  <PartialsBanner :data="banner"></PartialsBanner>
  <section class="blog">
    <v-container>
      <div class="blog__title"></div>
      <v-row class="mb-16">
        <v-col cols="12" md="4" v-for="blog in blogs?.data" :key="blog.id">
          <article>
            <v-img
              :src="store.getMediaUrl(blog?.attributes.mainImg.data?.attributes.url)"
              width="100%"
              height="230px"
              cover
              class="mb-4"
            ></v-img>
            <ul class="mb-4">
              <li>{{ blog?.attributes?.category }}</li>
              <li>{{ $dayjs(blog?.attributes?.createdAt).format("DD.MM.YYYY") }}</li>
            </ul>
            <h3 class="mb-4">
              <NuxtLink :to="localePath({ name: 'blog-slug', params: { slug: blog?.attributes.slug } })">{{
                blog?.attributes?.title
              }}</NuxtLink>
            </h3>
            <p>
              {{ blog?.attributes?.info }}
            </p>
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

const url = useStrapiUrl();

useServerSeoMeta({
  ogTitle: () => "Slovbohemia systems",
  title: () => "Slovbohemia systems | Blog",
  description: () =>
    "Vitajte na stránkach firmy Slovbohemia Systems, ktorá sa zaoberá dodávaním a montážou posuvných stien, sanitárnych kabín a šatňových skriniek. Prezrite si našu ponuku a v prípade akýchkoľvek otázok nás neváhajte kontaktovať",
  ogDescription: () =>
    "Slovbohemia Systems, firma zaoberajúca sa dodávaním a montážou posuvných stien, sanitárnych kabín a šatňových skriniek. Prezrite si našu ponuku a v prípade akýchkoľvek otázok nás neváhajte kontaktovať",
  ogImage: () => "/images/offer-2.jpg",
  ogImageUrl: () => "/images/offer-2.jpg",
  twitterCard: () => "summary_large_image",
  twitterTitle: () => "Slovbohemia systems",
  twitterDescription: () =>
    "Slovbohemia Systems, firma zaoberajúca sa dodávaním a montážou posuvných stien, sanitárnych kabín a šatňových skriniek. Prezrite si našu ponuku a v prípade akýchkoľvek otázok nás neváhajte kontaktovať",
  twitterImage: () => "/images/offer-2.jpg",
});

const banner: Ref<any> = ref({
  title: "Blog",
  desc: "Chcete sa dozvedieť novinky zo sveta skriniek, kabínok či posuvných stien? Alebo chcete vedieť, čo je nové v našej firme? Prečítajte si niektorý z našich článkov.",
  btns: [{ title: "Kontaktovať", link: localePath("/kontakt"), color: "primary" }],
  slides: [{ img: "/images/offer-1.jpg" }],
  maxWidth: "920px",
});

const {
  data: blogs,
  pending,
  error,
  refresh,
} = await useFetch(url + "/blogs", {
  query: { populate: "*" },
});

/* const prices: any[] = reactive([
  { title: "1 deň", desc: "Členstvo platí 1 deň od zakúpenia", price: "3" },
  { title: "1 mesiac", desc: "Členstvo platí 1 mesiac od zakúpenia", price: "10" },
  { title: "Polrok", desc: "Členstvo platí 6 mesiacov od zakúpenia", price: "40" },
  { title: "Rok", desc: "Členstvo platí 12 mesiacov od zakúpenia", price: "70" },
]); */

onMounted(async () => {
  store.setTitle(t("home.title"));
  console.log(store.title);
});
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
