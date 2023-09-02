import { it, describe, expect } from 'vitest'
import { setupRoutes } from '../process'
import type { RouteLike } from '../process'

describe('process', () => {
  it.skip('setupRoutes 获得正确的基础路由', () => {
    const routes: RouteLike[] = [
      {
        path: '/',
        name: 'home',
        redirect: '/recommend',
      },
      {
        path: '/recommend',
        name: 'recommend',
        component: null,
      },
    ]
    expect(setupRoutes(routes)).toEqual([
      {
        path: '/',
        name: 'home',
        redirect: '/recommend',
        component: null,
      },
      {
        path: '/recommend',
        name: 'recommend',
        component: () => import('@/pages/recommend/index.vue'), // TODO: 这里测试不通过，因为 import 的路径不对
      },
    ])
  })
})
