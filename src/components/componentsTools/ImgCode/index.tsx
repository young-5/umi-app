/*
 * File: index.tsx
 * Description: 图片验证组件
 * File Created: 2020-10-10 10:56:48
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-02-05 15:47:52
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React, { useEffect, useRef, useState, useImperativeHandle } from 'react'
import { RedoOutlined, CheckOutlined, CloseOutlined, ArrowRightOutlined } from '@ant-design/icons'
import classnames from 'classnames'
import _ from 'lodash'
import { GetRandomNum } from '../utils'
import ImgCodeStyle from './index.less'
/**
 *
 */
interface IImgCodeProps {
    height?: number //图片高度度
    width?: number //图片宽度
    fragmentSize?: number //碎片尺寸
    accuracy?: number //精确度
    imgsrc?: string //默认图片
    featchImgSrc?: (setData: Function) => any //获取图片api
    onSuccess?: Function
    onError?: Function
    isUpadta?: boolean //刷新按钮显示
    handleRender?: any //自定义操作项
    otherRender?: any //自定义显示信息
    handleTitle?: string //自定义滑动提示
    callback?: Function //显示前回调
}

const STATUS_LOADING = 0 // 还没有图片
const STATUS_READY = 1 // 图片渲染完成,可以开始滑动
const STATUS_MATCH = 2 // 图片位置匹配成功
const STATUS_ERROR = 3 // 图片位置匹配失败

// 生成裁剪路径
const createClipPath = (ctx: IctxShadow, size = 100, styleIndex = 0) => {
    const styles = [
        [0, 0, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 1, 0],
        [0, 0, 1, 1],
        [0, 1, 0, 0],
        [0, 1, 0, 1],
        [0, 1, 1, 0],
        [0, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 0, 0, 1],
        [1, 0, 1, 0],
        [1, 0, 1, 1],
        [1, 1, 0, 0],
        [1, 1, 0, 1],
        [1, 1, 1, 0],
        [1, 1, 1, 1],
    ]
    const style: any = styles[styleIndex]

    const r = 0.1 * size
    ctx?.save()
    ctx?.beginPath()
    // left
    ctx?.moveTo(r, r)
    ctx?.lineTo(r, 0.5 * size - r)
    ctx?.arc(r, 0.5 * size, r, 1.5 * Math.PI, 0.5 * Math.PI, style[0])
    ctx?.lineTo(r, size - r)
    // bottom
    ctx?.lineTo(0.5 * size - r, size - r)
    ctx?.arc(0.5 * size, size - r, r, Math.PI, 0, style[1])
    ctx?.lineTo(size - r, size - r)
    // right
    ctx?.lineTo(size - r, 0.5 * size + r)
    ctx?.arc(size - r, 0.5 * size, r, 0.5 * Math.PI, 1.5 * Math.PI, style[2])
    ctx?.lineTo(size - r, r)
    // top
    ctx?.lineTo(0.5 * size + r, r)
    ctx?.arc(0.5 * size, r, r, 0, Math.PI, style[3])
    ctx?.lineTo(r, r)

    ctx?.clip()
    ctx?.closePath()
}
type IctxShadow = CanvasRenderingContext2D | null | undefined
/**
 *
 * @class 图片验证组件
 */
