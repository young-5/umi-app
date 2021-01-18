/*
 * File: config.ts
 * Description: 描述
 * File Created: 2020-12-25 12:53:08
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-25 12:54:47
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
import routes from './routes';
import proxy from './proxy';
const config: IConfig = {
  treeShaking: true,
  routes,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: false,
        dva: false,
        dynamicImport: false,
        title: 'umi-app',
        dll: false,

        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
  history: 'hash', // 默认是 browser
  proxy,
};

export default config;
