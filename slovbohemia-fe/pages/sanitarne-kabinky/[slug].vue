<template>
  <PartialsBanner :data="banner"></PartialsBanner>
  <section class="product-detail">
    <div class="product-gallery">
      <v-container>
        <v-row>
          <v-col cols="12" md="6" v-for="(image, index) in galleryImages">
            <v-img :src="image.smallImg" width="100%" height="350px" cover class="mb-4" @click="showGallery(index)"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="product-parameters">
      <v-container>
        <h2>Technické údaje</h2>
        <v-table>
          <tbody>
            <tr v-for="item in product?.data.attributes.parameters" :key="item.id">
              <td width="540">
                <strong>{{ item.label }}:</strong>
              </td>
              <td>{{ item.value }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-container>
    </div>
    <div class="product-colors">
      <v-container>
        <h2>Základne farby:</h2>
        <div class="d-flex">
          <div class="color-cover" v-for="color in product?.data.attributes.colors" :key="color.id">
            <div class="color" :style="{ backgroundColor: color.color }"></div>
          </div>
        </div>
      </v-container>
    </div>
    <div class="product-fittings" v-if="product?.data.attributes.standartFittings?.data">
      <v-container>
        <h2>Aplikované kovania - štandardné kovanie</h2>
        <div class="d-flex">
          <div class="img-cover" v-for="(fitting, index) in product?.data.attributes.standartFittings?.data" :key="fitting.id">
            <v-img
              :src="store.getMediaUrl(fitting.attributes.formats.small.url)"
              width="100%"
              height="100px"
              cover
              class="mb-4"
              @click="showGalleryFittings(index, product?.data.attributes.standartFittings?.data)"
            ></v-img>
          </div>
        </div>
      </v-container>
    </div>
    <div class="product-fittings" v-if="product?.data.attributes.stainlessSteelFittings?.data">
      <v-container>
        <h2>Aplikované kovania - štandardné kovanie</h2>
        <div class="d-flex">
          <div
            class="img-cover"
            v-for="(fitting, index) in product?.data.attributes.stainlessSteelFittings?.data"
            :key="fitting.id"
          >
            <v-img
              :src="store.getMediaUrl(fitting.attributes.formats.small.url)"
              width="100%"
              height="100px"
              cover
              class="mb-4"
              @click="showGalleryFittings(index, product?.data.attributes.stainlessSteelFittings?.data)"
            ></v-img>
          </div>
        </div>
      </v-container>
    </div>
    <client-only>
      <vue-easy-lightbox :visible="isVisible" :imgs="images" :index="imgIndex" @hide="onHide"></vue-easy-lightbox>
    </client-only>
  </section>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const emit = defineEmits(["title"]);
const localePath = useLocalePath();

import { useIndexStore } from "@/stores/";
const store = useIndexStore();
const route = useRoute();
const url = useStrapiUrl();

/* const { findOne } = useStrapi();

const { data: product, refresh: refreshProducts } = await useAsyncData("sanitary-cabins", () =>
  findOne<any>("sanitary-cabins", route.params.slug)
); */

const { data: product, pending, error, refresh } = await useFetch(url + "/sanitary-cabins/" + route.params.slug);

const banner: Ref<any> = ref({
  title: "Sanitárne kabínky " + product?.value?.data.attributes.title,
  btns: [{ title: "Kontaktovať", link: localePath("/"), color: "primary" }],
  slides: [{ img: "/images/sanitanre-kabinky.jpg" }],
  maxWidth: "100%",
});

const isVisible: Ref<boolean> = ref(false);
const imgIndex: Ref<number> = ref(0);
const images: Ref<any> = ref([]);

const onShow = () => {
  isVisible.value = true;
};

const onHide = () => {
  isVisible.value = false;
};
const galleryImages = computed(() => {
  return (product?.value?.data.attributes.gallery.data || []).map((obj: any) => {
    /* console.log(obj); */
    /* return obj.id; */
    return {
      id: obj.id,
      smallImg: obj.attributes.formats.small.url
        ? store.getMediaUrl(obj.attributes.formats.small.url)
        : store.getMediaUrl(obj.attributes.url),
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

function showGalleryFittings(index: number, imgs: any) {
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

onMounted(async () => {
  console.log("product", product);
});
</script>
<style scoped lang="scss">
.product-detail {
  padding-bottom: 160px;
  h2 {
    margin-bottom: 30px;
  }
  .product-gallery {
    padding: 60px 0;
    background: #f8fafc;
    margin-bottom: 52px;
  }
  .v-img {
    border-radius: 32px;
  }
  .product-parameters {
    margin-bottom: 40px;
    .v-table {
      margin-top: 40px;
      tr {
        border: none;
        &:nth-child(odd) {
          td {
            background: $grey-3;
          }
        }
      }
      td {
        padding: 10px 4px;
        border: 0;
        font-size: 22px;
        &:first-child {
          text-transform: uppercase;
        }
      }
    }
  }
}
.product-colors {
  .color-cover {
    width: 10%;
    flex: 0 0 10%;
    height: 100px;
    padding: 0 2.5px;
    .color {
      border: 1px solid $grey-9;
      border-radius: 16px;
      height: 100%;
    }
  }
}
.product-fittings {
  .img-cover {
    width: 10%;
    flex: 0 0 10%;
    height: 100px;
    padding: 0 2.5px;
    .v-img {
      border: 1px solid $grey-9;
      border-radius: 16px;
      height: 100%;
      cursor: pointer;
    }
  }
}
</style>
