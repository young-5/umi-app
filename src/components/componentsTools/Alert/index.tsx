/*
 * File: index.tsx
 * Description: 提示框组件
 * File Created: 2020-09-30 15:38:13
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-11-20 09:48:10
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react'
import classNames from 'classnames'
import { ModalCustom } from '..'
import './index.less'

const alertIns = new ModalCustom()
/** 手动关闭 */
let closedByHand: boolean = false

type AlertProps = {
    cancelText?: string
    confirmText?: string
    btnText?: string
    alertType: 'success' | 'error' | 'warn' | 'confirm'
    title: React.ReactNode
    text?: React.ReactNode
    hideIcon?: boolean
    className?: string
    style?: React.CSSProperties
    /** 弹层框的样式 */
    containerStyle?: React.CSSProperties
    onCancel?: () => void
    onOk?: () => void
}
const AlertDefaultProps = {
    cancelText: '取消',
    confirmText: '确认',
    btnText: '知道了',
}

enum _AlertType {
    SUCCESS = 'success',
    ERROR = 'error',
    WARN = 'warn',
    CONFIRM = 'confirm',
}

const Success = () => (
    <div className="alert_icon alert_icon-success">
        <div className="alert_icon-success_line alert_icon-success_line-long" />
        <div className="alert_icon-success_line alert_icon-success_line-tip" />
        <div className="alert_icon-success_ring" />
        <div className="alert_icon-success_hide-corners" />
    </div>
)

const Warn = () => (
    <div className="alert_icon alert_icon-warning">
        <span className="alert_icon-warning_body">
            <span className="alert_icon-warning_dot" />
        </span>
    </div>
)

const Error = () => (
    <div className="alert_icon alert_icon-error">
        <span className="alert_icon-error_mark">
            <span className="alert_icon-error_line alert_icon-error_line-left" />
            <span className="alert_icon-error_line alert_icon-error_line-right" />
        </span>
    </div>
)

const Alert = (props: AlertProps) => {
    const close = () => {
        closedByHand = true
        const { onCancel } = props
        onCancel && onCancel()
        alertIns.destroy()
    }
    const confirm = () => {
        closedByHand = true
        const { onOk } = props
        onOk && onOk()
        alertIns.destroy()
    }
    return (
        <div
            className={classNames('alert_overlay alert_overlay-show', props.className)}
            style={props.style}
        >
            <div className="alert_modal" style={props.containerStyle}>
                {!props.hideIcon && (
                    <div>
                        {props.alertType === _AlertType.SUCCESS && <Success />}
                        {(props.alertType === _AlertType.WARN ||
                            props.alertType === _AlertType.CONFIRM) && <Warn />}
                        {props.alertType === _AlertType.ERROR && <Error />}
                    </div>
                )}
                <div className="alert_title">{props.title}</div>
                {props.text && <div className="alert_text">{props.text}</div>}
                <div className="alert_button_container">
                    {props.alertType !== _AlertType.CONFIRM && (
                        <div className="alert_button" onClick={confirm}>
                            {props.btnText}
                        </div>
                    )}
                    {props.alertType === _AlertType.CONFIRM && (
                        <>
                            <div className="alert_button-confirm" onClick={close}>
                                {props.cancelText}
                            </div>
                            <div style={{ flex: 1 }}></div>
                            <div className="alert_button-confirm" onClick={confirm}>
                                {props.confirmText}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

Alert.defaultProps = AlertDefaultProps

interface IFAlertParams extends Partial<AlertProps> {
    duration?: number
}
/** 统一渲染 */
const renderCommon = (params: IFAlertParams | string, alertType: AlertProps['alertType']) => {
    if (Object.prototype.toString.call(params) === '[object String]') {
        ;(params as IFAlertParams) = { title: params as string }
    }
    alertIns.show(<Alert alertType={alertType} {...{ ...(params as AlertProps) }} />)
}
/** 提示框 */
const alert = {
    /**
     * 成功的提示✅
     * @param params 传对象或者字符串，字符串默认为提示消息
     */
    success: function (params: IFAlertParams | string) {
        closedByHand = false

        const DURATION = 2000
        if (Object.prototype.toString.call(params) === '[object String]') {
            ;(params as IFAlertParams) = { title: params as string, duration: DURATION }
        } else {
            ;(params as IFAlertParams).duration = (params as Object).hasOwnProperty('duration')
                ? (params as IFAlertParams).duration
                : DURATION
        }
        alertIns.show(<Alert {...{ ...(params as AlertProps) }} alertType="success" />)

        const { duration } = params as IFAlertParams
        if (duration === 0) return

        const timer = setTimeout(() => {
            !closedByHand && alertIns && alertIns.destroy()
            clearTimeout(timer)
        }, duration)
    },
    /**
     * 失败的提示❌
     * @param params 传对象或者字符串，字符串默认为提示消息
     */
    error: function (params: IFAlertParams | string) {
        renderCommon(params, 'error')
    },
    /**
     * 警告的提示⚠️
     * @param params 传对象或者字符串，字符串默认为提示消息
     */
    warn: function (params: IFAlertParams | string) {
        renderCommon(params, 'warn')
    },
    /**
     * 警告的提示⚠️
     * @param params 传对象或者字符串，字符串默认为提示消息
     */
    warning: function (params: IFAlertParams | string) {
        renderCommon(params, 'warn')
    },
    /**
     * 确认的提示⚠️
     * @param params 传对象或者字符串，字符串默认为提示消息
     */
    confirm: function (params: IFAlertParams | string) {
        renderCommon(params, 'confirm')
    },
    /**
     * 销毁提示框
     */
    destroy: function () {
        alertIns.destroy()
    },
}

export default alert
