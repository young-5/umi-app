/*
 * File: proxy.tsx
 * Description: 描述
 * File Created: 2020-12-16 13:33:05
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-03-04 11:06:56
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
const HOST_URL = '';
const BASE_IP = 'http://192.168.21.159:8081/'; //基础支撑平台swaggerUI
const WGIP = 'http://192.168.21.150:63/WG_IP/'; //测试地址
export default {
  '/api': {
    target: HOST_URL,
    changeOrigin: true,
    pathRewrite: { '/api': '' },
  },
  '/base': {
    target: BASE_IP,
    changeOrigin: true,
    pathRewrite: { '/base': '' },
  },
  '/WG_IP/': {
    //本地
    target: WGIP,
    changeOrigin: true,
    pathRewrite: { '^/WG_IP/': '' },
  },
};
