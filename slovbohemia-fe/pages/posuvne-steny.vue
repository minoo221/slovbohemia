<template>
  <PartialsBanner :data="banner"></PartialsBanner>

  <section class="offer">
    <div
        v-for="(item, index) in offerItems"
        :key="item.id"
        class="offer__item"
        :class="{ 'offer__item--reversed': index % 2 === 1 }"
    >
      <v-container>
        <v-row class="align-center">
          <v-col cols="12" md="6">
            <h2>{{ item.title }}</h2>
            <p>{{ item.desc }}</p>
          </v-col>
          <v-col cols="12" md="6">
            <v-img :src="item.imgSrc" width="100%" height="400px" cover></v-img>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Galéria -->
    <div class="gallery" v-if="galleryImages.length">
      <v-container>
        <div class="gallery-cover">
          <div
              class="img-cover"
              v-for="(image, index) in galleryImages.slice(0, 5)"
              :key="image.id"
          >
            <v-img
                :src="image.smallImg"
                width="100%"
                height="150px"
                cover
                class="mb-4"
                @click="showGallery(index)"
            />
          </div>
        </div>
      </v-container>

      <client-only>
        <vue-easy-lightbox
            :visible="isVisible"
            :imgs="images"
            :index="imgIndex"
            @hide="onHide"
        />
      </client-only>
    </div>
  </section>
</template>

<script setup lang="ts">
import qs from "qs";
import { useIndexStore } from "@/stores/";
import type { StrapiData } from "@/types/strapi";
import type { Banner, OfferItem, GalleryImage } from "@/types/index";

const { t } = useI18n();
const localePath = useLocalePath();
const store = useIndexStore();
const url = useStrapiUrl();

/* ------------------ State ------------------ */
const isVisible = ref(false);
const imgIndex = ref(0);
const images = ref<{ src: string; text: number }[]>([]);

/* ------------------ API volanie ------------------ */
const query = qs.stringify(
    {
      populate: {
        gallery: true,
        offer: { populate: ["image"] },
      },
    },
    { encode: false }
);

const { data: walls } = await useFetch<StrapiData<any>>(
    url + "/sliding-wall?" + query
);

/* ------------------ Banner ------------------ */
const banner: Ref<Banner> = ref({
  title: walls.value?.data.attributes?.title || "",
  desc: walls.value?.data.attributes?.desc || "",
  btns: [{ title: "Kontaktovať", link: localePath("/kontakt"), color: "primary" }],
  slides: [{ img: "/images/offer-3.jpg" }], // môžeš spraviť dynamicky
  maxWidth: "920px",
});

/* ------------------ Ponuka ------------------ */
const offerItems = computed<OfferItem[]>(() => {
  return (walls.value?.data.attributes.offer || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    desc: item.desc,
    link: "/kontakt",
    imgSrc: store.getMediaUrl(item.image?.data?.attributes?.url),
  }));
});

/* ------------------ Galéria ------------------ */
const galleryImages = computed<GalleryImage[]>(() => {
  return (walls.value?.data.attributes.gallery?.data || []).map((obj: any) => ({
    id: obj.id,
    smallImg: store.getMediaUrl(obj.attributes.url),
    largeImg: store.getMediaUrl(obj.attributes.url),
  }));
});

/* ------------------ Lightbox ------------------ */
function showGallery(index: number) {
  images.value = galleryImages.value.map((obj) => ({
    src: obj.largeImg,
    text: obj.id,
  }));
  imgIndex.value = index;
  isVisible.value = true;
}

function onHide() {
  isVisible.value = false;
}
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

    &--reversed {
      background: $grey-3;

      .v-row {
        flex-direction: row-reverse;
      }
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
