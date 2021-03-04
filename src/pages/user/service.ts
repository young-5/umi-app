/*
 * File: service.ts
 * Description: 描述
 * File Created: 2021-03-04 11:05:48
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-03-04 11:23:06
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2021 - Present, Your Company
 */

import { post, get } from '@/services';

/**
 * @function 登录
 * @param data
 */
export const getLogin = (data: any) => {
  return post({ url: '/WG_IP/basesupport-service/account/login', data });
};

/**
 * @function 手机号登录
 * @param params
 */
export async function captchaLogin(data: any) {
  return post({
    url: '/WG_IP/basesupport-service/account/verify_code_login',
    data,
  });
}

/**
 * @function 手机号验证获取
 * @param params 手机号
 */
export async function getFakeCaptcha(params: any) {
  return get({
    url: '/WG_IP/basesupport-service/sms/send_verify_code',
    params,
  });
}

/**
 * @function 用户忘记密码
 * @param data
 */
export async function getPassword(data: any) {
  return post({
    url: '/WG_IP/basesupport-service//account/retrieve_password',
    data,
  });
}
