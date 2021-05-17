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

export const isNumber = (str: string | undefined) => {
  const numberReg = /^[0-9]*$/
  if (str && !numberReg.test(str)) {
    message.error('账号必须为纯数字')
    return false
  }
  return true
}

export const isPhoneNumber = (str: string | undefined) => {
  const phoneNumberReg =
    /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
  if (str && !phoneNumberReg.test(str)) {
    message.error('请输入正确的手机号')
    return false
  }
  return true
}
