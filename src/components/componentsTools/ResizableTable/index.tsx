/*
 * File: index.tsx
 * Description:实现表格列可拖拽长度
 * File Created: 2020-09-24 09:52:03
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-09-24 10:58:13
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React, { useState } from 'react'
import { Table } from 'antd'
import Draggable from 'react-draggable'
import { TableProps } from 'antd/lib/table/index.d'
import styles from './index.less'
interface IResizableTableProps<RecordType> extends TableProps<RecordType> {
    isDraggable?: boolean
}

const ResizableTable: React.FC<IResizableTableProps<any>> = props => {
    const { columns, isDraggable, ...rest } = props
    const ths: any = []
    const [widths, setWidths] = useState<any>({})

    const handleDrag = (i: number, data: any) => {
        if (ths[i]) {
            const thNode = ths[i].closest('th')
            setWidths({
                ...widths,
                [i]: thNode.clientWidth + data.deltaX,
            })
        }
    }
    const decorateColumns = (columns: any, widths: any) => {
        const newColumns: any[] = []

        columns.forEach((column: any, i: number) => {
            newColumns.push({
                ...column,
                title: (
                    <div
                        className={styles.tableTh}
                        ref={th => {
                            ths[i] = th
                        }}
                    >
                        {column.title}
                        {i !== columns.length - 1 && (
                            <Draggable axis="x" onDrag={(e: any, data: any) => handleDrag(i, data)}>
                                <span className={styles.resizeBorder} />
                            </Draggable>
                        )}
                    </div>
                ),
                ...(widths[i] ? { width: widths[i] } : {}),
            })
        })

        return newColumns
    }
    return (
        <Table
            bordered
            scroll={{ x: '100%' }}
            className={styles.resizableTable}
            size="small"
            columns={isDraggable ? decorateColumns(columns, widths) : columns}
            {...rest}
        />
    )
}

export default ResizableTable
