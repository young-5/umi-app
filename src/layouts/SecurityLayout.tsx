import React from 'react';
import { Redirect } from 'umi';
import { stringify } from 'querystring';
import { TaoismProvider } from '@/components/componentsTools/redux-y5';

const SecurityLayout = (props: any) => {
  const { children, currentUser } = props;
  const isOk = () => {
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const isLogin = currentUser && currentUser.userid;
    const isToken = sessionStorage.getItem('token');
    const queryString = stringify({
      redirect: window.location.href,
    });
    //重定向
    // if ((!isLogin && window.location.pathname !== '/user/login') || !isToken) {
    //   return <Redirect to={`/user/login?${queryString}`} />;
    // }
    return <TaoismProvider>{children}</TaoismProvider>;
  };
  return isOk();
};

export default SecurityLayout;
