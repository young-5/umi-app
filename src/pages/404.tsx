/*
 * File: 404.tsx
 * Description: 无效路由组件
 * File Created: 2020-12-16 13:42:03
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-16 13:49:34
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react';
import { Link } from 'umi';
const NoFoundPage: React.FC<{}> = () => <Link to={'/'}> 我努力开发中。。。点我回到正常</Link>;

export default NoFoundPage;
