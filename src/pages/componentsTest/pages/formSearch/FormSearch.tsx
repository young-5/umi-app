/*
 * File: FormSearch.tsx
 * Description: 描述
 * File Created: 2021-02-03 17:44:23
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-02-20 11:02:59
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2021 - Present, Your Company
 */
import React from 'react';
import { FormContainer } from '@/components/componentsTools';
import { Table } from 'oi-ui';
import { Form } from 'antd';
interface NMGProps {}

const NMG: React.FC<NMGProps> = props => {
  const [form] = Form.useForm();
  return (
    <div
      style={{
        background: '#fff',
      }}
    >
      <FormContainer
        form={form}
        isBtn={false}
        isleft
        fields={[
          {
            fieldType: 'input',
            label: '姓名',
            name: 'name',
          },
          {
            fieldType: 'input',
            label: '年龄',
            name: 'old',
          },
          {
            fieldType: 'input',
            label: '能力',
            name: 'do',
          },
        ]}
      />
      <Table
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
            dataIndex: 'name',
            width: 120,
          },
          {
            title: '年龄',
            dataIndex: 'old',
            width: 120,
          },
          {
            title: '能力',
            dataIndex: 'do',
            width: 120,
          },
        ]}
        dataSource={[
          {
            name: '小五',
            old: '233',
            do: 'react',
          },
          {
            name: '小三',
            old: '33',
            do: 'vue',
          },
        ]}
      />
    </div>
  );
};

export default NMG;
