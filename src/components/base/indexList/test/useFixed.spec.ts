import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ISingerColumn, ISongMessage } from '@/types'
import { ref, toRef } from 'vue'
import useFixed from '../useFixed'
import type { Ref } from 'vue'

describe('useFixed', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('当进入页面时，title 应为“热”', () => {
    const { onScroll, fixedTitle, currentIndex } = getTestData()
    onScroll({ y: 0 })
    vi.runAllTimersAsync()
    expect(currentIndex.value).toBe(0)
    expect(fixedTitle.value).toBe('热')
  })

  it('当滚动到第三个 title 时，title 应为“B”', async () => {
    const { onScroll, fixedTitle, currentIndex } = getTestData()
    onScroll({ y: -250 })
    await vi.runAllTimersAsync()
    expect(currentIndex.value).toBe(2)
    expect(fixedTitle.value).toBe('B')
  })

  it('因为每个 title 有 30px 的高度，当当前的 title 距离底部大于 30px 时，title 不需要向上偏移', async () => {
    const { onScroll, fixedStyle } = getTestData()
    onScroll({ y: -250 })
    await vi.runAllTimersAsync()
    expect(fixedStyle.value).toEqual({ transform: 'translate3d(0, 0px, 0)' })
  })
  it('当当前的 title 距离底部小于 30px 时，title 需要向上偏移', async () => {
    const { onScroll, fixedStyle } = getTestData()
    onScroll({ y: -280 })
    await vi.runAllTimersAsync()
    expect(fixedStyle.value).toEqual({ transform: 'translate3d(0, -10px, 0)' })
  })
})

function getTestData() {
  const { singersData, listHeights } = useAddSingerListFactory()
  const listHeightsRef: Ref<number[]> = ref(listHeights)
  const singersDataRef = toRef(() => singersData)
  const { onScroll, fixedTitle, currentIndex, fixedStyle } = useFixed(
    listHeightsRef,
    singersDataRef,
  )
  return {
    onScroll,
    fixedTitle,
    currentIndex,
    fixedStyle,
  }
}

// 创建测试数据
function useAddSingerListFactory() {
  const data: ISingerColumn[] = []
  const listHeights: number[] = [0]
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))
  const getRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const getRandomList = (min: number = 10, max: number = 20) => {
    const list: ISongMessage[] = []
    const length = getRandom(min, max)
    for (let i = 0; i < length; i++) {
      list.push({
        id: i,
        mid: `${i}`,
        name: `随机歌手${i}`,
        pic: '',
      })
    }
    return list
  }
  data.push({
    title: '热',
    list: getRandomList(10, 10),
  })

  for (let i = 0; i < 26; i++) {
    data.push({
      title: letters[i],
      list: getRandomList(10, 10),
    })
    listHeights.push(listHeights[i] + 100)
  }
  return {
    singersData: data,
    listHeights,
  }
}
