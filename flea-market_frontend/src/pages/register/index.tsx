import { Form, Button, Upload, Input, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { createUserRequest } from '../../services/users'
import { baseUrl } from '../../utils/config'
import {
  normFile,
  uploadImageLimit,
  isNumber,
  isPhoneNumber,
} from '../../common'
import styles from './styles.moudle.less'
import { useState } from 'react'

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const Register = (props: any) => {
  const history = useHistory()
  const [isLoading, updateIsLoading] = useState(false)
  const [avatarUrl, updateAvatarUrl] = useState('')

  const handleOnFinish = (values: any) => {
    const { account, phoneNumber, qqNumber, weChatNumber } = values

    if (!isNumber(account)) {
      return
    }
    if (!isPhoneNumber(phoneNumber)) {
      return
    }
    if (!phoneNumber && !qqNumber && !weChatNumber) {
      // 如果手机号码 QQ号码 微信号 都没有填写， 报错
      message.error('微信号，手机号，QQ至少填写一项')
      return
    }
    createUserRequest({ ...values, avatarUrl })
      .then((res: any) => {
        if (res.success) {
          message.success(res.message)
          history.push('/login')
        } else {
          message.error(res.message)
        }
      })
      .catch((err: any) => {
        message.error(err.message)
      })
  }

  // 图片上传
  const handleOnChange = (info: any) => {
    if (info.file.status === 'uploading') {
      updateIsLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // 上传成功
      updateIsLoading(false)
      updateAvatarUrl(info.file.response.url || '')
    }
  }

  // 文件上传组件
  const uploadButton = (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>点击上传</div>
    </div>
  )

  return (
    <div className={styles.inner}>
      <div className={styles.contentWrap}>
        <h2 className={styles.titleText}>注册</h2>
        <Form
          name='register' // 表单名称
          {...formItemLayout} // 布局
          onFinish={handleOnFinish} // 提交表单且数据验证成功后回调事件
        >
          <Form.Item
            name='account'
            label='账号'
            rules={[
              {
                required: true,
                message: '请输入你的账号!',
              },
            ]}
          >
            <Input
              placeholder={'很重要, 这是你的唯一标识'}
              minLength={12}
              maxLength={12}
            />
          </Form.Item>
          <Form.Item
            name='name'
            label='真实姓名'
            rules={[
              {
                required: true,
                message: '请输入你的真实姓名!',
              },
            ]}
          >
            <Input placeholder={'真实姓名，方便别人与你沟通'} />
          </Form.Item>
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
            <Input.Password minLength={6}  />
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
            <Input.Password minLength={6}  />
          </Form.Item>
          <Form.Item
            name='avatar'
            label='头像上传'
            valuePropName='fileList'
            getValueFromEvent={normFile}
            extra='请在上传前使用ps或者QQ截图对图片进行裁剪，才会不变形，更美观。推荐 750*750px（像素）'
          >
            <Upload
              name='file' // name	发到后台的文件参数名
              maxCount={1} // 最多上传一张图片 当为 1 时，始终用最新上传的代替当前
              listType='picture-card'
              className='avatar-uploader'
              showUploadList={false}
              action={baseUrl + '/upload'}
              beforeUpload={uploadImageLimit} // 对上传文件的限制
              onChange={(info) => handleOnChange(info)}
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt='头像' style={{ height: '100%' }} />
              ) : (
                uploadButton
              )}
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
            <Input placeholder={'彰显你的个性'} />
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
            <Input placeholder={'输入自己的归属地'} />
          </Form.Item>
          <Form.Item name='weChatNumber' label='微信'>
            <Input placeholder={'微信号，手机号，QQ至少填写一项'} />
          </Form.Item>
          <Form.Item
            name='phoneNumber'
            label='手机号'
            rules={[
              {
                type: 'string',
                message: '请输入数字',
              },
            ]}
          >
            <Input placeholder={'微信号，手机号，QQ至少填写一项'} />
          </Form.Item>
          <Form.Item
            name='qqNumber'
            label='QQ'
            rules={[
              {
                type: 'string',
                message: '请输入数字',
              },
            ]}
          >
            <Input placeholder={'微信号，手机号，QQ至少填写一项'} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 14,
              offset: 6,
            }}
          >
            <Button type='primary' htmlType='submit' block={true}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
