/*
 * File: index.tsx
 * Description: 描述
 * File Created: 2021-02-24 13:10:19
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-02-26 12:36:37
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2021 - Present, Your Company
 */
import React from 'react';
import { Title } from 'oi-ui';
import { useModal } from '@/components/hooks';
import { Button } from 'antd';
interface NMGProps {}

const NMG: React.FC<NMGProps> = props => {
  const [showModal, closeModal, modalmx] = useModal({
    title: 'useModal',
    footer: null,
    width: 780,
  });
  return (
    <div>
      <Title isLine title="自定义hook使用">
        <Button
          onClick={() => {
            showModal(<div>自定义hook使用</div>);
          }}
        >
          点我调用useModal
        </Button>
        {modalmx}
      </Title>
    </div>
  );
};

export default NMG;
