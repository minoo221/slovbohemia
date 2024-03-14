<template>
  <PartialsBanner :data="banner"></PartialsBanner>
  <section class="catalog">
    <v-container class="text-center">
      <h2 class="text-uppercase mb-4">Katalóg na stiahnutie</h2>
      <v-btn color="black" link class="px-6"> Prezrieť katalóg </v-btn>
    </v-container>
  </section>
  <section class="benefits">
    <v-container>
      <h2 class="h1 text-uppercase">Zariaďujú</h2>
      <p class="desc mb-12">Šatňové skrinky umožňujú estetickým a funkčným spôsobom zariadiť:</p>
      <v-row class="justify-center">
        <v-col cols="12" md="4" class="px-8 text-center" v-for="(item, index) in usages">
          <v-img width="90px" contain :src="item.img" position="center" class="mx-auto mb-8"></v-img>
          <span class="text-grey-6">{{ item.desc }}</span>
        </v-col>
      </v-row>
    </v-container>
  </section>
  <section class="wardrobes">
    <v-container>
      <div class="wardrobe-item" v-for="item in wardrobes?.data?" :key="item.id">
        <v-row>
          <v-col cols="12" md="6" class="pt-4">
            <h2 class="mb-8">{{ item.attributes.title }}</h2>
            <h3 class="mb-4 text-uppercase">Zariadenie</h3>
            <ul class="pl-6">
              <li v-for="device in item.attributes.items" :key="device.id">
                {{ device.item }}
              </li>
            </ul>
          </v-col>
          <v-col cols="12" md="6">
            <v-img :src="store.getMediaUrl(item?.attributes.image.data?.attributes.url)" height="400px" contain></v-img
          ></v-col>
          <v-col cols="12">
            <h3 class="mb-4 text-uppercase">Technické údaje</h3>
            <div class="parameters v-table" v-dompurify-html="item?.attributes.parameters"></div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const emit = defineEmits(["title"]);
const localePath = useLocalePath();

import { useIndexStore } from "@/stores/";
import { buildVueDompurifyHTMLDirective } from "vue-dompurify-html";
const store = useIndexStore();

const { findOne, find } = useStrapi();

const isVisible: Ref<boolean> = ref(false);
const imgIndex: Ref<number> = ref(0);
const images: Ref<any> = ref([]);
const url = useStrapiUrl();

/* const { data: wardrobes, refresh: refreshWardrobes } = await useAsyncData("wardrobes", () =>
  find<any>("wardrobes", {
    populate: "*",
  })
); */

const {
  data: wardrobes,
  pending,
  error,
  refresh,
} = await useFetch(url + "/wardrobes", {
  query: { populate: "*" },
});

const banner: Ref<any> = ref({
  title: "Šatňové kabínky",
  desc: "Skrine sú vyrobené v zostavách. Ich počet a typ je ľubovolný. Ponúkame možnosť výroby skriniek podľa potrieb zákazníka, prispôsobením sa požiadavkám priestoru. Nadštardardné požiadavky na použité materiály tam, kde sa nachádza voda, vyžadujú použitie materiálov výnimočnej kvality. Systém šatňových skríň PBM je založený na použití vysokotlakových laminovaných dosiek HPL (high-pressure laminate). Použitie tohto typu dosiek spolu s vynikajúcou technikou vytvára riešenie pre spoľahlivú a dlhodobú trvanlivosť. V miestnostiach, kde existuje len malá koncentrácia vodných pár, je možné použiť drevotrieskovú dosku. Technológia výroby skriniek SLOVBOHEMIA navrhuje také riešenia, ktoré budú poskytovať mnoho rokov spoľahlivej prevádzky a trvanlivosti vzhľadu.",
  btns: [{ title: "Kontaktovať", link: localePath("/"), color: "primary" }],
  slides: [{ img: "/images/offer-2.jpg" }],
  maxWidth: "790px",
});

const usages: any[] = reactive([
  { img: "/images/employee.png", desc: "šatne pre zamestnancov (zamestnanecké skrinky),," },
  {
    img: "/images/pool.png",
    desc: "kúpaliská, bazény (bazénové skrinky),",
  },
  { img: "/images/sports-2.png", desc: "všetky druhy športových zariadení (šatňové skrinky)," },
  { img: "/images/dumbell.png", desc: "objekty typu fitness (šatňové skrinky, trezorové skrinky)," },
  { img: "/images/knowledge-1.png", desc: "školy (šatňové skrinky)." },
]);

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

onMounted(async () => {
  console.log(wardrobes.value);
});
</script>
<style scoped lang="scss">
.catalog {
  background: $secondary-1;
  padding: 50px 0;
}
.benefits {
  text-align: center;
  padding: 32px 0 45px 0;
  background: $grey-3;

  p {
    font-size: 22px;
    line-height: 27px;
    font-weight: 500;
  }
}
.wardrobes {
  ul {
    li {
      font-size: 22px;
      line-height: 27px;
      font-weight: 500;
    }
  }
  .wardrobe-item {
    margin-bottom: 130px;
  }
  .parameters {
    &:deep(table) {
      width: 100%;
      border: none;
      border-collapse: collapse;
      tr {
        &:nth-child(even) {
          th {
            background: $grey-3;
          }
          td {
            background: $grey-3;
          }
        }
        th {
          font-size: 22px;
        }
        td {
          font-size: 18px;
          padding: 12px 4px;
          text-align: center;
        }
      }
    }
  }
}
</style>
