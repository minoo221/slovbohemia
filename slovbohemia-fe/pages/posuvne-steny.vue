<template>
  <PartialsBanner :data="banner"></PartialsBanner>
  <!-- {{ walls?.data?.attributes?.title }} -->
  <!-- <section class="offer">
    <div class="offer__item" v-for="wall in walls?.data?.attributes.offer" :key="wall.id">
      <v-container>
        <v-row class="align-start">
          <v-col cols="12" md="6">
            <h2>{{ wall.title }}</h2>
            <p>
              {{ wall.desc }}
            </p>
          </v-col>
          <v-col cols="12" md="6">
            <v-img :src="store.getMediaUrl(wall?.image?.data?.attributes.url)" width="100%" height="400px" cover></v-img
          ></v-col>
        </v-row>
      </v-container>
    </div>
    <div class="gallery">
      <v-container>
        <div class="gallery-cover" v-if="walls?.data?.attributes.gallery.data">
          <div class="img-cover" v-for="(image, index) in walls?.data?.attributes.gallery.data?.slice(0, 5)" :key="index">
            <v-img
              :src="store.getMediaUrl(image.attributes.url)"
              width="100%"
              height="150px"
              cover
              class="mb-4"
              @click="showGallery(index, walls?.data?.attributes.gallery.data)"
            ></v-img>
          </div>
        </div>
      </v-container>
      <client-only>
        <vue-easy-lightbox :visible="isVisible" :imgs="images" :index="imgIndex" @hide="onHide"></vue-easy-lightbox>
      </client-only>
    </div>
  </section> -->
</template>

<script setup lang="ts">
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

/* const { data: walls, refresh: refreshReviews } = await useAsyncData("sliding-wall", () =>
  findOne<any>("sliding-wall", {
    populate: {
      gallery: true,
      offer: {
        populate: ["image"],
      },
    },
  })
); */

/* let wallsD: Ref<any> = ref({}); */

const { data: walls, pending, error, refresh } = await useFetch(url + "/sliding-wall", {});

const banner: Ref<any> = ref({
  title: walls.value?.data?.attributes?.title,
  desc: walls.value?.data?.attributes?.desc,
  btns: [{ title: "Kontaktovať", link: localePath("/"), color: "primary" }],
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
    console.log(obj);

    return {
      text: obj.id,
      src: store.getMediaUrl(obj.attributes.url),
    };
  });

  images.value = result;

  imgIndex.value = index;

  console.log("result", result);
  console.log("result", images.value);

  onShow();
  /* gallery.silentbox.openOverlay(item, index); */
}

/* const getWalls = async () => {
  wallsD.value = await $fetch(url + "/sliding-wall", {
    method: "GET",
  });
}; */

onMounted(async () => {
  /*  getWalls(); */
  await nextTick();
  console.log("walls", walls.value);
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
