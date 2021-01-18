/*
 * File: index.tsx
 * Description: 菜单组件
 * File Created: 2020-12-16 13:57:14
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-01-12 10:03:43
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React, { useEffect, useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Menu, Button } from 'antd';
import { Link } from 'umi';
import { PieChartOutlined, MailOutlined } from '@ant-design/icons';
import { checkLogin } from '../utils';

const { SubMenu } = Menu;

interface Iitem {
  path: string;
  icon: any;
  name: string;
  routes?: any[];
  hide?: boolean;
  premise?: string[];
  mode: any;
}

const _Menu = (props: any) => {
  const { datas, collapsed, auth, mode } = props;
  //菜单选中和展开
  const path = props.location.pathname;
  let openKey = '';
  for (let menuObj of datas) {
    if (menuObj.routes && menuObj.routes.length) {
      for (let menuList of menuObj.routes) {
        if (menuList.path === path) {
          openKey = menuObj.path;
        }
      }
    }
  }

  //权限获取
  const getPermits = (): any[] | null => {
    return auth ? auth.permissions : null;
  };
  //权限校验
  const requireAuth = (permit: any, component: React.ReactElement) => {
    const permits = getPermits();
    if (!permits || !permits.includes(permit)) return <Redirect to={'404'} />;
    return component;
  };
  //登录校验
  const requireLogin = (component: React.ReactElement, permit: any) => {
    const permits = getPermits();
    if (!checkLogin(permits)) {
      // 线上环境判断是否登录
      return <Redirect to={'/login'} />;
    }
    return permit ? requireAuth(permit, component) : component;
  };
  //菜单渲染

  const renderMenuItem = (item: any) => {
    return item.routes ? (
      <SubMenu key={item.path} icon={<MailOutlined />} title={item.name}>
        {item.routes?.map((v: any) => {
          return renderMenuItem(v);
        })}
      </SubMenu>
    ) : (
      item.component && item.path && !item.hide && (
        <Menu.Item key={item.path} icon={<PieChartOutlined />}>
          <Link to={item.path}> {item.name}</Link>
        </Menu.Item>
      )
    );
  };

  return (
    <div>
      <Menu openKeys={[openKey]} selectedKeys={[path]} mode={mode} inlineCollapsed={collapsed}>
        {datas.map((v: any) => {
          return renderMenuItem(v);
        })}
      </Menu>
    </div>
  );
};

export default withRouter(_Menu);
