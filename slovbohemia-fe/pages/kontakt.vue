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
                <v-list-item-title
                  >{{ contact?.data.attributes.company?.address + "," }} {{ contact?.data.attributes.company?.zip + "," }}
                  <br />{{ contact?.data.attributes.company?.city }}</v-list-item-title
                >
              </v-list-item>
              <v-list-item base-color="grey-10" color="grey-10" class="pl-0">
                <template v-slot:prepend>
                  <v-icon icon="mdi-email-outline"></v-icon>
                </template>
                <v-list-item-title>
                  EMAIL:
                  <a :href="`mailto:${contact.data?.attributes.email}`" class="contact-link">{{
                    contact.data?.attributes.email
                  }}</a>
                </v-list-item-title>
              </v-list-item>
              <v-list-item base-color="grey-10" color="grey-10" class="pl-0">
                <template v-slot:prepend>
                  <v-icon icon="mdi-phone-outline"></v-icon>
                </template>
                <v-list-item-title
                  >TEL:
                  <a :href="`tel:${contact.data?.attributes.tel}`" class="contact-link">{{ contact.data?.attributes.tel }}</a>
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
                    :rules="[(v: any) => !!v || 'Meno je povinné']"
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
                    :rules="[
                    (v: any) => !!v || 'E-mail je povinný',
                    (v: any) => /.+@.+\..+/.test(v) || 'E-mail musí byť platný',
                  ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.email"
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
                  <v-btn type="submit" class="mt-2 ml-auto d-block w-100" color="primary">Odoslať</v-btn>
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

import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";

const banner: Ref<any> = ref({
  title: "Kontakt",
  desc: "Ak máte akékoľvek otázky, kedykoľvek nás kontaktujte.",
  btns: [],
  slides: [{ img: "/images/offer-2.jpg" }],
  maxWidth: "920px",
});

const formData: any = reactive({});
const form: Ref<any> = ref(null);
const loadingSend: Ref<boolean> = ref(false);

const { create, find } = useStrapi();
const { data: contact, refresh: refreContact } = await useAsyncData("contact-information", () =>
  find<any>("contact-information", { populate: "*" })
);

const sendForm = async () => {
  const { valid } = await form.value.validate();
  console.log(valid);
  console.log(form.value);

  if (valid) {
    loadingSend.value = true;
    try {
      await create<any>("send-contact", {
        name: formData.name,
        email: formData.email,
        message: formData.text,
      });
      store.showSuccess("Kontaktný formulár bol úspešne odoslaný");
      await form.value.reset();
    } catch (e) {
      console.log(e);
      store.showError(t("NIekde sa stala chyba. Skúste to prosím znova"));
    } finally {
      loadingSend.value = false;
    }
  }
};

onMounted(async () => {
  store.setTitle(t("home.title"));
  console.log(store.title);
});
</script>
<style lang="scss">
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
