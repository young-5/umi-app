/*
 * File: group-Select.tsx
 * Description: 表单联动选择框组件
 * File Created: 2020-09-29 16:13:48
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-16 09:54:14
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React, { useState, useEffect, useCallback } from 'react'
import { FormInstance } from 'antd/lib/form/Form'
import { Select, message } from 'antd'
import _ from 'lodash'
interface IGroupSelectProps {
    name: any
    nameText: any
    label?: any
    form: FormInstance
    options?: any[]
    showSearch?: boolean
    isHugeOptions?: boolean
    /**自定义接口的相关属性 */
    fetchApi?: any
    apiParamsCb?: any
    formDataKey?: any
    isFormData?: any
    /**是否依赖其他数据查询 */
    noPramas?: boolean
    /**依赖的表单字段 */
    searchKey?: any
    /**关联表单字段 */
    connectKey?: any[]
}
const { Option } = Select
const GroupSelect: React.FC<IGroupSelectProps> = props => {
    const {
        form,
        label,
        options,
        nameText,
        showSearch,
        isHugeOptions,
        fetchApi,
        apiParamsCb,
        formDataKey,
        isFormData,
        noPramas,
        searchKey,
        connectKey,
    } = props
    const [localOptions, setLocalOptions] = useState<any[]>([])
    /** 设置单个Option */
    function setOption(v: any) {
        return (
            <Option key={v.key} value={v?.key?.toString()} data-original={v}>
                {v.value || v.key}
            </Option>
        )
    }
    /** 设置所有的Option */
    const setOptionsMemoized = useCallback(
        (options: any[], value?: any) => {
            /** 设置所有的Option */
            function setOptions(options: any[], value?: any) {
                let localOptions: any[]
                // 搜索显示option的处理
                if (showSearch && value) {
                    localOptions = options.reduce((prev: any[], curr: any) => {
                        curr.value.includes(value) && prev.push(setOption(curr))
                        return prev
                    }, [])
                } else {
                    localOptions = isHugeOptions ? [] : options?.map(setOption)
                }
                setLocalOptions(localOptions)
            }
            setOptions(options, value)
        },
        [showSearch, isHugeOptions, setLocalOptions]
    )
    useEffect(() => {
        options && setOptionsMemoized(options)
    }, [options, setOptionsMemoized])
    /** 获取接口数据 */
    const fetchApiDataMemoized = useCallback(() => {
        function fetchApiData(value?: any): void {
            if (!fetchApi) {
                if (!options) throw new Error('options 不能为空')
                setOptionsMemoized(options, value)
                return
            }
            let apiParams
            if (apiParamsCb) {
                if (isFormData) {
                    apiParams = new FormData()
                    apiParams.append(formDataKey || 'data', JSON.stringify(apiParamsCb(value)))
                } else {
                    apiParams = apiParamsCb(value)
                }
            }
            // 调用接口
            fetchApi(apiParams || value).then((datas: any[]) => {
                setOptionsMemoized(datas, value)
            })
        }
        if (noPramas || form?.getFieldValue(searchKey)) {
            return fetchApiData(form?.getFieldValue(searchKey))
        } else {
            message.error('基于上级数据查询')
        }
    }, [fetchApi, options, apiParamsCb, isFormData, formDataKey, setOptionsMemoized])

    return (
        <Select
            {..._.omit(props, ['searchKey', 'apiParamsCb', 'fetchApi', 'connectKey', 'noPramas'])}
            onDropdownVisibleChange={(open: boolean) => {
                //下拉框打开请求
                open && fetchApiDataMemoized()
            }}
            onSelect={(value: string, option: any) => {
                form?.setFieldsValue({ [nameText]: option.children || option.value })
                connectKey?.forEach(v => {
                    form?.setFieldsValue({ [v]: undefined })
                })
            }}
            style={{ width: '100%' }}
            placeholder={`请选择${label}`}
        >
            {localOptions}
        </Select>
    )
}

export default GroupSelect
