import React, { useState } from 'react';
import { Tabs, Form } from 'antd';
import router from 'umi/router';
import { FormContainer } from '@/components/componentsTools';
import { BtnMaterial } from 'oi-ui';
import { useTaoism } from '@/components/componentsTools/redux-y5';
// import styles from './index.less';

const Login: React.FC<{}> = () => {
  const [accountForm] = Form.useForm();
  const [type, setType] = useState<string>('account');
  let [userName, permits, setTaoism] = useTaoism('userName', 'permits', { light: true });

  const _login = () => {
    //获取用户信息
    setTaoism('userName', 'yang5登录成功');
    //获取权限
    setTaoism('permits', ['1', '2']);
    alert('登录成功 拥有1 2 的权限');
    router.push('/');
    permits;
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.main}>
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账户密码登录'} />
            <Tabs.TabPane key="mobile" tab={'手机号登录'} />
          </Tabs>

          {type === 'mobile' && <>开发中</>}

          {type === 'account' && (
            <>
              <FormContainer
                className={styles.form}
                form={accountForm}
                isBtn={false}
                labelCol={{ span: 4 }}
                fields={[
                  {
                    fieldType: 'input',
                    width: '100%',
                    name: 'name',
                    label: '账号',
                    required: true,
                  },
                  {
                    fieldType: 'input',
                    width: '100%',
                    name: 'password',
                    label: '密码',
                    required: true,
                  },
                ]}
              />
              <div className={styles.btn}>
                <BtnMaterial
                  okText="登录"
                  onSubmit={() => {
                    _login();
                  }}
                  onRest={() => {
                    accountForm.resetFields();
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
