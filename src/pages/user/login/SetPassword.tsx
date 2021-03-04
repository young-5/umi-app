/*
 * File: GetPassword.tsx
 * Description: 忘记密码
 * File Created: 2021-01-15 08:47:09
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-03-04 10:38:45
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2021 - Present, Your Company
 */
import React, { useState, useImperativeHandle } from 'react';
import { Row, Col, Form, Input, Button, message } from 'antd';
import router from 'umi/router';
import _ from 'lodash';
import style from './index.less';
interface NMGProps {
  getPassword?: any;
  getFakeCaptcha?: any;
  callback?: any;
}

const NMG = (props: NMGProps, ref: any) => {
  const { getPassword, getFakeCaptcha } = props;
  const [codeStatus, setCodeStatus] = useState<any>(false);
  const [times, setTimes] = useState<any>(false);
  let loacltime = 0;
  const [form] = Form.useForm();
  useImperativeHandle(ref, () => {
    return {
      form: form,
    };
  });
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

  /**
   * @function 修改密码提交
   */
  const _getPassword = () => {
    form
      .validateFields()
      .then((value: any) => {
        getPassword({
          ..._.omit(value, ['newPassword2']),
        }).then((res: any) => {
          if (res?.msg) {
            message.success(res.msg);
          }
        });
      })
      .catch(err => {});
  };

  return (
    <div className={style.getPssword_root}>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        className={style.getPssword_foom}
        autoComplete="off"
      >
        <Form.Item
          name="newPassword"
          label="新密码"
          rules={[{ required: true, message: '请输入新密码' }]}
        >
          <Input.Password autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="再次输入新密码"
          name="newPassword2"
          rules={[
            { required: true, message: '请再次输入新密码!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('密码不一致!');
              },
            }),
          ]}
        >
          <Input.Password autoComplete="off" />
        </Form.Item>
        <Form.Item name="tel" label="手机号" rules={[{ required: true, message: '请输入手机号' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="验证码" required>
          <Row>
            <Col span={18}>
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
                <Input placeholder={'请输入验证码'} />
              </Form.Item>
            </Col>
            <Col span={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                disabled={codeStatus}
                onClick={() => {
                  getTelCode();
                }}
              >
                {codeStatus ? `获取验证码${times}秒` : '获取验证码'}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <div className={style.getPssword_btns}>
        <Row>
          <Col span={6}></Col>
          <Col span={18}>
            <Button
              type={'primary'}
              onClick={_getPassword}
              style={{
                marginRight: '20px',
              }}
            >
              提交
            </Button>
            <Button
              onClick={() => {
                history.push('/');
              }}
            >
              返回
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default React.forwardRef(NMG);
