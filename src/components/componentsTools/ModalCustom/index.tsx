/*
 * File: index.tsx
 * Description: 自定义弹框组件
 * File Created: 2020-09-30 15:38:13
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-11-20 09:00:34
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import ReactDom from 'react-dom'

/** 自定义弹窗工具 */
export default class ModalCustom {
    /** 弹层DOM的id属性值 */
    private modalId: string
    /** 弹层的DOM元素 */
    private modalEle: HTMLElement | null = null

    constructor(modalId: string = 'react-admin_modal') {
        this.modalId = modalId
        this.initDom()
    }

    initDom() {
        this.modalEle = document.getElementById(this.modalId)
        if (!this.modalEle) {
            this.modalEle = document.createElement('div')
            this.modalEle.setAttribute('id', 'react-admin_modal-' + Math.random())
            document.body.appendChild(this.modalEle)
        }
    }

    /** 显示 */
    show(component: React.ReactElement) {
        if (!this.modalEle) this.initDom()
        ReactDom.render(component, this.modalEle)
    }

    /** 销毁 */
    destroy() {
        if (this.modalEle) {
            ReactDom.unmountComponentAtNode(this.modalEle)
            this.modalEle.parentNode!.removeChild(this.modalEle)
            this.modalEle = null
        }
    }
}
