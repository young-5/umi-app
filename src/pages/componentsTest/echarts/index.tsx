/*
 * File: index.tsx
 * Description: 描述
 * File Created: 2020-12-16 17:33:22
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-02-20 10:58:25
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React, { useEffect } from 'react';
import { Title } from 'oi-ui';
import {
  SeriesCircle,
  SeriesLine,
  SeriesBar,
  SeriesNLine,
} from '@/components/componentsTools//Echarts';
interface NMGProps {}

const NMG: React.FC<NMGProps> = props => {
  useEffect(() => {}, []);
  //问题暂未处理
  return (
    <div
      style={{
        background: '#fff',
        display: 'flex',
      }}
    >
      <Title title={'环图'} width={'50%'}>
        <SeriesCircle
          files={{
            name: 'mainBodyType',
            value: 'allAmount',
          }}
          datas={[
            {
              mainBodyType: '基础组件',
              allAmount: 12,
            },
            {
              mainBodyType: '表单组件',
              allAmount: 2,
            },
            {
              mainBodyType: '表格组件',
              allAmount: 10,
            },
          ]}
          height={250}
        />
      </Title>
      <Title title={'单折线图'} width={'50%'}>
        <SeriesLine
          files={{
            x: 'mainBodyType',
            y: 'allAmount',
          }}
          isZoom={false}
          dataSource={[
            {
              mainBodyType: '2021',
              allAmount: 12,
            },
            {
              mainBodyType: '2020',
              allAmount: 2,
            },
            {
              mainBodyType: '2019',
              allAmount: 10,
            },
          ]}
        />
      </Title>
      <Title title={'n折线图'} width={'50%'}>
        <SeriesNLine
          files={{
            x: 'mainBodyType',
            y: ['allAmount', 'allAmount2'],
          }}
          dataSource={[
            {
              mainBodyType: '2021',
              allAmount: 12,
              allAmount2: 10,
            },
            {
              mainBodyType: '2020',
              allAmount: 2,
              allAmount2: 12,
            },
            {
              mainBodyType: '2019',
              allAmount: 10,
              allAmount2: 2,
            },
          ]}
          series={[
            {
              name: '类型1',
            },
            {
              name: '类型2',
            },
          ]}
          legend={['类型1', '类型2']}
        />
      </Title>
      <Title title={'柱状图'} width={'50%'}>
        <SeriesBar
          files={{
            x: 'x',
            y: ['y1', 'y2'],
          }}
          dataSource={[
            {
              x: '1月',
              y1: '1',
              y2: '15',
            },
            {
              x: '2月',
              y1: '1',
              y2: '18',
            },
            {
              x: '3月',
              y1: '12',
              y2: '13',
            },
            {
              x: '4月',
              y1: '16',
              y2: '1',
            },
            {
              x: '5月',
              y1: '3',
              y2: '12',
            },
          ]}
          legend={['类型1', '类型2']}
          series={[
            {
              name: '类型1',
            },
            {
              name: '类型2',
            },
          ]}
        />
      </Title>
    </div>
  );
};

export default NMG;
