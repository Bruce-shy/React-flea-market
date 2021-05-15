import { memo, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Form, Select, Button, Upload, Input, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { isLogin, normFile } from '../../common'
import { baseUrl } from '../../utils/config'
import { SellerLabel, LabelName } from '../../utils/interface'
import { createPurchaseRequest } from '../../services/purchases'
import * as actionTypes from '../Purchase/store/actionCreators'
import styles from './styles.moudle.less'

const { TextArea } = Input
const { Option } = Select
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const ReleaseBuy = (props: any) => {
  // 取别名操作
  const { isLogin: _isLogin } = props
  const { getPurchaseListDataDispatch } = props

  const [imageList, updateImageList] = useState([])

  const handleOnchange = ({ fileList }: any) => {
    updateImageList(fileList)
  }

  const handleOnFinish = (values: any) => {
    const { phoneNumber, qqNumber, weChatNumber, buyerLabel } = values

    if (!phoneNumber && !qqNumber && !weChatNumber) {
      // 如果手机号码 QQ号码 微信号 都没有填写， 报错
      message.error('微信号，手机号，QQ至少填写一项')
    }
    if (buyerLabel.length > 4) {
      message.error('标签最多选择四项')
    } else {
      // 尽量在最后一次处理 以提升性能
      console.log(
        'Received values of form: ',
        values,
        imageList.map((m: any) => m?.response?.url)
      )
      console.log('大sb', {
        ...values,
        imageUrl: imageList.map((m: any) => m?.response?.url),
      })
      createPurchaseRequest({
        ...values,
        imageUrl: imageList.map((m: any) => m?.response?.url),
      })
        .then((res: any) => {
          console.log(res)
          message.success(res.message)
          getPurchaseListDataDispatch() // 发布成功 重新获取求购数据
          props.history.push('/buy')
        })
        .catch((err) => {
          message.error(err)
        })
    }
  }

  useEffect(() => {
    if (!(_isLogin || isLogin())) {
      message.error('您尚未登录!')
      props.history.push('/') // 跳回主页
    }
  }, [_isLogin, props.history])

  return (
    <div className={styles.inner}>
      <div className={styles.contentWrap}>
        <h2 className={styles.titleText}>发布求购</h2>
        <Form
          name='release_goods' // 表单名称
          {...formItemLayout} // 布局
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
          <Form.Item
            name='buyerLabel'
            label='买家标签'
            initialValue={[SellerLabel.FixedPrice]}
          >
            <Select
              mode='multiple'
              maxTagCount={4}
              placeholder='请选择您商品适合的标签'
            >
              <Option value={SellerLabel.Genuine}>
                {LabelName[SellerLabel.Genuine]}
              </Option>
              <Option value={SellerLabel.NoDisassembly}>
                {LabelName[SellerLabel.NoDisassembly]}
              </Option>
              <Option value={SellerLabel.Guaranteed}>
                {LabelName[SellerLabel.Guaranteed]}
              </Option>
              <Option value={SellerLabel.FixedPrice}>
                {LabelName[SellerLabel.FixedPrice]}
              </Option>
              <Option value={SellerLabel.Negotiable}>
                {LabelName[SellerLabel.Negotiable]}
              </Option>
              <Option value={SellerLabel.Welcome}>
                {LabelName[SellerLabel.Welcome]}
              </Option>
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
            extra='请在上传前使用ps或者QQ截图对图片进行裁剪，才会不变形，更美观。推荐 750*750px（像素）最多上传6张图片'
          >
            <Upload
              name='file'
              fileList={imageList}
              action={baseUrl + '/upload'}
              listType='picture'
              maxCount={6}
              onChange={handleOnchange}
            >
              <Button
                icon={<UploadOutlined />}
                disabled={imageList.length >= 6}
              >
                点击上传
              </Button>
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
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  isLogin: state.getIn(['user', 'isLogin']),
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    getPurchaseListDataDispatch() {
      dispatch(actionTypes.getPurchaseList())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(ReleaseBuy))
