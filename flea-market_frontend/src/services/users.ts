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
 * 根据id获取用户发布的商品
 * @param {*} id
 */
 export const getUserPublishGoodsRequest = (id: string, data: object) => {
  return get(`/users/${id}/publishGoods`, data)
}

/**
 * 根据id获取用户发布的求购
 * @param {*} id
 */
 export const getUserPublishPurchaseRequest = (id: string, data: object) => {
  return get(`/users/${id}/publishPurchase`, data)
}

/**
 * 更新个人信息
 * @param {*} id
 * @param {*} data
 */
export const updateUserInfoRequest = (id: string, data: object) => {
  return patch(`/users/${id}`, data)
}
