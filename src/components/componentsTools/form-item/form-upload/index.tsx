/*
 * File: index.tsx
 * Description: 描述
 * File Created: 2020-09-30 10:48:14
 * Author: yangwenwu
 * ------
 * Last Modified: 2020-12-16 16:20:40
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2020 - Present, Your Company
 */
import React, { useEffect, useState } from 'react';
import { Form, Upload, Modal, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { UploadProps, UploadListType, UploadFile } from 'antd/lib/upload/interface';
import { PrototypeCheck } from '../../utils';
import { FormBaseProps } from '../interface';
interface IFormUploadProps extends FormBaseProps {
  action: any;
  listType: UploadListType;
  fileType: any;
  headers: any;
  /** 预览回调函数 */
  handlePreview?: Function;
  /** 标准化选择的value使之满足setFieldsValue */
  normalizeValue?: any;
  /**上传数量 */
  controlNum: any;
  /** 是否显示上传进度 */
  showProgress?: boolean;
  /** 获取图片路径并回显 */
  getImageUrl: Function;
  /** a标签显示文本 */
  textForAnchor: any;
  /** 处理上传后回调返回当前上传的数据 */
  handleChangeCallBack?: (fileList: any, form: any) => any;
  /** 上传按钮显示文本 */
  textForDisplay?: string;
  /** 个性化显示 */
  customUploadList?: (fieldValue: any) => any;
}

const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

const FormUpload: React.FC<IFormUploadProps> = ({
  name,
  label,
  labelCol,
  wrapperCol,
  initialValue,
  className,
  form,
  render,
  readOnly,
  required,
  validator,
  action,
  listType,
  headers,
  fileType,
  handleChangeCallBack,
  controlNum,
  textForDisplay,
  customUploadList,
  ...restProps
}) => {
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [change, setChange] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>();
  const handleCancel = () => {
    setPreviewVisible(false);
  };
  useEffect(() => {
    setChange(!change);
  }, [form]);
  //查看原图
  const handlePreview = async (file: any) => {
    if (restProps.handlePreview) {
      return restProps.handlePreview(file);
    }
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };
  /**
   * 上传
   * @param info
   * @param type
   * @param cb
   * @param option
   */
  const handleChange = (info: any, type: string, cb?: Function, option?: object) => {
    let { fileList, event } = info;
    const { setFieldsValue, getFieldValue } = form;
    const { normalizeValue, showProgress } = restProps;
    if (event && showProgress) {
      setProgressPercent(Number(event.percent.toFixed(0)));
    }
    if (type === 'file') {
      fileList = handleFileChange(fileList, controlNum);
    }
    if (controlNum) {
      fileList = handleFileChange(fileList, controlNum);
    }
    const value = normalizeValue ? normalizeValue(fileList, option, getFieldValue(name)) : fileList;
    setFieldsValue({
      [name]: value,
    });
    setChange(!change);
    cb && cb(value, form);
  };
  const handleFileChange = (fileList: any, controlNum?: number) => {
    const cNums = controlNum ? controlNum : 0;
    let negNum: number = 0 - cNums;
    fileList = fileList.slice(negNum);
    fileList = fileList.map((file: any) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    return fileList;
  };
  const getTypedList = (fileList: Array<any>) => {
    let typedList: Array<any> | undefined;
    typedList = PrototypeCheck.isArray(fileList)
      ? fileList?.map((item: any) => {
          let typedListItem = {} as UploadFile;
          typedListItem = { ...item };
          typedListItem.url = restProps.getImageUrl(item);
          typedListItem.name =
            typedListItem.name || restProps.textForAnchor || typedListItem.url || '';
          return typedListItem;
        })
      : undefined;
    return typedList;
  };
  const renderUploadComponentByFiletype = (type: string, fileList: any, controlNum?: number) => {
    const cNums = controlNum ? controlNum : fileList && fileList.length + 1;

    const text = textForDisplay ? textForDisplay : '上传';

    const uploadButtonForImage = (
      <div>
        {/* <Icon type="plus" /> */}
        <div className="ant-upload-text">{text}</div>
      </div>
    );

    const uploadButtonForButton = (
      <div>
        {/* {text} */}
        <PlusOutlined />
      </div>
    );

    if (type === 'image') {
      if (fileList) {
        return fileList.length >= cNums ? null : uploadButtonForImage;
      }
      return uploadButtonForImage;
    } else if (type === 'file') {
      if (fileList) {
        return fileList.length >= cNums ? null : uploadButtonForButton;
      }
      return uploadButtonForButton;
    } else {
      return uploadButtonForButton;
    }
  };
  const onRemove = () => {
    setProgressPercent(0);
  };
  const { getFieldValue } = form;
  return (
    <Form.Item
      {...{
        name,
        label,
        labelCol,
        wrapperCol,
        initialValue,
        className,
      }}
      rules={[
        { required, message: `请选择${label}` },
        {
          validator: (rule: any, value: any, callback: Function) =>
            validator ? validator(rule, value, callback) : callback(),
        },
      ]}
    >
      {readOnly ? (
        render ? (
          render(getFieldValue(name))
        ) : (
          <span>{getFieldValue(name)}</span>
        )
      ) : (
        <Upload
          action={action}
          listType={listType}
          fileList={getFieldValue(name) ? getTypedList(getFieldValue(name)) : []}
          onPreview={handlePreview}
          onChange={fileList => {
            handleChange(fileList, fileType, handleChangeCallBack);
          }}
          headers={PrototypeCheck.isFunction(headers) ? (headers as any)() : headers}
          onRemove={onRemove}
          {...(restProps as UploadProps)}
        >
          {renderUploadComponentByFiletype(
            fileType,
            getFieldValue(name) ? getTypedList(getFieldValue(name)) : undefined,
            controlNum,
          )}
        </Upload>
      )}
      {!!progressPercent && (
        <span className="rac_form_upload_progress">已上传{progressPercent}%</span>
      )}
      {!!customUploadList && customUploadList(getFieldValue(name))}
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img style={{ width: '100%' }} src={previewImage} alt="图片" />
      </Modal>
    </Form.Item>
  );
};

export default FormUpload;
