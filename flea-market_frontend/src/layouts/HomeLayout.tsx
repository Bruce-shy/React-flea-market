import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Bottom, TabBar, TabItem } from './HomeLayout.style';
import { NavLink } from 'react-router-dom';


function Home(props: any) {
    const { route } = props;
    // console.log(route)
    return (
        <React.Fragment>
            <Bottom>
                <TabBar>
                    <NavLink to="/explore" activeClassName="selected">
                        <TabItem>
                            <span className="tab-icon iconfont ">&#xe605;</span>
                            <div className="tab-title">发现</div>
                        </TabItem>
                    </NavLink>
                    <NavLink to="/forum" activeClassName="selected">
                        <TabItem>
                         <span className="tab-icon iconfont ">&#xe668;</span>
                          <div className="tab-title">讲堂</div>
                      </TabItem>
                    </NavLink>
                    <NavLink to="/tribe" activeClassName="selected">
                        <TabItem>
                            <span className="tab-icon iconfont ">&#xe678;</span>
                            <div className="tab-title">部落</div>
                        </TabItem>
                    </NavLink>
                    <NavLink to="/study" activeClassName="selected">
                        <TabItem>
                            <span className="tab-icon iconfont ">&#xe609;</span>
                            <div className="tab-title">学习</div>
                        </TabItem>
                    </NavLink>
                    <NavLink to="/user" activeClassName="selected">
                        <TabItem>
                            <span className="tab-icon iconfont ">&#xe503;</span>
                           <div className="tab-title">我的</div>
                     </TabItem>
                    </NavLink>
                </TabBar>
            </Bottom>
            {renderRoutes(route.routes)}
        </React.Fragment>
    )
}

// 缓存组件
export default React.memo(Home);
