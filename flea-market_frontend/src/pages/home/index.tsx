import { useEffect, memo } from 'react'
import { connect } from 'react-redux'
import { Pagination } from 'antd'
import { NavCardComponent, DisplayCardComponent } from '../../components'
import * as actionTypes from './store/actionCreators'
import styles from './styles.moudle.less'

const Home = (props: any) => {
  const { goodsList, category,page } = props
  const { getGoodsListDataDispatch, getGoodsListByCategoryDataDispatch } = props

  const handleOnChange = (page: number) => {
    if (category.size) {
      getGoodsListByCategoryDataDispatch(page, category.toJS())
    } else {
      getGoodsListDataDispatch(page)
    }
  }

  useEffect(() => {
    // 如果 store 中没有数据, 重新请求 确保拿到的数据是最新的
    if (!goodsList.size) {
      getGoodsListDataDispatch()
    }
  }, [getGoodsListDataDispatch, goodsList, goodsList.size])

  return (
    <>
      <div className={styles.navWrap}>
        <NavCardComponent
          goodsList={goodsList.toJS()}
          onSelect={getGoodsListByCategoryDataDispatch}
          page={page}
        />
      </div>
      <div className={styles.listWrap}>
        {goodsList.toJS().map((item: any) => (
          <div key={item._id} className={styles.cardWrap}>
            <DisplayCardComponent data={item} key={item._id} />
          </div>
        ))}
      </div>
      <div className={styles.paginationWrap}>
        <Pagination
          total={100}
          showQuickJumper
          defaultCurrent={1}
          pageSize={10}
          onChange={handleOnChange}
          current={page}
        />
      </div>
      <div className={styles.footerWrap}></div>
    </>
  )
}

const mapStateToProps = (state: any) => ({
  goodsList: state.getIn(['goods', 'goodsList']),
  category: state.getIn(['goods', 'category']),
  page: state.getIn(['goods', 'page']),
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    getGoodsListDataDispatch(page: number) {
      dispatch(actionTypes.getGoodsList(page))
    },
    getGoodsListByCategoryDataDispatch(page: number, category: Array<string>) {
      dispatch(actionTypes.getGoodsListByCategory(page, category))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Home))
