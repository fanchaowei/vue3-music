import { describe, it, expect } from 'vitest'
import { ISingerColumn, ISongMessage } from '@/types'

function useAddSingerListFactory(): ISingerColumn[] {
  const data: ISingerColumn[] = []
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
      list: getRandomList(12, 20),
    })
  }
  return data
}

describe('useFixed', () => {
  const singersData = useAddSingerListFactory()
})
