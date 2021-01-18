/*
 * File: index.tsx
 * Description: 表单日期组件
 * File Created: 2020-09-28 15:37:07
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-11-20 17:51:40
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react'
import { Form, DatePicker } from 'antd'
import { FormBaseProps } from '../interface'
import moment from 'moment'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import 'moment/locale/zh-cn'
interface IFormDateProps extends FormBaseProps {
    /**是否为日期区间 */
    isRange?: boolean
    /** 日期转换格式 */
    format?: string
    /** 挂载的节点 */
    mountContainer?: string
    onChange?: (date: moment.Moment | null, dateString: string, setFieldsValue: Function) => void
    /** 日期框Date组件的props */
    dateProps?: any
}
const { RangePicker } = DatePicker
const FormDate: React.FC<IFormDateProps> = ({
    form,
    labelCol,
    wrapperCol,
    name,
    label,
    readOnly,
    initialValue,
    className,
    render,
    required,
    validator,
    isRange = false,
    format,
    mountContainer,
    onChange,
    dateProps,
    ...restprops
}) => {
    const { getFieldValue, setFieldsValue } = form
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
                // 转换moment类型给组件
                if (value && value.length > 0) {
                    if (isRange && !moment.isMoment(value[0]))
                        return [moment(value[0]), moment(value[1])]
                    if (!isRange && !moment.isMoment(value)) return moment(value)
                }
                return value
            }}
            {...restprops}
        >
            {readOnly ? (
                render ? (
                    render(getFieldValue(name), form)
                ) : (
                    <span>
                        {getFieldValue(name) && moment?.isMoment(getFieldValue(name))
                            ? getFieldValue(name)?.format('YYYY-MM-DD')
                            : getFieldValue(name)}
                    </span>
                )
            ) : isRange ? (
                <RangePicker
                    locale={locale}
                    {...(mountContainer && {
                        getPopupContainer: () => document.getElementById(mountContainer)!,
                    })}
                    onChange={(date: any, dateString: any) =>
                        onChange && onChange(date, dateString, setFieldsValue)
                    }
                    {...dateProps}
                />
            ) : (
                <DatePicker
                    {...(mountContainer && {
                        getPopupContainer: () => document.getElementById(mountContainer)!,
                    })}
                    format={format}
                    onChange={(date: any, dateString: any) =>
                        onChange && onChange(date, dateString, setFieldsValue)
                    }
                    {...dateProps}
                />
            )}
        </Form.Item>
    )
}

export default FormDate
