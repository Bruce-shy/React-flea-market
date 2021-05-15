import { get, post, patch } from '../utils/request'

/**
 * 获取列表
 * @param {*} page
 */
// export function listApi(page = 1) {
//   return get("/api/v1/admin/users", { page, per: 10 });
// }

/**
 * 创建用户
 * @param {*} data
 */
export const createUserRequest = (data: any) => {
  return post('/users', data)
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