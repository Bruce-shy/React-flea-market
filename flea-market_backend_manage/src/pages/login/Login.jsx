import React, { createRef, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Card, message } from 'antd'
import {
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from '@ant-design/icons'
import { setToken } from '../../utils/auth'
import { loginApi } from '../../services/auth'
import './login.css'

const fromRef = createRef()

function Login(props) {
  const Failed = () => {
    message.error('用户不存在')
  }

  useEffect(() => {
    if (localStorage.getItem('account')) {
      fromRef.current.setFieldsValue({
        account: localStorage.getItem('account'),
      })
    }
  }, [])

  const onFinish = (values) => {
    if (values.remember) {
      localStorage.setItem('account', values.account)
    }
    loginApi({
      account: values.account,
      password: values.password,
    })
      .then((res) => {
        if (res.success) {
          message.success('登录成功')
          setToken(res.data.token)
          props.history.push('/admin')
        } else {
          message.info(res.message)
        }
      })
      .catch((err) => {
        message.error(err.message)
      })
  }

  return (
    <div className='cardBG'>
      <Card
        title='校园二手市场后台管理系统'
        className='login-form'
        headStyle={{ textAlign: 'center' }}
      >
        <Form
          ref={fromRef}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={() => Failed()}
        >
          <Form.Item
            name='account'
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            {
              <Input
                style={{ width: '300px' }}
                size='large'
                minLength={4}
                maxLength={4}
                placeholder='用户名'
                prefix={<UserOutlined />}
              />
            }
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            {
              <Input.Password
                style={{ width: '300px' }}
                prefix={<LockOutlined />}
                size='large'
                type='password'
                placeholder='密码'
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            }
          </Form.Item>
          <Form.Item name='remember' valuePropName={'checked'}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              block
              type='primary'
              htmlType='submit'
              className='login-form-button'
              size='middle'
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Login
