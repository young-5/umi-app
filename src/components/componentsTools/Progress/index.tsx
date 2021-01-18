/**
 * 进度组件
 */
import React from 'react'
import { Progress } from 'antd'
import './index.less'
interface IProgressCpProps {
    [KEY: string]: any
}
const ProgressCp: React.FC<IProgressCpProps> = props => {
    const {
        type = 'circle', //类型
        sucNum, //数量
        total, //总数
        files, //数据配置
        data, //数据
        percent, //占比
        //中心信息
        centerTtext,
        //自定义头部信息
        headLeftText,
        headRightText,
        headRender,
        //自定义脚部信息
        footerText,
        time,
        footerRender,
        showInfo = false,
        ...restProps
    } = props
    return (
        <div className="progress_root">
            {type === 'circle' ? (
                <>
                    <Progress
                        percent={percent || ((sucNum / total) * 100).toFixed(2)}
                        type={type}
                        format={percent => {
                            return (
                                <div className="progress_center">
                                    <div className="progress_center_percent">{percent}</div>
                                    <div className="progress_center_text">{centerTtext}</div>
                                </div>
                            )
                        }}
                        {...restProps}
                    />
                    {footerRender
                        ? footerRender()
                        : files && (
                              <div className="progress_text">
                                  {files?.map((file: any, i: number) => {
                                      return <span>{`${file.name}:${data[file.value]}`}</span>
                                  })}
                              </div>
                          )}
                </>
            ) : (
                <>
                    {headRender ? (
                        headRender()
                    ) : (
                        <div className="progress_top">
                            {headLeftText ? (
                                <span>{headLeftText}</span>
                            ) : (
                                <span>
                                    <span className={'progress_top_num'}>{sucNum}</span>
                                    <span className={'progress_top_total'}>/{total}</span>
                                </span>
                            )}
                            {headRightText ? (
                                headRightText
                            ) : (
                                <span className={'progress_top_percent'}>
                                    {((sucNum / total) * 100).toFixed(2) + '%'}
                                </span>
                            )}
                        </div>
                    )}

                    <Progress
                        percent={percent || ((sucNum / total) * 100).toFixed(2)}
                        type={type}
                        format={percent => {
                            return (
                                <div>
                                    <div>{percent}</div>
                                    <div>{centerTtext}</div>
                                </div>
                            )
                        }}
                        showInfo={showInfo}
                        {...restProps}
                    />

                    {footerRender ? (
                        footerRender()
                    ) : (
                        <div className="progress_bottom">
                            <span>{footerText}</span>
                            <span>{time}</span>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default ProgressCp
