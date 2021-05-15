import { useEffect, memo } from 'react'
import { connect } from 'react-redux'
import PictureSwitch from '../../components/PictureSwitch'
import ProductDetail from '../../components/ProductDetail'
import CommentList from '../../components/CommentList'
import { updateGoodsViewsRequest } from '../../services/goods'
import * as actionTypes from '../Home/store/actionCreators'
import styles from './styles.moudle.less'

const GoodsDetail = (props: any) => {
  const { goodsInfo, commentList, location } = props
  const {
    getGoodsInfoDataDispatch,
    getCommentListDataDispatch,
    getGoodsListDataDispatch,
  } = props
  useEffect(() => {
    // 如果 store 中没有数据, 重新请求 确保拿到的数据是最新的
    if (!goodsInfo.size && !commentList.size) {
      const goodsId = location.search.substring(1)
      getGoodsInfoDataDispatch(goodsId)
      getCommentListDataDispatch(goodsId)
      updateGoodsViewsRequest(goodsId, {})
        .then((res: any) => {
          // 如果更新浏览量成功
          if (res.success) {
            getGoodsListDataDispatch(false) // 隐式更新 所有商品信息
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [
    commentList.size,
    getCommentListDataDispatch,
    getGoodsInfoDataDispatch,
    getGoodsListDataDispatch,
    goodsInfo.size,
    location.search,
  ])
  return (
    <>
      <div className={styles.cardDetailWrap}>
        <PictureSwitch />
        <ProductDetail />
      </div>
      <div className={styles.commentListWrap}>
        <CommentList />
      </div>
    </>
  )
}

const mapStateToProps = (state: any) => ({
  goodsInfo: state.getIn(['goods', 'goodsInfo']),
  commentList: state.getIn(['goods', 'commentList']),
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    getGoodsInfoDataDispatch(id: string, data: object) {
      dispatch(actionTypes.getGoodsInfo(id, data))
    },
    getCommentListDataDispatch(id: string, data: object) {
      dispatch(actionTypes.getCommentList(id, data))
    },
    getGoodsListDataDispatch() {
      dispatch(actionTypes.getGoodsList())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(GoodsDetail))
