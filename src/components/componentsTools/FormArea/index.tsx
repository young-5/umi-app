/*
 * File: index.tsx
 * Description: 描述
 * File Created: 2020-12-08 09:50:04
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-01-29 16:08:38
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */

// import { getCityData } from '@/services/index';
import _ from 'lodash';
//地区选择
export const areTextFiles = (index = 5) => {
  return [
    {
      name: 'provinceText',
    },
    {
      name: 'cityText',
    },
    {
      name: 'areaText',
    },
    {
      name: 'townText',
    },
    {
      name: 'communityText',
    },
  ].splice(0, index);
};

export const areaFiles = (index = 5, width = '15%', labelCol?: number, name?: any) => {
  let fields = [
    {
      name: 'province',
      type: 'select',
      noPramas: true,
      connectKey: ['city', 'area', 'town', 'cityText', 'areaText', 'townText'],
      style: { width: width, marginRight: '10px' },
      options: [
        {
          key: '150000',
          value: '内蒙古自治区',
        },
      ],
      initialValue: '内蒙古自治区',
      nameText: 'provinceText',
      label: '省',
      required: true,
    },
    {
      name: 'city',
      type: 'GroupSelect',
      label: '市',
      searchKey: 'province',
      connectKey: ['area', 'town', 'areaText', 'townText'],
      nameText: 'cityText',
      fetchApi: (args: any) => {
        return getCityData?.(args)?.then((res: any) => {
          return res?.data?.map((v: any) => ({
            key: v.regionCode,
            value: v.regionName,
          }));
        });
      },
      apiParamsCb: (value: string | number) => {
        return { parentCode: 150000 };
      },
      style: { width: width, marginRight: '10px' },
      required: true,
    },
    {
      name: 'area',
      type: 'GroupSelect',
      searchKey: 'city',
      connectKey: ['town', 'townText'],
      nameText: 'areaText',
      style: { width: width, marginRight: '10px' },
      fetchApi: (args: any) =>
        getCityData?.(args)?.then((res: any) => {
          return res?.data?.map((v: any) => ({
            key: v.regionCode,
            value: v.regionName,
          }));
        }),
      apiParamsCb: (value: string | number) => {
        return { parentCode: value };
      },
      label: '区',
      required: true,
    },
    {
      name: 'town',
      type: 'GroupSelect',
      searchKey: 'area',
      nameText: 'townText',
      style: { width: width, marginRight: '10px' },
      fetchApi: (args: any) =>
        getCityData?.(args)?.then((res: any) => {
          return res?.data?.map((v: any) => ({
            key: v.regionCode,
            value: v.regionName,
          }));
        }),
      apiParamsCb: (value: string | number) => {
        return { parentCode: value };
      },
      label: '乡/镇',
    },
    {
      name: 'community',
      type: 'GroupSelect',
      searchKey: 'town',
      nameText: 'communityText',
      style: { width: width, marginRight: '10px' },
      fetchApi: (args: any) =>
        getCityData?.(args)?.then((res: any) => {
          return res?.data?.map((v: any) => ({
            key: v.regionCode,
            value: v.regionName,
          }));
        }),
      apiParamsCb: (value: string | number) => {
        return { parentCode: value };
      },
      label: '村/社区',
    },
  ];
  const newFields = fields.splice(0, index);
  const _files = [
    {
      label: '所属地区',
      fieldType: 'picker',
      className: name,
      name: 'domicile',
      width: '100%',
      ...(labelCol && {
        labelCol: { span: labelCol },
      }),
      fields: newFields,
    },
  ];
  return _files;
};
//重新设置城市
export const areafilterFormData = (data: any, index = 5, old: any = {}) => {
  let codeFiles = [
    {
      code: 'provinceCode',
      key: 'province',
      text: 'provinceText',
      init: '150000',
    },
    {
      code: 'cityCode',
      key: 'city',
      text: 'cityText',
    },
    {
      code: 'areaCode',
      key: 'area',
      text: 'areaText',
    },
    {
      code: 'townCode',
      key: 'town',
      text: 'townText',
    },
    {
      code: 'communityCode',
      key: 'community',
      text: 'communityText',
    },
  ].splice(0, index);

  let _area: any = {};
  codeFiles.forEach(v => {
    _area[v.code] = v.init ? v.init : data[v.key];
    if (_area[v.code]) {
      _area[v.key] = data[v.text] || old[v.key] || data[v.key];
    } else {
      _area[v.key] = data[v.text] || data[v.key];
    }
  });
  return {
    ..._.omit(data, 'provinceText', 'cityText', 'areaText', 'townText', 'communityText'),
    ..._area,
  };
};
//编辑回显获取code
export const changeAreCode = (data: any, index = 2) => {
  let areArry = ['province', 'city', 'area', 'town'];
  let areCodeArry = ['provinceCode', 'cityCode', 'areaCode', 'townCode'];
  let obj: any = {};
  data[areCodeArry[index]] &&
    areArry.forEach((v: any, i: number) => {
      obj[v] = data[areCodeArry[index]]?.substring(0, (i + 1) * 2) + '0000'.substring(0, 4 - i * 2);
    });
  return {
    ...data,
    ...obj,
  };
};
