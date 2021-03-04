/*
 * File: TelLogin.tsx
 * Description: 描述
 * File Created: 2021-03-04 09:39:21
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-03-04 11:27:54
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2021 - Present, Your Company
 */
import React, { useState, useRef } from 'react';
import { FormContainer } from '@/components/componentsTools';
import { Button, Input, Form, message, Row, Col } from 'antd';
import { BtnMaterial } from 'oi-ui';
import styles from './index.less';
interface NMGProps {
  form: any;
  login?: any;
  getFakeCaptcha?: any;
}

const NMG: React.FC<NMGProps> = props => {
  const { form, login, getFakeCaptcha } = props;
  const [times, setTimes] = useState<any>(false);
  const [codeStatus, setCodeStatus] = useState<any>(false);
  let loacltime = 0;
  /**
   * @function 获取验证码
   */
  const getTelCode = () => {
    let values: any = form?.getFieldsValue();
    const { tel } = values;
    if (tel) {
      getFakeCaptcha({
        tel: tel,
      }).then((res: any) => {
        res?.msg && message.success(res.msg);
        setCodeStatus(true);
        loacltime = 60;
        setTimes(60);
        let setTime = setInterval(function() {
          if (loacltime <= 0) {
            setCodeStatus(false);
            clearInterval(setTime);
          } else {
            let _time = loacltime - 1;
            loacltime = _time;
            setTimes(_time);
          }
        }, 1000);
      });
    } else {
      message.error('请输入手机号');
    }
  };
  return (
    <div className={styles.getcode}>
      <FormContainer
        className={styles.form}
        form={form}
        isBtn={false}
        labelCol={{ span: 6 }}
        fields={[
          {
            fieldType: 'input',
            width: '100%',
            name: 'tel',
            label: '手机号',
            required: true,
          },
          {
            fieldType: 'render',
            name: 'code',
            width: '100%',
            render: () => {
              return (
                <Form.Item
                  label="验证码"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码',
                    },
                  ]}
                >
                  <Row
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Col span={14}>
                      <Form.Item
                        name="code"
                        noStyle
                        rules={[
                          {
                            required: true,
                            message: '请输入验证码',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Button
                        disabled={codeStatus}
                        onClick={() => {
                          getTelCode();
                        }}
                        style={{
                          padding: codeStatus ? '0 1px' : '0 10px',
                        }}
                      >
                        {codeStatus ? `重新获取${times}秒` : '获取验证码'}
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              );
            },
          },
        ]}
      />
      <div className={styles.btn}>
        <BtnMaterial
          okText="登录"
          onSubmit={() => {
            login();
          }}
          onRest={() => {
            form.resetFields();
          }}
        />
      </div>
    </div>
  );
};

export default NMG;
