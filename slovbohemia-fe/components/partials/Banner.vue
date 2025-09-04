<template>
  <div class="info" v-resize="onResize" :style="{ height: titleCoverHeight + 25 + 'px' }">
    <div class="title-cover align-center justify-center">
      <div class="content-center" :style="{ 'max-width': data.maxWidth }" ref="titleCover">
        <h1>{{ data.title }}</h1>
        <p>
          {{ data.desc }}
        </p>
        <div class="d-flex justify-center flex-column flex-sm-row" v-if="data.btns.length">
          <v-btn class="mx-2 px-8 mb-4" v-for="(btn, index) in data.btns" :key="index" :color="btn.color" link :to="btn.link">
            {{ btn.title }}
          </v-btn>
        </div>
      </div>
    </div>
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectFade, SwiperNavigation, SwiperPagination]"
      :loop="true"
      :pagination="{
        clickable: true,
      }"
      :slidesPerView="1"
      :autoplay="{
        delay: 4500,
        disableOnInteraction: false,
      }"
      :effect="'fade'"
      :height="titleCoverHeight"
    >
      <SwiperSlide v-for="(slide, index) in data.slides" :key="index">
        <div class="img-cover" :style="{ height: titleCoverHeight + 25 + 'px' }">
          <img :src="slide.img" />
        </div>
      </SwiperSlide>
    </Swiper>
    <div className="swiper-custom-pagination"></div>
  </div>
</template>

<script setup lang="ts">
import type {Banner} from "~/types";

defineProps<{
  data: Banner;
}>();

const titleCover: Ref<HTMLElement | null> = ref(null);
const titleCoverHeight: Ref<number> = ref(0);
const route = useRoute();

onMounted(() => {
  setTimeout(() => {
    onResize();
  }, 1200);

});

const onResize = () => {
  console.log("height", titleCover.value.clientHeight);

  titleCoverHeight.value = titleCover.value.clientHeight;
};
</script>

<style lang="scss" scoped>
.info {
  position: relative;
  z-index: 4;
  min-height: 480px;
  @media (max-width: 1250px) {
    min-height: 520px;
  }
  @media (max-width: 960px) {
    min-height: 360px;
  }
  .title-cover {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    z-index: 12;
    padding: 0 15px;
    h1 {
      font-size: 72px;
      text-transform: uppercase;
      @media (max-width: 960px) {
        font-size: 48px;
      }
      @media (max-width: 960px) {
        font-size: 38px;
      }
    }
  }
  .content-center {
    text-align: center;
    position: relative;
    z-index: 12;
    max-width: 560px;
    min-height: 480px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (max-width: 560px) {
      max-width: 100%;
    }
  }
  &--large {
    .content-center {
      max-width: 870px;
    }
  }
  h1 {
    color: #fff;
    margin-bottom: 11px;
  }
  p {
    color: #fff;
    font-size: 22px;
    margin-bottom: 24px;
    @media (max-width: 960px) {
      font-size: 18px;
    }
  }
  .swiper {
    background: #fff;
    /* height: 100%; */
    position: relative;
    overflow: initial;
    min-height: 480px;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }
    /* padding-bottom: 50px; */
    .img-cover {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 480px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &:deep(.swiper-pagination) {
      bottom: -60px;
      z-index: 20;
      .swiper-pagination-bullet {
        background: transparent;
        opacity: 1;
        width: 18px;
        height: 18px;
        border: 2px solid $grey-9;
        &-active {
          background: $secondary;
          border: 2px solid $secondary;
        }
      }
    }
  }
}
</style>
