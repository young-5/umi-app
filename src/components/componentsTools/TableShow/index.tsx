/*
 * File: index.tsx
 * Description: [key][value] [key][value] [key][value] 每一行key不同相同 且每一行数量定 表格展示
 * File Created: 2020-11-10 11:34:55
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-02 15:10:36
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react'
import { Descriptions } from 'antd'
import { DescriptionsProps } from 'antd/lib/descriptions'
import styles from './index.less'

interface Ifiles {
    label: string
    file: string
    render?: Function
    span?: number
    style?: React.CSSProperties
}

interface ITableShowProps extends DescriptionsProps {
    files: Ifiles[]
    data?: any
    labelSpan?: any
}

/**
 *
 * @class  左右表格数据显示组件
 */
const TableShow: React.FC<ITableShowProps> = props => {
    const { files, data, bordered = true, ...restProps } = props
    return (
        <div className={styles.descriptions_root}>
            <Descriptions bordered {...restProps}>
                {files?.map((file: any, i: number) =>
                    file?.file === 'noDataRow' ? (
                        <Descriptions.Item
                            className={styles.noDataRow}
                            label={file?.label}
                            span={10}
                        >
                            <div className={styles.noDataRow_cont} />
                        </Descriptions.Item>
                    ) : (
                        <Descriptions.Item
                            key={i}
                            label={file?.label}
                            span={file?.span | 1}
                            style={file?.style}
                        >
                            {file?.render
                                ? file.render(data && data[file.file], data || {}, file)
                                : (data && data[file?.file]) || ''}
                        </Descriptions.Item>
                    )
                )}
            </Descriptions>
        </div>
    )
}

export default TableShow
