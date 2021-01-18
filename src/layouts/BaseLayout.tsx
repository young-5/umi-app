/*
 * File: BaseLayout.tsx
 * Description: 空布局
 * File Created: 2020-12-16 13:19:42
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-16 14:34:24
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react';
import styles from './index.less';

const BasicLayout: React.FC = props => {
  return (
    <div className={styles.BaseLayout}>
      <div>{props.children}</div>
    </div>
  );
};

export default BasicLayout;
