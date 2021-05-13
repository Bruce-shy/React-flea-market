import { memo, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Checkbox, Modal } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import styles from './styles.moudle.less'

import * as actionTypes from '../User/store/actionCreators'

const ModalTitle = () => {
  return (
    <div className={styles.modalTitleWrap}>
      <span>请联系管理员</span>
    </div>
  )
}

const Login = (props: any) => {
  const { isLogin } = props
  const { getLoginDataDispatch, getUserInfoDataDispatch } = props

  const [isModalVisible, updateIsModalVisible] = useState(false)
  const [account, updateAccount] = useState('')

  useEffect(() => {
    // 如果登录成功
    if (isLogin) {
      props.history.push('/goods') // 跳转回首页
      getUserInfoDataDispatch(account)
    }
  }, [account, getLoginDataDispatch, getUserInfoDataDispatch, isLogin, props])

  const handleShowModal = () => {
    updateIsModalVisible(true)
  }

  const handleOnOk = () => {
    updateIsModalVisible(false)
  }

  const handleOnCancel = () => {
    updateIsModalVisible(false)
  }

  const onFinish = (values: any) => {
    updateAccount(values.account)
    getLoginDataDispatch(values)
  }

  return (
    <div className={styles.loginWrap}>
      <div className={styles.formWrap}>
        <div className={styles.navWrap}>
          <NavLink to='/register'>注册!</NavLink>
        </div>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name='account'
            rules={[{ required: true, message: '请输入你的学号!' }]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='学号'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: '请输入你的密码!' }]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='密码'
            />
          </Form.Item>
          <Form.Item>
            <div className={styles.loginFooterWrap}>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
              <Button type='primary' size='small' onClick={handleShowModal}>
                忘记密码?
              </Button>
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              block={true}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Modal
        centered={true}
        title={<ModalTitle />}
        visible={isModalVisible}
        onOk={handleOnOk}
        onCancel={handleOnCancel}
      >
        <div className={styles.modalContentWrap}>
          <span>Email: 1239941131@qq.com</span>
          <span>QQ: 1239941131</span>
        </div>
      </Modal>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  // isLogin: state.user.isLogin 不使用 immutable 的写法
  isLogin: state.getIn(['user', 'isLogin']),
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    getLoginDataDispatch(values: any) {
      dispatch(actionTypes.getLogin(values))
    },
    getUserInfoDataDispatch(values: any) {
      dispatch(actionTypes.getUserInfo(values))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(memo(Login))
