/*
 * File: index.tsx
 * Description: 描述
 * File Created: 2020-12-16 17:33:22
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-01-12 10:20:42
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React, { useEffect } from 'react';
import { Title } from '@/components/componentsTools';
import { SeriesCircle } from '@/components/componentsTools//Echarts';
import { useTaoism } from '@/components/componentsTools/redux-y5';
interface NMGProps {}

const NMG: React.FC<NMGProps> = props => {
  // let [userName] = useTaoism('userName', { light: true });
  useEffect(() => {}, []);
  //问题暂未处理
  return (
    <div>
      <Title title={'环'}>
        {/* {userName} */}
        {/* <SeriesCircle
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
        /> */}
      </Title>
    </div>
  );
};

export default NMG;
