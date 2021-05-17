import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Dropdown, Avatar, Badge } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { adminRoutes } from '../../routes'
import './frame.css'
import { clearToken } from '../../utils/auth'
const { Header, Content, Sider, Footer } = Layout

const logoUrl = 'https://nidelemonya.cn/earthLogo.jpg'
const routes = adminRoutes.filter((route) => route.isShow)

function Index(props) {
  const content = useRef()

  useEffect(() => {
    const node = ReactDOM.findDOMNode(content.current)
    node.scrollTop = 0
  }, [props.scrollTo])

  const popMenu = (
    <Menu
      onClick={(p) => {
        if (p.key === 'logOut') {
          clearToken()
          props.history.push('/login')
        }
        if ((p.key = 'noti')) {
          props.history.push('/admin/notices')
        }
      }}
    >
      <Menu.Item key='logOut'>退出</Menu.Item>
    </Menu>
  )
  return (
    <Layout>
      <Header
        className='header'
        style={{
          backgroundColor: '#001529',
          width: '100%',
          zIndex: '100',
          paddingLeft: '24px',
          paddingRight: '24px',
        }}
      >
        <div className='logo' style={{ width: '48px' }}>
          <img src={logoUrl} alt='logo' />
        </div>
        <Dropdown overlay={popMenu}>
          <div>
            <Avatar
              size='large'
              src='https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2032511182,3555754069&fm=26&gp=0.jpg'
            />
            <Badge dot={!props.isAllRead}>
              <span
                style={{
                  marginLeft: '10px',
                  marginRight: '10px',
                  color: 'white',
                }}
              >
                系统管理员
              </span>
            </Badge>
            <DownOutlined />
          </div>
        </Dropdown>
      </Header>
      <Layout>
        <Sider width={120} theme='dark'>
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={[props.location.pathname]}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderBottom: '1px solid #eee' }}
          >
            {routes.map((route) => {
              return (
                <Menu.Item
                  key={route.path}
                  onClick={(p) => props.history.push(p.key)}
                >
                  {route.title}
                </Menu.Item>
              )
            })}
          </Menu>
        </Sider>
        <Layout ref={content}>
          <Content
            style={{ margin: '24px 16px 0' }}
          >
            {props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = (state) => state.app

export default connect(mapStateToProps)(withRouter(Index))
