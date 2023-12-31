import SetupHttp from './base'

export const defaultConfig = {
  baseURL: import.meta.env.VITE_WEB_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
}

export const http = new SetupHttp(defaultConfig)
