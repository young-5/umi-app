/**
 * 系列-柱状图
 */
import React from 'react';
import EchartsReact from 'echarts-for-react';

interface ISeriesBarProps {
  series?: any;
  legend?: any;
  [key: string]: any;
}

const SeriesBar: React.FC<ISeriesBarProps> = props => {
  const {
    color = ['#215FF9', '#2100F9'],
    files = {
      x: 'x',
      y: ['y'],
    },
    xAxisData,
    yAxisData,
    dataSource,
    legend,
    series,
  } = props;

  const getAxisData = () => {
    let x: any[] = [];
    let y: any[] = [];
    dataSource?.forEach((data: any) => {
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
  const _series = series?.map((v: any, i: number) => {
    return {
      data: yAxisData ? yAxisData[i] : _y[i],
      type: 'bar',
      barWidth: '20%',
      color: color[i],
      ...v,
    };
  });
  const _option = {
    color: color,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
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
    xAxis: [
      {
        type: 'category',
        data: xAxisData || getAxisData()?.x,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
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

export default SeriesBar;
