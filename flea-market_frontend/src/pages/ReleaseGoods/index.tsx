import { memo, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  Form,
  Cascader,
  Select,
  Button,
  Upload,
  // Rate,
  message,
  Input,
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { isLogin, normFile } from '../../common'
import { baseUrl } from '../../utils/config'
import { SellerLabel, LabelName, CategoryOptions } from '../../utils/interface'
import { createGoodsRequest } from '../../services/goods'
import * as actionTypes from '../Home/store/actionCreators'
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

const ReleaseGoods = (props: any) => {
  const { _isLogin } = props
  const { getGoodsListDataDispatch } = props

  const [imageList, updateImageList] = useState([])

  const handleOnchange = ({ fileList }: any) => {
    updateImageList(fileList)
  }

  const handleOnFinish = (values: any) => {
    const { phoneNumber, qqNumber, weChatNumber, sellerLabel } = values

    if (!phoneNumber && !qqNumber && !weChatNumber) {
      // 如果手机号码 QQ号码 微信号 都没有填写， 报错
      message.error('微信号，手机号，QQ至少填写一项')
    }
    if (sellerLabel.length > 4) {
      message.error('标签最多选择四项')
    } else {
      createGoodsRequest({
        ...values,
        imageUrl: imageList.map((m: any) => m?.response?.url),
      })
        .then((res: any) => {
          console.log('res', res)
          message.success(res.message)
          getGoodsListDataDispatch() // 发布成功 重新获取商品数据
          props.history.push('/goods')
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
        <h2 className={styles.titleText}>发布商品</h2>
        <Form
          name='release_goods' // 表单名称
          {...formItemLayout} // 布局
          onFinish={handleOnFinish}
          initialValues={{
            // 初始值
            postage: '商议',
          }}
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
            <Input placeholder={'很重要，显示在列表页'} />
          </Form.Item>
          <Form.Item
            name='brief'
            label='简介'
            rules={[
              {
                required: true,
                message: '请输入商品简介!',
              },
            ]}
          >
            <TextArea
              placeholder='很重要，显示在商品详情页'
              allowClear={true}
            />
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
              placeholder={
                '数字，购买时的价格，可以填大概价格，让用户对比性价比'
              }
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
            rules={[
              {
                required: true,
                message: '请上传商品图片!',
              },
            ]}
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
  _isLogin: state.getIn(['user', 'isLogin']),
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    getGoodsListDataDispatch() {
      dispatch(actionTypes.getGoodsList())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(ReleaseGoods))
