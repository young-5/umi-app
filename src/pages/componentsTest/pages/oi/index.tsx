/*
 * File: index.less
 * Description: 描述
 * File Created: 2021-02-19 17:28:16
 * Author: yangwenwu
 * ------
 * Last Modified: 2021-02-20 16:40:28
 * Modified By: yangwenwu at <1552153802@qq.com>
 * ------
 * Copyright 2021 - Present, Your Company
 */
import React, { useRef } from 'react';
import { Button } from 'antd';
import {
  Alert,
  Title,
  Spacer,
  Table,
  Ellipsis,
  Breadcrumb,
  Btns,
  ChooseBtn,
  ToolBtns,
  BtnMaterial,
  ModalContainer,
  BgImg,
  Descriptions,
  ImgMapList,
  NoData,
  Download,
  ListCard,
} from 'oi-ui';
import 'oi-ui/dist/dist/css/bundle.css';
let src1 = require('./assets/11.jpg');
let src2 = require('./assets/12.jpg');
let src3 = require('./assets/noimg.jpg');
interface NMGProps {}

const NMG: React.FC<NMGProps> = props => {
  const modalRef = useRef<any>(null);
  return (
    <div>
      <ListCard>
        <Title title={'间隙组件'} isLine>
          <Spacer
            style={{
              background: '#eee',
            }}
            height={'50px'}
          />
        </Title>
        <Title title={'弹框提示组件'} isLine>
          <>
            <div>
              <Button
                onClick={() => {
                  Alert.success('成功');
                }}
              >
                成功
              </Button>
            </div>
            <div>
              <Button
                onClick={() => {
                  Alert.error('失败');
                }}
              >
                失败
              </Button>
            </div>
            <div>
              <Button
                onClick={() => {
                  Alert.warn('失败');
                }}
              >
                警告
              </Button>
            </div>
            <div>
              <Button
                onClick={() => {
                  Alert.confirm({
                    title: '确认删除该表单',
                    onOk: () => {
                      alert('好的');
                    },
                  });
                }}
              >
                确认
              </Button>
            </div>
          </>
        </Title>
        <Title title={'弹框组件'} isLine>
          <Button
            onClick={() => {
              modalRef.current.open();
            }}
          >
            点我出现
          </Button>
          <ModalContainer
            onOk={() => {
              modalRef.current.close();
            }}
            autoClose={false}
            ref={modalRef}
            title={'弹出层'}
          >
            我是弹出层,点击确认消失
          </ModalContainer>
        </Title>
        <Title title={'表格组件'} isLine>
          <Table
            columns={[
              {
                title: '序号',
                render: (value: any, data: any, i: number) => {
                  return i < 9 ? `0${i + 1}` : i + 1;
                },
                width: 60,
              },
              {
                title: '标准号',
                dataIndex: 'standardNumber',
                width: 120,
              },
              {
                title: '模板名称',
                dataIndex: 'templateNAME',
                width: 120,
              },
            ]}
          />
        </Title>
        <Title title={'省略组件'} isLine>
          <Ellipsis width={'200px'} len={5} text={'我是一段超过5个字的内容'} />
        </Title>
        <Title title={'面包屑'} isLine>
          <Breadcrumb
            separator={'*'}
            crumbData={[
              {
                title: '测试',
              },
              {
                title: '面包屑',
              },
            ]}
          />
        </Title>
        <Title title={'按钮组组件'} isLine>
          <Btns
            btns={[
              {
                value: '提交',
                type: 'primary',
                onClick: () => {
                  alert('提交');
                },
              },
              {
                value: '取消',
                type: 'primary',
                onClick: () => {
                  alert('取消');
                },
              },
              {
                value: '导出',
                onClick: () => {
                  alert('导出');
                },
              },
            ]}
          />
        </Title>
        <Title title={'按钮选择组件'} isLine>
          <ChooseBtn
            defaultType={'1'}
            style={{
              textAlign: 'left',
              position: 'relative',
            }}
            typeArr={[
              {
                key: '1',
                value: '合格',
              },
              {
                key: '0',
                value: '不合格',
              },
            ]}
          />
        </Title>
        <Title title={'操作栏按钮组件'} isLine>
          <ToolBtns
            trigger={'click'}
            btns={[
              {
                title: '提交',
                click: () => {
                  alert('提交');
                },
              },
              {
                title: '取消',
                click: () => {
                  alert('取消');
                },
              },
              {
                render: () => {
                  return <div>自定义显示</div>;
                },
              },
            ]}
          >
            <a>点击我操作</a>
          </ToolBtns>
        </Title>
        <Title title={'提交取消按钮组件'} isLine>
          <BtnMaterial
            okText={'提交'}
            errText={'取消'}
            onSubmit={() => {
              alert('提交');
            }}
            onRest={() => {
              alert('取消');
            }}
            style={{
              justifyContent: 'center',
            }}
          />
        </Title>

        <Title
          title={'背景图组件'}
          isLine
          styles={{
            overflow: 'auto',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '50px',
              overflow: 'auto',
            }}
          >
            <BgImg
              imgList={[
                {
                  id: '1',
                  src: src1,
                },
                {
                  id: '2',
                  src: src2,
                },
              ]}
            >
              <div>我是星星</div>
            </BgImg>
          </div>
        </Title>
        <Title title={'表格描述组件'} isLine>
          <Descriptions
            descriptionsItem={[
              {
                label: '组件名称',
                value: 'name',
              },
              {
                label: '英文名',
                value: 'ename',
              },
              {
                label: '类型',
                value: 'type',
              },
              {
                label: '组件描述',
                value: 'dsc',
                span: 2,
              },
            ]}
            data={{
              name: '表格描述组件',
              ename: 'Descriptions',
              type: '显示组件',
              dsc: '这是一个组件111111111111111111111111111111111111111111111111111',
            }}
          />
        </Title>

        <Title title={'图片组件'} isLine>
          <ImgMapList datas={[src1, src2]} />
        </Title>
        <Title title={'下载组件'} isLine>
          <div>
            <Download feachApi={() => {}} children={() => <Button>下载</Button>} />
          </div>
        </Title>
        <Title title={'暂无数据组件'} isLine>
          <NoData noImgSrc={src3} />
        </Title>
      </ListCard>
    </div>
  );
};

export default NMG;
