<template>
  <PartialsBanner :data="banner" />
  <section class="offer">
    <v-container>
      <div class="text-center mb-0 mb-sm-12">
        <h2 class="h1">{{ sink?.data?.attributes.title }}</h2>
        <p>{{ sink?.data?.attributes.info }}</p>
      </div>
    </v-container>

    <div class="gallery">
      <v-container>
        <div
            class="gallery-cover"
            v-if="sink?.data?.attributes.gallery?.data?.length"
        >
          <div
              class="img-cover"
              v-for="(image, index) in sink.data.attributes.gallery.data.slice(0, 5)"
              :key="image.id"
          >
            <v-img
                :src="store.getMediaUrl(image.attributes.url)"
                width="100%"
                height="150px"
                cover
                class="mb-4"
                @click="showGallery(index, sink.data.attributes.gallery.data)"
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
import type {StrapiData, StrapiDataItem, StrapiImage, StrapiResponse} from "@/types/strapi";
import type {Banner, LightboxImage, SinkResponse} from "~/types";


const { locale, t } = useI18n();
const localePath = useLocalePath();
const store = useIndexStore();
const url = useStrapiUrl();

const isVisible = ref(false);
const imgIndex = ref(0);
const images = ref<LightboxImage[]>([]);

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

const { data: sink, pending, error, refresh } = await useFetch<StrapiResponse<SinkResponse>>(
    url + "/sink-top?" + query
);

// ------------------ Banner ------------------
const banner = ref<Banner>({
  title: "Umývadlové dosky",
  desc: "",
  btns: [{ title: "Kontaktovať", link: localePath("/kontakt"), color: "primary" }],
  slides: [{ img: "/images/offer-3.jpg" }],
  maxWidth: "790px",
});

// ------------------ Methods ------------------
const onShow = () => (isVisible.value = true);
const onHide = () => (isVisible.value = false);

function showGallery(index: number, imgs: StrapiDataItem<LightboxImage[]>[]) {
  images.value = imgs.map((obj) => ({
    text: obj.id,
    src: store.getMediaUrl(obj.attributes.url),
  }));

  imgIndex.value = index;
  onShow();
}

onMounted(() => {
  console.log("sink data:", sink.value);
});
</script>
