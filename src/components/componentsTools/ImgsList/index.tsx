/*
 * File: index.tsx
 * Description: 图片走马灯
 * File Created: 2020-10-26 15:27:55
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-16 16:21:17
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react';
import Slider from 'react-slick';
import { PrototypeCheck } from '../utils';
// import 'slick-carousel/slick/slick-theme.css'
// import 'slick-carousel/slick/slick.css'
import styles from './index.less';

interface IDatas {
  title?: string;
  classname?: string;
  src?: string;
  name?: any;
  render?: (data: any) => React.ReactElement;
}

interface IImgsListProps {
  datas?: IDatas[];
  slidesToShow?: number;
  [key: string]: any;
  render?: (data: any) => React.ReactElement;
}
/**
 *
 * @class 图片走马灯
 */
const ImgsList: React.FC<IImgsListProps> = props => {
  const { datas, slidesToShow = 4, render, ...restprops } = props;
  const leng = datas && datas?.length > slidesToShow ? slidesToShow : datas?.length || 0;
  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: leng, //要根据轮播的图片长度来决定，例如长度为2时，这里就应该为2，然后下方的box1的宽度也要有变化。
    slidesToScroll: 1,
    arrows: true,
    ...restprops,
  };
  return (
    <div className={styles.Imglist_root}>
      {datas && datas?.length > 0 ? (
        <Slider {...settings}>
          {datas?.map((data: IDatas, i: number) => (
            <div className={styles[data?.classname || '']}>
              {render ? render(data) : PrototypeCheck.isString(data) ? data : data.src}
            </div>
          ))}
        </Slider>
      ) : (
        '暂无数据'
      )}
    </div>
  );
};

export default ImgsList;
