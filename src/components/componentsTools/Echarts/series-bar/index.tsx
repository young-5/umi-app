/**
 * 系列-柱状图
 */
import React from 'react';
import EchartsReact from 'echarts-for-react';

interface ISeriesBarProps {
  [key: string]: any;
}

const SeriesBar: React.FC<ISeriesBarProps> = props => {
  const {
    color = ['#215FF9'],
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
    dataSource,
  } = props;
  const getAxisData = () => {
    let x: any = [];
    let y: any = [];
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
    series: [
      {
        name: '数量',
        type: 'bar',
        barWidth: '60%',
        data: yAxisData || getAxisData()?.y,
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

export default SeriesBar;
