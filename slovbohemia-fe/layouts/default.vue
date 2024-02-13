<template>
  <div>
    <PartialsMainHeader />

    <main v-if="!!$slots.default" class="py-0">
      <slot name="default" />
      <v-snackbar v-model="snackbar.visible" :color="snackbar.color" location="left bottom">
        {{ snackbar.text }}

        <template v-slot:actions>
          <v-btn icon @click="snackbar.visible = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </main>

    <PartialsMainFooter />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useIndexStore } from "@/stores/";
const store = useIndexStore();

const { snackbar } = storeToRefs(store);
</script>
