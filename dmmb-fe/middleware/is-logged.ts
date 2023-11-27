export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useStrapiUser()

  const { $i18n } = useNuxtApp();
   let locale = $i18n.locale.value === $i18n.defaultLocale ? '' : '/' + $i18n.locale.value;

  console.log("tu som");


   if (user.value) {
    useCookie('redirect', { path: '/' }).value = to.fullPath
    return navigateTo(locale +'/')
  }
})