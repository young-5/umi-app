import React from "react";
import { shallow, configure, mount } from "enzyme";
import adpater from "enzyme-adapter-react-16";
import Controller from "../Controller";
import { IFImgData, IFStyle } from "..";
import { Input } from "antd";
configure({ adapter: new adpater() });

test("test Controller Component initial", () => {
  const resetCropperSize = jest.fn();
  const onSelectChange = jest.fn();
  const resetInputValue = jest.fn();
  const imgData: IFImgData = { width: 0, height: 0, imgUrl: "" },
    IMG_SPECTRATIO: number = 450,
    initialValue: IFStyle = { width: 100, height: 100 };
  const wrapper = shallow(
    <Controller
      {...{
        resetCropperSize,
        onSelectChange,
        imgData,
        IMG_SPECTRATIO,
        initialValue,
        resetInputValue,
      }}
    />
  );
  expect(wrapper.find(Input).length).toBe(2);
  const firstInput = wrapper.find(Input).first();
  expect(firstInput.props().value).toBe(100);
});

test("test Controller input change", () => {
  const resetCropperSize = jest.fn();
  const onSelectChange = jest.fn();
  const resetInputValue = jest.fn();
  const imgData: IFImgData = { width: 500, height: 500, imgUrl: "" },
    IMG_SPECTRATIO: number = 450,
    initialValue: IFStyle = { width: 100, height: 100 };
  const wrapper = mount(
    <Controller
      {...{
        resetCropperSize,
        onSelectChange,
        imgData,
        IMG_SPECTRATIO,
        initialValue,
        resetInputValue,
      }}
    />
  );
  const firstInput = wrapper.find("input").first();
  firstInput.simulate("change", { target: { value: "345" } });
  // expect(firstInput.prop('value')).toBe('345');
  // expect(firstInput.props().value).toEqual('345');
});
