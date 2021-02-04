/*
 * File: CheckFormItem.tsx
 * Description: 描述
 * File Created: 2021-02-03 18:02:23
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-02-04 09:55:58
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2021 - Present, Your Company
 */
import React, { useEffect, useImperativeHandle } from 'react';
import { Checkbox, Divider } from 'antd';
interface NMGProps {
  files?: any;
  check?: any;
}
const CheckboxGroup = Checkbox.Group;
const NMG = (props: NMGProps, ref: any) => {
  const { files, check } = props;
  const [checkedList, setCheckedList] = React.useState<any[]>([]);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [plainOptions, setplainOptions] = React.useState<any[]>([]);
  const [checkAll, setCheckAll] = React.useState(false);
  useImperativeHandle(ref, () => {
    return {
      checkedList,
    };
  });
  useEffect(() => {
    let _plainOptions = files.map((v: any) => v.label);
    let _checkedList = check.map((v: any) => v.label);
    setplainOptions(_plainOptions);
    setCheckedList(_checkedList);
  }, [files]);
  const onChange = (list: any[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: any) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <>
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        全选
      </Checkbox>
      <Divider />
      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
    </>
  );
};

export default React.forwardRef(NMG);
