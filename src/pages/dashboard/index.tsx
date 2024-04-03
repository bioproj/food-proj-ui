import type { FC } from 'react';

import './index.less';

import { useEffect, useState } from 'react';

import Overview from './overview';
import SalePercent from './salePercent';
import TimeLine from './timeLine';
import { BASE_URL } from '@/config'
import { Card } from 'antd';


const DashBoardPage: FC = () => {
  const [loading, setLoading] = useState(true);

  // mock timer to mimic dashboard data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(undefined as any);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <Card title="基于云计算和生成式AI的生信数据挖掘系统" >
        <MyComponent></MyComponent>
      </Card>
      <Overview loading={loading} />
      <SalePercent loading={loading} />
      <TimeLine loading={loading} />
    </div>
  );
};

function MyComponent() {
  const isDevelopment = import.meta.env.MODE === 'development';
  const isProduction = import.meta.env.MODE === 'production';
  console.log(import.meta.env)
  return (
    <div>

      {isDevelopment && <p>开发环境</p>}
      {isProduction && <p>生产环境</p>}
      {BASE_URL}
    </div>
  );
}

export default DashBoardPage;
