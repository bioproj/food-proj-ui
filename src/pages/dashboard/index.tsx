import type { FC } from 'react';

import './index.less';
import type { ColProps } from 'antd/es/col';

import { useEffect, useState } from 'react';

import Overview from './overview';
import SalePercent from './salePercent';
import TimeLine from './timeLine';
import { BASE_URL } from '@/config'
import { Card, Row, Col, Divider } from 'antd';


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

  const wrapperCol: ColProps = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 12,
    xxl: 12,
  };
  return (
    <Row gutter={20} >
      <Col {...wrapperCol} order={0} style={{ borderRight: '1px  solid rgba(5, 5, 5, 0.06)' }} >
        {isDevelopment && <p>开发环境: {BASE_URL}</p>}
        {isProduction && <p>生产环境: {BASE_URL}</p>}

      </Col>

      <Col {...wrapperCol} order={1} >
        <p>使用docker快速开始</p>
      
        <pre>
          <code>
            {`
  # 创建网络
  docker network create pipeline
  # 启动mongo数据库
  docker run --rm -d \\
    --name mongo \\
    --network pipeline \\
    --hostname mongo \\
    -p 27018:27017 \\
    registry.cn-hangzhou.aliyuncs.com/wybioinfo/mongo
  # 启动后端程序
  docker run --rm \\
    --name service-pipeline \\
    --network pipeline \\
    -e MONGO_HOST=mongo \\
    -e MONGO_PORT=27017 \\
    -e MONGO_DB=pipeline_db \\ 
    -p 30001:30001 \\
    registry.cn-hangzhou.aliyuncs.com/wybioinfo/service-pipeline-boot-1.0.jar`
            }
          </code>
        </pre>

      </Col>
    </Row>
  );
}

export default DashBoardPage;
