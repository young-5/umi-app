/*
 * File: proxy.tsx
 * Description: 描述
 * File Created: 2020-12-16 13:33:05
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-25 09:01:19
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
const HOST_URL = '';
const BASE_IP = 'http://192.168.21.159:8081/'; //基础支撑平台swaggerUI
export default {
  proxy: {
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
  },
};
