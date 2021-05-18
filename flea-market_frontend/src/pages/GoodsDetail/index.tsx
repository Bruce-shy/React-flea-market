import { useEffect, memo, useState } from 'react'
import { connect } from 'react-redux'
import {
  PictureSwitchComponent,
  ProductDetailComponent,
  CommentListComponent,
  ReleaseCommentComponent,
} from '../../components'
import { updateGoodsViewsRequest } from '../../services/goods'
import { getLocalStorage } from '../../common'
import * as actionTypes from '../Home/store/actionCreators'
import styles from './styles.moudle.less'

const GoodsDetail = (props: any) => {
  const { goodsId, goodsInfo, commentList, userInfo, location } = props
  const {
    getGoodsInfoDataDispatch,
    getCommentListDataDispatch,
    getGoodsListDataDispatch,
  } = props
  const { imageUrl = [] } = goodsInfo.toJS()
  const currentGoodsId = location.search.substring(1)
  const localUserInfo = JSON.parse(getLocalStorage('userInfo') || '{}')

  const [visible, updateVisible] = useState(false)
  const [_commentList, update_CommentList] = useState(commentList.toJS())
  const [page, updatePage] = useState(1)

  const handleGetCommentList = (rate: number, content: string) => {
    // 用于评论数据增加
    update_CommentList([
      ..._commentList,
      {
        commentator: !userInfo.size ? localUserInfo : userInfo.toJS(),
        rate,
        content,
        updatedAt: new Date().toISOString(),
      },
    ])
    getCommentListDataDispatch(currentGoodsId)
  }

  useEffect(() => {
    // 如果 store 中没有数据, 重新请求 确保拿到的数据是最新的
    if (!(goodsInfo.size && commentList.size) || goodsId !== currentGoodsId) {
      getGoodsInfoDataDispatch(currentGoodsId)
      getCommentListDataDispatch(currentGoodsId)
      updateGoodsViewsRequest(currentGoodsId, {})
        .then((res: any) => {
          // 如果更新浏览量成功
          if (res.success) {
            getGoodsListDataDispatch(1, false) // 隐式更新 所有商品信息
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <div className={styles.cardDetailWrap}>
        <PictureSwitchComponent imageList={imageUrl} />
        <ProductDetailComponent goodsInfo={goodsInfo.toJS()} />
      </div>
      <div className={styles.commentListWrap}>
        <CommentListComponent
          commentList={commentList.toJS()}
          onClick={updateVisible}
          page={page}
          changePage={updatePage}
        />
      </div>
      {visible && (
        <ReleaseCommentComponent
          visible={visible}
          onClick={updateVisible}
          goodsId={currentGoodsId}
          getCommentList={handleGetCommentList}
        />
      )}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  goodsId: state.getIn(['goods', 'goodsId']),
  goodsInfo: state.getIn(['goods', 'goodsInfo']),
  commentList: state.getIn(['goods', 'commentList']),
  userInfo: state.getIn(['user', 'userInfo']),
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    getGoodsInfoDataDispatch(id: string, data: object) {
      dispatch(actionTypes.getGoodsInfo(id, data))
    },
    getCommentListDataDispatch(id: string, data: object) {
      dispatch(actionTypes.getCommentList(id, data))
    },
    getGoodsListDataDispatch(page: number, remind: boolean) {
      dispatch(actionTypes.getGoodsList(page,remind))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(GoodsDetail))
