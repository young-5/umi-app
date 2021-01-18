/*
 * File: index.tsx
 * Description: 表单复选框组件
 * File Created: 2020-09-28 09:36:53
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-11-02 12:37:21
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react'
import classNames from 'classnames'
import { FormInstance } from 'antd/lib/form/Form'
import { FormBaseProps } from '../interface'
import { Form, Checkbox } from 'antd'

interface ICheckboxItem {
    label: any
    value: any
}

interface FormCheckboxProps extends FormBaseProps {
    options: Array<ICheckboxItem>
}

const FormCheckbox: React.FC<FormCheckboxProps> = props => {
    const {
        form,
        labelCol,
        wrapperCol,
        label,
        name,
        initialValue,
        readOnly,
        className,
        required,
        valueFilter,
        validator,
        render,
        options,
        disabled,
        ...restProps
    }: FormCheckboxProps = props
    const { getFieldValue } = form as FormInstance
    return (
        <Form.Item
            {...{
                name,
                initialValue,
                label,
                labelCol,
                wrapperCol,
            }}
            rules={[
                { required, message: `请选择${label}` },
                {
                    validator: (rule: any, value: any, callback: Function) =>
                        validator ? validator(rule, value, callback) : callback(),
                },
            ]}
            validateFirst={true}
            normalize={(value: any) => {
                if (valueFilter) return valueFilter(value)
                return value
            }}
            className={classNames('rac_form_input', className)}
            {...restProps}
        >
            {readOnly ? (
                render ? (
                    render(getFieldValue(name))
                ) : (
                    <span>{getFieldValue(name)}</span>
                )
            ) : (
                <Checkbox.Group
                    style={{ width: '100%' }}
                    disabled={disabled}
                    options={options}
                ></Checkbox.Group>
            )}
        </Form.Item>
    )
}

export default FormCheckbox
