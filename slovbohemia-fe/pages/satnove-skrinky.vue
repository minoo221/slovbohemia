<template>
  <PartialsBanner :data="banner"></PartialsBanner>

  <!-- BENEFITS -->
  <section class="benefits">
    <v-container>
      <h2 class="h1 text-uppercase">Zariaďujú</h2>
      <p class="desc mb-12">
        Šatňové skrinky umožňujú estetickým a funkčným spôsobom zariadiť:
      </p>
      <v-row class="justify-center">
        <v-col
            cols="12"
            md="4"
            class="px-8 text-center"
            v-for="(item, index) in usages"
            :key="index"
        >
          <v-img
              width="90px"
              contain
              :src="item.img"
              position="center"
              class="mx-auto mb-8"
          />
          <span class="text-grey-6">{{ item.desc }}</span>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <!-- WARDROBES -->
  <section class="wardrobes">
    <v-container>
      <div
          class="wardrobe-item"
          v-for="wardrobe in wardrobes?.data"
          :key="wardrobe.id"
      >
        <v-row>
          <v-col cols="12" md="6" class="pt-4">
            <h2 class="mb-8">{{ wardrobe.attributes.title }}</h2>
            <h3 class="mb-4 text-uppercase">Zariadenie</h3>
            <ul class="pl-6">
              <li
                  v-for="device in wardrobe.attributes.items"
                  :key="device.id"
              >
                {{ device.item }}
              </li>
            </ul>
          </v-col>

          <v-col cols="12" md="6">
            <v-img
                :src="store.getMediaUrl(wardrobe.attributes.image.data?.attributes.url)"
                height="400px"
                contain
            />
          </v-col>

          <v-col cols="12">
            <h3 class="mb-4 text-uppercase">Technické údaje</h3>
            <div
                class="parameters v-table"
                v-dompurify-html="wardrobe.attributes.parameters"
            ></div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { useIndexStore } from "@/stores/";
import type { StrapiResponse, StrapiData } from "@/types/strapi";
import type { Banner, Usage, Wardrobe, WardrobeImage, WardrobeItem } from "@/types/index";


// --- Composables ---
const { t } = useI18n();
const localePath = useLocalePath();
const store = useIndexStore();
const url = useStrapiUrl();

// --- Banner ---
const banner: Ref<Banner> = ref({
  title: "Šatňové kabínky",
  desc: "Skrine sú vyrobené v zostavách. Ich počet a typ je ľubovolný. Ponúkame možnosť výroby skriniek podľa potrieb zákazníka, prispôsobením sa požiadavkám priestoru. Nadštardardné požiadavky na použité materiály tam, kde sa nachádza voda, vyžadujú použitie materiálov výnimočnej kvality. Systém šatňových skríň PBM je založený na použití vysokotlakových laminovaných dosiek HPL (high-pressure laminate). Použitie tohto typu dosiek spolu s vynikajúcou technikou vytvára riešenie pre spoľahlivú a dlhodobú trvanlivosť. V miestnostiach, kde existuje len malá koncentrácia vodných pár, je možné použiť drevotrieskovú dosku. Technológia výroby skriniek SLOVBOHEMIA navrhuje také riešenia, ktoré budú poskytovať mnoho rokov spoľahlivej prevádzky a trvanlivosti vzhľadu.",
  btns: [{ title: "Kontaktovať", link: localePath("/"), color: "primary" }],
  slides: [{ img: "/images/offer-2.jpg" }],
  maxWidth: "790px",
});

// --- Usages ---
const usages: Ref<Usage[]> = ref([
  { img: "/images/employee.png", desc: "šatne pre zamestnancov (zamestnanecké skrinky)" },
  { img: "/images/pool.png", desc: "kúpaliská, bazény (bazénové skrinky)" },
  { img: "/images/sports-2.png", desc: "všetky druhy športových zariadení (šatňové skrinky)" },
  { img: "/images/dumbell.png", desc: "objekty typu fitness (šatňové skrinky, trezorové skrinky)" },
  { img: "/images/knowledge-1.png", desc: "školy (šatňové skrinky)" },
]);

// --- Fetch Wardrobes ---
const { data: wardrobes } = await useFetch<StrapiResponse<Wardrobe>>(url + "/wardrobes", {
  query: { populate: "*" },
});

// --- Mount ---
onMounted(() => {
  store.setTitle(t("home.title"));
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
