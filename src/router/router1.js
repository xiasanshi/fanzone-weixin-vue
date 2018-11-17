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
import groupon from '../pages/fanzone'
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
        path: "/Fanzone",
        name: "groupon",
        component: (resolve) => {
            require(["../pages/fanzone.vue"], resolve);
        }
    },
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
    {
        path: "/preJoin/:id",
        name: "preJoin",
        component: (resolve) => {
            require(["../pages/preJoin.vue"], resolve);
        }
    },
    {
        path: "/customer",
        name: "order",
        component: (resolve) => {
            require(["../pages/personal.vue"], resolve);
        }
    },
    {
        path: "/history",
        name: "history",
        component: (resolve) => {
            require(["../pages/historys.vue"], resolve);
        }
    },
    {
        path: "/preUsing",
        name: "preUsing",
        component: (resolve) => {
            require(["../pages/preUsing.vue"], resolve);
        }
    },
    {
        path: "/wish",
        name: "wish",
        component: (resolve) => {
            require(["../pages/wish.vue"], resolve);
        }
    },
    {
        path: '*',
        redirect: {
            name: "index",
        },
    },
    {
        path:'/order',
        name:'join',
        component: (resolve) => {
            require(["../pages/join.vue"], resolve);
        }
    },
    {
        path:'/main',
        name:'footer',
        component: (resolve) => {
            require(["../components/foot.vue"], resolve);
        }
    }
];

/**
 * 实例化路由
 *
 * @method  module:src/router/router#VueRouter
 * @returns {obj}
 */
export default new VueRouter({
    mode: "hash",
    routes: routes
});
