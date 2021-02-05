/*
 * File: index.tsx
 * Description: 描述
 * File Created: 2021-02-05 14:54:26
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-02-05 16:35:52
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2021 - Present, Your Company
 */
import React, { useState, useEffect, useImperativeHandle } from 'react';
import { Transfer } from 'antd';
import { TransferProps } from 'antd/lib/transfer';

interface ITransferCProps extends TransferProps<any> {
  dataSource: any[];
  checkData?: any;
  renderList?: any;
}

const TransferC = (props: ITransferCProps, ref: any) => {
  const { dataSource, checkData, renderList, ...resprops } = props;
  const [mockData, setMockData] = useState<any>([]);
  const [targetKeys, setTargetKeys] = useState<any>([]);
  useImperativeHandle(ref, () => {
    return {
      targetKeys: targetKeys,
    };
  });
  useEffect(() => {
    getMock();
  }, [dataSource, checkData]);
  const getMock = () => {
    const _targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `数据${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        _targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    dataSource ? setMockData(dataSource) : setMockData(mockData);
    checkData ? setTargetKeys(checkData) : setTargetKeys(_targetKeys);
  };

  const handleChange = (targetKeys: any) => {
    setTargetKeys(targetKeys);
  };

  return (
    <Transfer
      dataSource={mockData}
      showSearch
      operations={['选中', '取消']}
      targetKeys={targetKeys}
      onChange={handleChange}
      render={item => (renderList ? renderList(item) : `${item.title}`)}
      {...resprops}
    />
  );
};
export default React.forwardRef(TransferC);
