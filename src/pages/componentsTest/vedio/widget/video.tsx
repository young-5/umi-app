/*
 * File: video
 * Description: 音乐播放器
 * File Created: 2021-02-24 14:56:29
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-02-25 14:10:08
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2021 - Present, Your Company
 */
import React, { useEffect, useRef, useState } from 'react';
import './index.less';
const _src = require('../assets/qfl.mp3');
const _src2 = require('../assets/22.mp3');
interface NMGProps {
  src?: any;
  id?: any;
  musicInfo?: any;
}

const NMG: React.FC<NMGProps> = props => {
  const audioRef = useRef<any>(null);
  const [ispause, setPause] = useState<any>(false); //是否暂停
  const [isloop, setLoop] = useState<any>(false); //是否循环
  const [isMuted, setMuted] = useState<any>(false); //是否静音
  const [volume, setVolume] = useState<any>(100); //音量
  const [playRate, setPlayRate] = useState<any>(1.0); //倍数
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0); //当前播放的歌曲索引，默认加载第一首歌
  const [time, setTime] = useState<any>(0); //总时长
  const [currentTime, setCurrentTime] = useState<any>(0); //当前时间
  const rateList = [1.0, 1.25, 1.5, 2.0];
  const currentTrack = [_src, _src2];
  const { src = _src, id } = props;
  // 该视频已准备好开始播放
  const onCanPlay = () => {
    setTime(audioRef.current.duration);
  };
  //播放时间变化
  const onTimeUpdate = (e: any) => {
    setCurrentTime(audioRef.current.currentTime);
    if (audioRef.current.currentTime === audioRef.current.duration) {
      setPause(true);
    }
  };
  //当前时间变化
  const changeTime = (e: any) => {
    const { value } = e.target;
    setCurrentTime(value);
    audioRef.current.currentTime = value;
    if (value === audioRef.current.duration) {
      // nextSong();
      setPause(true);
    }
  };
  //下一首
  const nextSong = () => {
    if (currentTrackIndex + 1 >= currentTrack?.length) {
      alert('已经没有下一首了');
    } else {
      let index = currentTrackIndex + 1;
      setCurrentTrackIndex(index);
    }
  };
  //上一首
  const lastSong = () => {
    if (currentTrackIndex - 1 < 0) {
      alert('已经没有上一首了');
    } else {
      let index = currentTrackIndex - 1;
      setCurrentTrackIndex(index);
    }
  };
  useEffect(() => {
    if (ispause) {
      audioRef.current.play();
    }
  }, [currentTrackIndex]);
  //自动播放
  //静音
  const onMuteAudio = () => {
    audioRef.current.muted = !audioRef.current.muted;
    setVolume(!audioRef.current.muted);
  };
  //音量调节
  const changeVolume = (e: any) => {
    const { value } = e.target;
    audioRef.current.volume = value / 100;
    setVolume(value);
    setMuted(!value);
  };
  // 倍速播放
  const changePlayRate = (num: number) => {
    audioRef.current.playbackRate = num;
    setPlayRate(num);
  };
  //时间转换
  const formatSecond = (time: any) => {
    const second = Math.floor(time % 60);
    let minite = Math.floor(time / 60);
    return `${minite}:${second >= 10 ? second : `0${second}`}`;
  };
  return (
    <div className={'audio_root'}>
      <div className={'audio_panel'}>
        <div
          className={'audio_panel_tool'}
          onClick={() => {
            setLoop(!isloop);
          }}
        >
          {isloop ? '不循环' : '循环'}
        </div>
        <div className={'audio_panel_tool'} onClick={() => lastSong()}>
          上一首
        </div>
        {!ispause ? (
          <div
            className={'audio_panel_tool'}
            onClick={() => {
              audioRef.current.play();
              setPause(true);
            }}
          >
            播放
          </div>
        ) : (
          <div
            className={'audio_panel_tool'}
            onClick={() => {
              audioRef.current.pause();
              setPause(false);
            }}
          >
            暂停
          </div>
        )}
        <div className={'audio_panel_tool'} onClick={() => nextSong()}>
          下一首
        </div>
        <div className={'audio_panel_tool'}>
          <input type="range" step="0.01" max={time} value={currentTime} onChange={changeTime} />
        </div>
        <div>{formatSecond(currentTime) + '/' + formatSecond(time)}</div>
        <div className={'audio_panel_tool'}>下载</div>
        <div className={'audio_panel_tool'} onClick={onMuteAudio}>
          {volume ? '静音' : '发声'}
        </div>
        <div>
          <span>音量调节：</span>
          <input type="range" onChange={changeVolume} value={isMuted ? 0 : volume} />
        </div>
        <div>
          <span>倍速播放：</span>
          {rateList &&
            rateList.length > 0 &&
            rateList.map(item => (
              <button
                key={item}
                style={
                  playRate === item
                    ? {
                        border: '1px solid #188eff',
                        color: '#188eff',
                      }
                    : {}
                }
                onClick={() => changePlayRate(item)}
              >
                {item}
              </button>
            ))}
        </div>
      </div>
      <audio
        id={`audio${id}`}
        ref={audioRef}
        preload={'auto'}
        controls //默认面板
        loop={isloop} //循环播放
        onCanPlay={onCanPlay}
        src={currentTrack[currentTrackIndex]}
        onTimeUpdate={onTimeUpdate}
      >
        {/* <source src={src} type="audio/mpeg"></source>
        <source src={_src2} type="audio/mpeg"></source> */}
      </audio>
    </div>
  );
};

export default NMG;
