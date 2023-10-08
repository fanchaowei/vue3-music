import setupLazyLoadImage from './lazyLoadImage'
import type { App } from 'vue'

export function setupPlugins(app: App) {
  setupLazyLoadImage(app)
}
