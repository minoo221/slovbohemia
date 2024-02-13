<template>
  <div class="info">
    <div class="title-cover align-center justify-center">
      <div class="content-center" :style="{ 'max-width': data.maxWidth }">
        <h1>{{ data.title }}</h1>
        <p>
          {{ data.desc }}
        </p>
        <div class="d-flex justify-center" v-if="data.btns.length">
          <v-btn class="mx-2 px-8" v-for="(btn, index) in data.btns" :key="index" :color="btn.color" link :to="btn.link">
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
    >
      <SwiperSlide v-for="(slide, index) in data.slides" :key="index">
        <div class="img-cover">
          <img :src="slide.img" />
        </div>
      </SwiperSlide>
    </Swiper>
    <div className="swiper-custom-pagination"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  data: any;
}>();
</script>

<style lang="scss" scoped>
.info {
  position: relative;
  z-index: 4;
  min-height: 480px;
  .title-cover {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 12;
    h1 {
      font-size: 72px;
      text-transform: uppercase;
    }
  }
  .content-center {
    text-align: center;
    position: relative;
    z-index: 12;
    max-width: 560px;
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
  }
  .swiper {
    background: #fff;
    height: 100%;
    position: relative;
    overflow: initial;

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
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        @media (max-width: 960px) {
          height: 200px;
        }
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
