import { http } from '../http'

export function fetchGetRecommend() {
  return http.get('/api/getRecommend')
}
