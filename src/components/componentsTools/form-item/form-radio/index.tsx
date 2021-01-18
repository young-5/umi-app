/*
 * File: index.tsx
 * Description: 表单单选框组件
 * File Created: 2020-09-28 14:24:48
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-11-11 11:30:18
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react'
import { Radio, Form } from 'antd'
import { FormBaseProps } from '../interface'
import { RadioGroupProps as RadioProps, RadioChangeEvent } from 'antd/lib/radio'
interface IRadioOption {
    value: string
    label: string
}

interface IFormRadioProps extends FormBaseProps {
    options: IRadioOption[]
    disabled?: boolean
    onChange?: (e: RadioChangeEvent) => void
    radioProps?: RadioProps
}

const FormRadio: React.FC<Partial<HTMLInputElement> & IFormRadioProps> = props => {
    const {
        form,
        labelCol,
        wrapperCol,
        label,
        name,
        readOnly,
        render,
        initialValue,
        disabled,
        required,
        validator,
        valueFilter,
        options,
        onChange,
        radioProps = {},
        ...restprops
    } = props
    const { getFieldValue } = form
    return (
        <Form.Item
            {...{
                label,
                name,
                labelCol,
                wrapperCol,
                initialValue,
            }}
            rules={[
                { required, message: `请选择${label}` },
                {
                    validator: (rule: any, value: any, callback: Function) =>
                        validator ? validator(rule, value, callback) : callback(),
                },
            ]}
            normalize={(value: any) => {
                if (valueFilter) return valueFilter(value)
                return value
            }}
            {...restprops}
        >
            {readOnly ? (
                render ? (
                    render(getFieldValue(name), form)
                ) : (
                    <span>{getFieldValue(name)}</span>
                )
            ) : (
                <Radio.Group
                    onChange={(value: RadioChangeEvent) => {
                        onChange && onChange(value)
                    }}
                    disabled={disabled}
                    {...{ ...radioProps }}
                >
                    {options.map((option: IRadioOption, I: number) => (
                        <Radio key={I} value={option.value || I}>
                            {option.label}
                        </Radio>
                    ))}
                </Radio.Group>
            )}
        </Form.Item>
    )
}

export default FormRadio
