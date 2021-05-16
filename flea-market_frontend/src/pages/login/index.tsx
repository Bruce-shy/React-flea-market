import { memo, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Checkbox, Modal } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { NavLink, useHistory } from 'react-router-dom'
import {
  isLogin,
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage,
} from '../../common'
import * as actionTypes from '../User/store/actionCreators'
import styles from './styles.moudle.less'

const ModalTitle = () => {
  return (
    <div className={styles.modalTitleWrap}>
      <span>请联系管理员</span>
    </div>
  )
}

const Login = (props: any) => {
  const { _isLogin } = props
  const {
    getLoginDataDispatch,
    getUserInfoDataDispatch,
    getUserPublishGoodsDataDispatch,
    getUserPublishPurchaseDataDispatch,
  } = props
  const history = useHistory()

  const [isModalVisible, updateIsModalVisible] = useState(false)
  const [account, updateAccount] = useState(getLocalStorage('userName'))

  useEffect(() => {
    // 如果登录成功
    if (_isLogin || isLogin()) {
      history.push('/goods') // 跳转回首页
      getUserInfoDataDispatch(account)
      getUserPublishGoodsDataDispatch(account)
      getUserPublishPurchaseDataDispatch(account)
    }
  }, [_isLogin, account, getUserInfoDataDispatch, getUserPublishGoodsDataDispatch, getUserPublishPurchaseDataDispatch, history])

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
    if (values.remember) {
      setLocalStorage('userName', values.account)
    } else {
      clearLocalStorage('userName')
    }
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
            initialValue={account}
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
  // _isLogin: state.user.isLogin 不使用 immutable 的写法
  _isLogin: state.getIn(['user', 'isLogin']),
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    getLoginDataDispatch(data: any) {
      dispatch(actionTypes.getLogin(data))
    },
    getUserInfoDataDispatch(id: string, data: object) {
      dispatch(actionTypes.getUserInfo(id, data))
    },
    getUserPublishGoodsDataDispatch(id: string, data: object) {
      dispatch(actionTypes.getUserPublishGoods(id, data))
    },
    getUserPublishPurchaseDataDispatch(id: string, data: object) {
      dispatch(actionTypes.getUserPublishPurchase(id, data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Login))
