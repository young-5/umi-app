/*
 * File: index.tsx
 * Description: 描述
 * File Created: 2020-12-25 08:50:06
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-25 08:59:57
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import request from './utils';

interface IPostprops {
  data?: any;
  url: string;
}

export const post = ({ data, url }: IPostprops) => {
  return request({
    data,
    url,
    method: 'post',
  });
};

interface IGetprops {
  params?: any;
  url: string;
}
export const get = ({ params, url }: IGetprops) => {
  return request({
    params,
    url,
  });
};
