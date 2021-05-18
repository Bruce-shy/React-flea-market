import React, { useState, useEffect, createRef } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Card, Input, Button, message, Upload } from 'antd'
import { createApi, getOneById, modifyOne } from '../../services/user'
import {
  normFile,
  uploadImageLimit,
  isNumber,
  isPhoneNumber,
} from '../../common'
import { baseURL } from '../../utils/config'

const fromRef = createRef()

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

function Edit(props) {
  const [isLoading, updateIsLoading] = useState(false)
  const [_id, update_Id] = useState('')
  const [avatarUrl, updateAvatarUrl] = useState('')

  useEffect(() => {
    if (props.match.params.id) {
      getOneById(props.match.params.id).then((res) => {
        console.log(res, 'rs')
        fromRef.current.setFieldsValue({
          account: res.data.account,
          avatarUrl: res.data.avatarUrl,
          college: res.data.college,
          nickName: res.data.nickName,
          name: res.data.name,
          weChatNumber: res.data.weChatNumber,
          phoneNumber: res.data.phoneNumber,
          qqNumber: res.data.qqNumber,
        })
        update_Id(res.data._id)
        updateAvatarUrl(res.data.avatarUrl)
      })
    }
    // eslint-disable-next-line
  }, [])

  // 文件上传组件
  const uploadButton = (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>点击上传</div>
    </div>
  )

  // 图片上传
  const handleOnChange = (info) => {
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

  const handleOnFinish = (values) => {
    const { account, phoneNumber, qqNumber, weChatNumber } = values
    console.log('values,', values, avatarUrl)
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
    if (props.match.params.id) {
      modifyOne(_id, {
        ...values,
        avatarUrl: avatarUrl,
      })
        .then((res) => {
          if (res.success) {
            message.success(res.message)
            props.history.push('/admin/user')
          } else {
            message.error(res.message)
          }
        })
        .catch((err) => {
          message.error(err.message)
        })
    } else {
      createApi({
        ...values,
        avatarUrl: avatarUrl,
      })
        .then((res) => {
          if (res.success) {
            message.success(res.message)
            props.history.push('/admin/user')
          } else {
            message.error(res.message)
          }
        })
        .catch((err) => {
          message.error(err.message)
        })
    }
  }

  return (
    <Card
      title='用户编辑'
      extra={
        <Button onClick={() => props.history.push('/admin/user')}>返回</Button>
      }
    >
      <Form
        name='register' // 表单名称
        {...formItemLayout} // 布局
        ref={fromRef}
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
          <Input.Password minLength={6} />
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
          <Input.Password minLength={6} />
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
            action={baseURL + '/upload'}
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
    </Card>
  )
}

export default Edit
