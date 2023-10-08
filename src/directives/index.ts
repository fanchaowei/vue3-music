import setupLoadingDirective from './loading'
import type { App } from 'vue'

export function setupDirective(app: App) {
  setupLoadingDirective(app)
}
