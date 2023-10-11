import { createApp } from 'vue'
import type { Directive, DirectiveHook, ComponentPublicInstance, DirectiveBinding, App } from 'vue'
import Loading from './loading.vue'
import { addClass, removeClass } from '@/composables'

interface HTMLElementEx extends HTMLElement {
  instance?: ComponentPublicInstance
}
interface LoadingInstance extends ComponentPublicInstance {
  setTitle: (title: string) => void
}

const mounted: DirectiveHook = (el: HTMLElementEx, binding: DirectiveBinding) => {
  const app = createApp(Loading)
  const instance = app.mount(document.createElement('div')) as LoadingInstance
  el.instance = instance

  const title = binding.arg
  if (title && typeof title === 'string') {
    instance.setTitle(title)
  }

  if (binding.value) {
    append(el)
  }
}

const updated: DirectiveHook = (el: HTMLElementEx, binding: DirectiveBinding) => {
  if (binding.oldValue !== binding.value) {
    binding.value ? append(el) : remove(el)
  }
}

const positionClassName = 'g-relative'
function append(el: HTMLElementEx) {
  const positionText = ['relative', 'absolute', 'fixed']
  const style = getComputedStyle(el)
  // 父元素的 position 如果没有设置，则给父元素添加 relative
  if (positionText.includes(style.position)) {
    addClass(el, positionClassName)
  }
  el.appendChild(el.instance?.$el)
}
function remove(el: HTMLElementEx) {
  removeClass(el, positionClassName)
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
