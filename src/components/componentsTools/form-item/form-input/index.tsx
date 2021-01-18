/*
 * File: index.tsx
 * Description: 表单输入框组件
 * File Created: 2020-09-27 15:58:15
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-16 16:19:08
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { PrototypeCheck } from '../../utils';
import classNames from 'classnames';
import FormTextareaHint from '../form-textarea-hint';

export interface FormBaseProps extends FormItemProps {
  /** 字段的英文key */
  name?: string;
  /** 字段的中文名 */
  label?: string;
  /** 默认值 */
  initialValue?: any;
  /** form */
  form: FormInstance;
  /** 是否只读 */
  readOnly?: boolean;
  /** 是否不可编辑 */
  disabled?: boolean;
  /** 是否显示删除按钮 */
  allowClear?: boolean;
  /** 占位提示字符串 */
  placeholder?: string;
  /** 是否必填 */
  required?: boolean;
  /**输入长度 */
  max?: number;
  /** 数据过滤函数 */
  valueFilter?: (value: any) => any;
  /** 自定义校验函数 */
  validator?: (rule: any, value: any, callback: any, source?: any, options?: any) => any;
  /** 自定义详情渲染组件 */
  render?: (value: any, form?: FormInstance) => React.ReactElement;
}
interface FormInputProps extends FormBaseProps {
  /**
   * 不太的表单项自定义属性
   */
  /** 输入框Input组件的props */
  inputProps?: any;
  /** 输入的值类型 */
  valueType?: string;
  /** 是否显示文本框 */
  textarea?: boolean;
  autoSize?: any;
}

const FormInput = ({
  form,
  labelCol,
  wrapperCol,
  label,
  name = '',
  placeholder,
  readOnly,
  initialValue,
  disabled,
  className,
  inputProps,
  allowClear,
  render,
  textarea,
  autoSize,
  valueFilter,
  validator,
  max,
  required,
  valueType,
  ...restProps
}: FormInputProps) => {
  const { getFieldValue } = form as FormInstance;
  const [ownValue, setOwnValue] = useState<string>('');
  const rules = [
    {
      required,
      message: `请输入${label}`,
      transform: (value: any) => {
        if (value) {
          if (PrototypeCheck.isString(value)) {
            (value as string).trim();
          } else if (PrototypeCheck.isNumber(value)) {
            value = JSON.stringify(value);
          }
        }
        return value;
      },
    },
    {
      validator: (rule: any, value: any, callback: Function) => {
        if (value && valueType === 'number' && !PrototypeCheck.isNumber(Number(value))) {
          callback('请输入数字');
        }

        if (value && validator) {
          validator(rule, value, callback);
        } else callback();
      },
    },
    ...(max ? [{ max, message: `不能输入超过${max}个字符` }] : []),
  ];

  const commonProps = {
    placeholder: placeholder || `请输入${label}`,
    ...inputProps,
    disabled,
  };

  return (
    <Form.Item
      {...{
        label,
        labelCol,
        wrapperCol,
        initialValue,
      }}
      name={name}
      rules={rules}
      validateFirst={true} //当某一规则校验不通过时，是否停止剩下的规则的校验
      normalize={(value: any) => {
        if (valueFilter) return valueFilter(value);
        return value;
      }}
      className={classNames('rac_form_input', className)}
      {...restProps}
    >
      {readOnly ? (
        render ? (
          render(getFieldValue(name), form)
        ) : (
          <span>{getFieldValue(name)}</span>
        )
      ) : textarea ? (
        <div className="rac_form_textarea-container">
          <Input.TextArea
            {...commonProps}
            value={getFieldValue(name)}
            autosize={autoSize}
            onChange={({ target: { value } }: any) => {
              let newValue = value;
              setOwnValue(newValue);
            }}
          />
          <FormTextareaHint value={ownValue} maxLength={inputProps && inputProps.maxLength} />
        </div>
      ) : (
        <Input {...commonProps} allowClear={allowClear} />
      )}
    </Form.Item>
  );
};

export default FormInput;
