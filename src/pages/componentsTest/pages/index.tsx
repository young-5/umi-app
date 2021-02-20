/*
 * File: SS.tsx
 * Description: 描述
 * File Created: 2020-12-16 14:46:05
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-02-19 17:32:21
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React, { useEffect } from 'react';
import { Tabs } from '@/components/componentsTools';
import request from '@/services/utils';
import { tabList } from './config';

const NMG = () => {
  useEffect(() => {
    request({
      url: '/api/mock/list',
    }).then(res => {});
  }, []);
  return (
    <div>
      <Tabs tabs={[...tabList]} defaultActiveKey={'1'} pathName={'/test/components'} />
    </div>
  );
};

export default NMG;
