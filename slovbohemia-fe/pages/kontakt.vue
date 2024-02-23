<template>
  <PartialsBanner :data="banner"></PartialsBanner>
  <section class="contact">
    <v-container>
      <div class="contact-cover">
        <v-row>
          <v-col cols="12" md="6">
            <h2 class="h2 mb-6">Kontaktné údaje</h2>
            <v-list bg-color="transparent" density="compact" color="grey-10" class="mb-4">
              <v-list-item base-color="grey-10" color="grey-10" class="mb-2 pl-0">
                <template v-slot:prepend>
                  <v-icon icon="mdi-map-marker-outline"></v-icon>
                </template>
                <v-list-item-title>Družstevná 4, 031 01, <br />Liptovský Mikuláš</v-list-item-title>
              </v-list-item>
              <v-list-item base-color="grey-10" color="grey-10" class="mb-2 pl-0">
                <template v-slot:prepend>
                  <v-icon icon="mdi-phone"></v-icon>
                </template>
                <v-list-item-title>+421 905 346724</v-list-item-title>
              </v-list-item>
              <v-list-item base-color="grey-10" color="grey-10" class="pl-0">
                <template v-slot:prepend>
                  <v-icon icon="mdi-email-outline"></v-icon>
                </template>
                <v-list-item-title>slovbohemia@slovbohemia.sk</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-form>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    :label="t('contact.form.fullName')"
                    variant="solo"
                    :rounded="0"
                    hide-details="auto"
                    flat
                    required
                    :rules="[(v: any) => !!v || 'Meno je povinné']"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    :label="t('contact.form.email')"
                    variant="solo"
                    :rounded="0"
                    hide-details="auto"
                    flat
                    required
                    :rules="[
                    (v: any) => !!v || 'E-mail je povinný',
                    (v: any) => /.+@.+\..+/.test(v) || 'E-mail musí byť platný',
                  ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    :label="t('contact.form.text')"
                    variant="solo"
                    :rounded="0"
                    hide-details="auto"
                    flat
                    rows="2"
                    required
                    :rules="[(v: any) => !!v || t('contact.form.rules.required')]"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-checkbox
                    :label="t('contact.form.agree')"
                    color="primary"
                    value="agree"
                    density="compact"
                    hide-details="auto"
                    :rules="[(v: any) => !!v || t('contact.form.rules.requiredAgree')]"
                  ></v-checkbox>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="12">
                  <v-btn type="submit" class="mt-2 ml-auto d-block w-100" color="primary">{{ t("contact.form.submit") }}</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
          <v-col>
            <GoogleMap
              api-key="AIzaSyDzsvWr8eGPYF4RQqavfNmuMJuu0HpSbqw"
              style="width: 100%; height: 100%"
              :center="{ lat: 49.08187605869418, lng: 19.6253826469723 }"
              :zoom="15"
            >
              <Marker :options="{ position: { lat: 49.08187605869418, lng: 19.62538264697 } }">
                <InfoWindow>
                  <div id="content">
                    <p>Slovbohemia</p>
                  </div>
                </InfoWindow>
              </Marker>
            </GoogleMap>
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
const store = useIndexStore();

const { findOne, find } = useStrapi();
const client = useStrapiClient();
const user = useStrapiUser();
const { fetchUser } = useStrapiAuth();
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";

const banner: Ref<any> = ref({
  title: "Kontakt",
  desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  btns: [],
  slides: [{ img: "/images/slider.jpg" }],
  maxWidth: "920px",
});

/* const prices: any[] = reactive([
  { title: "1 deň", desc: "Členstvo platí 1 deň od zakúpenia", price: "3" },
  { title: "1 mesiac", desc: "Členstvo platí 1 mesiac od zakúpenia", price: "10" },
  { title: "Polrok", desc: "Členstvo platí 6 mesiacov od zakúpenia", price: "40" },
  { title: "Rok", desc: "Členstvo platí 12 mesiacov od zakúpenia", price: "70" },
]); */

onMounted(async () => {
  store.setTitle(t("home.title"));
  console.log(store.title);
});
</script>
<style lang="scss">
.contact {
  .v-container {
    max-width: 880px;
  }
  .contact-cover {
    background: $grey-3;
    padding: 24px 35px;
    border-radius: 32px;
    .v-list-item {
      &::deep(.v-list-item__prepend) {
        margin-right: 16px;
      }
    }
    .v-list-item__prepend {
      justify-content: flex-start;
      display: inline-block;
      margin-right: 10px;
    }
    .v-icon {
      font-size: 28px;
      opacity: 1;
    }
    .v-list-item-title {
      font-size: 22px;
      font-weight: 500;
      line-height: 27px;
    }
    .v-text-field {
      border: 2px solid #b0c9e9;
      opacity: 1;
    }
    .v-label {
      color: #585858;
      opacity: 1;
    }
    .mapdiv {
      border-radius: 32px;
    }
  }
}
</style>
