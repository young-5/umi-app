/*
 * File: TreeTable.tsx
 * Description: 描述
 * File Created: 2020-12-14 17:19:18
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-14 19:50:24
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React, { useEffect, useState } from 'react'
import { Checkbox } from 'antd'
import data from './data'
import _ from 'lodash'
import styles from './index.less'
interface NMGProps {
    datas?: any[]
}

const NMG: React.FC<NMGProps> = props => {
    const { datas = data } = props
    const [statusObj, setStatusObj] = useState<any>({})
    useEffect(() => {
        initData(datas)
    }, [])

    //自选
    const CheckboxChange = (e: any, v: any) => {
        let _statusObj = _.cloneDeep(statusObj)
        if (_statusObj && _statusObj[v.key]) {
            _statusObj[v.key].status = e.target.checked
            findP(_statusObj, v)
            findC(_statusObj, v, e)
            setStatusObj(_statusObj)
        }
    }
    //父选
    const findP = (_statusObj: any, checkV: any) => {
        let commanP: any = []
        Object.keys(_statusObj).map(v => {
            if (statusObj[v].pid === checkV.pid) {
                commanP.push(v)
            }
        })
        if (!commanP?.find((v: any) => _statusObj[v].status === false)) {
            if (_statusObj[checkV.pid]) {
                _statusObj[checkV.pid].status = true
            }
        } else {
            if (_statusObj[checkV.pid]) {
                _statusObj[checkV.pid].status = false
            }
        }
        if (_statusObj[checkV.pid]?.pid && _statusObj[_statusObj[checkV.pid].pid]) {
            findP(_statusObj, _statusObj[checkV.pid])
        }
    }
    //父选改变
    const findC = (_statusObj: any, checkV: any, e: any) => {
        let commanC: any = []
        Object.keys(_statusObj).map(v => {
            if (_statusObj[v]?.pid === checkV.key) {
                commanC.push(v)
            }
        })
        if (commanC?.length > 0) {
            commanC?.forEach((v: any) => {
                _statusObj[v].status = e.target.checked
                findC(_statusObj, _statusObj[v], e)
            })
        }
    }
    //遍历树
    const mapTree = (_data: any, _statusObj: any) => {
        _data.forEach((data: any) => {
            if (!data.children) {
                _statusObj[data.key] = {
                    status: data?.status || false,
                    pid: data?.pid,
                    key: data?.key,
                }
            } else {
                _statusObj[data.key] = {
                    status: data?.status || false,
                    pid: data?.pid,
                    key: data?.key,
                }
                mapTree(data.children, _statusObj)
            }
        })
    }
    const initData = (datas: any) => {
        let _statusObj = _.cloneDeep(statusObj)
        mapTree(datas, _statusObj)
        setStatusObj(_statusObj)
    }
    const renderItem = (_data: any) => {
        return (
            <div className={styles[`item_box`]}>
                {_data?.map((v: any, i: number) => {
                    if (!v.children) {
                        return (
                            <div key={v.key} className={styles[`item`]}>
                                <span className={styles[`item_checkbox`]}>
                                    <Checkbox
                                        onChange={(e: any) => {
                                            CheckboxChange(e, v)
                                        }}
                                        checked={statusObj[v.key]?.status}
                                    />
                                </span>
                                <span className={styles[`item_title`]}>{v.title}</span>
                            </div>
                        )
                    } else {
                        return (
                            <div className={styles[`item`]}>
                                <div key={v.key} className={styles[`item`]}>
                                    <span className={styles[`item_checkbox`]}>
                                        <Checkbox
                                            onChange={(e: any) => {
                                                CheckboxChange(e, v)
                                            }}
                                            checked={statusObj[v.key]?.status}
                                        />
                                    </span>
                                    <span className={styles[`item_title`]}>{v.title}</span>
                                    {renderItem(v.children)}
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }
    return <div className={styles.tree_root}>{renderItem(datas)}</div>
}

export default NMG
