import type { AxiosInstance, AxiosResponse, CreateAxiosDefaults } from 'axios'
import axios from 'axios'

export const ERR_OK = 0

export default class SetupHttp {
  private http: AxiosInstance
  private debounceTimeout: NodeJS.Timeout | null = null
  private throttleTimeout: NodeJS.Timeout | null = null
  private controller: AbortController = new AbortController()
  private signal: AbortSignal = this.controller.signal

  constructor(config: CreateAxiosDefaults) {
    this.http = axios.create(config)
    this.httpInerceptorsRequest(this.http)
    this.httpInerceptorsResponse(this.http)
  }

  private httpInerceptorsRequest(http: AxiosInstance) {
    http.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }

  private httpInerceptorsResponse(http: AxiosInstance) {
    http.interceptors.response.use(
      (response: AxiosResponse) => {
        const { code, result } = response.data
        if (code === ERR_OK) {
          return result
        }
        return Promise.reject(new Error('request error'))
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }

  // 防抖
  private debounce(fn: Function, delay: number = 300) {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout)
    }
    this.debounceTimeout = setTimeout(() => {
      fn()
    }, delay)
  }

  // 节流
  private throttle(fn: Function, delay: number = 300) {
    if (this.throttleTimeout) {
      return
    }
    this.throttleTimeout = setTimeout(() => {
      fn()
      this.throttleTimeout = null
    }, delay)
  }

  // get请求
  public get(url: string, params: any = {}) {
    this.controller.abort()
    this.controller = new AbortController()
    this.signal = this.controller.signal

    return new Promise((resolve, reject) => {
      this.debounce(() => {
        this.http
          .get(url, {
            ...params,
            abortSingal: this.signal,
          })
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            // if (err.name === 'AbortError') {
            //   console.log('请求中断')
            //   return
            // }
            reject(err)
          })
      }, 300)
    })
  }

  public post(url: string, params: any = {}) {
    return new Promise((resolve, reject) => {
      this.throttle(() => {
        this.http
          .post(url, params)
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      }, 300)
    })
  }

  public getAxiosInstance() {
    return this.http
  }
}
