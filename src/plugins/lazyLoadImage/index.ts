import lazyPlugin from 'vue3-lazy'
import defaultImage from '@/assets/images/default.png'
import type { App } from 'vue'

export default function setupLazyLoadImage(app: App) {
  app.use(lazyPlugin, {
    loading: defaultImage,
  })
}
