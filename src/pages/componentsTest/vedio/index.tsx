/*
 * File: index.tsx
 * Description: 描述
 * File Created: 2021-02-24 14:53:11
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-02-24 15:09:15
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2021 - Present, Your Company
 */

import React from 'react';
import { Title } from 'oi-ui';
import Video from './widget/video';
interface NMGProps {}

const NMG: React.FC<NMGProps> = props => {
  return (
    <div>
      <Title isline title={'音乐播放器'}>
        <Video />
      </Title>
    </div>
  );
};

export default NMG;
