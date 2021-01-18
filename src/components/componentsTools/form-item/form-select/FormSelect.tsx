/*
 * File: FormSlect.tsx
 * Description: 表单下拉框组件
 * File Created: 2020-09-28 10:28:19
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-16 16:20:57
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React, { useCallback, useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import { FormInstance } from 'antd/lib/form/Form';
import { PrototypeCheck } from '../../utils';
import { debounce } from 'lodash';
import { FormBaseProps } from '../interface';

interface IFormSelectProps extends FormBaseProps, SelectProps<any> {
  /**静态数据 */
  options: any[];
  popupContainerId?: string;
  className: string;
  /**回显数据处理 */
  normalizeGetValue: Function;
  /**选择调用 */
  onSelect: any;
  /** 选择之后弹窗提示确认操作 */
  changeConfirm?: (param: { onCancel: Function; value: any; oldValue: any; form: any }) => void;
  /**改变调用 */
  onChange: any;
  /** 是否庞大的下拉option列表 */
  isHugeOptions?: boolean;
  /** 是否挂载组件时请求接口 */
  mountFetchApi?: boolean;
  /** 搜索调用的API */
  fetchApi?: Function;
  /** 是否formdata的接口传参 */
  isFormData?: boolean;
  /** formdata参数的key */
  formDataKey?: string;
  /** api的参数获取回调，通过value生成新的参数 */
  apiParamsCb?: (value: any) => any;
  placeholder?: any;
  children?: any;
}
const { Option } = Select;
const FormSelect: React.FC<IFormSelectProps> = ({
  form,
  wrapperCol,
  labelCol,
  label,
  name,
  initialValue,
  readOnly,
  render,
  className,
  placeholder,
  required,
  validator,
  options,
  popupContainerId,
  normalizeGetValue,
  onSelect,
  changeConfirm,
  onChange,
  showSearch,
  isHugeOptions,
  mountFetchApi = true,
  fetchApi,
  apiParamsCb,
  isFormData,
  formDataKey,
  ...restProps
}) => {
  const { setFieldsValue, getFieldValue } = form as FormInstance;
  const [localOptions, setLocalOptions] = useState<any[]>([]);
  /** 设置单个Option */
  function setOption(v: any) {
    return (
      <Option key={v.value} value={v.value} data-original={v}>
        {v.label || v.value}
      </Option>
    );
  }
  /** 设置所有的Option */
  const setOptionsMemoized = useCallback(
    (options: any[], value?: any) => {
      /** 设置所有的Option */
      function setOptions(options: any[], value?: any) {
        let localOptions: any[];
        // 搜索显示option的处理
        if (showSearch && value) {
          localOptions = options.reduce((prev: any[], curr: any) => {
            curr.value.includes(value) && prev.push(setOption(curr));
            return prev;
          }, []);
        } else {
          localOptions = isHugeOptions ? [] : options.map(setOption);
        }
        setLocalOptions(localOptions);
      }
      setOptions(options, value);
    },
    [showSearch, isHugeOptions, setLocalOptions],
  );
  useEffect(() => {
    options && setOptionsMemoized(options);
  }, [options, setOptionsMemoized]);
  // 排除字符串以外的数据
  const handleSelect = (value: any): void => {
    // if (!PrototypeCheck.isString(value)) value = value.key
    if (!changeConfirm) {
      // 不确认时直接setvalue
      setFieldsValue({ [name]: value });
      return;
    }
    // 确认后继续，取消后恢复
    const oldValue = getFieldValue(name);
    const setValue = (value: any) => setFieldsValue({ [name]: value });
    changeConfirm({
      onCancel: () => setValue(oldValue),
      value,
      oldValue,
      form,
    });
  };
  /** 筛选数据 */
  const filterOption: any = (inputValue: string, option: React.ReactElement) => {
    if (!inputValue) return false;
    const { props } = option;
    return (props.children! as string).includes(inputValue);
  };
  const onSearch = debounce(function(value) {
    if (value) {
      // 挂载时不请求搜索时才发请求
      !mountFetchApi && fetchApiDataMemoized(value);
    }
  }, 500);
  /** 获取接口数据 */
  const fetchApiDataMemoized = useCallback(
    (value?: string) => {
      function fetchApiData(value?: any): void {
        if (!fetchApi) {
          if (!options) throw new Error('options 不能为空');
          setOptionsMemoized(options, value);
          return;
        }
        let apiParams;
        if (apiParamsCb) {
          if (isFormData) {
            apiParams = new FormData();
            apiParams.append(formDataKey || 'data', JSON.stringify(apiParamsCb(value)));
          } else {
            apiParams = apiParamsCb(value);
          }
        }
        // 调用接口
        fetchApi(apiParams || value).then((datas: any[]) => {
          setOptionsMemoized(datas, value);
        });
      }
      fetchApiData(value);
    },
    [fetchApi, options, apiParamsCb, isFormData, formDataKey, setOptionsMemoized],
  );

  useEffect(() => {
    mountFetchApi && fetchApiDataMemoized();
  }, [fetchApiDataMemoized, mountFetchApi]);
  return (
    <Form.Item
      {...{
        labelCol,
        wrapperCol,
        label,
        name,
        initialValue,
        className,
      }}
      rules={[
        { required, message: `请选择${label}` },
        {
          validator: (rule: any, value: any, callback: Function) =>
            validator ? validator(rule, value, callback) : callback(),
        },
      ]}
    >
      {readOnly ? (
        render ? (
          render(getFieldValue(name), form)
        ) : (
          getFieldValue(name)
        )
      ) : (
        <Select
          style={{ width: '100%' }}
          placeholder={placeholder || `请选择${label}`}
          onSearch={onSearch}
          onSelect={(value: any, option: any) => {
            onSelect && onSelect(value, option, form);
            handleSelect(value);
          }}
          showSearch={showSearch}
          onChange={(value: any, option: any) => {
            onChange && onChange(value, option, form);
            // 点击删除时，清空表单数据
            if (!value) {
              setFieldsValue({
                [name]: PrototypeCheck.isNumber(value) ? value.toString() : value,
              });
            }
          }}
          filterOption={filterOption}
          optionFilterProp="children"
          value={normalizeGetValue ? normalizeGetValue(getFieldValue(name)) : getFieldValue(name)}
          {...{
            ...restProps,
            ...(popupContainerId && {
              getPopupContainer: () => document.getElementById(popupContainerId)!,
            }),
          }}
        >
          {localOptions}
        </Select>
      )}
    </Form.Item>
  );
};

export default FormSelect;
