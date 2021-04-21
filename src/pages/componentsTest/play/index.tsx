import React from 'react';
import { Tabs } from '@/components/componentsTools';
import XK from './canvas/XK';
import XK1 from './canvas/XK1';
import Css from './css-style';
interface NMGProps {}

const tabs = [
  {
    tab: '粒子',
    component: <XK />,
    key: 'xk',
  },
  {
    tab: '星空',
    component: <XK1 />,
    key: 'xk1',
  },
  {
    tab: 'Css3',
    component: <Css />,
    key: 'Css',
  },
];

const NMG: React.FC<NMGProps> = props => {
  return (
    <div
      style={{
        height: '500px',
      }}
    >
      <Tabs tabs={tabs} defaultActiveKey="xk" />
    </div>
  );
};

export default NMG;
