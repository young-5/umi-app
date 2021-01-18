/*
 * File: index.tsx
 * Description: 下载组件
 * File Created: 2020-09-24 11:08:07
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-16 16:18:20
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React, { useState } from 'react';
import { notification, message } from 'antd';
interface IDownloadProps {
  //--- //请求配置
  params?: any;
  accept?: string;
  method?: string;
  action: string;
  //----
  isToken?: boolean; //是否带token
  beforeDownload?: () => any; //下载前回调
  callback?: () => void; //成功后回调
  children?: (loading: boolean) => React.ReactElement<any>; //下载组件子组件
}
/**
 *
 * @class 下载组件
 */
const Download: React.FC<IDownloadProps> = props => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    params = {},
    accept = '*/*',
    method = 'get',
    action,
    isToken = false,
    callback,
    children,
    beforeDownload,
  } = props;
  const codeMessage: Object = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误或文件资源不存在',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  };
  /**
   * 异常处理程序
   */
  const errorHandler = (error: any) => {
    const { response = {} } = error;
    const errortext = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    let errorMessage;
    notification.destroy();
    if (status === 401 && url.indexOf('user/signout') === -1) {
      errorMessage = '未登录或登录已过期，请重新登录。';
      notification.error({
        message: errorMessage,
      });
      // @ts-ignore: Unreachable code error
      window?.g_app?._store?.dispatch({
        type: 'login/logout',
      });
    } else {
      errorMessage = `${errortext}`;
    }
    throw new Error(errorMessage);
  };
  //浏览器保存本地
  const downFile = (blob: any, fileName: string) => {
    if (window?.navigator && window.navigator?.msSaveOrOpenBlob) {
      window?.navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window?.URL?.revokeObjectURL(link.href);
    }
  };
  /**
   * 下载
   */
  const downloadTmpl = async () => {
    const headers: any = {
      ...(isToken && sessionStorage.getItem('token')
        ? { Authorization: sessionStorage.getItem('token') }
        : null),
      Accept: accept,
    };
    // const request = extend({
    //     errorHandler, // 默认错误处理
    //     credentials: 'include', // 默认请求是否带上cookie
    // })
    setLoading(true);
    return;
  };

  const start = () => {
    beforeDownload
      ? beforeDownload()
          .then(() => downloadTmpl())
          .catch((e: any) => message.error(e.message))
      : downloadTmpl();
  };
  return (
    <div onClick={start} style={{ display: 'inline-block' }}>
      {children && children(loading)}
    </div>
  );
};

export default Download;
