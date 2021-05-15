import { useEffect, memo } from 'react'
import { connect } from 'react-redux'
import { Pagination } from 'antd'
import NavCard from '../../components/NavCard'
import DisplayCard from '../../components/DisplayCard'
import * as actionTypes from './store/actionCreators'
import styles from './styles.moudle.less'

const Home = (props: any) => {
  const { goodsList } = props
  const { getGoodsListDataDispatch } = props

  const onChange = (pageNumber: any) => {
    console.log('Page: ', pageNumber)
  }

  useEffect(() => {
    // 如果 store 中没有数据, 重新请求 确保拿到的数据是最新的
    if (!goodsList.size) {
      getGoodsListDataDispatch()
    }
  }, [getGoodsListDataDispatch, goodsList.size])

  return (
    <>
      <div className={styles.navWrap}>
        <NavCard />
      </div>
      <div className={styles.listWrap}>
        {goodsList.toJS().map(
          (item: any) => (
            <div className={styles.cardWrap}>
              <DisplayCard data={item} key={item._id} />
            </div>
          )
        )}
      </div>
      <div className={styles.paginationWrap}>
        <Pagination
          showQuickJumper
          defaultCurrent={2}
          total={500}
          onChange={onChange}
        />
      </div>
      <div className={styles.footerWrap}></div>
    </>
  )
}

const mapStateToProps = (state: any) => ({
  goodsList: state.getIn(['goods', 'goodsList']),
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    getGoodsListDataDispatch() {
      dispatch(actionTypes.getGoodsList())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Home))
