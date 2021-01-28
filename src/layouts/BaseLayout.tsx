/*
 * File: BaseLayout.tsx
 * Description: 空布局
 * File Created: 2020-12-16 13:19:42
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-01-28 15:36:46
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react';
import styles from './index.less';
import { TaoismProvider } from '@/components/componentsTools/redux-y5';

const BasicLayout: React.FC = props => {
  return (
    <TaoismProvider>
      <div className={styles.BaseLayout}>
        <div>{props.children}</div>
      </div>
    </TaoismProvider>
  );
};

export default BasicLayout;
