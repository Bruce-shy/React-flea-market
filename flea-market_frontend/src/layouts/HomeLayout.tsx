import { useState, memo } from 'react'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { Header, TabBarLeft, TabBarRight, TabItem } from './HomeLayout.style'
import { NavLink } from 'react-router-dom'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import LinkCard from '../components/LinkCard'
import { isLogin, getLocalStorage } from '../common'
import * as actionTypes from '../pages/User/store/actionCreators'

const logoUrl = 'https://nidelemonya.cn/earthLogo.jpg'

const Home = (props: any) => {
  const { _isLogin, userInfo, route, location } = props
  const { getLogoutDataDispatch } = props
  const localUserInfo = JSON.parse(getLocalStorage('userInfo') || '{}')
  const { avatarUrl } = !userInfo.size ? localUserInfo : userInfo.toJS()

  const [publishDisplay, updatePublishDisplay] = useState(false)
  const [linkCardVisible, updateLinkCardVisible] = useState(false)

  const handleOnMouseEnter = () => updatePublishDisplay(true)

  const handleOnMouseLeave = () =>
    setTimeout(() => updatePublishDisplay(false), 200)

  const handleOnLogout = () => {
    getLogoutDataDispatch()
  }

  return (
    <>
      <Header>
        <TabBarLeft>
          <NavLink to='/goods'>
            <TabItem>
              <img
                style={{height: '64px'}}
                className='tabItem-image'
                src={logoUrl}
                alt='东华理工大学校园二手交易'
              />
            </TabItem>
          </NavLink>
          <NavLink to='/goods' activeClassName='selected'>
            <TabItem>
              <span className='tabItem-hover'>首页</span>
            </TabItem>
          </NavLink>
          <NavLink to='/buy' activeClassName='selected'>
            <TabItem>
              <span className='tabItem-hover'>求购</span>
            </TabItem>
          </NavLink>
        </TabBarLeft>
        <TabBarRight>
          {!(_isLogin || isLogin()) ? (
            <NavLink to='/login' activeClassName='selected'>
              <TabItem>
                <span className='tabItem-hover'>登录</span>
                <Avatar
                  style={{ marginLeft: '12px' }}
                  icon={<UserOutlined />}
                />
              </TabItem>
            </NavLink>
          ) : (
            <>
              <NavLink
                to={location.pathname}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              >
                <TabItem>
                  <span className='tabItem-hover'>发布</span>
                  <span className='iconfont'>&#xe7b2;</span>
                </TabItem>
              </NavLink>
              <NavLink to='/user/info' activeClassName='selected'>
                <TabItem>
                  <Avatar
                    style={{ marginRight: '12px' }}
                    icon={<UserOutlined />}
                    src={avatarUrl}
                  />
                  <span className='tabItem-hover'>个人中心</span>
                </TabItem>
              </NavLink>
              <NavLink to='/' className='signOutSelected'>
                <TabItem onClick={handleOnLogout}>退出</TabItem>
              </NavLink>
            </>
          )}
        </TabBarRight>
      </Header>
      {(publishDisplay || linkCardVisible) && (
        <LinkCard handleOnCardVisible={updateLinkCardVisible} />
      )}
      {renderRoutes(route.routes)}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  _isLogin: state.getIn(['user', 'isLogin']),
  userInfo: state.getIn(['user', 'userInfo']),
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    getLogoutDataDispatch() {
      dispatch(actionTypes.getLogout())
    },
  }
}

// 缓存组件
export default connect(mapStateToProps, mapDispatchToProps)(memo(Home))
