/*
 * File: index.tsx
 * Description: 操作按钮
 * File Created: 2020-11-11 16:40:03
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-16 15:30:07
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
// import Authorized from './utils/Authorized'
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import classnames from 'classnames';
import React from 'react';
import styles from './index.less';

interface IBtns extends ButtonProps {
  title?: string;
  icon?: any;
  click?: Function;
  render?: any;
  authority?: any;
}

interface IBtnsProps {
  btns: IBtns[];
}
/**
 *
 * @class 操作按钮
 */
const Btns: React.FC<IBtnsProps> = props => {
  const { btns } = props;
  const renderBtn = (btn: IBtns, i: number) => {
    const { title, className, render, ...restBtn } = btn;
    return render ? (
      render()
    ) : (
      <Button className={classnames(className, styles.btn)} key={i} {...restBtn}>
        {title}
      </Button>
    );
  };
  return (
    <div className={styles.btns_root}>
      {btns.map((btn: IBtns, i: number) => {
        return renderBtn(btn, i);
      })}
    </div>
  );
};

export default Btns;
