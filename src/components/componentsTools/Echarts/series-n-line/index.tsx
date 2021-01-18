/*
 * File: index.tsx
 * Description: 系列-多折线图
 * File Created: 2020-12-01 10:41:06
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-16 17:50:03
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */

import React from 'react';
import EchartsReact from 'echarts-for-react';
interface ISeriesLineProps {
  [key: string]: any;
}

const SeriesLine: React.FC<ISeriesLineProps> = props => {
  const {
    color = ['#215FF9', '#ff7200'],
    files = {
      x: 'x',
      y: 'y',
    },
    xAxisData = [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    yAxisData = [120, 200, 150, 800, 70, 110, 1300, 120, 2000, 150, 80, 70],
    yAxisData2 = [12, 220, 15, 80, 170, 10, 20, 120, 200, 250, 180, 70],
    dataSource,
  } = props;
  const getAxisData = () => {
    let x: any[] = [];
    let y: any[] = [];
    dataSource.forEach((data: any) => {
      x.push(data[files.x]);
      y.push(data[files.y]);
    });
    return {
      x,
      y,
    };
  };
  const _option = {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    legend: {
      data: ['目前评分', '平均分'],
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData || getAxisData()?.y,
    },
    yAxis: {
      type: 'value',
    },
    toolbox: {
      left: '20',
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        name: '目前评分',
        data: yAxisData,
        type: 'line',
        color: color[0],
        smooth: false,
      },
      {
        name: '平均分',
        data: yAxisData2,
        type: 'line',
        color: color[1],
        smooth: false,
      },
    ],
  };
  return (
    <div>
      <EchartsReact
        option={_option}
        style={{
          height: '300px',
        }}
      />
    </div>
  );
};

export default SeriesLine;
