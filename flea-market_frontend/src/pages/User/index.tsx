import { useState,useEffect, memo } from 'react'
import { connect } from 'react-redux'
import { Menu, message } from 'antd'
import isEmpty from 'lodash/isEmpty'
import { isLogin, getLocalStorage } from '../../common'
import { MailOutlined, CalendarOutlined } from '@ant-design/icons'
import UserInfo from '../../components/UserInfo'
import styles from './styles.moudle.less'

enum PersonalCenter {
  Info = 'info', // 我的资料
  Goods = 'goods', // 我的商品
  Buy = 'buy', // 我的求购
}

const User = (props: any) => {
  const { userInfo } = props
  const localUserInfo = JSON.parse(getLocalStorage('userInfo') || '{}')

  const [selected, updateSelected] = useState(PersonalCenter.Info) // 选中的子路由

  const handleOnSelect = ({ key }: any) => {
    props.history.push(`/user/${key}`) // 跳转子路由
    updateSelected(key)
  }

  useEffect(() => {
    if(!isLogin()) {
      message.error('您尚未登录!')
      props.history.push('/') // 跳回主页
    }
  },[props.history])

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
            icon={<MailOutlined />}
          >
            我的资料
          </Menu.Item>
          <Menu.Item
            className={styles.menuItem}
            key={PersonalCenter.Goods}
            icon={<CalendarOutlined />}
          >
            我的商品
          </Menu.Item>
          <Menu.Item
            className={styles.menuItem}
            key={PersonalCenter.Buy}
            icon={<CalendarOutlined />}
          >
            我的求购
          </Menu.Item>
        </Menu>
      </div>
      <div className={styles.contentBox}>
        {selected === PersonalCenter.Info && (
          <UserInfo
            userInfo={isEmpty(userInfo.toJS()) ?  localUserInfo : userInfo.toJS() }
            // 先从 store 中取数据 如果没有再从本地拿
            // isEmpty 判断对象是否为空 toJS() 将一个 Immutable 数据转换为 JS 类型的数据
          />
        )}
        {selected === PersonalCenter.Goods && <span>你是傻叉</span>}
        {selected === PersonalCenter.Buy && <span>你是二笔</span>}
      </div>
    </div>
  )
}

// 映射state到props上
const mapStateToProps = (state: any) => ({
  userInfo: state.getIn(['user', 'userInfo']),
})

export default connect(mapStateToProps)(memo(User))
