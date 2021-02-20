/*
 * File: config.tsx
 * Description: 描述
 * File Created: 2020-12-16 15:07:41
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-02-20 10:58:05
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react';
import FormSearch from './formSearch';
import { Title } from 'oi-ui';
import OI from './oi';
import TransferC from '@/components/componentsTools/Transfer';

export const tabList: any[] = [
  {
    key: '1',
    tab: '标题',
    component: <Title title={'公共组件测试'} height={50} isLine style={{ background: '#fff' }} />,
  },
  {
    key: '2',
    tab: '表单查询',
    component: <FormSearch />,
  },
  {
    key: '3',
    tab: '穿梭框',
    component: (
      <TransferC
        listStyle={{
          width: 250,
          height: 300,
        }}
      />
    ),
  },
  {
    key: '4',
    tab: 'oi-ui组件库',
    component: <OI />,
  },
];
