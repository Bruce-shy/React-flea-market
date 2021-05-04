import { useState } from "react";
import { Form, Input, Button, Checkbox, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import styles from "./styles.moudle.less";

const ModalTitle = () => {
  return (
    <div className={styles.modalTitleWrap}>
      <span>请联系管理员</span>
    </div>
  );
};

const Login = () => {
  const [isModalVisible, updateIsModalVisible] = useState(false);

  const handleShowModal = () => {
    updateIsModalVisible(true);
  };

  const handleOnOk = () => {
    updateIsModalVisible(false);
  };

  const handleOnCancel = () => {
    updateIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className={styles.loginWrap}>
      <div className={styles.formWrap}>
        <div className={styles.navWrap}>
        <NavLink  to="/register">注册!</NavLink>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入你的学号!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="学号"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入你的密码!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <div className={styles.loginFooterWrap}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
              <Button type="primary" size="small" onClick={handleShowModal}>
                忘记密码?
              </Button>
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block={true}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Modal
        centered={true}
        title={<ModalTitle />}
        visible={isModalVisible}
        onOk={handleOnOk}
        onCancel={handleOnCancel}
      >
        <div className={styles.modalContentWrap}>
          <span>Email: 1239941131@qq.com</span>
          <span>QQ: 1239941131</span>
        </div>
      </Modal>
    </div>
  );
};
export default Login;
