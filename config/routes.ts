/*
 * File: router.ts
 * Description: 描述
 * File Created: 2020-12-16 13:20:54
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-03-04 10:58:58
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
export default [
  {
    path: '/login',
    component: '../layouts/BaseLayout',
    routes: [
      {
        name: '登录',
        path: '/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', redirect: 'test' },
      { path: '/test', redirect: '/test/data' },
      {
        name: '简介',
        path: '/test/data',
        component: './componentsTest',
      },
      {
        name: '基础组件',
        path: '/test/components',
        component: './componentsTest/pages',
      },
      {
        name: '可视化组件',
        path: '/test/echarts',
        component: './componentsTest/echarts',
      },
      {
        name: '自定义全局状态',
        path: '/test/redux',
        component: './componentsTest/redux',
      },
      {
        name: '权限验证',
        path: '/test/auth',
        component: './componentsTest/auth',
      },
      {
        name: 'react',
        path: '/test/react',
        component: './componentsTest/react',
      },
    ],
  },
  {
    component: '404',
  },
];
