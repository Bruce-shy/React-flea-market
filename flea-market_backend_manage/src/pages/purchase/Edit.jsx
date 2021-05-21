import React, { useState, createRef, useEffect } from 'react'
import { Form, Card, Input, Button, message, Select, Upload } from 'antd'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import { normFile, isPhoneNumber } from '../../common'
import { createApi, getOneById, modifyOne } from '../../services/purchase'
import { baseURL } from '../../utils/config'

const { TextArea } = Input
const { Option } = Select
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
  const [imageList, updateImageList] = useState([])

  useEffect(() => {
    if (props.match.params.id) {
      getOneById(props.match.params.id).then((res) => {
        fromRef.current.setFieldsValue({
          title: res.data.title,
          brief: res.data.brief,
          price: res.data.price,
          buyerLabel: res.data.buyerLabel,
          weChatNumber: res.data.weChatNumber,
          phoneNumber: res.data.phoneNumber,
          qqNumber: res.data.qqNumber,
        })
        updateImageList(res.data.imageUrl)
      })
    }
  }, [props.match.params.id])

  const handleOnFinish = (values) => {
    const { phoneNumber, qqNumber, weChatNumber, buyerLabel } = values

    if (!isPhoneNumber(phoneNumber)) {
      return
    }
    if (!phoneNumber && !qqNumber && !weChatNumber) {
      // 如果手机号码 QQ号码 微信号 都没有填写， 报错
      message.error('微信号，手机号，QQ至少填写一项')
    }
    if (buyerLabel.length > 4) {
      message.error('标签最多选择四项')
    } else {
      if (props.match.params.id) {
        modifyOne(props.match.params.id, {
          ...values,
          imageUrl: imageList,
        })
          .then((res) => {
            if (res.success) {
              message.success(res.message)
              props.history.push('/admin/purchase')
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
          imageUrl: imageList,
          account: 'root',
        })
          .then((res) => {
            if (res.success) {
              message.success(res.message)
              props.history.push('/admin/purchase')
            } else {
              message.error(res.message)
            }
          })
          .catch((err) => {
            message.error(err.message)
          })
      }
    }
  }

  const handleOnchange = ({ fileList }) => {
    updateImageList([
      ...imageList,
      fileList[fileList.length - 1]?.response?.url,
    ])
  }

  return (
    <Card
      title='求购编辑'
      extra={
        <Button onClick={() => props.history.push('/admin/purchase')}>返回</Button>
      }
    >
      <Form
        name='release_goods' // 表单名称
        {...formItemLayout} // 布局
        ref={fromRef}
        onFinish={handleOnFinish} // 提交表单且数据验证成功后回调事件
      >
        <Form.Item
          name='title'
          label='标题'
          rules={[
            {
              type: 'string',
              message: '请输入正确的标题',
            },
            {
              required: true,
              message: '请输入商品标题!',
            },
          ]}
        >
          <Input placeholder={'很重要，让别人对您的需求一目了然'} />
        </Form.Item>
        <Form.Item name='brief' label='简介(可选)'>
          <TextArea placeholder='让别人更清晰了解您的需求' allowClear />
        </Form.Item>
        <Form.Item
          name='price'
          label='可接受价格'
          rules={[
            {
              required: true,
              message: '请输入商品标价!',
            },
          ]}
        >
          <Input placeholder={"数字或文字，可接受的价格，如'100-150之间'"} />
        </Form.Item>
        <Form.Item name='buyerLabel' label='买家标签'>
          <Select
            mode='multiple'
            maxTagCount={4}
            placeholder='请选择您商品适合的标签'
          >
            <Option value={1}>原装正品</Option>
            <Option value={2}>无拆无修</Option>
            <Option value={3}>如假包换</Option>
            <Option value={4}>一口价</Option>
            <Option value={5}>价格可谈</Option>
            <Option value={6}>欢迎来撩</Option>
          </Select>
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
          name='imageUrl'
          label='图片上传'
          valuePropName='fileList'
          getValueFromEvent={normFile}
          extra={
            <Button
              style={{ marginTop: '10px' }}
              icon={<DeleteOutlined />}
              onClick={() => {
                if (imageList.length === 0) {
                  message.error('没有图片了!')
                  return
                }
                const newImageList = imageList.slice(0)
                newImageList.pop()
                updateImageList(newImageList)
              }}
            >
              点击删除
            </Button>
          }
        >
          <Upload
            name='file'
            fileList={imageList}
            action={baseURL + '/upload'}
            listType='picture'
            maxCount={6}
            onChange={handleOnchange}
            showUploadList={false} // 不显示上传列表
          >
            <Button icon={<UploadOutlined />} disabled={imageList.length >= 6}>
              点击上传
            </Button>
            <div style={{ marginTop: '10px', marginRight: '10px' }}>
              {imageList.map((item,id) => (
                <img
                  key={id}
                  src={item}
                  alt='avatar'
                  style={{ height: '100px' }}
                />
              ))}
            </div>
          </Upload>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 14,
            offset: 6,
          }}
        >
          <Button type='primary' htmlType='submit' block>
            提交
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default Edit
