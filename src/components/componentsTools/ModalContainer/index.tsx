/*
 * File: index.tsx
 * Description: 弹框基础组件
 * File Created: 2020-09-30 16:34:53
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-03 13:49:04
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React, { useState, useImperativeHandle } from 'react'
import { Modal } from 'antd'
import classNames from 'classnames'
import { ModalProps } from 'antd/lib/modal'
import styles from './index.less'

interface ModalContainerProps extends ModalProps {
    style?: React.CSSProperties
    className?: string
    children: any
    destroyOnClose?: boolean
    onOk?: () => void
    onCancel?: () => void
    /** 是否自动关闭弹窗 */
    autoClose?: boolean
}
export interface IFModalRef {
    open: () => any
    close: () => any
}
/**
 *
 * @class 弹框基础组件
 */
export const ModalContainer = (
    {
        title,
        style,
        className,
        children,
        onOk,
        onCancel,
        destroyOnClose = true,
        forceRender,
        autoClose = true,
        width = 946,
        maskClosable = false,
        cancelText,
        ...restProps
    }: ModalContainerProps,
    ref: any
) => {
    const [visible, setVisible] = useState(false)
    useImperativeHandle(
        ref,
        (): IFModalRef => ({
            open: () => changeModalVisible(true),
            close: () => changeModalVisible(false),
        })
    )
    const handleOk = (): void => {
        onOk && onOk()
        autoClose && changeModalVisible(false)
    }
    const handleCancel = (): void => {
        changeModalVisible(false)
        onCancel && onCancel()
    }
    /**
     * 更改弹窗的状态值
     * @param flag 状态值
     */
    const changeModalVisible = (flag: boolean = true): void => {
        setVisible(flag)
    }
    return (
        <Modal
            onOk={handleOk}
            onCancel={handleCancel}
            maskClosable={maskClosable}
            className={classNames(styles['modal-theme-header'], className)}
            cancelText={cancelText || '取消'}
            {...{
                visible,
                title,
                style,
                destroyOnClose,
                forceRender,
                ...(((style && !style.width) || !style) && { width }),
                ...restProps,
            }}
            // cancelText="取消"
            // okText="确定"
        >
            {children}
        </Modal>
    )
}

export default React.forwardRef(ModalContainer)
