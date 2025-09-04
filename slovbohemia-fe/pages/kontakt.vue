<template>
  <PartialsBanner :data="banner"></PartialsBanner>
  <section class="contact">
    <v-container>
      <div class="contact-cover">
        <v-row>
          <v-col cols="12" md="6">
            <h2 class="h2 mb-6">Kontaktné údaje</h2>
            <v-list bg-color="transparent" density="compact" color="grey-10" class="mb-4">
              <v-list-item v-if="contactDetails.fullAddress" base-color="grey-10" color="grey-10" class="mb-2 pl-0">
                <template #prepend>
                  <v-icon icon="mdi-map-marker-outline"></v-icon>
                </template>
                <v-list-item-title v-html="contactDetails.fullAddress"></v-list-item-title>
              </v-list-item>
              <v-list-item v-if="contactDetails.email" base-color="grey-10" color="grey-10" class="pl-0">
                <template #prepend>
                  <v-icon icon="mdi-email-outline"></v-icon>
                </template>
                <v-list-item-title>
                  EMAIL:
                  <a :href="`mailto:${contactDetails.email}`" class="contact-link">{{ contactDetails.email }}</a>
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="contactDetails.tel" base-color="grey-10" color="grey-10" class="pl-0">
                <template #prepend>
                  <v-icon icon="mdi-phone-outline"></v-icon>
                </template>
                <v-list-item-title>
                  TEL:
                  <a :href="`tel:${contactDetails.tel}`" class="contact-link">{{ contactDetails.tel }}</a>
                </v-list-item-title>
              </v-list-item>
            </v-list>

            <v-form ref="form" @submit.prevent="sendForm()">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                      v-model="formData.name"
                      :label="t('contact.form.fullName')"
                      variant="solo"
                      :rounded="0"
                      hide-details="auto"
                      flat
                      required
                      :rules="[requiredRule]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                      v-model="formData.email"
                      :label="t('contact.form.email')"
                      variant="solo"
                      :rounded="0"
                      hide-details="auto"
                      flat
                      required
                      :rules="[requiredRule, emailRule]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      v-model="formData.tel"
                      :label="t('contact.form.tel')"
                      variant="solo"
                      :rounded="0"
                      hide-details="auto"
                      flat
                      required
                      :rules="[requiredRule]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                      v-model="formData.text"
                      :label="t('contact.form.text')"
                      variant="solo"
                      :rounded="0"
                      hide-details="auto"
                      flat
                      rows="2"
                      required
                      :rules="[requiredRule]"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-checkbox
                      :label="t('contact.form.agree')"
                      color="primary"
                      :rules="[requiredAgreeRule]"
                      density="compact"
                      hide-details="auto"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12">
                  <v-btn type="submit" class="mt-2 ml-auto d-block w-100" color="primary" :loading="loadingSend">Odoslať</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
          <v-col cols="12" md="6">
            <GoogleMap
                v-if="apiKey"
                :api-key="apiKey"
                style="width: 100%; height: 100%"
                :center="mapCenter"
                :zoom="15"
            >
              <Marker :options="{ position: mapCenter }">
                <InfoWindow>
                  <p>Slovbohemia Systems</p>
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
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";
import { useIndexStore } from "@/stores/";

import type { StrapiData} from "@/types/strapi";
import type { ContactInformation, ContactFormData} from "@/types/index";

const { t } = useI18n();
const store = useIndexStore();
const url = useStrapiUrl();
const { create } = useStrapi();

const config = useRuntimeConfig();
const apiKey = config.public.googleMapsApiKey as string;

const mapCenter = { lat: 49.078767218317736, lng: 19.62830030795598 };
const initialFormData: ContactFormData = { name: "", email: "", tel: "", text: "" };

const form = ref<InstanceType<typeof VForm> | null>(null);
const loadingSend = ref(false);
const formData = reactive<ContactFormData>({ ...initialFormData });

const banner: Ref<Banner> = ref({
  title: "Kontakt",
  desc: "Ak máte akékoľvek otázky, kedykoľvek nás kontaktujte.",
  btns: [],
  slides: [{ img: "/images/offer-2.jpg" }],
  maxWidth: "920px",
});

const { data: contact } = await useFetch<StrapiData<ContactInformation>>(url + "/contact-information", {
  query: { populate: "*" },
});

const contactDetails = computed(() => {
  const attrs = contact.value?.data?.attributes;
  const company = attrs?.company;
  return {
    fullAddress: company ? `${company.address}, ${company.zip},<br>${company.city}` : "",
    email: attrs?.email || "",
    tel: attrs?.tel || "",
  };
});

// --- Validácia formulára s typmi ---
const requiredRule = (v: string) => !!v || t('contact.form.rules.required');
const requiredAgreeRule = (v: boolean) => !!v || t('contact.form.rules.requiredAgree');
const emailRule = (v: string) => /.+@.+\..+/.test(v) || 'E-mail musí byť platný';

// --- Metódy ---
const sendForm = async () => {
  if (!form.value) return;

  const { valid } = await form.value.validate();
  if (valid) {
    loadingSend.value = true;
    try {
      await create("send-contact", { // Strapi composable už má typy, ale môžeme špecifikovať dáta
        name: formData.name,
        email: formData.email,
        message: formData.text, // Meno poľa v Strapi je 'message'
        tel: formData.tel,
      });
      store.showSuccess("Kontaktný formulár bol úspešne odoslaný");
      form.value.reset();
      Object.assign(formData, initialFormData); // Vyčistíme aj reaktívny objekt
    } catch (e) {
      console.error(e);
      store.showError("Niekde sa stala chyba. Skúste to prosím znova");
    } finally {
      loadingSend.value = false;
    }
  }
};

onMounted(() => {
  store.setTitle(t("home.title"));
});
</script>

<style lang="scss">
/* Štýly zostávajú nezmenené */
.contact {
  padding: 30px 0;
  .v-container {
    max-width: 880px;
  }
  .contact-cover {
    background: $grey-3;
    padding: 24px 35px;
    border-radius: 32px;
    .v-list-item {
      // Namiesto `&::deep` môžeme použiť globálny štýl alebo ponechať takto, ak funguje
      & :deep(.v-list-item__prepend) {
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
      font-size: 18px;
      font-weight: 500;
      line-height: 27px;
      white-space: initial;
    }
    .contact-link {
      color: inherit;
      text-decoration: none;
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