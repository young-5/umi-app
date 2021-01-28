/**
 * 系列-平滑折线图
 */
import React from 'react';
import EchartsReact from 'echarts-for-react';
// import * as echarts from 'echarts';
interface ISeriesLineProps {
  color?: any[];
  files?: any;
  xAxisData?: any;
  yAxisData?: any;
  dataSource: any;
  isZoom?: boolean;
  isTools?: boolean;
}

const SeriesLine: React.FC<ISeriesLineProps> = props => {
  const {
    color = ['#215FF9'],
    files = {
      x: 'x',
      y: 'y',
    },
    xAxisData = false,
    yAxisData = false,
    dataSource = [],
    isZoom = true,
    isTools = false,
  } = props;
  //数据处理
  const getAxisData = () => {
    let x: any[] = [];
    let y: any[] = [];
    dataSource?.forEach((data: any) => {
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
    xAxis: {
      type: 'category',
      data: xAxisData || getAxisData()?.x,
    },
    yAxis: {
      type: 'value',
      // max: 30,
      // min:0,
      minInterval: 2,
      interval: 2, //每次增加几个
    },
    ...(isTools && {
      toolbox: {
        right: '20',
        feature: {
          dataZoom: {
            yAxisIndex: 'none',
          },
          restore: {},
          saveAsImage: {},
        },
      },
    }),
    ...(isZoom && {
      dataZoom: [
        {
          startValue: xAxisData && xAxisData[0],
        },
        {
          type: 'inside',
        },
      ],
    }),

    series: [
      {
        data: yAxisData || getAxisData()?.y,
        type: 'line',
        color: color,
        smooth: true,
        // areaStyle: {
        //   color: new echarts()?.graphic?.LinearGradient(0, 0, 0, 1, [
        //     {
        //       offset: 0,
        //       color: '#D2DEFD',
        //     },
        //     {
        //       offset: 1,
        //       color: '#D7E1FD',
        //     },
        //   ]),
        // },
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
