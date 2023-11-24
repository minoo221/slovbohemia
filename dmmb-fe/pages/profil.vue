<template>
  <v-container>
    <div class="table-cover">
      <v-table>
        <tbody>
          <!-- <tr v-for="item in desserts" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.calories }}</td>
          </tr> -->
          <tr>
            <td>
              <strong>{{ t("profile.username") }}</strong>
            </td>
            <td>{{ userData?.username }}</td>
          </tr>
          <tr>
            <td>
              <strong>{{ t("profile.email") }}</strong>
            </td>
            <td>{{ userData?.email }}</td>
          </tr>
          <tr>
            <td>
              <strong>{{ t("profile.subscribeUntil") }}</strong>
            </td>
            <td>{{ $dayjs(userData?.subscribedUntil).format("D. M. YYYY") }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </v-container>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const emit = defineEmits(["title"]);
import { useIndexStore } from "@/stores/";
const store = useIndexStore();
const route = useRoute();

const client = useStrapiClient();
const user = useStrapiUser();
const { fetchUser } = useStrapiAuth();

const userData = await fetchUser();

onMounted(async () => {
  store.setTitle(t("profile.title"));
  console.log(store.title);

  console.log("userData", userData);
});
</script>

<style scoped lang="scss">
.table-cover {
  max-width: 680px;
  margin: 0 auto;
}
</style>
