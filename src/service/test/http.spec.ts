import { describe, it, expect } from 'vitest'
import { http } from '../http'
import { ERR_OK } from '../base'
import AxiosMockAdapter from 'axios-mock-adapter'

describe('http', () => {
  it('当返回的 code 为 ERR_OK 时，返回 result', async () => {
    const axiosInstance = http.getAxiosInstance()
    const axiosMock = new AxiosMockAdapter(axiosInstance)
    const resData = 'this is a test'
    axiosMock.onGet('/test').reply(200, {
      code: ERR_OK,
      result: resData,
    })

    const data = await http.get('/test')
    expect(data).toBe(resData)
  })

  it('当返回的 code 不为 ERR_OK 时，应该报错', async () => {
    const axiosInstance = http.getAxiosInstance()
    const axiosMock = new AxiosMockAdapter(axiosInstance)
    axiosMock.onGet('/test').reply(200, {
      code: -1,
      result: '',
    })
    await expect(() => http.get('/test')).rejects.toThrow(new Error('request error'))
  })
})
