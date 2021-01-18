/*
 * File: index.tsx
 * Description: 卡片组件
 * File Created: 2020-11-19 14:42:33
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-11-27 21:24:17
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react'
import style from './index.less'
interface IListCardProps {
    width?: any
    cssStyle?: React.CSSProperties
}

const ListCard: React.FC<IListCardProps> = ({ width, cssStyle, children }) => {
    return (
        <div
            className={style.list_root}
            style={{
                gridTemplateColumns: `repeat(auto-fill, ${width})`,
                ...cssStyle,
            }}
        >
            {children}
        </div>
    )
}

export default ListCard
