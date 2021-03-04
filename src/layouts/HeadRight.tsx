/*
 * File: HeadRight.tsx
 * Description: 描述
 * File Created: 2021-03-04 10:52:59
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-03-04 10:56:47
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2021 - Present, Your Company
 */
import React from 'react';
import router from 'umi/router';
import { useTaoism } from '@/components/componentsTools/redux-y5';
interface NMGProps {}

const NMG: React.FC<NMGProps> = props => {
  let [userName] = useTaoism('userName', { light: true });
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <div
        style={{
          marginRight: '10px',
        }}
      >
        {userName || '无'}
      </div>
      <div
        style={{
          color: 'blue',
        }}
        onClick={() => {
          router.push('/login');
        }}
      >
        退出
      </div>
    </div>
  );
};

export default NMG;
