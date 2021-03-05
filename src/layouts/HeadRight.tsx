/*
 * File: HeadRight.tsx
 * Description: 描述
 * File Created: 2021-03-04 10:52:59
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-03-05 13:53:37
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2021 - Present, Your Company
 */
import React, { useEffect } from 'react';
import router from 'umi/router';
import { useTaoism } from '@/components/componentsTools/redux-y5';
interface NMGProps {}

const NMG: React.FC<NMGProps> = props => {
  let [userName, setTaoism] = useTaoism('userName', { light: true });
  useEffect(() => {
    if (!userName) {
      router.push('/login');
    }
  }, []);
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
          setTaoism('userName', false);
          router.push('/login');
        }}
      >
        退出
      </div>
    </div>
  );
};

export default NMG;
