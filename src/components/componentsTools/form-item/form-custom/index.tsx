/*
 * File: index.tsx
 * Description: 自定義表單項組件
 * File Created: 2020-09-29 11:38:12
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-10-26 14:55:41
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react'
import { Form } from 'antd'
import { FormBaseProps } from '../form-input'
import { FormInstance } from 'antd/lib/form/Form'

interface FormCustomProps extends FormBaseProps {
    customRender?: (form?: FormInstance) => React.ReactNode
    [key: string]: any
}

const FormCustom = (props: FormCustomProps) => {
    const {
        label,
        labelCol,
        wrapperCol,
        name,
        initialValue,
        required,
        validator,
        form,
        customRender,
    } = props
    return (
        <Form.Item
            {...{
                label,
                labelCol,
                wrapperCol,
                name,
                initialValue,
            }}
            rules={[
                { required, message: `请输入${label}` },
                {
                    validator: (rule, value, callback) =>
                        validator ? validator(rule, value, callback) : callback(),
                },
            ]}
            className={props.className}
            style={props.style}
        >
            {customRender && customRender(form)}
        </Form.Item>
    )
}

export default FormCustom
