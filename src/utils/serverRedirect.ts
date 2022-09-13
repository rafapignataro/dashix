export const serverRedirect = (path: string) => ({
  redirect: {
    destination: '/',
    permanent: false,
  },
  props: {}
})