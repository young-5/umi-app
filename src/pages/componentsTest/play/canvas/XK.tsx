/*
 * File: index.tsx
 * Description: 描述
 * File Created: 2021-02-24 14:51:40
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-03-25 10:03:09
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2021 - Present, Your Company
 */
import React, { useEffect } from 'react';
interface NMGProps {}

const NMG: React.FC<NMGProps> = props => {
  /**
   * canvas 创建星空
   */

  // 定义变量
  let canvas: any,
    context: any,
    screenW: any,
    screenH: any,
    max: number = 3;
  let count: number = 1000;
  let balls: any[] = [];
  let X1 = 0;
  let Y1 = 0;
  // 定义常量

  useEffect(() => {
    canvas = document.getElementById('canvas');
    // 设置画布
    render();
    //获取canvas执行上下文
    context = canvas.getContext('2d');
    // ===========组件应用层============
    X1 = canvas.width / 2;
    Y1 = canvas.height / 2;
    for (let i = 0; i < count; i++) {
      var ball = new Star();
      balls.push(ball);
    }
    //创建星星

    setInterval(startAnimation, 50);
  }, []);

  // ============组件定制层==============
  /**
   * Star
   *
   * @param int x
   * @param int y
   * @param int length
   * @param float opacity
   */

  // 星星构造函数
  function Star() {
    this.centerX = getRandom(max, canvas.width - max);
    this.centerY = getRandom(max, canvas.height - max);
    this.radius = getRandom(1, 3);
    this.color = getRandomColor();
    let speed1 = getRandom(1, 3);
    this.speedX = getRandom(0, 1) ? -speed1 : speed1;
    let speed2 = getRandom(1, 3);
    this.speedY = getRandom(0, 1) ? -speed2 : speed2;
  }

  //对象原型方法
  /**
   * 画星星
   *
   * @param context
   */
  Star.prototype.draw = function() {
    context.beginPath();
    context.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
  };
  Star.prototype.move = function() {
    this.centerX += this.speedX;
    this.centerY += this.speedY;
  };

  function getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getRandomColor() {
    let red = getRandom(0, 255);
    let green = getRandom(0, 255);
    let blue = getRandom(0, 255);
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
  }
  //开始
  function startAnimation() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '100px STKaiTi';
    context.strokeStyle = 'white';
    context.strokeText('YOUNG5', canvas.width / 2.2, canvas.height / 2, 500);
    for (let i = 0; i < balls.length; i++) {
      balls[i].move();
      balls[i].draw();
    }
    adjustPB();
    ligature();
  }

  //碰壁反弹
  function adjustPB() {
    for (let i = 0; i < balls.length; i++) {
      if (
        balls[i].centerX <= balls[i].radius ||
        balls[i].centerX >= canvas.width - balls[i].radius
      ) {
        balls[i].speedX *= -1;
      }
      if (
        balls[i].centerY <= balls[i].radius ||
        balls[i].centerY >= canvas.height - balls[i].radius
      ) {
        balls[i].speedY *= -1;
      }
    }
  }
  function ligature() {
    context.beginPath();
    context.arc(X1, Y1, 200, 0, Math.PI * 2, false);
    let arc: any[] = [];
    for (let i = 0; i < balls.length; i++) {
      let disX1 = X1 - balls[i].centerX;
      let disY1 = Y1 - balls[i].centerY;
      if (Math.sqrt(disX1 * disX1 + disY1 * disY1) <= 200) {
        arc.push(balls[i]);
      }
    }
    for (let i = 0; i < arc.length; i++) {
      for (let j = 0; j < arc.length; j++) {
        if (i != j) {
          let dixX1 = arc[i].centerX - arc[j].centerX;
          let dixY1 = arc[i].centerY - arc[j].centerY;
          if (Math.sqrt(dixX1 * dixX1 + dixY1 * dixY1) <= 50) {
            context.beginPath();
            context.moveTo(arc[i].centerX, arc[i].centerY);
            context.lineTo(arc[j].centerX, arc[j].centerY);
            context.closePath();
            context.strokeStyle = getRandomColor();
            context.stroke();
          }
        }
      }
    }
  }
  /**
   * 获取窗口大小信息
   */
  function getScreenInfo() {
    //获取窗口宽度
    let winWidth = 0;
    let winHeight = 0;
    if (window.innerWidth) {
      winWidth = window?.innerWidth;
    } else if (document.body && document.body.clientWidth) {
      winWidth = document.body.clientWidth;
    }

    //获取窗口高度
    if (window.innerHeight) {
      winHeight = window.innerHeight;
    } else if (document.body && document.body.clientHeight) {
      winHeight = document.body.clientHeight;
    }

    //通过深入Document内部对body进行检测，获取窗口大小
    if (
      document.documentElement &&
      document.documentElement.clientHeight &&
      document.documentElement.clientWidth
    ) {
      winHeight = document.documentElement.clientHeight;
      winWidth = document.documentElement.clientWidth;
    }
    return {
      winWidth: winWidth,
      winHeight: winHeight,
    };
  }

  /**
   * canvas设置，修复窗口变化，画布大小不变的问题
   */
  function render() {
    //获取屏幕大小
    screenW = getScreenInfo().winWidth;
    screenH = getScreenInfo().winHeight;

    // 设置canvas
    // canvas.setAttribute('width', screenW);
    // canvas.setAttribute('height', screenH);

    canvas.width = screenW;
    canvas.height = screenH;

    window.addEventListener('resize', render);
  }

  return (
    <div>
      <canvas
        onMouseLeave={() => {
          X1 = canvas.width / 2;
          Y1 = canvas.height / 2;
        }}
        // onMouseEnter={()=>{

        // }}
        onMouseMove={(e: any) => {
          X1 = e.pageX;
          Y1 = e.pageY;
          //检测移动是否到达到极值
          if (X1 < 200) {
            X1 = 200;
          }
          if (Y1 < 200) {
            Y1 = 200;
          }
          if (X1 > canvas.width - 200) {
            X1 = canvas.width - 200;
          }
          if (Y1 > canvas.height - 200) {
            Y1 = canvas.height - 200;
          }
        }}
        style={{
          background: '#000',
        }}
        id="canvas"
      ></canvas>
    </div>
  );
};

export default NMG;
