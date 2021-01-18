/*
 * File: card2.tsx
 * Description: 展示卡片
 * File Created: 2020-11-05 17:22:55
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-11-24 18:22:00
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react'
import classnames from 'classnames'
import styles from './index.less'

interface ICardProps {
    onClick?: (data: any) => void
    data?: any
    title?: any
    files?: any[]
    style?: React.CSSProperties
}

const Card: React.FC<ICardProps> = ({ data, onClick, title, files = [], style }) => {
    return (
        <div
            className={classnames(styles.card)}
            style={{ ...style }}
            onClick={() => {
                onClick && onClick(data)
            }}
        >
            <div className={styles.title}>
                <span>{title?.label}</span>
                <span>{title?.file && data[title?.file]}</span>
            </div>
            <div className={styles.inf}>
                {files?.map((v: any, i: number) => (
                    <div className={styles.inf__item}>
                        <span>{v?.label} :</span>
                        <span>{v?.file && data[v?.file]}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Card
