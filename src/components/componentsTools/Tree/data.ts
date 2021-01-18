/*
 * File: data.ts
 * Description: 描述
 * File Created: 2020-12-14 17:21:51
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-14 19:42:59
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
export default [
    {
        title: '系统',
        key: '1',
        pid: 'root',
        children: [
            {
                title: '主体备案',
                key: '11',
                pid: '1',
                children: [
                    {
                        title: '主体管理',
                        key: '111',
                        pid: '11',
                        children: [
                            {
                                title: '活跃主体数量展示',
                                key: '1111',
                                pid: '111',
                                children: [
                                    { title: '查看', key: '11111', pid: '1111' },
                                    { title: '编辑', key: '11112', pid: '1111' },
                                    { title: '删除', key: '11113', pid: '1111' },
                                ],
                            },
                            {
                                title: '主体详情',
                                key: '1112',
                                pid: '111',
                                children: [
                                    { title: '查看', key: '11121', pid: '1112' },
                                    { title: '编辑', key: '11122', pid: '1112' },
                                    { title: '删除', key: '11123', pid: '1112' },
                                ],
                            },
                        ],
                    },
                    { title: '机构管理', key: '112', pid: '11' },
                    { title: '表单管理', key: '113', pid: '11' },
                ],
            },
            {
                title: '12',
                key: '12',
                pid: '1',
                children: [
                    { title: '0-0-1-0', key: '121', pid: '12' },
                    { title: '0-0-1-1', key: '122', pid: '12' },
                    { title: '0-0-1-2', key: '123', pid: '12' },
                ],
            },
            {
                title: '13',
                key: '13',
                pid: '1',
            },
        ],
    },
    {
        title: '0-1',
        key: '0-1',
        pid: 'root',
        children: [
            { title: '0-1-0-0', key: '0-1-0-0', status: true, pid: '0-1' },
            { title: '0-1-0-1', key: '0-1-0-1', pid: '0-1' },
            { title: '0-1-0-2', key: '0-1-0-2', pid: '0-1' },
        ],
    },
    {
        title: '0-2',
        pid: 'root',
        key: '0-2',
    },
]
