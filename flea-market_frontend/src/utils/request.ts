import axios from 'axios'
import { getLocalStorage } from '../common'
import { baseUrl, timeout } from './config'

// 这里不使用 fetch 因为存在兼容性问题
// 推荐使用 axios 兼容性更好

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: timeout,
})

//  添加全局请求拦截，在发送请求之前执行
axiosInstance.interceptors.request.use(
  (config) => {
    // 在请求发送前将 jwt token发送出去 用于处理是否登录判断
    config.headers['authorization'] = 'Bearer ' + getLocalStorage('token')
    return config
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error)
  }
)

// 回复处理
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 对不同类型的请求再做一层封装

/**
 * get请求
 * @param {*} url     请求地址
 * @param {*} params  url参数
 */
export const get = (url: string, params: any) => {
  return axiosInstance.get(url, {
    params,
  })
}

/**
 * post请求
 * @param {*} url     请求地址
 * @param {*} data    数据
 */
export const post = (url: string, data: any) => {
  return axiosInstance.post(url, data)
}

/**
 * put请求
 * @param {*} url     请求地址
 * @param {*} data    数据
 */
export const put = (url: string, data: any) => {
  return axiosInstance.put(url, data)
}

/**
 * delete请求
 * @param {*} url   请求地址
 */
export const del = (url: string) => {
  return axiosInstance.delete(url)
}
