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
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function Home(props: any) {
  const { route } = props;
  return (
    <React.Fragment>
      <Header>
        <TabBarLeft>
          <NavLink to="/goods">
            <TabItem>
              <img
                className="tab-img"
                src="https://nidelemonya.cn/logo.jpeg"
                alt=""
              />
            </TabItem>
          </NavLink>
          <NavLink to="/goods" activeClassName="selected">
            <TabItem>
              <TabText>首页</TabText>
            </TabItem>
          </NavLink>
          <NavLink to="/buy" activeClassName="selected">
            <TabItem>
              <TabText>求购</TabText>
            </TabItem>
          </NavLink>
          <NavLink to="/news" activeClassName="selected">
            <TabItem>
              <TabText>校园动态</TabText>
            </TabItem>
          </NavLink>
        </TabBarLeft>
        <TabBarRight>
          <NavLink to="">
            <TabItem>
              <TabText>发布</TabText>
            </TabItem>
          </NavLink>
          <NavLink to="/login" activeClassName="selected">
            <TabItem>
              <TabText>登录</TabText>
              <Avatar style={{marginLeft: '12px'}} icon={<UserOutlined />} />
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
