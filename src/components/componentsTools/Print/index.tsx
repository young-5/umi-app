/*
 * File: index.tsx
 * Description: 基于react-to-print的打印组件
 * File Created: 2020-10-20 16:31:28
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-11-19 14:38:13
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react'
import ReactToPrint from 'react-to-print'
import { IReactToPrintProps } from 'react-to-print/lib/index'
import { Button } from 'antd'
interface PrintProps extends IReactToPrintProps {
    children?: React.ReactElement<any>
}
/**
 *
 * @class 基于react-to-print的打印组件
 */
const Print: React.FC<PrintProps> = props => {
    const { children, ...restorops } = props
    return (
        <ReactToPrint
            trigger={() =>
                children ? (
                    children
                ) : (
                    <a>
                        <Button type="primary">打印</Button>
                    </a>
                )
            }
            {...restorops}
        ></ReactToPrint>
    )
}

export default Print
