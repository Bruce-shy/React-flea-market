import { memo, useState } from 'react'
import { Form, Button, Upload, Input, message, Avatar } from 'antd'
import { UserOutlined, LoadingOutlined } from '@ant-design/icons'
import { baseUrl } from '../../utils/config'
import {
  normFile,
  uploadImageLimit,
  isNumber,
  isPhoneNumber,
} from '../../common'
import styles from './styles.moudle.less'

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const UserInfo = (props: any) => {
  const { userInfo, updateUserInfo } = props
  const {
    _id = '',
    avatarUrl = '',
    college,
    nickName,
    weChatNumber = '',
    phoneNumber = '',
    qqNumber = '',
  } = userInfo

  const [isLoading, updateIsLoading] = useState(false)
  const [isAllowModify, updateIsAllowModify] = useState(false)
  const [newAvatarUrl, updateNewAvatarUrl] = useState(avatarUrl)

  const handleOnModify = () => {
    updateIsAllowModify(!isAllowModify)
  }

  // 图片上传
  const handleOnChange = (info: any) => {
    if (info.file.status === 'uploading') {
      updateIsLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // 上传成功
      message.success('上传成功')
      updateIsLoading(false)
      updateNewAvatarUrl(info.file.response.url || '')
    }
  }

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
    } else {
      updateUserInfo(_id, { ...values, avatarUrl: newAvatarUrl })
    }
  }

  return (
    <Form
      className={styles.formWrap}
      name='userInfo_update' // 表单名称
      {...formItemLayout} // 布局
      onFinish={handleOnFinish} // 提交表单且数据验证成功后回调事件
    >
      <Form.Item
        name='avatar'
        label='头像'
        valuePropName='fileList'
        getValueFromEvent={normFile}
      >
        <Upload
          name='file'
          maxCount={1}
          action={baseUrl + '/upload'}
          listType='picture'
          disabled={!isAllowModify}
          showUploadList={false} // 是否展示上传文件列表
          beforeUpload={uploadImageLimit} // 对上传文件的限制
          onChange={(info) => handleOnChange(info)}
        >
          <Avatar size={48} icon={<UserOutlined />} src={newAvatarUrl} />
          {isLoading && <LoadingOutlined />}
        </Upload>
      </Form.Item>
      <Form.Item
        name='nickName'
        label='昵称'
        initialValue={nickName}
        rules={[
          {
            required: true,
            message: '请输入你的昵称!',
          },
        ]}
      >
        <Input placeholder={'想一个好名字吧'} disabled={!isAllowModify} />
      </Form.Item>
      <Form.Item
        name='college'
        label='学院'
        initialValue={college}
        rules={[
          {
            required: true,
            message: '请输入你所在的学院!',
          },
        ]}
      >
        <Input placeholder={'输入自己的归属地'} disabled={!isAllowModify} />
      </Form.Item>
      <Form.Item name='weChatNumber' label='微信' initialValue={weChatNumber}>
        <Input
          placeholder={'微信号，手机号，QQ至少填写一项'}
          disabled={!isAllowModify}
        />
      </Form.Item>
      <Form.Item
        name='phoneNumber'
        label='手机号'
        initialValue={phoneNumber}
      >
        <Input
          placeholder={'微信号，手机号，QQ至少填写一项'}
          disabled={!isAllowModify}
        />
      </Form.Item>
      <Form.Item
        name='qqNumber'
        label='QQ'
        initialValue={qqNumber}
      >
        <Input
          placeholder={'微信号，手机号，QQ至少填写一项'}
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
