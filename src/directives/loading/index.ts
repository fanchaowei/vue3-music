import { createApp } from 'vue'
import type { Directive, DirectiveHook, ComponentPublicInstance, DirectiveBinding, App } from 'vue'
import Loading from './loading.vue'

interface HTMLElementEx extends HTMLElement {
  instance?: ComponentPublicInstance
}

const mounted: DirectiveHook = (el: HTMLElementEx, binding: DirectiveBinding) => {
  const app = createApp(Loading)
  const instance = app.mount(document.createElement('div'))
  el.instance = instance

  if (binding.value) {
    append(el)
  }
}

const updated: DirectiveHook = (el: HTMLElementEx, binding: DirectiveBinding) => {
  if (binding.oldValue !== binding.value) {
    binding.value ? append(el) : remove(el)
  }
}

const append = (el: HTMLElementEx) => {
  el.appendChild(el.instance?.$el)
}
function remove(el: HTMLElementEx) {
  el.removeChild(el.instance?.$el)
}

const loadingDirective: Directive = {
  mounted,
  updated,
}

function setupLoadingDirective(app: App) {
  app.directive('loading', loadingDirective)
}

export default setupLoadingDirective
