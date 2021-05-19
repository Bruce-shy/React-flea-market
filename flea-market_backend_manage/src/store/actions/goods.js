import { message } from 'antd'
import { listApi } from '../../services/goods'

export const loadGoods = (payload) => async (dispatch) => {
  const res = await listApi(payload.page, payload.per_page)
  if (!res.data.length && !payload.notRemind) {
    message.warning('没有更多数据了')
  }
  // 当异步操作完成之后通过dispatch触发reducer改变数据
  dispatch({
    type: 'GOODS_LOADED',
    payload: { ...res, page: payload.page },
  })

  // 改变返回顶部的数据
  dispatch({
    type: 'CHANGE_SCROLL_TO',
  })
}
