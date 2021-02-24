/*
 * File: video
 * Description: 音乐播放器
 * File Created: 2021-02-24 14:56:29
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-02-24 15:39:53
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2021 - Present, Your Company
 */
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import './index.less';
const _src = require('../assets/qfl.mp3');
interface NMGProps {
  src?: any;
  id?: any;
  musicInfo?: any;
}

const NMG: React.FC<NMGProps> = props => {
  const videoRef = useRef<any>(null);
  const [ispause, setPause] = useState<any>(false);
  const [isloop, setLoop] = useState<any>(false);
  const { src = _src, id } = props;
  const onCanPlay = () => {};
  const onTimeUpdate = () => {};

  return (
    <div className={'audio_root'}>
      <div className={'audio_panel'}>
        <div
          className={'audio_panel_tool'}
          onClick={() => {
            setLoop(true);
          }}
        >
          循环
        </div>
        <div className={'audio_panel_tool'}>上一首</div>
        {!ispause ? (
          <div
            className={'audio_panel_tool'}
            onClick={() => {
              videoRef.current.play();
              setPause(true);
            }}
          >
            播放
          </div>
        ) : (
          <div
            className={'audio_panel_tool'}
            onClick={() => {
              videoRef.current.pause();
              setPause(false);
            }}
          >
            暂停
          </div>
        )}
        <div className={'audio_panel_tool'}>上一首</div>
        <div className={'audio_panel_tool'}>
          ---------------------------------------------------------------
        </div>
        <div className={'audio_panel_tool'}>下载</div>
      </div>
      <audio
        id={`audio${id}`}
        ref={videoRef}
        preload={'auto'}
        loop
        onCanPlay={onCanPlay}
        onTimeUpdate={onTimeUpdate}
      >
        <source src={src} type="audio/mpeg"></source>
      </audio>
    </div>
  );
};

export default NMG;
