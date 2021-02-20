/*
 * File: index.tsx
 * Description: 公共组件测试
 * File Created: 2020-12-16 09:28:17
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-02-20 14:28:59
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React, { useEffect } from 'react';
import { Title } from 'oi-ui';
import request from '@/services/utils';

const NMG = () => {
  useEffect(() => {
    request({
      url: '/api/mock/list',
    }).then(res => {});
  }, []);
  return (
    <div>
      <Title title={'项目看简介'} isLine>
        本项目是基于umi进行搭建的后台系统，使用了umi
        的路由配置等相关基础配置。布局layouts自定义,权限自定义，全局model自定义
      </Title>
      <Title title={'技术栈'} isLine>
        <div>基于redux的全局简易工具</div>
        <div>基于redux的权限验证</div>
        <div>基于axios的请求</div>
        <div>基于echarts的可视化</div>
        <div>基于antd的基础组件</div>
      </Title>
    </div>
  );
};

export default NMG;
