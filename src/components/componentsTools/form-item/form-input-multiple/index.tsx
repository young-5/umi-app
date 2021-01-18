/*
 * File: index.tsx
 * Description: 表单多输入框
 * File Created: 2020-09-30 09:38:13
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-16 16:19:15
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React, { useEffect, useState } from 'react';
import { FormBaseProps } from '../interface';
import { Form, Input, Button } from 'antd';
import { uuid } from '../../utils';
interface IFormInputMultipleProps extends FormBaseProps {
  fieldKeys: any[];
}

const FormInputMultiple: React.FC<IFormInputMultipleProps> = ({
  form,
  labelCol,
  wrapperCol,
  name,
  label,
  initialValue,
  className,
  readOnly,
  required,
  validator,
  fieldKeys,
}) => {
  const { getFieldValue, setFieldsValue } = form;

  /** 表单的值 */
  const [values, setValues] = useState(getFieldValue(name) || []);
  useEffect(() => {}, []);
  /**
   * 添加对应坐标的值
   * @param value
   * @param index
   */
  const setFormValue = (value: any, index: number) => {
    const newValue = Object.assign([], values, {
      [index]: { ...values[index], ...value },
    }).filter((v: any) => !!v);
    setFieldsValue({ [name]: newValue });
    setValues(newValue);
  };

  const deleteValue = (index: number) => {
    let newValues = values.filter((_value: any, i: number) => i !== index);
    setFieldsValue({ [name]: newValues });
    setValues(newValues);
  };
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
        { required, message: `请输入${label}` },
        {
          validator: (rule, value, callback) =>
            validator ? validator(rule, value, callback) : callback(),
        },
      ]}
    >
      {values.map((value: any, i: number) => (
        <Input.Group compact key={value.key}>
          {fieldKeys.map((fieldKey, index: number) => (
            <Input
              title={`请输入${fieldKey.label}`}
              placeholder={`请输入${fieldKey.label}`}
              key={value.key + index}
              style={{
                width: fieldKey.width || `${(80 / fieldKeys.length).toFixed(2)}%`,
              }}
              value={value[fieldKey.key]}
              onChange={e => setFormValue({ [fieldKey.key]: e.target.value }, i)}
            />
          ))}
          <Button type={'dashed'} style={{ width: '20%' }} onClick={() => deleteValue(i)}>
            {`刪除`}
          </Button>
        </Input.Group>
      ))}
      {!readOnly && (
        <Button type="primary" onClick={() => setFormValue({ key: uuid() }, values.length + 1)}>
          添加
        </Button>
      )}
    </Form.Item>
  );
};

export default FormInputMultiple;
