<template>
  <div class="loader">
    <div v-for="item in 3" :key="item" :class="`circle circle__${size} circle__${color}`"></div>
  </div>
</template>
<script setup lang="ts">
import { withDefaults, defineProps } from "vue";
export type TLoaderColor = "black" | "grey" | "white";
export type TLoaderSize = "large" | "medium" | "small";

export interface LoaderProps {
  color?: TLoaderColor;
  size?: TLoaderSize;
}

withDefaults(defineProps<LoaderProps>(), {
  color: "black",
  size: "medium",
});
</script>

<style scoped lang="scss">
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  .circle {
    animation: expand 0.75s ease-in-out infinite;
    border-radius: 50%;
    display: inline-flex;
    transform-origin: center center;
    background-color: $primary;
    &__large {
      margin: 0 20px;
      width: 16px;
      height: 16px;
    }
    &__medium {
      margin: 0 10px;
      width: 8px;
      height: 8px;
    }
    &__small {
      margin: 0 5px;
      width: 4px;
      height: 4px;
    }

    &:nth-child(1) {
    }
    &:nth-child(2) {
      animation-delay: 180ms;
    }
    &:nth-child(3) {
      animation-delay: 360ms;
    }
  }
}

@keyframes expand {
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(3);
  }
}
</style>
