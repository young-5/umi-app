import React from 'react';
import { AuthPermit } from '@/components/componentsTools';
import { Encrypt } from '@/utils';
import { Title } from 'oi-ui';
const Auth = () => {
  const token = localStorage.getItem('token');
  return (
    <div>
      <Title title="权限控制">
        <AuthPermit require={['1']}>
          <div>登录后 有权限'1' 显示我 </div>
        </AuthPermit>
      </Title>
      <Title title="加密">
        <div>{`加密token:${token}`}</div>
        <div>{`解密token:${token && Encrypt.decode(token)}`}</div>
      </Title>
    </div>
  );
};
export default Auth;
