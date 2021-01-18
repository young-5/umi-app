/*
 * File: interface.ts
 * Description: 表单元素公共接口
 * File Created: 2020-09-28 14:37:49
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-10-21 15:11:54
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react'
import { FormInstance } from 'antd/lib/form/Form'
import { FormItemProps } from 'antd/lib/form/FormItem'

export interface FormBaseProps extends FormItemProps {
    /** 字段的英文key */
    name: string
    /** 字段的中文名 */
    label?: string
    /** 默认值 */
    initialValue?: any
    /** form */
    form: FormInstance
    /** 是否只读 */
    readOnly?: boolean
    /** 是否不可编辑 */
    disabled?: boolean
    /** 是否显示删除按钮 */
    allowClear?: boolean
    /** 占位提示字符串 */
    placeholder?: string
    /** 是否必填 */
    required?: boolean
    /**输入长度 */
    max?: number
    /** 数据过滤函数 */
    valueFilter?: (value: any) => any
    /** 自定义校验函数 */
    validator?: (rule: any, value: any, callback: any, source?: any, options?: any) => any
    /** 自定义详情渲染组件 */
    render?: (value: any, form?: FormInstance) => React.ReactElement
}