const IImgCodeProps = (props: IImgCodeProps, ref: any) => {
    const {
        height = 220,
        width = 350,
        fragmentSize = 50,
        accuracy = 5,
        onSuccess,
        onError,
        isUpadta = true,
        handleRender,
        otherRender,
        featchImgSrc,
        imgsrc,
        handleTitle,
        callback,
    } = props
    const _img1 = require('@/assets/code/tup1.png')
    const _img2 = require('@/assets/code/tup2.png')
    const _img3 = require('@/assets/code/tup3.png')
    const _img4 = require('@/assets/code/tup4.png')
    const _img5 = require('@/assets/code/tup5.png')
    const _img6 = require('@/assets/code/tup6.png')
    const _img = [_img1, _img2, _img3, _img4, _img5, _img6]

    const bigCanvas = useRef<HTMLCanvasElement>(null) //底层画布
    const fragmentCanvas = useRef<HTMLCanvasElement>(null) //图片碎片
    const [offsetX, setOffsetX] = useState<number>(0)
    const [offsetY, setOffsetY] = useState<number>(0)
    const [isMovable, setIsMovable] = useState<boolean>(false)
    const [startX, setStartX] = useState<number>(0)
    const [oldX, setOldX] = useState<number>(0)
    const [currX, setCurrX] = useState<number>(0) //滑块当前 x
    const [status, setStatus] = useState<number>(STATUS_LOADING) //图片状态
    const [showTips, setShowTips] = useState<boolean>(false) //匹配状态
    const [tipsIndex, setTipsIndex] = useState<number>(0) //匹配类型
    const [imgUrl, setImgUrl] = useState<any>(1)

    /**
     * 匹配提示
     */
    const arrTips = [
        { ico: 'icoSuccess', text: '匹配成功' },
        { ico: 'icoError', text: '匹配失败' },
    ]
    useImperativeHandle(ref, (): any => ({
        setImgsrc: setImgUrl,
        onMouseMove: onMoving,
        onMouseUp: onMoveEnd,
    }))
    useEffect(() => {
        onReload()
    }, [imgsrc])
    useEffect(() => {
        setCanvas()
    }, [imgsrc])

    const setCanvas = (index?: any) => {
        callback && callback()
        if (featchImgSrc) {
            featchImgSrc(setImgUrl)
        } else {
            renderImage(index)
        }
    }
    const renderImage = (index: any) => {
        setStatus(STATUS_LOADING)
        const objImage = new Image()

        objImage.addEventListener('load', () => {
            const ctxShadow: IctxShadow = bigCanvas?.current?.getContext('2d')
            const ctxFragment: IctxShadow = fragmentCanvas?.current?.getContext('2d')

            // 让两个ctx拥有同样的裁剪路径(可滑动小块的轮廓)
            const styleIndex = Math.floor(Math.random() * 16)
            createClipPath(ctxShadow, fragmentSize, styleIndex)
            createClipPath(ctxFragment, fragmentSize, styleIndex)

            // 随机生成裁剪图片的开始坐标
            const clipX = Math.floor(fragmentSize + (width - 2 * fragmentSize) * Math.random())
            const clipY = Math.floor((height - fragmentSize) * Math.random())

            // 让小块绘制出被裁剪的部分
            //context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
            //规定要使用的图像、画布或视频 ,  开始剪切的 x/y 坐标位置, 图像的宽度高度, 在画布上放置图像的 x/y 坐标位置， 要使用的图像的宽度高度（伸展或缩小图像）
            ctxFragment?.drawImage(
                objImage,
                clipX,
                clipY,
                fragmentSize,
                fragmentSize,
                0,
                0,
                fragmentSize,
                fragmentSize
            )
            if (ctxShadow) {
                ctxShadow.fillStyle = 'rgba(0, 0, 0, 0.5)'
            }
            ctxShadow?.fill()
            ctxShadow?.restore()
            ctxFragment?.restore()

            setOffsetX(clipX)
            setOffsetY(clipY)
            setStatus(STATUS_READY)
        })
        objImage.src = _img[index]
    }
    const onMoveStart = (e: any) => {
        if (status !== STATUS_READY) {
            return
        }
        setIsMovable(true)
        setStartX(e.clientX)
    }

    const onMoving = (e: any) => {
        if (status !== STATUS_READY || !isMovable) {
            return
        }
        const distance = e.clientX - startX
        let currX = oldX + distance

        const minX = 0
        const maxX = width - fragmentSize
        currX = currX < minX ? 0 : currX > maxX ? maxX : currX
        setCurrX(currX)
    }

    const onMoveEnd = () => {
        if (status !== STATUS_READY || !isMovable) {
            return
        }
        //将旧的固定坐标x更
        setIsMovable(false)
        setOldX(currX)
        //匹配判断
        const isMatch = Math.abs(currX - offsetX) < accuracy
        if (isMatch) {
            setStatus(STATUS_MATCH)
            setCurrX(offsetX)
            onSuccess && onSuccess()
        } else {
            setStatus(STATUS_ERROR)
            onError && onError()
            onReset()
            onShowTips()
        }
    }

    const onReset = () => {
        const timer = setTimeout(() => {
            setOldX(0)
            setCurrX(0)
            setStatus(STATUS_READY)
            clearTimeout(timer)
            onReload()
        }, 1000)
    }

    const onReload = () => {
        const ctxShadow: IctxShadow = bigCanvas?.current?.getContext('2d')
        const ctxFragment: IctxShadow = fragmentCanvas?.current?.getContext('2d')

        // 清空画布
        ctxFragment?.clearRect(0, 0, fragmentSize, fragmentSize)
        ctxShadow?.clearRect(0, 0, fragmentSize, fragmentSize)

        setOldX(0)
        setOffsetX(0)
        setOffsetY(0)
        setStartX(0)
        setCurrX(0)
        setStatus(STATUS_LOADING)
        setIsMovable(false)
        let index = GetRandomNum(1, 5)
        setImgUrl(index)
        setCanvas(index)
    }

    const onShowTips = () => {
        if (showTips) {
            return
        }
        const tipsIndex = status === STATUS_MATCH ? 0 : 1
        setShowTips(true)
        setTipsIndex(tipsIndex)
        const timer = setTimeout(() => {
            setShowTips(false)
            clearTimeout(timer)
        }, 2000)
    }

    const tips = arrTips[tipsIndex]
    return (
        <div
            className={ImgCodeStyle.ImgCode_root}
            style={{ width: `${width}px` }}
            onMouseUp={onMoveEnd}
            onMouseMove={onMoving}
        >
            <div
                className={ImgCodeStyle.image_container}
                style={{
                    height: `${height}px`,
                    width: `${width}px`,
                    backgroundImage: `url(${_img[imgUrl]})`,
                }}
            >
                {/* 底层画布 */}
                <canvas
                    ref={bigCanvas}
                    height={fragmentSize}
                    width={fragmentSize}
                    style={{ left: offsetX + 'px', top: offsetY + 'px' }}
                />
                {/* 图片碎片 */}
                <canvas
                    ref={fragmentCanvas}
                    height={fragmentSize}
                    width={fragmentSize}
                    style={{ left: currX + 'px', top: offsetY + 'px' }}
                />
                <div
                    className={classnames(
                        showTips ? ImgCodeStyle.tips_container__active : ImgCodeStyle.tips_container
                    )}
                >
                    <span className={ImgCodeStyle.tips_text}>{tips.text}</span>
                </div>
            </div>
            <div className={ImgCodeStyle.imgCode_change}>
                {handleRender && handleRender()}
                {isUpadta && (
                    <div onClick={onReload} title={'刷新验证'}>
                        <RedoOutlined style={{ fontSize: '24px' }} />
                    </div>
                )}
            </div>
            {otherRender && otherRender()}
            <div
                className={ImgCodeStyle.imgCode_slider}
                onMouseMove={onMoving}
                // onMouseLeave={onMoveEnd}
            >
                <div className={ImgCodeStyle.slider_bar}>
                    {handleTitle ? handleTitle : '向右拖动滑块填充拼图'}
                </div>
                <div
                    className={classnames(
                        ImgCodeStyle.slider_track,
                        status === STATUS_MATCH
                            ? ImgCodeStyle.slider_track_ok
                            : status === STATUS_ERROR
                            ? ImgCodeStyle.slider_track_error
                            : ''
                    )}
                    style={{
                        width: currX + 'px',
                    }}
                />
                <div
                    className={classnames(
                        ImgCodeStyle.slider_icon,
                        status === STATUS_MATCH
                            ? ImgCodeStyle.slider_icon_ok
                            : status === STATUS_ERROR
                            ? ImgCodeStyle.slider_icon_error
                            : isMovable
                            ? ImgCodeStyle.slider_icon_move
                            : ''
                    )}
                    onMouseDown={onMoveStart}
                    onMouseUp={onMoveEnd}
                    style={{
                        left: currX + 'px',
                        backgroundImage: `url(${
                            ![STATUS_ERROR, STATUS_MATCH].includes(status) &&
                            !isMovable &&
                            _img[imgUrl]
                        })`,
                    }}
                >
                    {status === STATUS_MATCH ? (
                        <CheckOutlined style={{ color: '#fff', fontSize: '24px' }} />
                    ) : status === STATUS_ERROR ? (
                        <CloseOutlined style={{ color: '#fff', fontSize: '24px' }} />
                    ) : isMovable ? (
                        <ArrowRightOutlined style={{ color: '#fff', fontSize: '24px' }} />
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    )
}

export default React.forwardRef(IImgCodeProps)
