/*
 * File: index.tsx
 * Description: 提交重置
 * File Created: 2020-10-26 11:04:19
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-11-19 14:40:48
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react'
import Button from 'antd/lib/button'
import styles from './index.less'
interface IBtnMaterialProps {
    onSubmit?: () => any
    onRest?: () => any
    okText?: string
    errText?: string
    render?: any
}
/**
 *
 * @class 提交重置
 */
const BtnMaterial: React.FC<IBtnMaterialProps> = props => {
    const { okText = '查询', errText = '重置', onSubmit, onRest, render } = props
    const onOk = () => {
        onSubmit && onSubmit()
    }
    const onBad = () => {
        onRest && onRest()
    }
    return (
        <div className={styles.BtnMaterial}>
            <Button className={styles.btn_ok} onClick={onOk}>
                {okText}
            </Button>
            <Button className={styles.btn_err} onClick={onBad}>
                {errText}
            </Button>
            {render && render()}
        </div>
    )
}

export default BtnMaterial
