import { get, post, patch } from '../utils/request'

/**
 * 获取所有商品信息
 * @param {*} page
 */
export const getGoodsListRequest = (page = 1) => {
  return get('/goods', { page, per: 10 })
}

/**
 * 根据id获取获取商品信息
 * @param {*} id
 */
 export const getGoodsInfoRequest = (id: string, data: object) => {
  return get(`/goods/${id}`, data)
}

/**
 * 根据id获取评论信息
 * @param {*} id
 */
 export const getCommentListRequest = (id: string, data: object) => {
  return get(`/comments/${id}`, data)
}

/**
 * 发布商品信息
 * @param {*} data
 */
export const createGoodsRequest = (data: any) => {
  return post('/goods', data)
}

/**
 * 更新商品浏览量
 * @param {*} id
 * @param {*} data
 */
export const updateGoodsViewsRequest = (id: string, data: object) => {
  return patch(`/goods/${id}`, data)
}
