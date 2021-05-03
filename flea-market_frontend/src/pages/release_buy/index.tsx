import styles from "./styles.moudle.less";
import { Form, Select, Button, Upload, Input, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {SellerLabel} from '../../common/interface';

const { TextArea } = Input;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const normFile = (e: any) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const ReleaseBuy = () => {
  const handleOnFinish = (values: any) => {
    const { phone_number, qq_number, weChat_number,seller_label } = values;
    if (!phone_number && !qq_number && !weChat_number) {
      // 如果手机号码 QQ号码 微信号 都没有填写， 报错
      message.error('微信号，手机号，QQ至少填写一项');
    }
    if(seller_label.length >4) {
      message.error('标签最多选择四项');
    }
    console.log("Received values of form: ", values);
  };
  return (
    <div className={styles.inner}>
      <div className={styles.contentWrap}>
        <h2 className={styles.titleText}>发布求购</h2>
        <Form
          name="release_goods" // 表单名称
          {...formItemLayout} // 布局
          onFinish={handleOnFinish} // 提交表单且数据验证成功后回调事件
        >
          <Form.Item
            name="title"
            label="标题"
            rules={[
              {
                type: "string",
                message: "请输入正确的标题",
              },
              {
                required: true,
                message: "请输入商品标题!",
              },
            ]}
          >
            <Input placeholder={"很重要，让别人对您的需求一目了然"} />
          </Form.Item>
          <Form.Item name="brief" label="简介(可选)">
            <TextArea
              placeholder="让别人更清晰了解您的需求"
              allowClear={true}
            />
          </Form.Item>
          <Form.Item
            name="price"
            label="可接受价格"
            rules={[
              {
                required: true,
                message: "请输入商品标价!",
              },
            ]}
          >
            <Input placeholder={"数字或文字，可接受的价格，如'100-150之间'"} />
          </Form.Item>
          <Form.Item
            name="seller_label"
            label="卖家标签"
            rules={[
              {
                required: true,
                message: "请选择您商品适合的标签!",
                type: "array",
              },
            ]}
          >
            <Select mode="multiple" maxTagCount={4} placeholder="请选择您商品适合的标签">
              <Option value={SellerLabel.Genuine}>原装正品</Option>
              <Option value={SellerLabel.NoDisassembly}>无拆无修</Option>
              <Option value={SellerLabel.Guaranteed}>如假包换</Option>
              <Option value={SellerLabel.FixedPrice}>一口价</Option>
              <Option value={SellerLabel.Negotiable}>价格可谈</Option>
              <Option value={SellerLabel.Welcome}>欢迎来撩</Option>
            </Select>
          </Form.Item>
          <Form.Item name="weChat_number" label="微信">
            <Input placeholder={"微信号，手机号，QQ至少填写一项"} />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="手机号"
            rules={[
              {
                type: "number",
                message: "请输入数字",
              },
            ]}
          >
            <Input placeholder={"微信号，手机号，QQ至少填写一项"} />
          </Form.Item>
          <Form.Item
            name="qq_number"
            label="QQ"
            rules={[
              {
                type: "number",
                message: "请输入数字",
              },
            ]}
          >
            <Input placeholder={"微信号，手机号，QQ至少填写一项"} />
          </Form.Item>
          <Form.Item
            name="img_upload"
            label="图片上传"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="请在上传前使用ps或者QQ截图对图片进行裁剪，才会不变形，更美观。推荐 750*750px（像素）"
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 12,
              offset: 6,
            }}
          >
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ReleaseBuy;
