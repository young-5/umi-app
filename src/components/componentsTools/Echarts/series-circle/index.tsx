/**
 *  圆环组件
 */

import { Card } from 'antd';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';

interface EchartsPieProps {
  /**中心 */
  center?: string[];
  /**曲率 */
  radius?: string[];
  /**图例颜色 */
  color?: any[];
  /**标题 */
  title?: string;
  /**高度 */
  height?: number;
  /**是否lodeing */
  showLoading?: boolean;
  padding?: number;
  /**中心内容 */
  contentTitle?: string;
  /**数据 */
  datas: any[];
  /** 数据转换配置*/
  files?: any;
}

const EchartsPie: React.FC<EchartsPieProps> = props => {
  const {
    datas,
    height = 300,
    padding = 10,
    title,
    color = ['#237BE9', '#FDBA04', '#37CEEE', '#00D77E', '#F56C3C'],
    radius = ['60%', '80%'],
    center = ['25%', '50%'],
    showLoading,
    contentTitle = '总量',
    files,
  } = props;
  const [pieData, setPieData] = useState<any>([]);
  // 总数统计
  const arrCount = (arr: any): number => {
    let count = 0;
    arr?.forEach((item: any) => {
      count = count + item.value;
    });
    return count;
  };

  //数据转换
  const dataFilter = () => {
    let _data = [];
    _data =
      datas &&
      datas?.map((v: any) => {
        return {
          ...v,
          ...(files && {
            name: v[files.name],
            value: v[files.value],
          }),
        };
      });
    return _data;
  };
  useEffect(() => {
    setPieData(dataFilter());
  }, [datas]);
  const option = {
    title: {
      //标题
      text: [`${arrCount(pieData)}`, `${contentTitle}`].join('\n'),
      zlevel: 0,
      top: 'center',
      left: '24%',
      textAlign: 'center',
    },
    tooltip: {
      //提示框组件
      trigger: 'item',
      formatter: `主体信息 <br/>{b}: {c} ({d}%)`,
    },
    color: color, //图例颜色
    legend: {
      //图例
      itemGap: 10, //图例的间距
      orient: 'vertical',
      left: '50%', //图例组件离容器左侧的距离。
      bottom: 'center',
      // data 图例的数据数组
      formatter: function(name: string): any {
        if (pieData.length > 0) {
          const count = arrCount(pieData);
          //找到data中name和文本name值相同的对象
          const val = pieData.filter((v: any) => {
            return v.name === name;
          });
          return (
            name +
              '  ' +
              '占比：' +
              ((val[0]?.value &&
                (((val[0]?.value / count) as any)?.toFixed(4) * 100)?.toFixed(2)) ||
                0) +
              '%' +
              '  ' +
              '数量：' +
              val[0].value || 0 + '家'
          );
        }
      },
    },
    series: [
      //图表类型
      {
        name: title,
        type: 'pie',
        radius: radius,
        center: center,
        highLight: '0',
        stillShowZeroSum: false,
        avoidLabelOverlap: false,
        zlevel: 1,
        label: {
          //饼图图形上的文本标签
          normal: {
            backgroundColor: '#fff',
            position: 'center',
            padding: [padding, padding, padding, padding],
            borderRadius: 50,
            formatter: (params: any) => {
              return [
                `${params.data.value || '0' || arrCount(datas)}`,
                `${params.data.name || contentTitle}`,
              ].join('\n');
            },
            show: false,
          },
        },
        emphasis: {
          //高亮的文字标签
          label: {
            show: true,
            fontSize: 18,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: pieData,
        itemStyle: {
          shadowBlur: 1,
          shadowColor: 'rgba(155, 155, 155, 0.5)',
          shadowOffsetX: 3,
          shadowOffsetY: 3,
          opacity: 1,
        },
      },
    ],
  };
  return (
    <Card
      title={title}
      headStyle={{ border: 'none', fontWeight: 900 }}
      bodyStyle={{ padding: '10px' }}
    >
      <ReactEcharts option={option} style={{ height: `${height}px` }} showLoading={showLoading} />
    </Card>
  );
};

export default EchartsPie;
