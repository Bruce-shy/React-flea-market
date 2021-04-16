import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Top, TabBar, TabItem } from './HomeLayout.style';
import { NavLink } from 'react-router-dom';


function Home(props: any) {
    const { route } = props;
    // console.log(route)
    return (
        <React.Fragment>
            <Top>
                <TabBar>
                    <NavLink to="/explore" activeClassName="selected">
                        <TabItem>
                            <img  className="tab-img" src="https://nidelemonya.cn/logo.jpeg" alt="" />
                        </TabItem>
                    </NavLink>
                    <NavLink to="/explore" activeClassName="selected">
                        <TabItem>
                            <div className="tab-title">首页</div>
                        </TabItem>
                    </NavLink>
                    <NavLink to="/forum" activeClassName="selected">
                        <TabItem>
                          <div className="tab-title">二手</div>
                      </TabItem>
                    </NavLink>
                    <NavLink to="/tribe" activeClassName="selected">
                        <TabItem>
                            <div className="tab-title">求购</div>
                        </TabItem>
                    </NavLink>
                    <NavLink to="/study" activeClassName="selected">
                        <TabItem>
                            <div className="tab-title">校园动态</div>
                        </TabItem>
                    </NavLink>
                    <NavLink to="/user" activeClassName="selected">
                        <TabItem>
                           <div className="tab-title">更多</div>
                     </TabItem>
                    </NavLink>
                    <NavLink to="/user" activeClassName="selected">
                        <TabItem>
                           <div className="tab-title">更多</div>
                     </TabItem>
                    </NavLink>
                    <NavLink to="/user" activeClassName="selected">
                        <TabItem>
                           <div className="tab-title">更多</div>
                     </TabItem>
                    </NavLink>
                    <NavLink to="/user" activeClassName="selected">
                        <TabItem>
                           <div className="tab-title">登录</div>
                     </TabItem>
                    </NavLink>
                </TabBar>
            </Top>
            {renderRoutes(route.routes)}
        </React.Fragment>
    )
}

// 缓存组件
export default React.memo(Home);
