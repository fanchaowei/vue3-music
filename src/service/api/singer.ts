import { http } from '../http'
import { ISingerList } from '@/types'

export function fetchGetSingers() {
  return http.get<ISingerList>('/api/getSingerList')
}
