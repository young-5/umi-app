/*
 * File: index.tsx
 * Description: 表单搜索输入显示标签组件
 * File Created: 2020-09-28 16:17:04
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-16 16:20:05
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React, { useEffect, useState } from 'react';
import { Form, AutoComplete, Tag, Input, Button } from 'antd';
import { FormBaseProps } from '../interface';
import { FormInstance } from 'antd/lib/form/Form';
import { SelectValue, OptionProps } from 'antd/lib/select';
import { debounce } from 'lodash';
import { PrototypeCheck } from '../../utils';

interface IFormInputsearchProps extends FormBaseProps {
  options?: any[];
  apiParamsCb?: Function;
  fetchApi?: Function;
  /** 自定义Option children渲染 */
  optionRender?: (data: any) => React.ReactElement | string;
  popupContainerId?: string;
  selectBefore?: (value: any, option: any, form: FormInstance) => any;
  onChangeBc?: any;
  tagsClassName?: string;
  /** 自定义标签渲染的key */
  tagKey?: (data: any) => React.ReactElement | string;
  /** 是否显示标签 */
  showTags?: boolean;
  /** 自定义Tag children渲染 */
  tagRender?: (data: any) => React.ReactElement | string;
  /** 删除标签回调函数 */
  tagCloseCB?: Function;
  normalizeValue?: any;
  initialInputValue?: any;
  strAddable?: boolean;
}

const FormInputsearch: React.FC<IFormInputsearchProps> = ({
  form,
  labelCol,
  wrapperCol,
  label,
  name,
  readOnly = false,
  render,
  initialValue,
  className,
  required,
  validator,
  valueFilter,
  popupContainerId,
  options,
  fetchApi,
  selectBefore,
  onChangeBc,
  tagsClassName,
  tagKey,
  tagRender,
  showTags,
  normalizeValue,
  tagCloseCB,
  initialInputValue,
  strAddable,
  apiParamsCb,
  optionRender,
}) => {
  const { getFieldValue, setFieldsValue } = form;
  const [ownoptions, setOwnoptions] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<any>('');
  const onSearch = debounce(function(searchText: string) {
    function filterOption(datas: any[] | undefined) {
      let newData: any = datas?.filter(
        (data: any) => data.value.toUpperCase().indexOf(searchText.toUpperCase()) !== -1,
      );
      setOwnoptions(newData?.map((data: any) => ({ value: data.key, label: data.value })));
    }
    if (fetchApi) {
      fetchApi(searchText).then((datas: any[]) => {
        filterOption(datas);
      });
    } else {
      filterOption(options);
    }
  }, 500);
  const onSelect = (value: string, option?: any) => {
    const oldValue = getFieldValue(name) || [];
    setInputValue(option.label);
    if (!oldValue.find((item: any) => item.value === value)) {
      selectBefore && selectBefore(value, option, form);
      setFieldsValue({
        [name]: normalizeValue
          ? normalizeValue(value, option, getFieldValue(name))
          : [...oldValue, option],
      });
    }
  };
  const onChange = (value: string) => {
    setInputValue(value);
    onChangeBc && onChangeBc(value, form);
  };
  //正常显示
  const renderNormalRead = () => {
    return !showTags && readOnly && (render ? render(getFieldValue(name)) : getFieldValue(name));
  };
  //标签显示
  const renderTags = () => {
    const data = getFieldValue(name);
    return (
      <div style={{ lineHeight: 1 }} className={tagsClassName}>
        {data?.map((val: any, index: number) => (
          <Tag
            key={
              tagKey
                ? PrototypeCheck.isFunction(tagKey)
                  ? tagKey(val)
                  : val[tagKey as any]
                : val?.value
            }
            closable={!readOnly}
            onClose={(e: any) => onTagClose(e, index, val)}
          >
            {/* 默认显示value属性 */}
            {tagRender ? tagRender(val) : val.label}
          </Tag>
        ))}
      </div>
    );
  };
  /** 删除标签调用 */
  function onTagClose(_e: any, _i: number, _val?: any) {
    const fieldValue = getFieldValue(name);
    const filterValue: any[] = fieldValue.filter((_value: any) => _value.value !== _val.value);
    tagCloseCB
      ? tagCloseCB(_val, fieldValue, setFieldsValue, name)
      : setFieldsValue({
          // filterValue为空时设置undefined触发表单校验
          [name]: filterValue.length > 0 ? filterValue : undefined,
        });
    setInputValue('');
  }
  useEffect(() => {
    options && onSearch('');
  }, [options]);
  return (
    <Form.Item
      {...{
        name,
        label,
        labelCol,
        wrapperCol,
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
      normalize={(value: any) => {
        return valueFilter ? valueFilter(value) : value;
      }}
    >
      {!readOnly && (
        <AutoComplete
          options={ownoptions}
          style={{ width: 200 }}
          onSelect={onSelect}
          onSearch={onSearch}
          value={
            inputValue ||
            initialInputValue ||
            (PrototypeCheck.isString(getFieldValue(name)) && getFieldValue(name)) ||
            ''
          }
          onChange={onChange}
          placeholder={`请输入${label}`}
          {...{
            ...(popupContainerId && {
              getPopupContainer: () => document.getElementById(popupContainerId)!,
            }),
          }}
        >
          <Input
            suffix={
              strAddable && (
                <Button
                  className="search-btn"
                  style={{ marginRight: -12 }}
                  type="primary"
                  onClick={() => onSelect(inputValue)}
                >
                  确定
                </Button>
              )
            }
          />
        </AutoComplete>
      )}
      {showTags &&
        getFieldValue(name) &&
        (readOnly ? (render ? render(getFieldValue(name)) : renderTags()) : renderTags())}
      {renderNormalRead()}
    </Form.Item>
  );
};

export default FormInputsearch;
