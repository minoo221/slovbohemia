<template>
  <client-only>
    <div id="fb-root"></div>
  </client-only>

  <PartialsBanner :data="banner"></PartialsBanner>
  <section class="blog-detail">
    <v-container>
      <ul class="mb-4">
        <li>{{ blog?.data.attributes?.category }}</li>
        <li>{{ $dayjs(blog?.data.attributes?.createdAt).format("DD.MM.YYYY") }}</li>
      </ul>
      <h2 class="text-uppercase">{{ blog?.data.attributes?.title }}</h2>
      <div class="blog-text" v-dompurify-html="blog?.data.attributes?.body"></div>
      <div
        class="fb-like"
        :data-href="pageUrl.href"
        data-width=""
        data-layout=""
        data-action=""
        data-size=""
        data-share="true"
      ></div>
    </v-container>
  </section>
  <section class="blog-nav">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-btn
            size="large"
            color="black"
            variant="plain"
            class="px-0 font-weight-medium text-capitalize"
            link
            :to="localePath({ name: 'blog-slug', params: { slug: previousPost?.attributes.slug } })"
            v-if="previousPost"
            ><v-icon size="50">mdi-chevron-left</v-icon>Predchádzajúci</v-btn
          >
          <h4>{{ previousPost?.attributes?.title }}</h4>
        </v-col>
        <v-col cols="12" md="6" class="text-right">
          <v-btn
            size="large"
            color="black"
            variant="plain"
            class="px-0 font-weight-medium text-capitalize"
            link
            :to="localePath({ name: 'blog-slug', params: { slug: nextPost?.attributes.slug } })"
            v-if="nextPost"
            >Ďalší<v-icon size="50">mdi-chevron-right</v-icon></v-btn
          >
          <h4>{{ nextPost?.attributes?.title }}</h4>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import qs from "qs";
const { locale, t } = useI18n();
const emit = defineEmits(["title"]);
const localePath = useLocalePath();

import { useIndexStore } from "@/stores/";
const store = useIndexStore();
const route = useRoute();
const url = useStrapiUrl();
const pageUrl = useRequestURL();

const blogData: Ref<any> = ref(null);
const previousPost: Ref<any> = ref(null);
const nextPost: Ref<any> = ref(null);

/* const { findOne } = useStrapi();

const { data: product, refresh: refreshProducts } = await useAsyncData("sanitary-cabins", () =>
  findOne<any>("sanitary-cabins", route.params.slug)
); */

useHead({
  script: [
    {
      hid: "fb",
      src: "https://connect.facebook.net/sk_SK/sdk.js#xfbml=1&version=v19.0",
      defer: true,
      onload: () => {
        (window as any).FB.XFBML.parse();
      },
    },
  ],
});

const { data: blog, pending, error, refresh } = await useFetch(url + "/blogs/" + route.params.slug);

const banner: Ref<any> = ref({
  title: "",
  btns: [],
  slides: [{ img: "/images/offer-2.jpg" }],
  maxWidth: "100%",
});

const getPreviousPost = async (date: string) => {
  console.log("date", date);

  const query = qs.stringify(
    {
      filters: {
        publishedAt: {
          $lt: date,
        },
      },
      pagination: {
        pageSize: 1,
      },
    },
    { encode: false }
  );

  const { data } = await useFetch<any>(url + "/blogs?" + query);

  previousPost.value = data.value.data[0];
};

const getNextPost = async (date: string) => {
  const query = qs.stringify(
    {
      filters: {
        publishedAt: {
          $gt: date,
        },
      },
      pagination: {
        pageSize: 1,
      },
    },
    { encode: false }
  );

  const { data } = await useFetch<any>(url + "/blogs?" + query);
  nextPost.value = data.value.data[0];
};

watch(
  () => blog,
  (val: any) => {
    console.log("val", val?.value.data.attributes.publishedAt);
    getPreviousPost(val?.value.data.attributes.publishedAt);
    getNextPost(val?.value.data.attributes.publishedAt);
  },
  { immediate: true }
);
onMounted(() => {
  console.log("route", route);
});
</script>
<style scoped lang="scss">
.blog-detail {
  padding: 80px 0 60px 0;
  @media (max-width: 960px) {
    padding: 60px 0 0 0;
  }
  h2 {
    font-size: 56px;
    margin-bottom: 20px;
    @media (max-width: 960px) {
      font-size: 38px;
    }
  }
  ul {
    list-style: none;
    display: flex;

    li {
      position: relative;
      padding-right: 10px;
      font-size: 16px;
      color: $primary;
      font-weight: 700;

      &:after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 1px;
        height: 16px;
        border-right: 2px solid $primary;
      }

      &:not(:first-child) {
        margin-left: 10px;
      }

      &:last-child {
        &:after {
          display: none;
        }
      }
    }
  }
  .blog-text {
    padding-bottom: 60px;
    border-bottom: 4px solid $grey-9;
    margin-bottom: 24px;
  }
}
.blog-nav {
  padding: 60px 0;
  background: $primary;
  h4 {
    color: $white;
    line-height: 21px;
  }
}
</style>
