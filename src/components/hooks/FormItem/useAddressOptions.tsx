/*
 * File: useAddressOptions
 * Description: 描述
 * File Created: 2021-02-26 13:48:18
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-02-26 13:50:26
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2021 - Present, Your Company
 */
import React from 'react';

type OptionsDts = [any, any][];

export const useAddressOptions: (props: {
  /**表单实体 */
  form: any;
  /**主键名 */
  name: string | string[];
  /**下拉框值类型 默认value */
  valueType?: 'value' | 'labelInValue';
}) => {
  /**省选项 */
  provinceOptions: OptionsDts;
  /**市选项 */
  cityOptions: OptionsDts;
  /**区选项 */
  areaOptions: OptionsDts;
  /**省改变 */
  onProvinceChange: (v: any) => void;
  /**市改变 */
  onCityChange: (v: any) => void;
  http?: any;
} = ({ form, name, valueType = 'value' }) => {
  /**省选项 */
  const [provinceOptions, setProvinceOptions] = React.useState<OptionsDts>([
    ['150000', '内蒙古自治区'],
  ]);

  /**市选项 */
  const [cityOptions, setCityOptions] = React.useState<OptionsDts>([]);

  /**区选项 */
  const [areaOptions, setAreaOptions] = React.useState<OptionsDts>([]);

  /**加载获取省选项 */
  React.useEffect(() => {
    // http({
    //   url:
    // })
  }, []);

  /**省改变 */
  const onProvinceChange = (v: any) => {
    const value = valueType === 'value' ? v : v?.value;
    http({
      url: '/region/find_by_parent_code?parentCode=' + value,
    }).then((res: any) => {
      if (res !== false) {
        res = Array.isArray(res) ? res : [];
        setCityOptions(res.map((item: any) => [item?.regionCode, item?.regionName]));
        setAreaOptions([]);
        form?.setFieldsValue({
          [name as string]: {
            city: undefined,
            area: undefined,
          },
        });
      }
    });
  };

  /**市改变 */
  const onCityChange = (v: any) => {
    const value = valueType === 'value' ? v : v?.value;
    http({
      url: '/region/find_by_parent_code?parentCode=' + value,
    }).then((res: any) => {
      if (res !== false) {
        res = Array.isArray(res) ? res : [];
        setAreaOptions(res.map((item: any) => [item?.regionCode, item?.regionName]));
        form?.setFieldsValue({
          [name as string]: {
            area: undefined,
          },
        });
      }
    });
  };

  return {
    areaOptions,
    cityOptions,
    provinceOptions,
    onProvinceChange,
    onCityChange,
  };
};
