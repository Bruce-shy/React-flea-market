import { get, post, put, del } from '../utils/request'

/**
 * 获取列表
 * @param {*} page
 */
export function listApi(page = 1, per_page = 5) {
  return get('/goods', { page, per_page })
}

/**
 * 创建数据
 * @param {*} data
 */
export function createApi(data) {
  return post('/goods', data)
}

/**
 * 根据id获取获取数据
 * @param {*} id
 */
export function getOneById(id) {
  return get(`/goods/${id}`)
}

/**
 * 修改记录
 * @param {*} id
 * @param {*} data
 */
export function modifyOne(id, data) {
  return put(`/goods/${id}`, data)
}

/**
 * 删除记录
 * @param {*} id
 * @param {*} data
 */
export function delOne(id, data) {
  return del(`/goods/${id}`)
}
