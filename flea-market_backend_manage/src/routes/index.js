import Login from '../pages/login/Login'
import Index from '../pages/dashboard/Index'
import GoodsList from '../pages/goods/List'
import GoodsEdit from '../pages/goods/Edit'
import User from '../pages/user/User'
import UserEdit from '../pages/user/UserEdit'
import PurchaseList from '../pages/purchase/List'
import PurchaseEdit from '../pages/purchase/Edit'
import PageNotFound from '../pages/login/PageNotFound'

export const mainRoutes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/404',
    component: PageNotFound,
  },
]

export const adminRoutes = [
  {
    path: '/admin/dashboard',
    component: Index,
    isShow: true,
    title: '看板',
    icon: 'area-chart',
  },
  {
    path: '/admin/goods',
    component: GoodsList,
    isShow: true,
    exact: true,
    title: '商品管理',
    icon: 'shop',
  },
  {
    path: '/admin/purchase',
    component: PurchaseList,
    isShow: true,
    exact: true,
    title: '求购管理',
    icon: 'shop',
  },
  {
    path: '/admin/goods/edit/:id?',
    component: GoodsEdit,
    isShow: false,
  },
  {
    path: '/admin/purchase/edit/:id?',
    component: PurchaseEdit,
    isShow: false,
  },
  {
    path: '/admin/user',
    component: User,
    isShow: true,
    exact: true,
    title: '用户管理',
    icon: 'area-chart',
  },
  {
    path: '/admin/user/edit/:id?',
    component: UserEdit,
    isShow: false,
  }
]
