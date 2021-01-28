/*
 * File: index.tsx
 * Description: 系列-多折线图
 * File Created: 2020-12-01 10:41:06
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-01-28 14:33:15
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */

import React from 'react';
import EchartsReact from 'echarts-for-react';
interface ISeriesLineProps {
  legend?: string[];
  series?: any[];
  color?: any[];
  xAxisData?: any[];
  yAxisData?: any[][];
  dataSource?: any;
  files?: any;
}

const SeriesLine: React.FC<ISeriesLineProps> = props => {
  const {
    color = ['#215FF9', '#ff7200'],
    files = {
      x: 'x',
      y: 'y',
    },
    xAxisData,
    yAxisData,
    legend = ['目前评分', '平均分'],
    series,
    dataSource,
  } = props;
  const getAxisData = () => {
    let x: any[] = [];
    let y: any[] = [];
    dataSource.forEach((data: any) => {
      x.push(data[files.x]);
      files?.y?.forEach((v: any, i: number) => {
        if (y[i]) {
          y[i].push(data[v]);
        } else {
          y[i] = [data[v]];
        }
      });
    });
    return {
      x,
      y,
    };
  };
  const _y = getAxisData().y;
  const _series = series?.map((v, i) => {
    return {
      data: yAxisData ? yAxisData[i] : _y[i],
      type: 'line',
      color: color[i],
      smooth: false,
      ...v,
    };
  });
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
      data: legend,
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
    series: _series,
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
