/*
 * File: index.tsx
 * Description: tab切换组件
 * File Created: 2020-09-24 17:26:16
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-03-25 10:03:33
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { history } from 'umi';
import { TabsProps } from 'antd/lib/tabs';
import classname from 'classnames';
import { queryStringHash } from '../utils';
import styles from './index.less';

export interface Itab {
  key?: string | number;
  tab?: string;
  isShow?: string[];
  name?: string;
  closeIcon?: React.ReactNode;
  component?: React.FC | React.PureComponent | React.Component | React.ReactNode;
  render?: () => any;
}
type SU = string | undefined;
interface TabsNmgProps extends TabsProps {
  tabs: Itab[];
  defaultActiveKey: SU; //初始值
  handleTabChange?: Function; //切换回调
  className?: string;
  renderHeader?: any; //自定义tab头
  pType?: string; //父组件类型
  isAllShow?: boolean; //无权限控制
  pathName?: string; //控制是否将类型加到路由上
}
const { TabPane } = Tabs;
/**
 *
 * @class tab切换组件
 */
const TabsNmg: React.FC<TabsNmgProps> = props => {
  const {
    tabs,
    defaultActiveKey,
    handleTabChange,
    className,
    renderHeader,
    pType,
    isAllShow = true,
    pathName,

    ...restprops
  } = props;
  let _query: any = queryStringHash();
  const [activeKey, setActiveKey] = useState<SU>(
    (queryStringHash() as any).tabType || defaultActiveKey,
  );
  useEffect(() => {
    setActiveKey(_query.tabType || defaultActiveKey);
  }, [tabs]);
  const breadcrumbitem = tabs.find(item => item.key === activeKey);
  /**
   * 显示权限控制
   * @param tab
   * @param i
   */
  const renderIsShow = (tab: any, i: number) => {
    if (isAllShow || !tab?.isShow || tab.isShow?.includes(pType)) {
      return (
        <TabPane forceRender={false} key={tab.key || i} tab={tab.tab || tab.name}>
          {activeKey === tab.key && (tab.render ? tab.render() : tab?.component)}
        </TabPane>
      );
    } else {
      return null;
    }
  };
  return (
    <>
      {renderHeader && renderHeader(breadcrumbitem, tabs, activeKey)}
      <Tabs
        activeKey={activeKey}
        className={classname(styles.TabsNmg, className)}
        onChange={(key: any) => {
          setActiveKey(key);
          const pramas = queryStringHash();
          pathName &&
            history?.push({
              pathName,
              query: {
                ...pramas,
                tabType: key,
              },
            });

          handleTabChange && handleTabChange(key);
        }}
        {...restprops}
      >
        {tabs?.map((tab: any, i: number) => renderIsShow(tab, i))}
      </Tabs>
    </>
  );
};

export default TabsNmg;
