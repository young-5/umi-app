import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTaoismState } from '../action';
import { initialState } from '../reducer';

/**
 * transform state common
 * @param {*}TaoismState
 * @param {*}TaoismStateKeys
 */
export function transformState(TaoismState: any, TaoismStateKeys: any) {
  // 默认返回整个数据对象
  if (!TaoismStateKeys) return { TaoismState };
  const _transferObj: any = {};
  TaoismStateKeys?.forEach((key: any) => {
    if (Object.prototype.toString.call(key) === '[object String]') {
      //TaoismState[key] && (_transferObj[key] =TaoismState[key]);
      _transferObj[key] = (TaoismState && TaoismState[key]) || { isFetching: false, data: void 0 };
    }
    if (Object.prototype.toString.call(key) === '[object Object]') {
      const _realKey = Object.keys(key)[0];
      const _initialVal = key[_realKey];
      _transferObj[_realKey] = !TaoismState[_realKey]
        ? initialState({ isFetching: false, data: _initialVal })
        : TaoismState[_realKey];
    }
  });
  return { ..._transferObj };
}

/**
 * 返回简洁的对象
 * @param {*}TaoismState
 * @param {*}TaoismStateKeys
 */
export function transformStateLight(TaoismState = {}, TaoismStateKeys: any) {
  const state = transformState(TaoismState, TaoismStateKeys);
  return Object.keys(state).reduce((prev, curr) => {
    prev = { ...prev, [curr]: state[curr].data };
    return prev;
  }, {});
}

const mapStateToProps = ({ TaoismState }: any, TaoismStateKeys: any) =>
  transformState(TaoismState, TaoismStateKeys);
const mapDispatchToProps = (dispatch: any) => ({
  setTaoismState: bindActionCreators(setTaoismState, dispatch),
});

export default (TaoismStateKeys: any) =>
  connect(state => mapStateToProps(state, TaoismStateKeys), mapDispatchToProps);
