/*
 * File: index.ts
 * Description: 描述
 * File Created: 2020-12-16 12:58:48
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-16 12:59:33
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
export default {
  'GET /api/mock/list': {
    code: 200,
    data: {
      list: [
        {
          1: '数据1',
          2: '信息项1-1',
          3: '信息项1-2',
          4: 'New York No. 1 Lake Park',
          5: 123,
          6: '2020-05-03',
          7: '是',
          8: '内蒙古包头市卡泽区达丽雅县龙泽乡',
        },
        {
          1: '数据2',
          2: '信息项2-1',
          3: '信息项2-2',
          4: 'London No. 1 Lake Park',
          5: 42,
          6: '2020-05-30',
          7: '否',
          8: '内蒙古包头市卡泽区达丽雅县龙泽乡',
        },
        {
          1: '数据3',
          2: '信息项3-1',
          3: '信息项3-3',
          4: 'Sidney No. 1 Lake Park',
          5: 1234,
          6: '2020-08-03',
          7: '是',
          8: '内蒙古包头市卡泽区达丽雅县龙泽乡',
        },
      ],
      pageNum: 1,
      pageSize: 20,
      total: 3,
    },
  },
};
