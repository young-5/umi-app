/*
 * File: index.tsx
 * Description: 描述
 * File Created: 2021-04-21 10:01:21
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-04-21 11:36:28
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2021 - Present, Your Company
 */
import React, { useEffect } from 'react';
import { useHttp } from '../react/hooks';
import { Title } from 'oi-ui';
import { get } from '@/services';
interface NMGProps {}

const NMG: React.FC<NMGProps> = props => {
  const { http, loading, response }: any = useHttp({
    request: (params: any) => {
      return get({
        url: '/api/mock/list',
        params,
      });
    },
    // requestData: { id: 123 },
  });
  useEffect(() => {
    http();
  }, []);
  return (
    <div>
      <Title title="请求">
        <div>{response && JSON.stringify(response)}</div>
      </Title>
    </div>
  );
};

export default NMG;
