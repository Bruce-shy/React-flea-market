import React, { useState, createRef, useEffect } from 'react'
import {
  Card,
  Form,
  Cascader,
  Select,
  Button,
  Upload,
  message,
  Input,
} from 'antd'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import { normFile, isPhoneNumber } from '../../common'
import { createApi, getOneById, modifyOne } from '../../services/goods'
import { CategoryOptions } from '../../utils/interface'
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

  const handleOnchange = ({ fileList }) => {
    console.log(fileList)
    updateImageList([
      ...imageList,
      fileList[fileList.length - 1]?.response?.url,
    ])
  }

  const handleOnFinish = (values) => {
    const { phoneNumber, qqNumber, weChatNumber, sellerLabel } = values

    if (!isPhoneNumber(phoneNumber)) {
      return
    }
    if (!phoneNumber && !qqNumber && !weChatNumber) {
      // 如果手机号码 QQ号码 微信号 都没有填写， 报错
      message.error('微信号，手机号，QQ至少填写一项')
    }
    if (sellerLabel.length > 4) {
      message.error('标签最多选择四项')
    } else {
      // 有则修改
      if (props.match.params.id) {
        modifyOne(props.match.params.id, {
          ...values,
          imageUrl: imageList,
        })
          .then((res) => {
            if (res.success) {
              message.success(res.message)
              props.history.push('/admin/goods')
            } else {
              message.error(res.message)
            }
          })
          .catch((err) => {
            message.error(err.message)
          })
      } else {
        // 无则创建
        createApi({
          ...values,
          imageUrl: imageList,
          account: 'root',
        })
          .then((res) => {
            if (res.success) {
              message.success(res.message)
              props.history.push('/admin/goods')
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

  useEffect(() => {
    if (props.match.params.id) {
      getOneById(props.match.params.id).then((res) => {
        fromRef.current.setFieldsValue({
          title: res.data.title,
          brief: res.data.brief,
          category: res.data.category,
          price: res.data.price,
          originPrice: res.data.originPrice,
          sellerLabel: res.data.sellerLabel,
          postage: res.data.postage,
          weChatNumber: res.data.weChatNumber,
          phoneNumber: res.data.phoneNumber,
          qqNumber: res.data.qqNumber,
        })
        updateImageList(res.data.imageUrl)
      })
    }
  }, [props.match.params.id])

  return (
    <Card
      title='商品编辑'
      extra={
        <Button onClick={() => props.history.push('/admin/goods')}>返回</Button>
      }
    >
      <Form
        name='release_goods' // 表单名称
        ref={fromRef}
        {...formItemLayout} // 布局
        onFinish={handleOnFinish}
      >
        <Form.Item
          label='标题'
          name='title'
          rules={[{ required: true, message: '请输入商品标题' }]}
        >
          <Input placeholder='很重要，显示在列表页' />
        </Form.Item>
        <Form.Item
          label='简介'
          name='brief'
          rules={[
            {
              required: true,
              message: '请输入商品简介!',
            },
          ]}
        >
          <TextArea placeholder='很重要，显示在商品详情页' allowClear={true} />
        </Form.Item>
        <Form.Item
          name='category'
          label='类别'
          rules={[
            {
              required: true,
              message: '请选择商品类别!',
            },
          ]}
        >
          <Cascader options={CategoryOptions} />
        </Form.Item>
        <Form.Item
          name='price'
          label='标价'
          rules={[
            {
              type: 'string',
              message: '请输入数字',
            },
            {
              required: true,
              message: '请输入商品标价!',
            },
          ]}
        >
          <Input placeholder={'数字，想卖的价格'} />
        </Form.Item>
        <Form.Item
          name='originPrice'
          label='原价'
          rules={[
            {
              type: 'string',
              message: '请输入数字',
            },
            {
              required: true,
              message: '请输入商品原价!',
            },
          ]}
        >
          <Input
            placeholder={'数字，购买时的价格，可以填大概价格，让用户对比性价比'}
          />
        </Form.Item>
        <Form.Item
          name='sellerLabel'
          label='卖家标签'
          rules={[
            {
              required: true,
              message: '请选择您商品适合的标签!',
              type: 'array',
            },
          ]}
        >
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
        <Form.Item
          name='postage'
          label='邮费'
          rules={[
            {
              required: true,
              message: '请输入邮费!',
            },
          ]}
        >
          <Input placeholder={'填写数字'} />
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
            defaultFileList={imageList}
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
              {imageList.map((item) => (
                <img
                  key={item}
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
