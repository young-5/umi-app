/*
 * File: index.tsx
 * Description: 描述
 * File Created: 2020-09-30 15:38:13
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-05 15:08:23
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import { Pagination, Table } from 'antd'
import { TablePaginationConfig, TableProps } from 'antd/lib/table'
import classname from 'classnames'
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'
import Loading from '../Loading'
import { usePrevious } from 'react-use'
import { PrototypeCheck } from '../utils'
import styles from './index.less'

export interface IBaseTableProps extends TableProps<any> {
    columns: any[]
    // 获取外部参数
    apiParams?: any
    /**数据请求接口 */
    fetchApi?: Function
    /** 是否禁用初始请求 */
    disableMountFetch?: boolean
    /** 格式化接口数据，处理各种数据返回 */
    normalizeResult?: (res: any) => any
    /** 格式化table数据和pagination一起返回的情况 */
    normalizePageResult?: (res: any) => any
    /**异步获取分页 */
    asyncPagination?: boolean
    /**分页接口 */
    fetchPageApi?: Function
    /**是否分页 */
    hidePagination?: boolean
    /** 勾选回调，传了onRowSelect显示表格勾选 */
    rowSelection?: any
    /**分页设置回调 */
    paginationCb?: any
    /**分页 数据请求 */
    onPageChangeFetch?: any
    /**分页改变 */
    onPageChange?: any
    /**行样式设置 */
    rowClassName?: (record: any, index?: number) => string | string
    /** 数据发生变化时调用 */
    onDataSourceChange?: (datas: any[]) => void
    /**子卡片 */
    renderCards?: any
    cardClassName?: string
    //展示状态
    modalType?: string | number
    classNames?: string
}
const pageSizeOptions = ['20', '50', '100', '200']
const BaseTable = (props: IBaseTableProps, ref: any) => {
    const {
        columns,
        apiParams,
        fetchApi,
        normalizeResult,
        normalizePageResult,
        rowKey,
        rowClassName,
        rowSelection,
        asyncPagination,
        fetchPageApi,
        hidePagination,
        paginationCb,
        onPageChangeFetch = true,
        onPageChange,
        disableMountFetch,
        onDataSourceChange,
        renderCards,
        cardClassName,
        modalType = 'list',
        classNames,
        ...restProps
    } = props
    const [dataSource, setDataSource] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [paginationData, setPaginationData] = useState<any>()
    const [selectedRowKeys, setSelectRowKeys] = useState<string[] | number[]>(
        rowSelection && rowSelection.selectedRowKeys ? rowSelection.selectedRowKeys : []
    )
    const requestTimes = useRef(0)
    const loadRef = useRef<any>()
    const prevApiParams = usePrevious(apiParams)
    const fetchApiMemoized = useCallback(
        (extraParams?: any, refresh?: boolean) => {
            /** 比较apiParams，避免函数组件和class组件之前，memo不起效果的问题 */
            function compareApiParms() {
                if (PrototypeCheck.isFunction(prevApiParams)) {
                    return isEqual(apiParams(), prevApiParams())
                }

                return isEqual(apiParams, prevApiParams)
            }
            if (disableMountFetch && !apiParams) {
                return
            }
            if (!fetchApi) {
                return
            }
            if (compareApiParms() && !refresh) {
                return
            }
            setLoading(true)
            loadRef?.current?.open()
            /**
             * 最终的参数
             * @description apiparams可以传回调函数用于特殊处理参数
             */
            const finalParams = PrototypeCheck.isFunction(apiParams)
                ? apiParams(extraParams)
                : { ...apiParams, ...extraParams }
            /** 处理分页数据 */
            function handlePagitation(data: any) {
                if (hidePagination) return
                setPaginationData({
                    total: data?.total,
                    pageSize: data?.pageSize,
                    pageNumber: data?.pageNum,
                })
            }
            fetchApi(finalParams)?.then((res: any) => {
                setLoading(false)
                loadRef?.current?.close()
                // 重置勾选
                requestTimes.current++
                requestTimes.current !== 1 && setSelectRowKeys([])
                setDataSource(normalizeResult ? normalizeResult(res) : res?.data?.list)
                if (!asyncPagination) {
                    handlePagitation(normalizePageResult ? normalizePageResult(res) : res?.data)
                }
            })
            // 异步分页时调用
            if (asyncPagination) {
                ;(fetchPageApi
                    ? fetchPageApi(finalParams)
                    : fetchApi(finalParams)
                ).then((res: any) =>
                    handlePagitation(normalizeResult ? normalizeResult(res) : res?.data)
                )
            }
        },
        [
            fetchApi,
            apiParams,
            prevApiParams,
            asyncPagination,
            disableMountFetch,
            fetchPageApi,
            hidePagination,
            normalizeResult,
            normalizePageResult,
        ]
    )
    useImperativeHandle(
        ref,
        () => ({
            setDataSource,
            setSelectRowKeys,
            getDataSource: () => dataSource,
            getPaginationData: () => paginationData,
            refresh: (data: any) => fetchApiMemoized(data, true),
        }),
        [dataSource, paginationData, fetchApiMemoized]
    )
    useEffect(() => {
        onDataSourceChange && onDataSourceChange(dataSource)
    }, [dataSource, onDataSourceChange])

    // 初始时获取基础表格数据
    useEffect(() => {
        fetchApiMemoized()
    }, [fetchApiMemoized])
    /** 显示分页总量数据 */
    const showTotal = () => {
        return `共有${paginationData!.total}条信息，共计${Math.ceil(
            paginationData!.total / paginationData!.pageSize
        )}页`
    }

    const handlePageChange = (pageNumber: number, pageSize: number) => {
        onPageChangeFetch && fetchApiMemoized({ pageNumber, pageSize })
        onPageChange && onPageChange(pageNumber, pageSize)
    }
    let pagination: any
    if (paginationData) {
        let defaultPageConfig = {
            size: 'small',
            total: paginationData.total,
            pageSize: paginationData.pageSize,
            current: paginationData.pageNumber,
            pageSizeOptions,
            showTotal: showTotal,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: handlePageChange,
            onShowSizeChange: handlePageChange,
        }
        pagination = paginationCb
            ? paginationCb(paginationData, defaultPageConfig)
            : defaultPageConfig
    }
    const onRowSelectChange = (selectedRowKeys: string[] | number[], selectedRows: any[]) => {
        if (rowSelection && rowSelection.onChangePro) {
            rowSelection.onChangePro(selectedRowKeys, selectedRows) &&
                setSelectRowKeys(rowSelection?.onChangePro(selectedRowKeys, selectedRows))
        } else {
            setSelectRowKeys(selectedRowKeys)
        }
    }
    const renderList = () => {
        return (
            <Loading ref={loadRef}>
                <div className={classname(styles.root, cardClassName)}>
                    <div className={styles.card_list}>
                        {' '}
                        {dataSource?.map((data: any, i: number) => (
                            <div className={styles.list}>{renderCards(data, i)}</div>
                        ))}
                    </div>
                    <div className={styles.card_page}> {renderPagination()}</div>
                </div>
            </Loading>
        )
    }
    const renderPagination = () => {
        return paginationData?.pageSize && <Pagination {...(hidePagination ? false : pagination)} />
    }
    const renderTable = () => {
        return (
            <Table
                className={classname(styles.table, classNames)}
                loading={loading}
                columns={columns}
                dataSource={dataSource}
                rowKey={rowKey}
                pagination={hidePagination ? false : (pagination as TablePaginationConfig)}
                rowClassName={(record: any, index: number) =>
                    (PrototypeCheck.isFunction(rowClassName)
                        ? rowClassName!(record, index)
                        : rowClassName) as string
                }
                {...{
                    ...(rowSelection && {
                        rowSelection: {
                            ...rowSelection,
                            onChange: onRowSelectChange,
                            selectedRowKeys,
                        },
                    }),
                    ...restProps,
                }}
            />
        )
    }
    return modalType === 'list' ? renderTable() : renderList()
}

function compare(prevProps: any, nextProps: any): boolean {
    const keys: (keyof any)[] = ['apiParams']
    return keys.every(key => isEqual(prevProps[key], nextProps[key]))
}

export default React.memo(React.forwardRef(BaseTable), compare)
