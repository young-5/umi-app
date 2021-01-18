/*
 * File: index.tsx
 * Description: [key][value] [key][value] [key][value] 每一行key不同相同 且每一行数量定 表格展示
 * File Created: 2020-11-10 15:24:12
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-11-25 20:04:59
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react'
import { Row, Col } from 'antd'
import classnames from 'classnames'
import _ from 'lodash'
import styles from './index.less'

interface IListShowProps {
    files: any[]
    data?: {}
    title?: string
    labelSpan?: number
    num?: number
    noColor?: boolean
}
/**
 *
 * @class 弹框基础组件
 */
const ListShow: React.FC<IListShowProps> = props => {
    const { title, files, data = {}, num = 2, labelSpan, noColor = false } = props

    return (
        <div className={styles.listShow}>
            {title && <div className={styles.title}>{title}</div>}
            {_.chunk(files, num).map((newfile: any[], index: number) => {
                return (
                    <Row
                        key={index}
                        className={classnames(
                            styles.list_row,
                            !noColor && index % 2 === 0 ? styles.list_row2n : ''
                        )}
                    >
                        {newfile.map((file: any, i: number) => {
                            return (
                                <Col
                                    className={classnames(
                                        styles.list_col,
                                        file.allRow &&
                                            !noColor &&
                                            (i % 2 === 0 ? styles.list_row2n : styles.list_row)
                                    )}
                                    key={i}
                                    span={file.allRow ? 24 : 24 / num}
                                >
                                    <Row style={{ width: '100%' }}>
                                        <Col
                                            className={classnames(
                                                styles.list_col_label,
                                                styles.list_col_all
                                            )}
                                            span={file.labelSpan || labelSpan || 5}
                                        >
                                            {file.label}:
                                        </Col>
                                        <Col
                                            className={classnames(
                                                styles.list_col_value,
                                                styles.list_col_all
                                            )}
                                            span={file.valueSpan}
                                        >
                                            {file.render
                                                ? file.render(data[file.value])
                                                : data[file.value]}
                                        </Col>
                                    </Row>
                                </Col>
                            )
                        })}
                    </Row>
                )
            })}
        </div>
    )
}

export default ListShow
