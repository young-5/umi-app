/**
 * 权限池
 */
import React from 'react';
import { useTaoismState } from '../redux-y5';

type AuthPoolProps = {
  checkPermit: (permits: any) => React.ReactElement | null;
};

/** 权限池，汇集权限数据源 */
const AuthPool = (props: AuthPoolProps) => {
  const { permits }: any = useTaoismState([{ permits: [] }]);
  return props.checkPermit(permits.data);
};

export default AuthPool;
