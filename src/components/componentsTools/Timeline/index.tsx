/*
 * File: index.tsx
 * Description: 时间轴组件
 * File Created: 2020-11-10 14:30:52
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-11-19 14:37:12
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React from 'react'
import { Timeline } from 'antd'

import { TimelineProps } from 'antd/lib/timeline'

interface Ifiles {
    label: string
    value: string
}

interface NMGProps extends TimelineProps {
    datas?: any[]
    files?: Ifiles
    renderTimelineItem?: any
}
/**
 *
 * @class 时间轴组件
 */
const NMG: React.FC<NMGProps> = props => {
    const {
        datas = [],
        files = { label: 'label', value: 'value' },
        mode,
        renderTimelineItem,
        ...restProps
    } = props
    return (
        <Timeline mode={'left'} {...restProps}>
            {datas?.map((data: any, i: number) => {
                return (
                    <Timeline.Item label={data[files?.label]}>
                        {renderTimelineItem ? renderTimelineItem(data, i) : data[files?.value]}
                    </Timeline.Item>
                )
            })}
        </Timeline>
    )
}

export default NMG
