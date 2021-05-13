import { post } from '../utils/request'

interface UserParams {
  account: string
  password: string
}

/**
 * 用户登录
 * @param {*} user
 *  account
 *  password
 */
export const loginRequest = (user: UserParams) => {
  return post('/users/login', user)
}
