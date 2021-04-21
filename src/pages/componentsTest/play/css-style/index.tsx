/*
 * File: index.tsx
 * Description: 描述
 * File Created: 2021-03-25 09:43:51
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-03-25 14:03:19
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2021 - Present, Your Company
 */
import React from 'react';
import './index.less';
import style from './style.less';
interface NMGProps {}

const NMG: React.FC<NMGProps> = props => {
  return (
    <div>
      <div className={'sanjiao'} />

      <div className={'gradient'} id="jbs">
        渐变色
      </div>

      <div className={'dingwei'}>
        <div className={'dingwei1'}>相对定位</div>
        <div className={'dingwei2'}>相对定位</div>
        <div className={'dingwei3'}>相对定位</div>
      </div>

      <div className={style.donghua}>动画</div>

      <div>
        &nbsp; h5
        <br />
        h5
        <br />
        &lt;h5&gt;
      </div>
      <a href="#jbs">到渐变色</a>
      <br />
      <a href="javascript:;">什么都不做</a>
      <br />
      <a href="#">回到顶部</a>
      <br />
      <a href="">回到顶部</a>
    </div>
  );
};

export default NMG;
