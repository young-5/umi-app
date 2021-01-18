/*
 * File: index.tsx
 * Description: 页面下载为图片
 * File Created: 2020-11-09 10:22:39
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-11-19 14:41:51
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react'
import html2canvas from 'html2canvas'
import { Button } from 'antd'
interface IDownloadImgProps {
    children?: React.ReactElement<any>
    content: any
    canvas?: any
    width?: any
    height?: any
    multiple?: number
    scale?: number
    callBack?: any
    fileName?: string
}
/**
 *
 * @class 页面下载为图片
 */
const DownloadImg: React.FC<IDownloadImgProps> = props => {
    const {
        children,
        content,
        callBack,
        height,
        width,
        multiple = 1,
        scale = 1,
        fileName = '下载图片.png',
    } = props
    const exportImage = () => {
        const newCanvas = document.createElement('canvas')
        const element: any = content()
        const dom_width = width || parseInt(window.getComputedStyle(element).width)
        const dom_height = height || parseInt(window.getComputedStyle(element).height)
        //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
        newCanvas.width = dom_width * multiple
        newCanvas.height = dom_height * multiple
        newCanvas.style.width = dom_width + 'px'
        newCanvas.style.height = dom_height + 'px'
        const context: any = newCanvas.getContext('2d')
        context.scale(scale, scale)

        html2canvas(element, { canvas: newCanvas }).then((canvas: any) => {
            const imgUri = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream') // 获取生成的图片的url
            const base64ToBlob = (code: any) => {
                let parts = code.split(';base64,')
                let contentType = parts[0].split(':')[1]
                let raw = window.atob(parts[1])
                let rawLength = raw.length

                let uInt8Array = new Uint8Array(rawLength)

                for (let i = 0; i < rawLength; ++i) {
                    uInt8Array[i] = raw.charCodeAt(i)
                }
                return new Blob([uInt8Array], { type: contentType })
            }
            const blob = base64ToBlob(imgUri)
            // window.location.href = imgUri; // 下载图片
            // 利用createObjectURL，模拟文件下载
            if ((window.navigator as any).msSaveOrOpenBlob) {
                navigator.msSaveBlob(blob, fileName)
            } else {
                const blobURL = window.URL.createObjectURL(blob)
                const vlink = document.createElement('a')
                vlink.style.display = 'none'
                vlink.href = blobURL
                vlink.setAttribute('download', fileName)

                if (typeof vlink.download === 'undefined') {
                    vlink.setAttribute('target', '_blank')
                }

                document.body.appendChild(vlink)

                var evt = document.createEvent('MouseEvents')
                evt.initEvent('click', false, false)
                vlink.dispatchEvent(evt)

                document.body.removeChild(vlink)
                window.URL.revokeObjectURL(blobURL)
            }
        })
    }
    return (
        <div>
            {children ? (
                <div
                    onClick={() => {
                        callBack && callBack()
                        exportImage()
                    }}
                >
                    {children}
                </div>
            ) : (
                <a>
                    <Button
                        type="primary"
                        onClick={() => {
                            callBack && callBack()
                            exportImage()
                        }}
                    >
                        页面下载为图片
                    </Button>
                </a>
            )}
        </div>
    )
}

export default DownloadImg
