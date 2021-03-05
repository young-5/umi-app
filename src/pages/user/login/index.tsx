import React, { useState, useRef } from 'react';
import { Tabs, Form, message } from 'antd';
import router from 'umi/router';
import { FormContainer, ImgCode } from '@/components/componentsTools';
import { ModalContainer, BtnMaterial } from 'oi-ui';
import { useTaoism } from '@/components/componentsTools/redux-y5';
import { BgImg } from 'oi-ui';
import TelLogin from './TelLogin';
import { getLogin, getFakeCaptcha, captchaLogin } from '../service';
import styles from './index.less';
let src1 = require('./assets/11.jpg');
let src2 = require('./assets/12.jpg');
const Login: React.FC<{}> = () => {
  const [accountForm] = Form.useForm();
  const [type, setType] = useState<string>('account');
  let [userName, permits, setTaoism] = useTaoism('userName', 'permits', { light: true });
  const ImgCodeRef = useRef<any>(null);
  const ImgCodeModalRef = useRef<any>(null);
  const _login = () => {
    ImgCodeModalRef.current.open();
  };
  //图片code验证
  const onImgCode = (value: any) => {
    (type === 'account' ? getLogin : captchaLogin)({
      ...value,
      sysIds: '1,3,4,6,10,15,16',
    }).then(res => {
      if (res.code === 200) {
        message.success(res?.msg);
        message.success(value.name + ':登录成功 拥有 1 2 3 4 5 6 7 的权限');

        //缓存用户信息
        setTaoism('userName', value.name);
        //缓存权限
        setTaoism('permits', ['1', '2', '3', '4', '5', '6']);
        router.push('/');
        permits;
      } else {
        message.error(res?.msg);
        ImgCodeModalRef.current.close();
      }
    });
  };

  const postLogin = () => {
    accountForm
      .validateFields()
      .then((value: any) => {
        onImgCode(value);
      })
      .catch();
  };
  return (
    <BgImg
      imgList={[
        {
          id: '1',
          src: src1,
        },
        {
          id: '2',
          src: src2,
        },
      ]}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.main}>
            <div className={styles.bg}></div>
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane key="account" tab={'账户密码登录'} />
              <Tabs.TabPane key="mobile" tab={'手机号登录'} />
            </Tabs>

            {type === 'mobile' && (
              <>
                <TelLogin form={accountForm} getFakeCaptcha={getFakeCaptcha} login={_login} />
              </>
            )}

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
          <ModalContainer ref={ImgCodeModalRef} footer={null} width={400}>
            <ImgCode onSuccess={_.debounce(postLogin, 100)} ref={ImgCodeRef} />
          </ModalContainer>
        </div>
      </div>
    </BgImg>
  );
};

export default Login;
