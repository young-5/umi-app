/*
 * File: index.tsx
 * Description: 表单复选框组件
 * File Created: 2020-09-28 09:36:53
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-02-04 10:08:06
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import { FormProps } from 'antd/lib/form';
import { FormInstance } from 'antd/lib/form/Form';
import classNames from 'classnames';
import ModalContainer from '../ModalContainer';
import _ from 'lodash';
import React, { ReactNode, useEffect, useImperativeHandle, useState, useRef } from 'react';
import CheckFormItem from './CheckFormItem';
import isEqual from 'react-fast-compare';
import { usePrevious } from 'react-use';
import {
  FormCheckbox,
  FormCustom,
  FormDate,
  FormGroup,
  FormInput,
  FormInputMultiple,
  FormInputsearch,
  FormPicker,
  FormRadio,
  FormSelect,
  FormUpload,
} from '../form-item';
import './index.less';
//基础表单组件
const FormComps: { [key: string]: any } = {
  input: FormInput,
  checkbox: FormCheckbox,
  select: FormSelect,
  radio: FormRadio,
  date: FormDate,
  inputsearch: FormInputsearch,
  picker: FormPicker,
  group: FormGroup,
  inputMultiple: FormInputMultiple,
  upload: FormUpload,
  custom: FormCustom,
};

interface IField {
  name: string;
  label?: string;
  /** 表单组件类型 */
  fieldType: string;
  width?: string | number;
  style?: React.CSSProperties;
  [key: string]: any;
}

interface FormContainerProps extends FormProps<any> {
  fields: IField[];
  form: FormInstance;
  data?: any;
  onValuesChange?: (changedValues: any, allValues: any) => void;
  maxItem?: number;
  onOk?: Function;
  onRest?: Function;
  renderFooter?: Function;
  renderBtns?: Function;
  isBtn?: boolean;
  renderFormItem?: any;
  isleft?: boolean;
  isArea?: boolean;
  areaFiles?: any[];
  isCheck?: boolean;
}

/** 表单容器组件 */
const FormContainer = (props: FormContainerProps, ref: any) => {
  const {
    data,
    labelCol,
    wrapperCol,
    form,
    maxItem,
    isBtn = true,
    onOk,
    onRest,
    renderFooter,
    renderFormItem,
    renderBtns,
    isleft = false,
    isArea = false,
    fields,
    areaFiles = [],
    isCheck = true,
    ...rest
  } = props;
  const { setFieldsValue } = form;
  const modelRef = useRef<any>();
  const ChecRef = useRef<any>();
  const [isMore, setIsmore] = useState<boolean>(false);
  const prevData = usePrevious(data);
  const [_fields, setfields] = useState<any[]>();
  const renderForm = (Component: any, field: IField) => {
    const _labelCol: any = { xs: { span: 2 }, sm: { span: 2 } };
    const _wrapperCol: any = { xs: { span: 20 }, sm: { span: 20 } };
    const _props: any = {
      form: props.form,
      labelCol: labelCol || _labelCol,
      wrapperCol: wrapperCol || _wrapperCol,
      ..._.omit(field, 'fieldType'),
    };
    if (field.fieldType === 'render') {
      return field.render(_props);
    } else {
      return <Component {..._props} />;
    }
  };
  useEffect(() => {
    setfields(props?.fields);
  }, [props?.fields]);
  useEffect(() => {
    if (!isEqual(data, prevData)) setFieldsValue(data);
  }, [data, prevData, setFieldsValue]);

  useImperativeHandle(ref, () => ({
    form: props.form,
    ChecRef: ChecRef,
  }));
  const _onRest = () => {
    onRest && onRest();
    form.resetFields();
  };
  const _onOk = () => {
    onOk && onOk();
  };
  const _renderBtn = () => {
    return (
      <>
        <Button className={'btn_tools_search search_btn'} onClick={_onOk}>
          查询
        </Button>
        <Button className={'btn_tools_rest reset_btn'} onClick={_onRest}>
          重置
        </Button>
        {isCheck && (
          <Button
            className={'btn_tools_rest reset_btn'}
            onClick={() => {
              modelRef.current.open();
            }}
          >
            资源选择
          </Button>
        )}
      </>
    );
  };
  const _renderBtns = () =>
    isBtn ? <div className={'btn_tools'}>{_renderBtn()}</div> : renderBtns ? renderBtns() : null;
  const renderMoreType = (value: string, status: boolean): ReactNode => {
    return (
      <div className={'btn'}>
        {_renderBtns()}
        {maxItem && (
          <p
            className={'btn_more'}
            onClick={() => {
              setIsmore(status);
            }}
          >
            {value}
            {status ? <DownOutlined /> : <UpOutlined />}
          </p>
        )}
      </div>
    );
  };
  const renderMore = (i: number) => {
    const len = _fields?.length || 0;
    if (!maxItem || (maxItem && len <= maxItem)) {
      if (i === len - 1) {
        return <div className={'btn'}>{_renderBtns()}</div>;
      } else {
        return null;
      }
    } else {
      if (isMore) {
        if (i === len - 1) {
          return renderMoreType('收起', false);
        } else {
          return null;
        }
      } else {
        if (maxItem && maxItem - 1 > i) {
          return null;
        } else {
          return renderMoreType('更多搜索', true);
        }
      }
    }
  };
  //额外的字段
  const renderArea = (field?: any) => {
    return areaFiles?.map((v, i) => {
      return (
        <div style={{ display: 'none' }}>
          <Form.Item name={v.name}>
            <div />
          </Form.Item>
        </div>
      );
    });
  };
  return (
    <>
      <Form {...rest} form={form} className={classNames('rac_fc', rest.className)}>
        {isArea && renderArea()}
        {renderFormItem && renderFormItem(form)}
        {_fields?.map((field, index) =>
          // 默认宽度比例为50%
          isMore || !maxItem || (maxItem && index < maxItem) ? (
            <div
              key={field.field || index}
              className={classNames('form__item', field.className)}
              style={{ flexBasis: field.width || '50%', ...field.style }}
            >
              {renderForm(FormComps[field.fieldType], field)}
              {renderMore(index)}
            </div>
          ) : null,
        )}
        {isleft && <div className={'btn_tools2'}>{_renderBtn()}</div>}
        {renderFooter && renderFooter()}
      </Form>
      <ModalContainer
        title={'资源选择'}
        okText={'确认'}
        ref={modelRef}
        onOk={() => {
          let a = ChecRef.current.checkedList;
          let __fields = props?.fields?.filter(v => {
            return a.includes(v.label);
          });
          setfields(__fields || []);
        }}
      >
        <div>
          <CheckFormItem ref={ChecRef} files={props?.fields} check={_fields} />
        </div>
      </ModalContainer>
    </>
  );
};

export default React.memo(React.forwardRef(FormContainer));
