import { get, post, patch } from '../utils/request'

/**
 * 获取所有求购信息
 * @param {*} page
 */
export const getPurchaseListRequest = (page = 1) => {
  return get('/purchases', { page, per: 10 })
}

/**
 * 发布求购信息
 * @param {*} data
 */
export const createPurchaseRequest = (data: any) => {
  return post('/purchases', data)
}

/**
 * 根据id获取获取用户信息
 * @param {*} id
 */
export const getUserInfoRequest = (id: string, data: object) => {
  return get(`/users/${id}`, data)
}

/**
 * 更新个人信息
 * @param {*} id
 * @param {*} data
 */
export const updateUserInfoRequest = (id: string, data: object) => {
  return patch(`/users/${id}`, data)
}
