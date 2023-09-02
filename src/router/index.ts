import type { App } from 'vue'
import type { Router, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes as routeLikes, setupRoutes } from './process'

export const routes: RouteRecordRaw[] = setupRoutes(routeLikes)

export const setupRouterGuard = function (router: Router) {
  router.beforeEach((to, from, next) => {})
  router.afterEach((to, from) => {})
}

let router: Router
export const setupRouter = async function (app: App) {
  router = createRouter({
    history: createWebHashHistory(),
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
