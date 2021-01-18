/*
 * File: ListTable.tsx
 * Description: [key][value] [key][value] [key][value] 每一行key相同 表格展示
 * File Created: 2020-11-24 18:50:46
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-11-25 19:32:53
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react'
import { Row, Col } from 'antd'
import classnames from 'classnames'
import styles from './ListTable.less'

interface IListTableProps {
    datas?: any[]
    files: any
}

const ListTable: React.FC<IListTableProps> = props => {
    const { datas = [], files } = props
    return (
        <div className={styles.list_root}>
            {datas?.map((data: any, index: number) => {
                return (
                    <Row
                        className={classnames(
                            styles.list_row,
                            index % 2 === 0 ? styles.list_row2n : ''
                        )}
                        key={index}
                    >
                        {files?.map((file: any, i: number) => {
                            return (
                                <Col className={styles.list_col} key={i} span={24 / files?.length}>
                                    <span className={styles.list_col_label}>{file?.label}</span>
                                    <span className={styles.list_col_value}>
                                        {file.render
                                            ? file.render(data[file.value])
                                            : data[file.value]}
                                    </span>
                                </Col>
                            )
                        })}
                    </Row>
                )
            })}
        </div>
    )
}

export default ListTable
