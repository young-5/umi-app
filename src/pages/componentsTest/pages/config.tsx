/*
 * File: config.tsx
 * Description: 描述
 * File Created: 2020-12-16 15:07:41
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-02-05 16:35:56
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react';
import { Title, Spacer, TableBase, Transfer } from '@/components/componentsTools';
import FormSearch from './formSearch';
import TransferC from '@/components/componentsTools/Transfer';

export const tabList: any[] = [
  {
    key: '1',
    tab: '标题',
    component: <Title title={'公共组件测试'} height={50} isLine style={{ background: '#fff' }} />,
  },
  {
    key: '2',
    tab: '间隔',
    component: <Spacer height={'50px'} style={{ background: '#fff' }} />,
  },
  {
    key: '3',
    tab: '表格',
    component: (
      <TableBase
        columns={[
          {
            title: '序号',
            render: (value: any, data: any, i: number) => {
              return i < 9 ? `0${i + 1}` : i + 1;
            },
            width: 60,
          },
          {
            title: '标准号',
            dataIndex: 'standardNumber',
            width: 120,
          },
          {
            title: '模板名称',
            dataIndex: 'templateNAME',
            width: 120,
          },
        ]}
      />
    ),
  },
  {
    key: '4',
    tab: '表单查询',
    component: <FormSearch />,
  },
  {
    key: '5',
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
];
