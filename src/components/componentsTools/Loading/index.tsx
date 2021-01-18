/*
 * File: index.tsx
 * Description: 加载组件
 * File Created: 2020-12-05 14:52:02
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-05 15:07:00
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import { Spin } from 'antd'
import React, { useState, useImperativeHandle } from 'react'
interface ILoadingProps {
    delay: number
    children: any
}

const Loading = (props: ILoadingProps, ref: any) => {
    const { children } = props
    useImperativeHandle(ref, () => ({
        open: () => setLoading(true),
        close: () => setLoading(false),
    }))
    const [loading, setLoading] = useState<boolean>(false)

    return <Spin spinning={loading}>{children}</Spin>
}

export default React.forwardRef(Loading)
