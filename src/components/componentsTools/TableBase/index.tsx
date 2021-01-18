/*
 * File: index.tsx
 * Description: 高阶组件 基础表格注入分页数据
 * File Created: 2020-11-13 08:40:53
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-11-19 16:19:17
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React, { useState, useRef, useImperativeHandle } from 'react'
import BaseTable from '../BaseTable'
import { usePrevious } from 'react-use'
import { PrototypeCheck } from '../utils'
import { IBaseTableProps } from '../BaseTable'

interface IPage {
    pageNumber: 1
    pageSize: 20
}

interface TableBase extends IBaseTableProps {
    onPageChange?: (pageNumber: number, pageSize: number) => any
    page?: IPage
    apiParams?: any
}

const HOCTable = <T extends {}>(WrapComponent: React.ComponentType<T>) => {
    return (props: T & TableBase, ref: any): JSX.Element => {
        const {
            page = { pageNumber: 1, pageSize: 20 },
            apiParams,
            onPageChange,
            ...restProps
        } = props
        const tableRef = useRef()
        const [apiPage, setApiPage] = useState<any>(page)
        const prevApiPage = usePrevious(apiPage)
        useImperativeHandle(ref, () => ({
            setDataSource: (tableRef?.current as any)?.setDataSource,
            setSelectRowKeys: (tableRef?.current as any)?.setSelectRowKeys,
            getDataSource: () => (tableRef?.current as any)?.getDataSource(),
            getPaginationData: () => (tableRef?.current as any)?.getPaginationData(),
            refresh: (type?: string, data?: IPage) => {
                if (type === '1') {
                    //当前页条数不变 回到第一页 或者自定义页数
                    ;(tableRef?.current as any)?.refresh({
                        pageSize: apiPage.pageSize,
                        pageNumber: 1,
                        ...data,
                    })
                } else if (type === '2') {
                    //都不变 当前页数 条数无变化
                    ;(tableRef?.current as any)?.refresh({
                        pageSize: apiPage.pageSize,
                        pageNumber: apiPage.pageNumber,
                    })
                } else if (type === '3') {
                    // 当前页数前移 条数变化
                    ;(tableRef?.current as any)?.refresh({
                        pageSize: 20,
                        pageNumber: apiPage.pageNumber - 1,
                    })
                } else {
                    //回到默认 当前页数 条数变化
                    ;(tableRef?.current as any)?.refresh({
                        pageSize: 20,
                        pageNumber: 1,
                    })
                }
            },
        }))
        return (
            <WrapComponent
                ref={tableRef}
                {...(restProps as T)}
                onPageChange={(pageNumber: number, pageSize: number) => {
                    onPageChange && onPageChange(pageNumber, pageSize)
                    setApiPage({ ...prevApiPage, ...apiPage, pageNumber, pageSize })
                }}
                apiParams={(extraParams: any) => {
                    return {
                        ...apiPage,
                        ...(PrototypeCheck.isFunction(apiParams)
                            ? apiParams(extraParams)
                            : { ...apiParams, ...extraParams }),
                    }
                }}
            />
        )
    }
}
/**
 *
 * @class 基础表格组件
 */
export const HOC = HOCTable<TableBase>(BaseTable)

export default React.forwardRef(HOC)
