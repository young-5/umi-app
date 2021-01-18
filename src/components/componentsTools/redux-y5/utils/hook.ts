import { useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { setTaoismState } from '../action';
import { transformState, transformStateLight } from '.';

/**
 *TaoismCreator - setTaoism state
 */
export function useTaoismCreator() {
  const dispatch = useDispatch();
  return useCallback(
    (data, state) => {
      return bindActionCreators(setTaoismState.bind(null, data, state), dispatch)();
    },
    [dispatch],
  );
}

/**
 * getTaoism state from redux
 * @param {*}TaoismStateKeys keys - extractTaoism single data
 * @example
 * eg: const {Taoism } = useTaoismState([{Taoism: '测试' }]);
 *Taoism = { isFetching: false, data: '测试', timeStamp: xxx }
 */
export function useTaoismState(TaoismStateKeys: any[]) {
  return useSelector(({ UseTaoism }: any) => {
    return transformState(UseTaoism, TaoismStateKeys);
  }, shallowEqual);
}

/**
 * 获取简洁的Taoism对象
 * @param {*}TaoismStateKeys
 * @example
 * eg: const {Taoism } = useTaoismStateLight([{Taoism: '测试' }]);
 *Taoism = '测试'
 */
export function useTaoismStateLight(TaoismStateKeys: any) {
  return useSelector(({ UseTaoism }: any) => {
    return transformStateLight(UseTaoism, TaoismStateKeys);
  }, shallowEqual);
}

/**
 * 校验options
 * @param {*} options
 */
function validateOptions(options: any) {
  const keys = ['light'];
  return keys.some(key => options.hasOwnProperty(key));
}

/**
 *
 * @param  {...any} args
 * @example
 * args 可以传两个参数
 * 1
 */
export function useTaoism(...args: any) {
  let options = args.slice(args.length - 1)[0];
  options = validateOptions(options) ? options : null;
  const stateKeys = options ? args.slice(0, args.length - 1) : args;
  const setTaoism = useTaoismCreator();
  const TaoismState =
    options && options.light ? useTaoismStateLight(stateKeys) : useTaoismState(stateKeys);
  return [...Object.keys(TaoismState).map(key => TaoismState[key]), setTaoism];
}
