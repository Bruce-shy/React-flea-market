import { useState, memo } from 'react'
import { Form, Button, Input } from 'antd'
import styles from './styles.moudle.less'

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const ModofyPassword = (props: any) => {
  const { userInfo, updateUserInfo } = props
  const { _id = '' } = userInfo
  const [isAllowModify, updateIsAllowModify] = useState(false)

  const handleOnModify = () => {
    updateIsAllowModify(!isAllowModify)
  }

  const handleOnFinish = (values: any) => {
    updateUserInfo(_id, { password: values.password })
  }

  return (
    <Form
      className={styles.formWrap}
      name='modify_password' // 表单名称
      {...formItemLayout} // 布局
      onFinish={handleOnFinish} // 提交表单且数据验证成功后回调事件
    >
      <Form.Item
        name='password'
        label='密码'
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password disabled={!isAllowModify} minLength={6} />
      </Form.Item>
      <Form.Item
        name='confirm'
        label='确认密码'
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请确认你的密码!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('两次密码不一致，请重试!'))
            },
          }),
        ]}
      >
        <Input.Password disabled={!isAllowModify} minLength={6} />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 14,
          offset: 6,
        }}
      >
        <div className={styles.buttonWrap}>
          <Button type='primary' onClick={handleOnModify}>
            修改
          </Button>
          <Button type='primary' htmlType='submit' disabled={!isAllowModify}>
            提交
          </Button>
        </div>
      </Form.Item>
    </Form>
  )
}

export default memo(ModofyPassword)
