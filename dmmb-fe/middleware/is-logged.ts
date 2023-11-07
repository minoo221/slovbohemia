export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useStrapiUser()

  console.log("tu som");


   if (user.value) {
    useCookie('redirect', { path: '/' }).value = to.fullPath
    return navigateTo('/')
  }
})