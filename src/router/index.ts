import type { App } from 'vue'
import type { Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

export const routes = []

export const setupRouterGuard = function (router: Router) {
  router.beforeEach((to, from, next) => {})
  router.afterEach((to, from) => {})
}

let router: Router
export const setupRouter = async function (app: App) {
  router = createRouter({
    history: createWebHistory(),
    routes,
  })
  // setupRouterGuard(router)
  app.use(router)
}

export function getRouterInstance() {
  return router
}
export function setRouterInstance(_router: Router) {
  router = _router
}
