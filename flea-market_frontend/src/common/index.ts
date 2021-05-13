// 节流函数
export const debounce = (fn: Function, delay: number) => {
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
