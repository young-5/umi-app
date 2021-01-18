/*
 * File: Title.tsx
 * Description: 间距占位组件
 * File Created: 2020-10-09 10:34:56
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-04 08:54:23
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react'

interface SpacerProps {
    height?: string | number //宽高
    width?: string | number
    children?: React.ReactElement | null | undefined | any[]
    style?: React.CSSProperties //自定义样式
}

const Spacer = (props: Partial<React.HTMLAttributes<HTMLDivElement>> & SpacerProps) => {
    return (
        <div
            className={props.className}
            style={{ width: props.width || '100%', height: props.height || '100%', ...props.style }}
        >
            {props.children}
        </div>
    )
}

export default Spacer
