/**
 * 权限许可组件
 */

import React from 'react';
import { AuthPool } from '..';
import { includePermit } from '../utils';

type AuthPermitProps = {
  require: string[];
  every?: boolean;
  children: React.ReactElement;
};

/** 权限许可组件 */
const AuthPermit = (props: AuthPermitProps) => (
  <AuthPool
    checkPermit={permits =>
      includePermit(permits, props.require, props.every) ? props.children : null
    }
  />
);

export default AuthPermit;
