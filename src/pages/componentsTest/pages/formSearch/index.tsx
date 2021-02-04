/*
 * File: index.tsx
 * Description: 描述
 * File Created: 2021-02-03 17:42:50
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-02-03 17:45:09
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2021 - Present, Your Company
 */
import React from 'react';
import FormSearch from './FormSearch';
interface NMGProps {}

const NMG: React.FC<NMGProps> = props => {
  return (
    <div>
      <FormSearch />
    </div>
  );
};

export default NMG;
