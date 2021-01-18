/*
 * File: ToolBtn.tsx
 * Description: 操作组件
 * File Created: 2020-11-11 15:44:49
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-16 16:20:22
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react';
import { Popover } from 'antd';
import { PrototypeCheck } from '..//utils';
import { PopoverProps } from 'antd/lib/popover';
import styles from './index.less';

interface IBtn {
  title: string;
  icon?: any;
  click?: Function;
  isShow?: any;
}

interface IToolBtnProps extends PopoverProps {
  btns: IBtn[];
  pid?: string;
  isPopover?: boolean;
}

/**
 * @class 操作组件
 * @param props
 */
const ToolBtn: React.FC<IToolBtnProps> = props => {
  const { btns, children, isPopover = true, pid = '', ...restProps } = props;
  /**
   * @function renderTool 操作项显示
   * @param btn 操作项
   * @param i key
   */
  const renderTool = (btn: IBtn, i: number) => {
    return (
      ((btn.isShow && btn.isShow()) || !btn.isShow) && (
        <div
          className={styles.toolbtn}
          key={i}
          onClick={() => {
            btn?.click && btn?.click();
          }}
        >
          {btn?.icon && (PrototypeCheck.isFunction(btn?.icon) ? btn?.icon() : btn?.icon)}
          <span className={styles.btn_title}>{btn.title}</span>
        </div>
      )
    );
  };
  return (
    <div>
      {!isPopover ? (
        <div className={styles.tool_div}>
          {btns.map((btn: IBtn, i: number) => {
            return renderTool(btn, i);
          })}
        </div>
      ) : (
        <Popover
          overlayClassName={styles.tool_popover}
          content={btns.map((btn: IBtn, i: number) => {
            return renderTool(btn, i);
          })}
          {...restProps}
        >
          {children && children}
        </Popover>
      )}
    </div>
  );
};

export default ToolBtn;
