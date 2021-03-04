/*
 * File: AddressFormItem.tsx
 * Description: 描述
 * File Created: 2021-02-26 13:48:52
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-02-26 13:48:56
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2021 - Present, Your Company
 */
import React from 'react';
import { Form, Select } from 'antd';
import { useAddressOptions } from './useAddressOptions';

export const AddressFormItem: React.FC<{
  /**主键名 */
  name?: string | string[];
  /**默认地区 */
  label?: string;
  form: any;

  afterOnChangeCity?: () => void;
  afterOnChangeArea?: () => void;
}> = ({ name = 'address', label = '地区', form, afterOnChangeCity, afterOnChangeArea }) => {
  const {
    provinceOptions,
    cityOptions,
    areaOptions,
    onProvinceChange,
    onCityChange,
  } = useAddressOptions({ form, name });

  return (
    <Form.Item label={label}>
      <Form.Item name={[name as string, 'province']}>
        <Select
          onChange={onProvinceChange}
          placeholder={`请选择省`}
          options={provinceOptions.map(item => ({ value: item[0], label: item[1] }))}
        />
      </Form.Item>
      <Form.Item name={[name as string, 'city']}>
        <Select
          onChange={v => {
            onCityChange(v);
            afterOnChangeCity && afterOnChangeCity();
          }}
          placeholder={`请选择市`}
          options={cityOptions.map(item => ({ value: item[0], label: item[1] }))}
        />
      </Form.Item>
      <Form.Item name={[name as string, 'area']}>
        <Select
          labelInValue
          placeholder={`请选择区`}
          onChange={() => {
            afterOnChangeArea && afterOnChangeArea();
          }}
          options={areaOptions.map(item => ({ value: item[0], label: item[1] }))}
        />
      </Form.Item>
    </Form.Item>
  );
};
