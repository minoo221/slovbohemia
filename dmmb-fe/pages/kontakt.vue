<template>
  <section class="contact">
    <v-container>
      <v-row class="mb-12">
        <v-col cols="12" md="6">
          <h2 class="mb-4">Napíšte nám</h2>
          <v-form ref="form" @submit.prevent="sendForm()">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.name"
                  :label="t('contact.form.fullName')"
                  variant="solo"
                  required
                  :rules="[(v: any) => !!v || t('contact.form.rules.required')]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="formData.tel" :label="t('contact.form.tel')" variant="solo"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.email"
                  :label="t('contact.form.email')"
                  variant="solo"
                  required
                  :rules="[
                    (v: any) => !!v || t('contact.form.rules.required'),
                    (v: any) => /.+@.+\..+/.test(v) || t('contact.form.rules.email'),
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.subject"
                  :label="t('contact.form.subject')"
                  variant="solo"
                  required
                  :rules="[(v: any) => !!v || t('contact.form.rules.required')]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="formData.message"
                  :label="t('contact.form.text')"
                  variant="solo"
                  required
                  :rules="[(v: any) => !!v || t('contact.form.rules.required')]"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="formData.agree"
                  :label="t('contact.form.agree')"
                  color="primary"
                  value="agree"
                  density="compact"
                  :rules="[(v: any) => !!v || t('contact.form.rules.requiredAgree')]"
                ></v-checkbox>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" md="3" class="ml-auto d-flex">
                <v-btn
                  type="submit"
                  append-icon="mdi-send"
                  class="mt-2 ml-auto"
                  :loading="loadingSend"
                  :disabled="loadingSend"
                  color="primary"
                  >{{ t("contact.form.submit") }}</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-col>
        <v-col cols="12" md="6" offset-md="0">
          <h2 class="mx-4">Kontakt</h2>
          <v-list bg-color="transparent" color="white" class="mb-6">
            <v-list-item density="comfortable">
              <template v-slot:prepend>
                <v-icon color="primary" class="mr-2">mdi-map-marker</v-icon>
              </template>
              <v-list-item-title
                >{{ contact?.data.attributes.company.address }}, <br />
                {{ contact?.data.attributes.company.zip }}, {{ contact?.data.attributes.company.city }} <br />
                {{ contact?.data.attributes.company.country }}</v-list-item-title
              >
            </v-list-item>
            <v-list-item density="comfortable">
              <template v-slot:prepend>
                <v-icon color="primary" class="mr-2">mdi-phone</v-icon>
              </template>
              <v-list-item-title>{{ contact?.data.attributes.tel }}</v-list-item-title>
            </v-list-item>
            <v-list-item density="comfortable">
              <template v-slot:prepend>
                <v-icon color="primary" class="mr-2">mdi-email</v-icon>
              </template>
              <v-list-item-title>{{ contact?.data.attributes.email }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <h4 class="mx-4">IČO:</h4>
          <v-list bg-color="transparent" color="white" class="pt-0 mb-6">
            <v-list-item density="comfortable">
              <v-list-item-title>{{ contact?.data.attributes.company.ico }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <h4 class="mx-4">DIČ:</h4>
          <v-list bg-color="transparent" color="white" class="pt-0 mb-6">
            <v-list-item density="comfortable">
              <v-list-item-title>{{ contact?.data.attributes.company.dic }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-col cols="12">
          <h2 class="mx-4 mb-4">Prevádzkovateľ</h2>
          <v-row>
            <v-col cols="12" md="4">
              <h3 class="mx-4">Meno:</h3>

              <v-list bg-color="transparent" color="white" class="mb-6">
                <v-list-item density="comfortable">
                  <v-list-item-title>{{ contact?.data.attributes.name }}</v-list-item-title>
                </v-list-item>
              </v-list>

              <h3 class="mx-4">Sídlo:</h3>
              <v-list bg-color="transparent" color="white" class="mb-6">
                <v-list-item density="comfortable">
                  <template v-slot:prepend>
                    <v-icon color="primary" class="mr-2">mdi-map-marker</v-icon>
                  </template>
                  <v-list-item-title
                    >{{ contact?.data.attributes.addressCompany.address }}, <br />{{
                      contact?.data.attributes.addressCompany.zip
                    }}
                    {{ contact?.data.attributes.addressCompany.city }}
                    <br />
                    {{ contact?.data.attributes.addressCompany.country }}</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" md="4">
              <h3 class="mx-4">IČO:</h3>
              <v-list bg-color="transparent" color="white" class="mb-6">
                <v-list-item density="comfortable">
                  <v-list-item-title>{{ contact?.data.attributes.ico }}</v-list-item-title>
                </v-list-item>
              </v-list>

              <h3 class="mx-4">DIČ:</h3>
              <v-list bg-color="transparent" color="white" class="mb-6">
                <v-list-item density="comfortable">
                  <v-list-item-title>{{ contact?.data.attributes.dic }}</v-list-item-title>
                </v-list-item>
              </v-list>

            <h3 class="mx-4">IČ DPH:</h3>
              <v-list bg-color="transparent" color="white" class="mb-6">
                <v-list-item density="comfortable">
                  <v-list-item-title>{{ contact?.data.attributes.icDph }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-col>
      </v-row> -->
    </v-container>
  </section>
  >
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
import type { ContactInfo } from "~/types";
const emit = defineEmits(["title"]);
import { useIndexStore } from "@/stores/";
const store = useIndexStore();

const formData: any = reactive({});
const form: Ref<any> = ref(null);
const loadingSend: Ref<boolean> = ref(false);

const { create, find } = useStrapi();

const { data: contact, refresh } = await useAsyncData("contact-information", () =>
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
        tel: formData.tel,
        email: formData.email,
        subject: formData.subject,
        message: formData.text,
      });
      store.showSuccess(t("contact.form.responses.success"));
      await form.value.reset();
    } catch (e) {
      console.log(e);
      store.showError(t("contact.form.responses.error"));
    } finally {
      loadingSend.value = false;
    }
  }
};

onMounted(() => {
  store.setTitle(t("contact.title"));
  console.log("contact", contact);
});
</script>
<style scoped lang="scss">
.show-gallery {
  position: absolute;
  right: 5px;
  bottom: 5px;
}

.contact {
  .v-list-item-title {
    font-size: 18px;
    white-space: initial;
    text-overflow: none;
  }
}
</style>
