import { get, post, patch, del } from '../utils/request'

/**
 * 获取所有商品信息
 * @param {*} page
 */
export const getGoodsListRequest = (page = 1) => {
  return get('/goods', { page, per_page: 10 })
}

/**
 * 根据category获取相关商品信息
 * @param {*} id
 */
export const getGoodsListByCategoryRequest = (
  page = 1,
  category: Array<string>,
) => {
  return get(`/goods/category?category=${category}`, { page, per: 10 })
}

/**
 * 根据id获取商品信息
 * @param {*} id
 */
export const getGoodsInfoRequest = (id: string, data: object) => {
  return get(`/goods/${id}`, data)
}

/**
 * 根据商品id获取评论信息
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
 * 根据id发布商品评论
 * @param {*} data
 */
export const createGoodsCommentRequest = (id: string, data: any) => {
  return post(`/comments/${id}`, data)
}

/**
 * 更新商品浏览量
 * @param {*} id
 * @param {*} data
 */
export const updateGoodsViewsRequest = (id: string, data: object) => {
  return patch(`/goods/${id}`, data)
}

/**
 * 删除商品信息
 * @param {*} id
 * @param {*} data
 */
export const deleteGoodsInfoRequest = (id: string) => {
  return del(`/goods/${id}`)
}
