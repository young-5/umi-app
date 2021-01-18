/**
 * 分段占比组件（3段）
 */
import React from 'react'
import { Tooltip, Progress } from 'antd'
import './index.less'
interface IProportionProps {
    [KEY: string]: any
}

const Proportion: React.FC<IProportionProps> = props => {
    const {
        files, //数据配置
        data, //数据
        footerRender,
        tooltipRender,
        color = ['#52c41a', '#1890ff', '#F56C3C'],
    } = props
    //获取总数
    const getTotal = () => {
        let num = 0
        files.forEach((file: any) => {
            num = num + data[file.value]
        })
        return num
    }
    //获取占比
    const getPercent: any = (index: any) => {
        let num = 0
        files?.forEach((file: any, i: number) => {
            if (i < index) {
                num = num + data[file.value]
            }
        })
        return ((num / getTotal()) * 100).toFixed(2)
    }
    const setTooltip = () => {
        let total = getTotal()
        return files.map((file: any, i: number) => {
            let pre = ((data[file.value] / total) * 100).toFixed(2)
            return <div>{`${file.name}  :  ${data[file.value]}(${pre}%)`}</div>
        })
    }
    return (
        <div className={'proportion_root'}>
            <div className={'proportion_head'}>
                <span className={'proportion_head_total'}>120502</span>
                <span className={'proportion_head_text'}>任务总量</span>
            </div>
            <Tooltip title={tooltipRender ? tooltipRender() : setTooltip()}>
                <Progress
                    percent={getPercent(2)}
                    success={{ percent: getPercent(1) }}
                    showInfo={false}
                />
            </Tooltip>
            {footerRender
                ? footerRender()
                : files && (
                      <div className="progress_text">
                          {files?.map((file: any, i: number) => {
                              return (
                                  <span>
                                      {' '}
                                      <span
                                          className={'progress_text_color'}
                                          style={{
                                              background: color[i],
                                          }}
                                      />
                                      {`${file.name}:${data[file.value]}`}
                                  </span>
                              )
                          })}
                      </div>
                  )}
        </div>
    )
}
export default Proportion
