import React, { useEffect } from 'react';
import { Button } from 'antd';
import {
  TaoismProvider,
  useTaoismCreator,
  useTaoismState,
  useTaoismStateLight,
  useTaoism,
} from '@/components/componentsTools/redux-y5';

const Taoism = () => {
  const setTaoismState: any = useTaoismCreator();
  let {
    count: { data: countState = 0 },
  } = useTaoismState(['count']);
  useEffect(() => {
    setTaoismState({ stateName: 'count', data: ++countState });
  }, [setTaoismState]);
  return (
    <div>
      <Button onClick={() => setTaoismState({ stateName: 'count', data: ++countState })}>+1</Button>
      <Button onClick={() => setTaoismState({ stateName: 'count', data: --countState })}>-1</Button>
      <div>Taoism-count：{countState}</div>
    </div>
  );
};

const testTaoism = () => {
  return (
    <TaoismProvider>
      <Taoism />
    </TaoismProvider>
  );
};

const Light = () => {
  let { Taoism }: any = useTaoismStateLight([{ Taoism: 0 }]);
  const setTaoismState: any = useTaoismCreator();
  return (
    <>
      <Button onClick={() => setTaoismState({ stateName: 'Taoism', data: ++Taoism })}>+1</Button>
      <Button onClick={() => setTaoismState({ stateName: 'Taoism', data: --Taoism })}>-1</Button>
      <div>Taoism-count：{Taoism}</div>
    </>
  );
};
const testTaoismLight = () => {
  return (
    <TaoismProvider>
      <Light />
    </TaoismProvider>
  );
};

const UseTaoism1 = () => {
  let [test, name, setTaoism] = useTaoism({ test: 0 }, 'name', { light: true });

  return (
    <>
      <Button onClick={() => setTaoism({ stateName: 'test', data: ++test })}>+1</Button>
      <Button onClick={() => setTaoism({ stateName: 'test', data: --test })}>-1</Button>
      <div>test：{test}</div>
      <div>
        <div> name {name}</div>

        <Button onClick={() => setTaoism('name', 'yang5')}>获取名字</Button>
      </div>
    </>
  );
};

const Another = () => {
  let [userName] = useTaoism('userName', { light: true });
  return <div>{userName ? `登录全局用户名：${userName}` : null}</div>;
};

const TestUseTaoism = () => {
  return (
    <TaoismProvider>
      <UseTaoism1 />
      <Another />
    </TaoismProvider>
  );
};

export default TestUseTaoism;
