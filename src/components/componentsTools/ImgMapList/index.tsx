/*
 * File: index.tsx
 * Description: 多图片列表显示
 * File Created: 2020-12-07 18:38:26
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-10 19:04:00
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react'
import ImgMap from '../ImgMap'
import { PrototypeCheck } from '../utils'
import styles from './index.less'
interface NMGProps {
    datas?: any //字符串拼接地址或者数组
    callback?: any //自定义数据处理函数
    imgStyle?: React.CSSProperties //单个展示样式
    render?: (value: any, data: any) => any //自定义渲染
}

const NMG: React.FC<NMGProps> = props => {
    const { datas, callback, imgStyle, render } = props
    /**
     *获取切割图片数据，默认字符串，拼接 （支持之定义处理）
     */
    const getImg = () => {
        if (PrototypeCheck.isString(datas)) {
            return datas.split(',')
        } else {
            return callback ? callback(datas) : datas
        }
    }
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {datas &&
                getImg().map((v: any, i: number) =>
                    render ? (
                        render(v, datas)
                    ) : (
                        <div className={styles.imgItem}>
                            <ImgMap imgSrc={v} style={imgStyle} />
                        </div>
                    )
                )}
        </div>
    )
}

export default NMG
