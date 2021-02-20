import React, { useState, useRef, useEffect } from 'react';
import { Spin } from 'antd';
import CropperLib from 'cropperjs';
import { ModalContainer } from 'oi-ui';
import Controller from './Controller';

export interface IFImgData {
  width: number;
  height: number;
  imgUrl: string;
  [key: string]: number | string;
}
interface CropperProps {
  children: React.ReactElement;
  onCroppered: (canvas: HTMLCanvasElement) => void;
  imgData: IFImgData;
  className?: string;
  style?: React.CSSProperties;
  onReady?: () => void;
}

export interface IFStyle {
  width: number;
  height: number;
}

let cropperIns: CropperLib;
/** 裁剪框默认大小 */
let DEFAULT_CROPPERSIZE: number = 360;
/** 裁剪框默认大小 */
let IMG_SPECTRATIO: number = 0;
/** 显示缩放比例 */
let DEFAULT_SPECTRATIO: number = 450;
/** 缓存初始裁剪框容器大小，防止异步问题 */
let DEFAULT_CROPPERCSTYLE: IFStyle;

const Cropper: React.FC<CropperProps> = ({
  imgData,
  children,
  onCroppered,
  className,
  style,
  onReady,
}) => {
  /** 裁剪容器的宽高 */
  const [cropperCStyle, setCropperCStyle] = useState({ width: 0, height: 0 });
  /** 裁剪框的宽高 */
  const [cropperStyle, setCropperStyle] = useState<IFStyle>({
    width: 0,
    height: 0,
  });
  const [cropperLoading, setCropperLoading] = useState(false);
  const modalRef = useRef<any>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  // destroy cropperjs willunmout
  useEffect(() => {
    return () => {
      cropperIns && cropperIns.destroy();
    };
  }, []);
  const showCropper = (): void => {
    if (modalRef.current) {
      modalRef.current.open();
      const setWH = (lenKey1: string, lenKey2: string): number => {
        const smallerSide = imgData[lenKey1] < imgData[lenKey2];
        // 存储裁剪比例
        IMG_SPECTRATIO = +imgData[smallerSide ? lenKey2 : lenKey1] / DEFAULT_SPECTRATIO;
        return smallerSide ? +imgData[lenKey1] / IMG_SPECTRATIO : DEFAULT_SPECTRATIO;
      };
      const cropperCH = setWH('height', 'width');
      const cropperCW = setWH('width', 'height');
      DEFAULT_CROPPERSIZE = cropperCH > cropperCW ? cropperCW : cropperCH;
      DEFAULT_CROPPERCSTYLE = { width: cropperCW, height: cropperCH };
      const timer = setTimeout(() => {
        setCropperCStyle(DEFAULT_CROPPERCSTYLE);
        setCropperStyle({
          width: DEFAULT_CROPPERSIZE,
          height: DEFAULT_CROPPERSIZE,
        });
        setCropperLoading(true);
        clearTimeout(timer);
      }, 0);
    }
  };
  /**
   * 初始化裁剪框
   */
  const initialCropper = (): void => {
    cropperIns = new CropperLib(imgRef.current as HTMLImageElement | HTMLCanvasElement, {
      aspectRatio: 1,
      viewMode: 3,
      zoomable: false,
      minContainerHeight: DEFAULT_CROPPERCSTYLE.height,
      minContainerWidth: DEFAULT_CROPPERCSTYLE.width,
      ready() {
        setCropperLoading(false);
        resetCropperSize({
          width: DEFAULT_CROPPERSIZE,
          height: DEFAULT_CROPPERSIZE,
        });
        onReady && onReady();
      },
      cropstart(_event: CustomEvent) {},
      cropend: function(_event: CustomEvent) {
        let { width, height } = cropperIns.getCropBoxData();
        // 移动结束后设置裁剪高宽和输入框高宽
        setCropperStyle({
          width: Number(width.toFixed(0)),
          height: Number(height.toFixed(0)),
        });
      },
    });
  };

  /**
   * 销毁裁剪框组件
   */
  function destroyCropper() {
    if (!cropperIns) return;
    cropperIns.destroy();
  }

  /**
   * 根据图片实际的宽高重新设置裁剪框的宽高
   * @param param0 width: 宽 height: 高
   */
  function resetCropperSize({ width, height }: IFStyle): void {
    //
    cropperIns.setAspectRatio(width / height);
    cropperIns.setCropBoxData({ width: Number(width), height: Number(height) });
    //
  }

  /**
   * 计算输入框的值(实际的像素值)
   * @param param0 width cropper的宽  height cropper的高
   */
  function resetInputValue({ width, height }: IFStyle): IFStyle {
    const calculate = (size: number): number => Number((size * IMG_SPECTRATIO).toFixed(0));
    return {
      width: calculate(width),
      height: calculate(height),
    };
  }

  /**
   * 确定函数回调
   */
  function onOk() {
    //
    if (modalRef.current) {
      modalRef.current.close();
    }
    const canvasStyle = resetInputValue(cropperIns.getCropBoxData());
    const canvasTemp = cropperIns.getCroppedCanvas(canvasStyle);

    // 重新设置canvas长宽
    const image = new Image();
    image.setAttribute('crossOrigin', 'anonymous');
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = canvasStyle.width;
      canvas.height = canvasStyle.height;
      const ctx = canvas.getContext('2d');
      ctx && ctx.drawImage(image, 0, 0, canvasStyle.width, canvasStyle.height);
      // 回传blob对象用于上传使用
      onCroppered && onCroppered(canvas);
      destroyCropper();
    };
    image.src = canvasTemp.toDataURL('image/jpeg');
  }

  /**
   * 更新裁剪框 宽和高的比例
   * @param ratio width & height
   * @returns 裁剪框的大小 width & height
   */
  function changeAspectRatio(ratio: IFStyle): IFStyle {
    // 排序，大尺寸在前
    // const orderedKey: Array<keyof IFStyle> =
    // ratio.width >= ratio.height ? ['width', 'height'] : ['height', 'width'];
    /**
     * 设置新的裁剪框大小
     * @param judge 排序判断
     */
    function setNewCropBox(
      judge: boolean = cropperCStyle.width >= cropperCStyle.height,
    ): { [key: string]: any } {
      const orderedKey: Array<keyof IFStyle> = judge ? ['width', 'height'] : ['height', 'width'];
      cropperIns.setAspectRatio(ratio.width / ratio.height);
      // 总是先计算最小的边，作为满边
      return {
        [orderedKey[1]]: cropperCStyle[orderedKey[1]],
        [orderedKey[0]]:
          (cropperCStyle[orderedKey[1]] * ratio[orderedKey[0]]) / ratio[orderedKey[1]],
      };
    }
    let newCropBoxData = setNewCropBox();
    // 某一边超出边界时，调换顺序计算，以超出的边为满边重新计算
    if (
      newCropBoxData.width > cropperCStyle.width ||
      newCropBoxData.height > cropperCStyle.height
    ) {
      newCropBoxData = setNewCropBox(cropperCStyle.width < cropperCStyle.height);
    }
    cropperIns.setCropBoxData(newCropBoxData);
    return { width: newCropBoxData.width, height: newCropBoxData.height };
  }
  return (
    <>
      <div onClick={showCropper}>{children}</div>
      <ModalContainer
        title="图片裁剪"
        onOk={onOk}
        ref={modalRef}
        style={{ width: '80%', maxWidth: 946, ...style }}
        onCancel={destroyCropper}
        className={className}
        destroyOnClose
      >
        <Spin spinning={cropperLoading}>
          <div
            style={{
              ...cropperCStyle,
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <img
              id="cropper_img"
              ref={imgRef}
              style={{ ...cropperCStyle }}
              alt="裁剪图片"
              src={imgData.imgUrl}
              onLoad={initialCropper}
            />
          </div>
          {cropperStyle.width && (
            <Controller
              {...{
                imgData,
                IMG_SPECTRATIO,
                resetCropperSize,
                resetInputValue,
                initialValue: resetInputValue(cropperStyle),
              }}
              onSelectChange={changeAspectRatio}
              cropperIns={cropperIns}
            />
          )}
        </Spin>
      </ModalContainer>
    </>
  );
};

export default Cropper;
