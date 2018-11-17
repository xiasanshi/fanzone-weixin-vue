/**
 * ----------------------------------------------------------
 * 总体路由到配置
 *
 * @version  1.0
 * @author shaqihe(shaqihecome@163.com)
 *
 * @module src/router/router
 * ----------------------------------------------------------
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../pages/Home'
import fanzone from '../pages/fanzone'
// import preJoin from '../pages/preJoin'
import groupon from '../pages/groupon/groupon'
import preGroupon from '../pages/groupon/preGroupon'
import preUsing from '../pages/preUsing'
import wish from '../pages/wish'
import order from '../pages/order'
import personal from '../pages/personal'
import history from '../pages/historys'
import preJoin from '../pages/preJoin'
import prePay from '../pages/prePay'
import updatePhone from '../pages/updatePhone'
import coupon from '../pages/coupon'
import business from '../pages/business'
import couponDetail from '../pages/couponDetails'
import shop from "../pages/shop"
import dynamic from "../pages/dynamic"
import payment from "../pages/payment"
import pay from "../pages/provide/pay"


Vue.use(VueRouter);

/**
 * 路由的设置
 *
 * @method  module:src/router/router#routes
 * @returns {obj}
 */
const routes = [
    {
        path: "/index",
        name: "index",
        component: (resolve) => {
            require(["../pages/index.vue"], resolve);
        }
    },
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '/updatePhone', component: updatePhone, name: 'updatePhone', meta: {
                    title: '聚汇 - 修改手机号'
                }
            },
        ],

    },
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '/fanzone', component: fanzone, name: 'fanzone', meta: {
                    title: '聚汇 - 首页'
                }
            },
        ],

    },
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '/coupon', component: coupon, name: 'coupon',
                meta: {
                    title: '聚汇 - 优惠券'
                }
            },
        ]
    },
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '/business', component: business, name: 'business', meta: {
                    title: '聚汇 - 商家'
                }
            },
        ],

    },
    /* {
         path: '/',
         component: 'Home',
         children: [
             {path: '/preGroupon/:id', component: preGroupon, name: preGroupon},
         ],
     },*/
    {
        path: "/preGroupon/:id",
        name: "preGroupon",
        component: (resolve) => {
            require(["../pages/preGroupon.vue"], resolve);
        }
    },
    {
        path: "/robot",
        name: "robot",
        component: (resolve) => {
            require(["../pages/robot.vue"], resolve);
        }
    },
    /*{
        path: '/',
        component: 'Home',
        children: [
            {path: '/preJoin/:id', component: preJoin, name: 'preJoin'},
        ],
    },*/
    {
        path: "/payment",
        name: "payment",
        component: payment,
        meta: {
            title: '聚汇 - 订单支付'
        }
    },
    {
        path: "/preJoin/:id",
        name: "preJoin",
        component: preJoin
    },
    {
        path: "/couponDetail/:businessId/:couponId",
        name: "couponDetail",
        component: couponDetail,
        meta: {
            title: '聚汇 - 优惠券详情'
        }
    },
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '/shop/:businessId', component: shop, name: 'shop', meta: {
                    title: '聚汇 - 商家详情'
                }
            },
        ],

    },
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '/personal', component: personal, name: 'personal', meta: {
                    title: '聚汇 - 个人中心'
                }
            },
        ],
    },
    {
        path: '/',
        component: Home,
        children: [
            {path: '/dynamic', component: dynamic, name: 'dynamic', meta: {
                    title: '聚汇 - 商家动态'
                }},
        ],

    },
    /* {
         path: "/customer",
         name: "customer",
         component: (resolve) => {
             require(["../pages/personal.vue"], resolve);
         }
     },*/
    {
        path: '/',
        component: Home,
        children: [
            {path: '/history', component: history, name: 'history'},
        ],
    },
    /*{
        path: "/history",
        name: "history",
        component: (resolve) => {
            require(["../pages/historys.vue"], resolve);
        }
    },*/
    {
        path: '/',
        component: Home,
        children: [
            {path: '/preUsing', component: preUsing, name: 'preUsing'},
        ],
    },
    /* {
         path: "/preUsing",
         name: "preUsing",
         component: (resolve) => {
             require(["../pages/preUsing.vue"], resolve);
         }
     },*/
    {
        path: '/',
        component: Home,
        children: [
            {path: '/wish', component: wish, name: 'wish'},
        ],
    },
    /*{
        path: "/wish",
        name: "wish",
        component: (resolve) => {
            require(["../pages/wish.vue"], resolve);
        }
    },*/
    {
        path: '*',
        redirect: {
            name: "index",
        },
    },
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '/order', component: order, name: 'order', meta: {
                    title: '聚汇 - 我的订单'
                }
            },
        ],

    },

    /* {
         path:'/order',
         name:'order',
         component: (resolve) => {
             require(["../pages/order.vue"], resolve);
         }
     },*/
    {
        path: '/',
        component: Home,
        children: [
            {path: '/prePay', component: prePay, name: 'prePay'},
        ],
    },
    {
        path: "/pay/:businessId",
        name: "pay",
        component: pay,
        meta: {
            title: '微信支付'
        }
    },
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '/groupon', component: groupon, name: 'groupon', meta: {
                    title: '聚汇 - 拼团'
                }
            },
        ],

    },

];

/**
 * 实例化路由
 *
 * @method  module:src/router/router#VueRouter
 * @returns {obj}
 */
export default new VueRouter({
    // mode: "hash",
    mode: "history",
    routes: routes
});
