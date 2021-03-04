/*
 * File: utils.ts
 * Description: axios函数封装
 * File Created: 2020-12-16 12:49:27
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-03-04 11:23:43
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import axios from 'axios';
import { cloneDeep } from 'lodash';
//url的正则验证
import { parse, compile } from 'path-to-regexp';
import { message } from 'antd';

const { CancelToken } = axios;
(window as any).cancelRequest = new Map();

export default function request(options: any) {
  let { data, params, url, method = 'get' } = options;
  const cloneData = cloneDeep(data || params);

  try {
    let domain = '';
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/);
    //api验证
    if (urlMatch) {
      [domain] = urlMatch;
      url = url.slice(domain.length);
    }

    const match = parse(url);
    url = compile(url)(data || params);

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name];
      }
    }
    url = domain + url;
  } catch (e) {
    message.error(e.message);
  }

  options.url = url;
  options.params = cloneData;
  options.method = method;
  options.cancelToken = new CancelToken(cancel => {
    (window as any).cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    });
  });

  return axios(options)
    .then(response => {
      const { statusText, status, data } = response;

      let result: any = {};
      if (typeof data === 'object') {
        result = data;
        if (Array.isArray(data)) {
          result.list = data;
        }
      } else {
        result.data = data;
      }

      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        ...result,
      });
    })
    .catch(error => {
      const { response, message } = error;
      if (String(message) === 'cancel request') {
        return {
          success: false,
        };
      }

      let msg;
      let statusCode;

      if (response && response instanceof Object) {
        const { data, statusText } = response;
        statusCode = response.status;
        msg = data.message || statusText;
      } else {
        statusCode = 600;
        msg = error.message || 'Network Error';
      }

      /* eslint-disable */
      return Promise.reject({
        success: false,
        statusCode,
        message: msg,
      });
    });
}
