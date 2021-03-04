/*
 * File: index.tsx
 * Description: 描述
 * File Created: 2021-02-26 11:42:31
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-02-26 12:35:43
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2021 - Present, Your Company
 */
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Modal } from 'antd';
import React from 'react';
import ReactDom from 'react-dom';
import classnames from 'classnames';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/zh_CN';
import './index.less';

/**
 * modal弹出框hooks封装
 * @param param0
 */
export const useModal = ({
  wrapClassName,
  okText = '确定',
  cancelText = '取消',
  centered = true,
  onOk,
  onCancel,
  isNoModal = false,
  ...props
}: any): [(body: ReactNode) => void, () => void, ReactNode] => {
  const [body, setBody] = useState<ReactNode>('');
  const [visible, setVisible] = useState(false);
  wrapClassName = classnames('modalBoxCommon_hkhsxh', wrapClassName);

  const ref = useRef<any>();

  /**
   * 显示弹出层
   */
  const showModal = (body: ReactNode) => {
    setBody(body);
    setVisible(true);
  };
  //关闭弹出层
  const closeModal = async (e?: any) => {
    setVisible(false);
  };

  const modal = useMemo(
    () => (
      <Modal
        centered={centered}
        cancelText={cancelText}
        okText={okText}
        wrapClassName={wrapClassName}
        destroyOnClose={true}
        visible={visible}
        onCancel={async e => {
          onCancel && (await onCancel(e));
          setVisible(false);
        }}
        onOk={async e => {
          onOk && (await onOk(e));
        }}
        {...props}
      >
        {body}
      </Modal>
    ),
    [visible, body],
  );

  // //原生dom挂载和回收
  useEffect(() => {
    if (isNoModal) {
      //生成dom
      ref.current = document.createElement('div');
      //挂载dom
      // document.getElementById("root")?.appendChild(ref.current)
      document.body.appendChild(ref.current);
      // 回收 ReactDom dom
      return () => {
        ReactDom.unmountComponentAtNode(ref.current);
        document.body.removeChild(ref.current);
      };
    }
  }, []);

  // //reactDom挂载
  useEffect(() => {
    if (isNoModal) {
      //渲染节点
      ReactDom.render(
        <ConfigProvider locale={locale}>
          <Modal
            centered={centered}
            cancelText={cancelText}
            okText={okText}
            wrapClassName={wrapClassName}
            destroyOnClose={true}
            visible={visible}
            onCancel={async e => {
              onCancel && (await onCancel(e));
              setVisible(false);
            }}
            onOk={async e => {
              onOk && (await onOk(e));
            }}
            {...props}
          >
            {body}
          </Modal>
        </ConfigProvider>,
        ref.current,
      );
    }
  }, [visible, body]);

  return [showModal, closeModal, modal];
};
