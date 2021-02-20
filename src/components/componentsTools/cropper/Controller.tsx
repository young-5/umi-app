import React, { ChangeEvent, useState, useEffect } from "react";
import { IFImgData, IFStyle } from ".";
import { Input, Select } from "antd";
import { usePrevious } from "react-use";

interface ControllerProps {
  imgData: IFImgData;
  IMG_SPECTRATIO: number;
  initialValue: IFStyle;
  resetCropperSize: (param: IFStyle) => void;
  onSelectChange: (ratio: IFStyle) => IFStyle;
  resetInputValue: (param: IFStyle) => IFStyle;
  cropperIns?: Cropper;
}
const OPTIONS = [
  { key: "1/1", name: "1:1" },
  { key: "4/3", name: "4:3" },
  { key: "1/2", name: "1:2" },
  { key: "16/9", name: "16:9" },
  { key: "9/16", name: "9:16" },
];

const Controller: React.FC<ControllerProps> = ({
  imgData,
  IMG_SPECTRATIO,
  initialValue,
  onSelectChange,
  resetInputValue,
  cropperIns,
}) => {
  const [inputValue, setInputValue] = useState<IFStyle>(initialValue);
  const [selectAspectRatio, setSelectAspectRatio] = useState<string>("1/1");
  const prevInitialValue = usePrevious(initialValue);
  useEffect(() => {
    if (JSON.stringify(prevInitialValue) !== JSON.stringify(initialValue)) {
      setInputValue(initialValue);
    }
  }, [initialValue, prevInitialValue, setInputValue]);
  /**
   * 渲染输入框组件
   * @param sizeName 名称
   * @param sizeKey 尺寸key： width & height
   */
  function renderCropperInput(sizeName: string, sizeKey: keyof IFStyle) {
    const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
      let value: string | number = target && target.value;
      if (!value && !value.match(/\d*/g)) return "";
      value = +(value.match(/\d*/g) || [""])[0];
      // 超出最大值返回最大值
      value = (value > imgData[sizeKey] ? imgData[sizeKey] : value) + "";
      const numberValue: number = +value;
      /** 计算比例，得到实际的裁剪框大小 */
      const calculateStyle = (value: number, IMG_SPECTRATIO: number): number =>
        +(value / IMG_SPECTRATIO).toFixed(0);

      /** 裁剪框的比例 */
      const aspectRatio: number = selectAspectRatio
        ? +selectAspectRatio.split("/")[0] / +selectAspectRatio.split("/")[1]
        : 0;
      let calculateResult = (IMG_SPECTRATIO: number): IFStyle => {
        /** 通过比例，同步计算宽高 */
        const calculateAnother = (
          keys: Array<keyof IFStyle>
        ): { [key: string]: number } => ({
          [keys[0]]: calculateStyle(numberValue, IMG_SPECTRATIO),
          // 裁剪框比例为空时，另外一边的值不进行计算
          ...(aspectRatio && {
            [keys[1]]: calculateStyle(
              keys[0] === "width"
                ? numberValue / aspectRatio
                : numberValue * aspectRatio,
              IMG_SPECTRATIO
            ),
          }),
        });

        return {
          ...inputValue,
          ...calculateAnother(
            sizeKey === "width" ? ["width", "height"] : ["height", "width"]
          ),
        };
      };
      const finalInputStyle = calculateResult(1);
      setInputValue(finalInputStyle);

      // 比例为空时free裁剪框，并通过输入框的值设置裁剪框大小
      if (cropperIns) {
        cropperIns.setAspectRatio(aspectRatio);
        cropperIns.setCropBoxData(
          Object.keys(finalInputStyle).reduce((prev: any, curr: string) => {
            prev[curr] = calculateStyle(
              finalInputStyle[curr as keyof IFStyle],
              IMG_SPECTRATIO
            );
            return prev;
          }, {})
        );
      }
    };
    return (
      <Input
        placeholder={sizeName}
        value={inputValue[sizeKey]}
        style={{ width: 70 }}
        onChange={onChange}
      />
    );
  }
  function onChange(value: string): void {
    setSelectAspectRatio(value);
    // value为空时，传0 free裁剪比例
    if (!value && cropperIns) {
      const cropperBox = cropperIns.getCropBoxData();
      cropperIns.setAspectRatio(0);
      cropperIns.setCropBoxData(cropperBox);
      return;
    }
    const cropperStyle =
      onSelectChange &&
      onSelectChange({
        width: Number(value.split("/")[0]),
        height: Number(value.split("/")[1]),
      });
    setInputValue(resetInputValue(cropperStyle));
  }
  return (
    <div
      className='rac_cropper_controller'
      style={{ marginTop: 20, display: "flex", justifyContent: "space-around" }}
    >
      <div>
        <span>裁剪：</span>
        {renderCropperInput("宽", "width")}
        <span style={{ margin: "0 10px" }}>X</span>
        {renderCropperInput("高", "height")}
      </div>
      <div>
        <span>像素比：</span>
        <Select
          onChange={onChange}
          style={{ width: 150 }}
          allowClear
          value={selectAspectRatio}
        >
          {OPTIONS.map((op: { key: string; name: string }) => (
            <Select.Option key={op.key}>{op.name}</Select.Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default Controller;
