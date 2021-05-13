import { memo, useState } from 'react'
import { Form, Button, Upload, Input, message, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styles from './styles.moudle.less'

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e
  }

  return e && e.fileList
}

const UserInfo = (props: any) => {
  const { userInfo } = props
  const {
    avatarUrl = '',
    college,
    nickName,
    weChatNumber = '',
    phoneNumber = '',
    qqNumber = '',
  } = userInfo

  const [isAllowModify, updateIsAllowModify] = useState(false)

  const handleOnModify = () => {
    updateIsAllowModify(!isAllowModify)
  }

  const handleOnFinish = (values: any) => {
    const { phone_number, qq_number, weChat_number, seller_label } = values

    if (!phone_number && !qq_number && !weChat_number) {
      // 如果手机号码 QQ号码 微信号 都没有填写， 报错
      message.error('微信号，手机号，QQ至少填写一项')
    }
    if (seller_label.length > 4) {
      message.error('标签最多选择四项')
    }
    console.log('Received values of form: ', values)
  }

  return (
    <Form
      className={styles.formWrap}
      name='register' // 表单名称
      {...formItemLayout} // 布局
      onFinish={handleOnFinish} // 提交表单且数据验证成功后回调事件
    >
      <Form.Item
        name='avatar'
        label='头像'
        valuePropName='fileList'
        getValueFromEvent={normFile}
      >
        <Upload name='logo' action='/upload.do' listType='picture'>
          <Avatar size={48} icon={<UserOutlined />} src={avatarUrl} />
        </Upload>
      </Form.Item>
      <Form.Item
        name='nickName'
        label='昵称'
        rules={[
          {
            required: true,
            message: '请输入你的昵称!',
          },
        ]}
      >
        <Input
          placeholder={'想一个好名字吧'}
          defaultValue={nickName}
          disabled={!isAllowModify}
        />
      </Form.Item>
      <Form.Item
        name='college'
        label='学院'
        rules={[
          {
            required: true,
            message: '请输入你所在的学院!',
          },
        ]}
      >
        <Input
          placeholder={'输入自己的归属地'}
          defaultValue={college}
          disabled={!isAllowModify}
        />
      </Form.Item>
      <Form.Item name='weChat_number' label='微信'>
        <Input
          placeholder={'微信号，手机号，QQ至少填写一项'}
          defaultValue={weChatNumber}
          disabled={!isAllowModify}
        />
      </Form.Item>
      <Form.Item
        name='phone_number'
        label='手机号'
        rules={[
          {
            type: 'number',
            message: '请输入数字',
          },
        ]}
      >
        <Input
          placeholder={'微信号，手机号，QQ至少填写一项'}
          defaultValue={phoneNumber}
          disabled={!isAllowModify}
        />
      </Form.Item>
      <Form.Item
        name='qq_number'
        label='QQ'
        rules={[
          {
            type: 'number',
            message: '请输入数字',
          },
        ]}
      >
        <Input
          placeholder={'微信号，手机号，QQ至少填写一项'}
          defaultValue={qqNumber}
          disabled={!isAllowModify}
        />
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

export default memo(UserInfo)
