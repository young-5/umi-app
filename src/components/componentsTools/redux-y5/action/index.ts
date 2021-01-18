import * as type from './type';

let funcs: any;
/**
 * 注册接口请求api函数
 * @param {*} apis
 */
export const setConfig = (apis: any) => (funcs = apis);

const requestData = (category: any) => ({
  type: type.REQUEST_DATA,
  category,
});
const receiveData = (data: any, category: any) => ({
  type: type.RECEIVE_DATA,
  data,
  category,
});
/**
 * 请求数据调用方法
 * @param option1 以下對象
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 * @param stateName     state的名称
 * @param data          非异步请求时state的值
 * @param option2 非异步请求时state的值
 *
 * stateName 为空时，默认设置为api函数的名称
 */
export const setTaoismState = (option1: any, option2: any) => (dispatch: any) => {
  let funcName, params, stateName: any, data;
  if (typeof option1 === 'object') {
    ({ funcName, params, stateName = funcName, data } = option1);
  }
  if (typeof option1 === 'string') {
    stateName = option1;
  }
  if (option2) {
    data = option2;
  }
  // 非异步请求的处理
  if (!funcName && stateName) return dispatch(receiveData(data, stateName));
  // 异步请求的处理
  dispatch(requestData(stateName));
  return funcs[funcName](params).then((res: any) => dispatch(receiveData(res, stateName)));
};
