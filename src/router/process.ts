import type { RouteRecordRaw } from 'vue-router'

export interface RouteLike {
  path: string
  name: string
  component?: any
  redirect?: string
  children?: RouteLike[]
}

export const routes: RouteLike[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/recommend',
  },
  {
    path: '/recommend',
    name: 'recommend',
  },
  {
    path: '/singer',
    name: 'singer',
  },
  {
    path: '/top-list',
    name: 'TopList',
  },
  {
    path: '/search',
    name: 'search',
  },
  {
    path: '/user',
    name: 'user',
  },
]

// 添加路由组件
export function addRouteComponent(items: RouteLike[]): RouteRecordRaw[] {
  return items.map((item: RouteLike) => {
    const route: any = {
      path: item.path,
      name: item.name,
      component: item.redirect ? null : () => import(`@/pages/${item.name}/index.vue`),
    }
    item.redirect ? (route.redirect = item.redirect) : null
    item.children ? (route.children = addRouteComponent(item.children) as RouteRecordRaw[]) : null
    return route as RouteRecordRaw
  })
}

// 获得基础路由
export function setupRoutes(routes: RouteLike[]) {
  return addRouteComponent(routes)
}
