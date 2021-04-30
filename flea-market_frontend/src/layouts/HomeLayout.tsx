import React from "react";
import { renderRoutes } from "react-router-config";
import {
  Header,
  TabBarLeft,
  TabBarRight,
  TabItem,
  TabText,
} from "./HomeLayout.style";
import { NavLink } from "react-router-dom";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import logo from '../assets/logo.png';

function Home(props: any) {
  const { route, location } = props;
  const handleOnclick = () => {
    console.log("你是傻逼");
  };
  return (
    <React.Fragment>
      <Header>
        <TabBarLeft>
          <NavLink to="/goods">
            <TabItem>
              <img
                className="tabItem-image"
                src={logo}
                alt="东华理工大学校园二手交易"
              />
            </TabItem>
          </NavLink>
          <NavLink to="/goods" activeClassName="selected">
            <TabItem>
              <span className="tabItem-hover">
                <TabText>首页</TabText>
              </span>
            </TabItem>
          </NavLink>
          <NavLink to="/buy" activeClassName="selected">
            <TabItem>
              <span className="tabItem-hover">
                <TabText>求购</TabText>
              </span>
            </TabItem>
          </NavLink>
        </TabBarLeft>
        <TabBarRight>
          <NavLink to={location.pathname} onClick={handleOnclick}>
            <TabItem>
              <span className="tabItem-hover">
                <TabText>发布</TabText>
                <span className="iconfont">&#xe7b2;</span>
              </span>
            </TabItem>
          </NavLink>
          <NavLink to="/login" activeClassName="selected">
            <TabItem>
              <span className="tabItem-hover">
                <TabText>登录</TabText>
              </span>
              <Avatar style={{ marginLeft: "12px" }} icon={<UserOutlined />} />
            </TabItem>
          </NavLink>
        </TabBarRight>
      </Header>
      {renderRoutes(route.routes)}
    </React.Fragment>
  );
}

// 缓存组件
export default React.memo(Home);
