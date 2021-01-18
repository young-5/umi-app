/*
 * File: BasicLayout.tsx
 * Description: 菜单布局
 * File Created: 2020-12-16 13:50:46
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-01-12 10:07:37
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React, { useState } from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Menu } from '@/components/componentsTools';
import routes from '../../config/routes';
import 'antd/dist/antd.css';
import router from 'umi/router';
import styles from './index.less';
const { Header, Content, Footer, Sider } = Layout;
const BasicLayout: React.FC = props => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout>
      <Header className={styles.header} style={{ padding: 0 }}>
        <Menu datas={routes[0]?.routes} Menu mode="horizontal" />
      </Header>
      <Content>
        <Content className={styles.content}>{props.children}</Content>
        {/* <Layout>
          <Sider width={200} collapsible collapsed={collapsed}>
            <Menu datas={routes[0]?.routes} Menu mode="horizontal" />
          </Sider>
          <Content className={styles.content}>{props.children}</Content>
        </Layout> */}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
};

export default BasicLayout;
