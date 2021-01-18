/*
 * File: index.tsx
 * Description: 表格卡片切换组件
 * File Created: 2020-10-20 17:35:30
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-11-30 13:04:40
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React, { useState } from 'react'
import { Radio } from 'antd'
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons'
import { RadioChangeEvent } from 'antd/lib/radio'
import styles from './index.less'

interface Ipagination {
    total?: number | string
    totalPage?: number | string
}
interface ImodeArry {
    key: string
    icon: React.ReactNode
    component?: React.ReactNode
}
interface IWithGridViewProps {
    modeArry?: ImodeArry[] //切换按钮组件配置
    viewMode?: string //默认显示类型
    //切换组件自定义显示设置
    headerRnder?: () => any
    isPage?: boolean
    pagination?: Ipagination
    renderComponents?: any //公共显示组件
}

const WithGridView: React.FC<IWithGridViewProps> = props => {
    const {
        modeArry = [
            {
                key: 'list',
                icon: <UnorderedListOutlined />,
                component: <div>card</div>,
            },
            {
                key: 'card',
                icon: <AppstoreOutlined />,
                component: <div>table</div>,
            },
        ],
        viewMode = 'list',
        headerRnder,
        isPage,
        pagination,
        renderComponents,
    } = props
    const [viewType, setViewType] = useState<string | number>(viewMode)
    const handleViewModeChange = (e: RadioChangeEvent) => {
        setViewType(e.target.value)
    }
    const RenderRdio = (ChackArr: any[]) => {
        return (
            <div className={styles.root}>
                {ChackArr?.length > 0 && (
                    <Radio.Group
                        defaultValue={viewMode}
                        onChange={handleViewModeChange}
                        className={styles.radioContainer}
                    >
                        {ChackArr?.map((v: any, i: number) => (
                            <Radio.Button value={v.key}>{v.icon}</Radio.Button>
                        ))}
                    </Radio.Group>
                )}
                {isPage && (
                    <span style={{ marginLeft: 8 }}>
                        共有 {pagination?.total} 条信息, 共 {pagination?.totalPage} 页
                    </span>
                )}
                {headerRnder && <div className={styles.handleRender}>{headerRnder()}</div>}
            </div>
        )
    }
    return (
        <div>
            {RenderRdio(modeArry)}
            {renderComponents
                ? renderComponents(viewType)
                : modeArry.find(v => v.key === viewType)?.component}
        </div>
    )
}

export default WithGridView
