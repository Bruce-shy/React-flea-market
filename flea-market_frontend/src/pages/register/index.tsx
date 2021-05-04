import { Form, Button, Upload, Input, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./styles.moudle.less";

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

const Register = () => {
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
        <h2 className={styles.titleText}>注册</h2>
        <Form
          name="register" // 表单名称
          {...formItemLayout} // 布局
          onFinish={handleOnFinish} // 提交表单且数据验证成功后回调事件
        >
          <Form.Item
            name="account"
            label="账号"
            rules={[
              {
                type: "number",
                message: "请输入数字",
              },
              {
                required: true,
                message: "请输入你的账号!",
              },
            ]}
          >
            <Input placeholder={"很重要, 这是你的唯一标识"} />
          </Form.Item>
          <Form.Item
            name="nickName"
            label="昵称"
            rules={[
              {
                required: true,
                message: "请输入你的昵称!",
              },
            ]}
          >
            <Input placeholder={"彰显你的个性"} />
          </Form.Item>
          <Form.Item
            name="college"
            label="学院"
            rules={[
              {
                required: true,
                message: "请输入你所在的学院!",
              },
            ]}
          >
            <Input placeholder={"输入自己的归属地"} />
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
            name="avatar"
            label="头像上传"
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
              span: 14,
              offset: 6,
            }}
          >
            <Button type="primary" htmlType="submit" block={true}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
