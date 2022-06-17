// 引入一级路由组件
// import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Search from '@/views/Search'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from "@/views/ShopCart"
import Trade from "@/views/Trade"
import Pay from "@/views/Pay"
import PaySuccess from "@/views/PaySuccess"
import Center from "@/views/Center"
// 引入二级路由组件
import myOrder from '@/views/Center/myOrder'
import groupOrder from '@/views/Center/groupOrder'
export default [

    {
        name: 'center',
        path: '/center',
        component: Center,
        meta: { isShowFooter: true },
        // 二级路由组件
        children: [
            {
                name: 'myorder',
                path: 'myorder',
                component: myOrder,
            },
            {
                name: 'grouporder',
                path: 'grouporder',
                component: groupOrder,
            },
            // 当center组件加载时，默认显示我的订单
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ],
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: PaySuccess,
        meta: { isShowFooter: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/pay') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        name: 'pay',
        path: '/pay',
        component: Pay,
        meta: { isShowFooter: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        name: 'trade',
        path: '/trade',
        component: Trade,
        meta: { isShowFooter: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        name: 'home',
        path: '/home',
        component: () => import('@/views/Home'),
        meta: { isShowFooter: true }

    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        meta: { isShowFooter: false },
    },
    {
        name: 'register',
        path: '/register',
        component: Register,
        meta: { isShowFooter: false }

    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search,
        meta: { isShowFooter: true },
        // props($route) {
        //   return {
        //     keyWord: $route.params.keyWord
        //   }
        // }
    },
    {
        name: 'detail',
        path: '/detail/:skuId',
        component: Detail,
        meta: { isShowFooter: true }

    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: { isShowFooter: true }

    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ShopCart,
        meta: { isShowFooter: true }
    },
    // 重定向，再项目跑起来的时候，访问/  立马让他定向到首页
    {
        path: '*',
        redirect: '/home'
    },
]