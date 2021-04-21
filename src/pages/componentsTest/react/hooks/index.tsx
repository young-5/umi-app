/*
 * File: index.tsx
 * Description: 描述
 * File Created: 2021-02-24 13:10:19
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-04-21 14:16:38
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2021 - Present, Your Company
 */
/*
 * File: useHttp.tsx
 * Description: 描述
 * File Created: 2021-04-21 09:07:35
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-04-21 11:34:33
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2021 - Present, Your Company
 */
import React, { useCallback, useState } from 'react';
export type UseHttpPropsType<R = any, D = any, P = R> = {
  request: any; //(data?: D) => Promise<R>;
  requestData?: D;
  cancelRequest?: () => void;
  afterRequest?: (data?: R) => void;
  responsePipe?: (response: R) => P;
  responseInit?: P;
  autoBy?: any[];
  [key: string]: any;
};

export type UseHttpReturnType<R = any> = {
  http: () => void;
  response: R;
  loading: boolean;
};

/**
 * 请求hook
 * @params param {
 * request:请求函数(接受请求参数作为参数)，
 * requestData:请求参数，
 * afterRequest:请求完成回调，
 * cancelRequest:取消请求函数，
 * responsePipe:返回结果转换函数，
 * responseInit:初始默认返回值，
 * autoBy:进入组件自动发起请求的状态依赖(不传则不会自动发起请求)
 *  }
 * @returns return {
 * http:执行请求函数，
 * loading:请求加载状态，
 * response:请求返回结果
 * }
 */
export function useHttp<R = any, D = any, P = R>({
  request,
  requestData,
  afterRequest,
  cancelRequest,
  responsePipe,
  responseInit,
  autoBy,
  ...args
}: UseHttpPropsType<R, D, P>): UseHttpReturnType<P | undefined> {
  /** 加载状态 */
  const [loading, set_loading] = React.useState<boolean>(false);

  /** 请求结果 */
  const [response, set_response] = React.useState<P | undefined>(responseInit);

  /**
   * 执行请求函数
   */
  const http = useCallback(async () => {
    let response: any = { error: '你定义的错误类型' };
    set_loading(true);
    try {
      request(requestData)
        .then((res: any) => {
          const finalRes = responsePipe ? responsePipe(res) : (res as any);
          set_response(finalRes);
          afterRequest && afterRequest(res);
        })
        .finally(() => {});
    } catch (error) {
      set_response(response);
    }
    set_loading(false);
  }, [request, requestData]);

  /** 进入组件自动请求 */
  React.useEffect(
    () => {
      if (Array.isArray(autoBy)) {
        http();
      }
      return cancelRequest;
    },
    autoBy ? autoBy : [],
  );

  return {
    http,
    loading,
    response,
  };
}
/**
 * 对请求成功或请求失败做某些相应的处理，
 * @param request
 * @param handleResult
 * @param handleError
 * @param args
 * @returns
 */
type ResultOf<T extends () => any> = ReturnType<T> extends Promise<infer R> ? R : ReturnType<T>;

export function useHandle<Request extends (...args: any[]) => Promise<any>>(
  request: Request,
  handleResult: (result: ResultOf<Request>) => void,
  handleError?: (error: any) => void,
  ...args: Parameters<Request>
) {
  const { http, loading } = useHttp({
    request,
    ...args,
  });
  const callAndHandle = useCallback(async () => {
    const resp: any = await http();
    if ('error' in resp) {
      handleError && handleError(resp.error);
    } else {
      handleResult(resp.result);
    }
  }, [http, handleResult, handleError]);
  return [callAndHandle, loading] as const;
}

/**
 * 只需要对请求回来的结果做setState的操作而不需要再做其他的操作
 * @param defaultValue
 * @param request
 * @param args
 * @returns
 */

export function useFetch<
  Request extends (...args: any[]) => Promise<any>,
  K extends ResultOf<Request> | undefined
>(defaultValue: K, request: Request, ...args: Parameters<Request>) {
  const [state, setState] = useState<ResultOf<Request> | undefined>(defaultValue);
  const [loading, setLoading] = useState(false);
  // const params = useOriginalDeepCopy(args);
  const params = args;
  const task = useCallback(async () => {
    setLoading(true);
    try {
      const result = await request(...params);
      setState(result);
    } catch (e) {
      // 你的错误处理
    }
    setLoading(false);
  }, [params, request]);

  return [
    state as K extends undefined ? ResultOf<Request> | undefined : ResultOf<Request>,
    task,
    loading,
  ] as const;
}
