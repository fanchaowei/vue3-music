import { http } from '../http'
import { IRecommend } from '@/types'

export function fetchGetRecommend() {
  return http.get<IRecommend>('/api/getRecommend')
}
