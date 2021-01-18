/*
 * File: ChooseBtnObj.tsx
 * Description: 描述
 * File Created: 2020-12-03 20:19:05
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-16 12:33:35
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React, { useState } from 'react'
import { Button } from 'antd'
import styles from './index.less'

interface IChooseBtn {
    typeArr: any[]
    chooseType: Function
    defaultType?: string
    style?: React.CSSProperties
}
const ChooseBtnObj = (props: IChooseBtn) => {
    const { typeArr, chooseType, style, defaultType = '1' } = props
    const [type, setType] = useState<any>(defaultType)
    const _chooseType = (value: any, data: any) => {
        setType(value)
        chooseType && chooseType(value, data)
    }
    return (
        <div className={styles.btn} style={style}>
            {typeArr.map((item: any, i: number) => {
                return (
                    <Button
                        onClick={() => _chooseType(item.key, item)}
                        className={type === item.key ? styles.active_btn : ''}
                        key={item.key || i}
                    >
                        {item.value}
                    </Button>
                )
            })}
        </div>
    )
}
export default ChooseBtnObj
