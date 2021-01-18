/*
 * File: index.tsx
 * Description: 表单联动组件
 * File Created: 2020-09-29 14:52:28
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-11-30 16:31:07
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react'
import { Form, Input, Select } from 'antd'
import { FormBaseProps } from '../interface'
import GroupSelect from './GroupSelect'

interface IField extends FormBaseProps {
    [key: string]: any
}

interface IFormPickerProps extends FormBaseProps {
    fields: IField[]
}

const FormComps = {
    input: ({ label, ...restProps }: any) => (
        <Input placeholder={`请选择${label}`} style={{ width: '100%' }} {...restProps} />
    ),
    select: ({ label, options, searchKey, ...restProps }: any) => (
        <Select {...restProps} style={{ width: '100%' }} placeholder={`请选择${label}`}>
            {options &&
                options.map((option: any, i: number) => (
                    <Select.Option value={option.key} key={option.key | i}>
                        {option.value}
                    </Select.Option>
                ))}
        </Select>
    ),
    GroupSelect: (props: any) => <GroupSelect {...props} />,
}

const FormPicker = (props: IFormPickerProps) => {
    const { label, labelCol, wrapperCol, form, fields } = props
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
                {fields?.map(field => {
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
                            key={name}
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
                                    form,
                                }}
                            />
                        </Form.Item>
                    )
                })}
            </Input.Group>
        </Form.Item>
    )
}

export default FormPicker
