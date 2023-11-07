<template>
  <div>
    <section class="museum-detail">
      <v-container>
        <div class="museum-images mb-8">
          <v-row>
            <v-col cols="12" md="5">
              <div class="rotate-gallery-cover" ref="rotateGallery">
                <div
                  id="rotate-gallery"
                  class="cloudimage-360"
                  :data-image-list-x="'[' + thumbImage + ']'"
                  :data-amount-x="thumbImage.length"
                  data-transformation="w=400&h=200&func=fit"
                  data-play-once
                  data-autoplay
                  data-spin-reverse
                  data-magnifier="2.4"
                  data-fullscreen
                  data-bottom-circle-offset="30"
                ></div>
              </div>
            </v-col>
            <v-col cols="12" md="7">
              <div class="swiper-cover" :style="{ height: swiperHeight + 'px' }">
                <!-- :autoplay="{
                delay: 8000,
              }" -->
                <!-- :slidesPerGroup="2" -->
                <Swiper
                  :modules="[SwiperAutoplay, SwiperNavigation, SwiperGrid]"
                  :loop="false"
                  :navigation="true"
                  :slidesPerView="2"
                  :grid="{
                    rows: 2,
                  }"
                  :spaceBetween="21"
                >
                  <SwiperSlide v-for="(item, index) in galleryImages" :key="item.id">
                    <div class="img-cover" @click="showGallery(index)">
                      <img :src="item.smallImg" />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="text">
          <v-container>
            <client-only>
              <p v-html="museum?.data.attributes.body"></p>
            </client-only>
          </v-container>
        </div>
      </v-container>
      <client-only>
        <vue-easy-lightbox :visible="isVisible" :imgs="images" :index="imgIndex" @hide="onHide"></vue-easy-lightbox>
      </client-only>
    </section>
  </div>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const emit = defineEmits(["title"]);
import { useIndexStore } from "@/stores/";
const store = useIndexStore();
const route = useRoute();

definePageMeta({
  middleware: "auth",
});

const isVisible: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(false);
const rotateGallery: Ref<any> = ref(null);
const swiperHeight: Ref<number> = ref(0);
const imgIndex: Ref<number> = ref(0);
const images: Ref<any> = ref([]);

const { find, findOne } = useStrapi();

const { data: museum, refresh: refreshPrices } = await useAsyncData("lamps", () => findOne<any>("lamps", route.params.subslug));

useHead({
  title: museum.value?.data.attributes.title,
  script: [{ src: "https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/latest/js-cloudimage-360-view.min.js" }],
});

/* definePageMeta({
  name: "test2",
}); */

const onShow = () => {
  isVisible.value = true;
};

const onHide = () => {
  isVisible.value = false;
};

const thumbImage = computed(() => {
  return (museum.value?.data.attributes.rotateGallery.data || []).map(
    (image: any) => '"' + store.getMediaUrl(image.attributes.formats.large.url) + '"'
  );
});

const galleryImages = computed(() => {
  return (museum.value?.data.attributes.gallery.data || []).map((obj: any) => {
    /* console.log(obj); */
    /* return obj.id; */
    return {
      id: obj.id,
      smallImg: store.getMediaUrl(obj.attributes.formats.small.url),
      largeImg: store.getMediaUrl(obj.attributes.url),
    };
  });
});

function showGallery(index: number) {
  /* images.value = apartments[index].value.gallery; */
  console.log(images.value);
  console.log(galleryImages.value);

  const result = galleryImages.value.map((obj: any) => {
    console.log(obj);

    return {
      text: obj.id,
      src: obj.largeImg,
    };
  });

  images.value = result;

  imgIndex.value = index;

  console.log("result", result);
  console.log("index", index);

  onShow();
  /* gallery.silentbox.openOverlay(item, index); */
}

onMounted(async () => {
  store.setTitle(museum.value?.data.attributes.title);
  console.log(store.title);
  console.log("route", route);
  console.log("museum", galleryImages.value);
  await window.CI360.init();
  await setTimeout(() => {
    console.log(rotateGallery.value.clientHeight);
    swiperHeight.value = rotateGallery.value.clientHeight;
  }, 700);
});
</script>
<style scoped lang="scss">
.museum-detail {
  .v-container {
    max-width: 1120px;
  }
  #rotate-gallery {
    background: $white;
  }
  .swiper-cover {
    height: 600px;
  }
  .swiper {
    width: 100%;
    height: 100%;
    background: $white;
    &:deep {
      .swiper-button-prev,
      .swiper-button-next {
        color: $primary-100;
      }
    }
  }

  .swiper-slide {
    height: calc((100% - 30px) / 2) !important;
    display: flex;
    justify-content: center;
    align-items: center;
    .img-cover {
      width: 100%;
      height: 100%;
      background: #fff;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }

  /*  .swiper-slide {
    width: 50%;
    flex: 0 0 50%;
    height: 50%;
    background: #fff;
    .img-cover {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  } */
}
</style>
