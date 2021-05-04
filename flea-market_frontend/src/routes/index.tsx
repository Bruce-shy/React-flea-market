// 路由 二级路由
// React 自带路由懒加载
import React, { lazy, Suspense} from 'react';
import { Redirect } from 'react-router-dom';
import BlankLayout from '../layouts/BlankLayout';
import HomeLayout from '../layouts/HomeLayout';
// import ForumLayout from '../layouts/ForumLayout';

// 懒加载 不会直接引入
const HomeComponent = lazy(()=> import ('../pages/Home'));
const PurchaseComponent = lazy(()=> import ('../pages/Purchase'));
const LoginComponent = lazy(()=> import ('../pages/Login'));
const RegisterComponent = lazy(()=> import ('../pages/Register'));
const ReleaseGoodsComponent = lazy(()=> import ('../pages/ReleaseGoods'));
const ReleaseBuyComponent = lazy(()=> import ('../pages/ReleaseBuy'));
const GoodsDetailComponent = lazy(()=> import ('../pages/GoodsDetail'));
// const OrderComponent = lazy(() => import ('../pages/my/order/Order'))

// 进行性能优化 懒加载;
const SuspenseComponent = (Component: any) => (props : any) => {
    // fallback 是一个回滚事件
    return (
        <Suspense fallback= {null}>
            <Component {...props}>
            </Component>
        </Suspense>
    )
}

const defaultRoutes = [
    {
        component:BlankLayout, // 进来 空白布局
        routes: [
            {
                path:'/',
                component: HomeLayout,
                routes:[
                    {
                        path:'/',
                        exact:true,
                        render: () => <Redirect to={"/goods"}/>
                    },
                    {
                        path:'/goods',
                        // component: Home
                        component:SuspenseComponent(HomeComponent)
                    },
                    {
                        path:'/buy',
                        component:SuspenseComponent(PurchaseComponent)
                    },
                    {
                        path:'/login',
                        component:SuspenseComponent(LoginComponent)
                    },
                    {
                        path:'/register',
                        component:SuspenseComponent(RegisterComponent)
                    },
                    {
                        path:'/release_goods',
                        component:SuspenseComponent(ReleaseGoodsComponent)
                    },
                    {
                        path: '/release_buy',
                        component:SuspenseComponent(ReleaseBuyComponent)
                    },
                    {
                        path: '/goods_detail',
                        component:SuspenseComponent(GoodsDetailComponent)
                    }
                    // {
                    //     path:'/forum',
                    //     // component: Forum
                    //     component: ForumLayout,
                    //     routes:[
                    //         {
                    //             path:'/forum',
                    //             exact:true,
                    //             render: () => <Redirect to={"/forum/course"} />
                    //         },
                    //         {
                    //             path:'/forum/course',
                    //             component:SuspenseComponent(ForumComponent),
                    //             routes:[
                    //                 {
                    //                     // https://time.geekbang.org/column/intro/100056201?tab=intro
                    //                     path:'/forum/course/:id',
                    //                     component:SuspenseComponent(IntroComponent)
                    //                 },
                    //             ]
                    //         },
                    //         {
                    //             path:'/forum/camp',
                    //             component:SuspenseComponent(CampComponent)
                    //         },
                    //         {
                    //             path:'/forum/day',
                    //             component:SuspenseComponent(DayComponent)
                    //         },
                    //     ]
                    // },
                    // {
                    //     path:'/user',
                    //     component:SuspenseComponent(MyComponent),
                    //     routes:[
                    //         {
                    //             path:'/user/account',
                    //             component:SuspenseComponent(AccountComponent),
                    //         },
                    //         {
                    //             path:'/user/course',
                    //             component:SuspenseComponent(CourseComponent),
                    //         },
                    //         {
                    //             path:'/user/order',
                    //             component:SuspenseComponent(OrderComponent),
                    //         },
                    //     ]
                    // },
                    // {
                    //     path:'/payment',
                    //     component:SuspenseComponent(PayComponent)
                    // },
                ]
            }
        ]
    }
];

export default defaultRoutes;
