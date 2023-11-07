export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useStrapiUser()

   if (!user.value || user.value?.role.id != 3) {
    useCookie('redirect', { path: '/' }).value = to.fullPath
    return navigateTo('/prihlasenie')
  }
})