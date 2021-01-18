/*
 * File: ResizableTable.tsx
 * Description: 实现表格列可拖拽长度高阶组件
 * File Created: 2020-09-24 10:20:54
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-09-24 11:09:17
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */

import React, { useState } from 'react'
import { Table } from 'antd'
import { TableProps } from 'antd/lib/table/index.d'
import Draggable from 'react-draggable'
import styles from './index.less'

type IComponent = React.FC | React.ComponentClass | any
interface IComponentProps<RecordType> extends TableProps<RecordType> {
    isDraggable?: boolean
    columns: any[]
}

const componentRender = (ComponentName: IComponent) => {
    const newComponent = (props: IComponentProps<any>) => {
        const { columns, isDraggable = true, ...rest } = props
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
        const decorateColumns = (columns: any[], widths: any): any[] => {
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
                                <Draggable
                                    axis="x"
                                    onDrag={(e: React.ReactElement, data: any) =>
                                        handleDrag(i, data)
                                    }
                                >
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
            <ComponentName
                bordered
                scroll={{ x: '100%' }}
                className={styles.resizableTable}
                size="small"
                columns={isDraggable ? decorateColumns(columns, widths) : columns}
                {...rest}
            />
        )
    }
    return newComponent
}
const ResizableTable = componentRender(Table)

export default ResizableTable
