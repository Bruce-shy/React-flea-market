import { useState, useEffect, memo } from 'react'
import { connect } from 'react-redux'
import { Menu, message, Empty, Button } from 'antd'
import {
  UserOutlined,
  ShoppingOutlined,
  GiftOutlined,
  LockOutlined,
} from '@ant-design/icons'
import isEmpty from 'lodash/isEmpty'
import { useHistory } from 'react-router-dom'
import { isLogin, getLocalStorage } from '../../common'
import { deleteGoodsInfoRequest } from '../../services/goods'
import { deletePurchaseInfoRequest } from '../../services/purchases'
import {
  UserInfoComponent,
  DeleteCardComponent,
  ModofyPasswordComponent,
} from '../../components'
import * as actionTypes from './store/actionCreators'
import styles from './styles.moudle.less'

enum PersonalCenter {
  Info = 'Info', // 我的资料
  Goods = 'Goods', // 我的商品
  Buy = 'Buy', // 我的求购
  ModofyPassword = 'ModofyPassword', // 修改密码
}

const User = (props: any) => {
  const { _isLogin, userInfo, myGoods, myPurchase } = props
  const {
    updateUserInfoDataDispatch,
    getUserPublishGoodsDataDispatch,
    getUserPublishPurchaseDataDispatch,
  } = props
  const localUserInfo = JSON.parse(getLocalStorage('userInfo') || '{}')
  const localMyGoods = JSON.parse(getLocalStorage('myGoods') || '{}')
  const localMyPurchase = JSON.parse(getLocalStorage('myPurchase') || '{}')
  const history = useHistory()

  const [selected, updateSelected] = useState(PersonalCenter.Info) // 选中的子路由
  const [_myGoods, update_myGoods] = useState(
    !myGoods.size ? localMyGoods : myGoods.toJS()
  )
  const [_myPurchase, update_myPurchase] = useState(
    !myPurchase.size ? localMyPurchase : myPurchase.toJS()
  )

  const handleOnSelect = ({ key }: any) => {
    history.push(`/user/${key}`) // 跳转子路由
    updateSelected(key)
  }

  const handleOnSwitchTo = (route: string) => {
    history.push(route) // 跳转页面
  }

  const handleOnDeleteGoods = (_id: string, account: string) => {
    update_myGoods(_myGoods.filter((item: any) => item._id !== _id))
    deleteGoodsInfoRequest(_id)
      .then((res: any) => {
        if (res.success) {
          message.success(res.message)
          getUserPublishGoodsDataDispatch(account)
        } else {
          message.error(res.message)
        }
      })
      .catch((err: any) => {
        message.error(err.message)
      })
  }

  const handleOnDeletePurchase = (_id: string, account: string) => {
    update_myPurchase(_myPurchase.filter((item: any) => item._id !== _id))
    deletePurchaseInfoRequest(_id)
      .then((res: any) => {
        if (res.success) {
          message.success(res.message)
          getUserPublishPurchaseDataDispatch(account)
        } else {
          message.error(res.message)
        }
      })
      .catch((err: any) => {
        message.error(err.message)
      })
  }

  useEffect(() => {
    if (!(_isLogin || isLogin())) {
      message.error('您尚未登录!')
      history.push('/') // 跳回主页
    }
  }, [_isLogin, history])

  return (
    <div className={styles.userInfoWrap}>
      <div className={styles.menuWrap}>
        <div className={styles.menuTitle}>个人中心</div>
        <Menu
          style={{ minHeight: '552px' }}
          defaultSelectedKeys={[PersonalCenter.Info]}
          mode='inline'
          theme='light'
          onSelect={handleOnSelect}
        >
          <Menu.Item
            className={styles.menuItem}
            key={PersonalCenter.Info}
            icon={<UserOutlined />}
          >
            我的资料
          </Menu.Item>
          <Menu.Item
            className={styles.menuItem}
            key={PersonalCenter.Goods}
            icon={<ShoppingOutlined />}
          >
            我的商品
          </Menu.Item>
          <Menu.Item
            className={styles.menuItem}
            key={PersonalCenter.Buy}
            icon={<GiftOutlined />}
          >
            我的求购
          </Menu.Item>
          <Menu.Item
            className={styles.menuItem}
            key={PersonalCenter.ModofyPassword}
            icon={<LockOutlined />}
          >
            修改密码
          </Menu.Item>
        </Menu>
      </div>
      <div className={styles.contentBox}>
        {selected === PersonalCenter.Info && (
          <UserInfoComponent
            updateUserInfo={updateUserInfoDataDispatch}
            userInfo={!userInfo.size ? localUserInfo : userInfo.toJS()}
            // 先从 store 中取数据 如果没有再从本地拿
            // toJS() 将一个 Immutable 数据转换为 JS 类型的数据
          />
        )}
        {selected === PersonalCenter.Goods &&
          (!isEmpty(_myGoods) ? (
            _myGoods.map((item: any) => (
              <DeleteCardComponent
                key={item._id}
                data={item}
                onDelete={handleOnDeleteGoods}
              />
            ))
          ) : (
            <Empty
              image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
              imageStyle={{
                height: 60,
              }}
              description={<span>暂无数据</span>}
            >
              <Button
                type='primary'
                onClick={() => handleOnSwitchTo('/release_goods')}
              >
                创建一个？
              </Button>
            </Empty>
          ))}
        {selected === PersonalCenter.Buy &&
          (!isEmpty(_myPurchase) ? (
            _myPurchase.map((item: any) => (
              <DeleteCardComponent
                key={item._id}
                data={item}
                onDelete={handleOnDeletePurchase}
              />
            ))
          ) : (
            <Empty
              image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
              imageStyle={{
                height: 60,
              }}
              description={<span>暂无数据</span>}
            >
              <Button
                type='primary'
                onClick={() => handleOnSwitchTo('/release_buy')}
              >
                创建一个 ?
              </Button>
            </Empty>
          ))}
        {selected === PersonalCenter.ModofyPassword && (
          <ModofyPasswordComponent
            updateUserInfo={updateUserInfoDataDispatch}
            userInfo={!userInfo.size ? localUserInfo : userInfo.toJS()}
          />
        )}
      </div>
    </div>
  )
}

// 映射state到props上
const mapStateToProps = (state: any) => ({
  _isLogin: state.getIn(['user', 'isLogin']),
  userInfo: state.getIn(['user', 'userInfo']),
  myGoods: state.getIn(['user', 'myGoods']),
  myPurchase: state.getIn(['user', 'myPurchase']),
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateUserInfoDataDispatch(id: string, data: object) {
      dispatch(actionTypes.updateUserInfo(id, data))
    },
    getUserPublishGoodsDataDispatch(id: string, data: object) {
      dispatch(actionTypes.getUserPublishGoods(id, data))
    },
    getUserPublishPurchaseDataDispatch(id: string, data: object) {
      dispatch(actionTypes.getUserPublishPurchase(id, data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(User))
