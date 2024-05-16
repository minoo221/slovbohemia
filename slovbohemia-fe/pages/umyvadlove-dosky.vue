<template>
  <PartialsBanner :data="banner"></PartialsBanner>
  <section class="offer">
    <v-container>
      <div class="text-center mb-0 mb-sm-12">
        <h2 class="h1">{{ sink?.data?.attributes.title }}</h2>
        <p>{{ sink?.data?.attributes.info }}</p>
      </div>
    </v-container>
    <div class="gallery">
      <v-container>
        <div class="gallery-cover" v-if="sink?.data?.attributes.gallery.data">
          <div class="img-cover" v-for="(image, index) in sink?.data?.attributes.gallery.data?.slice(0, 5)" :key="index">
            <v-img
              :src="store.getMediaUrl(image.attributes.url)"
              width="100%"
              height="150px"
              cover
              class="mb-4"
              @click="showGallery(index, sink?.data?.attributes.gallery.data)"
            ></v-img>
          </div>
        </div>
      </v-container>
      <client-only>
        <vue-easy-lightbox :visible="isVisible" :imgs="images" :index="imgIndex" @hide="onHide"></vue-easy-lightbox>
      </client-only>
    </div>
  </section>
</template>

<script setup lang="ts">
import qs from "qs";

const { locale, t } = useI18n();
const emit = defineEmits(["title"]);
const localePath = useLocalePath();

import { useIndexStore } from "@/stores/";
const store = useIndexStore();

const { findOne, find } = useStrapi();
const client = useStrapiClient();
const user = useStrapiUser();
const { fetchUser } = useStrapiAuth();

const isVisible: Ref<boolean> = ref(false);
const imgIndex: Ref<number> = ref(0);
const images: Ref<any> = ref([]);
const url = useStrapiUrl();

const query = qs.stringify(
  {
    populate: {
      gallery: true,
      offer: {
        populate: ["gallery"],
      },
    },
  },
  { encode: false }
);

const { data: sink, pending, error, refresh } = await useFetch(url + "/sink-top?" + query);

const banner: Ref<any> = ref({
  title: "Umývadlové dosky",
  desc: "",
  btns: [{ title: "Kontaktovať", link: localePath("/kontakt"), color: "primary" }],
  slides: [{ img: "/images/offer-3.jpg" }],
  maxWidth: "790px",
});

const onShow = () => {
  isVisible.value = true;
};

const onHide = () => {
  isVisible.value = false;
};

function showGallery(index: number, imgs: any) {
  /* images.value = apartments[index].value.gallery; */

  const result = imgs.map((obj: any) => {
    return {
      text: obj.id,
      src: store.getMediaUrl(obj.attributes.url),
    };
  });

  images.value = result;

  imgIndex.value = index;

  onShow();
  /* gallery.silentbox.openOverlay(item, index); */
}

onMounted(() => {
  /*  getWalls(); */
  console.log("walls", sink);
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
      .v-row {
        flex-direction: row-reverse;
      }
    }
    &:nth-of-type(even) {
      background: $grey-3;
    }
    &:last-of-type {
      padding-bottom: 60px;
    }
  }
}
.gallery {
  .gallery-cover {
    display: flex;
    flex-wrap: wrap;
    .img-cover {
      width: 20%;
      flex: 0 0 20%;
      padding: 0 8px;
      .v-img {
        border-radius: 16px;
      }
    }
  }
}
</style>
