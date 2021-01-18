import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducer';

// redux 注入操作
const middleware = [thunk];
const store = createStore(reducer, applyMiddleware(...middleware));

export default (props: any) => {
  const { children } = props;
  return <Provider store={store}>{children}</Provider>;
};
