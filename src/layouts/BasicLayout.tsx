/*
 * File: BasicLayout.tsx
 * Description: 菜单布局
 * File Created: 2020-12-16 13:50:46
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-03-05 13:50:13
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React, { useState } from 'react';
import { Layout, Switch } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Menu } from '@/components/componentsTools';
import routes from '../../config/routes';
import HeadRight from './HeadRight';
import { useTaoism } from '@/components/componentsTools/redux-y5';
import 'antd/dist/antd.css';
import styles from './index.less';
import { TaoismProvider } from '@/components/componentsTools/redux-y5';
const { Header, Content, Footer, Sider } = Layout;
const BasicLayout: React.FC = props => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [layoutType, setLayoutType] = useState<string>('inline'); //horizontal   inline

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <TaoismProvider>
      <Layout>
        {layoutType === 'inline' ? (
          <>
            <Header className={styles.header} style={{ padding: 0 }}>
              <div
                style={{
                  float: 'right',
                  marginRight: '20px',
                  color: '#fff',
                  display: 'flex',
                }}
              >
                <div>
                  <Switch
                    checkedChildren="垂直"
                    onChange={(checked: boolean, event: Event) => {
                      checked ? setLayoutType('inline') : setLayoutType('horizontal');
                    }}
                    unCheckedChildren="水平"
                    defaultChecked
                  />
                </div>
                <HeadRight />
              </div>
            </Header>
            <Content>
              <Layout>
                <Sider width={200} collapsible collapsed={collapsed}>
                  <Menu datas={routes[1]?.routes} Menu mode="inline" />
                </Sider>
                <Content className={styles.content}>{props.children}</Content>
              </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>umi by young5 @2020</Footer>
          </>
        ) : (
          <>
            <Header className={styles.header} style={{ padding: 0 }}>
              <div
                style={{
                  float: 'right',
                  marginRight: '20px',
                  color: 'blue',
                  display: 'flex',
                }}
              >
                <div>
                  <Switch
                    checkedChildren="垂直"
                    onChange={(checked: boolean, event: Event) => {
                      checked ? setLayoutType('inline') : setLayoutType('horizontal');
                    }}
                    unCheckedChildren="水平"
                    defaultChecked
                  />
                </div>
                <HeadRight />
              </div>
              <Menu datas={routes[1]?.routes} Menu mode={layoutType} />
            </Header>
            <Content>
              <Content className={styles.content}>{props.children}</Content>
            </Content>
            <Footer style={{ textAlign: 'center' }}>umi by young5 @2020</Footer>
          </>
        )}
      </Layout>
    </TaoismProvider>
  );
};

export default BasicLayout;
