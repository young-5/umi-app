/*
 * File: index.tsx
 * Description: 表单组合组件
 * File Created: 2020-09-29 14:52:28
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-10-21 16:03:04
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react'
import { Form, Input, Select } from 'antd'
import { FormBaseProps } from '../interface'
interface IField {
    [key: string]: any
}

interface FormGroupProps extends FormBaseProps {
    fields: IField[]
}

const FormComps = {
    input: ({ label, ...restProps }: any) => (
        <Input placeholder={`请选择${label}`} style={{ width: '100%' }} {...restProps} />
    ),
    select: ({ label, options, ...restProps }: any) => (
        <Select {...restProps} style={{ width: '100%' }} placeholder={`请选择${label}`}>
            {options &&
                options.map((option: any) => (
                    <Select.Option value={option.key} key={option.key}>
                        {option.value}
                    </Select.Option>
                ))}
        </Select>
    ),
}

const FormGroup: React.FC<FormGroupProps> = props => {
    const { label, labelCol, wrapperCol, fields } = props
    return (
        <Form.Item
            {...{
                label,
                labelCol,
                wrapperCol,
            }}
            className={props.className}
        >
            <Input.Group compact>
                {fields.map((field, i: number) => {
                    const {
                        type,
                        name,
                        initialValue,
                        required,
                        validator,
                        className,
                        style,
                        label,
                        ...resProps
                    } = field
                    const Comp = FormComps[type]
                    return (
                        <Form.Item
                            {...{
                                name,
                                initialValue,
                                className,
                                style,
                            }}
                            key={i}
                            validateFirst={true} //当某一规则校验不通过时，是否停止剩下的规则的校验
                            normalize={(value: any) => {
                                if (field.valueFilter) return field.valueFilter(value)
                                return value
                            }}
                            rules={[
                                { required, message: `请输入${label}` },
                                {
                                    validator: (rule, value, callback) =>
                                        validator ? validator(rule, value, callback) : callback(),
                                },
                            ]}
                            className={props.className}
                        >
                            <Comp
                                {...{
                                    label,
                                    name,
                                    ...resProps,
                                }}
                            />
                        </Form.Item>
                    )
                })}
            </Input.Group>
        </Form.Item>
    )
}

export default FormGroup
