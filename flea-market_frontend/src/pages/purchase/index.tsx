import { useEffect, memo } from 'react'
import { connect } from 'react-redux'
import { List, Avatar } from 'antd'
import moment from 'moment'
import { SellerLabel, LabelName } from '../../utils/interface'
import * as actionTypes from './store/actionCreators'
import styles from './styles.moudle.less'

const ListHeader = ({ item }: any) => {
  return (
    <div className={styles.listHeader}>
      <span className={styles.listItemName}>{item.nickName}</span>
      <span className={styles.listItem}>{item.college}</span>
      <span className={styles.listItem}>{item.account}</span>
      <span className={styles.listItem}>
        更新于{moment(item.releaseTime).format('LLLL')}
      </span>
    </div>
  )
}

const ListIcon = ({ tagName }: any) => {
  return (
    <div className={styles.listIcon}>
      <span className={styles.listIconFont}>{tagName}</span>
    </div>
  )
}

const Purchase = (props: any) => {
  const { enterLoading, purchaseList } = props
  const { getPurchaseListDataDispatch } = props

  useEffect(() => {
    // 如果 store 中没有数据, 重新请求 确保拿到的数据是最新的
    if (!purchaseList.size) {
      getPurchaseListDataDispatch()
    }
  }, [getPurchaseListDataDispatch, purchaseList.size])

  return (
    <div className={styles.purchaseWrap}>
      <List
        className={styles.listWrap}
        itemLayout='vertical'
        size='small'
        pagination={{
          onChange: (page) => {
            console.log(page)
          },
          pageSize: 4,
        }}
        bordered={true}
        // isEmpty 判断对象是否为空
        dataSource={purchaseList.toJS()
        }
        loading={enterLoading} // 数据请求
        renderItem={(item: any) => (
          <List.Item
            key={item._id}
            extra={
              item.imageUrl.length && (
                <img width={200} alt={item.title} src={item.imageUrl} />
              )
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.publisher.avatarUrl} />}
              title={<ListHeader item={item.publisher} />}
            />
            <div className={styles.listTitle}>{item.title}</div>
            <div className={styles.listContent}>{item.brief}</div>
            <div className={styles.listContent}>
              {item?.weChatNumber && (
                <span className={styles.listContactMode}>
                  微信: {item.weChatNumber}
                </span>
              )}
              {item?.phoneNumber && (
                <span className={styles.listContactMode}>
                  手机: {item.phoneNumber}
                </span>
              )}
              {item?.qqNumber && (
                <span className={styles.listContactMode}>
                  QQ: {item.qqNumber}
                </span>
              )}
            </div>
            {item?.buyerLabel.map((item: SellerLabel, id: number) => (
              <ListIcon key={id} tagName={LabelName[item]} />
            ))}
          </List.Item>
        )}
      />
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  enterLoading: state.getIn(['purchase', 'enterLoading']),
  purchaseList: state.getIn(['purchase', 'purchaseList']),
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    getPurchaseListDataDispatch() {
      dispatch(actionTypes.getPurchaseList())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Purchase))
