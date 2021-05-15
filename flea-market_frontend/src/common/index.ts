import { message } from 'antd'
// 节流函数
export const debounce = (fn: Function, delay = 500) => {
  let timeout: NodeJS.Timeout
  return (...arg: any) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, arg)
    }, delay)
  }
}

// 获取 localStorage
export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key)
}

// 设置 localStorage
export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

// 清除 localStorage
export const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}

// 判断是否登录
export const isLogin = () => {
  if (getLocalStorage('token')) {
    return true
  }
  return false
}

// 文件上传字段值处理
export const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e
  }
  return e && e.fileList
}

// 上传图片限制
export const uploadImageLimit = (file: any) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('你只能上传 jpg 或者 png 格式的文件!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('图片大小必须小于 2MB!')
  }
  return isJpgOrPng && isLt2M
}
