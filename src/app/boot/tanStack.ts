import { QueryClient, VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query'
import { boot } from 'quasar/wrappers'

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient: new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity
      }
    }
  }),
  queryClientConfig: {
    defaultOptions: {

      queries: {
        staleTime: Infinity,
        refetchOnWindowFocus: false
      }
    }
  }
}
export default boot(({ app }) => {
  app.use(VueQueryPlugin, vueQueryPluginOptions)
})
