import React from 'react';
import { AuthPermit, Title } from '@/components/componentsTools';

const Auth = () => {
  return (
    <div>
      <Title title="权限控制">
        <AuthPermit require={['1']}>
          <div>登录后 有权限'1' 显示我 </div>
        </AuthPermit>
      </Title>
    </div>
  );
};
export default Auth;
