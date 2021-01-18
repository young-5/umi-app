/*
 * File: utiles.ts
 * Description: 工具函数
 * File Created: 2020-11-11 16:44:24
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-16 16:19:41
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
/**
 * 数据类型检测，String，Number，Array...
 */
export class PrototypeCheck {
  static getPrototype(value: any): string {
    return Object.prototype.toString.call(value);
  }

  static checkProtoType(value: any, prototype: string): boolean {
    return this.getPrototype(value) === prototype;
  }

  /**
   * 是否String类型
   * @param value
   */
  static isString(value: any): boolean {
    return this.checkProtoType(value, '[object String]');
  }

  /**
   * 是否Number类型
   * @param value
   */
  static isNumber(value: any): boolean {
    return this.checkProtoType(value, '[object Number]');
  }

  /**
   * 是否Array类型
   * @param value
   */
  static isArray(value: any): boolean {
    return this.checkProtoType(value, '[object Array]');
  }

  /**
   * 是否Function类型
   * @param value
   */
  static isFunction(value: any): boolean {
    return this.checkProtoType(value, '[object Function]');
  }
}
/**
 * 获取区间内的随机数量
 * @param Min 最小值
 * @param Max 最大值
 */
export const GetRandomNum = (Min: number, Max: number) => {
  let Range = Max - Min;
  let Rand = Math.random();
  return Min + Math.round(Rand * Range);
};

// 获取url的参数 hash模式
export const queryStringHash = () => {
  let _queryString: any = {};
  let _query = window.location.hash.substr(1).split('?');
  _query.shift();
  //  const _query = window.location.search.substr(1)
  //hash返回的是第一个’#‘之后的内容，search返回的是第一个’?‘之后的内容，如果’?‘之前有’#’，直接使用search得不到url链接的参数。
  const _vars = _query[0]?.split('&');
  _vars?.forEach((v, i) => {
    const _pair = v.split('=');
    if (!_queryString.hasOwnProperty(_pair[0])) {
      _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
    } else if (typeof _queryString[_pair[0]] === 'string') {
      const _arr = [_queryString[_pair[0]], decodeURIComponent(_pair[1])];
      _queryString[_pair[0]] = _arr;
    } else {
      _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
    }
  });
  return _queryString;
};

/**
 * 生成唯一的通用唯一识别码 key
 * @param a
 */
export function uuid(a?: number) {
  return a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
}

/**
 * 获取两个数组的交集
 * @param arr1 数组1
 * @param arr2 数组2
 */
function intersectionArr(arr1: string[], arr2: string[]): string[] {
  const _temp: string[] = [];
  arr1.forEach((v1: string) => {
    if (arr2.indexOf(v1) !== -1) _temp.push(v1);
  });
  return _temp;
}

/**
 * 权限许可验证
 * @param permits 所有的权限许可
 * @param require 需要的权限许可
 * @param every 是否检查所有的许可
 */
export const includePermit = (
  permits: string[],
  require: string[] | null,
  every: boolean | undefined,
): boolean => {
  if (!require || require.length < 1) return true;
  const _intersection = intersectionArr(require, permits);
  // every存在时，交集必须包含require所有数组
  return every ? _intersection.length === require.length : _intersection.length > 0;
};

/**
 * 校验是否登录
 * @param permits
 */
export const checkLogin = (permits: any): boolean =>
  (process.env.NODE_ENV === 'production' && !!permits) || process.env.NODE_ENV === 'development';
