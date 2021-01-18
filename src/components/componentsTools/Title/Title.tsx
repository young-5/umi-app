/*
 * File: Title.tsx
 * Description: 标题组件
 * File Created: 2020-10-09 10:34:56
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-10 18:58:08
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react'
import styles from './index.less'
import classnames from 'classnames'

type ITitle = string | (() => React.ReactElement<any>) | undefined
/**
 *
 */
interface ITitleProps {
    //标题名称
    title?: ITitle
    height?: number
    //自定义样式
    style?: React.CSSProperties
    //自定义类名
    classNames?: string
    //是否左侧有标题标线
    isLine?: boolean
    width?: any
}

const Title: React.FC<ITitleProps> = props => {
    const { isLine = false, title, style, height = 20, children, classNames, width } = props
    return (
        <div
            style={{
                width: `${width}`,
                // height: '100%',
            }}
            className={styles.titles_root}
        >
            <div
                className={classnames(styles.titles, isLine ? styles.titles_line : '', classNames)}
                style={{
                    height: `${height}px`,
                    ...style,
                }}
            >
                {typeof title === 'string' || !title ? title : title()}
            </div>
            {children && children}
        </div>
    )
}

export default Title
